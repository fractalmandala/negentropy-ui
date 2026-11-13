<script lang="ts">
  import { SliderValue as SliderValuePrimitive, type SliderValueState } from "@ui-sdk/svelte/slider"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"output", SliderValueState> = $props()
</script>

<SliderValuePrimitive
  class={cn("text-sm text-muted tabular-nums", className)}
  {...rest}
/>