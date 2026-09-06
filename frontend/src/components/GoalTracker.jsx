import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GoalTracker.css';

const METRIC_LABELS = {
  workouts: 'Workouts',
  calories: 'Calories Burned',
  duration: 'Minutes Trained',
};

function GoalTracker({ refreshTrigger }) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    metric: 'workouts',
    period: 'weekly',
    targetValue: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/goals`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals(response.data.goals);
      setError('');
    } catch (err) {
      setError('Error fetching goals');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.targetValue || formData.targetValue <= 0) {
      setError('Please enter a valid target value');
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/goals`,
        {
          metric: formData.metric,
          period: formData.period,
          targetValue: parseFloat(formData.targetValue),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFormData({ metric: 'workouts', period: 'weekly', targetValue: '' });
      setShowForm(false);
      setError('');
      fetchGoals();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving goal');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(goals.filter((g) => g._id !== id));
    } catch (err) {
      setError('Error deleting goal');
    }
  };

  if (loading) {
    return <div className="goal-tracker loading-goals">Loading goals...</div>;
  }

  return (
    <div className="goal-tracker">
      <div className="goal-header">
        <h2>🎯 Your Goals</h2>
        <button className="btn-add-goal" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Set Goal'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form className="goal-form" onSubmit={handleSubmit}>
          <div className="goal-form-row">
            <div className="form-group">
              <label>Track</label>
              <select name="metric" value={formData.metric} onChange={handleChange}>
                <option value="workouts">Number of Workouts</option>
                <option value="calories">Calories Burned</option>
                <option value="duration">Minutes Trained</option>
              </select>
            </div>

            <div className="form-group">
              <label>Period</label>
              <select name="period" value={formData.period} onChange={handleChange}>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="form-group">
              <label>Target</label>
              <input
                type="number"
                name="targetValue"
                value={formData.targetValue}
                onChange={handleChange}
                placeholder={formData.metric === 'workouts' ? '4' : formData.metric === 'calories' ? '2000' : '150'}
                min="1"
                required
              />
            </div>

            <button type="submit" className="btn-save-goal" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Goal'}
            </button>
          </div>
        </form>
      )}

      {goals.length === 0 ? (
        <div className="no-goals">
          No goals set yet. Click "+ Set Goal" to create one and stay accountable!
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map((goal) => (
            <div key={goal._id} className={`goal-card ${goal.isCompleted ? 'completed' : ''}`}>
              <div className="goal-card-header">
                <span className="goal-title">
                  {METRIC_LABELS[goal.metric]} · {goal.period === 'weekly' ? 'This Week' : 'This Month'}
                </span>
                <button className="btn-delete-goal" onClick={() => handleDelete(goal._id)} title="Delete goal">
                  ✕
                </button>
              </div>

              <div className="goal-progress-bar">
                <div
                  className="goal-progress-fill"
                  style={{ width: `${goal.percentage}%` }}
                ></div>
              </div>

              <div className="goal-progress-text">
                <span>{goal.currentValue} / {goal.targetValue}</span>
                <span>{goal.isCompleted ? '✅ Goal reached!' : `${goal.percentage}%`}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalTracker;
