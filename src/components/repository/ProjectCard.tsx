import React from 'react';
import { Project } from '../../types';
import { useApp } from '../../context/AppContext';
import { MilestoneProgress } from '../common/ProgressBar';
import { ArrowRight, BookOpen, User, Star } from 'lucide-react';

interface Props {
  project: Project;
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const { setSelectedProjectId, setActiveView } = useApp();

  const handleOpenDetail = () => {
    setSelectedProjectId(project.id);
    setActiveView('project_detail');
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-5 sm:p-6 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Leading Top Metadata (Unboxed Text with Typographic Separators) */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-2.5">
          <span className="font-medium text-indigo-700">{project.researchArea}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-mono tabular-nums">{project.year}</span>
          {project.isFeatured && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                Featured
              </span>
            </>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug line-clamp-2 mb-2">
          {project.title}
        </h3>

        {/* Abstract */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {project.abstract}
        </p>

        {/* Authors & Supervisor Metadata */}
        <div className="flex flex-col gap-1 text-xs text-slate-500 border-t border-slate-100 pt-3 mb-4">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-slate-400">Author:</span>
            <span className="font-medium text-slate-800 truncate">{project.studentName}</span>
            <span className="text-slate-400 text-[11px] truncate hidden sm:inline">({project.studentDepartment.split('Department of ')[1] || project.studentDepartment})</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-slate-400">Supervisor:</span>
            <span className="font-medium text-slate-700 truncate">{project.supervisorName}</span>
          </div>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5 text-[11px] text-slate-500">
          <span className="text-slate-400">Keywords:</span>
          {project.keywords.slice(0, 4).map((kw, i) => (
            <span key={i} className="text-slate-600">
              {kw}{i < Math.min(project.keywords.length - 1, 3) ? ',' : ''}
            </span>
          ))}
        </div>
      </div>

      {/* Footer with Milestone Progress and View Button */}
      <div className="border-t border-slate-100 pt-4 mt-auto space-y-3">
        <MilestoneProgress milestones={project.milestones} compact={true} />
        
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-mono text-slate-400">
            {project.milestones.length} milestones archived
          </span>
          <button
            onClick={handleOpenDetail}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 group-hover:translate-x-0.5 transition-all focus:outline-none"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
