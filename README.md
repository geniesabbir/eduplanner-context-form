# EduPlanner — Provide Context

Pixel-perfect, fully responsive implementation of the "Provide Context" form screen from the EduPlanner Figma brief.

**Stack**: Next.js 16 (App Router) · React 19 · Bootstrap 5 · SCSS · TypeScript.

---

## Getting started

Requirements: Node 20+, npm 10+.

```bash
# 1. Install
npm install

# 2. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

| Command           | Purpose                             |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server (Turbopack)    |
| `npm run build`   | Production build                    |
| `npm run start`   | Serve the production build          |
| `npm run lint`    | Lint TypeScript and JSX             |

## Environment variables

None — this is a frontend-only UI task. No backend, no APIs.

---

## Folder structure

```
src/
├── app/                       # Next.js App Router entry
│   ├── globals.scss           # Imports: base + component partials
│   ├── layout.tsx             # Root HTML shell
│   └── page.tsx               # Home route — composes the screen
├── components/
│   └── ui/                    # Presentational components
│       ├── ContentHeader.tsx
│       ├── FormActions.tsx
│       ├── FormSection.tsx
│       ├── HeaderDropdown.tsx
│       ├── ProvideContextForm.tsx   # Orchestrator — composes subcomponents
│       ├── SelectionChip.tsx
│       ├── SliderField.tsx
│       └── StepTabs.tsx
├── data/                      # Static content (options, dropdown items, step list)
│   ├── form-options.ts
│   ├── header.ts
│   └── steps.ts
├── hooks/                     # Reusable hooks
│   └── useContextForm.ts      # Form state + handlers
├── styles/
│   ├── _base.scss             # Reset + CSS custom properties
│   ├── _bootstrap.scss        # Bootstrap SCSS tokens (functions, vars, mixins)
│   ├── _mixins.scss           # @include type-style(...)
│   ├── _variables.scss        # Design tokens (palette → component tokens)
│   └── components/            # One partial per component, mobile-first
│       ├── _content-header.scss
│       ├── _form.scss
│       ├── _header-dropdown.scss
│       ├── _header.scss
│       ├── _index.scss        # Aggregator
│       ├── _selection.scss
│       ├── _shell.scss
│       ├── _slider.scss
│       └── _step-tabs.scss
└── types/                     # Shared TypeScript types
    ├── form.ts
    ├── header.ts
    └── steps.ts
```

## Styling architecture

- **Bootstrap SCSS** is imported in `_bootstrap.scss` (functions, variables, mixins only) so component partials can use `@include media-breakpoint-down(md)` and Bootstrap's `$grid-breakpoints` rather than hand-rolled breakpoint math.
- **BEM-ish class names** (`.context-form__card`, `.selection-chip--multi`) scope styles to components without a CSS-in-JS runtime.
- **Design tokens** live in `_variables.scss`, grouped into 6 layers: palette → semantic color → typography → effects → spacing → component. Change a value once, it propagates everywhere.
- **Component partials** are colocated by UI concern (`_step-tabs.scss`, `_slider.scss`, ...). Each partial contains the component's desktop styles plus its responsive overrides, so you can read one file to understand one component end-to-end.
- **Precompiled Bootstrap CSS** is still imported in `app/layout.tsx` to enable Bootstrap utility classes and reboot.

## Component architecture

- `ProvideContextForm` is a thin orchestrator — it reads state from `useContextForm`, and delegates rendering to `FormSection`, `SelectionChip`, `SliderField`, and `FormActions`.
- `useContextForm` owns all form state: defaults, clamping (`grade` ∈ [1, 12]), nearest-mark snapping for the slider, and reset/submit handlers.
- Static content (`GRADE_OPTIONS`, `SUBJECT_OPTIONS`, `STEP_TAB_ITEMS`, dropdown items) lives in `src/data/` so components are pure view logic.
- Shared types (`StepTabItem`, `HeaderDropdownItem`, `DifficultyLevel`) are in `src/types/` with no runtime dependencies.

## Responsive strategy

Three layout tiers, all driven by Bootstrap's `media-breakpoint-down`:

| Width            | Treatment                                                  |
| ---------------- | ---------------------------------------------------------- |
| ≥ 992px (lg+)    | Figma desktop layout: fixed shell, 6-col grades grid       |
| 768 – 991px (md) | Fluid containers, 4-col chip grids, stacked slider         |
| ≤ 767px          | Full-bleed, gradient header, icon-only steppers, single-column slider, column-reverse actions (Next on top) |

## Deploy

Any Next.js-compatible host works. Easiest path: push to GitHub and import in Vercel.

```bash
npm run build
npm run start
```
