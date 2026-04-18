import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import HabitLogView from './components/HabitLogView';
import InsightsView from './components/InsightsView';
import HistoryView from './components/HistoryView';
import ProfileView from './components/ProfileView';
import { View, Entry } from './types';
import { getEntries, saveEntry } from './lib/storage';
import { startOfDay } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider, db } from './lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, getDocFromServer, setDoc } from 'firebase/firestore';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfDay(new Date()));
  const [user, loading] = useAuthState(auth);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Archive access denied:', error);
    }
  };

  useEffect(() => {
    // Test connection
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
           console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (user) {
      // Sync with Firestore
      const q = query(collection(db, 'entries'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const firestoreEntries = snapshot.docs.map(doc => doc.data() as Entry);
        setEntries(firestoreEntries);
      }, (error) => {
        console.error("Firestore sync error:", error);
      });
      return () => unsubscribe();
    } else {
      // Fallback to localStorage for guest mode
      const stored = getEntries();
      setEntries(stored);
    }
  }, [user, loading]);

  const handleSaveEntry = async (entry: Entry) => {
    if (user) {
      // Save to Firestore
      try {
        const entryWithUser = { ...entry, userId: user.uid };
        await setDoc(doc(db, 'entries', entry.id), entryWithUser);
      } catch (error) {
        console.error("Error saving to archive:", error);
      }
    } else {
      // Guest mode
      saveEntry(entry);
      setEntries(prev => [...prev, entry]);
    }
    setCurrentView('history'); 
  };

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'The Quiet Archivist';
      case 'habit-log': return 'Archive Journal';
      case 'insights': return 'Trends & Growth';
      case 'history': return 'Archive';
      case 'profile': return 'Archivist Identity';
      default: return 'Archivist';
    }
  };

  return (
    <div className="flex min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 lg:ml-64 relative min-h-screen flex flex-col">
        <Header 
          title={getTitle()} 
          selectedDate={selectedDate} 
          onDateChange={setSelectedDate} 
          entries={entries}
        />
        
        <div className="flex-1">
          {currentView === 'dashboard' && (
            <DashboardView 
              entries={entries} 
              onViewChange={setCurrentView} 
              selectedDate={selectedDate}
            />
          )}
          {currentView === 'habit-log' && (
            <HabitLogView 
              onSave={handleSaveEntry} 
              selectedDate={selectedDate}
            />
          )}
          {currentView === 'insights' && <InsightsView entries={entries} />}
          {currentView === 'history' && <HistoryView entries={entries} />}
          {currentView === 'profile' && <ProfileView />}
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
      <nav className="lg:hidden fixed bottom-5 left-5 right-5 bg-surface border border-border py-4 px-4 flex justify-around items-center z-50 rounded-2xl shadow-lg">
        <MobileNavItem icon={<LayoutDashboard size={20} />} active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
        <MobileNavItem icon={<CalendarRange size={20} />} active={currentView === 'habit-log'} onClick={() => setCurrentView('habit-log')} />
        <MobileNavItem icon={<BarChart3 size={20} />} active={currentView === 'insights'} onClick={() => setCurrentView('insights')} />
        <MobileNavItem icon={<HistoryIcon size={20} />} active={currentView === 'history'} onClick={() => setCurrentView('history')} />
        {user ? (
          <MobileNavItem icon={<UserIcon size={20} />} active={currentView === 'profile'} onClick={() => setCurrentView('profile')} />
        ) : (
          !loading && <MobileNavItem icon={<LogInIcon size={20} />} active={false} onClick={handleSignIn} />
        )}
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
import { LayoutDashboard, CalendarRange, BarChart3, History as HistoryIcon, User as UserIcon, LogIn as LogInIcon } from 'lucide-react';

