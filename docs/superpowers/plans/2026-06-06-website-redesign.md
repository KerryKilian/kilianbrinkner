# Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full visual redesign of the kilianbrinkner portfolio — bold tech aesthetic, JetBrains Mono + Outfit fonts, electric green on deep navy palette, sticky top bar nav, vertical timeline, and DE/EN i18n toggle.

**Architecture:** Complete SCSS rewrite with new design tokens; React components rewritten with new markup; `react-i18next` added for multilingual support (DE default); Swiper removed in favour of a custom vertical timeline; CRA's native SCSS compilation used (import `.scss` directly, no manual pre-compile step).

**Tech Stack:** React 18, TypeScript, SCSS (via CRA + sass), react-i18next, i18next, i18next-browser-languagedetector, react-intersection-observer, react-router-dom v6, react-icons

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `public/index.html` | Modify | Add Google Fonts preconnect + stylesheet links |
| `package.json` | Modify | Add react-i18next, i18next, i18next-browser-languagedetector; remove swiper |
| `src/App.tsx` | Modify | Import `./styles/styles.scss` directly (not CSS); import `./i18n` |
| `src/i18n/index.ts` | Create | i18next init with DE/EN resources |
| `src/i18n/locales/de.json` | Create | German UI strings |
| `src/i18n/locales/en.json` | Create | English UI strings |
| `src/styles/styles.scss` | Modify | Add `components/timeline`, remove `components/slide` |
| `src/styles/_settings.scss` | Rewrite | New CSS custom properties |
| `src/styles/_elements.scss` | Rewrite | Base element styles, `.page`, `.page-header`, `.section-label`, `.btn` |
| `src/styles/_generic.scss` | Minor update | Remove font/color settings (moved to _settings/_elements) |
| `src/styles/components/_navigation.scss` | Rewrite | Sticky top bar + mobile dropdown |
| `src/styles/components/_about.scss` | Rewrite | Hero section + about two-column |
| `src/styles/components/_card.scss` | Rewrite | Project card grid + badge colors |
| `src/styles/components/_project.scss` | Rewrite | Breadcrumb + detail page layout |
| `src/styles/components/_timeline.scss` | Create | Vertical timeline |
| `src/styles/components/_images.scss` | Rewrite | Gallery grid |
| `src/components/Header.tsx` | Rewrite | Sticky top bar, language toggle, mobile hamburger |
| `src/components/ProjectCard.tsx` | Rewrite | Thumb + badge + footer row |
| `src/components/VerticalTimeline.tsx` | Create | Renders reversed timelineData as vertical list |
| `src/components/TimelineEntry.tsx` | Create | Single timeline card with scroll reveal |
| `src/pages/Start.tsx` | Rewrite | Hero + about sections |
| `src/pages/Projects.tsx` | Rewrite | Page header + cards grid |
| `src/pages/Timeline.tsx` | Rewrite | Page header + `<VerticalTimeline>` |
| `src/pages/Project.tsx` | Rewrite | Breadcrumb + detail + gallery |
| `src/components/Slider.tsx` | Delete | Replaced by VerticalTimeline |
| `src/components/Slide.tsx` | Delete | Replaced by TimelineEntry |
| `src/styles/components/_slide.scss` | Delete | Replaced by _timeline.scss |

---

## Task 1: Dependencies and Fonts

**Files:**
- Modify: `package.json`
- Modify: `public/index.html`

- [ ] **Step 1: Install i18n packages and uninstall swiper**

```bash
npm install react-i18next i18next i18next-browser-languagedetector
npm uninstall swiper
```

Expected: no errors, `node_modules` updated, `package.json` reflects changes.

- [ ] **Step 2: Add Google Fonts to `public/index.html`**

