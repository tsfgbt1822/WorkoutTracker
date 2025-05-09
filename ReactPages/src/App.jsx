import React, { useState, useEffect } from 'react';
import WorkoutCreationPage from './WorkoutCreationPage';
import Login from './login';
import Toolbar from './Toolbar';
import ViewProfile from './viewProfile';

function App() {
  const [page, setPage] = useState('workout');
  const [user, setUser] = useState(null);

  // Load user from localStorage (if any)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Handle login success
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setPage('workout');
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setPage('workout'); // send back to workout or login view
  };

  // Not logged in = Show login screen only
  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Toolbar onNavigate={setPage} onLogout={handleLogout} />

      {page === 'workout' && <WorkoutCreationPage user={user} />}
      {page === 'profile' && <ViewProfile user={user} />}
    </div>
  );
}

export default App;
