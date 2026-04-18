import React from 'react';
import { Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

interface HeaderProps {
  title: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function Header({ title, selectedDate, onDateChange }: HeaderProps) {
  const todayLabel = format(selectedDate, 'EEEE, MMMM d');

  return (
    <header className="bg-bg-color border-b border-border sticky top-0 z-40 px-6 md:px-10 py-6 md:py-10 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center w-full">
      <div className="logo font-bold text-lg md:text-xl tracking-[-0.5px]">
        {title.toUpperCase()}.
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-12 w-full md:w-auto">
        <div className="date-nav flex items-center justify-between sm:justify-start gap-5 text-sm font-medium text-on-surface-muted w-full sm:w-auto">
          <button 
            onClick={() => onDateChange(subDays(selectedDate, 1))}
            className="hover:text-on-surface transition-colors cursor-pointer p-1"
          >
            <ChevronLeft size={18} />
          </button>
          <strong className="text-on-surface whitespace-nowrap">{todayLabel}</strong>
          <button 
            onClick={() => onDateChange(addDays(selectedDate, 1))}
            className="hover:text-on-surface transition-colors cursor-pointer p-1"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <button className="text-on-surface-muted p-2 hover:bg-surface border border-border rounded-lg transition-colors flex-shrink-0">
            <Search size={18} />
          </button>
          <button className="text-on-surface-muted p-2 hover:bg-surface border border-border rounded-lg transition-colors flex-shrink-0">
            <Bell size={18} />
          </button>
          <div className="h-6 w-[1px] bg-border mx-1 hidden sm:block"></div>
          <button className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary px-3 py-1.5 rounded-md hover:bg-primary hover:text-white transition-all flex-shrink-0">
            Export
          </button>
        </div>
      </div>
    </header>
  );
}
