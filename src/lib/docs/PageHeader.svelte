<script lang="ts">
  let {
    title,
    description,
    entry,
  }: { title: string; description: string; entry?: string } = $props()
</script>

<header class="border-b border-line pb-6">
  <div class="flex flex-wrap items-center gap-3">
    <h1 class="text-3xl font-bold tracking-tight text-fg">{title}</h1>
    {#if entry}
      <code class="rounded-md border border-line bg-elevated px-2 py-1 font-mono text-xs text-muted">{entry}</code>
    {/if}
  </div>
  <p class="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{description}</p>
</header>