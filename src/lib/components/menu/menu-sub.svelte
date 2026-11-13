<script lang="ts">
  import { MenuSub as MenuSubPrimitive, type MenuOptions } from "@ui-sdk/svelte/menu"
  import type { Snippet } from "svelte"

  type SubOptions = Pick<
    MenuOptions,
    | "open"
    | "defaultOpen"
    | "delay"
    | "loop"
    | "controller"
    | "debug"
    | "onOpenChange"
    | "onOpenChangeComplete"
  >

  let {
    open = $bindable(),
    children,
    ...rest
  }: SubOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<MenuSubPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</MenuSubPrimitive>