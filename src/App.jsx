import React, { useState, useEffect } from 'react';
import { Play, Code2, Terminal, CheckCircle2, ChevronRight, BookOpen, Star } from 'lucide-react';
import { TOPICS } from './topics';
import './index.css';

function App() {
  const [currentTopicId, setCurrentTopicId] = useState(1);
  const [code, setCode] = useState(TOPICS[0].initialCode);
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [completed, setCompleted] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [points, setPoints] = useState(0);
  const [animatePoints, setAnimatePoints] = useState(false);

  const topic = TOPICS.find(t => t.id === currentTopicId);

  useEffect(() => {
    setCode(topic.initialCode);
    setOutput('');
    setShowModal(false);
  }, [topic]);

  const compileAndRun = async () => {
    setOutput('Compiling code...');
    setIsError(false);
    setIsCompiling(true);

    try {
      const response = await fetch('http://localhost:3001/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      
      setIsCompiling(false);

      if (data.status === 'error') {
        setOutput(data.output);
        setIsError(true);
      } else {
        setOutput(data.output);
        setIsError(false);
        
        if (topic.validate(data.output)) {
          setTimeout(() => {
            setShowModal(true);
            setCompleted(prev => {
              const next = new Set(prev);
              if (!next.has(topic.id)) {
                // Add points only if not previously completed
                setPoints(p => p + 100);
                setAnimatePoints(true);
                setTimeout(() => setAnimatePoints(false), 500);
              }
              next.add(topic.id);
              return next;
            });
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
    if (currentTopicId < TOPICS.length) {
      setCurrentTopicId(currentTopicId + 1);
    }
    setShowModal(false);
  };

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand">
          <div className="logo-icon">C</div>
          <h1>C - SIMULATOR</h1>
          <div className={`points-badge ${animatePoints ? 'animate' : ''}`}>
             <Star size={14} fill="currentColor" /> {points}
          </div>
        </div>
        
        <div className="topic-list">
          {TOPICS.map(t => (
            <button
              key={t.id}
              className={`topic-item ${currentTopicId === t.id ? 'active' : ''} ${completed.has(t.id) ? 'completed' : ''}`}
              onClick={() => setCurrentTopicId(t.id)}
            >
              <span>{t.title}</span>
              {completed.has(t.id) && <CheckCircle2 size={16} className="status-icon" />}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="main-area">
        <header className="header">
          <h2><BookOpen size={24} color="var(--c-blue)" /> {topic.title}</h2>
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
        </header>

        <section className="workspace">
          {/* Left Panel - Theory */}
          <div className="theory-panel">
            <div className="panel-header">
              THEORY & CONCEPTS
            </div>
            <div className="theory-content">
              {topic.theory}
              <div className="challenge-box">
                {topic.challenge}
              </div>
            </div>
          </div>

          {/* Right Panel - Editor & Terminal */}
          <div className="code-panel">
            
            <div className="editor-wrapper">
              <div className="panel-header">
                <Code2 size={16} /> main.c
              </div>
              <textarea
                className="code-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
            <div className="modal-icon">
              <CheckCircle2 color="currentColor" strokeWidth={3} size={40} />
            </div>
            <h2 className="modal-title">Level Cleared!</h2>
            <p className="modal-msg">{topic.successMsg}</p>
            {currentTopicId < TOPICS.length ? (
              <button className="btn-proceed" onClick={handleNextTopic}>
                Next Topic <ChevronRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
              </button>
            ) : (
              <div style={{ color: 'var(--c-blue)', fontWeight: 'bold' }}>
                🎉 You've completed all topics! Good job!
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
