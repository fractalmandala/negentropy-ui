<script lang="ts">
  import {
    DatePickerContent as DatePickerContentPrimitive,
    type DatePickerContentProps,
    type DatePickerContentState,
  } from "@ui-sdk/svelte/date-picker"
  import type { PartProps, PopupContainer } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", DatePickerContentState> &
    Omit<DatePickerContentProps, "container"> & {
      container?: PopupContainer
    } = $props()
</script>

<DatePickerContentPrimitive
  class={cn(
    "z-50 flex max-h-[var(--available-height)] max-w-[var(--available-width)] flex-col gap-1.5 overflow-y-auto rounded-lg border border-line bg-surface p-2.5 text-sm text-fg shadow-lg outline-none [transform-origin:var(--transform-origin)]",
    "transition-[opacity,scale] duration-150 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "[&>div:first-child]:flex [&>div:first-child]:items-center [&>div:first-child]:justify-between [&>div:first-child]:gap-1 [&>div:first-child]:pb-1",
    "[&>div:has(>[data-slot=date-picker-preset])]:flex [&>div:has(>[data-slot=date-picker-preset])]:flex-wrap [&>div:has(>[data-slot=date-picker-preset])]:gap-1 [&>div:has(>[data-slot=date-picker-preset])]:border-t [&>div:has(>[data-slot=date-picker-preset])]:border-line [&>div:has(>[data-slot=date-picker-preset])]:pt-1.5",
    "data-[presentation=sheet]:mx-auto data-[presentation=sheet]:max-h-[70dvh] data-[presentation=sheet]:w-[min(36rem,100%)] data-[presentation=sheet]:max-w-none data-[presentation=sheet]:scale-100 data-[presentation=sheet]:rounded-b-none",
    className,
  )}
  {...rest}
/>