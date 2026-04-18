import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Dumbbell, Droplets, BookOpen, UserCircle2 } from 'lucide-react';
import { Entry } from '../types';
import { format, isSameDay, parseISO } from 'date-fns';

interface DashboardViewProps {
  entries: Entry[];
  onViewChange: (view: any) => void;
  selectedDate: Date;
}

export default function DashboardView({ entries, onViewChange, selectedDate }: DashboardViewProps) {
  const todayLabel = format(selectedDate, 'MMMM d');
  
  const todayEntries = entries.filter(e => isSameDay(parseISO(e.date), selectedDate));

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
            </div>
          </div>

          <div>
            <span className="section-label">Stats</span>
            <div className="routine-card space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-on-surface-muted">Total Logs</span>
                <span className="text-[15px] font-semibold">{entries.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-on-surface-muted">Today</span>
                <span className="text-[15px] font-semibold">{todayEntries.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Today's Activity */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <span className="section-label">Today's Activity — {todayLabel}</span>
          <div className="bg-surface rounded-xl overflow-hidden">
            {todayEntries.length === 0 ? (
              <div className="py-20 text-center border-b border-border">
                <p className="text-on-surface-muted italic text-[13px]">No activity logged for today.</p>
              </div>
            ) : (
              todayEntries.map(entry => (
                <ActivityItem 
                  key={entry.id}
                  time={entry.type === 'meal' ? entry.time : undefined}
                  title={entry.type === 'meal' ? entry.description : entry.workoutType} 
                  meta={entry.type === 'meal' ? entry.category.toUpperCase() : `${entry.duration}m Workout`} 
                  tag="Logged"
                />
              ))
            )}
          </div>
        </div>

        {/* Right Column: Analytics */}
        <div className="lg:col-span-3 space-y-10 order-3 shadow-sm lg:shadow-none">
          <div>
            <span className="section-label">Consistency</span>
            <div className="routine-card">
              <p className="text-[13px] leading-relaxed text-on-surface-muted">
                {entries.length > 0 
                  ? `You have documented ${entries.length} moments in your archive.`
                  : "Start logging your daily movements and fuel to see patterns emerge."}
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
