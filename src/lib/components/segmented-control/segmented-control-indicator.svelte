<script lang="ts">
  import {
    SegmentedControlIndicator as SegmentedControlIndicatorPrimitive,
    type SegmentedControlIndicatorState,
  } from "@ui-sdk/svelte/segmented-control"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", SegmentedControlIndicatorState> = $props()
</script>

<SegmentedControlIndicatorPrimitive
  class={cn(
    "absolute top-[var(--segmented-control-indicator-top)] left-[var(--segmented-control-indicator-left)] z-0 h-[var(--segmented-control-indicator-height)] w-[var(--segmented-control-indicator-width)] rounded-md bg-surface shadow-sm transition-[top,left,width,height] duration-200",
    className,
  )}
  {...rest}
/>