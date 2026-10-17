import React from 'react';
import { ContactInfo } from '../types';
import { SocialIcons } from './icons/NavIcons';
import { ensureHttp } from '../utils/driveUrls';

interface FooterProps {
  contact: ContactInfo;
  name: string;
}

export const Footer: React.FC<FooterProps> = ({ contact, name }) => {
  const currentYear = new Date().getFullYear();

  const links = [
    { key: 'linkedin', href: contact.linkedin, title: 'LinkedIn', icon: SocialIcons.linkedin },
    { key: 'github', href: contact.github, title: 'GitHub', icon: SocialIcons.github },
    { key: 'instagram', href: contact.instagram, title: 'Instagram', icon: SocialIcons.instagram },
    { key: 'facebook', href: contact.facebook, title: 'Facebook', icon: SocialIcons.facebook },
  ].filter((item) => Boolean(item.href));

  return (
    <footer id="footer" className="py-6 text-center text-slate-500">
      <div className="mb-4 flex items-center justify-center gap-3">
        {links.map((link) => (
          <a
            key={link.key}
            href={ensureHttp(link.href)}
            target="_blank"
            rel="noopener noreferrer"
            title={link.title}
            aria-label={link.title}
            className="contact-icon flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:scale-110 hover:bg-indigo-50 hover:text-indigo-700 shadow-sm"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p className="m-0 text-sm">
        © <span id="footer-year">{currentYear}</span>{' '}
        <span id="footer-name">{name}</span>
      </p>
    </footer>
  );
};
