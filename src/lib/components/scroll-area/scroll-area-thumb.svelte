<script lang="ts">
  import {
    ScrollAreaThumb as ScrollAreaThumbPrimitive,
    type ScrollAreaThumbState,
  } from "@ui-sdk/svelte/scroll-area"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ScrollAreaThumbState> = $props()
</script>

<ScrollAreaThumbPrimitive
  class={cn(
    "relative shrink-0 rounded-full bg-line transition-colors group-data-[scrolling]/scrollbar:bg-line-strong group-data-[hovering]/scrollbar:bg-line-strong data-[dragging]:bg-muted",
    className,
  )}
  {...rest}
/>