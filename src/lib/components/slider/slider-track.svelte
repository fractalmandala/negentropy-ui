<script lang="ts">
  import { SliderTrack as SliderTrackPrimitive, type SliderState } from "@ui-sdk/svelte/slider"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SliderState> = $props()
</script>

<SliderTrackPrimitive
  class={cn("relative h-1.5 w-full rounded-full bg-elevated data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5", className)}
  {...rest}
/>