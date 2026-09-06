import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import ProgressChart from '../components/ProgressChart';
import StreakTracker from '../components/StreakTracker';
import GoalTracker from '../components/GoalTracker';
import './Dashboard.css';

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/workouts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWorkouts(response.data.workouts);
      setError('');
    } catch (err) {
      setError('Error fetching workouts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutAdded = (newWorkout) => {
    setWorkouts([newWorkout, ...workouts]);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleWorkoutDeleted = (id) => {
    setWorkouts(workouts.filter((w) => w._id !== id));
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1>💪 Fitness Dashboard</h1>

        {error && <div className="error-message">{error}</div>}

        <StreakTracker refreshTrigger={refreshTrigger} />
        <GoalTracker refreshTrigger={refreshTrigger} />

        <WorkoutForm onWorkoutAdded={handleWorkoutAdded} />

        {loading ? (
          <div className="loading">Loading your workouts...</div>
        ) : (
          <>
            <WorkoutList
              workouts={workouts}
              onWorkoutDeleted={handleWorkoutDeleted}
              onRefresh={fetchWorkouts}
            />
            {workouts.length > 0 && <ProgressChart workouts={workouts} />}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
