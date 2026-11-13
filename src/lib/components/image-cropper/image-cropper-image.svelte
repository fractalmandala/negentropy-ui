<script lang="ts">
  import {
    ImageCropperImage as ImageCropperImagePrimitive,
    type ImageCropperState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"img", ImageCropperState> = $props()
</script>

<ImageCropperImagePrimitive class={cn("block h-full w-full object-contain", className)} {...rest} />