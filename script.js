/* ==========================================================================
   1. COLOR PALETTE & CSS CUSTOM PROPERTIES (THEMES)
   ========================================================================== */
:root {
  /* Light Theme Variables */
  --bg-main: #F2F0EA;
  --surface-card: #FFFFFF;
  --text-main: #2D3748;
  --text-muted: #718096;
  --primary-accent: #A8856F;
  --primary-accent-hover: #8F6D57;
  --secondary-accent: #319795;
  --border-color: #E2E8F0;
  --card-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  --header-bg: rgba(242, 240, 234, 0.85);
  --blueprint-bg: #EAE6DF;
  --input-bg: #FFFFFF;
  --modal-overlay-bg: rgba(45, 55, 72, 0.6);
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

[data-theme="dark"] {
  /* Dark Theme Variables */
  --bg-main: #1A202C;
  --surface-card: #2D3748;
  --text-main: #F7FAFC;
  --text-muted: #A0AEC0;
  --primary-accent: #A0D4E0;
  --primary-accent-hover: #B8E2EC;
  --secondary-accent: #CBD5E0;
  --border-color: #4A5568;
  --card-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  --header-bg: rgba(26, 32, 44, 0.85);
  --blueprint-bg: #171923;
  --input-bg: #1A202C;
  --modal-overlay-bg: rgba(0, 0, 0, 0.8);
}

/* ==========================================================================
   2. BASE & RESET STYLES
   ========================================================================== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-main);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* ==========================================================================
   3. STICKY GLASSMORPHIC HEADER & NAVIGATION
   ========================================================================== */
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--header-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s, border-color 0.3s;
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-main);
}

.desktop-nav .nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  font-weight: 500;
  color: var(--text-muted);
  transition: color 0.2s;
  padding: 0.5rem 0;
  position: relative;
}

.nav-links a:hover {
  color: var(--primary-accent);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: var(--primary-accent);
  transition: width 0.2s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-icon, .btn-theme {
  background: var(--surface-card);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-main);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.btn-icon:hover, .btn-theme:hover {
  border-color: var(--primary-accent);
  transform: translateY(-2px);
}

/* ==========================================================================
   4. HERO BANNER
   ========================================================================== */
.main-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 4rem 3rem;
  margin-bottom: 3rem;
  box-shadow: var(--card-shadow);
  text-align: center;
}

.hero-pill {
  display: inline-block;
  padding: 0.35rem 1rem;
  background-color: rgba(168, 133, 111, 0.15);
  color: var(--primary-accent);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 2.75rem;
  line-height: 1.2;
  margin-bottom: 1.25rem;
  font-weight: 800;
}

.hero-subtitle {
  max-width: 800px;
  margin: 0 auto 2.5rem auto;
  color: var(--text-muted);
  font-size: 1.125rem;
}

.hero-cta-group {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 2.5rem;
}

.btn-primary {
  background-color: var(--primary-accent);
  color: #FFFFFF;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  transition: all 0.2s ease;
  display: inline-block;
}

.btn-primary:hover {
  background-color: var(--primary-accent-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-main);
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  display: inline-block;
}

.btn-secondary:hover {
  border-color: var(--primary-accent);
  color: var(--primary-accent);
  transform: translateY(-2px);
}

.hero-stats-pills {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.pill-stat {
  font-size: 0.875rem;
  color: var(--text-muted);
  background-color: var(--bg-main);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

/* ==========================================================================
   5. SECTION LAYOUTS & BLUEPRINT GALLERY
   ========================================================================== */
.section-container {
  margin-bottom: 4rem;
}

.section-header {
  margin-bottom: 2rem;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.section-desc {
  color: var(--text-muted);
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-btn {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn.active, .filter-btn:hover {
  background-color: var(--primary-accent);
  color: #FFFFFF;
  border-color: var(--primary-accent);
}

/* Gallery Grid System */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.gallery-card {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
}

.card-image-wrap {
  position: relative;
  height: 180px;
  background-color: var(--blueprint-bg);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  font-weight: 600;
}

.gallery-card:hover .gallery-overlay {
  opacity: 1;
}

.gallery-info {
  padding: 1.5rem;
}

.card-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-accent);
  font-weight: 700;
}

.gallery-info h3 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
}

.gallery-info p {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* ==========================================================================
   6. SEARCH & CONTENT CARDS
   ========================================================================== */
.search-box-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto 2.5rem auto;
}

.search-input {
  width: 100%;
  padding: 1rem 1.25rem 1rem 3rem;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-main);
  font-size: 1rem;
  box-shadow: var(--card-shadow);
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--primary-accent);
}

