<script lang="ts">
  import { PageHeader, Section, Demo } from "$lib/docs"
  import { Button } from "$lib/components/button"
  import { Switch } from "$lib/components/switch"
  import registry from "$lib/registry.json"
  import { ArrowRight, BookOpen, SwatchBook, Rocket } from "@lucide/svelte"

  let enabled = $state(true)

  const tryCode = `<script lang="ts">
  import { Button } from "$lib/components/button"
  import { Switch } from "$lib/components/switch"
  let enabled = $state(true)
<\/script>

<Button>Get started</Button>
<label class="flex items-center gap-3 text-sm text-fg">
  <Switch bind:checked={enabled} />
  Enabled {enabled ? "yes" : "no"}
</label>`

  const guides = [
    {
      href: "/docs/getting-started",
      title: "Getting started",
      description: "Install, run the docs site, and render your first component.",
      icon: BookOpen,
    },
    {
      href: "/docs/theming",
      title: "Theming",
      description: "The semantic tokens, dark and light, and how to recolor everything.",
      icon: SwatchBook,
    },
    {
      href: "/docs/patterns",
      title: "Usage patterns",
      description: "Parts, class merging, snippets, controlled state and data attributes.",
      icon: Rocket,
    },
  ]
</script>

<svelte:head>
  <title>Documentation — Negentropy UI</title>
</svelte:head>

<div class="space-y-10">
  <PageHeader
    title="Documentation"
    description="Negentropy UI is a complete SvelteKit component library powered by the Vercel ui-sdk. Start with the guides, then browse any component — each page carries installation, usage, demos, variants, API and accessibility."
  />

  <Section id="overview" title="The documentation is the proof">
    <p class="text-sm leading-relaxed text-muted">
      A component and its documentation are one. No component is done until its docs page is
      real, complete and renders — a script gate enforces that on every build. Try a couple of
      components right here.
    </p>
    <Demo title="Try it" description="A Button and a controlled Switch, imported from $lib/components." code={tryCode}>
      <div class="flex flex-wrap items-center gap-5">
        <Button>Get started</Button>
        <label class="flex items-center gap-3 text-sm text-fg">
          <Switch bind:checked={enabled} />
          Enabled {enabled ? "yes" : "no"}
        </label>
      </div>
    </Demo>
  </Section>

  <Section id="guides" title="Guides">
    <div class="grid gap-3 sm:grid-cols-3">
      {#each guides as g (g.href)}
        <a href={g.href} class="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-elevated">
          <g.icon size={18} class="text-accent" />
          <h3 class="mt-2 flex items-center gap-1.5 text-sm font-semibold text-fg group-hover:text-accent">
            {g.title} <ArrowRight size={14} />
          </h3>
          <p class="mt-1 text-[13px] leading-relaxed text-muted">{g.description}</p>
        </a>
      {/each}
    </div>
  </Section>

  <Section id="catalog" title="Component catalog">
    <p class="text-sm leading-relaxed text-muted">
      {registry.count} components across {registry.categories.length} categories. The full catalog
      with descriptions lives on the home page; the sidebar lists every component.
    </p>
    <div class="flex flex-wrap gap-2">
      {#each registry.categories as cat (cat)}
        <span class="rounded-full border border-line bg-elevated px-3 py-1 text-xs text-muted">{cat}</span>
      {/each}
    </div>
    <a
      href="/"
      class="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
    >
      Browse all {registry.count} components <ArrowRight size={16} />
    </a>
  </Section>
</div>