<script lang="ts">
  import {
    SegmentedControl as SegmentedControlPrimitive,
    type SegmentedControlOptions,
    type SegmentedControlState,
  } from "@ui-sdk/svelte/segmented-control"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    size = "md",
    class: className,
    ...rest
  }: PartProps<"div", SegmentedControlState> &
    SegmentedControlOptions & {
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<SegmentedControlPrimitive
  bind:value={value}
  data-size={size}
  class={cn(
    "group/segmented relative isolate inline-flex gap-0.5 rounded-lg bg-elevated p-0.5 data-[orientation=vertical]:flex-col data-[disabled]:opacity-60",
    className,
  )}
  {...rest}
/>