/* Shared JS for Surya Surapaneni site */
(function() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Active nav highlighting
  function setActiveNav() {
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header .nav a[data-nav]')
      .forEach(a => {
        const target = a.getAttribute('href');
        if (!target) return;
        const targetName = target.split('/').pop();
        if (targetName === path) {
          a.setAttribute('aria-current', 'page');
          a.classList.add('active');
        }
      });
  }

  // 2) Skip link focus utility
  function enableSkipLinkFocus() {
    const skip = document.querySelector('.skip-link');
    const main = document.getElementById('main-content');
    if (!skip || !main) return;
    skip.addEventListener('click', function(e) {
      // Allow default anchor behavior to set location.hash then focus
      setTimeout(() => {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: prefersReducedMotion });
      }, 0);
    });
  }

  // 3) Contact form validation
  function setupContactFormValidation() {
    const form = document.querySelector('form#contact-form');
    if (!form) return;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    const errors = {
      name: form.querySelector('#error-name'),
      email: form.querySelector('#error-email'),
      message: form.querySelector('#error-message')
    };

    function setError(input, errorEl, message) {
      if (!errorEl) return;
      if (message) {
        errorEl.textContent = message;
        errorEl.hidden = false;
        input.setAttribute('aria-invalid', 'true');
      } else {
        errorEl.textContent = '';
        errorEl.hidden = true;
        input.removeAttribute('aria-invalid');
      }
    }

    function validateName() {
      const value = nameInput.value.trim();
      if (value.length === 0) {
        setError(nameInput, errors.name, 'Please enter your name.');
        return false;
      }
      setError(nameInput, errors.name, '');
      return true;
    }

    function validateEmail() {
      const value = emailInput.value.trim();
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!pattern.test(value)) {
        setError(emailInput, errors.email, 'Please enter a valid email address.');
        return false;
      }
      setError(emailInput, errors.email, '');
      return true;
    }

    function validateMessage() {
      const value = messageInput.value.trim();
      if (value.length < 20) {
        setError(messageInput, errors.message, 'Message should be at least 20 characters.');
        return false;
      }
      setError(messageInput, errors.message, '');
      return true;
    }

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    form.addEventListener('submit', function(e) {
      const okName = validateName();
      const okEmail = validateEmail();
      const okMsg = validateMessage();
      if (!(okName && okEmail && okMsg)) {
        e.preventDefault();
        const firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return false;
      }
      e.preventDefault();
      const firstName = nameInput.value.trim().split(' ')[0];
      window.location.href = 'thankyou.html?name=' + encodeURIComponent(firstName);
    });
  }

  // 4) Headshot auto-detect (local dev convenience)
  function setupHeadshotAutoDetect() {
    const img = document.getElementById('headshot');
    if (!img) return;
    const candidates = [
      'AIDD5/Images/headshotsurya.jpg',
      'AIDD5/Images/headshotsurya.jpeg',
      'AIDD5/Images/headshotsurya.png'
    ];

    function tryNext(index) {
      if (index >= candidates.length) return; // keep default placeholder
      const testImg = new Image();
      testImg.onload = function() { img.src = candidates[index]; };
      testImg.onerror = function() { tryNext(index + 1); };
      testImg.src = candidates[index];
    }

    // Start trying to replace placeholder
    tryNext(0);
  }

  // 4b) Placeholder generators (SVG data URIs)
  const placeholders = {
    headshot: function() {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'>
        <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#2a3444'/><stop offset='1' stop-color='#1b2433'/>
        </linearGradient></defs>
        <rect width='320' height='320' fill='url(#g)'/>
        <circle cx='160' cy='120' r='56' fill='#8ea3bf'/>
        <rect x='90' y='190' width='140' height='80' rx='40' fill='#6b7f9d'/>
        <text x='160' y='305' font-family='system-ui,Segoe UI,Arial' font-size='14' fill='#cfd8e3' text-anchor='middle'>Surya Surapaneni</text>
      </svg>`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    },
    project: function(title) {
      const t = (title || 'Project').slice(0, 24);
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'>
        <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='#243247'/><stop offset='1' stop-color='#1a2230'/>
        </linearGradient></defs>
        <rect width='640' height='360' fill='url(#g)'/>
        <rect x='40' y='40' width='560' height='160' rx='12' fill='#2f4059' stroke='#3b5272'/>
        <rect x='40' y='220' width='220' height='100' rx='12' fill='#2f4059' stroke='#3b5272'/>
        <rect x='280' y='220' width='320' height='100' rx='12' fill='#2f4059' stroke='#3b5272'/>
        <text x='320' y='130' font-family='system-ui,Segoe UI,Arial' font-size='22' fill='#cfe3ff' text-anchor='middle'>${t}</text>
      </svg>`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    },
    favicon: function() {
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'>
        <rect width='32' height='32' rx='6' fill='#2f86ff'/>
        <circle cx='16' cy='16' r='7' fill='#9af0c8'/>
      </svg>`;
      return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
  };

  function setupImageFallbacks() {
    // Headshot fallback if local or placeholder missing
    const headshot = document.getElementById('headshot');
    if (headshot) {
      headshot.addEventListener('error', function() {
        if (!headshot.dataset.fallbackApplied) {
          headshot.src = placeholders.headshot();
          headshot.dataset.fallbackApplied = 'true';
        }
      }, { once: true });
    }
    // Project thumbnails fallback
    document.querySelectorAll('img.thumb').forEach(function(img) {
      img.addEventListener('error', function() {
        if (!img.dataset.fallbackApplied) {
          const title = img.closest('article')?.querySelector('h2,h3')?.textContent?.trim();
          img.src = placeholders.project(title);
          img.dataset.fallbackApplied = 'true';
        }
      }, { once: true });
    });
  }

  function ensureFavicon() {
    let link = document.querySelector('link[rel~="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    // Try loading existing; if it errors in the browser, many won’t fire. Set a default anyway.
    if (!link.href) {
      link.type = 'image/svg+xml';
      link.href = placeholders.favicon();
    }
  }

  // 5) Thank-you name rendering
  function renderThankYouName() {
    const el = document.getElementById('thanks-name');
    if (!el) return;
    const params = new URLSearchParams(window.location.search);
    const name = (params.get('name') || '').trim();
    if (name) {
      el.textContent = name;
    }
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    setActiveNav();
    enableSkipLinkFocus();
    setupContactFormValidation();
    setupHeadshotAutoDetect();
    setupImageFallbacks();
    ensureFavicon();
    renderThankYouName();
  });
})();


