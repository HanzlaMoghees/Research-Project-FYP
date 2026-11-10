import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  TrendingUp, 
  Layers, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { RESEARCH_AREAS } from '../../data/seedData';

export const AnalyticsDashboardView: React.FC = () => {
  const { projects, currentRole, currentUser, setSelectedProjectId, setActiveView } = useApp();

  // If supervisor, scope to assigned advisees; if admin or other, all projects
  const relevantProjects = currentRole === 'supervisor'
    ? projects.filter(p => p.supervisorId === currentUser?.id)
    : projects;

  const now = new Date();

  // Flatten milestones
  const allMilestones = relevantProjects.flatMap(p => 
    p.milestones.map(m => ({ ...m, projectTitle: p.title, studentName: p.studentName, projectId: p.id }))
  );

  const completed = allMilestones.filter(m => m.status === 'completed');
  const underReview = allMilestones.filter(m => m.status === 'under_review');
  const needsRevision = allMilestones.filter(m => m.status === 'needs_revision');
  const inProgress = allMilestones.filter(m => m.status === 'in_progress');
  const notStarted = allMilestones.filter(m => m.status === 'not_started');

  const overdue = allMilestones.filter(m => {
    const due = new Date(m.dueDate);
    return due < now && m.status !== 'completed';
  });

  const total = allMilestones.length || 1;
  const completionPercentage = Math.round((completed.length / total) * 100);

  // Discipline breakdown
  const disciplineStats = RESEARCH_AREAS.map(area => {
    const count = relevantProjects.filter(p => p.researchArea === area.name).length;
    return { name: area.name, code: area.code, count };
  }).filter(d => d.count > 0);

  const maxDisciplineCount = Math.max(...disciplineStats.map(d => d.count), 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dashboard Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>Progress Telemetry & Milestone Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {currentRole === 'supervisor' ? 'Advisee Progress Dashboard' : 'Institutional Research Dashboard'}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Real-time tracking of candidate milestone completion rates, review turnaround velocity, and overdue deadline monitoring.
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs text-slate-400">Total Supervised Scope</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
            {relevantProjects.length} <span className="text-xs font-normal text-slate-500">Theses</span>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics (Tabular Numerals) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed Milestones</span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {completed.length} <span className="text-sm font-normal text-slate-400">/ {total}</span>
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            {completionPercentage}% global completion rate
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Under Active Review</span>
          </div>
          <div className="text-2xl font-bold text-indigo-700 font-mono tabular-nums mt-1">
            {underReview.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Submissions awaiting advisory decision
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Revisions Requested</span>
          </div>
          <div className="text-2xl font-bold text-amber-700 font-mono tabular-nums mt-1">
            {needsRevision.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Returned to candidate for changes
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Overdue Milestones</span>
          </div>
          <div className="text-2xl font-bold text-rose-600 font-mono tabular-nums mt-1">
            {overdue.length}
          </div>
          <div className="text-[11px] text-rose-600/80 font-medium mt-1">
            {overdue.length > 0 ? 'Requires immediate coordination' : 'All submissions on track'}
          </div>
        </div>
      </div>

      {/* Main Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Milestone Progress Distribution Breakdown */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Milestone Progress Status Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Distribution of all {total} tracked thesis milestones across active states.
            </p>
          </div>

          {/* Clean Segmented Bar Visualizer */}
          <div className="space-y-4">
            <div className="h-4 rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
              <div 
                style={{ width: `${(completed.length / total) * 100}%` }} 
                className="bg-emerald-600 h-full transition-all" 
                title={`Completed: ${completed.length}`}
              />
              <div 
                style={{ width: `${(underReview.length / total) * 100}%` }} 
                className="bg-indigo-600 h-full transition-all" 
                title={`Under Review: ${underReview.length}`}
              />
              <div 
                style={{ width: `${(needsRevision.length / total) * 100}%` }} 
                className="bg-amber-500 h-full transition-all" 
                title={`Needs Revision: ${needsRevision.length}`}
              />
              <div 
                style={{ width: `${(inProgress.length / total) * 100}%` }} 
                className="bg-sky-500 h-full transition-all" 
                title={`In Progress: ${inProgress.length}`}
              />
              <div 
                style={{ width: `${(notStarted.length / total) * 100}%` }} 
                className="bg-slate-300 h-full transition-all" 
                title={`Not Started: ${notStarted.length}`}
              />
            </div>

            {/* Legend & Exact Count Rows */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  Completed
                </span>
                <span className="font-mono font-bold tabular-nums text-slate-900">{completed.length}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  Under Review
                </span>
                <span className="font-mono font-bold tabular-nums text-slate-900">{underReview.length}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  Revision Needed
                </span>
                <span className="font-mono font-bold tabular-nums text-slate-900">{needsRevision.length}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  In Progress
                </span>
                <span className="font-mono font-bold tabular-nums text-slate-900">{inProgress.length}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  Not Started
                </span>
                <span className="font-mono font-bold tabular-nums text-slate-900">{notStarted.length}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-rose-50 border border-rose-100">
                <span className="flex items-center gap-1.5 text-rose-700 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  Overdue
                </span>
                <span className="font-mono font-bold tabular-nums text-rose-700">{overdue.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Research Discipline Distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Theses by Academic Research Area
            </h3>
            <p className="text-xs text-slate-500">
              Enrollment volume across departmental research divisions.
            </p>
          </div>

          <div className="space-y-3.5">
            {disciplineStats.map(disc => {
              const barPercent = Math.round((disc.count / maxDisciplineCount) * 100);
              return (
                <div key={disc.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 truncate max-w-[260px]">{disc.name}</span>
                    <span className="font-mono tabular-nums text-slate-500 font-semibold">{disc.count} projects</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-indigo-700 h-full rounded-full transition-all duration-300"
                      style={{ width: `${barPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Overdue Milestones Watchlist (FR-10) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Overdue Milestones Alert Table ({overdue.length})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Milestones past their submission deadline that have not been approved.
            </p>
          </div>
        </div>

        {overdue.length === 0 ? (
          <div className="p-6 text-center text-xs text-emerald-700 bg-emerald-50/60 rounded-lg border border-emerald-100 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>All candidate research milestones are on track within their projected deadlines!</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Candidate</th>
                  <th className="py-2.5 px-3">Thesis Title</th>
                  <th className="py-2.5 px-3">Milestone</th>
                  <th className="py-2.5 px-3">Scheduled Due Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {overdue.map(m => (
                  <tr key={m.id} className="hover:bg-rose-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                      {m.studentName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">
                      {m.projectTitle}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800 whitespace-nowrap">
                      {m.title}
                    </td>
                    <td className="py-2.5 px-3 text-rose-600 font-mono whitespace-nowrap">
                      {new Date(m.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
                        {m.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedProjectId(m.projectId);
                          setActiveView('project_detail');
                        }}
                        className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Progress Roster */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Candidate Progress Roster ({relevantProjects.length})
          </h3>
          <p className="text-xs text-slate-500">
            Individual degree progression across all registered advisee research projects.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {relevantProjects.map(p => {
            const completedCount = p.milestones.filter(m => m.status === 'completed').length;
            const percent = Math.round((completedCount / p.milestones.length) * 100);
            return (
              <div key={p.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{p.studentName}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-600 truncate">{p.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Advisor: {p.supervisorName} · {p.researchArea}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-32 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-indigo-700 h-full rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="font-mono tabular-nums font-bold text-slate-800 w-12 text-right">
                    {percent}%
                  </span>
                  <button
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setActiveView('project_detail');
                    }}
                    className="px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-medium"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
