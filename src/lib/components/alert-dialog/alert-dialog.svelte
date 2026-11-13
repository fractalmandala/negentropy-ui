<script lang="ts">
  import {
    AlertDialog as AlertDialogPrimitive,
    type AlertDialogOptions,
  } from "@ui-sdk/svelte/alert-dialog"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    children,
    ...rest
  }: AlertDialogOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<AlertDialogPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</AlertDialogPrimitive>