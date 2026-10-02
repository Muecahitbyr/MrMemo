/** Laufgeschwindigkeit des Rezensions-Bands in Pixel pro Sekunde. */
const SPEED = 40;

/**
 * Endlos-Band: Die Rezensionen laufen ohne Anfang und Ende von links nach rechts.
 * Reichen sie nicht für die Bildschirmbreite, werden sie dupliziert.
 * Danach wird die ganze Gruppe ein zweites Mal angehängt – die Animation verschiebt
 * das Band um genau eine Gruppenbreite, wodurch die Schleife nahtlos wirkt.
 */
export function initReviewsMarquee({ reducedMotion }) {
  const marquee = document.querySelector('[data-marquee]');
  if (!marquee) return;

  const track = marquee.querySelector('[data-marquee-track]');
  const originals = [...track.children];

  const cloneHidden = (el) => {
    const clone = el.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    return clone;
  };

  const build = () => {
    const group = document.createElement('div');
    group.className = 'marquee__group';
    group.append(...originals);
    track.replaceChildren(group);

    if (reducedMotion || marquee.clientWidth === 0) return;

    for (let i = 0; group.scrollWidth < marquee.clientWidth && i < 20; i++) {
      group.append(...originals.map(cloneHidden));
    }

    track.append(cloneHidden(group));
    track.style.setProperty('--marquee-duration', `${group.offsetWidth / SPEED}s`);
  };

  build();

  // Bei Breitenänderung neu aufbauen (z. B. Handy drehen)
  let lastWidth = marquee.clientWidth;
  let timer;
  new ResizeObserver(() => {
    if (marquee.clientWidth === lastWidth) return;
    lastWidth = marquee.clientWidth;
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  }).observe(marquee);
}
