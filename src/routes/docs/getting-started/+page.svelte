<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock } from "#lib/docs"
  import { Button } from "#lib/components/button"
  import { Switch } from "#lib/components/switch"
  import { ArrowRight, Download, Rocket, SwatchBook } from "@lucide/svelte"

  let notifications = $state(true)

  const installCode = `# from the package root
pnpm install
pnpm dev        # docs site on http://localhost:5173`

  const depsCode = `{
  "dependencies": {
    "@ui-sdk/core": "0.1.0-beta.1",
    "@ui-sdk/svelte": "0.1.0-beta.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  }
}`

  const npmInstallCode = `# in your own SvelteKit + Tailwind v4 app
npm install @fractaldesign/negentropy-ui`

  const npmCssCode = `/* src/app.css — processed by Tailwind v4 */
@import "tailwindcss";
@import "@fractaldesign/negentropy-ui/theme.css";
@source "../node_modules/@fractaldesign/negentropy-ui/dist";`

  const npmUseCode = `<script lang="ts">
  import { Button } from "@fractaldesign/negentropy-ui/button"
<\/script>

<Button tone="solid">Ship it</Button>`

  const buttonCode = `<script lang="ts">
  import { Button } from "#lib/components/button"
<\/script>

<Button>Save changes</Button>
<Button tone="outline">Cancel</Button>
<Button tone="ghost">Skip</Button>`

  const switchCode = `<script lang="ts">
  import { Switch } from "#lib/components/switch"
  let notifications = $state(true)
<\/script>

<label class="flex items-center gap-3 text-sm text-fg">
  <Switch bind:checked={notifications} />
  Notifications {notifications ? "on" : "off"}
</label>`

  const requirements = [
    { tool: "Node.js", min: "20.19+ / 22.12+", why: "Vite 7 runtime" },
    { tool: "pnpm", min: "10+", why: "workspace install and scripts" },
    { tool: "Svelte", min: "5", why: "runes: $props, $state, $bindable" },
    { tool: "SvelteKit", min: "2", why: "routing and prerender for the docs" },
    { tool: "Tailwind CSS", min: "4", why: "the @theme inline token mapping" },
  ]
</script>

<svelte:head>
  <title>Getting started — Negentropy UI</title>
</svelte:head>

