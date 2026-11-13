<script lang="ts">
  import {
    ComboboxItemIcon as ComboboxItemIconPrimitive,
    type ComboboxItemIconProps,
    type ComboboxItemIconState,
  } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", ComboboxItemIconState> & ComboboxItemIconProps = $props()
</script>

<ComboboxItemIconPrimitive
  class={cn("flex shrink-0 text-muted [&_svg]:size-4", className)}
  {...rest}
/>