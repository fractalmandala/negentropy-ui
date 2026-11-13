<script lang="ts">
  import { ComboboxChips as ComboboxChipsPrimitive } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<ComboboxChipsPrimitive
  class={cn(
    "flex min-h-9 w-full flex-wrap items-center gap-1 rounded-md border border-line bg-surface p-1 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring data-[disabled]:opacity-50",
    "[&_input]:h-7 [&_input]:min-w-16 [&_input]:flex-1 [&_input]:rounded-none [&_input]:border-0 [&_input]:bg-transparent [&_input]:px-1 [&_input]:outline-none",
    className,
  )}
  {...rest}
/>