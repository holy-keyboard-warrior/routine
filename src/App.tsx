import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import HabitLogView from './components/HabitLogView';
import InsightsView from './components/InsightsView';
import HistoryView from './components/HistoryView';
import { View, Entry } from './types';
import { getEntries, saveEntry } from './lib/storage';

const INITIAL_ENTRIES: Entry[] = [
  {
    id: '1',
    type: 'workout',
    date: new Date().toISOString(),
    workoutType: 'Strength Training',
    duration: 64,
    notes: 'Morning Hypertrophy session. Focused on volume.',
    intensity: 'High',
    volume: 12400
  },
  {
    id: '2',
    type: 'meal',
    date: new Date().toISOString(),
    time: '12:15',
    description: 'Mediterranean Quinoa Bowl',
    category: 'lunch',
    calories: 740
  },
  {
    id: '3',
    type: 'meal',
    date: new Date(Date.now() - 86400000).toISOString(),
    time: '18:45',
    description: 'Pan-Seared Salmon & Asparagus',
    category: 'dinner',
    calories: 580
  },
  {
    id: '4',
    type: 'workout',
    date: new Date(Date.now() - 86400000).toISOString(),
    workoutType: 'Evening Trail Run',
    duration: 45,
    notes: 'Reached 5.2km milestone.',
    volume: 0
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const stored = getEntries();
    if (stored.length === 0) {
      // Seed with mock data if empty
      INITIAL_ENTRIES.forEach(saveEntry);
      setEntries(INITIAL_ENTRIES);
    } else {
      setEntries(stored);
    }
  }, []);

  const handleSaveEntry = (entry: Entry) => {
    saveEntry(entry);
    setEntries(prev => [...prev, entry]);
    setCurrentView('history'); // Navigate to history after saving
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'The Quiet Archivist';
      case 'habit-log': return 'Archive Journal';
      case 'insights': return 'Trends & Growth';
      case 'history': return 'Archive';
      default: return 'Archivist';
    }
  };

  return (
    <div className="flex min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 lg:ml-64 relative min-h-screen flex flex-col">
        <Header title={getTitle()} />
        
        <div className="flex-1">
          {currentView === 'dashboard' && <DashboardView entries={entries} onViewChange={setCurrentView} />}
          {currentView === 'habit-log' && <HabitLogView onSave={handleSaveEntry} />}
          {currentView === 'insights' && <InsightsView />}
          {currentView === 'history' && <HistoryView entries={entries} />}
        </div>

        {/* Footer */}
        <footer className="mt-auto py-12 px-10 flex justify-between items-center opacity-30 pointer-events-none">
          <span className="text-[11px] tracking-widest font-semibold uppercase">Routine. Archive v2.0</span>
          <div className="flex gap-4">
            <div className="w-1 h-1 bg-on-surface rounded-full"></div>
            <div className="w-1 h-1 bg-on-surface rounded-full"></div>
            <div className="w-1 h-1 bg-on-surface rounded-full"></div>
          </div>
        </footer>
      </main>

      {/* Mobile Nav */}
      <nav className="lg:hidden fixed bottom-5 left-5 right-5 bg-surface border border-border py-4 px-6 flex justify-around items-center z-50 rounded-2xl shadow-lg">
        <MobileNavItem icon={<LayoutDashboard size={20} />} active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
        <MobileNavItem icon={<CalendarRange size={20} />} active={currentView === 'habit-log'} onClick={() => setCurrentView('habit-log')} />
        <MobileNavItem icon={<BarChart3 size={20} />} active={currentView === 'insights'} onClick={() => setCurrentView('insights')} />
        <MobileNavItem icon={<HistoryIcon size={20} />} active={currentView === 'history'} onClick={() => setCurrentView('history')} />
      </nav>
    </div>
  );
}

function MobileNavItem({ icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-2 transition-colors ${active ? 'text-primary' : 'text-on-surface-muted'}`}
    >
      {icon}
    </button>
  );
}

// Icons needed for mobile nav since they aren't exported from the component files individually
import { LayoutDashboard, CalendarRange, BarChart3, History as HistoryIcon } from 'lucide-react';

