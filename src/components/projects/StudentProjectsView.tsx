import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  BookOpen, 
  Calendar, 
  Upload, 
  MessageSquare, 
  ArrowRight, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Send,
  AlertCircle
} from 'lucide-react';
import { MilestoneProgress } from '../common/ProgressBar';
import { MilestoneStatusBadge, ProjectStatusBadge } from '../common/StatusIndicator';

export const StudentProjectsView: React.FC = () => {
  const { 
    currentUser, 
    projects, 
    setIsCreateProjectOpen, 
    setSelectedProjectId, 
    setSelectedMilestoneId, 
    setActiveView,
    deleteProject,
    requestPublication
  } = useApp();

  // Filter projects owned by this student
  const studentProjects = projects.filter(p => p.studentId === currentUser?.id);

  // Computed metrics for student dashboard summary
  const totalMilestones = studentProjects.reduce((acc, p) => acc + p.milestones.length, 0);
  const completedMilestones = studentProjects.reduce((acc, p) => acc + p.milestones.filter(m => m.status === 'completed').length, 0);
  const underReviewMilestones = studentProjects.reduce((acc, p) => acc + p.milestones.filter(m => m.status === 'under_review' || m.status === 'needs_revision').length, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & Action */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            Student Research Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            My Research Theses & Projects
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Track your degree milestones, upload new deliverable versions, incorporate supervisor feedback, and submit completed work for institutional publishing.
          </p>
        </div>

        <button
          onClick={() => setIsCreateProjectOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs shrink-0 self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Research Project</span>
        </button>
      </div>

      {/* Metric Cards (Tabular Numerals) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium">Active Research Theses</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            {studentProjects.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Under faculty supervision</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium">Milestones Completed</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
            {completedMilestones} <span className="text-sm font-normal text-slate-400">/ {totalMilestones}</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0}% degree progress
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs text-slate-500 font-medium">In Review / Needs Revision</div>
          <div className="text-2xl font-bold text-amber-600 font-mono tabular-nums mt-1">
            {underReviewMilestones}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting advisor response</div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          Enrolled Projects ({studentProjects.length})
        </h2>

        {studentProjects.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-medium text-slate-800">No research projects yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Start your thesis by creating a research project with milestones, proposal deliverables, and an assigned supervisor.
            </p>
            <button
              onClick={() => setIsCreateProjectOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Project</span>
            </button>
          </div>
        ) : (
          studentProjects.map(project => {
            const isCompleted = project.milestones.every(m => m.status === 'completed');
            return (
              <div
                key={project.id}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-all space-y-6"
              >
                {/* Project Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500">
                      <span className="font-medium text-indigo-700">{project.researchArea}</span>
                      <span aria-hidden="true">·</span>
                      <ProjectStatusBadge status={project.status} />
                      <span aria-hidden="true">·</span>
                      <span>Supervisor: {project.supervisorName}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 hover:text-indigo-900 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {project.abstract}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setActiveView('project_detail');
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      View Public Page
                    </button>

                    {project.status !== 'published' && (
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Overall Progress Bar */}
                <MilestoneProgress milestones={project.milestones} />

                {/* Milestone Step Cards */}
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Milestones & Submissions
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {project.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setSelectedMilestoneId(milestone.id);
                        }}
                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/20 cursor-pointer transition-all gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-indigo-700">
                              {milestone.order}.
                            </span>
                            <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-900">
                              {milestone.title}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-3">
                            <span>Due: {new Date(milestone.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <span aria-hidden="true">·</span>
                            <span>{milestone.deliverables.length} version{milestone.deliverables.length !== 1 ? 's' : ''} uploaded</span>
                            {milestone.feedback.length > 0 && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="text-indigo-600 font-medium">
                                  {milestone.feedback.length} feedback item{milestone.feedback.length > 1 ? 's' : ''}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <MilestoneStatusBadge status={milestone.status} />
                          <span className="text-xs font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                            <span>Open</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Publication Request Action Banner (When eligible) */}
                {project.status === 'in_progress' && (
                  <div className="p-4 rounded-lg bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-indigo-900">Ready for Institutional Publication?</div>
                      <div className="text-indigo-700">
                        Once all milestones are completed and approved by your supervisor, request publication to the open access university archive.
                      </div>
                    </div>
                    <button
                      onClick={() => requestPublication(project.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit for Publication</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
