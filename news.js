/* ════════════════════════════════════════════
   LUMINA STUDIO — news.js
   ════════════════════════════════════════════ */

/* ── NAV is always scrolled on this page ── */
document.getElementById('navbar').classList.add('scrolled');

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
let menuOpen = false;

hamburger?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navLinks.style.cssText = menuOpen ? `
    display: flex; flex-direction: column; position: fixed;
    top: 72px; left: 0; right: 0; background: rgba(255,255,255,0.97);
    backdrop-filter: blur(20px); padding: 24px; gap: 20px;
    box-shadow: 0 20px 40px rgba(15,23,42,.1); z-index: 999; border-top: 1px solid #e2e8f0;
  ` : '';
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => { menuOpen = false; navLinks.style.cssText = ''; });
});

/* ── Reveal animations ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale')
  .forEach(el => revealObserver.observe(el));

/* ── Filter ── */
const filterBtns  = document.querySelectorAll('.news-filters .filter-btn');
const newsCards   = document.querySelectorAll('.news-card');
const emptyState  = document.getElementById('newsEmpty');
const searchInput = document.getElementById('newsSearch');

const applyFilters = () => {
  const activeFilter = document.querySelector('.news-filters .filter-btn.active')?.dataset.filter || 'all';
  const query = searchInput.value.toLowerCase().trim();
  let visible = 0;

  newsCards.forEach(card => {
    const catMatch = activeFilter === 'all' || card.dataset.cat === activeFilter;
    const textContent = card.querySelector('h3')?.textContent.toLowerCase() + ' ' + (card.querySelector('p')?.textContent.toLowerCase() || '');
    const queryMatch = !query || textContent.includes(query);
    const show = catMatch && queryMatch;

    if (show) {
      card.classList.remove('hidden');
      card.classList.add('fade-in');
      setTimeout(() => card.classList.remove('fade-in'), 400);
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  emptyState?.classList.toggle('hidden', visible > 0);
};

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});

let searchTimer;
searchInput?.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(applyFilters, 220);
});

/* ── Load more (demo — just re-shows hidden cards) ── */
document.getElementById('loadMoreBtn')?.addEventListener('click', function () {
  this.textContent = 'No more articles for now!';
  this.disabled = true;
  this.style.opacity = '0.5';
});

/* ── Newsletter form ── */
const nlForm    = document.getElementById('nlForm');
const nlSuccess = document.getElementById('nlSuccess');

nlForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = nlForm.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Subscribing…';

  try {
    const res = await fetch(nlForm.action, {
      method: 'POST',
      body: new FormData(nlForm),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      nlForm.style.display = 'none';
      nlSuccess.classList.remove('hidden');
    } else {
      btn.textContent = 'Try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Try again';
    btn.disabled = false;
  }
});
