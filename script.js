// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

// Close menu on link click (mobile)
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));

// Smooth scrolling for same-page anchors
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.hash && target.getAttribute('href')?.startsWith('#')) {
    const el = document.querySelector(target.hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
const topSentinel = document.createElement('div');
topSentinel.setAttribute('aria-hidden', 'true');
header?.insertAdjacentElement('afterend', topSentinel);
if (header) {
  const io = new IntersectionObserver(([entry]) => {
    header.classList.toggle('elevated', !entry.isIntersecting);
  });
  io.observe(topSentinel);
}



// HERO SLIDER (background image switching)
// No-op: slider code removed in favor of background video

// Contact modal open/close
(function initContactModal(){
  const openBtns = document.querySelectorAll('[data-open-quote]');
  const modal = document.getElementById('contact');
  const closeBtn = document.querySelector('.modal-close');
  if (!modal || !openBtns.length) return;

  function open(e){
    e?.preventDefault();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input, select, textarea, button');
    firstInput?.focus();
  }
  function close(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  openBtns.forEach(btn => btn.addEventListener('click', open));
  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
})();


