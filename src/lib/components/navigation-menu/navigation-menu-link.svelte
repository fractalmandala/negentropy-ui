<script lang="ts">
  import {
    NavigationMenuLink as NavigationMenuLinkPrimitive,
    type NavigationMenuLinkProps,
    type NavigationMenuLinkState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"a", NavigationMenuLinkState> & NavigationMenuLinkProps = $props()
</script>

<NavigationMenuLinkPrimitive
  class={cn(
    "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium text-fg no-underline transition-colors hover:bg-elevated focus-visible:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[current]:bg-elevated data-[current]:text-accent [&_svg]:size-4 [&_svg]:shrink-0",
    "[&:has([data-slot=hint])]:flex-col [&:has([data-slot=hint])]:items-start [&:has([data-slot=hint])]:gap-0.5 [&_[data-slot=hint]]:text-xs [&_[data-slot=hint]]:font-normal [&_[data-slot=hint]]:text-muted",
    className,
  )}
  {...rest}
/>