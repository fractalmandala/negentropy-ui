<script lang="ts">
  import {
    AutocompleteItemText as AutocompleteItemTextPrimitive,
    type AutocompleteItemTextState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", AutocompleteItemTextState> = $props()
</script>

<AutocompleteItemTextPrimitive
  class={cn(
    "min-w-0 flex-1 truncate data-[matched]:text-muted [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-fg",
    className,
  )}
  {...rest}
/>