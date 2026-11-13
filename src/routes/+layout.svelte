<script lang="ts">
  import "../app.css"
  import { page } from "$app/state"
  import registry from "#lib/registry.json"
  import { Menu, X, Moon, Sun, Search } from "@lucide/svelte"

  let { children } = $props()

  let sidebarOpen = $state(false)
  let query = $state("")
  let theme = $state<"dark" | "light">("dark")

  $effect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme
    }
  })

  const grouped = $derived.by(() => {
    const q = query.trim().toLowerCase()
    const match = (c: { name: string; slug: string; description: string }) =>
      !q || c.name.toLowerCase().includes(q) || c.slug.includes(q) || c.description.toLowerCase().includes(q)
    return registry.categories
      .map((cat) => ({
        cat,
        items: registry.components.filter((c) => c.category === cat && match(c)),
      }))
      .filter((g) => g.items.length > 0)
  })

  const current = $derived(page.url.pathname)

  const guides = [
    { href: "/docs", label: "Overview" },
    { href: "/docs/getting-started", label: "Getting started" },
    { href: "/docs/theming", label: "Theming" },
    { href: "/docs/patterns", label: "Usage patterns" },
  ]
</script>

<div class="min-h-screen">
  <!-- Top bar -->
  <header class="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
    <div class="flex h-14 items-center gap-3 px-4">
      <button
        type="button"
        class="rounded-md p-2 text-muted hover:bg-elevated hover:text-fg lg:hidden"
        onclick={() => (sidebarOpen = !sidebarOpen)}
        aria-label="Toggle navigation"
      >
        {#if sidebarOpen}<X size={18} />{:else}<Menu size={18} />{/if}
      </button>

      <a href="/" class="flex items-center gap-2.5">
        <span class="flex h-7 w-7 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-accent-fg">N</span>
        <span class="text-[15px] font-semibold tracking-tight">Negentropy UI</span>
      </a>

      <span class="hidden rounded-full border border-line bg-elevated px-2 py-0.5 font-mono text-[11px] text-muted sm:inline">
        {registry.count} components
      </span>

      <div class="ml-auto flex items-center gap-2">
        <span class="hidden font-mono text-[11px] text-faint md:inline">powered by ui-sdk</span>
        <button
          type="button"
          class="rounded-md p-2 text-muted transition-colors hover:bg-elevated hover:text-fg"
          onclick={() => (theme = theme === "dark" ? "light" : "dark")}
          aria-label="Toggle color theme"
        >
          {#if theme === "dark"}<Sun size={17} />{:else}<Moon size={17} />{/if}
        </button>
      </div>
    </div>
  </header>

  <div class="mx-auto flex max-w-[1400px]">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-30 w-72 transform border-r border-line bg-bg pt-14 transition-transform lg:sticky lg:top-14 lg:z-0 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 lg:pt-0 {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
    >
      <div class="flex h-full flex-col overflow-y-auto p-4">
        <div class="relative mb-4">
          <Search size={15} class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="search"
            bind:value={query}
            placeholder="Search components…"
            class="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-3 text-sm text-fg placeholder:text-faint focus-visible:outline-2 focus-visible:outline-ring"
            aria-label="Search components"
          />
        </div>

        <nav class="space-y-5" aria-label="Documentation">
          <div>
            <h2 class="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-faint">Guides</h2>
            <ul class="space-y-0.5">
              {#each guides as g (g.href)}
                {@const active = current === g.href}
                <li>
                  <a
                    href={g.href}
                    onclick={() => (sidebarOpen = false)}
                    class="block rounded-md px-2 py-1.5 text-[13px] transition-colors {active ? 'bg-accent-soft font-medium text-accent' : 'text-muted hover:bg-elevated hover:text-fg'}"
                    aria-current={active ? "page" : undefined}
                  >
                    {g.label}
                  </a>
                </li>
              {/each}
            </ul>
          </div>

          {#each grouped as group (group.cat)}
            <div>
              <h2 class="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-faint">{group.cat}</h2>
              <ul class="space-y-0.5">
                {#each group.items as c (c.slug)}
                  {@const active = current === `/docs/${c.slug}`}
                  <li>
                    <a
                      href={`/docs/${c.slug}`}
                      onclick={() => (sidebarOpen = false)}
                      class="block rounded-md px-2 py-1.5 text-[13px] transition-colors {active ? 'bg-accent-soft font-medium text-accent' : 'text-muted hover:bg-elevated hover:text-fg'}"
                      aria-current={active ? "page" : undefined}
                    >
                      {c.name}
                    </a>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </nav>
      </div>
    </aside>

    {#if sidebarOpen}
      <button
        type="button"
        class="fixed inset-0 z-20 bg-black/50 lg:hidden"
        onclick={() => (sidebarOpen = false)}
        aria-label="Close navigation"
      ></button>
    {/if}

    <!-- Content -->
    <main class="min-w-0 flex-1 px-5 py-8 lg:px-10">
      <div class="mx-auto max-w-3xl">
        {@render children()}
      </div>
    </main>
  </div>
</div>