# Negentropy UI — Agent Contract

Negentropy UI is a complete SvelteKit component library powered by the Vercel
**ui-sdk** (`@ui-sdk/core` + `@ui-sdk/svelte`). It is built deterministically:
every component follows the exact same shape, and **a component and its
documentation are one**. A component is NOT done until its docs page is real,
complete, and renders. The docs are the proof.

Read this whole file before writing anything. Then read the canonical examples
in `src/lib/components/button/`, `src/lib/components/tabs/`, and
`src/lib/components/dialog/` and their docs pages — copy their shape exactly.

## The model (how ui-sdk works)

- ui-sdk ships **behaviors**, not styles. `@ui-sdk/svelte/<name>` exports a Root
  and its Parts as Svelte 5 components, e.g. `@ui-sdk/svelte/tabs` exports
  `Tabs, TabsList, TabsTab, TabsPanel, TabsIndicator`.
- Import each component from its **subpath entry**, never a root barrel:
  `import { Tabs, TabsList } from "@ui-sdk/svelte/tabs"`.
- Every part accepts:
  - normal HTML attributes (they pass through to the element),
  - `class` (merged onto the element),
  - a `render` snippet to swap the element: `{#snippet render({ props, state })}<a {...props}>…</a>{/snippet}`,
  - a `children` snippet that receives the part's `state`.
- State is exposed as **data attributes** (`data-slot`, `data-open`, `data-closed`,
  `data-pressed`, `data-checked`, `data-disabled`, `data-highlighted`,
  `data-orientation`, …) and **CSS variables**. Style from these. Never invent
  `data-state`; ui-sdk uses `data-open`/`data-checked` etc.
- Controlled vs uncontrolled: `defaultValue` to start, or `bind:value` /
  `bind:open` / `bind:checked` to control. Callbacks are `onValueChange(value, details)`,
  `onOpenChange(open, details)`, etc. `details.reason` says why; `details.cancel()` stops it.
- Negentropy wrappers are **thin**: they forward all props to the ui-sdk part and
  add classes + variant props. They do NOT reimplement behavior.

### Authoritative API sources (read these for your component)

1. `node_modules/@ui-sdk/svelte/docs/components/<name>.md` — shipped API docs
   (composition, props, data attributes, CSS variables, accessibility). Read first.
2. `node_modules/@ui-sdk/svelte/docs/llms.txt` — the index.
3. `/Users/amrit/projectguppy/vercel-ui-main/packages/svelte/src/<name>/` — the
   actual wrapper source with JSDoc on every prop (the ground truth for types).
4. `/Users/amrit/projectguppy/vercel-ui-main/examples/components/<name>/svelte/` —
   real usage examples (basic, controlled, disabled, variants, …).

## File layout contract (per component `<slug>`)

```
src/lib/components/<slug>/
  meta.json            # registry metadata (see below)
  index.ts             # barrel: export every wrapper part + re-exported types
  <slug>.svelte        # the Root wrapper (and/or <slug>-<part>.svelte per part)
src/routes/docs/<slug>/
  +page.svelte         # the documentation page (the proof)
```

- One wrapper `.svelte` per ui-sdk part. Name files kebab-case: `tabs-list.svelte`
  exports `TabsList`. The Root is `<slug>.svelte`.
- `index.ts` re-exports every wrapper and any useful types/controllers from the
  ui-sdk entry, e.g. `export { createTabsController } from "@ui-sdk/svelte/tabs"`.

### meta.json (required fields)

```json
{
  "name": "Tabs",
  "slug": "tabs",
  "description": "Layered sections of content, one shown at a time.",
  "category": "Navigation",
  "status": "stable",
  "entry": "@ui-sdk/svelte/tabs",
  "parts": ["Tabs", "TabsList", "TabsTab", "TabsPanel", "TabsIndicator"]
}
```

Categories (use exactly one): General, Forms, Date & Time, Data Display,
Feedback, Overlay, Navigation, Layout, Media.

## Wrapper pattern (canonical — proven, copy it)

Study the three pilots and copy their shape exactly:
`src/lib/components/button/` (single part), `src/lib/components/tabs/`
(multi-part + controlled `value`), `src/lib/components/dialog/` (popup +
controlled `open`). Their docs pages are the reference for the docs contract.

