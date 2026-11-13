<script lang="ts">
  import {
    TimeInputSegment as TimeInputSegmentPrimitive,
    type TimeInputSegmentProps,
    type TimeInputSegmentState,
  } from "@ui-sdk/svelte/time-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", TimeInputSegmentState> & TimeInputSegmentProps = $props()
</script>

<TimeInputSegmentPrimitive
  class={cn(
    "box-content rounded-sm border-0 bg-transparent px-0.5 text-center [font:inherit] caret-transparent outline-none selection:bg-transparent placeholder:text-muted",
    "[&:not([data-type=literal])]:text-inherit",
    "focus:bg-accent focus:text-accent-fg focus:placeholder:text-accent-fg",
    "data-[type=hour]:w-[2ch] data-[type=minute]:w-[2ch] data-[type=second]:w-[2ch]",
    "data-[type=dayPeriod]:w-[2.6ch]",
    "data-[type=literal]:w-auto data-[type=literal]:whitespace-pre data-[type=literal]:text-muted",
    className,
  )}
  {...rest}
/>