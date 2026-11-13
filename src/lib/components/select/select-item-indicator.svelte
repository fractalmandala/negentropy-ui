<script lang="ts">
  import {
    SelectItemIndicator as SelectItemIndicatorPrimitive,
    type SelectItemIndicatorProps,
    type SelectItemIndicatorState,
  } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", SelectItemIndicatorState> & SelectItemIndicatorProps = $props()
</script>

<SelectItemIndicatorPrimitive
  class={cn("absolute end-2 flex size-3.5 items-center justify-center text-accent [&_svg]:size-3.5", className)}
  {...rest}
/>