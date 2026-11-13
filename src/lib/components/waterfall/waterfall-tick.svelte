<script lang="ts">
  import {
    WaterfallTick as WaterfallTickPrimitive,
    type WaterfallTimeProps,
    type WaterfallTimeState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", WaterfallTimeState> & WaterfallTimeProps = $props()
</script>

<WaterfallTickPrimitive
  class={cn(
    "absolute inset-y-0 start-[var(--waterfall-tick)] content-center border-s border-line ps-1 text-xs whitespace-nowrap tabular-nums",
    "@max-[16rem]:[&:nth-child(even)]:text-transparent @max-[8rem]:[&:not(:first-child)]:text-transparent",
    className,
  )}
  {...rest}
/>