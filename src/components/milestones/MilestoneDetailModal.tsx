import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MilestoneStatusBadge } from '../common/StatusIndicator';
import { 
  X, 
  Upload, 
  FileText, 
  Download, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  CornerDownRight, 
  Send,
  Eye,
  FileCheck
} from 'lucide-react';

export const MilestoneDetailModal: React.FC = () => {
  const { 
    selectedProjectId, 
    selectedMilestoneId, 
    setSelectedMilestoneId, 
    projects, 
    currentUser, 
    currentRole,
    uploadDeliverable,
    addFeedback,
    updateMilestone,
    setActiveDeliverablePreview,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'deliverables' | 'feedback' | 'upload'>('deliverables');

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customFileName, setCustomFileName] = useState('');
  const [changeNote, setChangeNote] = useState('');
  const [fileTypeError, setFileTypeError] = useState('');

  // Feedback Form State
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackAction, setFeedbackAction] = useState<'comment' | 'approved' | 'changes_requested'>('comment');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  if (!selectedProjectId || !selectedMilestoneId) return null;

  const project = projects.find(p => p.id === selectedProjectId);
  const milestone = project?.milestones.find(m => m.id === selectedMilestoneId);

  if (!project || !milestone) return null;

  const isOwner = currentUser?.id === project.studentId;
  const isSupervisor = currentUser?.id === project.supervisorId || currentRole === 'supervisor';
  const isAdmin = currentRole === 'admin';

  // Allowed file extensions
  const allowedExtensions = ['.pdf', '.docx', '.zip'];
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileTypeError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedExtensions.includes(ext)) {
        setFileTypeError('Invalid file type! Allowed formats: PDF, DOCX, ZIP.');
        setSelectedFile(null);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileTypeError('File exceeds 25MB limit. Please compress or optimize.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setCustomFileName(file.name);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !customFileName) return;

    const fileName = customFileName || selectedFile?.name || 'Deliverable_Document.pdf';
    const ext = fileName.split('.').pop()?.toLowerCase();
    const fileType = ext === 'pdf' ? 'pdf' : ext === 'docx' ? 'docx' : ext === 'zip' ? 'zip' : 'other';
    const fileSize = selectedFile ? selectedFile.size : 3400000;

    uploadDeliverable(project.id, milestone.id, {
      fileName,
      fileType,
      fileSize,
      fileUrl: '#mock-file-viewer',
      changeNote: changeNote.trim() || 'Uploaded revised deliverable file.',
      textContentPreview: `Academic Deliverable: ${fileName}\nMilestone: ${milestone.title}\nCandidate: ${project.studentName}\nSupervisor: ${project.supervisorName}\nChange Log: ${changeNote.trim() || 'Standard revision submission.'}`
    });

    setSelectedFile(null);
    setCustomFileName('');
    setChangeNote('');
    setActiveTab('deliverables');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackContent.trim()) return;

    addFeedback(
      project.id,
      milestone.id,
      feedbackContent.trim(),
      feedbackAction
    );

    setFeedbackContent('');
    setFeedbackAction('comment');
  };

  const handleReplySubmit = (parentCommentId: string) => {
    if (!replyContent.trim()) return;

    addFeedback(
      project.id,
      milestone.id,
      replyContent.trim(),
      'comment',
      parentCommentId
    );

    setReplyToId(null);
    setReplyContent('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = (fileName: string) => {
    const element = document.createElement('a');
    const file = new Blob([
      `=== ScholarPulse Deliverable Archive ===\nMilestone: ${milestone.title}\nFile: ${fileName}\nStudent: ${project.studentName}\nAdvisor: ${project.supervisorName}\nTimestamp: ${new Date().toISOString()}\n\n[Verified Research Deliverable Content]\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Group comments into root comments and replies
  const rootComments = milestone.feedback.filter(c => !c.parentCommentId);
  const getReplies = (parentId: string) => milestone.feedback.filter(c => c.parentCommentId === parentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-indigo-700">Milestone {milestone.order}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate max-w-[280px] sm:max-w-md">{project.title}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {milestone.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <MilestoneStatusBadge status={milestone.status} />
            <button
              onClick={() => setSelectedMilestoneId(null)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Milestone Metadata strip */}
        <div className="py-3 px-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Due: {new Date(milestone.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            {milestone.completedAt && (
              <div className="flex items-center gap-1.5 text-emerald-700 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Signed Off: {new Date(milestone.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            {milestone.deliverables.length} version{milestone.deliverables.length !== 1 ? 's' : ''} · {milestone.feedback.length} review comment{milestone.feedback.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Workspace Tab Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 border-b border-slate-200 px-4 shrink-0">
          <button
            onClick={() => setActiveTab('deliverables')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'deliverables' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Deliverable Versions ({milestone.deliverables.length})
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'feedback' 
                ? 'bg-white text-slate-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Supervisor Review & Feedback ({milestone.feedback.length})
          </button>

          {(isOwner || isAdmin) && (
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'upload' 
                  ? 'bg-indigo-700 text-white shadow-xs' 
                  : 'text-indigo-700 hover:bg-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New Version</span>
            </button>
          )}
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* TAB 1: Deliverables & Version History (FR-04) */}
          {activeTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Version History & Uploaded Deliverables
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Every upload creates an immutable numbered version with change logs and download access.
                  </p>
                </div>

                {(isOwner || isAdmin) && (
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload v{milestone.deliverables.length + 1}</span>
                  </button>
                )}
              </div>

              {milestone.deliverables.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-200 space-y-2">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                  <div className="text-slate-700 font-medium">No files uploaded yet for this milestone</div>
                  <p className="text-slate-400 text-[11px] max-w-sm mx-auto">
                    Researchers can upload deliverables in PDF, DOCX, or ZIP format with accompanying version notes.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Show versions in descending order (latest first) */}
                  {[...milestone.deliverables].reverse().map((del, i) => (
                    <div 
                      key={del.id}
                      className={`p-4 rounded-lg border transition-all ${
                        i === 0 
                          ? 'border-indigo-200 bg-indigo-50/20 shadow-xs' 
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${i === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">{del.fileName}</span>
                              <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                                v{del.version}
                              </span>
                              {i === 0 && (
                                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 font-mono">
                              <span>By {del.uploadedBy}</span>
                              <span aria-hidden="true">·</span>
                              <span>{new Date(del.uploadedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                              <span aria-hidden="true">·</span>
                              <span>{formatFileSize(del.fileSize)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => setActiveDeliverablePreview(del)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={() => handleDownload(del.fileName)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>

                      {/* Change Note */}
                      <div className="mt-2 text-xs text-slate-700 bg-white/80 p-2.5 rounded border border-slate-100">
                        <span className="font-semibold text-slate-500 text-[11px]">Changelog / Note: </span>
                        <span>{del.changeNote}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Supervisor Review & Threaded Feedback (FR-05) */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              
              {/* Supervisor Review Action Box (Available to Supervisors & Admins) */}
              {(isSupervisor || isAdmin) && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-indigo-700" />
                      <span>Supervisor Milestone Evaluation & Decision</span>
                    </span>
                    <span className="text-[11px] text-slate-500">Official Faculty Sign-off</span>
                  </div>

                  {/* Decision Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setFeedbackAction('approved')}
                      className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                        feedbackAction === 'approved'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Milestone</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeedbackAction('changes_requested')}
                      className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                        feedbackAction === 'changes_requested'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-white border border-amber-300 text-amber-800 hover:bg-amber-50'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Request Changes / Revisions</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeedbackAction('comment')}
                      className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                        feedbackAction === 'comment'
                          ? 'bg-indigo-700 text-white shadow-xs'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Standard Advisory Comment</span>
                    </button>
                  </div>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-2 pt-1">
                    <textarea
                      rows={3}
                      required
                      value={feedbackContent}
                      onChange={(e) => setFeedbackContent(e.target.value)}
                      placeholder={
                        feedbackAction === 'approved' 
                          ? 'Provide formal sign-off remarks, commendations, or recommendations for the subsequent milestone...'
                          : feedbackAction === 'changes_requested'
                          ? 'Detail the specific methodological, structural, or experimental revisions required before resubmission...'
                          : 'Write advisory comments, citations, or guidance for the student...'
                      }
                      className="w-full p-3 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs"
                      >
                        Submit Decision & Post Feedback
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Student Post Comment Box (If Student) */}
              {isOwner && !isSupervisor && (
                <form onSubmit={handleFeedbackSubmit} className="space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <label className="font-semibold text-slate-800 text-xs">
                    Ask a Question or Respond to Advisor
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    placeholder="Write a message to your supervisor regarding this milestone..."
                    className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-md transition-colors"
                    >
                      Post Message
                    </button>
                  </div>
                </form>
              )}

              {/* Comment Thread List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Review Log & Threaded Discussions ({milestone.feedback.length})
                </h4>

                {milestone.feedback.length === 0 ? (
                  <p className="text-slate-400 italic text-center py-6">
                    No supervisor feedback or comments recorded yet.
                  </p>
                ) : (
                  rootComments.map(comment => (
                    <div key={comment.id} className="space-y-2">
                      <div className={`p-4 rounded-lg border ${
                        comment.actionType === 'approved' 
                          ? 'bg-emerald-50/50 border-emerald-200' 
                          : comment.actionType === 'changes_requested'
                          ? 'bg-amber-50/50 border-amber-200'
                          : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">{comment.authorName}</span>
                            <span className="text-[11px] font-medium text-slate-500 uppercase">
                              ({comment.authorRole})
                            </span>
                            {comment.actionType === 'approved' && (
                              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Approved
                              </span>
                            )}
                            {comment.actionType === 'changes_requested' && (
                              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Changes Requested
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <p className="text-slate-700 leading-relaxed text-xs">
                          {comment.content}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                            className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                          >
                            <CornerDownRight className="w-3 h-3" />
                            <span>Reply to this feedback</span>
                          </button>
                        </div>

                        {/* Inline Reply Box */}
                        {replyToId === comment.id && (
                          <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                            <textarea
                              rows={2}
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder={`Reply to ${comment.authorName}...`}
                              className="w-full p-2 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setReplyToId(null)}
                                className="px-2.5 py-1 text-slate-500 hover:text-slate-700"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReplySubmit(comment.id)}
                                className="px-3 py-1 text-white bg-indigo-700 hover:bg-indigo-800 rounded font-medium"
                              >
                                Post Reply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Nested Replies */}
                      {getReplies(comment.id).map(reply => (
                        <div key={reply.id} className="ml-6 sm:ml-8 p-3 rounded-lg bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-900">{reply.authorName}</span>
                              <span className="text-[10px] text-slate-400 uppercase">({reply.authorRole})</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(reply.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-slate-700 leading-relaxed text-xs">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Upload Deliverable (FR-04) */}
          {activeTab === 'upload' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Upload Deliverable Document (v{milestone.deliverables.length + 1})
                </h3>
                <p className="text-[11px] text-slate-500">
                  Accepts PDF, DOCX, and ZIP deliverables. Every submission automatically creates a new tracked version.
                </p>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* File Dropzone */}
                <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-6 text-center space-y-2 bg-slate-50/50">
                  <Upload className="w-8 h-8 text-indigo-600 mx-auto" />
                  <div className="text-xs font-semibold text-slate-800">
                    {selectedFile ? selectedFile.name : 'Choose deliverable file or drag here'}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Supported formats: <span className="font-mono text-slate-700">PDF, DOCX, ZIP</span> (Max 25MB)
                  </p>
                  
                  <input
                    type="file"
                    id="deliverable-file-input"
                    accept=".pdf,.docx,.zip"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="deliverable-file-input"
                    className="inline-block px-4 py-1.5 text-xs font-medium text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 cursor-pointer shadow-xs transition-colors"
                  >
                    Select File from Device
                  </label>

                  {fileTypeError && (
                    <div className="text-rose-600 font-semibold text-xs mt-2">
                      {fileTypeError}
                    </div>
                  )}
                </div>

                {/* File Name & Change Note */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">
                      Deliverable Name / Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={customFileName}
                      onChange={(e) => setCustomFileName(e.target.value)}
                      placeholder="e.g. Glioblastoma_Segmentation_Thesis_Chapter3.pdf"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-800">
                      Change Log / Version Note *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={changeNote}
                      onChange={(e) => setChangeNote(e.target.value)}
                      placeholder="Specify what has changed since the previous version (e.g. 'Addressed Dr. Vance remarks regarding hyperparameter tuning on BraTS test split')..."
                      className="w-full px-3 py-2 text-xs leading-relaxed bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900">
                  <span className="font-semibold">Review Pipeline:</span> Uploading this version will set milestone status to <span className="font-semibold">"Under Review"</span> and notify your supervisor.
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('deliverables')}
                    className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow-xs transition-colors"
                  >
                    Upload Version {milestone.deliverables.length + 1}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
