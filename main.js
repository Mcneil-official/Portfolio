// Smooth scrolling for sidebar anchor links
function setupNavBehavior(){
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Close sidebar on mobile after click
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });
  
  // Mobile toggle functionality
  const mobileToggle = document.querySelector('.mobile-toggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !sidebar.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sidebar) {
      sidebar.classList.remove('open');
    }
  });
}

// Contact Form Handler
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const successAlert = document.getElementById('contact-success');
  const errorAlert = document.getElementById('contact-error');
  const btnText = form.querySelector('.btn-text');
  const btnLoading = form.querySelector('.btn-loading');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Show loading state
    btnText.classList.add('d-none');
    btnLoading.classList.remove('d-none');
    successAlert.classList.add('d-none');
    errorAlert.classList.add('d-none');
    
    // Get form data
    const formData = new FormData(form);
    
    try {
      // Using FormSubmit.co service - it will send an email to your address
      const response = await fetch(`https://formsubmit.co/${window.portfolioEmail}`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        successAlert.classList.remove('d-none');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      errorAlert.classList.remove('d-none');
    }
    
    // Reset button state
    btnText.classList.remove('d-none');
    btnLoading.classList.add('d-none');
  });
}

// Render helpers
function el(tag, cls, text){ const e = document.createElement(tag); if(cls) e.className = cls; if(text!==undefined) e.textContent = text; return e; }
function ensureHttp(url){
  if(!url) return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const LOADER_MIN_MS = 250;
const loaderStartTs = Date.now();

function hidePageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader || loader.classList.contains('is-hidden')) return;

  const elapsed = Date.now() - loaderStartTs;
  const wait = Math.max(0, LOADER_MIN_MS - elapsed);

  window.setTimeout(() => {
    loader.classList.add('is-hidden');
  }, wait);
}

