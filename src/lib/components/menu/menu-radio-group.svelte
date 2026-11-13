<script lang="ts">
  import {
    MenuRadioGroup as MenuRadioGroupPrimitive,
    type MenuRadioGroupProps,
    type MenuRadioGroupState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", MenuRadioGroupState> & MenuRadioGroupProps = $props()
</script>

<MenuRadioGroupPrimitive bind:value={value} class={cn(className)} {...rest} />