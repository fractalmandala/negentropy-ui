<script lang="ts">
  import { Menu as MenuPrimitive, type MenuOptions } from "@ui-sdk/svelte/menu"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    children,
    ...rest
  }: MenuOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<MenuPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</MenuPrimitive>