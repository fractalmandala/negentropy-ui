<script lang="ts">
  import { AutocompleteLabel as AutocompleteLabelPrimitive } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"label"> = $props()
</script>

<AutocompleteLabelPrimitive
  class={cn("text-sm font-medium text-fg data-[disabled]:opacity-50", className)}
  {...rest}
/>