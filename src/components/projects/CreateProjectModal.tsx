import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RESEARCH_AREAS } from '../../data/seedData';
import { X, BookOpen, User, Tag, Calendar, Layers } from 'lucide-react';

export const CreateProjectModal: React.FC = () => {
  const { isCreateProjectOpen, setIsCreateProjectOpen, createProject, users, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [researchArea, setResearchArea] = useState(RESEARCH_AREAS[0].name);
  const [keywordsInput, setKeywordsInput] = useState('');
  const [supervisorId, setSupervisorId] = useState(currentUser?.assignedSupervisorId || 'supervisor-1');

  if (!isCreateProjectOpen) return null;

  const supervisors = users.filter(u => u.role === 'supervisor');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !abstract.trim()) return;

    const keywords = keywordsInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    createProject({
      title: title.trim(),
      abstract: abstract.trim(),
      researchArea,
      keywords: keywords.length > 0 ? keywords : ['Graduate Thesis', 'Research'],
      supervisorId
    });

    setIsCreateProjectOpen(false);
    setTitle('');
    setAbstract('');
    setKeywordsInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Create Research Thesis Project
            </h2>
            <p className="text-xs text-slate-500">
              Initialize a new research degree repository with milestones and supervisor oversight.
            </p>
          </div>
          <button
            onClick={() => setIsCreateProjectOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Attention-Gated Neural Networks for Medical Scan Segmentation"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>

          {/* Research Area & Supervisor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">
                Research Area / Discipline *
              </label>
              <select
                value={researchArea}
                onChange={(e) => setResearchArea(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
              >
                {RESEARCH_AREAS.map(area => (
                  <option key={area.id} value={area.name}>
                    {area.name} ({area.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-800">
                Assigned Faculty Supervisor *
              </label>
              <select
                value={supervisorId}
                onChange={(e) => setSupervisorId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
              >
                {supervisors.map(sup => (
                  <option key={sup.id} value={sup.id}>
                    {sup.name} ({sup.title})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Abstract / Short Description */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800">
              Abstract & Research Scope *
            </label>
            <textarea
              required
              rows={4}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Provide a concise statement of the research problem, methodology, dataset, and expected contributions..."
              className="w-full px-3.5 py-2 text-xs leading-relaxed bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>

          {/* Keywords */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-800">
              Keywords (Comma separated)
            </label>
            <input
              type="text"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              placeholder="e.g. Deep Learning, Computer Vision, Medical Imaging, Segmentation"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>

          {/* Standard Milestones Notice */}
          <div className="p-3.5 rounded-lg bg-indigo-50/70 border border-indigo-100 space-y-1 text-slate-600">
            <div className="font-semibold text-indigo-900 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Standard 4-Phase Academic Roadmap Included</span>
            </div>
            <p className="text-[11px] text-slate-500">
              ScholarPulse automatically seeds: 1. Project Proposal & Ethics, 2. Literature Review, 3. Implementation & Experiments, 4. Final Thesis Manuscript.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateProjectOpen(false)}
              className="px-4 py-2 font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors shadow-xs"
            >
              Create Project & Roadmap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
