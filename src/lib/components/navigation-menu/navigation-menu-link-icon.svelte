<script lang="ts">
  import {
    NavigationMenuLinkIcon as NavigationMenuLinkIconPrimitive,
    type NavigationMenuLinkIconProps,
    type NavigationMenuLinkIconState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", NavigationMenuLinkIconState> & NavigationMenuLinkIconProps = $props()
</script>

<NavigationMenuLinkIconPrimitive
  class={cn("inline-flex shrink-0 text-muted [&_svg]:size-4", className)}
  {...rest}
/>