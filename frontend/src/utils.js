// Calorie Calculator Utility

// MET values for different exercises
const MET_VALUES = {
  // Strength Training
  'chest': 6,
  'back': 6,
  'shoulders': 6,
  'biceps': 6,
  'triceps': 6,
  'forearms': 6,
  'legs': 6,
  'core': 6,
  
  // Cardio
  'cardio': 9.8,
  
  // Other
  'flexibility': 2.5,
  'sports': 7,
  'other': 5,
};

/**
 * Calculate calories burned
 * Formula: Calories = MET × Body Weight (kg) × Duration (hours) × Intensity Multiplier
 */
export const calculateCalories = (muscleGroup, duration, bodyWeight, intensity = 'moderate') => {
  let metValue = MET_VALUES[muscleGroup] || 5;
  
  // Adjust MET based on intensity
  const intensityMultiplier = {
    'low': 0.7,
    'moderate': 1,
    'high': 1.3,
  };
  
  metValue = metValue * (intensityMultiplier[intensity] || 1);
  
  // Convert duration from minutes to hours
  const durationInHours = duration / 60;
  
  // Calculate calories
  const calories = metValue * bodyWeight * durationInHours;
  
  // Round to nearest whole number
  return Math.round(calories);
};

export const getMETValue = (muscleGroup) => {
  return MET_VALUES[muscleGroup] || 5;
};

export const getAllMETValues = () => {
  return MET_VALUES;
};