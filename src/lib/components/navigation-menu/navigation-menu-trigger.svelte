<script lang="ts">
  import {
    NavigationMenuTrigger as NavigationMenuTriggerPrimitive,
    type NavigationMenuTriggerProps,
    type NavigationMenuTriggerState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", NavigationMenuTriggerState> & NavigationMenuTriggerProps = $props()
</script>

<NavigationMenuTriggerPrimitive
  class={cn(
    "inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium whitespace-nowrap text-fg transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[open]:bg-elevated data-[disabled]:opacity-50",
    "[&>svg]:size-3.5 [&>svg]:opacity-70 [&>svg]:transition-transform data-[open]:[&>svg]:rotate-180 group-data-[orientation=vertical]/nav:data-[open]:[&>svg]:rotate-0",
    "group-data-[orientation=vertical]/nav:w-full group-data-[orientation=vertical]/nav:justify-between",
    className,
  )}
  {...rest}
/>