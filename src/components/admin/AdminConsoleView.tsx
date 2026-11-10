import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Star, 
  Trash2, 
  CheckCircle2, 
  Plus, 
  UserPlus, 
  FolderCheck,
  Send,
  Layers,
  Search
} from 'lucide-react';
import { ProjectStatusBadge } from '../common/StatusIndicator';
import { UserRole } from '../../types';
import { RESEARCH_AREAS } from '../../data/seedData';

export const AdminConsoleView: React.FC = () => {
  const { 
    projects, 
    users, 
    publishProject, 
    toggleFeatured, 
    deleteProject, 
    assignSupervisor,
    updateUserRole,
    setSelectedProjectId,
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'projects' | 'users' | 'disciplines'>('projects');
  const [filterQuery, setFilterQuery] = useState('');

  const supervisors = users.filter(u => u.role === 'supervisor');

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    p.studentName.toLowerCase().includes(filterQuery.toLowerCase()) ||
    p.researchArea.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Admin Banner */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Institutional Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Dean & System Administrator Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage institutional thesis repositories, verify publication submissions, feature exemplary research, allocate faculty supervisors, and enforce academic standards.
          </p>
        </div>

        <button
          onClick={() => setActiveView('analytics_dashboard')}
          className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors shrink-0 self-start md:self-center shadow-xs"
        >
          View Overall Analytics Dashboard →
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'projects' 
              ? 'bg-indigo-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Project Governance ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'users' 
              ? 'bg-indigo-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts & Roles ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('disciplines')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'disciplines' 
              ? 'bg-indigo-700 text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Research Disciplines ({RESEARCH_AREAS.length})</span>
        </button>
      </div>

      {/* TAB 1: Projects Governance */}
      {activeTab === 'projects' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                All Enrolled & Published Graduate Theses
              </h2>
              <p className="text-xs text-slate-500">
                Publish or unpublish to public repository, toggle Featured status for homepage showcase, and reassign supervisors.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter by title or author..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Thesis & Candidate</th>
                  <th className="py-3 px-4">Discipline</th>
                  <th className="py-3 px-4">Assigned Supervisor</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-900 line-clamp-1">{project.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {project.studentName} · <span className="font-mono">{project.year}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {project.researchArea}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <select
                        value={project.supervisorId}
                        onChange={(e) => assignSupervisor(project.id, e.target.value)}
                        className="p-1 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      >
                        {supervisors.map(s => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <ProjectStatusBadge status={project.status} />
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(project.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          project.isFeatured 
                            ? 'bg-amber-100 text-amber-900' 
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Star className={`w-3 h-3 ${project.isFeatured ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                        <span>{project.isFeatured ? 'Featured' : 'Not Featured'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => publishProject(project.id, project.status !== 'published')}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          project.status === 'published'
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {project.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProjectId(project.id);
                          setActiveView('project_detail');
                        }}
                        className="px-2.5 py-1 rounded text-[11px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
                      >
                        View
                      </button>

                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: User Accounts & Roles */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              User Accounts & Role Permissions
            </h2>
            <p className="text-xs text-slate-500">
              Manage accounts across Student, Supervisor, and Administrator tiers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Department / Affiliation</th>
                  <th className="py-3 px-4">Academic Role</th>
                  <th className="py-3 px-4 text-right">Role Assignment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <div className="font-semibold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{u.department}</div>
                      <div className="text-[11px] text-slate-400">{u.title}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold uppercase font-mono ${
                        u.role === 'admin' 
                          ? 'bg-rose-100 text-rose-800' 
                          : u.role === 'supervisor'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                        className="p-1 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-indigo-600"
                      >
                        <option value="student">Student</option>
                        <option value="supervisor">Supervisor</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Research Areas */}
      {activeTab === 'disciplines' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Institutional Research Disciplines
            </h2>
            <p className="text-xs text-slate-500">
              Classifications used across candidate thesis indexing and filter taxonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESEARCH_AREAS.map(area => (
              <div key={area.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {area.code}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {projects.filter(p => p.researchArea === area.name).length} projects
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{area.name}</h4>
                <p className="text-xs text-slate-500">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
