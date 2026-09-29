import '@fontsource-variable/inter';
import './styles/main.css';

import { initSmoothScroll } from './js/smooth-scroll.js';
import { initAnimations } from './js/animations.js';
import { initNav } from './js/nav.js';
import { initOpeningHours } from './js/opening-hours.js';
import { initMap } from './js/map.js';
import { initPrices } from './js/prices.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));

initOpeningHours();
initMap();
initPrices({ reducedMotion });

const lenis = initSmoothScroll({ reducedMotion });
initAnimations({ reducedMotion });
initNav(lenis);
