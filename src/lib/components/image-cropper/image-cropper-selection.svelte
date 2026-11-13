<script lang="ts">
  import {
    ImageCropperSelection as ImageCropperSelectionPrimitive,
    type ImageCropperState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ImageCropperState> = $props()
</script>

<ImageCropperSelectionPrimitive
  class={cn(
    "outline outline-1 outline-white shadow-[0_0_0_100vmax_rgb(0_0_0/0.5)]",
    "data-[shape=circle]:rounded-full",
    "focus-visible:outline-3 focus-visible:outline-white",
    className,
  )}
  {...rest}
/>