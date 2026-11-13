<script lang="ts">
  import {
    ImageCropperViewport as ImageCropperViewportPrimitive,
    type ImageCropperState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ImageCropperState> = $props()
</script>

<ImageCropperViewportPrimitive
  class={cn(
    "relative max-h-96 overflow-hidden rounded-lg bg-elevated shadow-[inset_0_0_0_1px_var(--color-line)]",
    "aspect-[var(--image-cropper-aspect-ratio,32/21)]",
    "data-[mode=frame]:aspect-square data-[mode=frame]:bg-bg data-[mode=frame]:p-6",
    "data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
/>