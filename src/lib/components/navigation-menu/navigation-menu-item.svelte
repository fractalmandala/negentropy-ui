<script lang="ts">
  import {
    NavigationMenuItem as NavigationMenuItemPrimitive,
    type NavigationMenuItemProps,
    type NavigationMenuItemState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"li", NavigationMenuItemState> & NavigationMenuItemProps = $props()
</script>

<NavigationMenuItemPrimitive class={cn("relative", className)} {...rest} />