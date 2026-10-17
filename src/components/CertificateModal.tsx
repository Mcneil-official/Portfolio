import React, { useEffect } from 'react';
import { CertificateItem } from '../types';
import { ensureHttp } from '../utils/driveUrls';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const metaText = [certificate.issuer, certificate.year].filter(Boolean).join(' • ');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="certModalTitle"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/50"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 sm:p-5 sticky top-0 bg-white z-10">
          <h2 className="modal-title m-0 text-lg font-semibold text-slate-900" id="certModalTitle">
            {certificate.title}
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
          {certificate.previewUrl ? (
            <div className="mb-4 overflow-hidden rounded-xl bg-slate-100">
              <iframe
                src={certificate.previewUrl}
                className="h-[420px] w-full rounded-xl border-0 bg-slate-100"
                title="Certificate PDF"
              />
            </div>
          ) : certificate.image ? (
            <div className="mb-4 flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 p-4">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="max-h-[420px] w-auto object-contain"
              />
            </div>
          ) : null}

          {metaText && (
            <p className="mb-2 text-sm font-medium text-indigo-700">{metaText}</p>
          )}

          {certificate.description && (
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
              {certificate.description}
            </p>
          )}

          {certificate.credentialUrl && (
            <div className="mt-2">
              <a
                href={ensureHttp(certificate.credentialUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-800 hover:shadow-lg"
              >
                <span>View Full Credential</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 3l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 14v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
