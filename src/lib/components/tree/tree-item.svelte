<script lang="ts">
  import {
    TreeItem as TreeItemPrimitive,
    type TreeItemProps,
    type TreeItemState,
  } from "@ui-sdk/svelte/tree"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TreeItemState> & Omit<TreeItemProps, "parent"> = $props()
</script>

<TreeItemPrimitive
  class={cn(
    "outline-none",
    "[&:focus-visible>[data-slot=tree-label]]:shadow-[inset_0_0_0_1px_var(--color-fg)]",
    "[&:focus-visible>[data-slot=tree-label]:not([data-selected],[data-current])]:bg-elevated",
    className,
  )}
  {...rest}
/>