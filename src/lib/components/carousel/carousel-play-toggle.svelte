<script lang="ts">
  import {
    CarouselPlayToggle as CarouselPlayTogglePrimitive,
    type CarouselControlProps,
    type CarouselPlayToggleState,
  } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", CarouselPlayToggleState> & CarouselControlProps = $props()
</script>

<CarouselPlayTogglePrimitive
  class={cn(
    "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-line bg-surface px-3 text-sm font-medium text-fg transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4 [&_svg]:shrink-0",
    className,
  )}
  {...rest}
/>