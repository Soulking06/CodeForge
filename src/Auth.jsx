import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onLogin(data.token, data.username);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-dark)'
    }}>
      <div style={{
        background: 'var(--bg-panel)',
        padding: '3rem',
        borderRadius: '16px',
        border: '1px solid rgba(14, 165, 233, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.25)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          <div className="logo-icon" style={{ boxShadow: 'none' }}>C</div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff' }}>CodeForge</h1>
        </div>

        <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-sans)', color: 'var(--text-main)', fontSize: '1.5rem' }}>
          {isLogin ? 'Initialize Session' : 'Create Access Token'}
        </h2>

        {error && <div style={{ color: 'var(--c-red)', marginBottom: '1rem', background: 'rgba(239,68,68,0.1)', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              background: '#010103',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
              outline: 'none',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              background: '#010103',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
              outline: 'none',
              fontFamily: 'var(--font-mono)'
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="run-btn"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
          >
            {loading ? <Terminal size={18} className="spin" /> : (isLogin ? 'Login to Portal' : 'Register Core Identity')}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already initialized? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: 'var(--c-blue)', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>

      </div>
    </div>
  );
}
