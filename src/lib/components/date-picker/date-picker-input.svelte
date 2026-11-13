<script lang="ts">
  import {
    DatePickerInput as DatePickerInputPrimitive,
    type DatePickerInputProps,
    type DatePickerInputState,
  } from "@ui-sdk/svelte/date-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", DatePickerInputState> & DatePickerInputProps = $props()
</script>

<DatePickerInputPrimitive
  class={cn(
    "h-full min-w-0 flex-1 border-0 bg-transparent pe-0 ps-2.5 text-sm tabular-nums text-fg outline-none placeholder:text-muted disabled:cursor-not-allowed data-[disabled]:text-faint aria-[invalid=true]:text-danger",
    className,
  )}
  {...rest}
/>