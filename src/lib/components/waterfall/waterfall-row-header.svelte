<script lang="ts">
  import {
    WaterfallRowHeader as WaterfallRowHeaderPrimitive,
    type WaterfallRowPartProps,
    type WaterfallRowState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", WaterfallRowState> & WaterfallRowPartProps = $props()
</script>

<WaterfallRowHeaderPrimitive
  class={cn(
    "flex min-w-24 flex-[0_1_11rem] items-center gap-1 self-stretch overflow-hidden rounded-md ps-[calc((var(--waterfall-level)-1)*1rem+1.25rem)] whitespace-nowrap outline-none",
    "data-[branch]:ps-[calc((var(--waterfall-level)-1)*1rem)]",
    "focus-visible:shadow-[inset_0_0_0_1px_var(--color-ring)]",
    className,
  )}
  {...rest}
/>