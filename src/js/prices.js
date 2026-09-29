import { gsap } from 'gsap';
import { PRICE_CATEGORIES, PRICE_NOTE } from './data.js';

const formatPrice = ({ price, from }) =>
  `${from ? 'ab ' : ''}${price.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`;

function renderRow(item) {
  return `
    <li class="price-row">
      <div>
        <p class="price-row__name">${item.name}${item.badge ? `<span class="price-row__badge">${item.badge}</span>` : ''}</p>
        ${item.desc ? `<p class="price-row__desc">${item.desc}</p>` : ''}
      </div>
      <span class="price-row__price">${formatPrice(item)}</span>
    </li>`;
}

function renderFeature(el) {
  const item = PRICE_CATEGORIES.flatMap((c) => c.items).find((i) => i.featured);
  if (!el || !item) return el?.remove();

  el.innerHTML = `
    <p class="price-feature__label">${item.badge || 'Tipp'}</p>
    <h3 class="price-feature__name">${item.name}</h3>
    <p class="price-feature__desc">${item.desc || ''}</p>
    <p class="price-feature__price">${formatPrice(item)}</p>
    <a class="btn btn--primary" href="#zeiten">Einfach vorbeikommen</a>`;
}

export function initPrices({ reducedMotion }) {
  const tabList = document.querySelector('[data-price-tabs]');
  const panelsEl = document.querySelector('[data-price-panels]');
  if (!tabList || !panelsEl) return;

  const indicator = tabList.querySelector('[data-price-indicator]');

  // Tabs + Panels erzeugen. Alle Panels liegen übereinander im selben Grid-Feld,
  // damit die Höhe beim Wechseln konstant bleibt (keine Sprünge für ScrollTrigger).
  tabList.insertAdjacentHTML(
    'beforeend',
    PRICE_CATEGORIES.map(
      (c, i) => `
      <button class="segmented__tab" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}"
        aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-price-tab>${c.label}</button>`
    ).join('')
  );

  panelsEl.innerHTML = PRICE_CATEGORIES.map(
    (c, i) => `
    <ul class="prices__panel${i === 0 ? ' is-active' : ''}" role="tabpanel" id="panel-${c.id}"
      aria-labelledby="tab-${c.id}" data-price-panel>
      ${c.items.map(renderRow).join('')}
    </ul>`
  ).join('');

  document.querySelectorAll('[data-price-note]').forEach((el) => (el.textContent = PRICE_NOTE));
  renderFeature(document.querySelector('[data-price-feature]'));

  const tabs = [...tabList.querySelectorAll('[data-price-tab]')];
  const panels = [...panelsEl.querySelectorAll('[data-price-panel]')];

  const moveIndicator = (tab) => {
    indicator.style.width = `${tab.offsetWidth}px`;
    indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
  };

  const select = (index, { focus = false } = {}) => {
    tabs.forEach((t, i) => {
      const active = i === index;
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach((p, i) => p.classList.toggle('is-active', i === index));
    moveIndicator(tabs[index]);
    if (focus) tabs[index].focus();

    if (!reducedMotion) {
      gsap.fromTo(
        panels[index].children,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.06, overwrite: true }
      );
    }
  };

  tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i)));

  // Pfeiltasten-Navigation (WAI-ARIA Tabs)
  tabList.addEventListener('keydown', (e) => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: -current, End: tabs.length - 1 - current };
    if (!(e.key in keys)) return;
    e.preventDefault();
    select((current + keys[e.key] + tabs.length) % tabs.length, { focus: true });
  });

  // Indikator ohne Animation initial setzen und bei Größenänderung nachführen
  indicator.style.transition = 'none';
  moveIndicator(tabs[0]);
  requestAnimationFrame(() => (indicator.style.transition = ''));
  new ResizeObserver(() => moveIndicator(tabs.find((t) => t.getAttribute('aria-selected') === 'true'))).observe(tabList);
}
