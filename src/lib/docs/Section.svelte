<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    id,
    title,
    children,
  }: { id: string; title: string; children: Snippet } = $props()
</script>

<!-- data-section is the deterministic marker the validator requires. -->
<section data-section={id} {id} class="scroll-mt-24">
  <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-fg">
    <a href={`#${id}`} class="text-faint transition-colors hover:text-accent" aria-hidden="true">#</a>
    {title}
  </h2>
  <div class="space-y-4">
    {@render children()}
  </div>
</section>