import React from 'react';
import { Milestone } from '../../types';

interface MilestoneProgressProps {
  milestones: Milestone[];
  compact?: boolean;
}

export const MilestoneProgress: React.FC<MilestoneProgressProps> = ({ milestones, compact = false }) => {
  const total = milestones.length;
  const completed = milestones.filter(m => m.status === 'completed').length;
  const inReview = milestones.filter(m => m.status === 'under_review' || m.status === 'needs_revision').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-[11px] font-mono tabular-nums text-slate-500 whitespace-nowrap">
          {completed}/{total} ({percentage}%)
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span className="font-medium text-slate-700">Thesis Milestones</span>
        <span className="font-mono tabular-nums text-slate-500">
          <span className="font-semibold text-indigo-700">{completed}</span> of {total} completed ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
        <div 
          className="bg-emerald-600 h-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
          title={`Completed: ${completed}`}
        />
        {inReview > 0 && (
          <div 
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${(inReview / total) * 100}%` }}
            title={`Under Review: ${inReview}`}
          />
        )}
      </div>
    </div>
  );
};