.search-icon-inside {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.spec-card {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.75rem;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-badge {
  align-self: flex-start;
  padding: 0.25rem 0.6rem;
  background-color: var(--bg-main);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

.spec-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.spec-card p {
  color: var(--text-muted);
  font-size: 0.925rem;
  margin-bottom: 1.5rem;
}

.btn-card-action {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--primary-accent);
  padding: 0.6rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s ease;
  width: 100%;
}

.btn-card-action:hover {
  background-color: var(--primary-accent);
  color: #FFFFFF;
}

/* ==========================================================================
   7. DASHBOARD METRICS & CONSULTATION PORTAL
   ========================================================================== */
.metrics-wrapper {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: var(--card-shadow);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

.metric-card {
  padding: 1.5rem;
  background-color: var(--bg-main);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.metric-value {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary-accent);
  line-height: 1;
}

.metric-unit {
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.consultation-card {
  background-color: var(--surface-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: var(--card-shadow);
  max-width: 900px;
  margin: 0 auto;
}

.consultation-header {
  text-align: center;
  margin-bottom: 2rem;
}

.consultation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
}

.form-input {
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-main);
  font-size: 0.95rem;
  outline: none;
}

.form-input:focus {
  border-color: var(--primary-accent);
}

.textarea-input {
  resize: vertical;
}

.error-msg {
  color: #E53E3E;
  font-size: 0.75rem;
  display: none;
}

.form-group.invalid .error-msg {
  display: block;
}

.form-group.invalid .form-input {
  border-color: #E53E3E;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
}

/* ==========================================================================
   8. MODALS & LIGHTBOX
   ========================================================================== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--modal-overlay-bg);
  backdrop-filter: blur(6px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-overlay.active {
  display: flex;
}

.modal-box {
  background-color: var(--surface-card);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 2.5rem;
  position: relative;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.lightbox-box {
  max-width: 800px;
  padding: 1.5rem;
}

.lightbox-content {
  width: 100%;
  min-height: 300px;
  background-color: var(--blueprint-bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-caption {
  margin-top: 1rem;
  text-align: center;
  font-weight: 600;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.75rem;
  color: var(--text-main);
}

.modal-divider {
  border: 0;
  height: 1px;
  background-color: var(--border-color);
  margin: 1rem 0;
}

.success-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
}

/* Back to top float button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: var(--primary-accent);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: var(--card-shadow);
  display: none;
  z-index: 999;
  transition: all 0.2s ease;
}

.back-to-top:hover {
  transform: translateY(-3px);
}

.back-to-top.visible {
  display: block;
}

/* ==========================================================================
   9. FOOTER
   ========================================================================== */
.footer {
  background-color: var(--surface-card);
  border-top: 1px solid var(--border-color);
  margin-top: 5rem;
  padding: 4rem 2rem 2rem 2rem;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.footer-brand h3 {
  margin-bottom: 0.75rem;
}

.footer-brand p {
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #38A169;
  border-radius: 50%;
}

.footer-links h4, .footer-contact h4 {
  margin-bottom: 1rem;
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: var(--text-muted);
}

.footer-links a:hover {
  color: var(--primary-accent);
}

.footer-contact p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.4rem;
}

.footer-bottom {
  max-width: 1280px;
  margin: 0 auto;
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Responsive Fallbacks for Tablets/Smaller viewports */
@media (max-width: 1024px) {
  .specs-grid, .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .specs-grid, .gallery-grid, .metrics-grid {
    grid-template-columns: 1fr;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .hero-title {
    font-size: 2rem;
  }
}
