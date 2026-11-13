<script lang="ts">
  import {
    TriggerMenu as TriggerMenuPrimitive,
    type TriggerMenuOptions,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    children,
    ...rest
  }: TriggerMenuOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<TriggerMenuPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</TriggerMenuPrimitive>