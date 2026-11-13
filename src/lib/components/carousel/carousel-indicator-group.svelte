<script lang="ts">
  import {
    CarouselIndicatorGroup as CarouselIndicatorGroupPrimitive,
    type CarouselControlProps,
    type CarouselIndicatorGroupState,
  } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", CarouselIndicatorGroupState> & CarouselControlProps = $props()
</script>

<CarouselIndicatorGroupPrimitive
  class={cn("flex items-center justify-center gap-2", className)}
  {...rest}
/>