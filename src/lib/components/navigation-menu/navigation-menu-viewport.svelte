<script lang="ts">
  import {
    NavigationMenuViewport as NavigationMenuViewportPrimitive,
    type NavigationMenuViewportProps,
    type NavigationMenuViewportState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", NavigationMenuViewportState> & NavigationMenuViewportProps = $props()
</script>

<NavigationMenuViewportPrimitive
  class={cn(
    "group/viewport z-50 h-[var(--viewport-height)] w-[var(--viewport-width)] origin-[var(--transform-origin)] overflow-hidden rounded-lg border border-line bg-surface text-fg shadow-lg outline-none",
    "transition-[opacity,width,height] duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    className,
  )}
  {...rest}
/>