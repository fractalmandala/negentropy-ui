<script lang="ts">
  import {
    AutocompleteStatus as AutocompleteStatusPrimitive,
    type AutocompleteStatusState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", AutocompleteStatusState> = $props()
</script>

<AutocompleteStatusPrimitive
  class={cn("shrink-0 border-t border-line px-2 pt-1.5 pb-0.5 text-xs text-muted empty:hidden", className)}
  {...rest}
/>