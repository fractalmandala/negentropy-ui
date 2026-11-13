<script lang="ts">
  import {
    ColorPickerEyeDropper as ColorPickerEyeDropperPrimitive,
    type ColorPickerState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", ColorPickerState, "type" | "onclick"> = $props()
</script>

<ColorPickerEyeDropperPrimitive
  class={cn(
    "inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-line-strong bg-transparent text-fg transition-colors",
    "hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50 data-[unsupported]:opacity-40 [&_svg]:size-4",
    className,
  )}
  {...rest}
/>