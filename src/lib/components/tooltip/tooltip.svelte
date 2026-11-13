<script lang="ts">
  import { Tooltip as TooltipPrimitive, type TooltipOptions } from "@ui-sdk/svelte/tooltip"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    children,
    ...rest
  }: TooltipOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<TooltipPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</TooltipPrimitive>