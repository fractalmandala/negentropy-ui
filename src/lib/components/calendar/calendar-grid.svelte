<script lang="ts">
  import {
    CalendarGrid as CalendarGridPrimitive,
    type CalendarGridProps,
    type CalendarGridState,
  } from "@ui-sdk/svelte/calendar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"table", CalendarGridState> & CalendarGridProps = $props()
</script>

<CalendarGridPrimitive
  class={cn(
    "w-auto border-separate border-spacing-y-0.5 [&_td]:border-0 [&_td]:p-0 [&_th]:border-0 [&_th]:p-0",
    className,
  )}
  {...rest}
/>