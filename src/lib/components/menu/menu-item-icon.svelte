<script lang="ts">
  import {
    MenuItemIcon as MenuItemIconPrimitive,
    type MenuItemIconProps,
    type MenuItemIconState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", MenuItemIconState> & MenuItemIconProps = $props()
</script>

<MenuItemIconPrimitive
  class={cn(
    "inline-flex shrink-0 text-muted transition-colors group-data-[highlighted]/item:text-fg [&_svg]:size-4",
    className,
  )}
  {...rest}
/>