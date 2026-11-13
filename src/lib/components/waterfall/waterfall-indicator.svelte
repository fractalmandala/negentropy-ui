<script lang="ts">
  import {
    WaterfallIndicator as WaterfallIndicatorPrimitive,
    type WaterfallRowPartProps,
    type WaterfallRowState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", WaterfallRowState> & WaterfallRowPartProps = $props()
</script>

<WaterfallIndicatorPrimitive
  class={cn(
    "flex shrink-0 text-muted [&>svg]:size-4 [&>svg]:transition-transform",
    "data-[expanded]:[&>svg]:rotate-90 rtl:[&>svg]:-scale-x-100",
    className,
  )}
  {...rest}
/>