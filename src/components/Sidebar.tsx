import React, { useState } from 'react';
import { ActivePage, ContactInfo } from '../types';
import { ensureHttp } from '../utils/driveUrls';

interface SidebarProps {
  activePage: ActivePage;
  activeSection: string;
  contact?: ContactInfo;
  onNavigatePage: (page: ActivePage, anchor?: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  activeSection,
  contact,
  onNavigatePage,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      key: 'home',
      label: 'Home',
      type: 'page' as const,
      anchor: 'header',
      page: 'home' as const,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      key: 'about',
      label: 'About',
      type: 'section' as const,
      anchor: 'about',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      key: 'projects',
      label: 'Projects',
      type: 'page' as const,
      anchor: 'projects',
      page: 'projects' as const,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      key: 'experience',
      label: 'Experience',
      type: 'section' as const,
      anchor: 'experience',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      key: 'certificates',
      label: 'Certificates',
      type: 'page' as const,
      anchor: 'certificates',
      page: 'certificates' as const,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      type: 'section' as const,
      anchor: 'contact',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setMobileOpen(false);
    if (item.type === 'page' && activePage !== item.page && (item.page === 'projects' || item.page === 'certificates')) {
      onNavigatePage(item.page);
    } else if (item.anchor) {
      onNavigatePage('home', item.anchor);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-md lg:hidden cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        <span className={`h-0.5 w-4.5 bg-slate-800 transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`h-0.5 w-4.5 bg-slate-800 transition-all ${mobileOpen ? 'opacity-0' : ''}`}></span>
        <span className={`h-0.5 w-4.5 bg-slate-800 transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Modern Compact Dashboard Sidebar (w-52) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-52 flex-col border-r border-slate-200/80 bg-white px-3.5 py-6 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Monogram Header */}
        <div className="mb-6 px-2">
          <button
            onClick={() => {
              setMobileOpen(false);
              onNavigatePage('home');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <span className="font-display text-xl font-black tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors">
              JM
            </span>
          </button>
        </div>

        {/* Navigation Pills */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            let isActive = false;
            if (activePage === 'home') {
              if (item.key === 'home') {
                isActive = activeSection === 'header' || activeSection === '';
              } else {
                isActive = activeSection === item.anchor;
              }
            } else if (activePage === 'projects') {
              isActive = item.key === 'projects';
            } else if (activePage === 'certificates') {
              isActive = item.key === 'certificates';
            }

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50/90 text-indigo-700 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className={`shrink-0 ${isActive ? 'text-indigo-700' : 'text-slate-500'}`}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Social Icons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400 px-1">
          {contact?.github && (
            <a
              href={ensureHttp(contact.github)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1 rounded-lg hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          )}

          {contact?.linkedin && (
            <a
              href={ensureHttp(contact.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1 rounded-lg hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          )}

          {contact?.facebook && (
            <a
              href={ensureHttp(contact.facebook)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-1 rounded-lg hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          )}

          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className="p-1 rounded-lg hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          )}
        </div>
      </aside>
    </>
  );
};
