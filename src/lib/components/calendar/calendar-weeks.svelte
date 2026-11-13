<script lang="ts">
  import {
    CalendarWeeks as CalendarWeeksPrimitive,
    type CalendarGridCell,
  } from "@ui-sdk/svelte/calendar"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> & {
    children?: Snippet<[CalendarGridCell]>
  } = $props()
</script>

<CalendarWeeksPrimitive class={cn(className)} {...rest} />