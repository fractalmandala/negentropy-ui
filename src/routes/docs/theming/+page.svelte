<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock } from "$lib/docs"
  import { Button } from "$lib/components/button"
  import { Switch } from "$lib/components/switch"
  import { Progress, ProgressLabel, ProgressValue, ProgressTrack, ProgressIndicator } from "$lib/components/progress"

  let enabled = $state(true)

  const tokens = [
    { name: "bg", utility: "bg-bg", dark: "#0a0a0b", light: "#fbfbfc", role: "Page background" },
    { name: "surface", utility: "bg-surface", dark: "#121214", light: "#ffffff", role: "Cards and panels" },
    { name: "elevated", utility: "bg-elevated", dark: "#1a1a1e", light: "#f4f4f6", role: "Hover and raised surfaces" },
    { name: "line", utility: "border-line", dark: "#26262b", light: "#e4e4e8", role: "Default borders" },
    { name: "line-strong", utility: "border-line-strong", dark: "#3a3a41", light: "#cfcfd6", role: "Emphasized borders" },
    { name: "fg", utility: "text-fg", dark: "#ededf0", light: "#18181b", role: "Primary text" },
    { name: "muted", utility: "text-muted", dark: "#9b9ba3", light: "#5c5c66", role: "Secondary text" },
    { name: "faint", utility: "text-faint", dark: "#6b6b73", light: "#8a8a93", role: "Tertiary text and hints" },
    { name: "accent", utility: "bg-accent / text-accent", dark: "#3ecf8e", light: "#0f9d63", role: "Brand and selection" },
    { name: "accent-hover", utility: "hover:bg-accent-hover", dark: "#57dca0", light: "#0c8552", role: "Accent hover" },
    { name: "accent-fg", utility: "text-accent-fg", dark: "#04150d", light: "#ffffff", role: "Text on accent" },
    { name: "accent-soft", utility: "bg-accent-soft", dark: "#10261c", light: "#e3f5ec", role: "Tinted accent surface" },
    { name: "ring", utility: "outline-ring", dark: "#3ecf8e", light: "#0f9d63", role: "Focus outline" },
    { name: "danger", utility: "text-danger / bg-danger", dark: "#f0616d", light: "#d64550", role: "Destructive actions" },
    { name: "danger-fg", utility: "text-danger-fg", dark: "#1a0608", light: "#ffffff", role: "Text on danger" },
    { name: "success", utility: "text-success", dark: "#3ecf8e", light: "#0f9d63", role: "Positive status" },
    { name: "warning", utility: "text-warning", dark: "#e8b339", light: "#b9821a", role: "Caution status" },
  ]

  const mappingCode = `/* src/app.css — semantic utilities map to CSS variables */
@theme inline {
  --color-bg: var(--n-bg);
  --color-surface: var(--n-surface);
  --color-fg: var(--n-fg);
  --color-accent: var(--n-accent);
  --color-ring: var(--n-ring);
  /* …the rest of the tokens… */
}`

  const themeCode = `/* Dark is the default. Light flips the same variables. */
:root, [data-theme="dark"] {
  --n-bg: #0a0a0b;
  --n-fg: #ededf0;
  --n-accent: #3ecf8e;
  color-scheme: dark;
}
[data-theme="light"] {
  --n-bg: #fbfbfc;
  --n-fg: #18181b;
  --n-accent: #0f9d63;
  color-scheme: light;
}`

  const toggleCode = `// The docs layout flips the theme with one attribute.
document.documentElement.dataset.theme = "light" // or "dark"`

  const recolorCode = `/* your-app.css — override a token; every component follows.
   Set it for both themes so the mapping stays consistent. */
:root, [data-theme="dark"] {
  --n-accent: #7c5cff;
  --n-accent-hover: #9277ff;
  --n-accent-fg: #ffffff;
  --n-ring: #7c5cff;
}
[data-theme="light"] {
  --n-accent: #6a48f0;
  --n-accent-hover: #5a3ad6;
  --n-accent-fg: #ffffff;
  --n-ring: #6a48f0;
}`

  const stateCode = `<!-- Style ui-sdk state with attribute selectors, not JS. -->
<Switch class="data-[checked]:bg-accent data-[disabled]:opacity-50" />
<Button class="data-[pending]:cursor-wait">Save</Button>`
</script>

