<script lang="ts">
  import {
    NumberInputDecrement as NumberInputDecrementPrimitive,
    type NumberInputButtonProps,
    type NumberInputButtonState,
  } from "@ui-sdk/svelte/number-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", NumberInputButtonState> & NumberInputButtonProps = $props()
</script>

<NumberInputDecrementPrimitive
  class={cn(
    "inline-flex h-full aspect-square shrink-0 items-center justify-center rounded-sm text-muted transition-colors select-none hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-40 [&_svg]:size-3.5",
    className,
  )}
  {...rest}
/>