<script lang="ts">
  import {
    ScrollAreaScrollToEnd as ScrollAreaScrollToEndPrimitive,
    type ScrollAreaScrollToEndState,
  } from "@ui-sdk/svelte/scroll-area"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", ScrollAreaScrollToEndState> = $props()
</script>

<ScrollAreaScrollToEndPrimitive
  class={cn(
    "pointer-events-none absolute inset-x-0 bottom-3 mx-auto w-fit rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-fg opacity-0 shadow-lg transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[visible]:pointer-events-auto data-[visible]:opacity-100",
    className,
  )}
  {...rest}
/>