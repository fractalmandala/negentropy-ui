<script lang="ts">
  import {
    Autocomplete as AutocompletePrimitive,
    type AutocompleteOptions,
  } from "@ui-sdk/svelte/autocomplete"
  import type { Snippet } from "svelte"

  let {
    value = $bindable(),
    open = $bindable(),
    children,
    ...rest
  }: AutocompleteOptions & { children?: Snippet } = $props()
</script>

<AutocompletePrimitive bind:value={value} bind:open={open} {...rest}>
  {@render children?.()}
</AutocompletePrimitive>