import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Bell, 
  Mail, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Send, 
  MessageSquare, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { 
    isNotificationsDrawerOpen, 
    setIsNotificationsDrawerOpen, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    setSelectedProjectId,
    setActiveView,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'in_app' | 'email_logs'>('in_app');
  const [selectedEmail, setSelectedEmail] = useState<typeof notifications[0] | null>(null);

  if (!isNotificationsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border-l border-slate-200 max-w-lg w-full h-full shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-700" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Notifications & Email Deliveries
              </h2>
              <p className="text-[11px] text-slate-500">
                FR-09 Compliance: In-app alerts & simulated SMTP transactional emails
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationsDrawerOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Control for In-App vs Email Logs */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 px-4 shrink-0">
          <button
            onClick={() => setActiveTab('in_app')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'in_app' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>In-App Notifications ({notifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('email_logs')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'email_logs' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Delivery Logs</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          
          {/* TAB 1: In-App Notifications */}
          {activeTab === 'in_app' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Recent Alerts
                </span>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-indigo-600 hover:text-indigo-800 text-[11px] font-medium"
                >
                  Mark all as read
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  No notifications recorded.
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.linkToProjectId) {
                        setSelectedProjectId(n.linkToProjectId);
                        setActiveView('project_detail');
                        setIsNotificationsDrawerOpen(false);
                      }
                    }}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                      !n.read 
                        ? 'bg-indigo-50/40 border-indigo-200' 
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                        )}
                        <h4 className="font-semibold text-slate-900 text-xs">{n.title}</h4>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                        {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-xs">
                      {n.message}
                    </p>

                    {n.emailSent && (
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>Email dispatched to {n.emailRecipient}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Simulated Email Logs */}
          {activeTab === 'email_logs' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Simulated Transactional Email Outbox
                </h3>
                <p className="text-[11px] text-slate-500">
                  Inspect the automated institutional email notifications dispatched by ScholarPulse upon supervisor feedback, approval decisions, and deadline alerts.
                </p>
              </div>

              <div className="space-y-2">
                {notifications.filter(n => n.emailSent).map(n => (
                  <div 
                    key={n.id}
                    onClick={() => setSelectedEmail(n)}
                    className="p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-300 cursor-pointer space-y-1 transition-all"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>To: {n.emailRecipient}</span>
                      <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="font-semibold text-slate-900">{n.title}</div>
                    <div className="text-slate-500 text-[11px] truncate">
                      {n.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Email Preview Drawer/Inspector */}
              {selectedEmail && (
                <div className="mt-4 p-4 rounded-xl border border-indigo-200 bg-indigo-50/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                    <span className="font-bold text-xs text-indigo-950">Email Template Preview</span>
                    <button onClick={() => setSelectedEmail(null)} className="text-indigo-600 hover:text-indigo-800 text-[11px]">Close</button>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="text-[11px] text-slate-400 font-mono">
                      From: <span className="text-slate-800">notifications@scholarpulse.edu</span><br />
                      To: <span className="text-slate-800">{selectedEmail.emailRecipient}</span><br />
                      Subject: <span className="text-indigo-700 font-bold">{selectedEmail.title}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-slate-700 leading-relaxed">
                      Dear Scholar,<br /><br />
                      {selectedEmail.message}<br /><br />
                      Please log in to your ScholarPulse dashboard to review full annotations or upload revisions.<br /><br />
                      <span className="text-[11px] text-slate-400">Office of Graduate Studies & Research Governance</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">ScholarPulse Notification Dispatcher</span>
          <button
            onClick={() => setIsNotificationsDrawerOpen(false)}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
