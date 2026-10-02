# Mr. Memo – Barbershop & Coiffeur

Website für **Mr. Memo Barbershop & Coiffeur**, Georg-Fischer-Straße 26, 87616 Marktoberdorf.
Im Apple-Stil gestaltet: große Typografie, Glas-Navigation, Parallax und scroll-gesteuerte Animationen.

## Schnellstart

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Entwicklungsserver → http://localhost:5173
npm run build    # Produktions-Build nach /dist
npm run preview  # Build lokal ansehen
```

Den Ordner `dist/` kann man auf jeden statischen Hoster hochladen (Netlify, Vercel, GitHub Pages, IONOS, Strato …).

## Technik

| Paket | Zweck |
| --- | --- |
| [Vite](https://vite.dev) | Dev-Server & Build (mehrseitig: Start, Impressum, Datenschutz) |
| [GSAP + ScrollTrigger](https://gsap.com) | Scroll-Animationen, Parallax, Pinning |
| [Lenis](https://lenis.darkroom.engineering) | Smooth Scrolling |
| [@fontsource-variable/inter](https://fontsource.org) | Schrift lokal gehostet (kein Google-Fonts-CDN → DSGVO) |

Auf Apple-Geräten wird automatisch die Systemschrift SF Pro verwendet, sonst Inter.

## Effekte

- **Hero** – Bild zoomt beim Laden heraus, Parallax + Ausblenden beim Scrollen
- **Live-Öffnungsstatus** – „Jetzt geöffnet / Schließt bald / Geschlossen · Öffnet …“ (immer in deutscher Zeit)
- **Statement** – Wörter leuchten beim Scrollen nacheinander auf
- **Zoom-Reveal** – Bild wächst von einer abgerundeten Karte auf Vollbild
- **Bento-Grid** – Leistungs-Karten mit gestaffeltem Einblenden und Bild-Parallax
- **Preisliste** – iOS-artige Tabs (Herren · Bart & Rasur · Kombi · Coiffeur) mit Highlight-Karte, per Tastatur bedienbar
- **Sticky Scrollytelling** – Bild bleibt stehen und wechselt mit jedem Schritt
- **Zähler** – 4,8 ★ / 116 Rezensionen zählen hoch
- **Horizontale Galerie** – vertikales Scrollen bewegt die Galerie seitwärts (mobil: Wischen)
- **Adaptive Navigation** – wird über hellen Sektionen automatisch hell
- **Barrierefreiheit** – „Bewegung reduzieren“ wird respektiert, Skip-Link, Tastaturbedienung

## Struktur

```
├── index.html              Startseite (alle Inhalte)
├── impressum.html          Impressum (Platzhalter ausfüllen!)
├── datenschutz.html        Datenschutzerklärung (Grundgerüst)
├── public/
│   ├── favicon.svg
│   └── images/             Alle Bilder (WebP)
└── src/
    ├── main.js             Einstiegspunkt Startseite
    ├── legal.js            Einstiegspunkt Unterseiten
    ├── js/
    │   ├── data.js         ← Öffnungszeiten, Preise & Karten-URL hier ändern
    │   ├── prices.js       Preisliste (Tabs, Highlight-Karte)
    │   ├── animations.js   Alle GSAP-Animationen
    │   ├── smooth-scroll.js
    │   ├── nav.js          Navigation, Mobilmenü, Anker-Scrolling
    │   ├── opening-hours.js Live-Status & Tabelle
    │   └── map.js          Google Maps erst nach Klick (DSGVO)
    └── styles/
        ├── base.css        Design-Tokens (Farben, Schrift, Abstände)
        ├── components.css  Navigation, Buttons, Status-Badge
        ├── sections.css    Alle Sektionen
        └── legal.css       Impressum/Datenschutz
```

## Anpassen

- **Öffnungszeiten:** `src/js/data.js` – Tabelle und Live-Status aktualisieren sich automatisch.
  Bitte auch das JSON-LD in `index.html` (für Google) mit anpassen.
- **Preise:** `src/js/data.js` → `PRICE_CATEGORIES`. Kategorien und Leistungen einfach hinzufügen/entfernen.
  `from: true` zeigt „ab …“, `badge` ein Label, `featured: true` macht eine Leistung zur großen Highlight-Karte.
- **Farben:** `src/styles/base.css` → `--accent-1` bis `--accent-3` (Gold aus dem Logo, `#CB9741`).
- **Logo:** Original in `public/images/logo.jpg`. Auf der Seite wird das freigestellte Emblem
  `logo-emblem.webp` verwendet (Navigation, Hero, Finale, Footer). Favicon: `public/favicon.png`.
  Liegt das Logo als Vektor (SVG/PDF) vor, wird es damit noch schärfer.
- **Eigene Fotos:** Dateien in `public/images/` mit gleichem Namen ersetzen (am besten WebP, ca. 1200–2400 px breit).
  Echte Fotos aus dem Laden wirken deutlich stärker als Stockfotos.
- **Texte:** direkt in `index.html`.

## Vor dem Livegang

- [ ] Impressum: Inhabername, E-Mail, ggf. USt-IdNr. und Handwerkskammer eintragen
- [ ] Datenschutzerklärung an den tatsächlichen Hoster anpassen und prüfen lassen
- [ ] Eigene Fotos einsetzen (aktuell: Stockfotos von Unsplash, Unsplash-Lizenz)
- [ ] Rezensionen/Zahlen (4,8 ★ / 116) gelegentlich aktualisieren
