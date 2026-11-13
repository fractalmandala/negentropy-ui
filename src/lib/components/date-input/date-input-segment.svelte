<script lang="ts">
  import {
    DateInputSegment as DateInputSegmentPrimitive,
    type DateInputSegmentProps,
    type DateInputSegmentState,
  } from "@ui-sdk/svelte/date-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", DateInputSegmentState> & DateInputSegmentProps = $props()
</script>

<DateInputSegmentPrimitive
  class={cn(
    "box-content rounded-sm border-0 bg-transparent px-0.5 text-center [font:inherit] caret-transparent outline-none selection:bg-transparent placeholder:text-muted",
    "[&:not([data-type=literal])]:text-inherit",
    "focus:bg-accent focus:text-accent-fg focus:placeholder:text-accent-fg",
    "data-[type=month]:w-[2ch] data-[type=day]:w-[2ch] data-[type=hour]:w-[2ch] data-[type=minute]:w-[2ch] data-[type=second]:w-[2ch]",
    "data-[type=year]:w-[4ch] data-[type=dayPeriod]:w-[2.6ch]",
    "data-[type=literal]:w-auto data-[type=literal]:whitespace-pre data-[type=literal]:text-muted",
    className,
  )}
  {...rest}
/>