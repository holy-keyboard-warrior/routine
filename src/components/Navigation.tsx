import React from 'react';
import { LayoutDashboard, CalendarRange, BarChart3, History, HelpCircle, Shield } from 'lucide-react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'habit-log', label: 'Habit Log', icon: CalendarRange },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
  ] as const;

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface border-r border-border p-8 space-y-12 z-50">
      <div className="logo flex flex-col">
        <span className="font-bold text-xl tracking-[-0.5px]">ROUTINE.</span>
      </div>

      <nav className="space-y-4 flex-grow">
        <div className="section-label mb-4">Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 py-2 transition-all duration-200 text-left ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-muted hover:text-on-surface'
              }`}
            >
              <Icon size={18} />
              <span className="text-[13px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-border">
        <button 
          onClick={() => onViewChange('habit-log')}
          className="routine-btn w-full"
        >
          + Quick Log
        </button>
      </div>
    </aside>
  );
}
