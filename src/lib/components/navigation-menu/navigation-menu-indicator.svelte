<script lang="ts">
  import {
    NavigationMenuIndicator as NavigationMenuIndicatorPrimitive,
    type NavigationMenuIndicatorState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", NavigationMenuIndicatorState> = $props()
</script>

<NavigationMenuIndicatorPrimitive
  class={cn(
    "absolute bottom-0 left-[var(--active-item-left)] h-0.5 w-[var(--active-item-width)] rounded-full bg-accent opacity-0 transition-all duration-200 data-[visible]:opacity-100",
    "data-[orientation=vertical]:top-[var(--active-item-top)] data-[orientation=vertical]:right-0 data-[orientation=vertical]:bottom-auto data-[orientation=vertical]:left-auto data-[orientation=vertical]:h-[var(--active-item-height)] data-[orientation=vertical]:w-0.5",
    className,
  )}
  {...rest}
/>