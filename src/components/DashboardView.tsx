import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Dumbbell, Droplets, BookOpen, UserCircle2 } from 'lucide-react';
import { Entry } from '../types';

interface DashboardViewProps {
  entries: Entry[];
  onViewChange: (view: any) => void;
}

export default function DashboardView({ entries, onViewChange }: DashboardViewProps) {
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
  // Mock data for progress
  const progressPercent = 82;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full pb-32 lg:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
        {/* Left Column: Quick Input */}
        <div className="lg:col-span-3 space-y-8 md:space-y-10 order-2 lg:order-1">
          <div>
            <span className="section-label">Quick Input</span>
            <div className="routine-card space-y-3">
              <button 
                onClick={() => onViewChange('habit-log')}
                className="routine-btn w-full"
              >
                + Log Meal
              </button>
              <button 
                onClick={() => onViewChange('habit-log')}
                className="routine-btn routine-btn-outline w-full"
              >
                + Log Workout
              </button>
              <button 
                onClick={() => onViewChange('habit-log')}
                className="routine-btn routine-btn-outline w-full"
              >
                + Track Habit
              </button>
            </div>
          </div>

          <div>
            <span className="section-label">Stats</span>
            <div className="routine-card space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-on-surface-muted">Day Streak</span>
                <span className="text-[15px] font-semibold">12 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-on-surface-muted">Goal Progress</span>
                <span className="text-[15px] font-semibold">85%</span>
              </div>
              <div className="h-1 bg-border w-full rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full bg-success rounded-full transition-all duration-1000" 
                  style={{ width: `85%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Today's Activity */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <span className="section-label">Today's Activity — {today}</span>
          <div className="bg-surface rounded-xl overflow-hidden">
            <ActivityItem 
              time="09:15 AM"
              title="Hydration Target" 
              meta="Water • 0.5L" 
              tag="Completed"
            />
            <ActivityItem 
              time="07:30 AM"
              title="Deep Work: Reading" 
              meta="Habit • 45m" 
              tag="Completed"
            />
            <ActivityItem 
              time="09:00 PM"
              title="Evening Meditation" 
              meta="Scheduled" 
              tag="Pending"
              dimmed
            />
            {entries.filter(e => e.type === 'meal').map(meal => (
               <ActivityItem 
                key={meal.id}
                time={meal.time}
                title={meal.description} 
                meta={`${meal.category.toUpperCase()} • Nutritious`} 
                tag="Logged"
               />
            ))}
          </div>
        </div>

        {/* Right Column: Insights */}
        <div className="lg:col-span-3 space-y-10 order-3 shadow-sm lg:shadow-none">
           <div>
            <span className="section-label">Monthly View</span>
            <div className="routine-card">
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }).map((_, i) => {
                  const level = Math.floor(Math.random() * 5);
                  const colors = ['bg-[#EBEBEB]', 'bg-[#D1E7D3]', 'bg-[#A3CFAB]', 'bg-[#75B782]', 'bg-[#479F5A]'];
                  return (
                    <div key={i} className={`aspect-square ${colors[level]} rounded-[2px]`}></div>
                  );
                })}
              </div>
              <div className="mt-4 text-[11px] text-on-surface-muted">
                Oct Consistency: 26 / 31 days
              </div>
            </div>
          </div>

          <div>
            <span className="section-label">Insights</span>
            <div className="routine-card">
              <p className="text-[13px] leading-relaxed text-on-surface-muted">
                You're tracking <strong className="text-on-surface">20% more workouts</strong> than last week. Your most frequent meal time is <strong className="text-on-surface">12:45 PM</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ time, title, meta, tag, dimmed = false }: any) {
  return (
    <div className={`flex items-start gap-4 py-6 border-b border-border ${dimmed ? 'opacity-40' : ''}`}>
      <div className="w-[70px] flex-shrink-0 pt-0.5">
        <span className="text-[12px] font-mono text-on-surface-muted">{time || '--:-- --'}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-[14px] font-semibold text-on-surface mb-1">{title}</h4>
        <div className="flex items-center gap-2">
           <p className="text-[13px] text-on-surface-muted">{meta}</p>
           {tag && <span className="routine-tag">{tag}</span>}
        </div>
      </div>
    </div>
  );
}
