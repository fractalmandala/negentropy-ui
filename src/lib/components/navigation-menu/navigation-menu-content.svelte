<script lang="ts">
  import {
    NavigationMenuContent as NavigationMenuContentPrimitive,
    type NavigationMenuContentProps,
    type NavigationMenuContentState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", NavigationMenuContentState> & NavigationMenuContentProps = $props()
</script>

<NavigationMenuContentPrimitive
  class={cn(
    "group/navcontent z-50 box-border max-h-[var(--available-height,none)] w-max max-w-[calc(100vw-3rem)] overflow-y-auto rounded-lg border border-line bg-surface p-1 text-fg shadow-lg outline-none",
    "transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
    "group-data-[slot=navigation-menu-viewport]/viewport:absolute group-data-[slot=navigation-menu-viewport]/viewport:inset-0 group-data-[slot=navigation-menu-viewport]/viewport:z-auto group-data-[slot=navigation-menu-viewport]/viewport:rounded-none group-data-[slot=navigation-menu-viewport]/viewport:border-0 group-data-[slot=navigation-menu-viewport]/viewport:bg-transparent group-data-[slot=navigation-menu-viewport]/viewport:shadow-none",
    className,
  )}
  {...rest}
/>