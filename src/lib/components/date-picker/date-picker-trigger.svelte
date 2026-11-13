<script lang="ts">
  import {
    DatePickerTrigger as DatePickerTriggerPrimitive,
    type DatePickerTriggerState,
  } from "@ui-sdk/svelte/date-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", DatePickerTriggerState> = $props()
</script>

<DatePickerTriggerPrimitive
  class={cn(
    "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-40 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[open]:text-fg [&_svg]:size-4",
    className,
  )}
  {...rest}
/>