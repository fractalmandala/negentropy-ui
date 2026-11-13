<script lang="ts">
  import {
    AutocompleteList as AutocompleteListPrimitive,
    type AutocompleteContentState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", AutocompleteContentState> = $props()
</script>

<AutocompleteListPrimitive
  class={cn("min-h-0 flex-1 scroll-py-2 overflow-y-auto overscroll-contain outline-none", className)}
  {...rest}
/>