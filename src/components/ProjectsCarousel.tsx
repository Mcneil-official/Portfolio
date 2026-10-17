import React from 'react';
import { ProjectItem } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectsCarouselProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onViewAllProjects: () => void;
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  projects,
  onSelectProject,
  onViewAllProjects,
}) => {
  // Take top 3 projects for the featured row just like in the screenshot
  const displayProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="py-8 lg:py-12 border-t border-slate-200/70">
      {/* Header matching reference screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-2 block">
            FEATURED PROJECTS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Some of my recent work
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAllProjects}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer group"
        >
          <span>View All Projects</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* 3-Column Cards Grid matching reference screenshot */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {displayProjects.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            onSelect={onSelectProject}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
};
