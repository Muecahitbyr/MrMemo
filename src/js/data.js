/**
 * Zentrale Geschäftsdaten.
 * Öffnungszeiten hier ändern – Status-Anzeige und Tabelle passen sich automatisch an.
 * Index 0 = Montag … 6 = Sonntag. `null` = geschlossen.
 */
export const OPENING_HOURS = [
  { day: 'Montag', short: 'Mo', open: '09:00', close: '18:00' },
  { day: 'Dienstag', short: 'Di', open: '09:00', close: '18:00' },
  { day: 'Mittwoch', short: 'Mi', open: '09:00', close: '18:00' },
  { day: 'Donnerstag', short: 'Do', open: '08:30', close: '19:00' },
  { day: 'Freitag', short: 'Fr', open: '08:30', close: '19:00' },
  { day: 'Samstag', short: 'Sa', open: '08:00', close: '18:00' },
  { day: 'Sonntag', short: 'So', open: null, close: null },
];

export const TIME_ZONE = 'Europe/Berlin';

/** Minuten vor Ladenschluss, ab denen „Schließt bald“ angezeigt wird. */
export const CLOSING_SOON_MINUTES = 30;

export const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Mr.%20Memo%20Barbershop%2C%20Georg-Fischer-Stra%C3%9Fe%2026%2C%2087616%20Marktoberdorf&z=16&output=embed';

/**
 * Preisliste – wird automatisch als Tabs gerendert.
 *
 * price:    Preis in Euro (null → „Preis im Salon“)
 * from:     true → „ab 35 €“
 * badge:    optionales Label, z. B. „Klassiker“
 * featured: true → wird groß als Highlight-Karte neben der Liste gezeigt (nur 1×)
 */
export const PRICE_CATEGORIES = [
  {
    id: 'herren',
    label: 'Herren',
    items: [
      { name: 'Haarschnitt', price: 21 },
      { name: 'Haarschnitt Fade', desc: 'Saubere Übergänge', price: 23 },
      { name: 'Maschinenschnitt', price: 18 },
      { name: 'Kopfrasur', desc: 'Mit Rasierschaum', price: 17 },
      { name: 'Kinderhaarschnitt', desc: 'Bis 10 Jahre', price: 18 },
    ],
  },
  {
    id: 'bart',
    label: 'Bart & Gesicht',
    items: [
      { name: 'Bartrasur & Styling', price: 17 },
      { name: 'Augenbrauen zupfen', price: 8 },
      { name: 'Augenbrauen mit Messer', price: 3 },
      { name: 'Waxing', desc: 'Wangen, Ohren, Nase', price: 15 },
      { name: 'Black Maske', price: 15 },
    ],
  },
  {
    id: 'pflege',
    label: 'Pflege & Farbe',
    items: [
      { name: 'Haarwäsche', price: 15 },
      { name: 'Haare färben', price: 15 },
      { name: 'Dauerwelle', price: 40 },
    ],
  },
  {
    id: 'pakete',
    label: 'Pakete',
    items: [
      { name: 'Paket 1', desc: 'Haarschnitt + Bartrasur', price: 36, badge: 'Klassiker', featured: true },
      // TODO: Preis für Paket 2 fehlt noch
      { name: 'Paket 2', desc: 'Haarschnitt Fade + Bartrasur', price: null },
      { name: 'Paket 3', desc: 'Haarschnitt + Bartrasur + Augenbrauen', price: 40 },
      { name: 'Paket 4', desc: 'Haarschnitt + Bartrasur + Haarwäsche + Maske', price: 50 },
      { name: 'Paket 5', desc: 'Haarschnitt + Bartrasur + Haarwäsche + Augenbrauen + Maske und mehr', price: 60 },
    ],
  },
];

export const PRICE_NOTE = 'Alle Preise in Euro inkl. MwSt. Individuelle Wünsche besprechen wir gern vor Ort.';
