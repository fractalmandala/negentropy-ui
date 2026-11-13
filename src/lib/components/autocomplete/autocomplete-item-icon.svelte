<script lang="ts">
  import {
    AutocompleteItemIcon as AutocompleteItemIconPrimitive,
    type AutocompleteItemIconProps,
    type AutocompleteItemIconState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", AutocompleteItemIconState> & AutocompleteItemIconProps = $props()
</script>

<AutocompleteItemIconPrimitive
  class={cn("flex shrink-0 text-muted [&_svg]:size-4", className)}
  {...rest}
/>