import React, { useState } from 'react';
import WorkoutCreationPage from './WorkoutCreationPage';
import Login from './login'; 
function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <WorkoutCreationPage user={user} />
      ) : (
        <Login onLoginSuccess={setUser} />
      )}
    </div>
  );
}

export default App;
