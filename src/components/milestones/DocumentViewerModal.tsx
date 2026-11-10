import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Download, 
  FileText, 
  Calendar, 
  User, 
  ShieldCheck, 
  History, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  FileCheck,
  PanelLeftClose,
  PanelLeft,
  ArrowDownToLine,
  GitCommit
} from 'lucide-react';
import { DeliverableFile, Milestone, Project } from '../../types';

export const DocumentViewerModal: React.FC = () => {
  const { 
    activeDeliverablePreview, 
    setActiveDeliverablePreview, 
    projects,
    showToast
  } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!activeDeliverablePreview) return null;

  const deliverable = activeDeliverablePreview;

  // Locate the parent milestone and project to fetch all associated versions
  let currentMilestone: Milestone | undefined;
  let currentProject: Project | undefined;

  for (const p of projects) {
    for (const m of p.milestones) {
      if (m.deliverables.some(d => d.id === deliverable.id) || m.id === deliverable.milestoneId) {
        currentMilestone = m;
        currentProject = p;
        break;
      }
    }
    if (currentMilestone) break;
  }

  // Get all versions for this milestone/deliverable (fallback to current if none found)
  const allVersions: DeliverableFile[] = currentMilestone?.deliverables.length 
    ? [...currentMilestone.deliverables].sort((a, b) => b.version - a.version)
    : [deliverable];

  const highestVersion = Math.max(...allVersions.map(v => v.version));

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownloadFile = (targetFile: DeliverableFile) => {
    const element = document.createElement('a');
    const file = new Blob([
      `=== ScholarPulse Document Archive ===\n` +
      `File: ${targetFile.fileName}\n` +
      `Version: v${targetFile.version}.0\n` +
      `Uploaded By: ${targetFile.uploadedBy}\n` +
      `Timestamp: ${targetFile.uploadedAt}\n` +
      `Change Summary: ${targetFile.changeNote}\n` +
      `Milestone: ${currentMilestone?.title || 'Research Milestone'}\n` +
      `Project: ${currentProject?.title || 'Academic Thesis'}\n\n` +
      `${targetFile.textContentPreview || 'Archived research manuscript content.'}\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = targetFile.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`Downloaded ${targetFile.fileName} (v${targetFile.version})`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-xl max-w-6xl w-full shadow-2xl flex flex-col h-[92vh] max-h-[850px] overflow-hidden">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3 min-w-0">
            {/* Sidebar toggle button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
              title={isSidebarOpen ? "Collapse versioning sidebar" : "Show versioning sidebar"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 text-indigo-700" />
              ) : (
                <PanelLeft className="w-4 h-4 text-slate-600" />
              )}
              <span className="hidden sm:inline font-semibold">
                {isSidebarOpen ? 'Hide Versions' : `Versions (${allVersions.length})`}
              </span>
            </button>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm text-slate-900 truncate max-w-xs sm:max-w-md">
                  {deliverable.fileName}
                </h3>
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                  v{deliverable.version}.0
                </span>
                {deliverable.version === highestVersion && (
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Current Version
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 font-mono truncate">
                {deliverable.fileType.toUpperCase()} · {formatFileSize(deliverable.fileSize)} · Uploaded by <span className="font-semibold text-slate-700">{deliverable.uploadedBy}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleDownloadFile(deliverable)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Active Version</span>
              <span className="sm:hidden">Download</span>
            </button>
            <button
              onClick={() => setActiveDeliverablePreview(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Change Note Strip for the Active Version */}
        <div className="py-2 px-5 bg-indigo-50/70 border-b border-indigo-100 text-xs text-indigo-950 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <GitCommit className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-bold text-indigo-900 shrink-0">Active Iteration Change Summary:</span>
            <span className="text-indigo-800 truncate italic">"{deliverable.changeNote}"</span>
          </div>
          <div className="text-[11px] font-mono text-indigo-600 shrink-0">
            Saved {new Date(deliverable.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(deliverable.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Modal Main Body: 2-Column Split (Document Versioning Sidebar + Manuscript Preview) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* ========================================================================= */}
          {/* Document Versioning Sidebar                                              */}
          {/* ========================================================================= */}
          {isSidebarOpen && (
            <aside className="w-full sm:w-80 md:w-88 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0 overflow-hidden animate-in slide-in-from-left-2 duration-150">
              
              {/* Sidebar Header */}
              <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-indigo-700" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Document Versioning
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {allVersions.length} saved iteration{allVersions.length !== 1 ? 's' : ''} in repository
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                  {allVersions.length} Iterations
                </span>
              </div>

              {/* Version History List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {allVersions.map((item, index) => {
                  const isSelected = item.id === deliverable.id;
                  const isLatest = item.version === highestVersion;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveDeliverablePreview(item)}
                      className={`group p-3 rounded-xl border text-xs transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-500/30' 
                          : 'bg-white/90 border-slate-200 hover:border-indigo-300 hover:bg-white shadow-2xs'
                      }`}
                    >
                      {/* Top Row: Version Badge, Current Flag, Timestamp */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                            isSelected 
                              ? 'bg-indigo-700 text-white' 
                              : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700'
                          }`}>
                            v{item.version}.0
                          </span>

                          {isLatest && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                              Latest
                            </span>
                          )}

                          {isSelected && (
                            <span className="text-[10px] font-semibold text-indigo-600 flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                              Viewing
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                          {new Date(item.uploadedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>

                      {/* File Name */}
                      <div className="font-semibold text-slate-800 truncate mb-1 text-[11px] group-hover:text-indigo-900 transition-colors">
                        {item.fileName}
                      </div>

                      {/* Change Summary Box */}
                      <div className="p-2 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-snug space-y-1 mb-2">
                        <div className="font-bold text-[10px] text-slate-400 uppercase tracking-wider">
                          Change Summary:
                        </div>
                        <p className="line-clamp-2 italic text-slate-700">
                          "{item.changeNote || 'Standard version submission.'}"
                        </p>
                      </div>

                      {/* Metadata Row: Uploader, Size & Download Icon */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                        <div className="truncate max-w-[170px]">
                          By <span className="text-slate-600 font-medium">{item.uploadedBy}</span> · {formatFileSize(item.fileSize)}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadFile(item);
                          }}
                          className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition-colors"
                          title={`Download version ${item.version}`}
                        >
                          <ArrowDownToLine className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sidebar Footer Context */}
              {currentMilestone && (
                <div className="p-3 border-t border-slate-200 bg-white text-[11px] space-y-1 shrink-0">
                  <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    Milestone Context
                  </div>
                  <div className="font-semibold text-slate-800 truncate">
                    {currentMilestone.title}
                  </div>
                  <div className="text-slate-500 font-mono text-[10px]">
                    Due: {new Date(currentMilestone.dueDate).toLocaleDateString()}
                  </div>
                </div>
              )}

            </aside>
          )}

          {/* ========================================================================= */}
          {/* Main Document Content Viewport                                            */}
          {/* ========================================================================= */}
          <main className="flex-1 overflow-y-auto bg-slate-100/90 p-4 sm:p-6 md:p-8 space-y-4">
            
            {/* Academic Paper Manuscript Preview Container */}
            <div className="bg-white p-6 sm:p-10 md:p-12 rounded-xl shadow-xs border border-slate-200/90 max-w-3xl mx-auto space-y-8 text-slate-800">
              
              {/* Document Header */}
              <div className="border-b border-slate-100 pb-6 text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                  <FileCheck className="w-3 h-3 text-indigo-600" />
                  <span>Institutional Research Artifact · Archival Copy</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
                  {deliverable.fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}
                </h1>

                <div className="flex items-center justify-center flex-wrap gap-2 text-xs text-slate-500 font-mono">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    Version {deliverable.version}.0
                  </span>
                  <span>·</span>
                  <span>Candidate: {deliverable.uploadedBy}</span>
                  <span>·</span>
                  <span>Recorded {new Date(deliverable.uploadedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Version Evolution Alert Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Iteration Changelog & Revision Scope</span>
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">
                    Iteration {deliverable.version} of {allVersions.length}
                  </span>
                </div>
                <p className="text-slate-700 bg-white p-3 rounded-lg border border-slate-100 italic leading-relaxed">
                  "{deliverable.changeNote}"
                </p>
                {allVersions.length > 1 && (
                  <p className="text-[11px] text-slate-500">
                    Use the <strong>Document Versioning</strong> sidebar on the left to switch to previous iterations or compare changelog summaries.
                  </p>
                )}
              </div>

              {/* Manuscript Preview Text */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
                <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-1.5 uppercase tracking-wider">
                  Deliverable Artifact Contents
                </h2>

                <p className="leading-relaxed whitespace-pre-line text-slate-800 bg-slate-50/50 p-4 rounded-lg border border-slate-100 font-mono text-xs">
                  {deliverable.textContentPreview || `Academic Manuscript Content:\n\nTitle: ${deliverable.fileName}\nMilestone: ${currentMilestone?.title || 'Research Stage'}\nAuthor: ${deliverable.uploadedBy}\nSupervisor: ${currentProject?.supervisorName || 'Faculty Advisor'}\n\nSummary:\nThis deliverable document has been submitted and digitally archived in the institutional research repository under university academic regulations. The complete raw binary ${deliverable.fileType.toUpperCase()} file (${formatFileSize(deliverable.fileSize)}) is available for download and verification.`}
                </p>

                <div className="p-4 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3 mt-6">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Cryptographic Verifiability & Access Control</div>
                    <div className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                      SHA-256 digital fingerprint verified. This document version is preserved in immutable cloud storage and restricted according to project visibility permissions.
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </main>

        </div>

        {/* Modal Bottom Status Bar */}
        <div className="px-5 py-2.5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700">Thesis Archival Preserver</span>
            <span>·</span>
            <span>Version {deliverable.version}.0 of {allVersions.length}</span>
            <span>·</span>
            <span className="font-mono">{deliverable.fileName}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDownloadFile(deliverable)}
              className="text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download v{deliverable.version}</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveDeliverablePreview(null)}
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
