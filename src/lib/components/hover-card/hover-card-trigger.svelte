<script lang="ts">
  import {
    HoverCardTrigger as HoverCardTriggerPrimitive,
    type HoverCardTriggerProps,
    type HoverCardTriggerState,
  } from "@ui-sdk/svelte/hover-card"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"a", HoverCardTriggerState> & HoverCardTriggerProps = $props()
</script>

<HoverCardTriggerPrimitive
  class={cn(
    "rounded-xs font-medium text-fg underline decoration-line underline-offset-3 transition-colors hover:decoration-fg data-[open]:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    className,
  )}
  {...rest}
/>