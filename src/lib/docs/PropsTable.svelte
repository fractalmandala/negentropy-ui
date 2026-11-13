<script lang="ts">
  export type PropRow = {
    name: string
    type: string
    default?: string
    description: string
  }

  let { rows, caption }: { rows: PropRow[]; caption?: string } = $props()
</script>

<div class="overflow-x-auto rounded-xl border border-line">
  <table class="w-full border-collapse text-left text-sm">
    {#if caption}
      <caption class="border-b border-line bg-elevated px-4 py-2 text-left font-mono text-xs text-muted">
        {caption}
      </caption>
    {/if}
    <thead>
      <tr class="border-b border-line bg-elevated/60 text-xs uppercase tracking-wide text-faint">
        <th class="px-4 py-2.5 font-medium">Prop</th>
        <th class="px-4 py-2.5 font-medium">Type</th>
        <th class="px-4 py-2.5 font-medium">Default</th>
        <th class="px-4 py-2.5 font-medium">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each rows as row (row.name)}
        <tr class="border-b border-line/60 last:border-0 align-top">
          <td class="px-4 py-2.5 font-mono text-[13px] text-accent">{row.name}</td>
          <td class="px-4 py-2.5 font-mono text-[12px] text-muted">{row.type}</td>
          <td class="px-4 py-2.5 font-mono text-[12px] text-faint">{row.default ?? "—"}</td>
          <td class="px-4 py-2.5 text-[13px] text-muted">{row.description}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>