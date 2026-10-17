import React from 'react';
import { getTechIcon } from './icons/TechIcons';

interface SkillsSectionProps {
  skills: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const categorized: Record<string, string[]> = {
    Languages: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Java', 'Python'],
    Frameworks: ['Angular', 'React Native', 'Flutter', 'Nodejs', 'Spring Boot'],
    Database: ['MySQL', 'PostgreSQL']
  };

  return (
    <section id="skills" className="reveal py-6 lg:py-12">
      <h2 className="m-0 font-display text-2xl font-bold text-slate-900 lg:text-4xl">Skills</h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categorized).map(([cat, skillNames]) => {
          const matchedSkills = skillNames.filter((s) =>
            skills.includes(s) || (s === 'Nodejs' && skills.includes('Node.js'))
          );
          if (matchedSkills.length === 0) return null;

          return (
            <div key={cat} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-700">
                {cat}
              </h3>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {matchedSkills.map((skillName) => {
                  const icon = getTechIcon(skillName);
                  return (
                    <div
                      key={skillName}
                      className="flex flex-col items-center gap-1.5"
                      title={skillName}
                      aria-label={skillName}
                    >
                      {icon && (
                        <span className="skills-grid-icon flex items-center justify-center h-6 w-6">
                          {icon}
                        </span>
                      )}
                      <span className="text-xs font-medium text-slate-700">{skillName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
