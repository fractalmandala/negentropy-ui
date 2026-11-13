<script lang="ts">
  import {
    TabsPanel as TabsPanelPrimitive,
    type TabsPanelProps,
    type TabsPanelState,
  } from "@ui-sdk/svelte/tabs"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TabsPanelState> & TabsPanelProps = $props()
</script>

<TabsPanelPrimitive
  class={cn("text-sm text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring", className)}
  {...rest}
/>