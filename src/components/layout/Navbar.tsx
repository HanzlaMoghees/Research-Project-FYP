import React, { useState, useRef, useEffect } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  GraduationCap, 
  Bell, 
  User, 
  LogOut, 
  ChevronDown, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  FolderGit2,
  Users
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    activeView, 
    setActiveView, 
    unreadNotificationCount, 
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsAuthModalOpen,
    setIsProfileModalOpen,
    setIsNotificationsDrawerOpen,
    switchRole,
    logout,
    resetToDefaultData
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'student': return 'Student';
      case 'supervisor': return 'Supervisor';
      case 'admin': return 'Administrator';
      default: return 'Guest';
    }
  };

  const recentNotifications = notifications.slice(0, 4);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('repository')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-md"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-700 text-white flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  ScholarPulse
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-mono tracking-tight">
                  Thesis Manager
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (4-5 single-line clean text links with subtle hover underlines) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('repository')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'repository' || activeView === 'project_detail' 
                  ? 'border-indigo-600 text-indigo-900 font-semibold' 
                  : 'border-transparent'
              }`}
            >
              Repository
            </button>

            <button
              onClick={() => handleNavClick('featured')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                activeView === 'featured' 
                  ? 'border-indigo-600 text-indigo-900 font-semibold' 
                  : 'border-transparent'
              }`}
            >
              Featured Works
            </button>

            {/* Role-specific workspace links */}
            {currentRole === 'student' && (
              <button
                onClick={() => handleNavClick('student_projects')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  activeView === 'student_projects' 
                    ? 'border-indigo-600 text-indigo-900 font-semibold' 
                    : 'border-transparent'
                }`}
              >
                My Projects
              </button>
            )}

            {currentRole === 'supervisor' && (
              <button
                onClick={() => handleNavClick('supervisor_portal')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  activeView === 'supervisor_portal' 
                    ? 'border-indigo-600 text-indigo-900 font-semibold' 
                    : 'border-transparent'
                }`}
              >
                Supervisor Reviews
              </button>
            )}

            {currentRole === 'admin' && (
              <button
                onClick={() => handleNavClick('admin_console')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  activeView === 'admin_console' 
                    ? 'border-indigo-600 text-indigo-900 font-semibold' 
                    : 'border-transparent'
                }`}
              >
                Admin Governance
              </button>
            )}

            {/* Analytics Dashboard (Visible to supervisor, admin, and student) */}
            {currentRole !== 'guest' && (
              <button
                onClick={() => handleNavClick('analytics_dashboard')}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  activeView === 'analytics_dashboard' 
                    ? 'border-indigo-600 text-indigo-900 font-semibold' 
                    : 'border-transparent'
                }`}
              >
                Progress Analytics
              </button>
            )}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Role Quick Switcher (Facilitates instant testing across all 4 roles) */}
            <div className="relative" ref={roleDropdownRef}>
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors border border-slate-200"
                title="Switch active role for testing"
              >
                <span className="text-slate-400">Role:</span>
                <span className="font-semibold text-indigo-700">{getRoleLabel(currentRole)}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-slate-400 font-medium uppercase tracking-wider text-[10px]">
                    Switch Active Persona (Demo Testing)
                  </div>
                  <button
                    onClick={() => { switchRole('student', 'student-1'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${currentRole === 'student' && currentUser?.id === 'student-1' ? 'bg-indigo-50/70 text-indigo-900 font-medium' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-medium">Aisha Patel</div>
                      <div className="text-[11px] text-slate-500">Student (AI & Deep Learning)</div>
                    </div>
                    {currentRole === 'student' && currentUser?.id === 'student-1' && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>

                  <button
                    onClick={() => { switchRole('student', 'student-3'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${currentRole === 'student' && currentUser?.id === 'student-3' ? 'bg-indigo-50/70 text-indigo-900 font-medium' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-medium">Elena Rostova</div>
                      <div className="text-[11px] text-slate-500">Student (Robotics - Has Revisions)</div>
                    </div>
                    {currentRole === 'student' && currentUser?.id === 'student-3' && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>

                  <button
                    onClick={() => { switchRole('supervisor', 'supervisor-1'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${currentRole === 'supervisor' ? 'bg-indigo-50/70 text-indigo-900 font-medium' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-medium">Dr. Marcus Vance</div>
                      <div className="text-[11px] text-slate-500">Supervisor (CS & Robotics Chair)</div>
                    </div>
                    {currentRole === 'supervisor' && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>

                  <button
                    onClick={() => { switchRole('admin', 'admin-1'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${currentRole === 'admin' ? 'bg-indigo-50/70 text-indigo-900 font-medium' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-medium">Prof. Eleanor Wright</div>
                      <div className="text-[11px] text-slate-500">Dean / System Administrator</div>
                    </div>
                    {currentRole === 'admin' && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>
                  
                  <button
                    onClick={() => { switchRole('guest'); setIsRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 ${currentRole === 'guest' ? 'bg-indigo-50/70 text-indigo-900 font-medium' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-medium">Guest User</div>
                      <div className="text-[11px] text-slate-500">Logged Out Public Visitor</div>
                    </div>
                    {currentRole === 'guest' && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                </div>
              )}
            </div>

            {/* In-app Notification Bell (FR-09) */}
            <div className="relative" ref={notifDropdownRef}>
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors focus:outline-none"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-600 rounded-full" />
                )}
              </button>

              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">Notifications & Email Logs</span>
                    {unreadNotificationCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {recentNotifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No notifications yet.</div>
                    ) : (
                      recentNotifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            setIsNotifDropdownOpen(false);
                            if (n.linkToProjectId) {
                              setActiveView('project_detail');
                            }
                          }}
                          className={`p-3 text-left hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'bg-indigo-50/40' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-medium text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">
                              {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                          {n.emailSent && (
                            <div className="mt-1.5 text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                              <span>Simulated email sent to:</span>
                              <span className="truncate max-w-[170px]">{n.emailRecipient}</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setIsNotifDropdownOpen(false);
                        setIsNotificationsDrawerOpen(true);
                      }}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      View all notifications & email delivery logs →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Login State */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 text-slate-700 hover:text-slate-900 rounded-md transition-colors focus:outline-none"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <span className="hidden lg:inline-block text-xs font-medium text-slate-800 max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="font-semibold text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                      <div className="text-[10px] text-indigo-600 font-medium uppercase mt-0.5">{currentUser.title}</div>
                    </div>
                    <button
                      onClick={() => { setIsProfileModalOpen(true); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Profile & Password</span>
                    </button>
                    <button
                      onClick={() => { resetToDefaultData(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-500"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Reset Demo Data</span>
                    </button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-rose-600"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAuthModalOpen(true, 'login')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true, 'register')}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-700 hover:bg-indigo-800 rounded-md transition-colors shadow-xs"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 text-sm">
          <button
            onClick={() => handleNavClick('repository')}
            className="block w-full text-left py-2 px-3 rounded-md text-slate-700 hover:bg-slate-50"
          >
            Repository
          </button>
          <button
            onClick={() => handleNavClick('featured')}
            className="block w-full text-left py-2 px-3 rounded-md text-slate-700 hover:bg-slate-50"
          >
            Featured Works
          </button>
          {currentRole === 'student' && (
            <button
              onClick={() => handleNavClick('student_projects')}
              className="block w-full text-left py-2 px-3 rounded-md text-slate-700 hover:bg-slate-50"
            >
              My Projects
            </button>
          )}
          {currentRole === 'supervisor' && (
            <button
              onClick={() => handleNavClick('supervisor_portal')}
              className="block w-full text-left py-2 px-3 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Supervisor Reviews
            </button>
          )}
          {currentRole === 'admin' && (
            <button
              onClick={() => handleNavClick('admin_console')}
              className="block w-full text-left py-2 px-3 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Admin Governance
            </button>
          )}
          {currentRole !== 'guest' && (
            <button
              onClick={() => handleNavClick('analytics_dashboard')}
              className="block w-full text-left py-2 px-3 rounded-md text-slate-700 hover:bg-slate-50"
            >
              Progress Analytics
            </button>
          )}
        </div>
      )}
    </header>
  );
};