<div class="space-y-10">
  <PageHeader
    title="Getting started"
    description="Install Negentropy UI, run the docs site, and render your first component. Every component is a thin styled wrapper over a ui-sdk behavior, so you get tested keyboard, focus and ARIA handling for free."
  />

  <Section id="overview" title="Overview">
    <p class="text-sm leading-relaxed text-muted">
      Negentropy UI is a complete SvelteKit component library powered by the Vercel
      <span class="text-fg">ui-sdk</span>. The ui-sdk supplies the behavior — keyboard
      navigation, focus management, selection, dismissal and the ARIA they need — and
      Negentropy adds a token-driven theme on top. Wrappers never reimplement behavior;
      they forward every prop to the ui-sdk part and add classes and variant props.
    </p>
    <p class="text-sm leading-relaxed text-muted">
      A component and its documentation are one. No component is done until its docs page
      is real, complete and renders — a script gate enforces that on every build. The
      pages you are reading are the proof.
    </p>
  </Section>

  <Section id="requirements" title="Requirements">
    <div class="overflow-x-auto rounded-lg border border-line">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-line bg-elevated text-xs uppercase tracking-wider text-faint">
          <tr>
            <th class="px-4 py-2.5 font-semibold">Tool</th>
            <th class="px-4 py-2.5 font-semibold">Minimum</th>
            <th class="px-4 py-2.5 font-semibold">Why</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-line">
          {#each requirements as r (r.tool)}
            <tr>
              <td class="px-4 py-2.5 font-medium text-fg">{r.tool}</td>
              <td class="px-4 py-2.5 font-mono text-xs text-accent">{r.min}</td>
              <td class="px-4 py-2.5 text-muted">{r.why}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Section>

  <Section id="installation" title="Installation">
    <p class="text-sm leading-relaxed text-muted">
      Clone or copy the package into your workspace, install, and start the docs site.
      The library and its documentation live in the same SvelteKit app.
    </p>
    <CodeBlock code={installCode} lang="bash" />
    <p class="text-sm leading-relaxed text-muted">
      The runtime dependencies are small — the ui-sdk pair plus two class-merging helpers.
      There are no other runtime dependencies.
    </p>
    <CodeBlock code={depsCode} lang="json" />
    <p class="text-sm leading-relaxed text-muted">
      To use Negentropy in your own SvelteKit + Tailwind v4 app, install it from npm.
      <code class="font-mono text-accent">svelte ^5</code> is a peer dependency; the ui-sdk
      pair and the two class-merging helpers come in as dependencies.
    </p>
    <CodeBlock code={npmInstallCode} lang="bash" />
    <p class="text-sm leading-relaxed text-muted">
      Import the theme and scan the package in your Tailwind-processed CSS so its utility
      classes are generated, then import a component from its subpath (or the root entry).
    </p>
    <CodeBlock code={npmCssCode} lang="css" />
    <CodeBlock code={npmUseCode} lang="svelte" />
  </Section>

  <Section id="first-component" title="Your first component">
    <p class="text-sm leading-relaxed text-muted">
      Import a wrapper from <code class="font-mono text-accent">#lib/components/&lt;name&gt;</code>
      and compose it. Here is a Button in three tones.
    </p>
    <Demo title="Button" description="Import from #lib/components/button and render. Tones are a wrapper prop; behavior comes from ui-sdk." code={buttonCode}>
      <div class="flex flex-wrap items-center gap-3">
        <Button>Save changes</Button>
        <Button tone="outline">Cancel</Button>
        <Button tone="ghost">Skip</Button>
      </div>
    </Demo>
    <p class="text-sm leading-relaxed text-muted">
      Controlled state uses Svelte 5 runes. Bind <code class="font-mono text-accent">checked</code>
      with <code class="font-mono text-accent">bind:</code> and the wrapper chains the two-way
      binding through to the ui-sdk part.
    </p>
    <Demo title="Controlled Switch" description="bind:checked keeps the parent state and the component in sync." code={switchCode}>
      <label class="flex items-center gap-3 text-sm text-fg">
        <Switch bind:checked={notifications} />
        Notifications {notifications ? "on" : "off"}
      </label>
    </Demo>
  </Section>

  <Section id="next-steps" title="Next steps">
    <div class="grid gap-3 sm:grid-cols-3">
      <a href="/docs/theming" class="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-elevated">
        <SwatchBook size={18} class="text-accent" />
        <h3 class="mt-2 flex items-center gap-1.5 text-sm font-semibold text-fg group-hover:text-accent">Theming <ArrowRight size={14} /></h3>
        <p class="mt-1 text-[13px] leading-relaxed text-muted">The semantic tokens, dark and light, and how to recolor the whole library.</p>
      </a>
      <a href="/docs/patterns" class="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-elevated">
        <Rocket size={18} class="text-accent" />
        <h3 class="mt-2 flex items-center gap-1.5 text-sm font-semibold text-fg group-hover:text-accent">Usage patterns <ArrowRight size={14} /></h3>
        <p class="mt-1 text-[13px] leading-relaxed text-muted">Parts, class merging, render and children snippets, controlled state and data attributes.</p>
      </a>
      <a href="/docs/button" class="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-elevated">
        <Download size={18} class="text-accent" />
        <h3 class="mt-2 flex items-center gap-1.5 text-sm font-semibold text-fg group-hover:text-accent">Browse components <ArrowRight size={14} /></h3>
        <p class="mt-1 text-[13px] leading-relaxed text-muted">Every component page has installation, usage, demos, variants, API and accessibility.</p>
      </a>
    </div>
  </Section>
</div>