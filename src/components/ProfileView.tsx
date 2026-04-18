import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { User, LogOut, Mail, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProfileView() {
  const [user] = useAuthState(auth);

  if (!user) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-32">
        <p className="text-on-surface-muted italic mb-6 text-[13px]">Please sign in to view your profile archive.</p>
      </div>
    );
  }

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full pb-32 lg:pb-10">
      <div className="mb-12">
        <span className="section-label">Identity Archive</span>
        <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">The Archivist</h2>
        <p className="text-on-surface-muted text-[13px]">Personal chronicle of {user.displayName || 'Unknown Archivist'}.</p>
      </div>

      <div className="routine-card p-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8"
        >
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || ''} 
              className="w-32 h-32 rounded-2xl border-2 border-border object-cover shadow-sm grayscale"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-32 h-32 rounded-2xl border-2 border-border bg-surface flex items-center justify-center text-on-surface-muted">
              <UserCircle size={64} />
            </div>
          )}
        </motion.div>

        <div className="w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <span className="section-label">Public Identity</span>
              <div className="flex items-center gap-3 p-4 bg-bg-color rounded-xl border border-border">
                <User size={18} className="text-on-surface-muted" />
                <span className="text-[14px] font-medium">{user.displayName || 'Not Set'}</span>
              </div>
            </div>
            <div>
              <span className="section-label">System Artifact</span>
              <div className="flex items-center gap-3 p-4 bg-bg-color rounded-xl border border-border">
                <Mail size={18} className="text-on-surface-muted" />
                <span className="text-[14px] font-medium">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border mt-10">
            <button 
              onClick={handleSignOut}
              className="routine-btn routine-btn-outline w-full flex items-center justify-center gap-2 hover:bg-error/10 hover:text-error hover:border-error group transition-all"
            >
              <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
              Terminate Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
