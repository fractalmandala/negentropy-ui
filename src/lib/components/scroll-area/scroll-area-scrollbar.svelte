<script lang="ts">
  import {
    ScrollAreaScrollbar as ScrollAreaScrollbarPrimitive,
    type ScrollAreaScrollbarProps,
    type ScrollAreaScrollbarState,
  } from "@ui-sdk/svelte/scroll-area"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ScrollAreaScrollbarState> & ScrollAreaScrollbarProps = $props()
</script>

<ScrollAreaScrollbarPrimitive
  class={cn(
    "group/scrollbar flex p-0.5 opacity-0 transition-opacity duration-200 data-[visible]:opacity-100",
    "data-[orientation=vertical]:my-1 data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:flex-col",
    "data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:h-2.5",
    className,
  )}
  {...rest}
/>