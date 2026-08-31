/**
 * Blueprint Application Engine
 * Pure Vanilla JavaScript implementation with Parallax Scroll Support.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initGalleryFilters();
  initSpecsSearch();
  initMetricsCounter();
  initConsultationForm();
  initScrollAndShortcuts();
  initModalListeners();
  initParallaxEngine();
});

/* ==========================================================================
   1. LIGHT / DARK THEME ENGINE
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('.theme-icon');
  const themeLabel = themeToggleBtn.querySelector('.theme-label');

  const savedTheme = localStorage.getItem('theme_preference') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme_preference', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeLabel) themeLabel.textContent = 'Light Mode';
    } else {
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeLabel) themeLabel.textContent = 'Dark Mode';
    }
  }
}

/* ==========================================================================
   2. PARALLAX SCROLLING CONTROLLER
   ========================================================================== */
function initParallaxEngine() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (!parallaxLayers.length) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`;
    });
  });
}

/* ==========================================================================
   3. GALLERY FILTER & LIGHTBOX MODAL
   ========================================================================== */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      galleryCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox View Handler
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h3').textContent;

      if (!img) return;

      const lightboxContent = document.getElementById('lightboxContent');
      const lightboxCaption = document.getElementById('lightboxCaption');

      lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="max-width:100%; max-height: 80vh;">`;
      lightboxCaption.textContent = title + " — Architectural Blueprint View";

      openModal('lightboxModal');
    });
  });
}

/* ==========================================================================
   4. REAL-TIME SEARCH FILTER FOR SPECIFICATIONS
   ========================================================================== */
function initSpecsSearch() {
  const searchInput = document.getElementById('searchInput');
  const specCards = document.querySelectorAll('.spec-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    specCards.forEach(card => {
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const textContent = card.innerText.toLowerCase();

      if (title.includes(query) || tags.includes(query) || textContent.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   5. ANIMATED METRICS COUNTER
   ========================================================================== */
function initMetricsCounter() {
  const metricValues = document.querySelectorAll('.metric-value');
  let animated = false;

  window.addEventListener('scroll', () => {
    const metricsSection = document.getElementById('metrics');
    if (!metricsSection) return;

    const sectionPos = metricsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      metricValues.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 30;

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 40);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
    }
  });
}

/* ==========================================================================
   6. CONSULTATION FORM CLIENT VALIDATION
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('workEmail');
    const scopeInput = document.getElementById('platformScope');
    const budgetInput = document.getElementById('budgetRange');
    const detailsInput = document.getElementById('specDetails');

    // Name Validation
    if (nameInput.value.trim().length < 2) {
      setError(nameInput);
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setError(emailInput);
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Scope Validation
    if (scopeInput.value === '') {
      setError(scopeInput);
      isValid = false;
    } else {
      clearError(scopeInput);
    }

    // Budget Validation
    if (budgetInput.value === '') {
      setError(budgetInput);
      isValid = false;
    } else {
      clearError(budgetInput);
    }

    // Details Validation
    if (detailsInput.value.trim().length < 15) {
      setError(detailsInput);
      isValid = false;
    } else {
      clearError(detailsInput);
    }

    if (isValid) {
      document.getElementById('successModalMsg').innerText = 
        `Thank you, ${nameInput.value}! Your request for "${scopeInput.value}" with budget "${budgetInput.value}" has been logged successfully.`;
      openModal('successModal');
      form.reset();
    }
  });

  function setError(inputElem) {
    inputElem.parentElement.classList.add('invalid');
  }

  function clearError(inputElem) {
    inputElem.parentElement.classList.remove('invalid');
  }
}

/* ==========================================================================
   7. SCROLL & KEYBOARD SHORTCUT HANDLERS
   ========================================================================== */
function initScrollAndShortcuts() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  const searchInput = document.getElementById('searchInput');
  const searchShortcutBtn = document.getElementById('searchShortcutBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  searchShortcutBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

/* ==========================================================================
   8. MODAL UTILITIES
   ========================================================================== */
function initModalListeners() {
  document.getElementById('lightboxClose')?.addEventListener('click', () => closeModal('lightboxModal'));
  document.getElementById('specModalClose')?.addEventListener('click', () => closeModal('specModal'));
  document.getElementById('successModalClose')?.addEventListener('click', () => closeModal('successModal'));

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function openSpecModal(title, body) {
  const specTitle = document.getElementById('specModalTitle');
  const specBody = document.getElementById('specModalBody');
  if (specTitle) specTitle.innerText = title;
  if (specBody) specBody.innerText = body;
  openModal('specModal');
}
