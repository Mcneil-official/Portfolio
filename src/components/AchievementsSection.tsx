import React from 'react';
import { NotableAchievementItem } from '../types';
import { SectionIcons } from './icons/NavIcons';

interface AchievementsSectionProps {
  achievements: NotableAchievementItem[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <section id="notable-achievements" className="reveal py-6 lg:py-12">
      <h2 className="m-0 font-display text-2xl font-bold text-slate-900 lg:text-4xl">Achievements</h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>

      <div className="mt-6 space-y-3">
        {achievements.map((item, idx) => {
          const metaParts = [item.type, item.organization, item.year].filter(Boolean);
          return (
            <div
              key={idx}
              className="notable-achievement-item flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                {SectionIcons.achievement}
              </div>
              <div className="flex-1">
                <h3 className="mb-1 text-base font-semibold text-slate-900">{item.title}</h3>
                {metaParts.length > 0 && (
                  <p className="mb-1 text-sm font-medium text-slate-700">
                    {metaParts.join(' • ')}
                  </p>
                )}
                {item.description && (
                  <p className="mb-0 text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
