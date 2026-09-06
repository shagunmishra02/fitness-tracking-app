const Workout = require('../models/Workout');

// Add Workout
const addWorkout = async (req, res) => {
  try {
    const { exerciseName, muscleGroup, workoutType, sets, reps, weight, duration, distance, caloriesBurned, intensity, notes, date } = req.body;

    const workout = new Workout({
      userId: req.userId,
      exerciseName,
      muscleGroup,
      workoutType,
      sets,
      reps,
      weight,
      duration,
      distance,
      caloriesBurned,
      intensity,
      notes,
      date: date || Date.now(),
    });

    await workout.save();
    res.status(201).json({
      message: 'Workout added successfully',
      workout,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Workouts
const getAllWorkouts = async (req, res) => {
  try {
    const { startDate, endDate, muscleGroup } = req.query;

    let filter = { userId: req.userId };

    // Filter by date range
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    // Filter by muscle group
    if (muscleGroup) {
      filter.muscleGroup = muscleGroup;
    }

    const workouts = await Workout.find(filter).sort({ date: -1 });
    res.status(200).json({ workouts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if user owns this workout
    if (workout.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({ workout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Workout
const updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if user owns this workout
    if (workout.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    Object.assign(workout, req.body);
    await workout.save();

    res.status(200).json({
      message: 'Workout updated successfully',
      workout,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Workout
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if user owns this workout
    if (workout.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Workout.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Workout Statistics
const getWorkoutStats = async (req, res) => {
  try {
    const { period } = req.query; // 'week', 'month', 'year'

    const now = new Date();
    let startDate = new Date();

    if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(now.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(now.getFullYear() - 1);
    }

    const workouts = await Workout.find({
      userId: req.userId,
      date: { $gte: startDate },
    });

    // Calculate statistics
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const avgDuration = totalWorkouts > 0 ? (totalDuration / totalWorkouts).toFixed(2) : 0;

    // Group by muscle group
    const muscleGroupBreakdown = {};
    workouts.forEach((w) => {
      if (!muscleGroupBreakdown[w.muscleGroup]) {
        muscleGroupBreakdown[w.muscleGroup] = 0;
      }
      muscleGroupBreakdown[w.muscleGroup]++;
    });

    res.status(200).json({
      period,
      totalWorkouts,
      totalDuration,
      totalCalories,
      avgDuration,
      muscleGroupBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Personal Records
const getPersonalRecords = async (req, res) => {
  try {
    const prs = await Workout.find({ userId: req.userId })
      .sort({ weight: -1 })
      .limit(10);

    res.status(200).json({ prs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Workout Streak (current + longest consecutive-day streak)
const getWorkoutStreak = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 });

    if (workouts.length === 0) {
      return res.status(200).json({ currentStreak: 0, longestStreak: 0, lastWorkoutDate: null });
    }

    // Collect unique workout days (as YYYY-MM-DD) since multiple workouts can happen on the same day
    const dayKey = (d) => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    };

    const uniqueDays = [...new Set(workouts.map((w) => dayKey(w.date)))].sort((a, b) => b - a);

    const oneDayMs = 24 * 60 * 60 * 1000;
    const today = dayKey(new Date());
    const yesterday = today - oneDayMs;

    // Current streak: only counts if the most recent workout was today or yesterday
    let currentStreak = 0;
    if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
      currentStreak = 1;
      for (let i = 0; i < uniqueDays.length - 1; i++) {
        if (uniqueDays[i] - uniqueDays[i + 1] === oneDayMs) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    // Longest streak: scan through all unique days
    let longestStreak = 1;
    let running = 1;
    for (let i = 0; i < uniqueDays.length - 1; i++) {
      if (uniqueDays[i] - uniqueDays[i + 1] === oneDayMs) {
        running++;
        longestStreak = Math.max(longestStreak, running);
      } else {
        running = 1;
      }
    }

    res.status(200).json({
      currentStreak,
      longestStreak,
      lastWorkoutDate: workouts[0].date,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats,
  getPersonalRecords,
  getWorkoutStreak,
};
