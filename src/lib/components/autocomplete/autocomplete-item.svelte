<script lang="ts">
  import {
    AutocompleteItem as AutocompleteItemPrimitive,
    type AutocompleteItemProps,
    type AutocompleteItemState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", AutocompleteItemState> & AutocompleteItemProps = $props()
</script>

<AutocompleteItemPrimitive
  class={cn(
    "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-fg outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-elevated",
    className,
  )}
  {...rest}
/>