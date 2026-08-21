# Design system & component rules

This project uses shadcn/ui (the `base-nova` style, built on Base UI — `@base-ui/react`, not Radix) as its component layer, with every color/radius/shadow centralized as CSS variables in `src/app/globals.css`. Light theme only — there is no dark mode, no `.dark` class is ever applied.

- **Never hardcode a color, radius, or shadow.** Check `src/app/globals.css` (`:root` + `@theme inline`) first. If the value you need isn't there, add it as a token in `globals.css` and consume it via a Tailwind utility (`bg-success`, `text-purple`, `shadow-card`, `rounded-sm`, etc.) — never a raw hex/`rgba()`/`px` arbitrary value in a component. Tinted/translucent variants should use Tailwind's opacity modifier on an existing token (`bg-success/10`) rather than a new hardcoded rgba.
- **Check `src/components/ui/` (shadcn primitives) and `src/components/common/` (our reusable wrappers) before writing new markup.** If shadcn has the component (button, input, checkbox, avatar, badge, table, sidebar, dropdown-menu, tooltip, sheet, collapsible, etc.), use it — don't hand-roll a `<button>`/`<input>`/status pill from scratch.
- **Never import a `ui/*` primitive directly into a page or feature component.** Customize the primitive itself (its `cva` variants in `ui/button.jsx`, `ui/input.jsx`, etc.) so its *default* look already matches Figma, and/or wrap it in a `common/` component for anything with app-specific behavior (`CommonInput`, `CommonOTPInput`, `UserAvatar`, `StatusBadge`). Feature code imports from `common/` or the customized `ui/*`, never a raw unstyled primitive.
- **Forms**: use `CommonInput` (`src/components/common/CommonInput.jsx`) for every text/email/password/textarea field — pass `type`. Password show/hide state lives inside `CommonInput`, not in the parent. Use `CommonOTPInput` for any digit-code input.
- **Icons**: prefer the Figma-exported SVGs under `public/dashboard/icons/` and `public/auth/icons/`. Only reach for `lucide-react` when Figma didn't export the icon you need (e.g. the password-hidden `EyeOff` state, or icons shadcn primitives require internally like sidebar/dropdown chevrons) — and when mixing is unavoidable for a matched pair (e.g. show/hide eye), use the same icon family for both states rather than mixing Figma + lucide within one control.
- **Images**: always `next/image`, never `<img>`, never the `unoptimized` prop. Local assets under `public/` need no remote-pattern config. Use `fill` + a sized `relative` parent for background/cover photos, explicit `width`/`height` for everything else.
- **Layouts, not wrappers**: if a visual shell wraps every page in a route group (the auth hero-split panel, the dashboard sidebar), it belongs in that group's `layout.js` — never re-imported and wrapped around each page's JSX by hand. `src/app/(auth)/layout.js` and `src/app/dashboard/layout.js` are the examples to follow.
- **Reuse, don't duplicate.** Before adding a new status-color map, badge variant, or avatar treatment, check `src/components/common/StatusBadge.jsx` / `UserAvatar.jsx` first — these exist specifically because 4+ components used to hand-roll their own copies.

## Never duplicate code — extract a reusable component

If you are about to paste, retype, or closely re-derive a block of JSX/markup that already exists elsewhere in the codebase (even with different text/props), stop and extract it into a reusable component instead. This applies at any scale — a whole page section, a form-field group, a title+description header block, a status badge, a card shell. `AuthCardHeader`, `StatusBadge`, `SearchInput`, `UserMenu`, and `FilterTabs` all exist because the same markup was found copy-pasted across 2+ files; that duplication should have been caught before it landed. Before writing new markup:

1. Grep for a similar-looking block elsewhere in `src/`.
2. If found (even once, if you're about to add a second usage), extract a component to `src/components/common/` (generic) or the relevant feature folder (`src/components/auth/`, `src/components/dashboard/`) before proceeding.
3. Never let the same visual/structural pattern exist in 3+ places as separate hand-rolled copies — that's a signal a reusable component is overdue.

## Responsiveness is mandatory, not optional

Every screen and every new component must work across mobile, tablet, and desktop widths — this is a hard requirement, not a nice-to-have. Concretely:

- Default to mobile-first Tailwind classes (unprefixed = smallest screens) and add `sm:`/`md:`/`lg:`/`xl:` overrides for larger viewports — never ship a fixed-width layout that only works at one breakpoint.
- Multi-column layouts (dashboard grids, the Financial Attention two-column panel) must stack to a single column below `lg` (`grid-cols-1 lg:grid-cols-2`), not overflow or squeeze.
- Fixed pixel widths (`w-[Npx]`) on anything that isn't a small fixed-size icon/badge are a red flag — check whether it should be `flex-1`/`w-full`/`min-w-0` with a `sm:`-gated fixed size instead (see `CommonOTPInput`'s `fixedWidth` variant for the pattern: fluid by default, fixed-width only from `sm:` up).
- Test/verify at minimum three widths before considering a screen done: ~375px (mobile), ~768px (tablet), ~1440px (desktop).
- The dashboard sidebar's built-in mobile behavior (shadcn `Sidebar` collapses to an off-canvas `Sheet` below `md`) is the reference pattern for "component that adapts by breakpoint automatically" — prefer primitives that already do this over hand-rolled `hidden md:block` toggles where possible.

## Animation convention

This project uses **Framer Motion** (`framer-motion`) for entrance/reveal animations — smooth, relaxing, premium-feeling, never abrupt or bouncy-by-default. Reusable primitives live in `src/components/common/`:

- `Reveal` — scroll-triggered fade+slide-up (`whileInView`, animates once). Use for dashboard sections/cards that appear as the user scrolls down a long page.
- `StaggerContainer` + `StaggerItem` — mount-triggered cascade (`initial`/`animate`), used for auth screens where the whole card is above the fold. Wrap the group in `StaggerContainer`, wrap each direct visual chunk (header, form, button) in `StaggerItem`. Pass `as={motion.form}` (imported from `framer-motion`, not a bare string) when the item needs to render as a real `<form>`.

Don't hand-roll a new `motion.div` with bespoke `initial`/`animate`/`variants` for a standard reveal — reuse `Reveal`/`StaggerContainer`/`StaggerItem` first. Only reach for a bespoke `motion.*` block (as `AuthCard`'s card-level scale-in and `SuccessCard`'s checkmark pop do) for a genuinely one-off entrance effect that the shared primitives don't cover.