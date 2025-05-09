import axios from 'axios';
import React, { useState } from 'react';

const WorkoutCreationPage = ({ user }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }]);

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/workouts/create', {
        userId: user?.id || null,
        workoutName,
        workoutDate,
        exercises,
      });

      if (res.data.success) {
        alert('Workout saved!');
        setWorkoutName('');
        setWorkoutDate('');
        setExercises([{ name: '', sets: '', reps: '' }]);
      } else {
        alert('Failed to save workout');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving workout');
    }
  };
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Create New Workout</h1>

      <div className="form-group">
        <label>Workout Name:</label>
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          placeholder="Enter workout name"
          required
        />
      </div>

      <div className="form-group">
        <label>Workout Date:</label>
        <input
          type="date"
          value={workoutDate}
          onChange={(e) => setWorkoutDate(e.target.value)}
          required
        />
      </div>

      <h2>Exercises</h2>
      {exercises.map((exercise, index) => (
        <div key={index} className="exercise-group">
          <input
            type="text"
            value={exercise.name}
            onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
            placeholder="Exercise Name"
            required
          />
          <input
            type="number"
            value={exercise.sets}
            onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
            placeholder="Sets"
            required
          />
          <input
            type="number"
            value={exercise.reps}
            onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
            placeholder="Reps"
            required
          />
        </div>
      ))}

      <button type="button" onClick={addExercise}>Add Exercise</button>
      <br /><br />
      <button type="submit">Save Workout</button>
    </form>
  );
};

export default WorkoutCreationPage;