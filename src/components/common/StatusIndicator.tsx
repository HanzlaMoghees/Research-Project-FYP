import React from 'react';
import { MilestoneStatus, ProjectStatus } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, FileSearch, CircleDashed } from 'lucide-react';

interface MilestoneStatusProps {
  status: MilestoneStatus;
  showIcon?: boolean;
}

export const MilestoneStatusBadge: React.FC<MilestoneStatusProps> = ({ status, showIcon = true }) => {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          <span>Completed</span>
        </span>
      );
    case 'under_review':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700">
          {showIcon && <FileSearch className="w-3.5 h-3.5 text-indigo-600" />}
          <span>Under Review</span>
        </span>
      );
    case 'needs_revision':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
          <span>Needs Revision</span>
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700">
          {showIcon && <Clock className="w-3.5 h-3.5 text-sky-600" />}
          <span>In Progress</span>
        </span>
      );
    case 'not_started':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          {showIcon && <CircleDashed className="w-3.5 h-3.5 text-slate-400" />}
          <span>Not Started</span>
        </span>
      );
  }
};

interface ProjectStatusProps {
  status: ProjectStatus;
}

export const ProjectStatusBadge: React.FC<ProjectStatusProps> = ({ status }) => {
  switch (status) {
    case 'published':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>Published in Archive</span>
        </span>
      );
    case 'submitted_for_publication':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-700">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          <span>Pending Publication Review</span>
        </span>
      );
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
          <span>Active Research</span>
        </span>
      );
    case 'draft':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span>Draft</span>
        </span>
      );
  }
};
