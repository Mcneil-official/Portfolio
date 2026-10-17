import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { getTechIcon } from './icons/TechIcons';
import { ensureHttp } from '../utils/driveUrls';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const repoUrl = project.repository || '';
  const liveUrl = project.deployment || project.live || '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="projectModalTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/50"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 sm:p-5 sticky top-0 bg-white z-10">
          <h2 className="modal-title m-0 text-lg font-semibold text-slate-900" id="projectModalTitle">
            {project.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-5">
          {project.image && (
            <div className="mb-4 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center max-h-[300px]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="max-h-[300px] w-full object-cover"
              />
            </div>
          )}

          <p className="mb-4 leading-relaxed text-slate-600">
            {project.description}
          </p>

          {project.languages && project.languages.length > 0 && (
            <div className="project-modal-languages mb-5 flex flex-wrap gap-2">
              {project.languages.map((lang) => {
                const icon = getTechIcon(lang);
                return (
                  <span
                    key={lang}
                    className="project-lang-chip inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-800"
                  >
                    {icon && <span className="inline-flex items-center">{icon}</span>}
                    {lang}
                  </span>
                );
              })}
            </div>
          )}

          <div className="project-modal-actions flex flex-wrap gap-2.5">
            {repoUrl && (
              <a
                href={ensureHttp(repoUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-btn inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-800 shadow-sm shadow-indigo-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Repository</span>
              </a>
            )}

            {liveUrl && (
              <a
                href={ensureHttp(liveUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-btn inline-flex items-center gap-2 rounded-full bg-indigo-700 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-indigo-800 shadow-sm shadow-indigo-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 3l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 14v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Live Site</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
