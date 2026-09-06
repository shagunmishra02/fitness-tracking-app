import React, { useState } from 'react';
import axios from 'axios';
import './WorkoutForm.css';

function WorkoutForm({ onWorkoutAdded }) {
  const [formData, setFormData] = useState({
    exerciseName: '',
    muscleGroup: 'chest',
    workoutType: 'strength',
    sets: '',
    reps: '',
    weight: '',
    duration: '',
    distance: '',
    caloriesBurned: '',
    intensity: 'moderate',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/workouts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onWorkoutAdded(response.data.workout);
      setFormData({
        exerciseName: '',
        muscleGroup: 'chest',
        workoutType: 'strength',
        sets: '',
        reps: '',
        weight: '',
        duration: '',
        distance: '',
        caloriesBurned: '',
        intensity: 'moderate',
        notes: '',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workout-form-container">
      <h2>Add New Workout</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="workout-form">
        <div className="form-row">
          <div className="form-group">
            <label>Exercise Name *</label>
            <input
              type="text"
              name="exerciseName"
              value={formData.exerciseName}
              onChange={handleChange}
              placeholder="e.g., Bench Press"
              required
            />
          </div>

          <div className="form-group">
            <label>Muscle Group *</label>
            <select name="muscleGroup" value={formData.muscleGroup} onChange={handleChange}>
              <option value="chest">Chest</option>
              <option value="back">Back</option>
              <option value="shoulders">Shoulders</option>
              <option value="biceps">Biceps</option>
              <option value="triceps">Triceps</option>
              <option value="forearms">Forearms</option>
              <option value="legs">Legs</option>
              <option value="cardio">Cardio</option>
              <option value="core">Core</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Workout Type *</label>
            <select name="workoutType" value={formData.workoutType} onChange={handleChange}>
              <option value="strength">Strength</option>
              <option value="cardio">Cardio</option>
              <option value="flexibility">Flexibility</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Duration (minutes) *</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="45"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Intensity</label>
            <select name="intensity" value={formData.intensity} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {formData.workoutType === 'strength' && (
          <div className="form-row">
            <div className="form-group">
              <label>Sets *</label>
              <input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                placeholder="3"
                min="1"
                required={formData.workoutType === 'strength'}
              />
            </div>

            <div className="form-group">
              <label>Reps *</label>
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                placeholder="10"
                min="1"
                required={formData.workoutType === 'strength'}
              />
            </div>

            <div className="form-group">
              <label>Weight (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="50"
                min="0"
                step="0.5"
                required={formData.workoutType === 'strength'}
              />
            </div>
          </div>
        )}

        {formData.workoutType === 'cardio' && (
          <div className="form-row">
            <div className="form-group">
              <label>Distance (km)</label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="5"
                min="0"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label>Calories Burned</label>
              <input
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleChange}
                placeholder="300"
                min="0"
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any notes about your workout..."
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding Workout...' : 'Add Workout'}
        </button>
      </form>
    </div>
  );
}

export default WorkoutForm;
