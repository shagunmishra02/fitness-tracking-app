const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    metric: {
      type: String,
      enum: ['workouts', 'calories', 'duration'],
      required: [true, 'Please specify what this goal tracks'],
    },
    period: {
      type: String,
      enum: ['weekly', 'monthly'],
      default: 'weekly',
      required: true,
    },
    targetValue: {
      type: Number,
      required: [true, 'Please provide a target value'],
      min: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// A user can only have one active goal per metric+period combo
goalSchema.index({ userId: 1, metric: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('Goal', goalSchema);
