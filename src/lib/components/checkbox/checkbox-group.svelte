<script lang="ts">
  import {
    CheckboxGroup as CheckboxGroupPrimitive,
    type CheckboxGroupOptions,
    type CheckboxGroupState,
  } from "@ui-sdk/svelte/checkbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", CheckboxGroupState> & CheckboxGroupOptions = $props()
</script>

<CheckboxGroupPrimitive
  bind:value={value}
  class={cn("flex flex-col gap-2.5", className)}
  {...rest}
/>