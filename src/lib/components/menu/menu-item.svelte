<script lang="ts">
  import {
    MenuItem as MenuItemPrimitive,
    type MenuItemProps,
    type MenuItemState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", MenuItemState> & MenuItemProps = $props()
</script>

<MenuItemPrimitive
  class={cn(
    "group/item relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fg outline-none transition-colors select-none data-[highlighted]:bg-elevated data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[destructive]:text-danger data-[destructive]:data-[highlighted]:bg-danger/10 data-[pending]:cursor-wait data-[pending]:opacity-70 [&_svg]:size-4 [&_svg]:shrink-0",
    className,
  )}
  {...rest}
/>