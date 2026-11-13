<script lang="ts">
  import {
    NumberInputScrubArea as NumberInputScrubAreaPrimitive,
    type NumberInputScrubAreaProps,
    type NumberInputState,
  } from "@ui-sdk/svelte/number-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", NumberInputState> & NumberInputScrubAreaProps = $props()
</script>

<NumberInputScrubAreaPrimitive
  class={cn(
    "inline-flex cursor-ew-resize items-center gap-2 text-sm text-muted select-none data-[orientation=vertical]:cursor-ns-resize data-[scrubbing]:text-fg data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
/>