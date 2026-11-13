<script lang="ts">
  import {
    ImageCropper as ImageCropperPrimitive,
    type ImageCropperOptions,
    type ImageCropperState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    crop = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", ImageCropperState> & ImageCropperOptions = $props()
</script>

<ImageCropperPrimitive
  bind:crop={crop}
  class={cn("flex w-96 max-w-full flex-col gap-3 data-[mode=frame]:w-72", className)}
  {...rest}
/>