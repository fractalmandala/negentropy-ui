<script lang="ts">
  import {
    ColorPicker as ColorPickerPrimitive,
    type ColorPickerOptions,
    type ColorPickerState,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", ColorPickerState> & ColorPickerOptions = $props()
</script>

<ColorPickerPrimitive
  bind:value={value}
  class={cn(
    "flex w-64 max-w-full flex-col gap-3",
    "[--color-picker-checker:repeating-conic-gradient(var(--color-line)_0_25%,var(--color-surface)_0_50%)_0_0/8px_8px]",
    className,
  )}
  {...rest}
/>