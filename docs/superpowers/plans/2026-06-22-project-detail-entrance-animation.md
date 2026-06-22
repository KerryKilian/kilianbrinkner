# Project Detail Entrance Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the project detail page (`/projects/:title`) fade and slide in on mount, consistent with the existing card/timeline-entry animation style.

**Architecture:** Reuse the existing "isVisible flag flipped via requestAnimationFrame after mount" pattern already used in `ProjectCard.tsx` and `TimelineEntry.tsx`. Add a CSS modifier class with the transition.

**Tech Stack:** React (hooks), SCSS. No new dependencies.

## Global Constraints

- No new npm dependencies.
- Entrance animation only — no exit/unmount transition, no router changes.
- Visual verification only (no unit test framework for CSS transitions in this repo) — verify via dev server + browser.

---

### Task 1: Add entrance-animation CSS to the project detail page

**Files:**
- Modify: `src/styles/components/_project.scss`

**Interfaces:**
- Produces: CSS class `.project-detail-page` (base/hidden state) and `.project-detail-page--visible` (visible state), to be toggled from `Project.tsx` in Task 2.

- [ ] **Step 1: Read the current file to find the right insertion point**

Run: open `src/styles/components/_project.scss` and locate the top-level selector that currently styles the outer wrapper (likely `.project-detail` or similar top-of-file rule).

- [ ] **Step 2: Add the animation rule**

Add this block near the top of `src/styles/components/_project.scss` (after any `@use`/imports, before existing rules):

```scss
.project-detail-page {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;

  &--visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 3: Verify SCSS compiles**

Run: `npm run build` (or, if a dev server is already running, just confirm no Sass error appears in the terminal output).
Expected: Build succeeds with no Sass syntax errors (warnings about browserslist/caniuse-lite are pre-existing and unrelated — ignore them).

- [ ] **Step 4: Commit**

```bash
git add src/styles/components/_project.scss
git commit -m "feat: add entrance-animation styles for project detail page"
```

---

### Task 2: Wire up the visibility state in Project.tsx

**Files:**
- Modify: `src/pages/Project.tsx`

**Interfaces:**
- Consumes: CSS classes `project-detail-page` / `project-detail-page--visible` from Task 1.
- Produces: none (leaf task).

- [ ] **Step 1: Add `isVisible` state and mount effect**

In `src/pages/Project.tsx`, add a new state variable next to the existing `lightbox`/`isClosing` state (around line 19-20):

```tsx
const [isPageVisible, setIsPageVisible] = useState(false);
```

Add a new `useEffect` near the existing `document.title` effect (around line 23-25) that flips it on mount:

```tsx
useEffect(() => {
  const id = requestAnimationFrame(() => setIsPageVisible(true));
  return () => cancelAnimationFrame(id);
}, []);
```

- [ ] **Step 2: Apply the classes to the outer wrapper**

Find the root returned element (currently `<div className="page">` at the top of the JSX, around line 112) and change it to:

```tsx
<div className={`page project-detail-page${isPageVisible ? " project-detail-page--visible" : ""}`}>
```

- [ ] **Step 3: Verify TypeScript compiles and lint passes**

Run: `npm run build`
Expected: `Compiled successfully.` with no ESLint errors (this matches the exhaustive-deps fix already applied earlier in this file — the new effect has an empty dependency array `[]`, which is correct since it only runs once on mount and references no external values).

- [ ] **Step 4: Manually verify in the browser**

Run: `npm start`, open `http://localhost:3000/projects`, click into any project card, and confirm the detail page fades/slides in smoothly (no flash of fully-visible content, no layout jump, no horizontal scrollbar introduced — see the unrelated horizontal-scroll fix already in `_generic.scss`/`_card.scss` on this branch).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Project.tsx
git commit -m "feat: trigger entrance animation on project detail page mount"
```
