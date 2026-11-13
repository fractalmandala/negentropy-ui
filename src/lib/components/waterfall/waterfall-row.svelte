<script lang="ts">
  import {
    WaterfallRow as WaterfallRowPrimitive,
    type WaterfallRowProps,
    type WaterfallRowState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", WaterfallRowState> & WaterfallRowProps = $props()
</script>

<WaterfallRowPrimitive
  class={cn(
    "flex h-8 cursor-default items-center gap-2 rounded-md px-2 outline-none select-none [&[hidden]]:hidden",
    "hover:not-data-[selected]:bg-elevated/60 data-[selected]:bg-elevated data-[level='1']:font-medium",
    "focus-visible:shadow-[inset_0_0_0_1px_var(--color-ring)]",
    className,
  )}
  {...rest}
/>