Replace the `<title>React App</title>` block with:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@300;400;500&display=swap" rel="stylesheet">
    <title>Kilian Aaron Brinkner</title>
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm start
```

Expected: app loads in browser with no console errors. Fonts may not be applied yet — that's fine.

---

## Task 2: SCSS Design Tokens

**Files:**
- Rewrite: `src/styles/_settings.scss`

- [ ] **Step 1: Replace `src/styles/_settings.scss` with new design tokens**

```scss
:root {
  // Background layers
  --bg:          #060612;
  --bg2:         #0d0d20;
  --bg3:         #0f0f24;

  // Borders
  --border:      #1a1a3e;

  // Accent
  --accent:      #00ffaa;
  --accent-glow: rgba(0, 255, 170, 0.10);

  // Text
  --text:        #e8e8ff;
  --text2:       #8888aa;
  --text3:       #4a4a6a;

  // Typography
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Outfit', sans-serif;

  // Layout
  --header-height:  56px;
  --page-padding:   40px;
  --page-max-width: 1200px;
}
```

---

## Task 3: Base SCSS Reset and Elements

**Files:**
- Rewrite: `src/styles/_generic.scss`
- Rewrite: `src/styles/_elements.scss`
- Modify: `src/styles/styles.scss`

- [ ] **Step 1: Rewrite `src/styles/_generic.scss`**

```scss
*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
}

a,
a:hover {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
  height: auto;
  margin: 0;
}

button {
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}

p {
  margin: 0;
}
```

- [ ] **Step 2: Rewrite `src/styles/_elements.scss`**

```scss
:root {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.5;
  background-color: var(--bg);
  color: var(--text);
}

// Page wrapper — used on all route pages
.page {
  padding: calc(var(--header-height) + 60px) var(--page-padding) 80px;
  max-width: var(--page-max-width);
  margin: 0 auto;
}

// Page header block (used on Projects, Timeline)
.page-header {
  margin-bottom: 48px;
}

.page-header__title {
  font-family: var(--font-mono);
  font-size: 36px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -1px;
  margin-bottom: 8px;
}

.page-header__subtitle {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--text3);
  font-weight: 300;
}

// Section label: "// label text"
.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 20px;

  &::before {
    content: '// ';
    color: var(--text3);
  }
}

// Shared button styles
.btn {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 12px 28px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.2s, border-color 0.2s, color 0.2s;
  border: none;

  &--primary {
    color: var(--bg);
    background: var(--accent);

    &:hover { opacity: 0.85; }
  }

  &--secondary {
    color: var(--text2);
    background: transparent;
    border: 1px solid var(--border);

    &:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
  }
}
```

- [ ] **Step 3: Update `src/styles/styles.scss`**

```scss
@use "settings";
@use "tools";
@use "generic";
@use "elements";
@use "objects";
@use "components/navigation";
@use "components/about";
@use "components/card";
@use "components/project";
@use "components/timeline";
@use "components/images";
```

Note: `components/slide` is removed; `components/timeline` is added.

- [ ] **Step 4: Update `src/App.tsx` to import SCSS directly**

Replace the CSS import line `import "./styles/css/styles.css";` with:

```tsx
import "./styles/styles.scss";
```

Also remove the two swiper CSS imports:
```tsx
// DELETE these two lines:
import "swiper/css";
import "swiper/css/pagination";
```

The full updated `src/App.tsx`:

```tsx
import "./styles/styles.scss";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import Start from './pages/Start';
import Header from "./components/Header";
import Timeline from "./pages/Timeline";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:title" element={<Project />} />
        <Route element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no type errors.

---

## Task 4: i18n Setup

**Files:**
- Create: `src/i18n/index.ts`
- Create: `src/i18n/locales/de.json`
- Create: `src/i18n/locales/en.json`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `src/i18n/locales/de.json`**

