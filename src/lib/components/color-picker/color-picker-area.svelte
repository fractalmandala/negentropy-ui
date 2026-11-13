<script lang="ts">
  import {
    ColorPickerArea as ColorPickerAreaPrimitive,
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

<ColorPickerAreaPrimitive
  class={cn(
    "relative h-40 cursor-crosshair rounded-md shadow-[inset_0_0_0_1px_var(--color-line)]",
    "[background:var(--color-area-background,var(--color-picker-checker))]",
    "data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[readonly]:cursor-default",
    className,
  )}
  {...rest}
/>