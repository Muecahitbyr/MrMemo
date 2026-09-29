import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Butterweiches Scrollen (Lenis), synchronisiert mit GSAP ScrollTrigger.
 * Bei „Bewegung reduzieren“ wird natives Scrollen verwendet.
 */
export function initSmoothScroll({ reducedMotion }) {
  if (reducedMotion) return null;

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
