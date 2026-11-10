import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectSearchFilter } from './ProjectSearchFilter';
import { ProjectCard } from './ProjectCard';
import { FeaturedProjectsSection } from '../featured/FeaturedProjectsSection';
import { GraduationCap, BookOpen, SearchX, Sparkles, Plus, Award } from 'lucide-react';

export const RepositoryView: React.FC = () => {
  const { 
    projects, 
    searchQuery, 
    selectedArea, 
    selectedYear, 
    currentRole, 
    setIsCreateProjectOpen,
    setActiveView
  } = useApp();

  // Published projects for public repository view
  const publishedProjects = projects.filter(p => p.status === 'published');

  // Filter based on user controls
  const filteredProjects = publishedProjects.filter(project => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' ||
      project.title.toLowerCase().includes(query) ||
      project.abstract.toLowerCase().includes(query) ||
      project.studentName.toLowerCase().includes(query) ||
      project.supervisorName.toLowerCase().includes(query) ||
      project.keywords.some(k => k.toLowerCase().includes(query));

    const matchesArea = selectedArea === 'ALL' || project.researchArea === selectedArea;
    const matchesYear = selectedYear === 'ALL' || project.year.toString() === selectedYear;

    return matchesSearch && matchesArea && matchesYear;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      
      {/* Institutional Hero Banner */}
      <section className="bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-sm relative overflow-hidden">
        {/* Subtle geometric academic background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Open Access Academic Research Archive</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Discover peer-reviewed graduate theses & research milestones.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            ScholarPulse bridges researchers and faculty advisors through transparent milestone tracking, deliverable document versioning, and rigorous peer review sign-offs.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tabular-nums text-sm">{publishedProjects.length}</span>
              <span>Theses Archived</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tabular-nums text-sm">
                {projects.reduce((acc, p) => acc + p.milestones.length, 0)}
              </span>
              <span>Milestones Verified</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white tabular-nums text-sm">100%</span>
              <span>Open Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* FR-08: Featured Projects Section */}
      <FeaturedProjectsSection />

      {/* Repository Section */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-1">
            Searchable Database
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            All Published Theses & Dissertations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Explore validated graduate research projects across departments, methodologies, and academic years.
          </p>
        </div>

        {/* FR-06 Search and Filter Controls */}
        <ProjectSearchFilter 
          totalCount={publishedProjects.length}
          filteredCount={filteredProjects.length}
        />

        {/* Results Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          /* FR-06: Explicit "No results found" clear message */
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
            <SearchX className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No results found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              We couldn't find any published research projects matching your search keywords or filter criteria. Try searching for broader terms or selecting "All Disciplines".
            </p>
          </div>
        )}
      </section>

    </div>
  );
};
