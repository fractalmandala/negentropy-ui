<script lang="ts">
  import {
    Toolbar as ToolbarPrimitive,
    type ToolbarOptions,
    type ToolbarState,
  } from "@ui-sdk/svelte/toolbar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ToolbarState> & ToolbarOptions = $props()
</script>

<ToolbarPrimitive
  class={cn(
    "inline-flex w-fit max-w-full flex-wrap items-center gap-0.5 rounded-lg border border-line bg-surface p-1 data-[orientation=vertical]:flex-col data-[disabled]:opacity-60",
    className,
  )}
  {...rest}
/>