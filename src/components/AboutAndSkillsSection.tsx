import React from 'react';
import { PortfolioData } from '../types';
import { getTechIcon } from './icons/TechIcons';

interface AboutAndSkillsSectionProps {
  data: PortfolioData;
}

export const AboutAndSkillsSection: React.FC<AboutAndSkillsSectionProps> = ({ data }) => {
  const { about, skills = [] } = data;

  const categorizedSkills: Record<string, string[]> = {
    Languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Java', 'Python'],
    Frameworks: ['Angular', 'React Native', 'Flutter', 'Nodejs', 'Spring Boot'],
    Database: ['MySQL', 'PostgreSQL'],
  };

  return (
    <section id="about" className="py-8 lg:py-12 border-t border-slate-200/70">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
        {/* Left Column: About Me Bio Narrative */}
        <div className="lg:col-span-7 flex flex-col text-left">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">
            ABOUT ME
          </span>

          <p className="text-base leading-relaxed text-slate-600 whitespace-pre-line">
            {about}
          </p>
        </div>

        {/* Right Column: "My Skills" Elevated Card (No progress bars) */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
            <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 mb-5">
              My Skills
            </h3>

            <div className="space-y-5">
              {Object.entries(categorizedSkills).map(([category, items]) => {
                const matched = items.filter(
                  (s) => skills.includes(s) || (s === 'Nodejs' && skills.includes('Node.js'))
                );
                if (matched.length === 0) return null;

                return (
                  <div key={category} className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {category}
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {matched.map((skillName) => {
                        const icon = getTechIcon(skillName);
                        return (
                          <div
                            key={skillName}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-xs font-medium text-slate-800 transition-all hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-900"
                          >
                            {icon && <span className="flex shrink-0 items-center">{icon}</span>}
                            <span>{skillName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
