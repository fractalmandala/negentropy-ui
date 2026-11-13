<script lang="ts">
  import { DrawerHandle as DrawerHandlePrimitive, type DrawerHandleState } from "@ui-sdk/svelte/drawer"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", DrawerHandleState> = $props()
</script>

<DrawerHandlePrimitive
  class={cn(
    "mx-auto flex shrink-0 cursor-default flex-col items-center gap-1 rounded-md border-0 bg-transparent px-3 py-1 text-xs text-muted tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "empty:box-content empty:h-1 empty:w-9 empty:rounded-full empty:bg-line-strong empty:p-1 empty:[background-clip:content-box] hover:empty:bg-line",
    className,
  )}
  {...rest}
/>