```json
{
  "nav": {
    "about": "~/über-mich",
    "projects": "~/projekte",
    "timeline": "~/lebenslauf"
  },
  "home": {
    "comment": "// software developer · Berlin",
    "subtitle": "Master Medieninformatik · Android · Web · Machine Learning",
    "ctaProjects": "Projekte ansehen",
    "ctaTimeline": "Lebenslauf",
    "scroll": "scroll",
    "aboutLabel": "über mich",
    "aboutHeading": "Entwickler mit\nLeidenschaft",
    "aboutText": "Ich bin 23 Jahre alt und lebe in Berlin. Ich habe bereits einen Bachelor in Geoinformation mit dem Schwerpunkt Geoinformatik. Während des Studiums habe ich gemerkt, dass mir die Programmierung viel Spaß macht. Mein Fokus lag schon immer auf der App- und Webentwicklung. Ab Winter 2022 habe ich Module aus dem Bachelor Medieninformatik belegt, damit ich nun seit Winter 2023 meinen Master in Medieninformatik belegen kann."
  },
  "projects": {
    "label": "projekte",
    "heading": "Meine Projekte",
    "subtitle_one": "{{count}} Projekt",
    "subtitle_other": "{{count}} Projekte",
    "viewProject": "$ ./view-project"
  },
  "timeline": {
    "label": "lebenslauf",
    "heading": "Werdegang",
    "subtitle": "Ausbildung · Studium · Berufserfahrung"
  },
  "project": {
    "breadcrumb": "~/projekte",
    "descriptionLabel": "beschreibung",
    "screenshotsLabel": "screenshots",
    "github": "GitHub →",
    "website": "Webseite →"
  }
}
```

- [ ] **Step 2: Create `src/i18n/locales/en.json`**

```json
{
  "nav": {
    "about": "~/about",
    "projects": "~/projects",
    "timeline": "~/timeline"
  },
  "home": {
    "comment": "// software developer · Berlin",
    "subtitle": "Master Media Informatics · Android · Web · Machine Learning",
    "ctaProjects": "View Projects",
    "ctaTimeline": "Timeline",
    "scroll": "scroll",
    "aboutLabel": "about me",
    "aboutHeading": "Developer with\nPassion",
    "aboutText": "I am 23 years old and live in Berlin. I already hold a bachelor's degree in Geoinformation with a specialization in Geoinformatics. During my studies, I discovered that I really enjoy programming. My focus has always been on app and web development. Starting in the winter of 2022, I took modules from the Media Informatics bachelor's program, enabling me to begin my master's degree in Media Informatics in the winter of 2023."
  },
  "projects": {
    "label": "projects",
    "heading": "My Projects",
    "subtitle_one": "{{count}} Project",
    "subtitle_other": "{{count}} Projects",
    "viewProject": "$ ./view-project"
  },
  "timeline": {
    "label": "timeline",
    "heading": "Career",
    "subtitle": "Education · Studies · Work Experience"
  },
  "project": {
    "breadcrumb": "~/projects",
    "descriptionLabel": "description",
    "screenshotsLabel": "screenshots",
    "github": "GitHub →",
    "website": "Website →"
  }
}
```

- [ ] **Step 3: Create `src/i18n/index.ts`**

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import de from "./locales/de.json";
import en from "./locales/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      en: { translation: en },
    },
    fallbackLng: "de",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

- [ ] **Step 4: Add i18n import to `src/App.tsx`**

Add this import after the styles import line:

```tsx
import "./i18n";
```

Full `src/App.tsx` after this step:

