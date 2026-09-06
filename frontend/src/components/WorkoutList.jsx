import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2 } from 'lucide-react';
import './WorkoutList.css';

function WorkoutList({ workouts, onWorkoutDeleted, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/workouts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onWorkoutDeleted(id);
      } catch (error) {
        alert('Error deleting workout');
      }
    }
  };

  const filteredWorkouts =
    filter === 'all'
      ? workouts
      : workouts.filter((w) => w.workoutType === filter);

  if (workouts.length === 0) {
    return (
      <div className="empty-state">
        <p>No workouts yet. Start by adding your first workout! 💪</p>
      </div>
    );
  }

  return (
    <div className="workout-list-container">
      <div className="workout-header">
        <h2>Your Workouts</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Workouts</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="flexibility">Flexibility</option>
          <option value="sports">Sports</option>
        </select>
      </div>

      <div className="workouts-grid">
        {filteredWorkouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <div className="workout-card-header">
              <h3>{workout.exerciseName}</h3>
              <span className="badge badge-{workout.workoutType}">
                {workout.workoutType}
              </span>
            </div>

            <div className="workout-card-body">
              <div className="workout-info">
                <p>
                  <strong>Muscle Group:</strong> {workout.muscleGroup}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(workout.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Duration:</strong> {workout.duration} min
                </p>
                <p>
                  <strong>Intensity:</strong> {workout.intensity}
                </p>

                {workout.workoutType === 'strength' && (
                  <>
                    <p>
                      <strong>Sets:</strong> {workout.sets}
                    </p>
                    <p>
                      <strong>Reps:</strong> {workout.reps}
                    </p>
                    <p>
                      <strong>Weight:</strong> {workout.weight} kg
                    </p>
                  </>
                )}

                {workout.workoutType === 'cardio' && (
                  <>
                    {workout.distance && (
                      <p>
                        <strong>Distance:</strong> {workout.distance} km
                      </p>
                    )}
                    {workout.caloriesBurned && (
                      <p>
                        <strong>Calories:</strong> {workout.caloriesBurned} kcal
                      </p>
                    )}
                  </>
                )}

                {workout.notes && (
                  <p>
                    <strong>Notes:</strong> {workout.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="workout-card-footer">
              <button className="btn btn-secondary">
                <Edit2 size={18} /> Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(workout._id)}
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutList;
