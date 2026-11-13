<script lang="ts">
  import {
    CollapsiblePanel as CollapsiblePanelPrimitive,
    type CollapsiblePanelProps,
    type CollapsiblePanelState,
  } from "@ui-sdk/svelte/collapsible"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", CollapsiblePanelState> & CollapsiblePanelProps = $props()
</script>

<CollapsiblePanelPrimitive
  class={cn(
    "h-[var(--collapsible-panel-height)] overflow-hidden text-sm text-muted transition-[height] duration-200 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0",
    className,
  )}
  {...rest}
/>