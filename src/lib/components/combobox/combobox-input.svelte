<script lang="ts">
  import { ComboboxInput as ComboboxInputPrimitive, type ComboboxInputState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"input", ComboboxInputState> = $props()
</script>

<ComboboxInputPrimitive
  class={cn(
    "h-9 w-full min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-fg transition-colors placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[readonly]:bg-elevated",
    className,
  )}
  {...rest}
/>