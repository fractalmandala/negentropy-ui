<script lang="ts">
  import {
    ImageCropperHandle as ImageCropperHandlePrimitive,
    type ImageCropperHandleProps,
    type ImageCropperHandleState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ImageCropperHandleState> & ImageCropperHandleProps = $props()
</script>

<ImageCropperHandlePrimitive
  class={cn(
    "absolute size-2.5 rounded-xs bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.4)] [translate:-50%_-50%]",
    "after:absolute after:-inset-3 after:content-['']",
    "data-[position*=n]:top-0 data-[position*=s]:top-full",
    "data-[position*=w]:left-0 data-[position*=e]:left-full",
    "data-[position=n]:left-1/2 data-[position=s]:left-1/2",
    "data-[position=e]:top-1/2 data-[position=w]:top-1/2",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    className,
  )}
  {...rest}
/>