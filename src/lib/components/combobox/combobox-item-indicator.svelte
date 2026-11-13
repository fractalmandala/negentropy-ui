<script lang="ts">
  import {
    ComboboxItemIndicator as ComboboxItemIndicatorPrimitive,
    type ComboboxItemIndicatorProps,
    type ComboboxItemIndicatorState,
  } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", ComboboxItemIndicatorState> & ComboboxItemIndicatorProps = $props()
</script>

<ComboboxItemIndicatorPrimitive
  class={cn("absolute end-2 flex size-3.5 items-center justify-center text-accent [&_svg]:size-3.5", className)}
  {...rest}
/>