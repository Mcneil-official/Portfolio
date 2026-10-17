import React from 'react';
import { PortfolioData } from '../types';

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

          <p className="max-w-xl text-base leading-relaxed text-slate-600 mb-8">
            {data.subtitle ||
              'I design and build scalable, secure backend systems and clean, reliable web experiences. Passionate about creating user-centered solutions with seamless performance.'}
          </p>

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

        {/* Right Column: Printed Photo Card with Washi Tape */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative pt-4 pb-2 w-full max-w-[420px] flex justify-center lg:justify-end">
            {/* Washi / Masking Tape Accent pinned on top center */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-32 sm:w-36 h-8 bg-amber-100/80 border-y border-amber-200/60 shadow-xs z-20 -rotate-1 backdrop-blur-2xs"
              style={{
                clipPath: 'polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)',
              }}
              aria-hidden="true"
            />

            {/* Printed Photo Card with Wider Dimensions */}
            <div className="relative w-full sm:w-[380px] lg:w-[410px] bg-white p-3.5 sm:p-4.5 pb-5 sm:pb-7 rounded-xs shadow-[0_22px_55px_rgba(15,23,42,0.14),0_6px_18px_rgba(15,23,42,0.08)] rotate-[2deg] hover:rotate-0 transition-transform duration-300">
              {/* Photo Area with Wider Landscape Aspect Ratio matching 577x433 photo */}
              <div className="w-full aspect-[4/3.1] overflow-hidden bg-slate-100 shadow-inner">
                <img
                  src="/images/fullbody.jpg"
                  alt={data.name || 'Profile portrait'}
                  className="w-full h-full object-cover object-[54%_34%] scale-[1.32] -translate-x-2.5 -translate-y-1.5 origin-center"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('.jpg')) {
                      target.src = '/images/fullbody.png';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
