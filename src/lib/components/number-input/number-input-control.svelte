<script lang="ts">
  import {
    NumberInputControl as NumberInputControlPrimitive,
    type NumberInputState,
  } from "@ui-sdk/svelte/number-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", NumberInputState> = $props()
</script>

<NumberInputControlPrimitive
  class={cn(
    "h-full min-w-0 flex-1 bg-transparent px-2 text-center text-sm font-medium text-fg tabular-nums outline-none disabled:cursor-not-allowed disabled:text-faint data-[readonly]:cursor-default",
    "group-data-[size=sm]/number:text-[13px] group-data-[size=lg]/number:text-base",
    className,
  )}
  {...rest}
/>