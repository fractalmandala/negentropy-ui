<script lang="ts">
  import {
    ImageCropperFlip as ImageCropperFlipPrimitive,
    type ImageCropperFlipProps,
    type ImageCropperState,
  } from "@ui-sdk/svelte/image-cropper"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", ImageCropperState, "type" | "onclick"> & ImageCropperFlipProps = $props()
</script>

<ImageCropperFlipPrimitive
  class={cn(
    "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-line-strong bg-transparent px-4 text-sm font-medium whitespace-nowrap text-fg transition-colors",
    "hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    className,
  )}
  {...rest}
/>