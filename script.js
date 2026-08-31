/**
 * Blueprint Next-Gen CAD Engine
 * Fully modular implementation including Layer Toggles, Cost Estimator, Sun-Path, Markup Pins & AR.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initParallelScrollEngine();
  initCadLayerToggles();
  initMirrorAndLegend();
  initCustomizerAndEstimator();
  initMarkupWorkspace();
  initScrollAndShortcuts();
  initParallaxEngine();
  initConsultationForm();
});


/* ==========================================================================
   1. THEME ENGINE
   ========================================================================== */
function initThemeEngine() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme_preference') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme_preference', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
/* ==========================================================================
   PARALLEL SCROLL OBSERVER & DATA SYNC ENGINE
   ========================================================================== */
function initParallelScrollEngine() {
  const cards = document.querySelectorAll('.parallel-card');
  const titleElem = document.getElementById('parallelPlanTitle');
  const areaElem = document.getElementById('parallelArea');
  const bedsElem = document.getElementById('parallelBeds');
  const costElem = document.getElementById('parallelCost');

  if (!cards.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Highlight active right card
        cards.forEach(c => c.classList.remove('active-card'));
        entry.target.classList.add('active-card');

        // Dynamically update sticky left card content
        const planName = entry.target.getAttribute('data-plan');
        const area = entry.target.getAttribute('data-area');
        const beds = entry.target.getAttribute('data-beds');
        const cost = entry.target.getAttribute('data-cost');

        if (titleElem) titleElem.textContent = planName;
        if (areaElem) areaElem.textContent = area;
        if (bedsElem) bedsElem.textContent = beds;
        if (costElem) costElem.textContent = cost;
      }
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));
}
/* ==========================================================================
   2. INTERACTIVE CAD LAYER TOGGLES & REVERSE PLAN
   ========================================================================== */
function initCadLayerToggles() {
  const layerBtns = document.querySelectorAll('.layer-toggle');

  layerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const layerName = btn.getAttribute('data-layer');
      const layerTarget = document.querySelector(`.layer-${layerName}`);

      if (layerTarget) {
        layerTarget.classList.toggle('hidden', !btn.classList.contains('active'));
      }
    });
  });
}

function initMirrorAndLegend() {
  const mirrorBtn = document.getElementById('mirrorPlanBtn');
  const blueprintCanvas = document.getElementById('blueprintCanvas');
  const legendBtn = document.getElementById('legendToggleBtn');
  const legendBox = document.getElementById('legendBox');
  const arBtn = document.getElementById('arPreviewBtn');

  mirrorBtn?.addEventListener('click', () => {
    blueprintCanvas?.classList.toggle('mirrored');
  });

  legendBtn?.addEventListener('click', () => {
    legendBox?.classList.toggle('hidden');
  });

  arBtn?.addEventListener('click', () => {
    openModal('arModal');
  });
}

/* ==========================================================================
   3. PLAN CUSTOMIZER, REGIONAL ESTIMATOR & SUN-PATH
   ========================================================================== */
function calculateCustomCost() {
  let addonTotal = 0;
  const garage = document.getElementById('optGarage');
  const patio = document.getElementById('optPatio');
  const roof = document.getElementById('optRoof');
  const zipInput = document.getElementById('zipCodeInput');

  if (garage?.checked) addonTotal += parseFloat(garage.getAttribute('data-cost'));
  if (patio?.checked) addonTotal += parseFloat(patio.getAttribute('data-cost'));
  if (roof?.checked) addonTotal += parseFloat(roof.getAttribute('data-cost'));

  // Calculate Zip-Code Regional Multiplier
  let multiplier = 1.15;
  const zipVal = zipInput?.value.trim() || '';
  if (zipVal.startsWith('9')) multiplier = 1.25; // West Coast
  if (zipVal.startsWith('1')) multiplier = 1.20; // East Coast
  if (zipVal.startsWith('7')) multiplier = 1.05; // Southern Region

  const baseCost = 285000;
  const total = (baseCost + addonTotal) * multiplier;

  document.getElementById('addonCost').textContent = `$${addonTotal.toLocaleString()}`;
  document.getElementById('zipMultiplier').textContent = `${multiplier.toFixed(2)}x`;
  document.getElementById('totalEstimatedCost').textContent = `$${Math.round(total).toLocaleString()}`;
}

