/// <reference types="vite/client" />
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Check for common issues
    console.log('App mounted - checking environment:');
    console.log('React version:', React.version);
    console.log('Vite import:', import.meta.env);
  }, []);

  return (
    <div style={{
      backgroundColor: '#000',
      color: '#D4AF37',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Momoz Perfume Vault
        </h1>
        <p style={{ fontSize: '1.2rem' }}>
          Application is loading...<br />
          If you see this for more than 5 seconds, check the console for errors.
        </p>
      </div>
    </div>
  );
};

export default App;