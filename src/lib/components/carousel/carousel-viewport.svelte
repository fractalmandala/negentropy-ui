<script lang="ts">
  import {
    CarouselViewport as CarouselViewportPrimitive,
    type CarouselViewportState,
  } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", CarouselViewportState> = $props()
</script>

<CarouselViewportPrimitive
  class={cn(
    "min-w-0 rounded-lg [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[dragging]:cursor-grabbing data-[orientation=vertical]:h-48",
    className,
  )}
  {...rest}
/>