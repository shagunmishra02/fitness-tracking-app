const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exerciseName: {
      type: String,
      required: [true, 'Please provide exercise name'],
      trim: true,
    },
    muscleGroup: {
      type: String,
      enum: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'legs', 'cardio', 'core', 'other'],
      required: true,
    },
    workoutType: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'sports', 'other'],
      default: 'strength',
    },
    sets: {
      type: Number,
      required: function () {
        return this.workoutType === 'strength';
      },
      min: 1,
    },
    reps: {
      type: Number,
      required: function () {
        return this.workoutType === 'strength';
      },
      min: 1,
    },
    weight: {
      type: Number, // in kg
      required: function () {
        return this.workoutType === 'strength';
      },
      min: 0,
    },
    duration: {
      type: Number, // in minutes
      required: true,
      min: 1,
    },
    distance: {
      type: Number, // in km (for cardio)
      required: function () {
        return this.workoutType === 'cardio';
      },
    },
    caloriesBurned: {
      type: Number,
      min: 0,
    },
    intensity: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      default: 'moderate',
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries
workoutSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Workout', workoutSchema);
