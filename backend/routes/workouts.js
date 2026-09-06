const express = require('express');
const {
  addWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats,
  getPersonalRecords,
  getWorkoutStreak,
} = require('../controllers/workoutController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', addWorkout);
router.get('/', getAllWorkouts);
router.get('/stats', getWorkoutStats);
router.get('/prs', getPersonalRecords);
router.get('/streak', getWorkoutStreak);
router.get('/:id', getWorkoutById);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