Type every wrapper with ui-sdk's `PartProps<Tag, State, Own>` intersected with
the component's options. `PartProps` types the element attributes, the `render`
snippet and the `children` snippet (so demos that use `render` typecheck). Import
it from `@ui-sdk/svelte`. Destructure ONLY your variant props and `class`; spread
`...rest` (which carries `children`, `render`, callbacks and every HTML attribute)
onto the ui-sdk part.

Single-part (Button):

```svelte
<script lang="ts">
  import { Button as ButtonPrimitive, type ButtonOptions, type ButtonState } from "@ui-sdk/svelte/button"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
    variants: {
      tone: {
        solid: "bg-accent text-accent-fg hover:bg-accent-hover",
        outline: "border border-line-strong bg-transparent text-fg hover:bg-elevated",
        ghost: "bg-transparent text-fg hover:bg-elevated",
      },
      size: { sm: "h-8 px-3 text-sm", md: "h-9 px-4 text-sm", lg: "h-11 px-6 text-base" },
    },
    defaults: { tone: "solid", size: "md" },
  })

  let {
    tone = "solid",
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", ButtonState, "type" | "onclick"> &
    ButtonOptions & {
      tone?: "solid" | "outline" | "ghost"
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<ButtonPrimitive class={cn(styles({ tone, size }), className)} {...rest} />
```

`Own` (the third `PartProps` argument) names attributes the part types itself,
e.g. `"type" | "onclick"` for Button. Read the ui-sdk part's source to find its
tag, State type, Own keys and any extra `…Props` type (e.g. `TabsTabProps`,
`DialogContentProps`) and intersect those too.

### Controlled roots (value / open / checked)

