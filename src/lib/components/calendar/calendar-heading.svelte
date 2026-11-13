<script lang="ts">
  import {
    CalendarHeading as CalendarHeadingPrimitive,
    type CalendarHeadingState,
  } from "@ui-sdk/svelte/calendar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"h2", CalendarHeadingState> = $props()
</script>

<CalendarHeadingPrimitive
  class={cn("text-balance text-center text-sm font-semibold text-fg", className)}
  {...rest}
/>