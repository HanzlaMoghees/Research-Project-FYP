import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RESEARCH_AREAS } from '../../data/seedData';

interface Props {
  totalCount: number;
  filteredCount: number;
}

export const ProjectSearchFilter: React.FC<Props> = ({ totalCount, filteredCount }) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedArea, 
    setSelectedArea, 
    selectedYear, 
    setSelectedYear 
  } = useApp();

  const years = ['ALL', '2026', '2025', '2024'];

  const hasActiveFilters = searchQuery.trim() !== '' || selectedArea !== 'ALL' || selectedYear !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedArea('ALL');
    setSelectedYear('ALL');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Top Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search theses by title, research topic, author, or keywords..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Academic Year Selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Year:</span>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedYear === year 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Research Area Filter Bar */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Research Area:</span>
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedArea('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedArea === 'ALL'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            All Disciplines
          </button>
          {RESEARCH_AREAS.map(area => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.name)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedArea === area.name
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>
      </div>

      {/* Result Count Strip */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <div className="font-mono tabular-nums">
          Showing <span className="font-semibold text-slate-800">{filteredCount}</span> of {totalCount} published theses
        </div>
        {hasActiveFilters && (
          <span className="text-slate-400">
            Filtered by active criteria
          </span>
        )}
      </div>
    </div>
  );
};
