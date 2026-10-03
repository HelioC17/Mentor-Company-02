// ==========================================================
// MENTOR COMPANY — main.js (shared across every page)
// ==========================================================

// Mobile menu toggle
const mb = document.getElementById('mb');
const nv = document.getElementById('nv');
mb.addEventListener('click', () => {
  const open = nv.classList.toggle('open');
  mb.setAttribute('aria-expanded', open);
});
nv.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nv.classList.remove('open');
    mb.setAttribute('aria-expanded', false);
  }
});

// Header: transparent at the top (merges with the page), floating card once scrolled
const header = document.querySelector('header');
const setHeaderState = () => header.classList.toggle('scrolled', scrollY > 40);
setHeaderState();
addEventListener('scroll', setHeaderState, { passive: true });

// Progress line under the header, based on scroll position
addEventListener('scroll', () => {
  const sp = scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
  header.style.setProperty('--sp', sp);
}, { passive: true });

// Click feedback: ripple inside interactive elements + small burst at the cursor
document.addEventListener('pointerdown', (e) => {
  const t = e.target.closest('.btn,.sc,.cl li,.crs-card,.modal-close,#mb');
  if (t) {
    const r = t.getBoundingClientRect();
    const z = Math.max(r.width, r.height) * 2.2;
    const ripple = document.createElement('span');
    ripple.className = 'rp';
    ripple.style.cssText = `width:${z}px;height:${z}px;left:${e.clientX - r.left - z / 2}px;top:${e.clientY - r.top - z / 2}px`;
    t.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }
  const burst = document.createElement('i');
  burst.className = 'bu';
  burst.style.left = e.clientX + 'px';
  burst.style.top = e.clientY + 'px';
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 650);
});

// Spotlight effect that follows the cursor on service / course cards
document.querySelectorAll('.sc').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', e.clientX - r.left + 'px');
    card.style.setProperty('--my', e.clientY - r.top + 'px');
  });
});