```tsx
import "./styles/styles.scss";
import "./i18n";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
import Start from './pages/Start';
import Header from "./components/Header";
import Timeline from "./pages/Timeline";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import NotFound from "./components/NotFound";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:title" element={<Project />} />
        <Route element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

---

## Task 5: Header Component

**Files:**
- Rewrite: `src/components/Header.tsx`
- Rewrite: `src/styles/components/_navigation.scss`

- [ ] **Step 1: Rewrite `src/components/Header.tsx`**

```tsx
import { useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const close = () => setIsOpen(false);
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "de" ? "en" : "de");
  };
  const active = (path: string) =>
    location.pathname === path ? "header__link--active" : "";

  return (
    <header className="header">
      <Link to="/" className="header__logo" onClick={close}>
        <span className="header__logo-prompt">&gt; </span>kilian.dev
      </Link>

      <button
        className="header__hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <BsX size={24} /> : <BsList size={24} />}
      </button>

      <nav className={`header__nav ${isOpen ? "header__nav--open" : ""}`}>
        <Link to="/" className={`header__link ${active("/")}`} onClick={close}>
          {t("nav.about")}
        </Link>
        <Link to="/projects" className={`header__link ${active("/projects")}`} onClick={close}>
          {t("nav.projects")}
        </Link>
        <Link to="/timeline" className={`header__link ${active("/timeline")}`} onClick={close}>
          {t("nav.timeline")}
        </Link>
        <button className="header__lang" onClick={toggleLang}>
          {i18n.language === "de" ? "EN" : "DE"}
        </button>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Rewrite `src/styles/components/_navigation.scss`**

```scss
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: rgba(6, 6, 18, 0.92);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--page-padding);
  z-index: 100;
}

.header__logo {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  letter-spacing: 2px;
}

.header__logo-prompt {
  color: var(--text3);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__link {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.2s;

  &:hover {
    color: var(--text2);
  }

  &--active {
    color: var(--text);
    border-bottom: 1px solid var(--accent);
    padding-bottom: 2px;
  }
}

.header__lang {
  font-family: var(--font-mono);
  font-size: 10px;
  border: 1px solid var(--border);
  color: var(--text3);
  padding: 4px 10px;
  letter-spacing: 2px;
  background: transparent;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
}

.header__hamburger {
  display: none;
  background: transparent;
  border: none;
  color: var(--text2);
  padding: 4px;
  line-height: 1;
}

@media (max-width: 768px) {
  .header {
    padding: 0 20px;
  }

  .header__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header__nav {
    display: none;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    background: rgba(6, 6, 18, 0.97);
    border-bottom: 1px solid var(--border);
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 20px;
    gap: 20px;

    &--open {
      display: flex;
    }
  }

  .header__link {
    font-size: 14px;
  }
}
```

- [ ] **Step 3: Verify in browser**

Run `npm start`. Navigate to each route. Verify:
- Header is sticky at top
- Active link shows green underline
- `DE | EN` toggle button visible top-right
- On mobile (< 768px): hamburger appears, nav hides; tapping hamburger opens dropdown

---

## Task 6: Home Page

**Files:**
- Rewrite: `src/pages/Start.tsx`
- Rewrite: `src/styles/components/_about.scss`

- [ ] **Step 1: Rewrite `src/pages/Start.tsx`**

```tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Start() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Kilian Aaron Brinkner";
  }, []);

  return (
    <div className="page page--home">
      <section className="hero">
        <div className="hero__inner">
          <p className="hero__comment">{t("home.comment")}</p>
          <h1 className="hero__name">
            Kilian Aaron<br />
            <span className="hero__name-accent">Brinkner</span>
          </h1>
          <p className="hero__subtitle">{t("home.subtitle")}</p>
          <div className="hero__tags">
            <span className="hero__tag hero__tag--highlight">Java</span>
            <span className="hero__tag hero__tag--highlight">Flutter</span>
            <span className="hero__tag hero__tag--highlight">React</span>
            <span className="hero__tag hero__tag--highlight">NextJS</span>
            <span className="hero__tag">Python</span>
            <span className="hero__tag">Django</span>
            <span className="hero__tag">Kotlin</span>
          </div>
          <div className="hero__cta">
            <Link to="/projects" className="btn btn--primary">
              {t("home.ctaProjects")}
            </Link>
            <Link to="/timeline" className="btn btn--secondary">
              {t("home.ctaTimeline")}
            </Link>
          </div>
        </div>
        <div className="hero__scroll">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-text">{t("home.scroll")}</span>
        </div>
      </section>

      <section className="about">
        <div className="about__text">
          <p className="section-label">{t("home.aboutLabel")}</p>
          <h2 className="about__heading">{t("home.aboutHeading")}</h2>
          <p className="about__body">{t("home.aboutText")}</p>
        </div>
        <div className="about__photo">
          <div className="about__frame">
            <img
              src={`${window.location.origin}/images/Kilian/Kilian1.jpg`}
              alt="Kilian Aaron Brinkner"
              className="about__img"
            />
          </div>
          <div className="about__frame-accent" />
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/styles/components/_about.scss`**

```scss
// Override .page padding for home (hero needs full viewport height)
.page--home {
  padding: 0;
  max-width: 100%;
}

// ---- Hero ----

.hero {
  min-height: 100vh;
  padding: 120px var(--page-padding) 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  // Grid background
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px;
    opacity: 0.3;
    pointer-events: none;
  }

  // Radial glow
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(0, 255, 170, 0.06) 0%, transparent 65%);
    pointer-events: none;
  }
}

.hero__inner {
  position: relative;
  max-width: 900px;
  z-index: 1;
}

.hero__comment {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text3);
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.hero__name {
  font-family: var(--font-mono);
  font-size: clamp(42px, 7vw, 80px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -2px;
  color: var(--text);
  margin-bottom: 6px;
}

.hero__name-accent {
  color: var(--accent);
}

.hero__subtitle {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text2);
  font-weight: 300;
  margin: 20px 0 40px;
  letter-spacing: 0.5px;
}

.hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 48px;
}

.hero__tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
  border: 1px solid var(--border);
  padding: 5px 12px;
  letter-spacing: 1px;

  &--highlight {
    color: var(--accent);
    border-color: rgba(0, 255, 170, 0.3);
    background: var(--accent-glow);
  }
}

.hero__cta {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.hero__scroll {
  position: absolute;
  bottom: 32px;
  left: var(--page-padding);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
}

.hero__scroll-line {
  width: 40px;
  height: 1px;
  background: var(--text3);
  display: block;
}

.hero__scroll-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text3);
  letter-spacing: 2px;
}

// ---- About section ----

.about {
  padding: 100px var(--page-padding);
  max-width: var(--page-max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.about__heading {
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 20px;
  letter-spacing: -1px;
  white-space: pre-line;
}

.about__body {
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--text2);
  line-height: 1.8;
  font-weight: 300;
  max-width: 55ch;
}

.about__photo {
  position: relative;
}

.about__frame {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid var(--border);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--accent-glow) 0%, transparent 60%);
    z-index: 1;
    pointer-events: none;
  }
}

.about__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about__frame-accent {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 255, 170, 0.2);
  z-index: -1;
}

@media (max-width: 768px) {
  .hero {
    padding: 100px 20px 60px;
  }

  .hero__scroll {
    left: 20px;
  }

  .about {
    padding: 60px 20px;
  }
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000`. Verify:
- Full-viewport hero with name, tags, CTA buttons
- Grid background pattern visible (subtle)
- Green glow on right side of hero
- About section below with photo
- Scroll hint bottom-left
- Language toggle switches text

---

## Task 7: Projects Page and Cards

**Files:**
- Rewrite: `src/pages/Projects.tsx`
- Rewrite: `src/components/ProjectCard.tsx`
- Rewrite: `src/styles/components/_card.scss`

- [ ] **Step 1: Rewrite `src/components/ProjectCard.tsx`**

```tsx
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Image = {
  image: string;
  description: string;
};

interface Props {
  title: string;
  shortDescription: string;
  longDescription: string;
  language: string;
  github?: string;
  available?: string;
  images: Image[];
}

const BADGE_CLASS: Record<string, string> = {
  "Java (Android Studio)": "badge--java",
  "Flutter":              "badge--flutter",
  "NextJS":               "badge--nextjs",
  "React":                "badge--react",
  "CSS":                  "badge--css",
  "Python":               "badge--python",
  "Django":               "badge--django",
};

export default function ProjectCard({ title, shortDescription, language, images }: Props) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [cardRef, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  const badgeClass = BADGE_CLASS[language] ?? "badge--default";

  return (
    <Link
      to={`/projects/${title}`}
      ref={cardRef}
      className={`project-card ${isVisible ? "project-card--visible" : ""}`}
    >
      <div className="project-card__thumb">
        {images[0] && (
          <img
            src={`${window.location.origin}/${images[0].image}`}
            alt={title}
            className="project-card__thumb-img"
          />
        )}
      </div>
      <div className="project-card__body">
        <span className={`project-card__badge ${badgeClass}`}>{language}</span>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{shortDescription}</p>
      </div>
      <div className="project-card__footer">
        <span className="project-card__cta">{t("projects.viewProject")}</span>
        <span className="project-card__arrow">→</span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Rewrite `src/pages/Projects.tsx`**

```tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data/Projects";

export default function Projects() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("projects.heading");
  }, [t]);

  return (
    <div className="page">
      <div className="page-header">
        <p className="section-label">{t("projects.label")}</p>
        <h1 className="page-header__title">{t("projects.heading")}</h1>
        <p className="page-header__subtitle">
          {t("projects.subtitle", { count: projectsData.length })}
        </p>
      </div>
      <div className="cards-grid">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            shortDescription={project.shortDescription}
            longDescription={project.longDescription}
            language={project.language}
            github={project.github}
            available={project.available}
            images={project.images}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `src/styles/components/_card.scss`**

```scss
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.project-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  transform: translateY(12px);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s, opacity 0.6s;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    border-color: rgba(0, 255, 170, 0.4);
    box-shadow: 0 0 24px rgba(0, 255, 170, 0.06), 0 8px 32px rgba(0, 0, 0, 0.4);
    transform: translateY(-3px);
  }
}

.project-card__thumb {
  width: 100%;
  height: 160px;
  background: var(--bg3);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 50%, var(--bg2) 100%);
  }
}

.project-card__thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.75;
}

.project-card__body {
  padding: 18px 20px 16px;
  flex: 1;
}

.project-card__badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 1px;
  padding: 3px 8px;
  margin-bottom: 10px;
  border-left: 2px solid;
}

// Badge colour variants
.badge--java    { color: #ff8040; border-color: #ff8040; background: rgba(255, 128,  64, 0.08); }
.badge--flutter { color: #4ab0f5; border-color: #4ab0f5; background: rgba( 74, 176, 245, 0.08); }
.badge--nextjs  { color: var(--text2); border-color: var(--text3); background: rgba(136, 136, 170, 0.08); }
.badge--react   { color: #50d4fc; border-color: #50d4fc; background: rgba( 80, 212, 252, 0.08); }
.badge--css     { color: #e0c020; border-color: #e0c020; background: rgba(224, 192,  32, 0.08); }
.badge--python  { color: #e89858; border-color: #e89858; background: rgba(232, 152,  88, 0.08); }
.badge--django  { color: #e89858; border-color: #e89858; background: rgba(232, 152,  88, 0.08); }
.badge--default { color: var(--text3); border-color: var(--border); background: transparent; }

.project-card__title {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}

.project-card__desc {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text3);
  line-height: 1.6;
  font-weight: 300;
}

.project-card__footer {
  padding: 12px 20px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.project-card__cta {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--accent);
  letter-spacing: 1px;
}

.project-card__arrow {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text3);
}
```

- [ ] **Step 4: Verify in browser**

Navigate to `/projects`. Verify:
- Cards appear in a responsive grid
- Cards fade + slide up as you scroll
- Hover lifts card with green glow
- Language badge shows correct color per tech
- `$ ./view-project` and arrow visible in each card footer

---

## Task 8: Vertical Timeline

**Files:**
- Create: `src/components/TimelineEntry.tsx`
- Create: `src/components/VerticalTimeline.tsx`
- Rewrite: `src/pages/Timeline.tsx`
- Create: `src/styles/components/_timeline.scss`
- Delete: `src/components/Slider.tsx`
- Delete: `src/components/Slide.tsx`
- Delete: `src/styles/components/_slide.scss`

- [ ] **Step 1: Create `src/components/TimelineEntry.tsx`**

```tsx
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  logo: string;
  isRecent: boolean;
}

export function TimelineEntry({
  title,
  cardTitle,
  cardSubtitle,
  cardDetailedText,
  logo,
  isRecent,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={`timeline-entry ${isVisible ? "timeline-entry--visible" : ""}`}
    >
      <div
        className={`timeline-entry__dot ${
          isRecent ? "timeline-entry__dot--recent" : ""
        }`}
      />
      <div className="timeline-entry__date">{title}</div>
      <div
        className={`timeline-entry__card ${
          isRecent ? "timeline-entry__card--recent" : ""
        }`}
      >
        <div className="timeline-entry__header">
          <div className="timeline-entry__logo">
            <img
              src={logo}
              alt={cardSubtitle}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div>
            <div className="timeline-entry__title">{cardTitle}</div>
            <div className="timeline-entry__subtitle">{cardSubtitle}</div>
          </div>
        </div>
        <p className="timeline-entry__text">{cardDetailedText}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/VerticalTimeline.tsx`**

```tsx
import { timelineData } from "../data/Timeline";
import { TimelineEntry } from "./TimelineEntry";

export function VerticalTimeline() {
  const reversed = [...timelineData].reverse();

  return (
    <div className="vertical-timeline">
      {reversed.map((entry, index) => (
        <TimelineEntry
          key={entry.title}
          title={entry.title}
          cardTitle={entry.cardTitle}
          cardSubtitle={entry.cardSubtitle}
          cardDetailedText={entry.cardDetailedText}
          logo={entry.logo}
          isRecent={index === 0}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `src/pages/Timeline.tsx`**

```tsx
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { VerticalTimeline } from "../components/VerticalTimeline";

export default function Timeline() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("timeline.heading");
  }, [t]);

  return (
    <div className="page">
      <div className="page-header">
        <p className="section-label">{t("timeline.label")}</p>
        <h1 className="page-header__title">{t("timeline.heading")}</h1>
        <p className="page-header__subtitle">{t("timeline.subtitle")}</p>
      </div>
      <VerticalTimeline />
    </div>
  );
}
```

- [ ] **Step 4: Create `src/styles/components/_timeline.scss`**

```scss
.vertical-timeline {
  position: relative;
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  max-width: 760px;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: linear-gradient(to bottom, var(--accent), var(--border) 60%, transparent);
  }
}