// Get language icon (accurate logos)
function getLangIcon(lang) {
  const icons = {
    'JavaScript': '<svg width="14" height="14" viewBox="0 0 32 32"><rect width="32" height="32" fill="#f7df1e"/><path d="M16.4 22.4c.7 1.1 1.6 1.9 3.1 1.9 1.3 0 2.1-.7 2.1-1.6 0-1.1-.8-1.5-2.2-2.1l-.8-.3c-2.3-1-3.8-2.2-3.8-4.7 0-2.4 1.8-4.2 4.7-4.2 2 0 3.5.7 4.5 2.5l-2.5 1.6c-.5-.9-1.1-1.3-2-1.3-.9 0-1.5.6-1.5 1.3 0 .9.6 1.3 1.9 1.8l.8.3c2.7 1.2 4.2 2.3 4.2 5 0 2.8-2.2 4.4-5.2 4.4-2.9 0-4.8-1.4-5.7-3.2l2.4-1.4zm-7.7.2c.5.9 1 1.6 2.1 1.6 1.1 0 1.7-.4 1.7-2.1V12h3v10.2c0 3.4-2 5-4.9 5-2.6 0-4.1-1.4-4.9-3l2.5-1.6z" fill="#000"/></svg>',
    'TypeScript': '<svg width="14" height="14" viewBox="0 0 32 32"><rect width="32" height="32" rx="1.5" fill="#3178c6"/><path d="M18.245 21.261V23H11v-1.635h2.612v-6.552h-2.58v-1.647h7.214v1.647h-2.58v6.552h2.58zm5.228-8.413h-3.33v8.413h-1.958V12.848h-3.331V11h8.62v1.848z" fill="#fff"/></svg>',
    'Python': '<svg width="14" height="14" viewBox="0 0 32 32"><defs><linearGradient id="a" x1="811.527" x2="665.255" y1="574.895" y2="573.732" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#366a96"/><stop offset="1" stop-color="#3679b0"/></linearGradient><linearGradient id="b" x1="862.824" x2="573.276" y1="642.176" y2="642.176" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffc836"/><stop offset="1" stop-color="#ffe873"/></linearGradient></defs><path d="M15.885 2.1c-7.1 0-6.651 3.07-6.651 3.07v3.19h6.752v1H6.545S2 8.8 2 16.005s4.013 6.912 4.013 6.912H8.33v-3.361s-.13-4.013 3.9-4.013h6.762s3.772.06 3.772-3.652V5.8s.572-3.712-6.842-3.712zm-3.732 2.144a1.214 1.214 0 1 1-1.183 1.244v-.02a1.214 1.214 0 0 1 1.214-1.214z" fill="url(#a)" transform="matrix(.84 0 0 .84 .023 .002)"/><path d="M16.085 29.91c7.1 0 6.651-3.08 6.651-3.08v-3.18h-6.751v-1h9.47S30 23.2 30 15.995s-4.013-6.912-4.013-6.912H23.67v3.361s.13 4.013-3.9 4.013h-6.765s-3.772-.06-3.772 3.652v6.171s-.572 3.712 6.842 3.712zm3.732-2.144a1.214 1.214 0 1 1 1.183-1.244v.03a1.214 1.214 0 0 1-1.214 1.214z" fill="url(#b)" transform="matrix(.84 0 0 .84 .023 .002)"/></svg>',
    'Java': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M11.622 24.74s-1.23.748.855.962c2.51.32 3.847.267 6.625-.267a10.02 10.02 0 0 0 1.763.855c-6.25 2.672-14.16-.16-9.244-1.55zm-.8-3.473s-1.336 1.015.748 1.23c2.725.267 4.862.32 8.55-.427a3.26 3.26 0 0 0 1.282.801c-7.534 2.244-15.976.214-10.58-1.604z" fill="#5382a1"/><path d="M18.29 17.287c1.55 1.763-.427 3.366-.427 3.366s3.847-2.03 2.137-4.542c-1.604-2.35-2.778-3.473 3.794-7.427 0 0-10.366 2.617-5.504 8.603z" fill="#e76f00"/><path d="M25.94 26.18s.908.748-1.015 1.336c-3.58 1.07-15.014 1.39-18.22 0-1.122-.48 1.015-1.175 1.7-1.282.695-.16 1.07-.16 1.07-.16-1.23-.855-8.175 1.763-3.526 2.51 12.77 2.084 23.296-.908 19.983-2.404zM12.2 18.068s-5.77 1.39-2.03 1.87c1.55.214 4.7.16 7.534-.053 2.296-.214 4.6-.64 4.6-.64a8.56 8.56 0 0 0-1.39.748c-5.877 1.55-17.22.855-13.937-.748 2.778-1.336 5.076-1.175 5.076-1.175zm10.42 5.824c5.984-3.1 3.206-6.09 1.282-5.717-.48.107-.695.214-.695.214s.16-.32.534-.427c3.794-1.336 6.786 4.007-1.23 6.09 0 0 .053-.053.107-.16z" fill="#5382a1"/><path d="M18.93 1.55S21.82 4.43 16.09 8.97c-4.6 3.58-1.07 5.61-.053 7.96-2.617-2.403-4.542-4.542-3.26-6.518 1.87-2.996 7.053-4.435 6.16-9.9z" fill="#e76f00"/><path d="M12.84 30.81c5.717.374 14.5-.214 14.714-2.937 0 0-.427 1.07-4.7 1.87-4.862.908-10.848.8-14.4.214 0 0 .748.64 4.382.855z" fill="#5382a1"/></svg>',
    'HTML': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M6 28L4 3h24l-2 25-10 3-10-3z" fill="#e44f26"/><path d="M26 5H16v24.5l8-2.5 2-22z" fill="#f1662a"/><path d="M9.5 17.5L8.5 8H24l-.5 3h-12l.5 3.5h11L22 24l-6 2-6-2-.5-5h3l.5 2.5 3 1 3-1 .5-4h-10z" fill="#ebebeb"/><path d="M16.5 23.5l3-1 .5-4H16v-3.5h7.5L23 24l-6.5 2v-2.5zM16 11.5h8l.5-3H16v3z" fill="#fff"/></svg>',
    'CSS': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M6 28L4 3h24l-2 25-10 3-10-3z" fill="#1572b6"/><path d="M26 5H16v24.5l8-2.5 2-22z" fill="#33a9dc"/><path d="M19.5 17.5h-7L12 14h8l.5-3H8.5l1 10H20l-.5 4-3.5 1-3.5-1-.25-2.5H9.5L10 27l6.5 2L23 27l1-10z" fill="#fff"/></svg>',
    'Node.js': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M16 2c-.3 0-.6.1-.8.2L3.7 8.9c-.5.3-.8.8-.8 1.4v11.5c0 .6.3 1.1.8 1.4l11.5 6.7c.2.1.5.2.8.2s.6-.1.8-.2l11.5-6.7c.5-.3.8-.8.8-1.4V10.3c0-.6-.3-1.1-.8-1.4L16.8 2.2c-.2-.1-.5-.2-.8-.2z" fill="#83cd29"/><path d="M16 2v28c.3 0 .6-.1.8-.2l11.5-6.7c.5-.3.8-.8.8-1.4V10.3c0-.6-.3-1.1-.8-1.4L16.8 2.2c-.2-.1-.5-.2-.8-.2z" fill="#5fa020"/></svg>',
    'Angular': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M16 2L3 7l2 17.5L16 30l11-5.5L29 7z" fill="#dd0031"/><path d="M16 2v28l11-5.5L29 7z" fill="#c3002f"/><path d="M16 5.5L8.5 23h3l1.5-3.5h6L20.5 23h3L16 5.5zm0 5.9l2.5 5.1h-5l2.5-5.1z" fill="#fff"/></svg>',
    'React': '<svg width="14" height="14" viewBox="0 0 32 32"><circle cx="16" cy="16" r="2.6" fill="#61dafb"/><ellipse cx="16" cy="16" rx="11" ry="4.2" stroke="#61dafb" stroke-width="1" fill="none"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)" stroke="#61dafb" stroke-width="1" fill="none"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)" stroke="#61dafb" stroke-width="1" fill="none"/></svg>',
    'Express': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M32 24.795c-1.164.296-1.884.013-2.53-.957l-4.594-6.356-.664-.88-5.365 7.257c-.613.873-1.256 1.253-2.4.944l6.87-9.222-6.396-8.33c1.1-.214 1.86-.105 2.535.88l4.765 6.435 4.8-6.4c.615-.873 1.276-1.205 2.38-.883l-2.48 3.288-3.36 4.375c-.4.5-.345.842.023 1.325L32 24.795zM.008 15.427l.562-2.764C2.1 7.193 8.37 4.92 12.694 8.3c2.527 1.988 3.155 4.8 3.03 7.95H1.48c-.214 5.67 3.867 9.092 9.07 7.346 1.825-.613 2.9-2.042 3.438-3.83.273-.896.725-1.036 1.567-.78-.43 2.236-1.4 4.104-3.45 5.273-3.063 1.75-7.435 1.184-9.735-1.248C1 21.6.434 19.812.18 17.9c-.04-.316-.12-.617-.18-.92q.008-.776.008-1.552zm1.498-.38h12.872c-.084-4.1-2.637-7.012-6.126-7.037-3.83-.03-6.58 2.813-6.746 7.037z"/></svg>',
    'MySQL': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M8.785 10.39c-.055 0-.095.006-.134.013v.053c.026.007.066.02.1.033l.1.067.027-.026v-.034a.27.27 0 0 0-.094-.073c-.013-.013-.04-.02-.1-.033zm-.74.1c-.027 0-.04.013-.04.04v.84c.026.066.053.166.1.206.033.02.08.027.134.027v-.067c-.04-.013-.08-.02-.1-.033-.033-.013-.06-.073-.087-.127v-.68c0-.033-.007-.066-.033-.1a.136.136 0 0 0-.1-.046zm15.9 1.6a4.07 4.07 0 0 0-1.073.1 1.9 1.9 0 0 0-.5.2 1.07 1.07 0 0 0-.366.4.92.92 0 0 0-.127.487c0 .3.127.52.366.653a2.14 2.14 0 0 0 .927.206l.5.033c.166.013.326.04.473.087a.55.55 0 0 1 .313.206.58.58 0 0 1 .1.34.52.52 0 0 1-.14.387 1.07 1.07 0 0 1-.366.206 2.41 2.41 0 0 1-.473.1c-.18.02-.353.02-.52.013a4.79 4.79 0 0 1-.473-.06 1.9 1.9 0 0 1-.366-.1 1.5 1.5 0 0 1-.3-.147 1.21 1.21 0 0 1-.193-.18.136.136 0 0 0-.1-.06h-.06a.136.136 0 0 0-.1.06v.487c0 .026 0 .06.013.08a.4.4 0 0 0 .1.127 1.21 1.21 0 0 0 .366.18c.153.06.313.1.473.127a3.85 3.85 0 0 0 .98.013c.18-.007.353-.033.52-.073a1.9 1.9 0 0 0 .473-.166 1.18 1.18 0 0 0 .4-.3.85.85 0 0 0 .166-.54.84.84 0 0 0-.14-.48.92.92 0 0 0-.366-.286 1.67 1.67 0 0 0-.5-.14c-.186-.02-.38-.04-.58-.053-.18-.013-.353-.033-.52-.06a1.2 1.2 0 0 1-.4-.12.43.43 0 0 1-.226-.38.42.42 0 0 1 .1-.286.73.73 0 0 1 .253-.18 1.14 1.14 0 0 1 .353-.087 2.8 2.8 0 0 1 .4-.013 4.38 4.38 0 0 1 .42.04c.133.013.26.04.38.073.12.04.226.073.32.12a.84.84 0 0 1 .206.14.136.136 0 0 0 .1.06h.04a.136.136 0 0 0 .1-.06v-.46c0-.033-.007-.066-.027-.1a.31.31 0 0 0-.113-.1 1.46 1.46 0 0 0-.38-.16 2.71 2.71 0 0 0-.473-.1 4.98 4.98 0 0 0-.52-.04zm-4.393.06c-.166 0-.326.033-.473.087a1.11 1.11 0 0 0-.366.226.73.73 0 0 0-.226.366c-.04.14-.067.286-.067.44v2.267c0 .026.013.046.04.06h.58a.068.068 0 0 0 .067-.06v-2.253c0-.107.007-.213.033-.313a.47.47 0 0 1 .12-.246.58.58 0 0 1 .206-.147.84.84 0 0 1 .3-.053c.113 0 .213.02.3.053a.58.58 0 0 1 .206.147.47.47 0 0 1 .12.246c.027.1.033.206.033.313v2.267a.068.068 0 0 0 .067.06h.58a.068.068 0 0 0 .067-.06v-2.253c0-.153-.02-.3-.067-.44a.73.73 0 0 0-.226-.366 1.11 1.11 0 0 0-.366-.226 1.3 1.3 0 0 0-.473-.087zm-7.353.04c-.107 0-.193.02-.246.073a.34.34 0 0 0-.1.246v.18a.136.136 0 0 0 .06.1h.033c.06-.04.14-.08.226-.1a1.46 1.46 0 0 1 .28-.04c.053 0 .113.007.18.013a.97.97 0 0 1 .18.053.45.45 0 0 1 .127.1.21.21 0 0 1 .06.166.23.23 0 0 1-.073.166.58.58 0 0 1-.193.12 2.01 2.01 0 0 1-.266.087c-.1.026-.206.06-.306.1-.1.033-.2.073-.3.12a.95.95 0 0 0-.26.166.73.73 0 0 0-.18.253.86.86 0 0 0-.073.366.77.77 0 0 0 .073.353.67.67 0 0 0 .2.246.87.87 0 0 0 .286.147c.113.033.226.046.346.046s.246-.013.366-.046a1.02 1.02 0 0 0 .326-.147v.073a.136.136 0 0 0 .06.1h.5a.068.068 0 0 0 .067-.06V13.4a.86.86 0 0 0-.073-.366.67.67 0 0 0-.206-.273 1.02 1.02 0 0 0-.326-.18 1.51 1.51 0 0 0-.44-.06h-.027zm8.9.013a.068.068 0 0 0-.067.06v3.3c0 .026.013.046.04.06h.58a.068.068 0 0 0 .067-.06v-3.32a.068.068 0 0 0-.067-.06h-.553zm4.06 0a.068.068 0 0 0-.067.06v3.3c0 .026.013.046.04.06h.58a.068.068 0 0 0 .067-.06v-3.32a.068.068 0 0 0-.067-.06h-.553zm-8.207.5c-.013.007-.027.013-.04.02a.2.2 0 0 1-.053.013h-.007l.027.027c.026.04.066.066.113.087a.84.84 0 0 0 .18.053c.073.013.147.02.22.027.08.007.153.007.22-.007v-.24c-.066.02-.14.033-.213.04-.08.007-.153.007-.22-.007a.58.58 0 0 1-.18-.046.136.136 0 0 1-.067-.067l.02.1zM9.712 14c-.027 0-.047.02-.047.046v.4c0 .027.02.047.047.047h1.1c.027 0 .047-.02.047-.047v-.4c0-.027-.02-.046-.047-.046h-1.1zm-2.38.1c.033.007.066.013.1.013a.7.7 0 0 0 .193-.033.42.42 0 0 0 .147-.073.34.34 0 0 0 .1-.1.21.21 0 0 0 .027-.1.23.23 0 0 0-.027-.107.27.27 0 0 0-.1-.1.64.64 0 0 0-.166-.08 1.57 1.57 0 0 0-.246-.06v.627l-.027.013z" fill="#00758f"/></svg>',
    'Bootstrap': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M6 3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z" fill="#563d7c"/><path d="M16.5 17.5h-3.5v-5h3.786a2.5 2.5 0 0 1 2.5 2.5v.286a2.214 2.214 0 0 1-2.786 2.214zm0 5.5h-3.5v-4h3.786a2 2 0 0 1 2 2v.286a1.714 1.714 0 0 1-2.286 1.714zM11 10v12h5.5a4.5 4.5 0 0 0 4.5-4.5v-.286A3.714 3.714 0 0 0 17.786 14 3.214 3.214 0 0 0 19 10.786V10.5A3.5 3.5 0 0 0 15.5 7H11v3z" fill="#fff"/></svg>',
    'JSON Server': '<svg width="14" height="14" viewBox="0 0 32 32"><rect width="32" height="32" rx="2" fill="#000"/><text x="16" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff" font-family="monospace">{ }</text></svg>',
    'OAuth2': '<svg width="14" height="14" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#eb5424"/><path d="M16 8a8 8 0 0 0-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 12a6 6 0 0 1-5-2.68A4.96 4.96 0 0 1 16 18a4.96 4.96 0 0 1 5 2.32A6 6 0 0 1 16 23z" fill="#fff"/></svg>',
    'Nodejs': '<svg width="14" height="14" viewBox="0 0 32 32"><path d="M16 2c-.3 0-.6.1-.8.2L3.7 8.9c-.5.3-.8.8-.8 1.4v11.5c0 .6.3 1.1.8 1.4l11.5 6.7c.2.1.5.2.8.2s.6-.1.8-.2l11.5-6.7c.5-.3.8-.8.8-1.4V10.3c0-.6-.3-1.1-.8-1.4L16.8 2.2c-.2-.1-.5-.2-.8-.2z" fill="#83cd29"/><path d="M16 2v28c.3 0 .6-.1.8-.2l11.5-6.7c.5-.3.8-.8.8-1.4V10.3c0-.6-.3-1.1-.8-1.4L16.8 2.2c-.2-.1-.5-.2-.8-.2z" fill="#5fa020"/></svg>',
    'Responsive UI': '<svg width="14" height="14" viewBox="0 0 32 32"><rect x="2" y="4" width="18" height="14" rx="1" stroke="#4ecdc4" stroke-width="2" fill="none"/><rect x="12" y="20" width="14" height="10" rx="1" stroke="#4ecdc4" stroke-width="2" fill="none"/><circle cx="19" cy="28" r="1" fill="#4ecdc4"/></svg>'
  };
  
  if (typeof lang === 'string' && lang.toLowerCase() === 'mysql') {
    return '<svg width="14" height="14" viewBox="0 0 32 32"><ellipse cx="16" cy="7" rx="10" ry="4" fill="#00758f"/><path d="M6 7v14c0 2.2 4.5 4 10 4s10-1.8 10-4V7" fill="#008aa3"/><ellipse cx="16" cy="21" rx="10" ry="4" fill="#005f73"/><ellipse cx="16" cy="14" rx="10" ry="4" fill="#00758f"/></svg>';
  }

  return icons[lang] || icons[lang.replace('.', '')] || null;
}

