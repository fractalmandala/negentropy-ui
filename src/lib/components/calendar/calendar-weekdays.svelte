<script lang="ts">
  import { CalendarWeekdays as CalendarWeekdaysPrimitive } from "@ui-sdk/svelte/calendar"
  import type { Snippet } from "svelte"
  import type { HTMLAttributes } from "svelte/elements"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: Omit<HTMLAttributes<HTMLTableSectionElement>, "children"> & {
    children?: Snippet<[number]>
  } = $props()
</script>

<CalendarWeekdaysPrimitive class={cn(className)} {...rest} />