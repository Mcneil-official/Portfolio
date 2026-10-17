import React, { useState } from 'react';
import { ContactInfo } from '../types';
import { ensureHttp } from '../utils/driveUrls';

interface FooterContactProps {
  contact: ContactInfo;
  name: string;
}

export const FooterContact: React.FC<FooterContactProps> = ({ contact, name }) => {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contact.email || 'jhonmcneilmagtibay5002@gmail.com'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: `Portfolio Message from ${formData.name}`,
          _captcha: 'false',
        }),
      });

      const result = await response.json();
      if (result.success === 'true' || result.success === true) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (err: unknown) {
      console.error('Error sending message:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Oops! Something went wrong. Please try again or contact directly via email.'
      );
    }
  };

  return (
    <footer id="contact" className="w-full bg-slate-900 text-white mt-16 pt-16 pb-12 transition-colors">
      <div className="mx-auto w-full max-w-[1140px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: "Let's Work Together" & Social Icons matching reference */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Let's Work Together
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Interested in collaborating or have a project in mind? Feel free to reach out via email or any of my socials below.
            </p>

            {/* Direct Contact Metadata */}
            <div className="space-y-3 mb-8 text-sm">
              <p className="m-0 text-slate-300">
                <span className="font-bold text-white">Email:</span>{' '}
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-indigo-300 transition-colors"
                >
                  {contact.email}
                </a>
              </p>
              <p className="m-0 text-slate-300">
                <span className="font-bold text-white">Location:</span> Batangas, Philippines
              </p>
            </div>

            {/* Circular Light Social Action Buttons matching photo */}
            <div className="flex flex-wrap items-center gap-3">
              {contact.facebook && (
                <a
                  href={ensureHttp(contact.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:bg-indigo-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}

              {contact.instagram && (
                <a
                  href={ensureHttp(contact.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:bg-indigo-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              )}

              {contact.linkedin && (
                <a
                  href={ensureHttp(contact.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:bg-indigo-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:bg-indigo-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              )}

              {contact.github && (
                <a
                  href={ensureHttp(contact.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition-transform hover:scale-110 hover:bg-indigo-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Clean White Form Inputs matching reference */}
          <div className="lg:col-span-7 w-full">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="footer-contact-name" className="sr-only">Your Name</label>
                <input
                  type="text"
                  id="footer-contact-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full rounded-xl bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="footer-contact-email" className="sr-only">Your Email</label>
                <input
                  type="email"
                  id="footer-contact-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full rounded-xl bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-300 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="footer-contact-message" className="sr-only">Your Message</label>
                <textarea
                  id="footer-contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full rounded-xl bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-300 shadow-sm resize-y"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-xl bg-[#fcf9f2] sm:bg-[#fbf7ee] hover:bg-white text-slate-950 font-bold py-4 px-6 text-center shadow-sm transition-all hover:shadow-md cursor-pointer disabled:opacity-75"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent"></span>
                      Sending...
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </div>

              {status === 'success' && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40 p-4 text-emerald-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm font-medium">Your message has been sent successfully. Thank you!</span>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-950/70 border border-rose-500/40 p-4 text-rose-200">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span className="text-sm font-medium">{errorMessage || 'Something went wrong. Please try again.'}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Centered Copyright matching reference photo */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs sm:text-sm text-slate-400">
          © {currentYear} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
