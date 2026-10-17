import React from 'react';
import { PortfolioData, ProjectItem, CertificateItem } from '../types';
import { Hero } from '../components/Hero';
import { AboutAndSkillsSection } from '../components/AboutAndSkillsSection';
import { ProjectsCarousel } from '../components/ProjectsCarousel';
import { ExperienceSection } from '../components/ExperienceSection';
import { CertificatesCarousel } from '../components/CertificatesCarousel';
import { EducationSection } from '../components/EducationSection';
import { AchievementsSection } from '../components/AchievementsSection';
import { FooterContact } from '../components/FooterContact';

interface HomeViewProps {
  data: PortfolioData;
  onSelectProject: (project: ProjectItem) => void;
  onSelectCertificate: (cert: CertificateItem) => void;
  onViewAllProjects: () => void;
  onViewAllCertificates: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  data,
  onSelectProject,
  onSelectCertificate,
  onViewAllProjects,
  onViewAllCertificates,
  onScrollToSection,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Dashboard Canvas - perfectly centered with balanced margins */}
      <div className="content-wrapper mx-auto w-full max-w-[1060px] flex-1">
        {/* 1. Hero Section */}
        <Hero
          data={data}
          onProjectsClick={() => onScrollToSection('projects')}
        />

        {/* 2. Side-by-Side About & Skills Dashboard Row (No stats strip & no progress bars) */}
        <AboutAndSkillsSection data={data} />

        {/* 3. Featured Projects 3-Column Grid */}
        <ProjectsCarousel
          projects={data.projects}
          onSelectProject={onSelectProject}
          onViewAllProjects={onViewAllProjects}
        />

        {/* 4. Professional Experience */}
        <div className="border-t border-slate-200/70 pt-4">
          <ExperienceSection experiences={data.experiences} />
        </div>

        {/* 5. Certifications */}
        <div className="border-t border-slate-200/70 pt-4">
          <CertificatesCarousel
            certificates={data.certificates}
            onSelectCertificate={onSelectCertificate}
            onViewAllCertificates={onViewAllCertificates}
          />
        </div>

        {/* 6. Education Timeline */}
        <div className="border-t border-slate-200/70 pt-4">
          <EducationSection education={data.education} />
        </div>

        {/* 7. Achievements */}
        <div className="border-t border-slate-200/70 pt-4">
          <AchievementsSection achievements={data.notableAchievements} />
        </div>
      </div>

      {/* 8. Full-Width Dark Footer matching container padding precisely */}
      <div className="-mx-4 sm:-mx-8 lg:-mx-10 mt-12">
        <FooterContact contact={data.contact} name={data.name} />
      </div>
    </div>
  );
};
