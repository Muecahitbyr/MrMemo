import { ScrollTrigger } from 'gsap/ScrollTrigger';

const NAV_HEIGHT = 52;

export function initNav(lenis) {
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');

  // --- Mobiles Menü ------------------------------------------------------
  const setMenu = (open) => {
    nav.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    menu.inert = !open;
    document.documentElement.classList.toggle('no-scroll', open);
    if (lenis) open ? lenis.stop() : lenis.start();
  };

  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-menu-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-menu-open')) setMenu(false);
  });

  // --- Anker-Links sanft scrollen ------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = id === '#top' ? document.body : document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      setMenu(false);

      if (lenis) {
        lenis.scrollTo(target, { offset: id === '#top' ? 0 : -NAV_HEIGHT });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      history.replaceState(null, '', id);
    });
  });

  // --- Glas-Effekt nach dem ersten Scrollen --------------------------------
  ScrollTrigger.create({
    start: 8,
    end: 'max',
    onToggle: (self) => nav.classList.toggle('is-scrolled', self.isActive),
  });

  // --- Nav-Farbe passt sich hellen Sektionen an (wie bei apple.com) ---------
  document.querySelectorAll('.section--light').forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: `top ${NAV_HEIGHT / 2}px`,
      end: `bottom ${NAV_HEIGHT / 2}px`,
      onToggle: (self) => nav.classList.toggle('nav--light', self.isActive),
    });
  });
}
