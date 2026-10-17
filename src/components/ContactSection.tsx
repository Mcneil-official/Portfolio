import React, { useState } from 'react';

interface ContactSectionProps {
  email: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ email }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _captcha: 'false',
        }),
      });

      const result = await response.json();
      if (result.success === 'true' || result.success === true) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
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
    <section id="contact" className="reveal py-6 lg:py-12">
      <h2 className="m-0 font-display text-2xl font-bold text-slate-900 lg:text-4xl">Contact</h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-indigo-700"></div>
      <p className="mt-6 mb-4 text-slate-500">
        Have a question or want to work together? Send me a message!
      </p>

      <form
        onSubmit={handleSubmit}
        className="contact-form rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="form-label mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="form-label mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-subject" className="form-label mb-2 block text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-message" className="form-label mb-2 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-700 px-8 py-3 font-medium text-white transition hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-75 cursor-pointer shadow-md shadow-indigo-100"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" role="status" aria-hidden="true"></span>
                  Sending...
                </span>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </div>
        </div>
      </form>

      {status === 'success' && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-indigo-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m22 4-10 10.01-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium">Your message has been sent successfully. Thank you!</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium">{errorMessage || 'Something went wrong. Please try again later.'}</span>
        </div>
      )}
    </section>
  );
};
