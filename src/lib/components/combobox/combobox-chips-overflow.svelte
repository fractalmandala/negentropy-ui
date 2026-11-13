<script lang="ts">
  import {
    ComboboxChipsOverflow as ComboboxChipsOverflowPrimitive,
    type ComboboxChipsOverflowState,
  } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", ComboboxChipsOverflowState> = $props()
</script>

<ComboboxChipsOverflowPrimitive
  class={cn(
    "inline-flex items-center rounded-sm bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent",
    className,
  )}
  {...rest}
/>