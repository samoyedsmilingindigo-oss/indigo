/* ════════════════════════════════════════════
   LUMINA STUDIO — script.js
   ════════════════════════════════════════════ */

/* ── NAV scroll behaviour ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Hamburger (mobile) ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
const navCta    = document.querySelector('.nav-cta');
let menuOpen = false;

hamburger?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    navLinks.style.cssText = `
      display: flex; flex-direction: column; position: fixed;
      top: 72px; left: 0; right: 0; background: rgba(255,255,255,0.97);
      backdrop-filter: blur(20px); padding: 24px; gap: 20px;
      box-shadow: 0 20px 40px rgba(15,23,42,.1); z-index: 999; border-top: 1px solid #e2e8f0;
    `;
    hamburger.style.cssText = 'display:flex';
  } else {
    navLinks.style.cssText = '';
  }
});

// Close menu on nav link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    menuOpen = false;
    navLinks.style.cssText = '';
  });
});

/* ── Smooth active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activateNav = () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`);
      });
    }
  });
};
window.addEventListener('scroll', activateNav, { passive: true });

/* ── Intersection Observer: reveal animations ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale')
  .forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

/* ── Gallery filter ── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const match = filter === 'all' || item.dataset.cat === filter;
      if (match) {
        item.classList.remove('hidden');
        item.classList.add('fade-in');
        setTimeout(() => item.classList.remove('fade-in'), 400);
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/* ── Lightbox ── */
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbTag     = document.getElementById('lbTag');
const lbTitle   = document.getElementById('lbTitle');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');

let currentIndex = 0;
let visibleItems = [];

const openLightbox = (idx) => {
  visibleItems = [...galleryItems].filter(el => !el.classList.contains('hidden'));
  currentIndex = idx;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
};

const updateLightbox = () => {
  const item = visibleItems[currentIndex];
  if (!item) return;
  const img = item.querySelector('img');
  const overlay = item.querySelector('.gallery-overlay');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbTag.textContent = overlay.querySelector('.gallery-tag')?.textContent || '';
  lbTitle.textContent = overlay.querySelector('h4')?.textContent || '';
};

galleryItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    const vis = [...galleryItems].filter(el => !el.classList.contains('hidden'));
    openLightbox(vis.indexOf(item));
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lbPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  updateLightbox();
});
lbNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  updateLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visibleItems.length; updateLightbox(); }
});

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      contactForm.reset();
      formSuccess.classList.remove('hidden');
      btn.textContent = 'Sent!';
    } else {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error — try again';
    btn.disabled = false;
  }
});

/* ── Subtle parallax on hero orbs ── */
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const cx = clientX / window.innerWidth  - 0.5;
  const cy = clientY / window.innerHeight - 0.5;

  document.querySelector('.hero-orb-1')?.style.setProperty('transform', `translate(${cx * 20}px, ${cy * 20}px)`);
  document.querySelector('.hero-orb-2')?.style.setProperty('transform', `translate(${cx * -14}px, ${cy * -14}px)`);
  document.querySelector('.hero-orb-3')?.style.setProperty('transform', `translate(${cx * 10}px, ${cy * 10}px)`);
});
