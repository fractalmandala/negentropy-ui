<script lang="ts">
  import {
    CarouselIndicator as CarouselIndicatorPrimitive,
    type CarouselIndicatorProps,
    type CarouselIndicatorState,
  } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", CarouselIndicatorState> & CarouselIndicatorProps = $props()
</script>

<CarouselIndicatorPrimitive
  class={cn(
    "h-2 w-2 shrink-0 rounded-full bg-line-strong transition-all hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[selected]:w-5 data-[selected]:bg-accent data-[selected]:hover:bg-accent",
    className,
  )}
  {...rest}
/>