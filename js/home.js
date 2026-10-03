// ==========================================================
// MENTOR COMPANY — home.js (index.html only)
// ==========================================================

// Pre-select service in contact form from a service card CTA
document.querySelectorAll('[data-s]').forEach((a) => {
  a.addEventListener('click', () => {
    document.getElementById('sv').value = a.dataset.s;
  });
});

// Reveal the "Como trabalhamos" timeline when it scrolls into view
const tl = document.getElementById('tl');
if (tl) {
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      obs.disconnect();
    }
  }, { threshold: 0.4 }).observe(tl);
}

// Projects: reveal the remaining project cards on demand
const moreBtn = document.getElementById('moreBtn');
const moreBox = document.getElementById('moreProjects');
moreBtn.addEventListener('click', () => {
  const open = moreBox.classList.toggle('open');
  moreBtn.setAttribute('aria-expanded', open);
  moreBtn.textContent = open ? 'Ver menos' : 'Ver mais projetos';
});

// Hero: gently crossfade between portrait images every 5s
const heroImgs = document.querySelectorAll('#heroFig img');
if (heroImgs.length > 1 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let hi = 0;
  setInterval(() => {
    heroImgs[hi].classList.remove('on');
    hi = (hi + 1) % heroImgs.length;
    heroImgs[hi].classList.add('on');
  }, 5000);
}

// Contact form: opens the visitor's email client with the message pre-filled
document.getElementById('fm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  // Honeypot: real visitors never fill this hidden field — bots often do
  if (f.website.value !== '') return;
  const body = `Nome: ${f.n.value}\nEmail: ${f.e.value}\nTelefone: ${f.t.value}\nEmpresa: ${f.c.value}\nServiço: ${f.s.value}\n\n${f.m.value}`;
  location.href = `mailto:mentor.tech@mentorcompanhia.com?subject=${encodeURIComponent('Contacto via website: ' + f.n.value)}&body=${encodeURIComponent(body)}`;
  document.getElementById('ok').textContent = 'A abrir a sua aplicação de email para enviar a mensagem.';
});

// If arriving from a course page ("Pedir mais informações"), pre-fill the message
const cursoParam = new URLSearchParams(location.search).get('curso');
if (cursoParam) {
  const msg = document.querySelector('#fm textarea[name="m"]');
  if (msg) msg.value = `Tenho interesse no curso de ${cursoParam}.`;
}
