<script lang="ts">
  import {
    Resizable as ResizablePrimitive,
    type ResizableOptions,
    type ResizableState,
  } from "@ui-sdk/svelte/resizable"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    layout = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", ResizableState> & ResizableOptions = $props()
</script>

<ResizablePrimitive
  bind:layout={layout}
  class={cn(
    "h-52 w-full max-w-md overflow-hidden rounded-lg border border-line bg-surface data-[disabled]:opacity-60",
    "[&_[data-slot=resizable]]:h-full [&_[data-slot=resizable]]:w-auto [&_[data-slot=resizable]]:max-w-none",
    "[&_[data-slot=resizable]]:rounded-none [&_[data-slot=resizable]]:border-0 [&_[data-slot=resizable]]:bg-transparent",
    className,
  )}
  {...rest}
/>