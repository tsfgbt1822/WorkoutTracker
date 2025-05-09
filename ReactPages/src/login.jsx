import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? 'register' : 'login';
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        userID,
        password,  
      });

      if (res.data.success) {
        onLoginSuccess(res.data.user);
      } else {
        setErrorMessage(res.data.message || `${isRegistering ? 'Registration' : 'Login'} failed`);
      }
    } catch (err) {
      setErrorMessage(`Error ${isRegistering ? 'registering' : 'logging in'}.`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      minHeight: '100vh', 
      backgroundColor: '#f4f4f4',
    }}>
    
      <form 
        onSubmit={handleAuth}
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '300px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
          {isRegistering ? 'Register' : 'Login'}
        </h2>

        <input
          type="text"
          placeholder="User ID"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {isRegistering ? 'Create Account' : 'Login'}
        </button>

        <button 
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage('');
          }}
          style={{ background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer', textAlign: 'center' }}
        >
          {isRegistering ? 'Already have an account? Login' : 'New user? Create an account'}
        </button>

        {errorMessage && (
          <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default Login;
