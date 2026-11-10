import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Download, 
  Calendar, 
  User, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Clock, 
  FileSearch, 
  AlertTriangle, 
  Star, 
  ExternalLink,
  MessageSquare,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { MilestoneStatusBadge, ProjectStatusBadge } from '../common/StatusIndicator';
import { MilestoneProgress } from '../common/ProgressBar';

export const ProjectDetailPage: React.FC = () => {
  const { 
    selectedProjectId, 
    projects, 
    setActiveView, 
    currentRole, 
    currentUser,
    setSelectedMilestoneId,
    setActiveDeliverablePreview,
    publishProject,
    toggleFeatured,
    requestPublication
  } = useApp();

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <p className="text-slate-600 mb-4">No project selected.</p>
        <button
          onClick={() => setActiveView('repository')}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          ← Back to Repository
        </button>
      </div>
    );
  }

  const isOwner = currentUser?.id === project.studentId;
  const isSupervisor = currentUser?.id === project.supervisorId || currentRole === 'supervisor';
  const isAdmin = currentRole === 'admin';

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownloadDeliverable = (fileName: string) => {
    // Real browser download simulation with data blob
    const element = document.createElement('a');
    const file = new Blob([
      `=== ScholarPulse Academic Repository ===\nProject: ${project.title}\nDeliverable File: ${fileName}\nCandidate: ${project.studentName}\nAdvisor: ${project.supervisorName}\nArchival Date: ${new Date().toISOString()}\n\n[Verified Research Deliverable Content]\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Navigation Bar: Back button + Contextual Administrative Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 pb-4 border-b border-slate-200">
        <button
          onClick={() => setActiveView('repository')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Published Theses</span>
        </button>

        {/* Administrative or Owner Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {isAdmin && (
            <>
              <button
                onClick={() => toggleFeatured(project.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  project.isFeatured 
                    ? 'bg-amber-50 text-amber-900 border-amber-200' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${project.isFeatured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                <span>{project.isFeatured ? 'Featured on Home' : 'Feature Project'}</span>
              </button>

              <button
                onClick={() => publishProject(project.id, project.status !== 'published')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  project.status === 'published'
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{project.status === 'published' ? 'Unpublish' : 'Publish to Repository'}</span>
              </button>
            </>
          )}

          {isOwner && project.status === 'in_progress' && (
            <button
              onClick={() => requestPublication(project.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors shadow-xs"
            >
              Request Institutional Publication
            </button>
          )}
        </div>
      </div>

      {/* Main Project Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div>
          {/* Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-3">
            <span className="font-semibold text-indigo-700">{project.researchArea}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Academic Year {project.year}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <ProjectStatusBadge status={project.status} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
            {project.title}
          </h1>
        </div>

        {/* Abstract */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Abstract / Executive Summary
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-lg border border-slate-100">
            {project.abstract}
          </p>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Keywords:</span>
          {project.keywords.map((kw, i) => (
            <span key={i} className="text-slate-700 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
              {kw}
            </span>
          ))}
        </div>

        {/* Team Members & Advisory Board Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Graduate Researcher</div>
              <div className="text-sm font-semibold text-slate-900">{project.studentName}</div>
              <div className="text-xs text-slate-500">{project.studentDepartment}</div>
              <div className="text-xs text-indigo-600 font-mono mt-0.5">{project.studentEmail}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Primary Thesis Supervisor</div>
              <div className="text-sm font-semibold text-slate-900">{project.supervisorName}</div>
              <div className="text-xs text-slate-500">{project.department}</div>
              <div className="text-xs text-indigo-600 font-mono mt-0.5">{project.supervisorEmail}</div>
            </div>
          </div>
        </div>

        {/* Overall Milestone Completion Bar */}
        <div className="pt-2">
          <MilestoneProgress milestones={project.milestones} />
        </div>
      </div>

      {/* FR-03: Milestones & Document Delivery Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Research Milestone Roadmap & Version History
            </h2>
            <p className="text-xs text-slate-500">
              Chronological progress tracking, uploaded deliverables, version change notes, and supervisor sign-offs.
            </p>
          </div>

          {(isOwner || isSupervisor || isAdmin) && (
            <div className="text-xs text-slate-500">
              Click any milestone to inspect feedback & upload deliverables
            </div>
          )}
        </div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {project.milestones.map((milestone, idx) => (
            <div
              key={milestone.id}
              className="border border-slate-200 rounded-lg p-5 hover:border-slate-300 transition-all bg-slate-50/40"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-700">
                      Step {milestone.order}.
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">
                      {milestone.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                <div className="flex sm:flex-col items-end gap-1.5 shrink-0">
                  <MilestoneStatusBadge status={milestone.status} />
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {new Date(milestone.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  {milestone.completedAt && (
                    <div className="text-[11px] text-emerald-600 font-mono">
                      Completed: {new Date(milestone.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              </div>

              {/* Deliverables List (with Version Tracking FR-04) */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 space-y-2">
                <div className="text-xs font-medium text-slate-700 flex items-center justify-between">
                  <span>Deliverables & Version Archive ({milestone.deliverables.length})</span>
                  {(isOwner || isSupervisor || isAdmin) && (
                    <button
                      onClick={() => {
                        setSelectedMilestoneId(milestone.id);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Open Milestone Workspace →
                    </button>
                  )}
                </div>

                {milestone.deliverables.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No document deliverables uploaded yet for this milestone.</p>
                ) : (
                  <div className="space-y-1.5">
                    {milestone.deliverables.map((del) => (
                      <div
                        key={del.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-md bg-white border border-slate-200 text-xs gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-800 truncate">{del.fileName}</span>
                              <span className="font-mono text-[11px] text-indigo-700 font-medium bg-indigo-50 px-1.5 py-0.5 rounded">
                                v{del.version}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 truncate flex items-center gap-2">
                              <span>Note: {del.changeNote}</span>
                              <span aria-hidden="true">·</span>
                              <span>{formatFileSize(del.fileSize)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => setActiveDeliverablePreview(del)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={() => handleDownloadDeliverable(del.fileName)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Feedback Comments count & last feedback */}
              {milestone.feedback.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>{milestone.feedback.length} review comment{milestone.feedback.length > 1 ? 's' : ''} logged</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Latest: {milestone.feedback[milestone.feedback.length - 1].authorName}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
