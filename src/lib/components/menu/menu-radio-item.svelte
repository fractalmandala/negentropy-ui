<script lang="ts">
  import {
    MenuRadioItem as MenuRadioItemPrimitive,
    type MenuRadioItemProps,
    type MenuRadioItemState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", MenuRadioItemState> & MenuRadioItemProps = $props()
</script>

<MenuRadioItemPrimitive
  class={cn(
    "group/item relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-2 pl-7 text-sm text-fg outline-none transition-colors select-none data-[highlighted]:bg-elevated data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    className,
  )}
  {...rest}
/>