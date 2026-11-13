<script lang="ts">
  import {
    ComboboxContent as ComboboxContentPrimitive,
    type ComboboxContentProps,
    type ComboboxContentState,
  } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ComboboxContentState> & ComboboxContentProps = $props()
</script>

<ComboboxContentPrimitive
  class={cn(
    "z-50 max-h-[min(20rem,var(--available-height))] min-w-[max(10rem,var(--anchor-width))] scroll-py-2 overflow-y-auto overscroll-contain rounded-lg border border-line bg-surface p-1 text-fg shadow-lg outline-none [transform-origin:var(--transform-origin)]",
    "transition-[opacity,transform] duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "has-[>[data-slot=combobox-list]]:flex has-[>[data-slot=combobox-list]]:flex-col has-[>[data-slot=combobox-list]]:gap-1 has-[>[data-slot=combobox-list]]:overflow-hidden",
    "data-[presentation=sheet]:mx-auto data-[presentation=sheet]:max-h-[70dvh] data-[presentation=sheet]:w-[min(36rem,100%)] data-[presentation=sheet]:min-w-0 data-[presentation=sheet]:rounded-b-none",
    className,
  )}
  {...rest}
/>