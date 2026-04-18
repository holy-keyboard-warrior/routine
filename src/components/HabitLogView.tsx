import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Utensils, Clock } from 'lucide-react';
import { Entry, MealCategory } from '../types';

interface HabitLogViewProps {
  onSave: (entry: Entry) => void;
}

export default function HabitLogView({ onSave }: HabitLogViewProps) {
  // Workout State
  const [workoutType, setWorkoutType] = useState('Strength Training');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  // Meal State
  const [mealTime, setMealTime] = useState('');
  const [mealDesc, setMealDesc] = useState('');
  const [mealCat, setMealCat] = useState<MealCategory>('breakfast');

  const handleWorkoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workoutType || !duration) return;
    onSave({
      id: Math.random().toString(36).substr(2, 9),
      type: 'workout',
      date: new Date().toISOString(),
      workoutType,
      duration: parseInt(duration) || 0,
      notes,
    });
    setDuration('');
    setNotes('');
  };

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mealDesc || !mealTime) return;
    onSave({
      id: Math.random().toString(36).substr(2, 9),
      type: 'meal',
      date: new Date().toISOString(),
      time: mealTime,
      description: mealDesc,
      category: mealCat,
    });
    setMealTime('');
    setMealDesc('');
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full pb-32 lg:pb-10">
      <div className="mb-10">
        <span className="section-label">Log Entry</span>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface">Document your progress.</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Workout Form */}
        <div>
          <span className="section-label">Workouts</span>
          <div className="routine-card">
            <form onSubmit={handleWorkoutSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-on-surface-muted">Type</label>
                <select 
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  className="w-full bg-bg-color border border-border rounded-[8px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option>Strength Training</option>
                  <option>Cardiovascular</option>
                  <option>Yoga & Mobility</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-on-surface-muted">Duration (m)</label>
                <input 
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-bg-color border border-border rounded-[8px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="45"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-on-surface-muted">Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-bg-color border border-border rounded-[8px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary h-24 resize-none"
                  placeholder="How was it?"
                ></textarea>
              </div>
              <button type="submit" className="routine-btn w-full">+ Log Workout</button>
            </form>
          </div>
        </div>

        {/* Meal Form */}
        <div>
           <span className="section-label">Meals</span>
           <div className="routine-card">
            <form onSubmit={handleMealSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-on-surface-muted">Time</label>
                <input 
                  type="time" 
                  value={mealTime}
                  onChange={(e) => setMealTime(e.target.value)}
                  className="w-full bg-bg-color border border-border rounded-[8px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-on-surface-muted">Description</label>
                <input 
                  type="text" 
                  value={mealDesc}
                  onChange={(e) => setMealDesc(e.target.value)}
                  className="w-full bg-bg-color border border-border rounded-[8px] px-3 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Oatmeal, salad, etc."
                />
              </div>
              <div className="flex gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as MealCategory[]).map(cat => (
                  <button 
                    key={cat}
                    type="button" 
                    onClick={() => setMealCat(cat)}
                    className={`flex-1 py-1.5 rounded-[4px] text-[10px] font-semibold uppercase ${
                      mealCat === cat 
                        ? 'bg-primary text-white' 
                        : 'bg-[#F0F0F0] text-on-surface-muted hover:bg-border'
                    }`}
                  >
                    {cat[0]}
                  </button>
                ))}
              </div>
              <button type="submit" className="routine-btn w-full">+ Log Meal</button>
            </form>
           </div>
        </div>
      </div>
    </div>
  );
}

function Book({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
}
