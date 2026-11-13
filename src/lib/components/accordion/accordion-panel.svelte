<script lang="ts">
  import {
    AccordionPanel as AccordionPanelPrimitive,
    type AccordionPanelProps,
    type AccordionPanelState,
  } from "@ui-sdk/svelte/accordion"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", AccordionPanelState> & AccordionPanelProps = $props()
</script>

<AccordionPanelPrimitive
  class={cn(
    "h-[var(--accordion-panel-height)] overflow-hidden text-sm text-muted transition-[height] duration-200 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0",
    className,
  )}
  {...rest}
/>