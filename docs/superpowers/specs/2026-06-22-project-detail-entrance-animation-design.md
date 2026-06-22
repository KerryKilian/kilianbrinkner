# Project Detail Page – Eingangsanimation

## Ziel
Beim Navigieren auf eine Projekt-Detailseite (`/projects/:title`) soll der Seiteninhalt nicht abrupt erscheinen, sondern sanft einblenden — passend zum bestehenden, dezenten Animationsstil der Seite (siehe `project-card--visible`, `timeline-entry--visible`).

## Scope
- Nur Eingangsanimation beim Mount der `Project`-Seite.
- Keine Exit-Animation, kein Router-Eingriff, keine neue Dependency.
- Betrifft ausschließlich `src/pages/Project.tsx` und `src/styles/components/_project.scss`.

## Lösung
Gleiches Muster wie bei `ProjectCard` / `TimelineEntry`:

1. **State:** `Project.tsx` hält `isVisible` (`useState(false)`), das per `useEffect` mit `requestAnimationFrame` auf `true` gesetzt wird (Doppel-RAF nicht nötig, da kein Lightbox-Rect-Messen involviert ist — ein einzelner RAF reicht, damit der Browser den `opacity:0`-Ausgangszustand zuerst rendert, bevor die Klasse `--visible` gesetzt wird).
2. **Markup:** Der äußere Container bekommt zusätzlich die Klasse `project-detail-page` (oder Wiederverwendung von `.project-detail` falls sinnvoll) plus bedingt `--visible`.
3. **CSS:** Ausgangszustand `opacity: 0; transform: translateY(12px);`, Zielzustand `opacity: 1; transform: translateY(0);`, `transition: opacity 0.5s ease, transform 0.5s ease;` — Timing orientiert sich an `_card.scss` (`transform 0.25s, opacity 0.6s`), hier einheitlich ca. 450–500ms für einen spürbaren, aber dezenten Effekt auf einer ganzen Seite statt einer kleinen Karte.

## Nicht im Scope
- Stagger-Animation einzelner Abschnitte (Titel, Beschreibung, Galerie separat) — bewusst weggelassen für „nicht zu viel“.
- Exit-Transition beim Verlassen der Seite.
- Verhalten bei `prefers-reduced-motion` wird nicht extra behandelt (bestehende Animationen im Projekt tun das ebenfalls nicht).
