import { MAP_EMBED_URL } from './data.js';

/** Zwei-Klick-Lösung: Google Maps wird erst nach Zustimmung geladen (DSGVO). */
export function initMap() {
  const map = document.querySelector('[data-map]');
  const button = map?.querySelector('[data-map-load]');
  if (!button) return;

  button.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = MAP_EMBED_URL;
    iframe.title = 'Karte: Mr. Memo Barbershop, Georg-Fischer-Straße 26, Marktoberdorf';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;

    map.querySelector('[data-map-consent]').remove();
    map.appendChild(iframe);
    map.classList.add('is-loaded');
  });
}
