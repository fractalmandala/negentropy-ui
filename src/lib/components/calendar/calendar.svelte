<script lang="ts">
  import {
    Calendar as CalendarPrimitive,
    type CalendarOptions,
    type CalendarState,
    type CalendarValue,
    type ISOMonth,
  } from "@ui-sdk/svelte/calendar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    value = $bindable(),
    month = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", CalendarState> &
    Omit<CalendarOptions, "value" | "month"> & {
      value?: CalendarValue
      month?: ISOMonth
    } = $props()
</script>

<CalendarPrimitive
  bind:value={value}
  bind:month={month}
  class={cn(
    "flex w-fit max-w-full flex-col gap-1.5 rounded-lg border border-line bg-surface p-2.5 text-sm text-fg shadow-sm data-[disabled]:text-faint",
    className,
  )}
  {...rest}
/>