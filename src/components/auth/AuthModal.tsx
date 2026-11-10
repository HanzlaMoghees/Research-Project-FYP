import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, GraduationCap, Lock, Mail, User, Building, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    login, 
    register, 
    switchRole,
    users 
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Department of Computer Science & AI');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const success = login(email, selectedRole);
      if (success) {
        setIsAuthModalOpen(false);
      }
    } else {
      if (!name.trim() || !email.trim()) return;
      register(name.trim(), email.trim(), selectedRole, department);
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {mode === 'login' ? 'Academic Portal Sign In' : 'Create ScholarPulse Account'}
              </h2>
              <p className="text-[11px] text-slate-500">
                FR-01: Role-governed research access
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Persona Quick Logins for Instant Testing */}
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            Quick 1-Click Evaluation Accounts
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => {
                switchRole('student', 'student-1');
                setIsAuthModalOpen(false);
              }}
              className="p-2 text-left bg-white border border-slate-200 hover:border-indigo-400 rounded transition-colors text-xs"
            >
              <div className="font-semibold text-slate-800">Student</div>
              <div className="text-[10px] text-slate-400 truncate">Aisha Patel</div>
            </button>

            <button
              type="button"
              onClick={() => {
                switchRole('supervisor', 'supervisor-1');
                setIsAuthModalOpen(false);
              }}
              className="p-2 text-left bg-white border border-slate-200 hover:border-indigo-400 rounded transition-colors text-xs"
            >
              <div className="font-semibold text-slate-800">Supervisor</div>
              <div className="text-[10px] text-slate-400 truncate">Dr. Vance</div>
            </button>

            <button
              type="button"
              onClick={() => {
                switchRole('admin', 'admin-1');
                setIsAuthModalOpen(false);
              }}
              className="p-2 text-left bg-white border border-slate-200 hover:border-indigo-400 rounded transition-colors text-xs"
            >
              <div className="font-semibold text-slate-800">Admin</div>
              <div className="text-[10px] text-slate-400 truncate">Dean Wright</div>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 my-2 text-[11px] text-slate-400">
          <div className="flex-1 border-t border-slate-200" />
          <span>Or sign in with email credentials</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'register' && (
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Full Legal Name *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Julian Morales"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Institutional Email *</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. candidate@graduate.edu"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Password *</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1 pt-1">
            <label className="font-semibold text-slate-700">Select Academic Role *</label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'supervisor', 'admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg capitalize border transition-all ${
                    selectedRole === role
                      ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Department / School</label>
              <div className="relative">
                <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Department of Computer Science"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:bg-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs mt-3 flex items-center justify-center gap-1.5"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Toggle mode */}
        <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
          {mode === 'login' ? (
            <div>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-semibold text-indigo-700 hover:underline"
              >
                Sign up here
              </button>
            </div>
          ) : (
            <div>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-indigo-700 hover:underline"
              >
                Sign in here
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
