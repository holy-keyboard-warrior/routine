export type View = 'dashboard' | 'habit-log' | 'insights' | 'history' | 'profile';

export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: string;
  type: 'meal';
  date: string; // ISO string for the day
  time: string; // HH:mm
  description: string;
  category: MealCategory;
  calories?: number;
}

export interface Workout {
  id: string;
  type: 'workout';
  date: string; // ISO string for the day
  workoutType: string;
  duration: number; // minutes
  notes: string;
  intensity?: 'Low' | 'Medium' | 'High';
  volume?: number; // kg
}

export type Entry = Meal | Workout;

export interface DailySummary {
  date: string;
  waterLiters: number;
  calories: number;
  sleepQuality: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  focusHours: number;
}
