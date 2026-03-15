import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-codeforge-key';

let db;

// Setup SQLite database
(async () => {
  db = await open({
    filename: path.join(__dirname, 'platform.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      fullname TEXT,
      password TEXT,
      points INTEGER DEFAULT 0,
      completed_topics TEXT DEFAULT '[]'
    );
  `);

  // Migration: Check if fullname column exists, add it if not
  const tableInfo = await db.all("PRAGMA table_info(users)");
  const hasFullName = tableInfo.some(column => column.name === 'fullname');
  if (!hasFullName) {
    await db.exec("ALTER TABLE users ADD COLUMN fullname TEXT");
    console.log("Migration: Added fullname column to users table");
  }

  console.log("Database initialized");
})();

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH APIs ---
app.post('/api/auth/register', async (req, res) => {
  const { username, fullname, password } = req.body;
  
  if(!username || !password || !fullname) return res.status(400).json({ error: 'Missing credentials or full name' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run('INSERT INTO users (username, fullname, password) VALUES (?, ?, ?)', [username, fullname, hashedPassword]);
    const token = jwt.sign({ id: result.lastID, username, fullname }, JWT_SECRET);
    res.json({ token, username, fullname });
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username, fullname: user.fullname }, JWT_SECRET);
    res.json({ token, username: user.username, fullname: user.fullname });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

// --- PROGRESS APIs ---
app.get('/api/progress', authenticateToken, async (req, res) => {
  const user = await db.get('SELECT points, completed_topics FROM users WHERE id = ?', [req.user.id]);
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  res.json({
    points: user.points,
    completed: JSON.parse(user.completed_topics || '[]')
  });
});

app.post('/api/progress', authenticateToken, async (req, res) => {
  const { topicId, pointsEarned } = req.body;
  
  const user = await db.get('SELECT points, completed_topics FROM users WHERE id = ?', [req.user.id]);
  if (!user) return res.status(404).json({ error: 'User not found' });

  let completed = JSON.parse(user.completed_topics || '[]');
  
  if (!completed.includes(topicId)) {
    completed.push(topicId);
    const newPoints = user.points + pointsEarned;
    
    await db.run('UPDATE users SET points = ?, completed_topics = ? WHERE id = ?', [
      newPoints,
      JSON.stringify(completed),
      req.user.id
    ]);
    
    res.json({ success: true, newPoints, completed });
  } else {
    res.json({ success: false, message: 'Already completed' });
  }
});

// --- COMPILER API ---
app.post('/api/run', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ status: 'error', output: 'No code provided.' });
  }

  const id = crypto.randomBytes(8).toString('hex');
  const cFilePath = path.join(tempDir, `${id}.c`);
  const exeFilePath = path.join(tempDir, `${id}`);

  fs.writeFileSync(cFilePath, code);

  exec(`gcc ${cFilePath} -o ${exeFilePath}`, (compileErr, stdout, stderr) => {
    if (compileErr) {
      try { fs.unlinkSync(cFilePath); } catch(e) {}
      return res.json({ status: 'error', output: stderr || compileErr.message });
    }

    exec(`${exeFilePath}`, { timeout: 3000 }, (runErr, runStdout, runStderr) => {
      try { fs.unlinkSync(cFilePath); } catch(e) {}
      try { fs.unlinkSync(exeFilePath); } catch(e) {}

      if (runErr) {
        if (runErr.killed) {
          return res.json({ status: 'error', output: 'Execution timed out (infinite loop?).' });
        }
        return res.json({ status: 'error', output: runStderr || runErr.message });
      }

      res.json({ status: 'success', output: runStdout || runStderr });
    });
  });
});

// --- SERVE FRONTEND IN PRODUCTION ---
if (fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`CodeForge backend running on port ${PORT}`);
});
