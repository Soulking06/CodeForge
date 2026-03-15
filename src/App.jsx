import React, { useState, useEffect } from 'react';
import { Play, Code2, Terminal, CheckCircle2, ChevronRight, BookOpen, Star, LogOut, Award } from 'lucide-react';
import { TOPICS_CONFIG } from './topics';
import Auth from './Auth';
import Certificate from './Certificate';
import './index.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [fullname, setFullname] = useState(localStorage.getItem('fullname') || '');

  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('selectedLang') || 'c');
  const TOPICS = TOPICS_CONFIG[selectedLang] || TOPICS_CONFIG.c;
  const [currentTopicId, setCurrentTopicId] = useState(TOPICS[0].id);
  
  const topic = TOPICS.find(t => t.id === currentTopicId) || TOPICS[0];

  const [code, setCode] = useState(topic.initialCode);
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [completed, setCompleted] = useState(new Set());
  const [points, setPoints] = useState(0);
  const [animatePoints, setAnimatePoints] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSandbox, setIsSandbox] = useState(false);
  const [playgroundCode, setPlaygroundCode] = useState({
    c: '#include <stdio.h>\n\nint main() {\n    printf("Hello from C Sandbox!");\n    return 0;\n}',
    python: 'print("Hello from Python Sandbox!")',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java Sandbox!");\n    }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++ Sandbox!" << std::endl;\n    return 0;\n}'
  });

  // Auth Handling
  const handleLogin = (jwt, user, full) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem('username', user);
    localStorage.setItem('fullname', full);
    setToken(jwt);
    setUsername(user);
    setFullname(full);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('fullname');
    setToken('');
    setUsername('');
    setFullname('');
    setCompleted(new Set());
    setPoints(0);
  };

  // Fetch Progress when token changes
  useEffect(() => {
    if (token) {
      fetch('/api/progress', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.points !== undefined) {
          setPoints(data.points);
          setCompleted(new Set(data.completed));
        } else {
          handleLogout(); // invalid token
        }
      })
      .catch((err) => {
        console.error("Failed to load progress", err);
      });
    }
  }, [token]);

  useEffect(() => {
    if (!isSandbox) {
      setCode(topic.initialCode);
      setOutput('');
      setIsError(false);
    }
    setShowModal(false);
  }, [currentTopicId, isSandbox, topic.initialCode]);

  useEffect(() => {
    // When language changes, reset to first topic of that language
    if (!isSandbox) {
      setCurrentTopicId(TOPICS[0].id);
    }
  }, [selectedLang, isSandbox, TOPICS]);

  const compileAndRun = async () => {
    setOutput('Compiling code...');
    setIsError(false);
    setIsCompiling(true);

    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: isSandbox ? playgroundCode[selectedLang] : code, 
          language: selectedLang 
        })
      });
      
      const data = await response.json();
      
      setIsCompiling(false);

      if (data.status === 'error') {
        setOutput(data.output);
        setIsError(true);
      } else {
        setOutput(data.output);
        setIsError(false);
        
        if (!isSandbox && topic.validate(data.output)) {
          // If validated, update backend
          if (!completed.has(topic.id)) {
            fetch('/api/progress', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ topicId: topic.id, pointsEarned: 100, language: selectedLang })
            })
            .then(res => res.json())
            .then(prog => {
              if (prog.success) {
                setPoints(prog.newPoints);
                setAnimatePoints(true);
                setTimeout(() => setAnimatePoints(false), 500);
                setCompleted(new Set(prog.completed));
              }
            });
          }

          setTimeout(() => {
            setShowModal(true);
          }, 300);
        }
      }
    } catch (err) {
      setIsCompiling(false);
      setIsError(true);
      setOutput("Error connecting to compilation server. Make sure the Node backend is running.");
    }
  };

  const handleNextTopic = () => {
    const currentIndex = TOPICS.findIndex(t => t.id === currentTopicId);
    if (currentIndex < TOPICS.length - 1) {
      setCurrentTopicId(TOPICS[currentIndex + 1].id);
    }
    setShowModal(false);
  };

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  const completionPercent = Math.round((completed.size / TOPICS.length) * 100);
  const isAllComplete = completed.size === TOPICS.length;

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand" style={{ flexDirection: 'column', alignItems: 'flex-start', borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', marginBottom: '1rem' }}>
            <div className="logo-icon">C</div>
            <h1>CodeForge</h1>
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={`points-badge ${animatePoints ? 'animate' : ''}`}>
               <Star size={14} fill="currentColor" /> {points} PTS
            </div>
            
            <button 
              onClick={handleLogout}
              style={{ background: 'transparent', border: 'none', color: 'var(--c-red)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              title="Logout"
            >
              <LogOut size={16} /> 
            </button>
          </div>
          
          <div style={{ width: '100%', marginTop: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.4rem' }}>
              <span>Course Progress</span>
              <span style={{ color: 'var(--c-cyan)' }}>{completionPercent}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#000', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${completionPercent}%`, background: 'linear-gradient(90deg, var(--c-blue), var(--c-cyan))', transition: 'width 0.5s ease' }}></div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 1.5rem', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}></div>
        
        <div className="topic-list">
          <button
            className={`topic-item ${isSandbox ? 'active' : ''}`}
            onClick={() => setIsSandbox(true)}
            style={{ marginBottom: '0.5rem', color: isSandbox ? 'var(--c-cyan)' : 'var(--text-dim)', background: isSandbox ? 'rgba(14, 165, 233, 0.1)' : 'transparent' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code2 size={18} />
              <span>Free Playground</span>
            </div>
          </button>

          <div style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Course Topics
          </div>

          {TOPICS.map(t => (
            <button
              key={t.id}
              className={`topic-item ${!isSandbox && currentTopicId === t.id ? 'active' : ''} ${completed.has(t.id) ? 'completed' : ''}`}
              onClick={() => {
                setIsSandbox(false);
                setCurrentTopicId(t.id);
              }}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>{t.title}</span>
              {completed.has(t.id) && <CheckCircle2 size={16} className="status-icon" style={{ flexShrink: 0 }} />}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="main-area">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {isSandbox ? (
              <h2><Code2 size={24} color="var(--c-cyan)" /> Global Playground</h2>
            ) : (
              <h2><BookOpen size={24} color="var(--c-blue)" /> {topic.title}</h2>
            )}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <select 
              className="lang-select" 
              value={selectedLang} 
              onChange={(e) => {
                const newLang = e.target.value;
                setSelectedLang(newLang);
                localStorage.setItem('selectedLang', newLang);
              }}
            >
              <option value="c">C Programming</option>
              <option value="cpp">C++ Programming</option>
              <option value="python">Python 3</option>
              <option value="java">Java Programming</option>
            </select>

            <button 
              className="run-btn" 
              onClick={compileAndRun}
              disabled={isCompiling}
            >
              {isCompiling ? (
                <Terminal size={18} className="spin" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
              {isCompiling ? 'Compiling...' : 'Compile & Run'}
            </button>
          </div>
        </header>

        <section className="workspace">
          {/* Left Panel - Theory or Stats */}
          <div className="theory-panel">
            <div className="panel-header">
              {isSandbox ? 'PLAYGROUND INFO' : 'THEORY & CONCEPTS'}
            </div>
            <div className="theory-content">
              {isSandbox ? (
                <div style={{ color: 'var(--text-dim)' }}>
                  <h3>Sandbox Mode</h3>
                  <p>Welcome to the Free Playground! Here you can write and execute code in multiple languages without any restrictions.</p>
                  <ul style={{ marginTop: '1.5rem' }}>
                    <li><strong>Language:</strong> Use the dropdown above to switch between C, C++, Python, and Java.</li>
                    <li><strong>Persistence:</strong> Code written here is stored in your current session.</li>
                    <li><strong>Execution:</strong> Your code runs in a secure, sandboxed environment with a 5-second timeout.</li>
                  </ul>
                  
                  <div className="challenge-box" style={{ marginTop: '2rem', background: 'rgba(168, 85, 247, 0.05)', borderLeftColor: 'var(--c-purple)' }}>
                    <h4 style={{ color: 'var(--c-purple)' }}>Pro Tip:</h4>
                    <p>For Java, please ensure your main class is named <code>Main</code>.</p>
                  </div>
                </div>
              ) : (
                <>
                  {topic.theory}
                  
                  {!completed.has(topic.id) ? (
                    <div className="challenge-box">
                      {topic.challenge}
                    </div>
                  ) : (
                    <div className="challenge-box" style={{ background: 'rgba(16, 185, 129, 0.05)', borderLeftColor: 'var(--c-green)' }}>
                      <h4 style={{ color: 'var(--c-green)' }}>Challenge Completed!</h4>
                      <p>Great job! You have fully mastered this section.</p>
                    </div>
                  )}

                  {/* Certificate Button shown on completing all topics */}
                  {isAllComplete && (
                    <Certificate username={fullname || username} progressScore={points} language={selectedLang} />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Editor & Terminal */}
          <div className="code-panel">
            
            <div className="editor-wrapper">
              <div className="panel-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={16} /> {isSandbox ? `main.${({c:'c', cpp:'cpp', python:'py', java:'java'}[selectedLang])}` : 'main.c'}
                </div>
                {isSandbox && <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>SANDBOX MODE</span>}
              </div>
              <textarea
                className="code-textarea"
                value={isSandbox ? playgroundCode[selectedLang] : code}
                onChange={(e) => {
                  if (isSandbox) {
                    setPlaygroundCode({ ...playgroundCode, [selectedLang]: e.target.value });
                  } else {
                    setCode(e.target.value);
                  }
                }}
                spellCheck="false"
              />
            </div>

            <div className="terminal-wrapper">
              <div className="terminal-header">
                <Terminal size={14} /> Output Console
              </div>
              <div className={`terminal-output ${isError ? 'error' : ''}`}>
                {output || <span style={{color: '#333'}}>Ready for compilation...</span>}
              </div>
            </div>

          </div>
        </section>

        {/* Success Modal Overlay */}
        <div className={`modal-overlay ${showModal ? 'visible' : ''}`}>
          <div className="modal-card">
            {isAllComplete ? (
              <div className="modal-icon" style={{ color: 'var(--c-purple)', background: 'rgba(168, 85, 247, 0.1)' }}>
                <Award strokeWidth={2} size={40} color="var(--c-purple)" />
              </div>
            ) : (
              <div className="modal-icon">
                <CheckCircle2 color="currentColor" strokeWidth={3} size={40} />
              </div>
            )}
            
            <h2 className="modal-title">{isAllComplete ? 'Course Completed!' : 'Level Cleared!'}</h2>
            <p className="modal-msg">
              {isAllComplete 
                ? "You have acquired all necessary fundamental skills in C. You are now officially a CodeForge C Developer."
                : topic.successMsg
              }
            </p>
            
            {currentTopicId < TOPICS.length ? (
              <button className="btn-proceed" onClick={handleNextTopic}>
                 Next Topic <ChevronRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
              </button>
            ) : (
              <button className="btn-proceed" style={{ background: 'var(--c-cyan)' }} onClick={() => setShowModal(false)}>
                Claim Certificate
              </button>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
