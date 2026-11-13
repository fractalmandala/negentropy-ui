<script lang="ts">
  import {
    ColorPickerSlider as ColorPickerSliderPrimitive,
    type ColorPickerSliderProps,
    type ColorPickerSliderState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ColorPickerSliderState> & ColorPickerSliderProps = $props()
</script>

<ColorPickerSliderPrimitive
  class={cn(
    "relative h-3 rounded-full shadow-[inset_0_0_0_1px_var(--color-line)]",
    "[background:var(--color-slider-background)]",
    "data-[channel=alpha]:[background:var(--color-slider-background),var(--color-picker-checker)]",
    "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3",
    "data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
/>