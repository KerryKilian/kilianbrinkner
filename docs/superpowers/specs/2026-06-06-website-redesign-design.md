# Website Redesign — Design Spec
**Date:** 2026-06-06  
**Project:** kilianbrinkner personal portfolio  
**Scope:** Full rewrite — all pages, all components, new design system, i18n

---

## 1. Aesthetic Direction

**Theme:** Bold Tech / Developer  
**Palette:**
| Token | Value | Use |
|---|---|---|
| `--bg` | `#060612` | Page background |
| `--bg2` | `#0d0d20` | Cards, panels |
| `--bg3` | `#0f0f24` | Thumbnails, deep insets |
| `--border` | `#1a1a3e` | All borders |
| `--accent` | `#00ffaa` | Electric green — active states, headings, highlights |
| `--accent-glow` | `rgba(0,255,170,0.10)` | Glow backgrounds |
| `--text` | `#e8e8ff` | Primary text |
| `--text2` | `#8888aa` | Secondary / body text |
| `--text3` | `#4a4a6a` | Muted / labels / comments |

**Typography:**
- **Display / monospace:** `JetBrains Mono` (weights 400, 700) — all headings, nav links, badges, labels, code-style decorative elements
- **Body:** `Outfit` (weights 300, 400, 500) — paragraph text, descriptions, captions

**Background treatment:** Subtle CSS grid pattern (`60px × 60px`, `opacity: 0.3`) on the hero. Radial green glow on hero right side. All other pages: solid `--bg`.

**Motion:** CSS transitions only (no additional animation libraries).
- Cards: `transform translateY(-3px)` + green border glow on hover (`0.25s ease`)
- Scroll reveal: keep existing `react-intersection-observer` pattern — cards fade + slide up on enter
- Header: `backdrop-filter: blur(12px)` on scroll

---

## 2. Architecture

**Framework:** React + TypeScript (unchanged)  
**Styles:** SCSS — full rewrite, same file structure (`_settings`, `_elements`, `_generic`, `_objects`, `_tools` + per-component files)  
**i18n:** `react-i18next` + `i18next`
- Config: `src/i18n/index.ts`
- Locales: `src/i18n/locales/de.json` (default), `src/i18n/locales/en.json`
- All existing German text migrated to `de.json`; English translations added to `en.json`
- Language persisted in `localStorage`

**Routing:** unchanged (`/`, `/timeline`, `/projects`, `/projects/:title`)

**Removed dependencies:** Swiper (`swiper` package) — replaced by custom vertical timeline  
**Added dependencies:** `react-i18next`, `i18next`, `i18next-browser-languagedetector`

---

## 3. Component Inventory

### New / Rewritten Components

| File | Change | Notes |
|---|---|---|
| `src/styles/_settings.scss` | Full rewrite | New CSS custom properties (colors, fonts, spacing) |
| `src/styles/_elements.scss` | Full rewrite | Base element styles with new palette + fonts |
| `src/styles/components/_navigation.scss` | Full rewrite | Sticky top bar layout |
| `src/styles/components/_card.scss` | Full rewrite | New card design with badge system |
| `src/styles/components/_about.scss` | Full rewrite | Two-column about layout |
| `src/styles/components/_project.scss` | Full rewrite | Detail page layout |
| `src/styles/components/_timeline.scss` | New file | Vertical timeline styles (replaces `_slide.scss`) |
| `src/styles/components/_images.scss` | Update | Gallery image styles for project detail page |
| `src/components/Header.tsx` | Rewrite | Add language toggle, new nav markup |
| `src/components/ProjectCard.tsx` | Rewrite | New card layout with thumb + badge + footer |
| `src/components/VerticalTimeline.tsx` | New | Replaces `Slider.tsx` — vertical scroll timeline |
| `src/components/TimelineEntry.tsx` | New | Replaces `Slide.tsx` — single timeline card |
| `src/pages/Start.tsx` | Rewrite | Hero section + about section |
| `src/pages/Projects.tsx` | Rewrite | Page header + cards grid |
| `src/pages/Timeline.tsx` | Rewrite | Page header + `<VerticalTimeline>` |
| `src/pages/Project.tsx` | Rewrite | Breadcrumb + hero + description + gallery |
| `src/i18n/index.ts` | New | i18next config |
| `src/i18n/locales/de.json` | New | German strings |
| `src/i18n/locales/en.json` | New | English strings |

### Deleted
- `src/components/Slider.tsx` — replaced by `VerticalTimeline.tsx`
- `src/components/Slide.tsx` — replaced by `TimelineEntry.tsx`
- `src/styles/components/_slide.scss` — replaced by `_timeline.scss`

### Minor Updates
- `src/App.tsx` — wrap routes in `<I18nextProvider>`; routes themselves unchanged

### Unchanged
- `src/data/Projects.ts`
- `src/data/Timeline.ts`
- `src/components/ErrorFallback.tsx`
- `src/components/NotFound.tsx`

---

## 4. Page Designs

### 4.1 Header (all pages)
- Fixed top bar, `height: 56px`, `background: rgba(6,6,18,0.92)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid --border`
- **Left:** `> kilian.dev` in `--accent`, `JetBrains Mono 13px`, letter-spacing 2px
- **Right:** nav links `~/über-mich`, `~/projekte`, `~/lebenslauf` in `JetBrains Mono 11px --text3`; active link gets `--text` color + `1px solid --accent` bottom border; `DE | EN` toggle button
- **Mobile (< 768px):** hamburger icon top-right; nav slides down as full-width dropdown with stacked links
- Language toggle: clicking switches `i18next` language + persists to `localStorage`