<svelte:head>
  <title>Theming — Negentropy UI</title>
</svelte:head>

<div class="space-y-10">
  <PageHeader
    title="Theming"
    description="Negentropy UI is colored entirely by semantic design tokens. Dark is the default; light flips the same CSS variables, so every component works in both themes without changes. Recolor the whole library by overriding a handful of variables."
  />

  <Section id="overview" title="How the theme works">
    <p class="text-sm leading-relaxed text-muted">
      Wrappers never hardcode hex colors. They use semantic Tailwind utilities like
      <code class="font-mono text-accent">bg-surface</code>, <code class="font-mono text-accent">text-fg</code>
      and <code class="font-mono text-accent">border-line</code>. Those utilities map, through
      Tailwind v4's <code class="font-mono text-accent">@theme inline</code>, to CSS variables
      prefixed <code class="font-mono text-accent">--n-</code>. Changing a variable changes every
      component that uses it.
    </p>
    <CodeBlock code={mappingCode} lang="css" />
  </Section>

  <Section id="tokens" title="The tokens">
    <p class="text-sm leading-relaxed text-muted">
      These are the real values from <code class="font-mono text-accent">src/app.css</code>.
      Use the utility, not the hex, in your own markup.
    </p>
    <div class="overflow-x-auto rounded-lg border border-line">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-line bg-elevated text-xs uppercase tracking-wider text-faint">
          <tr>
            <th class="px-4 py-2.5 font-semibold">Token</th>
            <th class="px-4 py-2.5 font-semibold">Utility</th>
            <th class="px-4 py-2.5 font-semibold">Dark</th>
            <th class="px-4 py-2.5 font-semibold">Light</th>
            <th class="px-4 py-2.5 font-semibold">Role</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-line">
          {#each tokens as t (t.name)}
            <tr>
              <td class="px-4 py-2 font-mono text-xs text-fg">{t.name}</td>
              <td class="px-4 py-2 font-mono text-xs text-accent">{t.utility}</td>
              <td class="px-4 py-2">
                <span class="inline-flex items-center gap-2 font-mono text-xs text-muted">
                  <span class="h-4 w-4 rounded border border-line-strong" style:background={t.dark}></span>
                  {t.dark}
                </span>
              </td>
              <td class="px-4 py-2">
                <span class="inline-flex items-center gap-2 font-mono text-xs text-muted">
                  <span class="h-4 w-4 rounded border border-line-strong" style:background={t.light}></span>
                  {t.light}
                </span>
              </td>
              <td class="px-4 py-2 text-muted">{t.role}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Section>

  <Section id="themes" title="Dark and light">
    <p class="text-sm leading-relaxed text-muted">
      Dark is the default on <code class="font-mono text-accent">:root</code>. Setting
      <code class="font-mono text-accent">data-theme="light"</code> on the html element flips
      every variable at once. Use the theme toggle in the top bar to see these components
      re-color live.
    </p>
    <CodeBlock code={themeCode} lang="css" />
    <Demo title="Theme-aware components" description="Button, Switch and Progress all read the same tokens. Toggle the theme in the top bar — nothing here changes." code={toggleCode}>
      <div class="flex w-full max-w-sm flex-col gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button tone="outline">Outline</Button>
          <Button tone="danger">Delete</Button>
        </div>
        <label class="flex items-center gap-3 text-sm text-fg">
          <Switch bind:checked={enabled} />
          Enabled {enabled ? "yes" : "no"}
        </label>
        <Progress value={64}>
          <ProgressLabel>Upload progress</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    </Demo>
    <CodeBlock code={toggleCode} lang="ts" />
  </Section>

  <Section id="customization" title="Customizing">
    <p class="text-sm leading-relaxed text-muted">
      To rebrand, override the accent variables for both themes in your own stylesheet.
      Every accent surface, focus ring and selected state follows automatically.
    </p>
    <CodeBlock code={recolorCode} lang="css" />
    <p class="text-sm leading-relaxed text-muted">
      State is styled with data attributes, so your overrides keep working with the
      ui-sdk state selectors. You never need to touch component internals to change color.
    </p>
    <CodeBlock code={stateCode} lang="svelte" />
  </Section>
</div>