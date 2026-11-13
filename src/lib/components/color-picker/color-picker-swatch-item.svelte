<script lang="ts">
  import {
    ColorPickerSwatchItem as ColorPickerSwatchItemPrimitive,
    type ColorPickerSwatchItemProps,
    type ColorPickerSwatchItemState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", ColorPickerSwatchItemState, "type" | "onclick"> &
    ColorPickerSwatchItemProps = $props()
</script>

<ColorPickerSwatchItemPrimitive
  class={cn(
    "aspect-square w-full cursor-pointer rounded-md p-0 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.2)] transition-shadow",
    "[background:linear-gradient(var(--color-picker-color),var(--color-picker-color)),var(--color-picker-checker)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "data-[selected]:shadow-[inset_0_0_0_1px_rgb(0_0_0/0.2),0_0_0_2px_var(--color-surface),0_0_0_3.5px_var(--color-fg)]",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
/>