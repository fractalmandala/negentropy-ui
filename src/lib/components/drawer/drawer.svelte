<script lang="ts">
  import { Drawer as DrawerPrimitive, type DrawerOptions } from "@ui-sdk/svelte/drawer"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    snapPoint = $bindable(),
    children,
    ...rest
  }: DrawerOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<DrawerPrimitive bind:open={open} bind:snapPoint={snapPoint} {...rest}>
  {@render children?.()}
</DrawerPrimitive>