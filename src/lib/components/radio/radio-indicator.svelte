<script lang="ts">
  import {
    RadioIndicator as RadioIndicatorPrimitive,
    type RadioIndicatorProps,
    type RadioIndicatorState,
  } from "@ui-sdk/svelte/radio"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", RadioIndicatorState> & RadioIndicatorProps = $props()
</script>

<RadioIndicatorPrimitive
  class={cn(
    "block rounded-full bg-accent transition-[opacity,scale] duration-150 data-[starting-style]:scale-0 data-[starting-style]:opacity-0 data-[ending-style]:scale-0 data-[ending-style]:opacity-0",
    "group-data-[size=sm]/radio:size-1.5 group-data-[size=md]/radio:size-2 group-data-[size=lg]/radio:size-2.5",
    className,
  )}
  {...rest}
/>