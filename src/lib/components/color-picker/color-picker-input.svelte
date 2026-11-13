<script lang="ts">
  import {
    ColorPickerInput as ColorPickerInputPrimitive,
    type ColorPickerState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", ColorPickerState, "value"> = $props()
</script>

<ColorPickerInputPrimitive
  class={cn(
    "w-full min-w-0 rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-sm text-fg transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-[disabled]:opacity-50 data-[readonly]:opacity-70",
    className,
  )}
  {...rest}
/>