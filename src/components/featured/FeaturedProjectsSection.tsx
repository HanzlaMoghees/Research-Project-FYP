import React from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { ArrowRight, Star, GraduationCap, Award, BookOpen } from 'lucide-react';

export const FeaturedProjectsSection: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveView } = useApp();

  const featuredList = projects.filter(p => p.isFeatured && p.status === 'published');
  // If fewer than 3 published featured, include other published or outstanding projects
  const displayList = featuredList.length > 0 
    ? featuredList 
    : projects.filter(p => p.isFeatured).slice(0, 4);

  const handleOpenDetail = (project: Project) => {
    setSelectedProjectId(project.id);
    setActiveView('project_detail');
  };

  return (
    <section className="mb-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 tracking-wider uppercase mb-1">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Institutional Research Highlights</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Featured Graduate Theses
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Selected by the Graduate Academic Council for technical rigor, groundbreaking experimental evaluation, and published open access artifacts.
          </p>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayList.map((project, index) => (
          <div 
            key={project.id}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all flex flex-col"
          >
            {/* Visual Asset Container (Zero-broken-image policy fallback) */}
            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
              {project.featuredImage ? (
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 text-center">
                  <GraduationCap className="w-10 h-10 text-indigo-300 mb-2 opacity-80" />
                  <span className="text-xs font-medium text-indigo-200">{project.researchArea}</span>
                </div>
              )}

              {/* Scrim overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Overlaid Metadata */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[11px] font-medium text-indigo-200 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>{project.researchArea}</span>
                  <span className="font-mono tabular-nums">{project.year}</span>
                </div>
                <div className="text-xs text-slate-200 flex items-center gap-1.5 truncate">
                  <span>By {project.studentName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">Advisor: {project.supervisorName}</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-900 transition-colors leading-snug mb-2 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {project.abstract}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-mono tabular-nums">
                  {project.milestones.filter(m => m.status === 'completed').length} / {project.milestones.length} milestones complete
                </div>
                <button
                  onClick={() => handleOpenDetail(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors focus:outline-none"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