If the ui-sdk root has a bindable prop (`value`, `open`, `checked`, …), declare it
with `$bindable()` and forward it with `bind:` so two-way binding chains through
the wrapper. Spread the rest (including the user's `on…Change`); the ui-sdk part
handles write-back. Example (Tabs root):

```svelte
<script lang="ts">
  import { Tabs as TabsPrimitive, type TabsOptions, type TabsState } from "@ui-sdk/svelte/tabs"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  let { value = $bindable(), class: className, ...rest }:
    PartProps<"div", TabsState> & TabsOptions = $props()
</script>
<TabsPrimitive bind:value={value} class={cn("flex flex-col gap-3", className)} {...rest} />
```

Dialog root is the same with `open = $bindable()` and `bind:open={open}`; it
renders `{@render children?.()}` (no element of its own).

### Multi-part components

Wrap each ui-sdk part in its own `<slug>-<part>.svelte` (kebab-case), exporting the
Pascal name from `index.ts`. The Root is `<slug>.svelte`. Each part wrapper follows
the same `PartProps` + spread pattern. Coordinate list/tab variants with a named
Tailwind group if needed (see `tabs-list.svelte` `group/tabs` + `data-variant`, and
`tabs-tab.svelte` `group-data-[variant=…]/tabs:` selectors).

### Popups need layout CSS

ui-sdk renders NO styles. Popups (Dialog, Popover, Menu, Select, Tooltip, Drawer,
HoverCard, etc.) need positioning you must bake into the wrapper classes. Read the
reference CSS at
`/Users/amrit/projectguppy/vercel-ui-main/examples/components/<name>/<name>.css`
for the expected layout, then express it in Tailwind. Example: Dialog content is
`fixed inset-0 z-50 m-auto h-fit w-[min(28rem,calc(100%-2rem))] …` and the backdrop
is `fixed inset-0 z-50 bg-black/60`. Anchored popups (Popover/Menu/Tooltip) are
positioned by the ui-sdk popup layer via CSS variables (`--anchor-width`,
`--transform-origin`, `data-side`, `data-align`); give them a surface, border,
radius, shadow and `z-50`, and origin-aware animation if you animate.

Rules for wrappers:
- Always forward `...rest` so every HTML attribute and `render`/`children` snippet passes through.
- Always merge `class` with `cn(styles(...), className)` — user class wins.
- Add `tone`/`size`/`variant` props only where they make sense; give sensible defaults.
- Use the semantic token utilities (below). Never hardcode hex colors in wrappers.
- No comments unless a reader would get the code wrong without it (a browser quirk,
  an APG rule, a trade-off). Never comment what the code does. No JSDoc on app code.
- Svelte 5 runes only (`$props`, `$state`, `$derived`, `$bindable`). No legacy stores.

## Styling vocabulary (semantic tokens)

Use these Tailwind utilities (defined in `src/app.css`), never raw hex:

- Surfaces: `bg-bg`, `bg-surface`, `bg-elevated`
- Text: `text-fg`, `text-muted`, `text-faint`
- Borders: `border-line`, `border-line-strong`
- Accent: `bg-accent`, `text-accent`, `text-accent-fg`, `bg-accent-soft`, `hover:bg-accent-hover`
- Focus: `focus-visible:outline-ring` (or `outline-2 outline-offset-2 outline-ring`)
- Status: `text-danger`, `text-success`, `text-warning`
- Radius: `rounded-sm/md/lg/xl`; Font: `font-mono` for code.

Style ui-sdk state with attribute selectors in `class`, e.g.
`data-[open]:bg-elevated data-[checked]:bg-accent data-[disabled]:opacity-50`.
Both dark and light themes work automatically because tokens are CSS variables.

## Documentation page contract (THE PROOF)

`src/routes/docs/<slug>/+page.svelte` MUST contain these six sections, each
wrapped in `<Section id="…" title="…">` (which renders `data-section="…"`):

1. `installation` — how to install/import. Show the import from `$lib/components/<slug>`
   in a `<CodeBlock>`. Mention it wraps `@ui-sdk/svelte/<slug>`.
2. `usage` — the basic composition in a `<CodeBlock>` (copy a real example).
3. `demos` — **at least 3** live `<Demo code={…}>` blocks, each interactive and each
   showing its source via the `code` prop. Cover the primary use plus meaningful
   variations (controlled, disabled, sizes, etc.). Demos must actually work.
4. `variants` — the variant/size/state matrix. If the component has no visual
   variants, show its states (disabled, loading, sizes, orientations) as live demos
   or a table. Never leave this section empty.
5. `api` — a `<PropsTable>` per part (Root and each meaningful part): prop, type,
   default, description. Read the real types from the ui-sdk source. Include the
   wrapper's added `tone`/`size` props. Be accurate and complete.
6. `accessibility` — keyboard interaction and ARIA, taken from the ui-sdk docs
   (`docs/components/<name>.md` accessibility section). Be specific (which keys do what).

Also use `<PageHeader title description entry />` at the top.

Docs rules:
- Import the Negentropy wrappers from `$lib/components/<slug>` (NOT raw ui-sdk) in demos.
- Import docs UI from `$lib/docs` (`Demo, CodeBlock, Section, PropsTable, PageHeader`).
- The `code` string passed to `<Demo>`/`<CodeBlock>` must match the live demo.
- No TODO / placeholder / "coming soon" / lorem ipsum. Every section is real.
- Icons: `@lucide/svelte` (e.g. `import { Check } from "@lucide/svelte"`).
- Keep demos self-contained; use `$state` in the page script for controlled demos.

## Do NOT touch shared files

These are owned by the scaffold; editing them causes parallel conflicts:
`src/app.css`, `src/app.html`, `src/lib/docs/*`, `src/lib/utils/*`,
`src/routes/+layout.svelte`, `src/routes/+page.svelte`, `src/lib/registry.json`
(generated), `scripts/*`, `package.json`, configs. If you need something shared
that is missing, note it in your final report and work around it locally.

## Verify before reporting done

Run these from the package root and check EXIT CODES (not grep):

```
node scripts/build-registry.mjs        # regenerate registry from your meta.json
node scripts/validate.mjs <slug>       # structural + docs-section proof (your component)
```

Do NOT run `pnpm check` / `pnpm build` / `pnpm smoke` yourself — the orchestrator
runs those centrally after the wave (concurrent runs race on `.svelte-kit`).
Self-review your wrappers against the ui-sdk source types instead.

Report: files written, the commands you ran with exit codes, and anything the
ui-sdk docs/types left unclear.