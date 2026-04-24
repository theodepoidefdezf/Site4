/* =========================================
   SITE 4 — BRAISE — script.js
   ========================================= */

// ── Header solid on scroll ────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('solid', window.scrollY > 50);
});

// ── Hamburger menu ────────────────────────
const hamBtn  = document.getElementById('hamBtn');
const mainNav = document.getElementById('mainNav');
if (hamBtn) {
  hamBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });
}

// ── Scroll reveal ─────────────────────────
const allReveal = document.querySelectorAll('.warm-in, .warm-fade');
const revObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Find siblings, stagger
      const container = entry.target.closest('.exp-list, .steps, .intro-container, .sec-header, .intro-actions, .intro-text, .contact-box, section') || document.body;
      const siblings = [...container.querySelectorAll('.warm-in:not(.visible), .warm-fade:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.max(0, idx) * 0.08}s`;
      entry.target.classList.add('visible');
      revObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

allReveal.forEach(el => revObserver.observe(el));

// ── Animate progress bars ─────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prog-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = getComputedStyle(bar).getPropertyValue('--w');
        }, i * 150 + 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const expList = document.querySelector('.exp-list');
if (expList) barObserver.observe(expList);

// ── Contact form ──────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-warm');
    btn.textContent = '✓ Message envoyé avec succès !';
    btn.style.background = '#5a9a6e';
    setTimeout(() => {
      btn.textContent = 'Envoyer le message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ── Intro animations on load ──────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.intro .warm-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 110);
  });
});

// ── Steps hover ───────────────────────────
document.querySelectorAll('.step-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const num = card.previousElementSibling?.previousElementSibling;
    if (num && num.classList.contains('step-num')) {
      num.style.transform = 'scale(1.15)';
    }
  });
  card.addEventListener('mouseleave', () => {
    const num = card.previousElementSibling?.previousElementSibling;
    if (num) num.style.transform = '';
  });
});
