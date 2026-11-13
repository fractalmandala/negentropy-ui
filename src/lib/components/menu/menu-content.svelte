<script lang="ts">
  import {
    MenuContent as MenuContentPrimitive,
    type MenuContentProps,
    type MenuContentState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps, PopupContainer } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", MenuContentState> &
    MenuContentProps & {
      container?: PopupContainer
    } = $props()
</script>

<MenuContentPrimitive
  class={cn(
    "z-50 max-h-[var(--available-height)] min-w-32 origin-[var(--transform-origin)] overflow-y-auto rounded-lg border border-line bg-surface p-1 text-fg shadow-lg outline-none",
    "transition-[opacity,scale] duration-150 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
    "data-[presentation=sheet]:max-h-none data-[presentation=sheet]:scale-100 data-[presentation=sheet]:rounded-t-xl data-[presentation=sheet]:rounded-b-none data-[presentation=sheet]:p-2",
    className,
  )}
  {...rest}
/>