<script lang="ts">
  import {
    TreeItemLabel as TreeItemLabelPrimitive,
    type TreeItemPartProps,
    type TreeItemState,
  } from "@ui-sdk/svelte/tree"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", TreeItemState> & TreeItemPartProps = $props()
</script>

<TreeItemLabelPrimitive
  class={cn(
    "flex h-8 min-w-0 cursor-default items-center gap-2 rounded-sm pe-2 text-sm whitespace-nowrap select-none",
    "[padding-inline-start:calc(0.5rem_+_(var(--tree-level,1)_-_1)*1rem)]",
    "[&:not([data-branch])]:[padding-inline-start:calc(0.5rem_+_(var(--tree-level,1)_-_1)*1rem_+_1.5rem)]",
    "[&:hover:not([data-disabled],[data-selected],[data-current])]:bg-elevated",
    "data-[selected]:bg-accent-soft data-[current]:bg-accent-soft data-[current]:font-medium",
    "data-[disabled]:text-faint data-[pending]:cursor-progress",
    "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-muted",
    "[&>span:not([data-slot])]:truncate",
    className,
  )}
  {...rest}
/>