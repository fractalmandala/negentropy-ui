<script lang="ts">
  import {
    AutocompleteInput as AutocompleteInputPrimitive,
    type AutocompleteInputState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"input", AutocompleteInputState> = $props()
</script>

<AutocompleteInputPrimitive
  class={cn(
    "h-9 w-full min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-fg transition-colors placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[readonly]:bg-elevated [&::-webkit-search-cancel-button]:appearance-none",
    className,
  )}
  {...rest}
/>