<script lang="ts">
  import {
    WaterfallMark as WaterfallMarkPrimitive,
    type WaterfallTimeProps,
    type WaterfallTimeState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", WaterfallTimeState> & WaterfallTimeProps = $props()
</script>

<WaterfallMarkPrimitive
  class={cn(
    "pointer-events-none absolute top-0 start-[var(--waterfall-mark)] h-screen border-s border-dashed border-danger ps-1 text-xs whitespace-nowrap text-danger data-[outside]:hidden",
    className,
  )}
  {...rest}
/>