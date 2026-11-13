<script lang="ts">
  import {
    CarouselContent as CarouselContentPrimitive,
    type CarouselContentState,
  } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", CarouselContentState> = $props()
</script>

<CarouselContentPrimitive
  class={cn(
    "flex gap-4 data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
    className,
  )}
  {...rest}
/>