.timeline-entry {
  position: relative;
  padding-bottom: 40px;
  padding-left: 28px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-entry__dot {
  position: absolute;
  left: -25px;
  top: 6px;
  width: 12px;
  height: 12px;
  border: 2px solid var(--text3);
  background: var(--bg2);
  border-radius: 50%;

  &--recent {
    border-color: var(--accent);
    background: var(--bg);
    box-shadow: 0 0 8px rgba(0, 255, 170, 0.3);
  }
}

.timeline-entry__date {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.timeline-entry__card {
  background: var(--bg2);
  border: 1px solid var(--border);
  padding: 18px 22px;

  &--recent {
    border-left: 2px solid var(--accent);
  }
}

.timeline-entry__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.timeline-entry__logo {
  width: 28px;
  height: 28px;
  background: var(--bg3);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 4px;
  }
}

.timeline-entry__title {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
}

.timeline-entry__subtitle {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--text3);
  margin-top: 2px;
}

.timeline-entry__text {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--text2);
  line-height: 1.7;
  font-weight: 300;
}

@media (max-width: 768px) {
  .vertical-timeline {
    padding-left: 24px;
  }

  .timeline-entry {
    padding-left: 20px;
  }

  .timeline-entry__dot {
    left: -17px;
  }
}
```

- [ ] **Step 5: Delete old files**

Delete these three files (they are fully replaced and no longer imported):
- `src/components/Slider.tsx`
- `src/components/Slide.tsx`
- `src/styles/components/_slide.scss`

- [ ] **Step 6: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (no remaining references to Slider or Slide).

- [ ] **Step 7: Verify in browser**

Navigate to `/timeline`. Verify:
- Vertical line runs down left side
- Most recent entry (Materna) is at the top with green dot + left border
- Entries fade in as they enter viewport
- Institution logos display (or gracefully hide on error)

---

## Task 9: Project Detail Page

**Files:**
- Rewrite: `src/pages/Project.tsx`
- Rewrite: `src/styles/components/_project.scss`
- Rewrite: `src/styles/components/_images.scss`

- [ ] **Step 1: Rewrite `src/pages/Project.tsx`**

```tsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projectsData } from "../data/Projects";

