<script lang="ts">
  import {
    NumberInput as NumberInputPrimitive,
    type NumberInputOptions,
    type NumberInputState,
  } from "@ui-sdk/svelte/number-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", NumberInputState> &
    Omit<NumberInputOptions, "value"> & {
      /** The value, or null for an empty field. */
      value?: number | null
    } = $props()
</script>

<NumberInputPrimitive
  bind:value={value}
  class={cn("flex flex-col gap-1.5", className)}
  {...rest}
/>