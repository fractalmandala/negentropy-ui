<script lang="ts">
  import {
    CalendarDay as CalendarDayPrimitive,
    type CalendarDayProps,
    type CalendarDayState,
  } from "@ui-sdk/svelte/calendar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"td", CalendarDayState> & CalendarDayProps = $props()
</script>

<CalendarDayPrimitive
  class={cn(
    "relative h-8 w-8 cursor-default select-none rounded-md text-center text-sm tabular-nums text-fg transition-colors",
    "[&:hover:not([data-outside],[data-disabled],[data-unavailable],[data-selected])]:bg-elevated",
    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
    "data-[today]:font-semibold data-[today]:text-accent",
    "data-[today]:after:absolute data-[today]:after:bottom-1 data-[today]:after:left-1/2 data-[today]:after:size-1 data-[today]:after:-translate-x-1/2 data-[today]:after:rounded-full data-[today]:after:bg-current data-[today]:after:content-['']",
    "data-[outside]:text-faint data-[disabled]:text-faint data-[unavailable]:text-muted data-[unavailable]:line-through",
    "data-[range-middle]:rounded-none data-[range-middle]:bg-accent-soft",
    "data-[range-start]:bg-accent data-[range-start]:font-semibold data-[range-start]:text-accent-fg",
    "data-[range-end]:bg-accent data-[range-end]:font-semibold data-[range-end]:text-accent-fg",
    "[&[data-range-start]:not([data-range-end])]:rounded-e-none [&[data-range-end]:not([data-range-start])]:rounded-s-none",
    "[&[data-selected]:not([data-range-start],[data-range-middle],[data-range-end])]:bg-accent [&[data-selected]:not([data-range-start],[data-range-middle],[data-range-end])]:font-medium [&[data-selected]:not([data-range-start],[data-range-middle],[data-range-end])]:text-accent-fg",
    className,
  )}
  {...rest}
/>