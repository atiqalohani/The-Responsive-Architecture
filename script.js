/**
 * Digital Craftsmanship - Main Application Engine
 * Pure Vanilla JavaScript implementation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initGalleryFilters();
  initSpecsSearch();
  initMetricsCounter();
  initConsultationForm();
  initScrollAndShortcuts();
  initModalListeners();
});

/* ==========================================================================
   1. LIGHT / DARK THEME ENGINE (LOCAL STORAGE PERSISTENCE)
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');
  const themeLabel = themeToggleBtn.querySelector('.theme-label');

  // Read saved theme preference or system default
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
      themeIcon.textContent = '☀️';
      themeLabel.textContent = 'Light Mode';
    } else {
      themeIcon.textContent = '🌙';
      themeLabel.textContent = 'Dark Mode';
    }
  }
}

/* ==========================================================================
   2. GALLERY FILTER & LIGHTBOX MODAL
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

  // Lightbox Zoom Handler
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const svgContent = card.querySelector('.blueprint-svg').outerHTML;
      const title = card.querySelector('h3').textContent;
      
      const lightboxContent = document.getElementById('lightboxContent');
      const lightboxCaption = document.getElementById('lightboxCaption');
      
      lightboxContent.innerHTML = svgContent;
      lightboxCaption.textContent = title + " - Detailed Zoom Blueprint View";
      
      openModal('lightboxModal');
    });
  });
}

/* ==========================================================================
   3. REAL-TIME SEARCH FILTER FOR SPECIFICATIONS
   ========================================================================== */
function initSpecsSearch() {
  const searchInput = document.getElementById('searchInput');
  const specCards = document.querySelectorAll('.spec-card');

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    specCards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const tags = card.getAttribute('data-tags').toLowerCase();
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
   4. ANIMATED METRICS COUNTER
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
        const increment = target / 30; // Smooth step size

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
   5. CONSULTATION FORM CLIENT VALIDATION
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultationForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Field references
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('workEmail');
    const scopeInput = document.getElementById('platformScope');
    const budgetInput = document.getElementById('budgetRange');
    const detailsInput = document.getElementById('specDetails');

    // Name Validation
    if (nameInput.value.trim().length < 2) {
      setError(nameInput, 'nameError');
      isValid = false;
    } else {
      clearError(nameInput, 'nameError');
    }

    // Email Validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, 'emailError');
      isValid = false;
    } else {
      clearError(emailInput, 'emailError');
    }

    // Scope Validation
    if (scopeInput.value === '') {
      setError(scopeInput, 'scopeError');
      isValid = false;
    } else {
      clearError(scopeInput, 'scopeError');
    }

    // Budget Validation
    if (budgetInput.value === '') {
      setError(budgetInput, 'budgetError');
      isValid = false;
    } else {
      clearError(budgetInput, 'budgetError');
    }

    // Specifications Details Validation
    if (detailsInput.value.trim().length < 15) {
      setError(detailsInput, 'detailsError');
      isValid = false;
    } else {
      clearError(detailsInput, 'detailsError');
    }

    if (isValid) {
      // Trigger Success State Modal
      document.getElementById('successModalMsg').innerText = 
        `Thank you, ${nameInput.value}! Your consultation request for "${scopeInput.value}" with budget "${budgetInput.value}" has been logged successfully.`;
      openModal('successModal');
      form.reset();
    }
  });

  function setError(inputElem, errorId) {
    inputElem.parentElement.classList.add('invalid');
  }

  function clearError(inputElem, errorId) {
    inputElem.parentElement.classList.remove('invalid');
  }
}

/* ==========================================================================
   6. SCROLL & KEYBOARD SHORTCUT HANDLERS
   ========================================================================== */
function initScrollAndShortcuts() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  const searchInput = document.getElementById('searchInput');

  // Floating Back to Top Button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Search shortcut button in header
  document.getElementById('searchShortcutBtn').addEventListener('click', () => {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Keyboard Slash Hotkey handler
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ==========================================================================
   7. MODAL UTILITIES & LISTENERS
   ========================================================================== */
function initModalListeners() {
  document.getElementById('lightboxClose').addEventListener('click', () => closeModal('lightboxModal'));
  document.getElementById('specModalClose').addEventListener('click', () => closeModal('specModal'));
  document.getElementById('successModalClose').addEventListener('click', () => closeModal('successModal'));

  // Close when clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

// Global modal trigger helper for card spec detail buttons
function openSpecModal(title, body) {
  document.getElementById('specModalTitle').innerText = title;
  document.getElementById('specModalBody').innerText = body;
  openModal('specModal');
}
