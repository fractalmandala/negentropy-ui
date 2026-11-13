<script lang="ts">
  import {
    TreeItemCheckbox as TreeItemCheckboxPrimitive,
    type TreeItemPartProps,
    type TreeItemState,
  } from "@ui-sdk/svelte/tree"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", TreeItemState> & TreeItemPartProps = $props()
</script>

<TreeItemCheckboxPrimitive
  class={cn(
    "relative inline-grid size-4 shrink-0 cursor-pointer place-items-center rounded-xs bg-surface text-accent-fg",
    "shadow-[inset_0_0_0_1px_var(--color-line)]",
    "data-[checked]:bg-accent data-[checked]:shadow-[inset_0_0_0_1px_var(--color-accent)]",
    "data-[indeterminate]:bg-accent data-[indeterminate]:shadow-[inset_0_0_0_1px_var(--color-accent)]",
    "data-[disabled]:cursor-default data-[disabled]:opacity-50",
    "after:absolute after:inset-0 after:m-auto after:content-['']",
    "data-[checked]:after:h-2.5 data-[checked]:after:w-1.5 data-[checked]:after:rotate-45",
    "data-[checked]:after:border-r-2 data-[checked]:after:border-b-2 data-[checked]:after:border-current",
    "data-[indeterminate]:after:h-0.5 data-[indeterminate]:after:w-2.5 data-[indeterminate]:after:bg-current",
    className,
  )}
  {...rest}
/>