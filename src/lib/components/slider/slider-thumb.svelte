<script lang="ts">
  import { SliderThumb as SliderThumbPrimitive, type SliderThumbProps, type SliderThumbState } from "@ui-sdk/svelte/slider"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }:
    PartProps<"div", SliderThumbState> & SliderThumbProps = $props()
</script>

<SliderThumbPrimitive
  class={cn("size-4 rounded-full border-2 border-accent bg-bg shadow-sm transition-colors hover:bg-elevated has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring data-[dragging]:bg-elevated data-[disabled]:border-line-strong data-[disabled]:shadow-none", className)}
  {...rest}
/>