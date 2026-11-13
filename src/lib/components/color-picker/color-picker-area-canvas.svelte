<script lang="ts">
  import {
    ColorPickerAreaCanvas as ColorPickerAreaCanvasPrimitive,
    type ColorPickerAreaProps,
  } from "@ui-sdk/svelte/color-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"canvas", {}> & ColorPickerAreaProps = $props()
</script>

<ColorPickerAreaCanvasPrimitive class={cn("rounded-[inherit]", className)} {...rest} />