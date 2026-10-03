// ==========================================================
// MENTOR COMPANY — courses.js (formacao.html only)
// ==========================================================

const cards = document.querySelectorAll('.crs-card');
const modal = document.getElementById('crsModal');
const modalBody = document.getElementById('crsModalBody');
const closeBtn = document.getElementById('crsClose');
let lastFocused = null;
let galleryTimer = null;

function startGallery() {
  clearInterval(galleryTimer);
  const frames = modalBody.querySelectorAll('.mg-frame');
  if (frames.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let gi = 0;
  galleryTimer = setInterval(() => {
    frames[gi].classList.remove('on');
    gi = (gi + 1) % frames.length;
    frames[gi].classList.add('on');
  }, 4000);
}

function openCourse(slug) {
  const tpl = document.getElementById('tpl-' + slug);
  if (!tpl) return;
  modalBody.innerHTML = '';
  modalBody.appendChild(tpl.content.cloneNode(true));
  startGallery();
  lastFocused = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
  history.replaceState(null, '', '#' + slug);
}

function closeCourse() {
  clearInterval(galleryTimer);
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

cards.forEach((c) => c.addEventListener('click', () => openCourse(c.dataset.slug)));
closeBtn.addEventListener('click', closeCourse);
modal.addEventListener('click', (e) => { if (e.target === modal) closeCourse(); });
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeCourse();
});

// Open directly when arriving with a course in the URL (e.g. formacao.html#excel)
const initial = location.hash.replace('#', '');
if (initial && document.getElementById('tpl-' + initial)) openCourse(initial);
