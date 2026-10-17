import React from 'react';
import { CertificateItem } from '../types';

interface CertificateCardProps {
  certificate: CertificateItem;
  onSelect: (cert: CertificateItem) => void;
  className?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onSelect,
  className = '',
}) => {
  const metaText = [certificate.issuer, certificate.year].filter(Boolean).join(' • ');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(certificate)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(certificate);
        }
      }}
      className={`group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg ${className}`}
    >
      <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-slate-100 p-4">
        {certificate.image ? (
          <img
            src={certificate.image}
            alt={certificate.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : certificate.credentialUrl ? (
          <svg className="h-16 w-16 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg className="h-16 w-16 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m9 14.5-2 7 5-3 5 3-2-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-base font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
          {certificate.title}
        </h3>
        {metaText && (
          <p className="mb-0 text-sm text-slate-500">{metaText}</p>
        )}
      </div>
    </div>
  );
};
