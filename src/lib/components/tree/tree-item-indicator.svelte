<script lang="ts">
  import {
    TreeItemIndicator as TreeItemIndicatorPrimitive,
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

<TreeItemIndicatorPrimitive
  class={cn(
    "relative inline-grid size-4 shrink-0 cursor-pointer place-items-center text-muted",
    "[&>svg]:size-3.5",
    "data-[expanded]:rotate-90 rtl:rotate-180 rtl:data-[expanded]:rotate-90",
    "data-[loading]:rotate-0 data-[loading]:[&>svg]:animate-spin",
    "data-[failed]:rotate-0 data-[failed]:text-danger",
    "data-[disabled]:cursor-default data-[disabled]:text-inherit",
    "after:absolute after:inset-0 after:m-auto after:size-1.5 after:-rotate-45 after:border-r-[1.5px] after:border-b-[1.5px] after:border-current after:content-['']",
    "[&:has(>svg)]:after:content-none",
    className,
  )}
  {...rest}
/>