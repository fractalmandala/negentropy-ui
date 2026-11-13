<script lang="ts">
  import {
    AutocompleteArrow as AutocompleteArrowPrimitive,
    type AutocompleteArrowState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", AutocompleteArrowState> = $props()
</script>

<AutocompleteArrowPrimitive
  class={cn("size-2 rotate-45 border-s border-t border-line bg-surface", className)}
  {...rest}
/>