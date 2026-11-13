<script lang="ts">
  import {
    DatePickerPreset as DatePickerPresetPrimitive,
    type DatePickerPresetProps,
    type DatePickerPresetState,
  } from "@ui-sdk/svelte/date-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", DatePickerPresetState, "value"> & DatePickerPresetProps = $props()
</script>

<DatePickerPresetPrimitive
  class={cn(
    "inline-flex h-8 items-center justify-center rounded-md px-2.5 text-sm text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-40 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[selected]:bg-accent-soft data-[selected]:font-medium data-[selected]:text-fg",
    className,
  )}
  {...rest}
/>