import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StreakTracker.css';

function StreakTracker({ refreshTrigger }) {
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0, lastWorkoutDate: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const fetchStreak = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/workouts/streak`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStreak(response.data);
    } catch (error) {
      console.error('Error fetching streak:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="streak-tracker loading-streak">Loading streak...</div>;
  }

  const { currentStreak, longestStreak } = streak;
  const hasStreak = currentStreak > 0;

  return (
    <div className="streak-tracker">
      <div className={`streak-card current-streak ${hasStreak ? 'active' : 'inactive'}`}>
        <div className="streak-icon">{hasStreak ? '🔥' : '💤'}</div>
        <div className="streak-info">
          <h3>{currentStreak}</h3>
          <p>Day Streak</p>
        </div>
      </div>

      <div className="streak-card longest-streak">
        <div className="streak-icon">🏆</div>
        <div className="streak-info">
          <h3>{longestStreak}</h3>
          <p>Longest Streak</p>
        </div>
      </div>

      {!hasStreak && (
        <div className="streak-nudge">
          {longestStreak > 0
            ? 'Your streak reset — log a workout today to start a new one! 💪'
            : 'Log a workout today to start your streak! 💪'}
        </div>
      )}
    </div>
  );
}

export default StreakTracker;
