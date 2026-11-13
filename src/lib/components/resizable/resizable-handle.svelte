<script lang="ts">
  import {
    ResizableHandle as ResizableHandlePrimitive,
    type ResizableHandleProps,
    type ResizableHandleState,
  } from "@ui-sdk/svelte/resizable"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ResizableHandleState> & ResizableHandleProps = $props()
</script>

<ResizableHandlePrimitive
  class={cn(
    "relative z-10 flex w-px shrink-0 cursor-col-resize items-center justify-center outline-none",
    "[--resizable-handle-line:var(--color-line)] bg-[var(--resizable-handle-line)]",
    "[&:not([data-disabled])]:hover:[--resizable-handle-line:var(--color-fg)]",
    "[&:not([data-disabled])]:data-[hovering]:[--resizable-handle-line:var(--color-fg)]",
    "[&:not([data-disabled])]:data-[dragging]:[--resizable-handle-line:var(--color-fg)]",
    "[&:not([data-disabled])]:focus-visible:[--resizable-handle-line:var(--color-fg)]",
    "focus-visible:shadow-[0_0_0_3px_var(--color-ring)]",
    "data-[disabled]:cursor-default",
    "before:absolute before:inset-y-0 before:-inset-x-1.5 before:content-['']",
    "data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:cursor-row-resize",
    "data-[orientation=vertical]:before:inset-x-0 data-[orientation=vertical]:before:-inset-y-1.5",
    "pointer-coarse:before:-inset-x-3 data-[orientation=vertical]:pointer-coarse:before:-inset-y-3",
    "[&>div]:h-5 [&>div]:w-2 [&>div]:shrink-0 [&>div]:rounded-xs [&>div]:bg-surface",
    "[&>div]:shadow-[inset_0_0_0_1px_var(--resizable-handle-line)]",
    "data-[orientation=vertical]:[&>div]:h-2 data-[orientation=vertical]:[&>div]:w-5",
    className,
  )}
  {...rest}
/>