<script lang="ts">
  import {
    TriggerMenuContent as TriggerMenuContentPrimitive,
    type TriggerMenuContentProps,
    type TriggerMenuContentState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps, PopupContainer } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TriggerMenuContentState> &
    TriggerMenuContentProps & {
      container?: PopupContainer
    } = $props()
</script>

<TriggerMenuContentPrimitive
  class={cn(
    "z-50 w-56 max-w-[calc(100vw-2rem)] origin-[var(--transform-origin)] overflow-hidden rounded-lg border border-line bg-surface text-fg shadow-lg outline-none [--list-height:var(--available-height)]",
    "transition-[opacity,scale] duration-150 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    className,
  )}
  {...rest}
/>