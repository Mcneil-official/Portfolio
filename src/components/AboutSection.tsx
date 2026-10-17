import React from 'react';

interface AboutSectionProps {
  aboutText: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutText }) => {
  return (
    <section id="about" className="reveal py-6 lg:py-12">
      <h2 className="m-0 font-display text-2xl font-bold text-slate-900 lg:text-4xl">About</h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>
      <div className="mt-6 text-justify leading-relaxed text-slate-600 whitespace-pre-line">
        {aboutText}
      </div>
    </section>
  );
};
