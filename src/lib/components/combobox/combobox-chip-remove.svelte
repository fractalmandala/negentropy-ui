<script lang="ts">
  import { ComboboxChipRemove as ComboboxChipRemovePrimitive, type ComboboxClearState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"button", ComboboxClearState> = $props()
</script>

<ComboboxChipRemovePrimitive
  class={cn(
    "inline-flex size-4 items-center justify-center rounded-xs text-muted transition-colors hover:bg-line hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring data-[disabled]:pointer-events-none [&_svg]:size-3",
    className,
  )}
  {...rest}
/>