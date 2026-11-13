<script lang="ts">
  import {
    RadioGroup as RadioGroupPrimitive,
    type RadioGroupOptions,
    type RadioGroupState,
  } from "@ui-sdk/svelte/radio"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", RadioGroupState> & RadioGroupOptions = $props()
</script>

<RadioGroupPrimitive
  bind:value={value}
  class={cn("flex flex-col gap-2.5", className)}
  {...rest}
/>