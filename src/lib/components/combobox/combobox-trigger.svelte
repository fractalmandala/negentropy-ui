<script lang="ts">
  import { ComboboxTrigger as ComboboxTriggerPrimitive, type ComboboxTriggerState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"button", ComboboxTriggerState> = $props()
</script>

<ComboboxTriggerPrimitive
  class={cn(
    "inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[open]:bg-elevated data-[open]:text-fg [&_svg]:size-4",
    className,
  )}
  {...rest}
/>