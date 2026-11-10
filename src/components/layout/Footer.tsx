import React from 'react';
import { GraduationCap, Shield, BookOpen, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView, currentRole } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <span>ScholarPulse</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Academic research and graduate thesis management platform. Connecting students and supervisors through structured milestone delivery and transparent feedback.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium text-xs mb-3 uppercase tracking-wider">Repository</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveView('repository')} className="hover:text-white transition-colors">
                  All Published Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('featured')} className="hover:text-white transition-colors">
                  Featured Research
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('repository')} className="hover:text-white transition-colors">
                  Academic Disciplines
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-xs mb-3 uppercase tracking-wider">Role Workspaces</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-400">Student Portal: Milestone Uploads</span>
              </li>
              <li>
                <span className="text-slate-400">Supervisor Portal: Review & Sign-Off</span>
              </li>
              <li>
                <span className="text-slate-400">Dean / Admin: Institutional Governance</span>
              </li>
              <li>
                <span className="text-slate-400">Public: Open Access Repository</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium text-xs mb-3 uppercase tracking-wider">System Governance</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              Compliant with Graduate School Thesis Submission Guidelines, Version Control Standards, and Digital Archival Preservation.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Role: <span className="text-indigo-400 uppercase font-medium">{currentRole}</span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} University Graduate Studies & Research Council. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Open Access Thesis Archive</span>
            <span>·</span>
            <span>IRB Ethics Standard</span>
            <span>·</span>
            <span>Milestone Protocol v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
