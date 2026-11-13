<script lang="ts">
  import { Dialog as DialogPrimitive, type DialogOptions } from "@ui-sdk/svelte/dialog"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    children,
    ...rest
  }: DialogOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<DialogPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</DialogPrimitive>