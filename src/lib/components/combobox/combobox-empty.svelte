<script lang="ts">
  import { ComboboxEmpty as ComboboxEmptyPrimitive, type ComboboxEmptyState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", ComboboxEmptyState> = $props()
</script>

<ComboboxEmptyPrimitive
  class={cn("px-2 py-6 text-center text-sm text-muted", className)}
  {...rest}
/>