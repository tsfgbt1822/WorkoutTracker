import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProfile = ({ user }) => {
  const [goal, setGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState('');
  const [workouts, setWorkouts] = useState([]);

  const handleGoalSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/goal', {
        userId: user.id,
        goal,
      });
      if (res.data.success) {
        setSavedGoal(goal);
        setGoal('');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save goal');
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/workouts/${user.id}`);
        if (res.data.success) {
          setWorkouts(res.data.workouts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkouts();
  }, [user.id]);

  const handleRelogWorkout = async (originalWorkout) => {
    const newDate = prompt('Enter new date for this workout (YYYY-MM-DD):', new Date().toISOString().slice(0, 10));
    if (!newDate) return;
  
    try {
      const res = await axios.post('http://localhost:5000/api/workouts/create', {
        userId: user.id,
        workoutName: 'Relogged Workout',
        workoutDate: newDate,
        exercises: originalWorkout.exercises,
      });
  
      if (res.data.success) {
        alert('Workout relogged!');
        // Optionally re-fetch workouts:
        const updated = await axios.get(`http://localhost:5000/api/users/workouts/${user.id}`);
        if (updated.data.success) {
          setWorkouts(updated.data.workouts);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Failed to relog workout.');
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Dashboard</h2>

    <form 
        onSubmit={handleGoalSubmit} 
        style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}
    >
        <label htmlFor="goalInput">Set Your Fitness Goal:</label>
        <input
            id="goalInput"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Workout twice a week"
        />
        <button type="submit">Save Goal</button>
    </form>


      {savedGoal && <p><strong>Saved Goal:</strong> {savedGoal}</p>}

      <h3>Previous Workouts</h3>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul>
          {workouts.map((w, idx) => (
            <li key={idx}>
              <strong>{new Date(w.date).toLocaleDateString()}:</strong>
              <ul>
                {w.exercises.map((ex, i) => (
                  <li key={i}>
                    {ex.name} – {ex.sets} sets x {ex.reps} reps
                  </li>
                ))}
              </ul>
              <button onClick={() => handleRelogWorkout(w)} style={{ marginTop: '5px', padding: '5px 10px', fontSize: '14px', cursor: 'pointer' }}> Relog This Workout</button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewProfile;
