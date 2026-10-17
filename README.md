# Jhon Mcneil Magtibay Portfolio

A modern, responsive developer portfolio with a clean light theme, rewritten as a modern **React + TypeScript + Vite** application with Tailwind CSS.

The application is completely data-driven: content is loaded from `data.json` (with Google Drive Apps Script dynamic source and robust local fallback), allowing instant customization of portfolio details without modifying code.

## Views & Features
- **Home View**:
  - Hero section with role tagline, name, subtitle, tech chips, direct resume download, and contact button.
  - About section with detailed developer profile.
  - Experiences section with company, position, duration, and descriptions.
  - Featured Certificates carousel with responsive horizontal scrolling and modal view.
  - Skills section categorized into Languages, Frameworks, and Databases with authentic tech SVG logos.
  - Featured Projects carousel with responsive horizontal track, keyboard controls, and detail dialog.
  - Education history timeline with honors and credentials.
  - Notable Achievements and leadership roles.
  - Working Contact Form integrated with FormSubmit.co, including loading spinners, success confirmation, and error alerts.
- **All Projects View**:
  - Grid view of all projects with dynamic category/language filtering.
  - Detailed project modal with tech stack badges, repository link, and live site link.
- **Certifications View**:
  - Grid view of all certificates with issuer filters.
  - Certificate modal supporting Google Drive PDF previews, images, and credential links.
- **Navigation & Layout**:
  - Sleek desktop sidebar (w-20) with active section scrollspy.
  - Responsive mobile drawer navigation with animated hamburger toggle.
  - Floating Back-to-Top button.
  - Smooth initial loading indicator.

## Tech Stack
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS 3**
- **FormSubmit.co** (Contact form processing)

## Project Structure
```text
Portfolio/
├── public/
│   ├── data.json
│   └── images/
│       └── projects/
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   ├── NavIcons.tsx
│   │   │   └── TechIcons.tsx
│   │   ├── AboutSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── BackToTop.tsx
│   │   ├── CertificateCard.tsx
│   │   ├── CertificateModal.tsx
│   │   ├── CertificatesCarousel.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── PageLoader.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ProjectsCarousel.tsx
│   │   ├── Sidebar.tsx
│   │   └── SkillsSection.tsx
│   ├── data/
│   │   └── fallbackData.ts
│   ├── utils/
│   │   └── driveUrls.ts
│   ├── views/
│   │   ├── CertificatesView.tsx
│   │   ├── HomeView.tsx
│   │   └── ProjectsView.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── index.html
├── metadata.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Development
```bash
npm install
npm run dev
```
Starts the Vite dev server on `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Generates production build in `dist/`.

## License
Personal portfolio project. Reuse structure with attribution.