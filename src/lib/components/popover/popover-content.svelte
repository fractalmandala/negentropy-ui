<script lang="ts">
  import {
    PopoverContent as PopoverContentPrimitive,
    type PopoverContentProps,
    type PopoverContentState,
  } from "@ui-sdk/svelte/popover"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", PopoverContentState> & PopoverContentProps = $props()
</script>

<PopoverContentPrimitive
  class={cn(
    "z-50 flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-3 rounded-lg border border-line bg-surface p-4 text-sm text-fg shadow-lg outline-none [transform-origin:var(--transform-origin)]",
    "transition-[opacity,scale] duration-150 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "data-[presentation=sheet]:mx-auto data-[presentation=sheet]:w-[min(36rem,100%)] data-[presentation=sheet]:max-w-none data-[presentation=sheet]:rounded-t-xl data-[presentation=sheet]:rounded-b-none data-[presentation=sheet]:pb-[max(1rem,env(safe-area-inset-bottom))]",
    className,
  )}
  {...rest}
/>