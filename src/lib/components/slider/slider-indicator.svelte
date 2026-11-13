<script lang="ts">
  import { SliderIndicator as SliderIndicatorPrimitive, type SliderState } from "@ui-sdk/svelte/slider"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SliderState> = $props()
</script>

<SliderIndicatorPrimitive
  class={cn("rounded-full bg-accent data-[disabled]:bg-line-strong", className)}
  {...rest}
/>