### 4.2 Home / About (`/`)
**Hero section** (`min-height: 100vh`):
- Background: grid pattern overlay + right-side radial green glow
- `// software developer · Berlin` in `--text3`, `JetBrains Mono 13px`
- Name: `Kilian Aaron` line 1, `Brinkner` line 2 in `--accent` — `JetBrains Mono 80px`, `font-weight: 700`, `letter-spacing: -2px`
- Subtitle: study/tech stack in `--text2`, `Outfit 16px`
- Skill tags row: bordered tags for main tech stack; highlighted (green border + bg) for primary skills
- CTA buttons: `[Projekte ansehen]` (filled accent) + `[Lebenslauf]` (bordered)
- Scroll hint: bottom-left, `scroll` label + horizontal line

**About section** (below hero):
- Two columns: text left, photo right
- `// über mich` section label
- `h2` in `JetBrains Mono`
- Body text in `Outfit 300`
- Photo: square frame with offset green-border accent div behind it

### 4.3 Projects (`/projects`)
- Page header: section label + `h1` + subtitle showing project count + tech stack
- Responsive grid: `repeat(auto-fill, minmax(280px, 1fr))`, `gap: 20px`
- **Card anatomy:**
  - Thumbnail: `height: 160px`, `background: --bg3`, subtle gradient overlay
  - Language badge: left-border colored tag (`Java` → orange, `Flutter` → blue, `NextJS` → muted, `React` → cyan, `Python/Django` → amber, `CSS` → yellow)
  - Title: `JetBrains Mono 15px 700`
  - Short description: `Outfit 13px 300 --text3`
  - Footer row: `$ ./view-project` in `--accent` + `→` arrow
- Card hover: `translateY(-3px)` + green glow `box-shadow`
- Scroll reveal: fade + slide up via `react-intersection-observer`

### 4.4 Project Detail (`/projects/:title`)
- **Breadcrumb:** `~/projekte / [title]` in `JetBrains Mono 11px --text3`
- Language badge (same style as card)
- Title: `JetBrains Mono 42px 700`
- Short description: `Outfit 16px 300 --text2`
- Action buttons: GitHub (filled) and/or website link (bordered), only rendered if data exists
- `// beschreibung` section label
- Long description: left-bordered block (`border-left: 2px solid --border`, `padding-left: 24px`)
- `// screenshots` section label
- Image gallery: first image full-width (`grid-column: 1 / -1`), rest in 2-column grid; each item has monospace caption

### 4.5 Timeline (`/timeline`)
- Replaces Swiper carousel with vertical scroll timeline
- Page header: section label + `h1` + subtitle
- **Timeline structure:**
  - Left vertical line: `1px`, gradient `--accent → --border → transparent`
  - Dot: `12px` circle, `border: 2px solid --accent` (recent) or `--text3` (older)
  - Date: `JetBrains Mono 10px --accent`, letter-spacing 2px
  - Card: `background: --bg2`, `border: 1px solid --border`; left accent bar `2px --accent` on most recent entry
  - Inside card: institution logo (28px square), title `JetBrains Mono 14px 700`, subtitle `Outfit 12px --text3`, description `Outfit 13px 300 --text2`
- Entries ordered most-recent first (reverse `timelineData`)
- Scroll reveal per entry

---

## 5. i18n String Map

All user-visible strings are extracted to locale files. Key namespaces:

**`nav`:** `about`, `projects`, `timeline`  
**`home`:** `comment`, `subtitle`, `ctaProjects`, `ctaTimeline`, `aboutLabel`, `aboutHeading`, `aboutText`  
**`projects`:** `label`, `heading`, `subtitle`, `viewProject`  
**`timeline`:** `label`, `heading`, `subtitle`  
**`project`:** `breadcrumb`, `description`, `screenshots`, `github`, `website`  

Project titles, descriptions, and timeline text remain in `Projects.ts` and `Timeline.ts` (German only) — these are data, not UI strings. English versions of project/timeline content are out of scope; only UI chrome is translated.

---

## 6. SCSS Structure

```
src/styles/
  _settings.scss        ← CSS custom properties (full rewrite)
  _elements.scss        ← Base element styles (full rewrite)
  _generic.scss         ← Reset (keep, minor tweaks)
  _objects.scss         ← Layout utilities
  _tools.scss           ← SCSS mixins (keep)
  styles.scss           ← Imports (update)
  components/
    _navigation.scss    ← Header/nav (full rewrite)
    _card.scss          ← Project cards (full rewrite)
    _about.scss         ← About section (full rewrite)
    _project.scss       ← Project detail (full rewrite)
    _timeline.scss      ← Vertical timeline (new, replaces _slide.scss)
    _images.scss        ← Gallery images (update)
```

---

## 7. Font Loading

Add to `public/index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
```

---

## 8. Out of Scope

- English translations for project/timeline content data (only UI chrome translated)
- Dark/light mode toggle
- Contact form
- Blog or writing section
- Search functionality
- Any backend changes