const BADGE_CLASS: Record<string, string> = {
  "Java (Android Studio)": "badge--java",
  "Flutter":              "badge--flutter",
  "NextJS":               "badge--nextjs",
  "React":                "badge--react",
  "CSS":                  "badge--css",
  "Python":               "badge--python",
  "Django":               "badge--django",
};

function Project() {
  const { title } = useParams();
  const { t } = useTranslation();
  const data = projectsData.find((p) => p.title === title);

  useEffect(() => {
    document.title = title ?? t("projects.heading");
  }, [title, t]);

  if (!data) return null;

  const badgeClass = BADGE_CLASS[data.language] ?? "badge--default";

  return (
    <div className="page">
      <div className="breadcrumb">
        <Link to="/projects" className="breadcrumb__link">
          {t("project.breadcrumb")}
        </Link>
        <span className="breadcrumb__sep">/</span>
        <span className="breadcrumb__current">{data.title}</span>
      </div>

      <div className="project-detail">
        <span className={`project-card__badge ${badgeClass}`}>{data.language}</span>
        <h1 className="project-detail__title">{data.title}</h1>
        <p className="project-detail__short">{data.shortDescription}</p>

        <div className="project-detail__actions">
          {data.github && (
            <a
              href={data.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
            >
              {t("project.github")}
            </a>
          )}
          {data.available && (
            <a
              href={data.available}
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary"
            >
              {t("project.website")}
            </a>
          )}
        </div>

        <p className="section-label">{t("project.descriptionLabel")}</p>
        <p className="project-detail__desc">{data.longDescription}</p>

        {data.images.length > 0 && (
          <>
            <p className="section-label">{t("project.screenshotsLabel")}</p>
            <div className="gallery">
              {data.images.map((img, index) => (
                <div
                  key={img.image}
                  className={`gallery__item ${index === 0 ? "gallery__item--wide" : ""}`}
                >
                  <img
                    src={`${window.location.origin}/${img.image}`}
                    alt={img.description}
                    className="gallery__img"
                  />
                  <p className="gallery__caption">{img.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Project;
```

- [ ] **Step 2: Rewrite `src/styles/components/_project.scss`**

```scss
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  margin-bottom: 32px;
}

.breadcrumb__link {
  color: var(--text3);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: var(--accent); }
}

.breadcrumb__sep {
  color: var(--border);
}

.breadcrumb__current {
  color: var(--text2);
}

.project-detail {
  max-width: 900px;
}

.project-detail__title {
  font-family: var(--font-mono);
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin: 16px 0 12px;
}

.project-detail__short {
  font-family: var(--font-sans);
  font-size: 16px;
  color: var(--text2);
  font-weight: 300;
  line-height: 1.7;
  max-width: 60ch;
  margin-bottom: 28px;
}

.project-detail__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}

.project-detail__desc {
  font-family: var(--font-sans);
  font-size: 15px;
  color: var(--text2);
  line-height: 1.9;
  font-weight: 300;
  max-width: 68ch;
  border-left: 2px solid var(--border);
  padding-left: 24px;
  margin-bottom: 56px;
}
```

- [ ] **Step 3: Rewrite `src/styles/components/_images.scss`**

```scss
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.gallery__item {
  background: var(--bg2);
  border: 1px solid var(--border);
  overflow: hidden;

  &--wide {
    grid-column: 1 / -1;
  }
}

.gallery__img {
  width: 100%;
  display: block;
  object-fit: cover;
  aspect-ratio: 16 / 9;
  opacity: 0.85;
  transition: opacity 0.3s;

  &:hover { opacity: 1; }
}

.gallery__caption {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text3);
  padding: 10px 14px;
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .gallery {
    grid-template-columns: 1fr;
  }

  .gallery__item--wide {
    grid-column: 1;
  }
}
```

- [ ] **Step 4: Final type-check**

```bash
npx tsc --noEmit
```

Expected: zero errors.

- [ ] **Step 5: Full browser verification**

Run `npm start` and walk through every route:

1. `/` — hero loads, about section visible, language toggle works (DE ↔ EN)
2. `/projects` — grid of 14 cards, scroll reveal, hover glow
3. `/projects/SpyFinder` — breadcrumb, badge, title, description, GitHub button, screenshots gallery
4. `/timeline` — vertical timeline, entries reveal on scroll, Materna at top
5. Mobile (DevTools → responsive): hamburger menu, stacked nav, timeline readable
