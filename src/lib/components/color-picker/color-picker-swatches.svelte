<script lang="ts">
  import {
    ColorPickerSwatches as ColorPickerSwatchesPrimitive,
    type ColorPickerState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ColorPickerState> = $props()
</script>

<ColorPickerSwatchesPrimitive class={cn("grid grid-cols-8 gap-2", className)} {...rest} />