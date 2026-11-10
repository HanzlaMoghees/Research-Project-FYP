import React from 'react';
import { useApp } from '../../context/AppContext';
import { Terminal, Users, Sparkles, ChevronRight, Check } from 'lucide-react';
import { UserRole } from '../../types';

export const PersonaBanner: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    setIsLocalRunModalOpen 
  } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Left: Current Active Persona */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-medium flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Active Persona:
          </span>

          {currentUser ? (
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1 rounded-md border border-slate-700/80">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="font-semibold text-white">{currentUser.name}</span>
              <span className="text-[10px] text-indigo-300 font-mono uppercase bg-indigo-900/60 px-1 rounded">
                {currentUser.role}
              </span>
            </div>
          ) : (
            <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-semibold border border-slate-700">
              Guest User (Public)
            </span>
          )}

          {/* Quick Switcher Pills */}
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-slate-400 text-[11px] hidden md:inline">Switch:</span>

          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => switchRole('student', 'student-1')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                currentRole === 'student' && currentUser?.id === 'student-1'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Student (Aisha)
            </button>
            <button
              onClick={() => switchRole('supervisor', 'supervisor-1')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                currentRole === 'supervisor'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Supervisor (Dr. Vance)
            </button>
            <button
              onClick={() => switchRole('admin', 'admin-1')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                currentRole === 'admin'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Admin (Dean Wright)
            </button>
            <button
              onClick={() => switchRole('guest')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                currentRole === 'guest'
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Guest
            </button>
          </div>
        </div>

        {/* Right: Local Run Button & Guide */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <button
            onClick={() => setIsLocalRunModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-xs"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>How to Run on Local Machine</span>
          </button>
        </div>

      </div>
    </div>
  );
};
