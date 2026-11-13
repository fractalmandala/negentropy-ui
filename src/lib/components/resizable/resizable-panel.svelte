<script lang="ts">
  import {
    ResizablePanel as ResizablePanelPrimitive,
    type ResizablePanelProps,
    type ResizablePanelState,
  } from "@ui-sdk/svelte/resizable"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ResizablePanelState> & ResizablePanelProps = $props()
</script>

<ResizablePanelPrimitive
  class={cn(
    "flex min-h-0 min-w-0 flex-col gap-1 overflow-hidden p-4",
    "[&>h3]:truncate [&:has(>[data-slot=resizable])]:p-0",
    className,
  )}
  {...rest}
/>