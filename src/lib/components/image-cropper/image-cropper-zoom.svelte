<script lang="ts">
  import {
    ImageCropperZoom as ImageCropperZoomPrimitive,
    type ImageCropperState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", ImageCropperState, "value"> = $props()
</script>

<ImageCropperZoomPrimitive
  class={cn(
    "min-w-0 flex-1 cursor-pointer accent-accent",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:cursor-default disabled:opacity-50",
    className,
  )}
  {...rest}
/>