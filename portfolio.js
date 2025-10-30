// Portfolio gallery: lazy reveal + lightbox navigation

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lbImg = document.querySelector('.lb-image');
const lbCaption = document.querySelector('.lb-caption');
const btnPrev = document.querySelector('.lb-prev');
const btnNext = document.querySelector('.lb-next');
const btnClose = document.querySelector('.lb-close');

let currentIndex = 0;
let items = [];

function openLightbox(index) {
  if (!items.length) return;
  currentIndex = index;
  const link = items[currentIndex];
  const img = link.querySelector('img');
  lbImg.src = link.getAttribute('href');
  lbImg.alt = img?.alt || 'Project image';
  lbCaption.textContent = img?.alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function next(){
  openLightbox((currentIndex + 1) % items.length);
}
function prev(){
  openLightbox((currentIndex - 1 + items.length) % items.length);
}

// Wire events
if (gallery && lightbox) {
  items = Array.from(gallery.querySelectorAll('.g-item'));
  items.forEach((a, idx) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });
  btnClose?.addEventListener('click', closeLightbox);
  btnNext?.addEventListener('click', next);
  btnPrev?.addEventListener('click', prev);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
}

// IntersectionObserver to fade-in images as they enter viewport
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.gallery .g-item').forEach(el => {
  el.style.opacity = .001;
  el.style.transform = 'translateY(8px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  io.observe(el);
});

const style = document.createElement('style');
style.textContent = `.gallery .g-item.in{opacity:1 !important; transform:none !important;}`;
document.head.appendChild(style);


