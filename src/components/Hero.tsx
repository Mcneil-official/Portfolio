import React from 'react';
import { PortfolioData } from '../types';
import fullbodyPhoto from '../../images/fullbody.png';

interface HeroProps {
  data: PortfolioData;
  onProjectsClick: () => void;
  onResumeClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onProjectsClick }) => {
  return (
    <section id="header" className="relative pt-6 pb-12 lg:pt-12 lg:pb-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-2">
            HELLO, I'M
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.05] mb-2">
            {data.name || 'Jhon Mcneil Magtibay'}
          </h1>

          <h2 className="text-xl sm:text-2xl font-medium text-slate-700 mb-4">
            {data.title || 'Full Stack Developer'}
          </h2>


          {/* Action Buttons matching reference photo */}
          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onProjectsClick}
              className="inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md cursor-pointer"
            >
              <span>View My Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <a
              href="https://drive.google.com/uc?export=download&id=1tw2yt3hClDKZj9T4lmSqjYOk7f-ddPMz"
              download
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-2xs transition-all hover:border-slate-400 hover:bg-slate-50 cursor-pointer"
            >
              <span>Download Resume</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Static Circular Portrait */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px]">
            {/* Soft backdrop ambient glow */}
            <div className="absolute inset-0 bg-indigo-100/50 rounded-full blur-2xl transform scale-95 -z-10"></div>

            {/* Clean Static Circular Container */}
            <div className="rounded-full w-full h-full bg-gradient-to-tr from-slate-200 via-indigo-50 to-indigo-100/70 overflow-hidden shadow-inner flex items-center justify-center p-2">
              <img
                src={fullbodyPhoto || '/images/fullbody.png'}
                alt={data.name || 'Profile portrait'}
                className="w-full h-full object-cover object-[100%_40%] scale-125 rounded-full"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/images/fullbody.png') {
                    target.src = '/images/fullbody.png';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
