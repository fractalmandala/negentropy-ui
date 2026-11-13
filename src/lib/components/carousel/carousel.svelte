<script lang="ts">
  import {
    Carousel as CarouselPrimitive,
    type CarouselOptions,
    type CarouselState,
  } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    page = $bindable(),
    playing = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", CarouselState> & CarouselOptions = $props()
</script>

<CarouselPrimitive
  bind:page={page}
  bind:playing={playing}
  class={cn("grid w-full gap-3", className)}
  {...rest}
/>