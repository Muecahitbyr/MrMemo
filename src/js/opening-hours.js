import { OPENING_HOURS, TIME_ZONE, CLOSING_SOON_MINUTES } from './data.js';

const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const formatTime = (hhmm) => hhmm.replace(/^0/, '');

/** Aktueller Wochentag (0 = Mo) und Minuten seit Mitternacht – immer in deutscher Zeit. */
function nowInShopTimeZone() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type).value;
  return {
    dayIndex: WEEKDAYS_EN.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export function getOpenStatus() {
  const { dayIndex, minutes } = nowInShopTimeZone();
  const today = OPENING_HOURS[dayIndex];

  if (today.open) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);

    if (minutes >= open && minutes < close) {
      const soon = close - minutes <= CLOSING_SOON_MINUTES;
      return {
        state: soon ? 'soon' : 'open',
        text: soon ? `Schließt bald · um ${formatTime(today.close)} Uhr` : `Jetzt geöffnet · bis ${formatTime(today.close)} Uhr`,
      };
    }
    if (minutes < open) {
      return { state: 'closed', text: `Geschlossen · Öffnet heute um ${formatTime(today.open)} Uhr` };
    }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = OPENING_HOURS[(dayIndex + offset) % 7];
    if (next.open) {
      const when = offset === 1 ? 'morgen' : next.day;
      return { state: 'closed', text: `Geschlossen · Öffnet ${when} um ${formatTime(next.open)} Uhr` };
    }
  }

  return { state: 'closed', text: 'Geschlossen' };
}

function renderStatus() {
  const { state, text } = getOpenStatus();
  document.querySelectorAll('[data-open-status]').forEach((el) => {
    el.dataset.state = state;
    el.querySelector('[data-open-status-text]').textContent = text;
  });
}

function renderTable() {
  const list = document.querySelector('[data-hours-list]');
  if (!list) return;

  const { dayIndex } = nowInShopTimeZone();

  list.innerHTML = OPENING_HOURS.map((entry, i) => {
    const isToday = i === dayIndex;
    const time = entry.open ? `${formatTime(entry.open)} – ${formatTime(entry.close)}` : 'Geschlossen';
    return `
      <li class="hours__row${isToday ? ' is-today' : ''}${entry.open ? '' : ' is-closed'}">
        <span class="hours__day">${entry.day}${isToday ? '<span class="hours__badge">Heute</span>' : ''}</span>
        <span class="hours__time">${time}</span>
      </li>`;
  }).join('');
}

export function initOpeningHours() {
  renderTable();
  renderStatus();
  // Jede Minute aktualisieren, damit der Status live bleibt
  setInterval(() => {
    renderStatus();
    renderTable();
  }, 60_000);
}
