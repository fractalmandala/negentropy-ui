<script lang="ts">
  import type { Snippet } from "svelte"
  import { Code2 } from "@lucide/svelte"
  import CodeBlock from "./CodeBlock.svelte"

  let {
    title,
    description,
    code,
    lang = "svelte",
    children,
  }: {
    title?: string
    description?: string
    code: string
    lang?: string
    children: Snippet
  } = $props()

  let showCode = $state(false)
</script>

<!-- data-demo is the deterministic marker the validator counts. -->
<div data-demo class="overflow-hidden rounded-xl border border-line bg-surface">
  {#if title || description}
    <div class="border-b border-line px-5 py-3">
      {#if title}<h3 class="text-sm font-semibold text-fg">{title}</h3>{/if}
      {#if description}<p class="mt-0.5 text-sm text-muted">{description}</p>{/if}
    </div>
  {/if}

  <div class="flex min-h-32 flex-wrap items-center justify-center gap-4 p-8" data-demo-preview>
    {@render children()}
  </div>

  <div class="flex items-center justify-end border-t border-line px-3 py-2">
    <button
      type="button"
      onclick={() => (showCode = !showCode)}
      class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:bg-elevated hover:text-fg"
      aria-expanded={showCode}
    >
      <Code2 size={14} aria-hidden="true" />
      {showCode ? "Hide code" : "Show code"}
    </button>
  </div>

  {#if showCode}
    <div class="border-t border-line p-3">
      <CodeBlock {code} {lang} />
    </div>
  {/if}
</div>