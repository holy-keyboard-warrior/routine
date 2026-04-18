import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Moon, TrendingUp, Dumbbell } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth } from 'date-fns';

import { Entry } from '../types';

interface InsightsViewProps {
  entries: Entry[];
}

export default function InsightsView({ entries }: InsightsViewProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const workoutCount = entries.filter(e => e.type === 'workout' && isSameMonth(parseISO(e.date), today)).length;
  const mealCount = entries.filter(e => e.type === 'meal' && isSameMonth(parseISO(e.date), today)).length;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full pb-32 lg:pb-10">
      <section className="mb-10">
        <span className="section-label">Retrospective</span>
        <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-4">Trends & Growth</h2>
        <div className="flex items-center gap-4">
          <span className="bg-primary text-white px-3 py-1 rounded-[4px] text-[10px] font-bold uppercase">
            {format(today, 'MMMM yyyy')}
          </span>
          <span className="text-[13px] text-on-surface-muted">Current month archive overview</span>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Heatmap Card */}
        <div className="lg:col-span-8 routine-card">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-[15px] font-semibold mb-1">Consistency Heatmap</h3>
              <p className="text-on-surface-muted text-[13px]">Daily commits pulse visualizer.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-on-surface-muted">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-[#EBEBEB] rounded-[2px]"></div>
                <div className="w-3 h-3 bg-[#D1E7D3] rounded-[2px]"></div>
                <div className="w-3 h-3 bg-[#A3CFAB] rounded-[2px]"></div>
                <div className="w-3 h-3 bg-[#75B782] rounded-[2px]"></div>
                <div className="w-3 h-3 bg-[#479F5A] rounded-[2px]"></div>
              </div>
              <span>More</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day, idx) => {
              const dayStr = format(day, 'yyyy-MM-dd');
              const dayEntries = entries.filter(e => e.date.startsWith(dayStr));
              const intensity = Math.min(dayEntries.length, 4);
              const colors = ['bg-[#EBEBEB]', 'bg-[#D1E7D3]', 'bg-[#A3CFAB]', 'bg-[#75B782]', 'bg-[#479F5A]'];
              
              return (
                <div 
                  key={idx}
                  title={`${format(day, 'MMM d')}: ${dayEntries.length} entries`}
                  className={`aspect-square ${colors[intensity]} rounded-[2px] transition-all cursor-crosshair`}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 space-y-10">
          <div>
            <span className="section-label">Stats Tracker (Month)</span>
            <div className="routine-card space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-on-surface-muted">Workouts</span>
                <span className="text-[15px] font-semibold">{workoutCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[13px] text-on-surface-muted">Meals Logged</span>
                <span className="text-[15px] font-semibold">{mealCount}</span>
              </div>
            </div>
          </div>

          <div>
             <span className="section-label">Journal Context</span>
             <div className="routine-card bg-bg-color border-none">
                <p className="text-[13px] leading-relaxed text-on-surface-muted">
                  {entries.length > 0
                    ? `You have documented your journey ${entries.length} times. Consistency builds the archive.`
                    : "No data patterns to visualize yet. Your first entry will begin the chronicle."}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { parseISO } from 'date-fns';


function InsightTag({ icon, title, value, sub }: any) {
  return (
    <div className="bg-surface-container p-8 rounded-xl flex items-center gap-6">
      <div className="p-4 bg-surface-container-lowest rounded-full text-primary">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">{title}</p>
        <p className="text-2xl font-bold text-on-surface">{value}</p>
        <p className="text-[10px] text-on-surface-variant uppercase font-medium">{sub}</p>
      </div>
    </div>
  );
}
