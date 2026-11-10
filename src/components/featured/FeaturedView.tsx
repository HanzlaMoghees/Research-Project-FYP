import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Star, ArrowRight, BookOpen, GraduationCap, FileCheck } from 'lucide-react';

export const FeaturedView: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveView } = useApp();

  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>Graduate Academic Council Honors</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Featured & Exemplary Research
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          These projects represent top-tier graduate thesis manuscripts distinguished by reproducible experimental data, publication-ready milestones, and faculty commendation.
        </p>
      </div>

      <div className="space-y-8">
        {featuredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all flex flex-col md:flex-row items-stretch"
          >
            {/* Image split */}
            <div className="md:w-5/12 relative bg-slate-100 min-h-[260px]">
              {project.featuredImage ? (
                <img
                  src={project.featuredImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-900 text-white p-6">
                  <GraduationCap className="w-12 h-12 text-indigo-300 mb-2" />
                  <span className="text-xs font-semibold">{project.researchArea}</span>
                </div>
              )}
            </div>

            {/* Details split */}
            <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-indigo-700">{project.researchArea}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-medium">Council Commended</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 leading-snug">
                  {project.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 mb-4">
                  {project.abstract}
                </p>

                <div className="text-xs text-slate-500 space-y-1 border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-slate-400">Researcher:</span>{' '}
                    <span className="font-semibold text-slate-800">{project.studentName}</span>{' '}
                    <span className="text-slate-400">({project.studentDepartment})</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Faculty Advisor:</span>{' '}
                    <span className="font-semibold text-slate-800">{project.supervisorName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  {project.milestones.filter(m => m.status === 'completed').length} of {project.milestones.length} milestones complete
                </div>
                <button
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setActiveView('project_detail');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs"
                >
                  <span>View Details & Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
