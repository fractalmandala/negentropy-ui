<script lang="ts">
  import {
    ToolbarGroup as ToolbarGroupPrimitive,
    type ToolbarGroupProps,
    type ToolbarGroupState,
  } from "@ui-sdk/svelte/toolbar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ToolbarGroupState> & ToolbarGroupProps = $props()
</script>

<ToolbarGroupPrimitive
  class={cn(
    "flex items-center gap-0.5 data-[orientation=vertical]:flex-col data-[disabled]:opacity-60",
    className,
  )}
  {...rest}
/>