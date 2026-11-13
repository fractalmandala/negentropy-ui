<script lang="ts">
  import registry from "#lib/registry.json"
  import { ArrowRight, Boxes, Accessibility, FileCode2 } from "@lucide/svelte"

  const grouped = $derived(
    registry.categories.map((cat) => ({
      cat,
      items: registry.components.filter((c) => c.category === cat),
    })),
  )
</script>

<svelte:head>
  <title>Negentropy UI — SvelteKit components powered by ui-sdk</title>
</svelte:head>

<div class="space-y-12">
  <section class="space-y-5">
    <span class="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1 font-mono text-[11px] text-muted">
      <span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
      {registry.count} components · Svelte 5 · ui-sdk
    </span>
    <h1 class="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
      Order from chaos.<br />
      <span class="text-accent">Accessible</span> SvelteKit components.
    </h1>
    <p class="max-w-2xl text-[15px] leading-relaxed text-muted">
      Negentropy UI is a complete component library built on the Vercel
      <span class="text-fg">ui-sdk</span> — tested keyboard, focus, selection and ARIA
      behaviors, styled with a token-driven theme. Every component ships with a
      living documentation page: installation, usage, variants, props and demos.
      The documentation is the proof.
    </p>
    <div class="flex flex-wrap gap-3">
      <a
        href="/docs/getting-started"
        class="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
      >
        Getting started <ArrowRight size={16} />
      </a>
      <a
        href="/docs"
        class="inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-elevated"
      >
        Browse components
      </a>
    </div>
  </section>

  <section class="grid gap-4 sm:grid-cols-3">
    <div class="rounded-xl border border-line bg-surface p-5">
      <Boxes size={20} class="text-accent" />
      <h2 class="mt-3 text-sm font-semibold text-fg">Behavior-first</h2>
      <p class="mt-1 text-[13px] leading-relaxed text-muted">
        Built on ui-sdk primitives — the same keyboard, focus and dismissal engines,
        not reimplemented per component.
      </p>
    </div>
    <div class="rounded-xl border border-line bg-surface p-5">
      <Accessibility size={20} class="text-accent" />
      <h2 class="mt-3 text-sm font-semibold text-fg">Accessible by default</h2>
      <p class="mt-1 text-[13px] leading-relaxed text-muted">
        WAI-ARIA patterns, right-to-left and server rendering come from the core.
        Each page documents its keyboard model.
      </p>
    </div>
    <div class="rounded-xl border border-line bg-surface p-5">
      <FileCode2 size={20} class="text-accent" />
      <h2 class="mt-3 text-sm font-semibold text-fg">Documented as proof</h2>
      <p class="mt-1 text-[13px] leading-relaxed text-muted">
        No component is done without a complete, rendering docs page. A script
        gate enforces it on every build.
      </p>
    </div>
  </section>

  {#each grouped as group (group.cat)}
    <section>
      <h2 class="mb-3 text-sm font-semibold uppercase tracking-wider text-faint">{group.cat}</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        {#each group.items as c (c.slug)}
          <a
            href={`/docs/${c.slug}`}
            class="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-elevated"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-[15px] font-semibold text-fg group-hover:text-accent">{c.name}</h3>
              <ArrowRight size={15} class="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
            <p class="mt-1 text-[13px] leading-relaxed text-muted">{c.description}</p>
          </a>
        {/each}
      </div>
    </section>
  {/each}
</div>