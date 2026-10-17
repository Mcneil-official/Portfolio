import React from 'react';
import { ExperienceItem } from '../types';
import { SectionIcons } from './icons/NavIcons';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  return (
    <section id="experience" className="reveal py-6 lg:py-12">
      <h2 className="m-0 font-display text-2xl font-bold text-slate-900 lg:text-4xl">Experiences</h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>

      <div className="mt-6 space-y-3">
        {experiences.map((exp, index) => {
          const position = exp.position || exp.role || '';
          const company = exp.company || exp.organization || '';
          const duration = exp.duration || exp.year || '';

          return (
            <div
              key={index}
              className="education-item flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                {SectionIcons.experience}
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-base font-semibold text-slate-900">{position}</h3>
                {company && <p className="mb-1 text-sm text-slate-500">{company}</p>}
                {duration && <p className="mb-1 text-sm italic text-indigo-700">{duration}</p>}
                {exp.description && (
                  <p className="mb-0 text-sm text-slate-500 leading-relaxed">{exp.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
