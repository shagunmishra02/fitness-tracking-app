const express = require('express');
const { setGoal, getGoals, deleteGoal } = require('../controllers/goalController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(authMiddleware);

router.post('/', setGoal);
router.get('/', getGoals);
router.delete('/:id', deleteGoal);

module.exports = router;
