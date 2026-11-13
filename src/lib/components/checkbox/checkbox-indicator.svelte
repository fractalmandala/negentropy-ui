<script lang="ts">
  import {
    CheckboxIndicator as CheckboxIndicatorPrimitive,
    type CheckboxIndicatorProps,
    type CheckboxIndicatorState,
  } from "@ui-sdk/svelte/checkbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", CheckboxIndicatorState> & CheckboxIndicatorProps = $props()
</script>

<CheckboxIndicatorPrimitive
  class={cn(
    "grid place-items-center transition-[opacity,scale] duration-150 data-[starting-style]:scale-50 data-[starting-style]:opacity-0 data-[ending-style]:scale-50 data-[ending-style]:opacity-0",
    className,
  )}
  {...rest}
/>