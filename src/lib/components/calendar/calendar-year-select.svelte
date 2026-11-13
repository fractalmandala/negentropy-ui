<script lang="ts">
  import {
    CalendarYearSelect as CalendarYearSelectPrimitive,
    type CalendarSelectState,
  } from "@ui-sdk/svelte/calendar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"select", CalendarSelectState> = $props()
</script>

<CalendarYearSelectPrimitive
  class={cn(
    "h-8 min-w-0 flex-1 rounded-md border border-line bg-surface px-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50 data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
/>