function checkLotCompatibility() {
  const width = parseFloat(document.getElementById('plotWidth').value);
  const depth = parseFloat(document.getElementById('plotDepth').value);
  const statusElem = document.getElementById('lotStatus');

  if (width >= 50 && depth >= 80) {
    statusElem.textContent = "✅ Excellent Fit! This plot exceeds the minimum setback requirements for Plan A.";
    statusElem.style.color = "#10B981";
  } else {
    statusElem.textContent = "⚠️ Plot Warning: Minimum required plot dimensions for Plan A are 50' x 80'. Minor custom downsizing required.";
    statusElem.style.color = "#DC2626";
  }
}

function updateSunPath(hour) {
  const status = document.getElementById('sunPathStatus');
  let text = "";
  if (hour < 9) text = `🌅 Early Morning (${hour}:00 AM) — Warm east-facing light on Master Suite.`;
  else if (hour <= 14) text = `☀️ Midday / Peak Sun (${hour}:00 PM) — High direct overhead sunlight on living space roof.`;
  else text = `🌇 Late Afternoon (${hour}:00 PM) — Low west-facing natural light entering kitchen patio.`;

  if (status) status.textContent = text;
}

/* ==========================================================================
   4. CLIENT MARKUP & COORDINATE PIN WORKSPACE
   ========================================================================== */
function initMarkupWorkspace() {
  const markupBoard = document.getElementById('markupBoard');
  const pinContainer = document.getElementById('commentPinsContainer');
  const pinList = document.getElementById('pinCommentList');
  let pinCount = 1;

  markupBoard?.addEventListener('click', (e) => {
    const rect = markupBoard.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    pinCount++;

    // Create Visual Pin
    const pin = document.createElement('div');
    pin.className = 'comment-pin';
    pin.style.left = `${xPercent}%`;
    pin.style.top = `${yPercent}%`;
    pin.textContent = pinCount;
    pinContainer?.appendChild(pin);

    // Append to Sidebar
    const commentText = prompt("Enter architectural comment for this coordinate pin:") || "General review area.";
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="pin-badge">Pin #${pinCount}</span> <i>Pos (${Math.round(xPercent)}%, ${Math.round(yPercent)}%):</i> ${commentText}`;
    pinList?.appendChild(listItem);
  });
}

/* ==========================================================================
   5. E-COMMERCE & BOM UTILITIES
   ========================================================================== */
function buyLicense(planName) {
  document.getElementById('successModalMsg').innerText = 
    `You selected the "${planName}". Instant digital .DWG CAD downloads and receipt sent to your email.`;
  openModal('successModal');
}

function downloadBOM() {
  document.getElementById('successModalMsg').innerText = 
    `Downloading complete Bill of Materials (BOM) Take-off sheet (.CSV / .PDF) with structural steel, concrete volume, and framing metrics.`;
  openModal('successModal');
}

/* ==========================================================================
   6. CONSULTATION FORM & UTILITIES
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultationForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    if (name.length < 2) return;

    document.getElementById('successModalMsg').innerText = 
      `Thank you, ${name}! Your architectural consultation and engineering stamp request has been logged.`;
    openModal('successModal');
    form.reset();
  });
}

function initParallaxEngine() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax-layer').forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
      layer.style.transform = `translate3d(0px, ${-(scrolled * speed)}px, 0px)`;
    });
  });
}

function initScrollAndShortcuts() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTopBtn?.classList.add('visible');
    else backToTopBtn?.classList.remove('visible');
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
