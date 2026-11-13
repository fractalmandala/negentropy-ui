<script lang="ts">
  import {
    ImageCropperGrid as ImageCropperGridPrimitive,
    type ImageCropperState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ImageCropperState> = $props()
</script>

<ImageCropperGridPrimitive
  class={cn(
    "rounded-[inherit] opacity-0 transition-opacity data-[dragging]:opacity-100",
    "[background:linear-gradient(to_right,transparent_calc(100%/3_-_0.5px),rgb(255_255_255/0.6)_0_calc(100%/3_+_0.5px),transparent_0_calc(200%/3_-_0.5px),rgb(255_255_255/0.6)_0_calc(200%/3_+_0.5px),transparent_0),linear-gradient(to_bottom,transparent_calc(100%/3_-_0.5px),rgb(255_255_255/0.6)_0_calc(100%/3_+_0.5px),transparent_0_calc(200%/3_-_0.5px),rgb(255_255_255/0.6)_0_calc(200%/3_+_0.5px),transparent_0)]",
    className,
  )}
  {...rest}
/>