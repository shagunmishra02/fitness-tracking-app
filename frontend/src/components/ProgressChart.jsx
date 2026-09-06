import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './ProgressChart.css';

function ProgressChart({ workouts }) {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (workouts.length > 0) {
      // Prepare data for charts
      const strengthWorkouts = workouts.filter((w) => w.workoutType === 'strength');
      const cardioWorkouts = workouts.filter((w) => w.workoutType === 'cardio');

      // Weight progression chart
      const weightData = strengthWorkouts
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((w) => ({
          date: new Date(w.date).toLocaleDateString(),
          weight: w.weight,
          exercise: w.exerciseName,
        }));

      setChartData(weightData);

      // Calculate statistics
      const totalWorkouts = workouts.length;
      const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
      const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
      const avgDuration = (totalDuration / totalWorkouts).toFixed(1);

      // Muscle group breakdown
      const muscleGroups = {};
      workouts.forEach((w) => {
        muscleGroups[w.muscleGroup] = (muscleGroups[w.muscleGroup] || 0) + 1;
      });

      setStats({
        totalWorkouts,
        totalDuration,
        totalCalories,
        avgDuration,
        muscleGroups,
      });
    }
  }, [workouts]);

  if (!stats) {
    return <div>No data available</div>;
  }

  const muscleGroupData = Object.entries(stats.muscleGroups).map(([muscle, count]) => ({
    name: muscle,
    count,
  }));

  return (
    <div className="progress-container">
      <h2>Your Progress & Statistics</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalWorkouts}</h3>
          <p>Total Workouts</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalDuration}</h3>
          <p>Total Minutes</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalCalories}</h3>
          <p>Calories Burned</p>
        </div>
        <div className="stat-card">
          <h3>{stats.avgDuration}</h3>
          <p>Avg Duration (min)</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        {chartData.length > 0 && (
          <div className="chart-wrapper">
            <h3>Weight Progression</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#4CAF50"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {muscleGroupData.length > 0 && (
          <div className="chart-wrapper">
            <h3>Muscle Group Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={muscleGroupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2196F3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressChart;
