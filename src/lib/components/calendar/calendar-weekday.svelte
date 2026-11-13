<script lang="ts">
  import {
    CalendarWeekday as CalendarWeekdayPrimitive,
    type CalendarWeekdayProps,
    type CalendarWeekdayState,
  } from "@ui-sdk/svelte/calendar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"th", CalendarWeekdayState> & CalendarWeekdayProps = $props()
</script>

<CalendarWeekdayPrimitive
  class={cn("h-7 w-8 text-center text-xs font-normal text-muted", className)}
  {...rest}
/>