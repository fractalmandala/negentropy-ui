<script lang="ts">
  import {
    ScrollArea as ScrollAreaPrimitive,
    type ScrollAreaOptions,
    type ScrollAreaState,
  } from "@ui-sdk/svelte/scroll-area"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ScrollAreaState> & ScrollAreaOptions = $props()
</script>

<ScrollAreaPrimitive
  class={cn("h-64 w-full overflow-hidden rounded-lg border border-line bg-surface", className)}
  {...rest}
/>