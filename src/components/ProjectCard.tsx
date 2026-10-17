import React from 'react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, className = '' }) => {
  // Derive category subtitle from languages or description
  const category =
    project.languages && project.languages.length > 0
      ? project.languages.slice(0, 2).join(' • ')
      : 'Web Application';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className={`group flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md cursor-pointer ${className}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Graceful fallback for broken image links
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-tr from-slate-100 to-indigo-50/50 text-indigo-700 font-semibold text-sm">
            {project.title}
          </div>
        )}
      </div>

      {/* Card Footer matching reference photo */}
      <div className="flex items-center justify-between p-4 sm:p-5 gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{category}</p>
        </div>

        {/* Circular Arrow Button matching reference photo */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-200 group-hover:bg-slate-900 group-hover:text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </div>
  );
};
