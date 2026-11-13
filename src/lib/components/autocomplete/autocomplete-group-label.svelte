<script lang="ts">
  import { AutocompleteGroupLabel as AutocompleteGroupLabelPrimitive } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<AutocompleteGroupLabelPrimitive
  class={cn("px-2 py-1.5 text-xs font-medium text-faint", className)}
  {...rest}
/>