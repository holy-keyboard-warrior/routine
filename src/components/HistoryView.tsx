import React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Utensils, ArrowUpRight, Zap } from 'lucide-react';
import { Entry } from '../types';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

interface HistoryViewProps {
  entries: Entry[];
}

export default function HistoryView({ entries }: HistoryViewProps) {
  const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Group by date
  const groups: { [key: string]: Entry[] } = {};
  sortedEntries.forEach(entry => {
    const dateKey = entry.date.split('T')[0];
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(entry);
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto w-full pb-32 lg:pb-10">
      <section className="mb-12">
        <span className="section-label">Journal Archive</span>
        <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-4">Historical Chronicle</h2>
        <p className="text-on-surface-muted max-w-md text-[13px] leading-relaxed">
          Your personal archive of moments, fuel, and exertion documenting the chosen journey.
        </p>
      </section>

      <div className="space-y-12">
        {Object.entries(groups).map(([dateKey, groupEntries]) => (
          <div key={dateKey}>
            <div className="mb-4">
              <span className="text-[12px] font-bold text-primary">
                {formatDateLabel(dateKey)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupEntries
                .sort((a, b) => {
                  const getTime = (e: Entry) => (e.type === 'meal' ? e.time : '00:00');
                  return getTime(a).localeCompare(getTime(b));
                })
                .map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
            </div>
          </div>
        ))}

        {sortedEntries.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-on-surface-muted italic text-[13px]">The chronicle is currently silent.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDateLabel(dateStr: string) {
  const d = parseISO(dateStr);
  if (isToday(d)) return `Today, ${format(d, 'MMMM d')}`;
  if (isYesterday(d)) return `Yesterday, ${format(d, 'MMMM d')}`;
  return format(d, 'EEEE, MMMM d');
}

function EntryCard({ entry }: { entry: Entry, key?: any }) {
  const time = entry.type === 'meal' ? entry.time : format(parseISO(entry.date), 'hh:mm a');

  return (
    <div className="routine-card flex items-start gap-4 hover:border-primary/20 transition-colors group">
      <div className="w-[60px] flex-shrink-0 pt-0.5">
        <span className="text-[12px] font-mono text-on-surface-muted">{time || '--:-- --'}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-[14px] font-semibold text-on-surface">{entry.type === 'workout' ? entry.workoutType : entry.description}</h4>
          <span className="routine-tag">{entry.type}</span>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-[13px] text-on-surface-muted">
            {entry.type === 'workout' ? `${entry.duration} mins` : entry.category}
          </p>
          {entry.type === 'workout' && entry.notes && (
            <p className="text-[13px] text-on-surface-muted italic truncate max-w-[150px]">— {entry.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}
