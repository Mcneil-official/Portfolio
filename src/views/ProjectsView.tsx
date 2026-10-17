import React, { useState, useMemo } from 'react';
import { ProjectItem, ContactInfo } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { FooterContact } from '../components/FooterContact';

interface ProjectsViewProps {
  projects: ProjectItem[];
  contact: ContactInfo;
  name: string;
  onSelectProject: (project: ProjectItem) => void;
  onBackToHome: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  contact,
  name,
  onSelectProject,
  onBackToHome,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract all unique languages
  const allLanguages = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => (p.languages || []).forEach((l) => set.add(l)));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'All') return projects;
    return projects.filter((p) => (p.languages || []).includes(selectedTag));
  }, [projects, selectedTag]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="content-wrapper mx-auto w-full max-w-[1140px] px-2 sm:px-4 flex-1">
        <section className="pt-10 pb-6 lg:pt-16">
          <div className="mb-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </button>
          </div>

          <h1 className="m-0 font-display text-3xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            All Projects
          </h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>
          <p className="mt-6 max-w-2xl text-slate-500">
            All my projects — from web applications and REST APIs to data and machine learning experiments. Click any card to view details.
          </p>

          {/* Filter tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {allLanguages.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-indigo-700 text-white shadow-sm shadow-indigo-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        <section id="projects-page" className="reveal pb-12 pt-2">
          <div className="grid grid-cols-1 gap-6 items-stretch sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((proj, idx) => (
              <ProjectCard
                key={idx}
                project={proj}
                onSelect={onSelectProject}
                className="h-full"
              />
            ))}
          </div>
        </section>
      </div>

      <div className="-mx-4 sm:-mx-8 lg:-mx-12">
        <FooterContact contact={contact} name={name} />
      </div>
    </div>
  );
};
