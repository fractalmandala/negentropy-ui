<script lang="ts">
  import {
    AutocompleteEmpty as AutocompleteEmptyPrimitive,
    type AutocompleteEmptyState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", AutocompleteEmptyState> = $props()
</script>

<AutocompleteEmptyPrimitive
  class={cn("px-2 py-6 text-center text-sm text-muted", className)}
  {...rest}
/>