export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface ExperienceItem {
  position?: string;
  role?: string;
  company?: string;
  organization?: string;
  duration?: string;
  year?: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  featured?: boolean;
  description: string;
  languages: string[];
  repository?: string;
  deployment?: string;
  live?: string;
  image?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
  image?: string;
  credentialUrl?: string;
  previewUrl?: string;
}

export interface NotableAchievementItem {
  title: string;
  organization: string;
  type: string;
  description: string;
  year: string;
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
  instagram?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  subtitle: string;
  location: string;
  about: string;
  education: EducationItem[];
  chips: string[];
  skills: string[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  notableAchievements: NotableAchievementItem[];
  contact: ContactInfo;
}

export type ActivePage = 'home' | 'projects' | 'certificates';
