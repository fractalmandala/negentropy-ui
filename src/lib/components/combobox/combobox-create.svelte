<script lang="ts">
  import {
    ComboboxCreate as ComboboxCreatePrimitive,
    type ComboboxCreateProps,
    type ComboboxCreateState,
  } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ComboboxCreateState> & ComboboxCreateProps = $props()
</script>

<ComboboxCreatePrimitive
  class={cn(
    "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-accent outline-none select-none data-[highlighted]:bg-elevated data-[pending]:opacity-60 [&_svg]:size-4",
    className,
  )}
  {...rest}
/>