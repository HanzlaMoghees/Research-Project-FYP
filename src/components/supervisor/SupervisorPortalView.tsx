import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  FileSearch, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  FileText,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { MilestoneProgress } from '../common/ProgressBar';
import { MilestoneStatusBadge, ProjectStatusBadge } from '../common/StatusIndicator';

export const SupervisorPortalView: React.FC = () => {
  const { 
    currentUser, 
    projects, 
    setSelectedProjectId, 
    setSelectedMilestoneId, 
    setActiveView 
  } = useApp();

  // Supervisor projects: assigned to this supervisor
  const supervisedProjects = projects.filter(
    p => p.supervisorId === currentUser?.id || currentUser?.role === 'admin'
  );

  // Collect all milestones awaiting supervisor action
  const pendingMilestones: Array<{
    project: typeof projects[0];
    milestone: typeof projects[0]['milestones'][0];
  }> = [];

  const overdueMilestones: Array<{
    project: typeof projects[0];
    milestone: typeof projects[0]['milestones'][0];
  }> = [];

  const now = new Date();

  supervisedProjects.forEach(p => {
    p.milestones.forEach(m => {
      if (m.status === 'under_review') {
        pendingMilestones.push({ project: p, milestone: m });
      }
      const dueDate = new Date(m.dueDate);
      if (dueDate < now && m.status !== 'completed') {
        overdueMilestones.push({ project: p, milestone: m });
      }
    });
  });

  const totalAssignedMilestones = supervisedProjects.reduce((acc, p) => acc + p.milestones.length, 0);
  const totalApprovedMilestones = supervisedProjects.reduce((acc, p) => acc + p.milestones.filter(m => m.status === 'completed').length, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            Faculty Advisory Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Supervisor Evaluation Workspace
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Evaluate deliverables submitted by your advisees, provide actionable feedback, request revisions, and issue formal milestone sign-offs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveView('analytics_dashboard')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Advisee Analytics Dashboard →
          </button>
        </div>
      </div>

      {/* Metric Cards (Tabular Numerals) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium">Assigned Candidates</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {new Set(supervisedProjects.map(p => p.studentId)).size}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Graduate researchers</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium">Pending Review Submissions</div>
          <div className="text-2xl font-bold text-indigo-600 font-mono tabular-nums mt-1">
            {pendingMilestones.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting your feedback/sign-off</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium">Milestones Signed Off</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
            {totalApprovedMilestones} <span className="text-sm font-normal text-slate-400">/ {totalAssignedMilestones}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {totalAssignedMilestones > 0 ? Math.round((totalApprovedMilestones / totalAssignedMilestones) * 100) : 0}% completion across advisees
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium">Overdue Milestones</div>
          <div className="text-2xl font-bold text-rose-600 font-mono tabular-nums mt-1">
            {overdueMilestones.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Requires deadline follow-up</div>
        </div>
      </div>

      {/* Urgent Action Queue: Submissions Awaiting Supervisor Review (FR-05) */}
      {pendingMilestones.length > 0 && (
        <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-base">
              <FileSearch className="w-5 h-5 text-indigo-700" />
              <span>Priority Action Queue: Deliverables Awaiting Your Review ({pendingMilestones.length})</span>
            </div>
            <span className="text-xs text-indigo-700 font-medium">Prompt response ensures student graduation timeline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingMilestones.map(({ project, milestone }) => {
              const latestDeliverable = milestone.deliverables[milestone.deliverables.length - 1];
              return (
                <div
                  key={milestone.id}
                  className="bg-white border border-indigo-100 rounded-lg p-4 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
                        {project.studentName}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate max-w-sm">
                        Project: {project.title}
                      </p>
                    </div>
                    <MilestoneStatusBadge status={milestone.status} />
                  </div>

                  {latestDeliverable && (
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="font-semibold truncate">{latestDeliverable.fileName}</span>
                        <span className="font-mono text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-bold">
                          v{latestDeliverable.version}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 italic truncate">
                        "{latestDeliverable.changeNote}"
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Due: {new Date(milestone.dueDate).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setSelectedMilestoneId(milestone.id);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-md transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <span>Review Deliverable & Sign Off</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Supervised Theses Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Assigned Advisees & Thesis Progress ({supervisedProjects.length})
            </h2>
            <p className="text-xs text-slate-500">
              Overview of research timelines, current milestone phases, and completion statuses.
            </p>
          </div>
        </div>

        {supervisedProjects.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No research students currently assigned to your advisory profile.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {supervisedProjects.map(project => {
              const activeMilestone = project.milestones.find(m => m.status === 'in_progress' || m.status === 'under_review' || m.status === 'needs_revision') || project.milestones[0];
              return (
                <div key={project.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-800">{project.studentName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-indigo-700 font-medium">{project.researchArea}</span>
                        <span aria-hidden="true">·</span>
                        <ProjectStatusBadge status={project.status} />
                      </div>
                      <h3 className="font-bold text-base text-slate-900 hover:text-indigo-900 transition-colors">
                        {project.title}
                      </h3>
                      {activeMilestone && (
                        <div className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="text-slate-400">Current Phase:</span>
                          <span className="font-medium text-slate-800">{activeMilestone.title}</span>
                          <MilestoneStatusBadge status={activeMilestone.status} showIcon={false} />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setActiveView('project_detail');
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        Inspect Full Thesis
                      </button>
                    </div>
                  </div>

                  <MilestoneProgress milestones={project.milestones} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
