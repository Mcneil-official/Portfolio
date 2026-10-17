import React, { useState, useMemo } from 'react';
import { CertificateItem, ContactInfo } from '../types';
import { CertificateCard } from '../components/CertificateCard';
import { FooterContact } from '../components/FooterContact';

interface CertificatesViewProps {
  certificates: CertificateItem[];
  contact: ContactInfo;
  name: string;
  onSelectCertificate: (cert: CertificateItem) => void;
  onBackToHome: () => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({
  certificates,
  contact,
  name,
  onSelectCertificate,
  onBackToHome,
}) => {
  const [selectedIssuer, setSelectedIssuer] = useState<string>('All');

  const issuers = useMemo(() => {
    const set = new Set<string>();
    certificates.forEach((c) => {
      if (c.issuer) set.add(c.issuer);
    });
    return ['All', ...Array.from(set)];
  }, [certificates]);

  const filteredCerts = useMemo(() => {
    if (selectedIssuer === 'All') return certificates;
    return certificates.filter((c) => c.issuer === selectedIssuer);
  }, [certificates, selectedIssuer]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="content-wrapper mx-auto w-full max-w-[1140px] px-2 sm:px-4 flex-1">
        <section className="pt-10 pb-6 lg:pt-16">
          <div className="mb-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Home
            </button>
          </div>

          <h1 className="m-0 font-display text-3xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            Certifications
          </h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>
          <p className="mt-6 max-w-2xl text-slate-500">
            Credentials, trainings, and certifications I've earned. Click any card to view the certificate and credential link.
          </p>

          {issuers.length > 2 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {issuers.map((issuer) => (
                <button
                  key={issuer}
                  type="button"
                  onClick={() => setSelectedIssuer(issuer)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                    selectedIssuer === issuer
                      ? 'bg-indigo-700 text-white shadow-sm shadow-indigo-200'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
                  }`}
                >
                  {issuer}
                </button>
              ))}
            </div>
          )}
        </section>

        <section id="certificates-page" className="reveal pb-12 pt-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {filteredCerts.map((cert, idx) => (
              <CertificateCard
                key={idx}
                certificate={cert}
                onSelect={onSelectCertificate}
                className="h-full"
              />
            ))}
          </div>
        </section>
      </div>

      <div className="-mx-4 sm:-mx-8 lg:-mx-12">
        <FooterContact contact={contact} name={name} />
      </div>
    </div>
  );
};
