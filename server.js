import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`C Compiler backend running on http://localhost:${PORT}`);
});
