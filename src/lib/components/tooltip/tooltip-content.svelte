<script lang="ts">
  import {
    TooltipContent as TooltipContentPrimitive,
    type TooltipContentProps,
    type TooltipContentState,
  } from "@ui-sdk/svelte/tooltip"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TooltipContentState> & TooltipContentProps = $props()
</script>

<TooltipContentPrimitive
  class={cn(
    "z-50 flex w-max max-w-[min(16rem,var(--available-width))] items-center gap-2 rounded-md border border-line bg-elevated px-2.5 py-1.5 text-xs leading-4 text-fg shadow-lg outline-none [transform-origin:var(--transform-origin)]",
    "transition-[opacity,scale] duration-150 ease-out data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[instant]:transition-none",
    "motion-reduce:transition-[opacity] motion-reduce:data-[starting-style]:scale-none motion-reduce:data-[ending-style]:scale-none",
    className,
  )}
  {...rest}
/>