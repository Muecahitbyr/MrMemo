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
 * price:    Preis in Euro
 * from:     true → „ab 35 €“
 * badge:    optionales Label, z. B. „Beliebt“
 * featured: true → wird groß als Highlight-Karte neben der Liste gezeigt (nur 1×)
 */
export const PRICE_CATEGORIES = [
  {
    id: 'herren',
    label: 'Herren',
    items: [
      { name: 'Haarschnitt', desc: 'Waschen, Schneiden, Styling', price: 20 },
      { name: 'Fade / Skin Fade', desc: 'Saubere Übergänge bis auf die Haut', price: 22 },
      { name: 'Maschinenschnitt', desc: 'Eine Länge, rundum', price: 15 },
      { name: 'Kinderhaarschnitt', desc: 'Bis 12 Jahre', price: 13 },
    ],
  },
  {
    id: 'bart',
    label: 'Bart & Rasur',
    items: [
      { name: 'Bart schneiden', desc: 'Länge und Form', price: 10 },
      { name: 'Bart mit Konturen', desc: 'Inkl. Konturen mit der Klinge', price: 13 },
      { name: 'Klassische Rasur', desc: 'Mit Pinsel, Schaum und Klinge', price: 15 },
    ],
  },
  {
    id: 'kombi',
    label: 'Kombi',
    items: [
      { name: 'Haarschnitt + Bart', desc: 'Der Klassiker – alles in einem Besuch', price: 28, badge: 'Beliebt', featured: true },
      { name: 'Fade + Bart mit Konturen', desc: 'Das volle Programm', price: 32 },
      { name: 'Haarschnitt + Rasur', desc: 'Frisch geschnitten, glatt rasiert', price: 33 },
    ],
  },
  {
    id: 'coiffeur',
    label: 'Coiffeur',
    items: [
      { name: 'Haare färben', desc: 'Je nach Länge und Aufwand', price: 35, from: true },
      { name: 'Waschen & Föhnen', desc: 'Inkl. Pflege', price: 15, from: true },
      { name: 'Haarstyling', desc: 'Für den besonderen Anlass', price: 12, from: true },
    ],
  },
];

export const PRICE_NOTE = 'Alle Preise in Euro inkl. MwSt. Individuelle Wünsche besprechen wir gern vor Ort.';
