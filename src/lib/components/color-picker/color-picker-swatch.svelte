<script lang="ts">
  import {
    ColorPickerSwatch as ColorPickerSwatchPrimitive,
    type ColorPickerState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ColorPickerState> = $props()
</script>

<ColorPickerSwatchPrimitive
  class={cn(
    "size-9 shrink-0 rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.2)]",
    "[background:linear-gradient(var(--color-picker-color),var(--color-picker-color)),var(--color-picker-checker)]",
    className,
  )}
  {...rest}
/>