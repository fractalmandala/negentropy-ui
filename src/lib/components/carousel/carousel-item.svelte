<script lang="ts">
  import { CarouselItem as CarouselItemPrimitive, type CarouselItemState } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", CarouselItemState> = $props()
</script>

<CarouselItemPrimitive
  class={cn(
    "min-w-0 shrink-0 grow-0 basis-full opacity-40 transition-opacity data-[in-view]:opacity-100",
    className,
  )}
  {...rest}
/>