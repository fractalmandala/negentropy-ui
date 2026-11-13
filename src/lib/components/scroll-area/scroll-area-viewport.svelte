<script lang="ts">
  import {
    ScrollAreaViewport as ScrollAreaViewportPrimitive,
    type ScrollAreaState,
  } from "@ui-sdk/svelte/scroll-area"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ScrollAreaState> = $props()
</script>

<ScrollAreaViewportPrimitive
  class={cn(
    "h-full w-full rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring",
    className,
  )}
  {...rest}
/>