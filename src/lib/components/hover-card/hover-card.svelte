<script lang="ts">
  import { HoverCard as HoverCardPrimitive, type HoverCardOptions } from "@ui-sdk/svelte/hover-card"
  import type { Snippet } from "svelte"

  let {
    open = $bindable(),
    children,
    ...rest
  }: HoverCardOptions & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<HoverCardPrimitive bind:open={open} {...rest}>
  {@render children?.()}
</HoverCardPrimitive>