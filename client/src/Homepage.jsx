import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css'; // Assuming you have some CSS for styling
import 'vanta/dist/vanta.birds.min.js'; // Import Vanta.js birds effect

const Homepage = () => {
  const navigate = useNavigate();
  const backgroundRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    if (!vantaEffectRef.current && window.VANTA && window.VANTA.BIRDS && backgroundRef.current) {
      vantaEffectRef.current = window.VANTA.BIRDS({
        el: backgroundRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
      });
    }

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  const handleContinue = () => {
    navigate('/app');
  };

  return (
    <div ref={backgroundRef} style={{ height: '100vh', width: '100vw' }}>
      <div style={{ textAlign: 'center', paddingTop: '20vh', color: 'white' }}>
        <h1>Welcome to E-Voting System</h1>
        <button
          onClick={handleContinue}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#7f5af0',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Homepage;