async function loadData(){
  try{
    const res = await fetch('data.json');
    if(!res.ok) throw new Error('Failed to load data.json');
    const data = await res.json();
    const c = data.contact || {};

    // Header
    document.getElementById('name').textContent = data.name || '';
    document.getElementById('title').textContent = data.title || '';

    const heroImage = document.getElementById('hero-fullbody');
    if (heroImage) {
      const nextSrc = data['full-body-pic'] || data.fullBodyPic || data.avatar || '';
      if (nextSrc) heroImage.src = nextSrc;
    }

    //Education
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = '';
    (data.education||[]).forEach(edu => {
      const div = el('div','education-item mb-3 p-3');
      const degree = el('h3','h6 mb-1 fw-semibold', edu.degree || '');
      const institution = el('p','mb-1 text-muted', edu.institution || '');
      const year = el('p','mb-1 text-muted', edu.year || '');
      
      div.appendChild(degree); 
      div.appendChild(institution); 
      div.appendChild(year);
      
      // Add details if they exist
      if (edu.details) {
        const details = el('p','mb-0 education-details', edu.details);
        div.appendChild(details);
      }
      
      educationList.appendChild(div);
    });

    // Chips
    const chips = document.getElementById('chips');
    chips.innerHTML = '';
    (data.chips||[]).forEach(c => { const s = el('span','chip',c); chips.appendChild(s); });

    // About
    const aboutText = data.about || '';
    document.getElementById('about-text').innerHTML = aboutText.replace(/\n/g, '<br>');

    // Experience
    const experienceList = document.getElementById('experience-list');
    if (experienceList) {
      experienceList.innerHTML = '';
      (data.experiences || data.experience || []).forEach(exp => {
        const div = el('div', 'education-item mb-3 p-3');
        const position = el('h3', 'h6 mb-1 fw-semibold', exp.position || exp.role || '');
        const company = el('p', 'mb-1 text-muted', exp.company || exp.organization || '');
        const duration = el('p', 'mb-1 education-details', exp.duration || exp.year || '');
        const description = el('p', 'mb-0 text-muted', exp.description || '');

        div.appendChild(position);
        div.appendChild(company);
        div.appendChild(duration);
        div.appendChild(description);
        experienceList.appendChild(div);
      });
    }

    // Skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    const skills = data.skills || [];
    const normalizeSkill = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const inSet = (value, setValues) => setValues.includes(normalizeSkill(value));

    const createSkillTag = (skillName) => {
      const tag = document.createElement('span');
      tag.className = 'skills-card-tag';
      tag.setAttribute('title', skillName);
      tag.setAttribute('aria-label', skillName);

      const icon = getLangIcon(skillName);
      if (icon) {
        const iconWrap = document.createElement('span');
        iconWrap.className = 'skills-card-icon';
        iconWrap.innerHTML = icon;
        tag.appendChild(iconWrap);
      }

      const label = document.createElement('span');
      label.className = 'skills-card-label';
      label.textContent = skillName;
      tag.appendChild(label);

      return tag;
    };

    if (skills.length > 0) {
      const grid = document.createElement('div');
      grid.className = 'skills-grid';

      const categories = [
        {
          title: 'Frontend',
          subtitle: 'UI and User experience',
          matches: ['html', 'css', 'javascript', 'typescript', 'angular', 'react', 'responsiveui', 'bootstrap']
        },
        {
          title: 'Backend',
          subtitle: 'Server-side and data logic',
          matches: ['nodejs', 'node', 'express', 'java', 'python', 'mysql', 'oauth2', 'jsonserver']
        },
        {
          title: 'Tools',
          subtitle: 'Workflow and productivity',
          matches: ['git', 'github', 'postman', 'docker', 'vscode']
        }
      ];

      const used = new Set();
      const groups = [];

      categories.forEach((category) => {
        const selected = skills.filter((skill) => inSet(skill, category.matches));
        if (selected.length > 0) {
          selected.forEach((skill) => used.add(skill));
          groups.push({ title: category.title, subtitle: category.subtitle, items: selected });
        }
      });

      const uncategorized = skills.filter((skill) => !used.has(skill));
      if (uncategorized.length > 0) {
        groups.push({ title: 'Other', subtitle: 'Additional stack', items: uncategorized });
      }

      groups.forEach((group) => {
        const card = document.createElement('article');
        card.className = 'skills-card';

        const heading = document.createElement('h3');
        heading.className = 'skills-card-title';
        heading.textContent = group.title;

        const subtitle = document.createElement('p');
        subtitle.className = 'skills-card-subtitle';
        subtitle.textContent = group.subtitle;

        const tags = document.createElement('div');
        tags.className = 'skills-card-tags';
        group.items.forEach((skill) => tags.appendChild(createSkillTag(skill)));

        card.appendChild(heading);
        card.appendChild(subtitle);
        card.appendChild(tags);
        grid.appendChild(card);
      });

      skillsList.appendChild(grid);
    }

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '';
    const projectModalElement = document.getElementById('projectModal');
    const projectModal = projectModalElement && window.bootstrap ? new window.bootstrap.Modal(projectModalElement) : null;
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModalImage = document.getElementById('projectModalImage');
    const projectModalDescription = document.getElementById('projectModalDescription');
    const projectModalLanguages = document.getElementById('projectModalLanguages');
    const projectModalRepo = document.getElementById('projectModalRepo');
    const projectModalLive = document.getElementById('projectModalLive');

    const openProjectModal = (project) => {
      if (!projectModal || !project) return;

      if (projectModalTitle) projectModalTitle.textContent = project.title || 'Project';
      if (projectModalDescription) projectModalDescription.textContent = project.description || '';

      if (projectModalImage) {
        if (project.image) {
          projectModalImage.src = project.image;
          projectModalImage.alt = `${project.title || 'Project'} preview`;
          projectModalImage.classList.remove('d-none');
        } else {
          projectModalImage.classList.add('d-none');
          projectModalImage.removeAttribute('src');
        }
      }

      if (projectModalLanguages) {
        projectModalLanguages.innerHTML = '';
        (project.languages || []).forEach((lang) => {
          const langChip = document.createElement('span');
          langChip.className = 'project-lang-chip';
          const icon = getLangIcon(lang);
          if (icon) {
            langChip.innerHTML = icon + ' ' + lang;
          } else {
            langChip.textContent = lang;
          }
          projectModalLanguages.appendChild(langChip);
        });
      }

      const repoUrl = project.repository || '';
      const liveSiteUrl = project.deployment || project.live || '';

      if (projectModalRepo) {
        if (repoUrl) {
          projectModalRepo.href = ensureHttp(repoUrl);
          projectModalRepo.classList.remove('d-none');
        } else {
          projectModalRepo.classList.add('d-none');
          projectModalRepo.removeAttribute('href');
        }
      }

      if (projectModalLive) {
        if (liveSiteUrl) {
          projectModalLive.href = ensureHttp(liveSiteUrl);
          projectModalLive.classList.remove('d-none');
        } else {
          projectModalLive.classList.add('d-none');
          projectModalLive.removeAttribute('href');
        }
      }

      projectModal.show();
    };

    (data.projects||[]).forEach(proj => {
      const col = el('div','col-12 col-md-6 col-lg-4');

      // Minimal project card (details shown in modal)
      const card = document.createElement('div');
      card.className = 'card project-card h-100';
      card.style.cursor = 'pointer';

      // Accessibility: allow keyboard activation like a button
      card.setAttribute('role','button');
      card.setAttribute('tabindex','0');

      // Add project image if available
      if (proj.image) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'project-image-container';
        const img = document.createElement('img');
        img.src = proj.image;
        img.alt = proj.title || 'Project image';
        img.className = 'project-image';
        imgContainer.appendChild(img);
        card.appendChild(imgContainer);
      }

      const body = document.createElement('div'); 
      body.className = 'card-body';
      const h = el('h3','h6 mb-2 fw-semibold', proj.title||'');
      const p = el('p','card-text text-muted', proj.description||'');
      
      body.appendChild(h); 
      body.appendChild(p); 

      // Click/keyboard handlers to open modal when card is activated
      card.addEventListener('click', () => {
        openProjectModal(proj);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(proj);
        }
      });

      card.appendChild(body); 
      col.appendChild(card); 
      projectsGrid.appendChild(col);
    });

    // Notable Achievements
    const notableAchievementsList = document.getElementById('notable-achievements-list');
    notableAchievementsList.innerHTML = '';
    (data.notableAchievements || data['notable achievements'] || []).forEach(achievement => {
      const div = el('div','notable-achievement-item mb-3 p-3');
      const title = el('h3','h6 mb-1 fw-semibold', achievement.title || '');
      const metaParts = [achievement.type, achievement.organization, achievement.year].filter(Boolean);
      const meta = el('p','mb-1 achievement-meta', metaParts.join(' • '));
      const description = el('p','mb-0 text-muted', achievement.description || '');
      div.appendChild(title);
      if (metaParts.length) div.appendChild(meta);
      div.appendChild(description);
      notableAchievementsList.appendChild(div);
    });

    // Sidebar Contact Icons
    if(c.linkedin) {
      const linkedinLink = document.getElementById('contact-linkedin');
      linkedinLink.href = ensureHttp(c.linkedin);
    }
    if(c.github) {
      const githubLink = document.getElementById('contact-github');
      githubLink.href = ensureHttp(c.github);
    }
    if(c.instagram) {
      const instagramLink = document.getElementById('contact-instagram');
      instagramLink.href = ensureHttp(c.instagram);
    }
    if(c.facebook) {
      const facebookLink = document.getElementById('contact-facebook');
      facebookLink.href = ensureHttp(c.facebook);
    }
    
    // Store email for contact form
    window.portfolioEmail = c.email;

    // Footer
    document.getElementById('footer-year').textContent = new Date().getFullYear();
    document.getElementById('footer-name').textContent = data.name || '';

  }catch(err){
    console.error(err);
  } finally {
    hidePageLoader();
  }
}

window.addEventListener('pageshow', (event) => {
  if (event.persisted) hidePageLoader();
});

document.addEventListener('DOMContentLoaded', () => { setupNavBehavior(); setupContactForm(); loadData(); });
