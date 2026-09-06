const Goal = require('../models/Goal');
const Workout = require('../models/Workout');

// Get the start date of the current period (calendar week starting Monday, or calendar month)
const getPeriodStart = (period) => {
  const now = new Date();

  if (period === 'monthly') {
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  // weekly: find Monday of the current week
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

// Calculate current progress for a single goal
const calculateProgress = async (userId, goal) => {
  const periodStart = getPeriodStart(goal.period);

  const workouts = await Workout.find({
    userId,
    date: { $gte: periodStart },
  });

  let currentValue = 0;
  if (goal.metric === 'workouts') {
    currentValue = workouts.length;
  } else if (goal.metric === 'calories') {
    currentValue = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
  } else if (goal.metric === 'duration') {
    currentValue = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  }

  const percentage = Math.min(100, Math.round((currentValue / goal.targetValue) * 100));

  return {
    currentValue,
    percentage,
    isCompleted: currentValue >= goal.targetValue,
    periodStart,
  };
};

// Create or update a goal (one active goal per metric+period)
const setGoal = async (req, res) => {
  try {
    const { metric, period, targetValue } = req.body;

    if (!metric || !targetValue) {
      return res.status(400).json({ message: 'Please provide a metric and target value' });
    }

    const goal = await Goal.findOneAndUpdate(
      { userId: req.userId, metric, period: period || 'weekly' },
      { userId: req.userId, metric, period: period || 'weekly', targetValue, isActive: true },
      { new: true, upsert: true, runValidators: true }
    );

    const progress = await calculateProgress(req.userId, goal);

    res.status(200).json({
      message: 'Goal saved successfully',
      goal: { ...goal.toObject(), ...progress },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active goals with live progress
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId, isActive: true }).sort({ createdAt: 1 });

    const goalsWithProgress = await Promise.all(
      goals.map(async (goal) => {
        const progress = await calculateProgress(req.userId, goal);
        return { ...goal.toObject(), ...progress };
      })
    );

    res.status(200).json({ goals: goalsWithProgress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  setGoal,
  getGoals,
  deleteGoal,
};
