<script lang="ts">
  import { Slider as SliderPrimitive, type SliderOptions, type SliderState } from "@ui-sdk/svelte/slider"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { value = $bindable(), class: className, ...rest }:
    PartProps<"div", SliderState> & SliderOptions = $props()
</script>

<SliderPrimitive
  bind:value={value}
  class={cn("flex w-full flex-col gap-2 data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-auto", className)}
  {...rest}
/>