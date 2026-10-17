import React, { useRef } from 'react';
import { CertificateItem } from '../types';
import { CertificateCard } from './CertificateCard';

interface CertificatesCarouselProps {
  certificates: CertificateItem[];
  onSelectCertificate: (cert: CertificateItem) => void;
  onViewAllCertificates: () => void;
}

export const CertificatesCarousel: React.FC<CertificatesCarouselProps> = ({
  certificates,
  onSelectCertificate,
  onViewAllCertificates,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -trackRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: trackRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollLeft();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollRight();
    }
  };

  return (
    <section id="certificates" className="reveal py-6 lg:py-12">
      <h2 className="m-0 font-display text-2xl font-bold text-slate-900 lg:text-4xl">Certificates</h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="mb-0 text-slate-500">Credentials, trainings, and certifications I've earned.</p>
        <button
          type="button"
          onClick={onViewAllCertificates}
          className="inline-flex items-center gap-2 rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-800 hover:shadow-lg"
        >
          View All Certificates
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div
        className="relative mt-4"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="Certificates carousel"
      >
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Previous certificates"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={trackRef}
          className="no-scrollbar relative flex items-stretch snap-x snap-mandatory overflow-x-auto px-12 py-1"
        >
          {certificates.map((cert, idx) => (
            <div
              key={idx}
              className="flex w-full shrink-0 snap-center px-2 sm:w-1/2 lg:w-1/3"
            >
              <CertificateCard
                certificate={cert}
                onSelect={onSelectCertificate}
                className="h-full"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollRight}
          aria-label="Next certificates"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
};
