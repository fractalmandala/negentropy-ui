<script lang="ts">
  import {
    ComboboxChip as ComboboxChipPrimitive,
    type ComboboxChipProps,
    type ComboboxChipState,
  } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ComboboxChipState> & ComboboxChipProps<any> = $props()
</script>

<ComboboxChipPrimitive
  class={cn(
    "inline-flex items-center gap-1 rounded-sm bg-elevated px-2 py-0.5 text-xs font-medium text-fg data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
/>