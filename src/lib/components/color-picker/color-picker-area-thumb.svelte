<script lang="ts">
  import {
    ColorPickerAreaThumb as ColorPickerAreaThumbPrimitive,
    type ColorPickerAreaProps,
    type ColorPickerState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ColorPickerState> & ColorPickerAreaProps = $props()
</script>

<ColorPickerAreaThumbPrimitive
  class={cn(
    "absolute size-4 rounded-full border-2 border-white bg-[var(--color-picker-color)]",
    "shadow-[0_0_0_1px_rgb(0_0_0/0.35),0_1px_3px_rgb(0_0_0/0.35)]",
    "[translate:-50%_-50%] rtl:[translate:50%_-50%]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-[out-of-gamut]:border-dashed",
    className,
  )}
  {...rest}
/>