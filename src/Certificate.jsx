import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Certificate({ username, progressScore }) {
  const certificateRef = useRef(null);

  const downloadCertificate = () => {
    const element = certificateRef.current;
    
    html2canvas(element, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // Create a landscape PDF
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CodeForge_Certificate_${username}.pdf`);
    });
  };

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
          width: '1123px',  // A4 Landscape 150dpi roughly
          height: '794px',
          background: '#0a0b14',
          border: '15px solid #0ea5e9',
          boxSizing: 'border-box',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Decorative background elements */}
          <div style={{
            position: 'absolute',
            top: '-200px',
            right: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 60%)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-200px',
            left: '-200px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 60%)',
            borderRadius: '50%'
          }}></div>
          
          <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: '3rem', color: '#0ea5e9', marginBottom: '20px', letterSpacing: '4px' }}>
            CERTIFICATE OF COMPLETION
          </h1>
          <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '40px' }}>
            This is to certify that
          </p>
          <h2 style={{ fontSize: '4rem', color: '#fff', borderBottom: '2px solid #22d3ee', paddingBottom: '10px', marginBottom: '40px', fontFamily: '"Fira Code", monospace' }}>
            {username}
          </h2>
          <p style={{ fontSize: '1.5rem', color: '#94a3b8', textAlign: 'center', maxWidth: '800px', lineHeight: '1.6' }}>
            has successfully completed the comprehensive <strong style={{color: '#fff'}}>C Programming Language Platform</strong> on CodeForge, demonstrating mastery of syntax, pointers, memory management, and system concepts.
          </p>
          
          <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 100px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>Final Score: {progressScore} PTS</div>
              <div style={{ borderTop: '1px solid #64748b', marginTop: '10px', paddingTop: '10px', color: '#64748b' }}>PERFORMANCE</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', border: '3px solid #10b981', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#10b981' }}>★</div>
              <div style={{ borderTop: '1px solid #64748b', marginTop: '10px', paddingTop: '10px', color: '#64748b' }}>VERIFIED BY CODEFORGE</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.2rem', color: '#fff' }}>{new Date().toLocaleDateString()}</div>
              <div style={{ borderTop: '1px solid #64748b', marginTop: '10px', paddingTop: '10px', color: '#64748b' }}>DATE ISSUED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
