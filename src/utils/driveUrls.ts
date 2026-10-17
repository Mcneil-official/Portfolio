// Google Drive data source. Point this at your Apps Script /exec web app URL.
export const DATA_URL = 'https://script.google.com/macros/s/AKfycbxlYBuqN9LP2Bt0FOjNQ09lCalpT1Q2qZAfLs8NbrVNta9KPmZCjFeR25thQ2sd84zv7g/exec';

// Normalize Google Drive share/view links into embeddable/downloadable URLs.
export const toDriveUrl = (url?: string, mode = 'view'): string => {
  if (!url) return '';
  const m = /[?&]id=([\w-]+)/.exec(String(url)) || /\/d\/([\w-]+)/.exec(String(url));
  return m ? `https://drive.google.com/uc?export=${mode}&id=${m[1]}` : url;
};

// Build a Google Drive embeddable preview URL (renders PDFs/images inline in an iframe).
export const toDrivePreviewUrl = (url?: string): string => {
  if (!url) return '';
  const m = /[?&]id=([\w-]+)/.exec(String(url)) || /\/d\/([\w-]+)/.exec(String(url));
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : url;
};

export const ensureHttp = (url?: string): string => {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};
