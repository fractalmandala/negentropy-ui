<script lang="ts">
  import {
    MenuItemIndicator as MenuItemIndicatorPrimitive,
    type MenuItemIndicatorProps,
    type MenuItemIndicatorState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", MenuItemIndicatorState> & MenuItemIndicatorProps = $props()
</script>

<MenuItemIndicatorPrimitive
  class={cn(
    "absolute inset-y-0 left-2 flex w-4 items-center justify-center text-accent data-[unchecked]:invisible [&_svg]:size-4 empty:after:size-1.5 empty:after:rounded-full empty:after:bg-current empty:after:content-['']",
    className,
  )}
  {...rest}
/>