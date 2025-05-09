import React from 'react';

const Toolbar = ({ onNavigate, onLogout }) => {
    return (
      <div style={toolbarStyle}>
        <button style={buttonStyle} onClick={() => onNavigate('workout')}> Workouts</button>
        <button style={buttonStyle} onClick={() => onNavigate('profile')}> Profile</button>
        <button style={buttonStyle} onClick={onLogout}> Logout</button>
      </div>
    );
  };
  

const toolbarStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#333',
  padding: '10px',
  gap: '100px'
};

const buttonStyle = {
  backgroundColor: '#0000',
  color: '#fff',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Toolbar;
