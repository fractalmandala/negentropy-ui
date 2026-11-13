<script lang="ts">
  import { Check, Copy } from "@lucide/svelte"

  let { code, lang = "svelte" }: { code: string; lang?: string } = $props()

  let copied = $state(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      copied = true
      clearTimeout(timer)
      timer = setTimeout(() => (copied = false), 1600)
    } catch {
      copied = false
    }
  }
</script>

<div class="group relative overflow-hidden rounded-lg border border-line bg-[#0d0d0f]">
  <div class="flex items-center justify-between border-b border-line/70 px-3 py-1.5">
    <span class="font-mono text-[11px] uppercase tracking-wider text-faint">{lang}</span>
    <button
      type="button"
      onclick={copy}
      class="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-muted transition-colors hover:bg-elevated hover:text-fg"
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {#if copied}
        <Check size={13} aria-hidden="true" /> Copied
      {:else}
        <Copy size={13} aria-hidden="true" /> Copy
      {/if}
    </button>
  </div>
  <pre class="overflow-x-auto p-4 text-[13px] leading-relaxed"><code class="font-mono text-[#d6d6dc]">{code}</code></pre>
</div>