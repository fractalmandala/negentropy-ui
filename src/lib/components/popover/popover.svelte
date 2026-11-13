<script lang="ts">
  import { Popover as PopoverPrimitive, type PopoverOptions } from "@ui-sdk/svelte/popover"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    children,
    ...rest
  }: PopoverOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<PopoverPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</PopoverPrimitive>