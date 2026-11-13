<script lang="ts">
  import { SliderControl as SliderControlPrimitive, type SliderState } from "@ui-sdk/svelte/slider"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SliderState> = $props()
</script>

<SliderControlPrimitive
  class={cn("flex h-5 w-full touch-none items-center select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:justify-center", className)}
  {...rest}
/>