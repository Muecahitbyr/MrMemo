import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

/* -------------------------------------------------------------------------- */
/*  Helfer                                                                     */
/* -------------------------------------------------------------------------- */

/** Zerlegt einen Text in einzelne <span>-Wörter für Wort-Animationen. */
function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.setAttribute('aria-label', el.textContent.trim());
  el.innerHTML = words.map((w) => `<span class="word" aria-hidden="true">${w}</span>`).join(' ');
  return el.querySelectorAll('.word');
}

/* -------------------------------------------------------------------------- */
/*  Hero: Intro + Parallax beim Scrollen                                       */
/* -------------------------------------------------------------------------- */
function hero() {
  const section = document.querySelector('[data-hero]');
  const media = section.querySelector('[data-hero-media]');
  const emblem = section.querySelector('[data-hero-emblem]');
  const img = section.querySelector('[data-hero-img]');
  const content = section.querySelector('[data-hero-content]');
  const lines = section.querySelectorAll('[data-hero-line]');

  // Intro-Zoom auf dem Container, Scroll-Parallax auf dem Bild – so kollidieren die Werte nicht
  gsap
    .timeline({ defaults: { ease: EASE } })
    .from(media, { scale: 1.25, duration: 2.2, ease: 'power2.out' })
    .from(emblem, { scale: 0.6, rotate: -30, opacity: 0, duration: 1.6 }, 0.15)
    .from(lines, { y: 40, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.55);

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
  });
  tl.to(img, { yPercent: 18, scale: 1.08, ease: 'none' }, 0)
    .to(content, { yPercent: -35, opacity: 0, ease: 'none' }, 0)
    .to('.hero__shade', { opacity: 1, ease: 'none' }, 0);
}

/* -------------------------------------------------------------------------- */
/*  Statement: Wörter leuchten beim Scrollen nacheinander auf                 */
/* -------------------------------------------------------------------------- */
function highlightText() {
  document.querySelectorAll('[data-highlight-text]').forEach((el) => {
    const words = splitWords(el);
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 40%', scrub: true },
      }
    );
  });
}

/* -------------------------------------------------------------------------- */
/*  Zoom-Reveal: Bild wächst beim Scrollen auf volle Größe                    */
/* -------------------------------------------------------------------------- */
function zoomReveal() {
  const section = document.querySelector('[data-zoom]');
  if (!section) return;

  const frame = section.querySelector('[data-zoom-frame]');
  const img = section.querySelector('[data-zoom-img]');
  const overlay = section.querySelector('[data-zoom-overlay]');

  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
  });

  tl.fromTo(
    frame,
    { clipPath: 'inset(20% 24% 20% 24% round 32px)' },
    { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', duration: 1 }
  )
    .fromTo(img, { scale: 1.35 }, { scale: 1, ease: 'none', duration: 1 }, 0)
    .fromTo(overlay, { opacity: 0, y: 60 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.45 }, 0.7);
}

/* -------------------------------------------------------------------------- */
/*  Allgemeine Einblend-Animation                                              */
/* -------------------------------------------------------------------------- */
function reveals() {
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* -------------------------------------------------------------------------- */
/*  Leistungen: Bento-Karten + Bild-Parallax                                   */
/* -------------------------------------------------------------------------- */
function services() {
  const cards = gsap.utils.toArray('[data-bento] .card');

  gsap.set(cards, { y: 80, opacity: 0, scale: 0.96 });
  ScrollTrigger.batch(cards, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: EASE, stagger: 0.12 }),
  });

  gsap.utils.toArray('[data-parallax-img]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.card'), start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* -------------------------------------------------------------------------- */
/*  Erlebnis: Sticky-Bild wechselt mit jedem Schritt                           */
/* -------------------------------------------------------------------------- */
function story() {
  const section = document.querySelector('[data-story]');
  if (!section) return;

  const steps = section.querySelectorAll('[data-story-step]');
  const images = section.querySelectorAll('[data-story-img]');
  const dots = section.querySelectorAll('[data-story-dot]');

  const activate = (index) => {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === index));
    images.forEach((img, i) => img.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  };

  steps.forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: (self) => self.isActive && activate(i),
    });
  });

  activate(0);
}

/* -------------------------------------------------------------------------- */
/*  Zahlen hochzählen                                                          */
/* -------------------------------------------------------------------------- */
function counters() {
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = Number(el.dataset.decimals || 0);
    const format = (v) => v.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const obj = { value: 0 };

    el.textContent = format(0);
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = format(obj.value)),
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  gsap.from('[data-stats] .stat', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: EASE,
    stagger: 0.1,
    scrollTrigger: { trigger: '[data-stats]', start: 'top 85%', once: true },
  });
}

/* -------------------------------------------------------------------------- */
/*  Galerie: vertikales Scrollen → horizontale Bewegung (nur Desktop)          */
/* -------------------------------------------------------------------------- */
function gallery(mm) {
  mm.add('(min-width: 900px)', () => {
    const pin = document.querySelector('[data-gallery-pin]');
    const track = document.querySelector('[data-gallery-track]');
    const distance = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
  });
}

/* -------------------------------------------------------------------------- */
/*  Finale                                                       */
/* -------------------------------------------------------------------------- */
function finale() {
  // Emblem dreht sich beim Heranscrollen in Position – wie eine Schere, die sich schließt
  gsap.fromTo(
    '[data-finale-emblem]',
    { rotate: -140, scale: 0.5, opacity: 0 },
    {
      rotate: 0,
      scale: 1,
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: '[data-finale-emblem]', start: 'top 100%', end: 'center 55%', scrub: true },
    }
  );

  gsap.fromTo(
    '[data-finale]',
    { scale: 0.7, opacity: 0.2, letterSpacing: '0.04em' },
    {
      scale: 1,
      opacity: 1,
      letterSpacing: '-0.05em',
      ease: 'none',
      scrollTrigger: { trigger: '[data-finale]', start: 'top 95%', end: 'center 55%', scrub: true },
    }
  );
}

/* -------------------------------------------------------------------------- */

export function initAnimations({ reducedMotion }) {
  if (reducedMotion) {
    // Nur die Logik ohne Bewegung: Story-Schritte wechseln trotzdem das Bild.
    story();
    return;
  }

  const mm = gsap.matchMedia();

  hero();
  highlightText();
  zoomReveal();
  reveals();
  services();
  story();
  counters();
  gallery(mm);
  finale();

  // Nach dem Laden aller Bilder Positionen neu berechnen
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
