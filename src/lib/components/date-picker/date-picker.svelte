<script lang="ts">
  import {
    DatePicker as DatePickerPrimitive,
    type DatePickerOptions,
    type DatePickerState,
    type DatePickerValue,
    type ISOMonth,
  } from "@ui-sdk/svelte/date-picker"
  import type { PartProps, PopupContainer } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  const field = "[&>div:has(>[data-slot=date-picker-input])]"

  let {
    value = $bindable(),
    month = $bindable(),
    open = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", DatePickerState> &
    Omit<DatePickerOptions, "value" | "month" | "open" | "container"> & {
      value?: DatePickerValue
      month?: ISOMonth
      open?: boolean
      container?: PopupContainer
    } = $props()
</script>

<DatePickerPrimitive
  bind:value={value}
  bind:month={month}
  bind:open={open}
  class={cn(
    "flex max-w-full flex-col items-start gap-2 data-[disabled]:opacity-60",
    `${field}:flex ${field}:h-9 ${field}:w-48 ${field}:max-w-full ${field}:items-center ${field}:gap-1 ${field}:rounded-md ${field}:border ${field}:border-line ${field}:bg-surface ${field}:pe-0.5 ${field}:transition-colors`,
    `${field}:hover:border-line-strong`,
    `${field}:focus-within:outline-2 ${field}:focus-within:outline-offset-2 ${field}:focus-within:outline-ring`,
    `${field}:has(>[data-slot=date-picker-input]~[data-slot=date-picker-input]):w-64`,
    "[&:has([aria-invalid=true])>div:has(>[data-slot=date-picker-input])]:border-danger",
    "[&[data-readonly]>div:has(>[data-slot=date-picker-input])]:bg-elevated",
    className,
  )}
  {...rest}
/>