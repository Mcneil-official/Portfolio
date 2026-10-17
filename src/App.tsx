import React, { useState, useEffect, useCallback } from 'react';
import { PortfolioData, ProjectItem, CertificateItem, ActivePage } from './types';
import { fallbackPortfolioData } from './data/fallbackData';
import { DATA_URL, toDriveUrl, toDrivePreviewUrl } from './utils/driveUrls';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './views/HomeView';
import { ProjectsView } from './views/ProjectsView';
import { CertificatesView } from './views/CertificatesView';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';
import { BackToTop } from './components/BackToTop';
import { PageLoader } from './components/PageLoader';

export const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(fallbackPortfolioData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeSection, setActiveSection] = useState<string>('header');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // Initialize page and section from URL hash
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'projects' || hash === 'projects-page') {
        setActivePage('projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'certificates' || hash === 'certificates-page') {
        setActivePage('certificates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setActivePage('home');
        if (hash) {
          setActiveSection(hash);
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        } else {
          setActiveSection('header');
        }
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Fetch dynamic portfolio data with graceful fallback
  useEffect(() => {
    const loadPortfolioData = async () => {
      const startTs = Date.now();
      try {
        let res: Response | null = null;
        try {
          res = await fetch(DATA_URL);
        } catch {
          // Fallback on CORS or connection errors
        }

        if (!res || !res.ok) {
          res = await fetch('/data.json');
        }

        if (res && res.ok) {
          const rawData: PortfolioData = await res.json();
          // Normalize Drive URLs
          if (rawData.projects) {
            rawData.projects.forEach((p) => {
              p.image = toDriveUrl(p.image);
            });
          }
          if (rawData.certificates) {
            rawData.certificates.forEach((c) => {
              c.image = toDriveUrl(c.image);
              if (c.credentialUrl) {
                c.previewUrl = toDrivePreviewUrl(c.credentialUrl);
              }
            });
          }
          setData(rawData);
        }
      } catch (err) {
        console.warn('Using local fallback portfolio data:', err);
      } finally {
        const elapsed = Date.now() - startTs;
        const wait = Math.max(0, 300 - elapsed);
        setTimeout(() => {
          setIsLoading(false);
        }, wait);
      }
    };

    loadPortfolioData();
  }, []);

  // ScrollSpy for sections on home view
  useEffect(() => {
    if (activePage !== 'home') return;

    const sectionIds = [
      'header',
      'about',
      'projects',
      'experience',
      'certificates',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      let currentSection = 'header';

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPos) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const handleNavigatePage = useCallback((page: ActivePage, anchor?: string) => {
    setActivePage(page);
    if (page === 'projects') {
      window.location.hash = 'projects';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'certificates') {
      window.location.hash = 'certificates';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (anchor) {
        window.location.hash = anchor;
        setActiveSection(anchor);
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      } else {
        window.location.hash = '';
        setActiveSection('header');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const handleScrollToSection = useCallback((sectionId: string) => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activePage]);

  return (
    <div className="bg-slate-50 text-slate-900 antialiased min-h-screen overflow-x-hidden">
      <PageLoader isLoading={isLoading} />

      <Sidebar
        activePage={activePage}
        activeSection={activeSection}
        contact={data.contact}
        onNavigatePage={handleNavigatePage}
      />

      {/* Main Content Area: uses lg:pl-52 so content is centered in available viewport without right overflow */}
      <div className="min-h-screen lg:pl-52 transition-all">
        <main className="main-content min-h-screen w-full px-4 py-6 sm:px-8 lg:px-10">
          {activePage === 'home' && (
            <HomeView
              data={data}
              onSelectProject={setSelectedProject}
              onSelectCertificate={setSelectedCertificate}
              onViewAllProjects={() => handleNavigatePage('projects')}
              onViewAllCertificates={() => handleNavigatePage('certificates')}
              onScrollToSection={handleScrollToSection}
            />
          )}

          {activePage === 'projects' && (
            <ProjectsView
              projects={data.projects}
              contact={data.contact}
              name={data.name}
              onSelectProject={setSelectedProject}
              onBackToHome={() => handleNavigatePage('home')}
            />
          )}

          {activePage === 'certificates' && (
            <CertificatesView
              certificates={data.certificates}
              contact={data.contact}
              name={data.name}
              onSelectCertificate={setSelectedCertificate}
              onBackToHome={() => handleNavigatePage('home')}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <BackToTop />
    </div>
  );
};

export default App;
