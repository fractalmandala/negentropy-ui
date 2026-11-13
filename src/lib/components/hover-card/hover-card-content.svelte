<script lang="ts" generics="Payload = unknown">
  import {
    HoverCardContent as HoverCardContentPrimitive,
    type HoverCardContentProps,
    type HoverCardContentState,
  } from "@ui-sdk/svelte/hover-card"
  import { cn } from "$lib/utils/cn"
  import type { PartPropsPortable } from "$lib/utils/part-render"

  let {
    class: className,
    ...rest
  }: PartPropsPortable<"div", HoverCardContentState<Payload>> & HoverCardContentProps = $props()
</script>

<HoverCardContentPrimitive
  class={cn(
    "z-50 flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-lg border border-line bg-surface p-4 text-sm text-fg shadow-xl outline-none",
    "origin-[var(--transform-origin)] transition-[opacity,scale] duration-150 ease-out",
    "data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0",
    "data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0",
    "motion-reduce:transition-none",
    className,
  )}
  {...rest}
/>