<script lang="ts">
  import {
    Waterfall as WaterfallPrimitive,
    type WaterfallOptions,
    type WaterfallState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    expanded = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", WaterfallState> & WaterfallOptions = $props()
</script>

<WaterfallPrimitive
  bind:value={value}
  bind:expanded={expanded}
  class={cn(
    "relative flex w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-line bg-surface p-1 text-sm text-fg",
    className,
  )}
  {...rest}
/>