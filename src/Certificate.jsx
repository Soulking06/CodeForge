import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Certificate({ username, progressScore, language }) {
  const certificateRef = useRef(null);

  const langConfig = {
    c: { name: 'C Programming', short: 'C', g1: '#0ea5e9', g2: '#3b82f6', shield1: '#0284c7', shield2: '#0369a1', line: '#bae6fd' },
    python: { name: 'Python 3', short: 'Py', g1: '#fcd34d', g2: '#f59e0b', shield1: '#d97706', shield2: '#b45309', line: '#fde68a' },
    java: { name: 'Java 21', short: 'Java', g1: '#fca5a5', g2: '#ef4444', shield1: '#dc2626', shield2: '#991b1b', line: '#fecaca' },
    cpp: { name: 'C++ 20', short: 'C++', g1: '#93c5fd', g2: '#3b82f6', shield1: '#2563eb', shield2: '#1d4ed8', line: '#bfdbfe' },
  };
  
  const currentLang = langConfig[language] || langConfig.c;

  // Generate a random-looking credential ID
  const generateHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  };

  const downloadCertificate = () => {
    const element = certificateRef.current;
    
    // Temporarily make it visible for html2canvas
    element.style.top = '0px';
    element.style.left = '0px';
    element.style.position = 'relative';

    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CodeForge_Certificate_${username.replace(/\s+/g, '_')}.pdf`);

      // Hide it back
      element.style.position = 'absolute';
      element.style.top = '-10000px';
      element.style.left = '-10000px';
    });
  };

  const credentialId = `C${generateHash(username + 'codeforge')}A87F${generateHash(progressScore.toString())}`;
  const certNumber = `${progressScore}-PT-3500`;
  const dateFormatted = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <button 
        onClick={downloadCertificate} 
        style={{
          background: 'linear-gradient(135deg, var(--c-purple), var(--c-cyan))',
          color: '#000',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontFamily: 'var(--font-sans)',
          fontWeight: '700',
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
          marginBottom: '2rem'
        }}
      >
        🎓 Download Certificate of Completion
      </button>

      {/* Hidden Certificate Off-Screen for rendering */}
      <div style={{
        position: 'absolute',
        top: '-10000px',
        left: '-10000px'
      }}>
        <div ref={certificateRef} style={{
          width: '1123px',  // A4 Landscape 150dpi
          height: '794px',
          padding: '40px',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(#1e293b 2px, transparent 2px), radial-gradient(#1e293b 2px, transparent 2px)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px',
          boxSizing: 'border-box',
          fontFamily: '"Inter", sans-serif',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px 80px'
          }}>
            
            {/* Logo area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', marginBottom: '60px' }}>
              <div style={{
                background: `linear-gradient(135deg, ${currentLang.g1}, ${currentLang.g2})`,
                color: 'white',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '24px',
                fontFamily: '"Orbitron", sans-serif'
              }}>{currentLang.short}</div>
              <div style={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: '28px',
                color: '#0f172a',
                letterSpacing: '1px'
              }}>CodeForge</div>
            </div>

            {/* Candidate Info */}
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#0f172a', marginBottom: '15px' }}>
              {username}
            </div>
            
            <div style={{ fontSize: '18px', color: '#475569', marginBottom: '30px' }}>
              has successfully passed all requirements for
            </div>

            <div style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', marginBottom: '80px' }}>
              CodeForge Certified: {currentLang.name} Fundamentals
            </div>

            {/* Footer Area */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'flex-end',
              position: 'absolute',
              bottom: '80px',
              padding: '0 80px',
              boxSizing: 'border-box'
            }}>
              
              {/* Footer Left */}
              <div style={{ fontSize: '12px', color: '#334155', lineHeight: '2' }}>
                <div>Credential ID: {credentialId}</div>
                <div>Certification number: {certNumber}</div>
                <div>Earned on: {dateFormatted}</div>
                <div style={{
                  marginTop: '15px',
                  backgroundColor: '#f1f5f9',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: '500',
                  fontSize: '13px',
                  color: '#0f172a'
                }}>
                  <span style={{ fontWeight: 'bold' }}>✓</span> Online Verifiable
                </div>
              </div>

              {/* Badge Area */}
              <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateY(-20px)'
              }}>
                {/* CSS Shield */}
                <div style={{
                  width: '120px',
                  height: '140px',
                  background: `linear-gradient(135deg, ${currentLang.shield1}, ${currentLang.shield2})`,
                  clipPath: 'polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingTop: '25px',
                  boxShadow: `inset 0 0 0 4px ${currentLang.line}` // Note: inset shadow might not fully render on clip-path in html2canvas but provides fallback
                }}>
                  {/* Since html2canvas struggles with inset shadow + clip paths sometimes, add a nested div */}
                  <div style={{
                    width: '112px',
                    height: '132px',
                    background: 'transparent',
                    border: `2px solid ${currentLang.line}`,
                    clipPath: 'polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)',
                    position: 'absolute',
                    top: '4px',
                    left: '2px' // offset adjustment
                  }}></div>

                  <div style={{
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    textAlign: 'center',
                    marginBottom: '5px',
                    zIndex: 2
                  }}>CodeForge<br/>Certified</div>
                  <div style={{
                    background: 'white',
                    color: '#0f172a',
                    padding: '6px 15px',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    marginBottom: '10px',
                    letterSpacing: '1px',
                    zIndex: 2,
                    position: 'relative'
                  }}>FUNDAMENTALS</div>
                  <div style={{
                    color: 'white',
                    fontSize: '28px',
                    marginTop: '5px',
                    zIndex: 2
                  }}>★</div>
                </div>
              </div>

              {/* Footer Right */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'cursive, "Brush Script MT"', // graceful fallback for script
                  fontSize: '32px',
                  color: '#0f172a',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '5px',
                  marginBottom: '5px',
                  display: 'inline-block',
                  minWidth: '200px',
                  fontStyle: 'italic'
                }}>CodeForge AI</div>
                <div style={{ fontSize: '12px', color: '#475569', fontWeight: '500' }}>Platform Administrator</div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
