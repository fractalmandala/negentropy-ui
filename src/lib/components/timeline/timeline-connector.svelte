<script lang="ts">
  import {
    TimelineConnector as TimelineConnectorPrimitive,
    type TimelineConnectorState,
  } from "@ui-sdk/svelte/timeline"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TimelineConnectorState> = $props()
</script>

<TimelineConnectorPrimitive
  class={cn(
    "absolute col-auto top-6 bottom-1 start-[calc(0.625rem-1px)] w-0.5 bg-line group-last/item:hidden group-data-[last]/item:hidden data-[complete]:bg-accent",
    "data-[orientation=horizontal]:top-[calc(0.625rem-1px)] data-[orientation=horizontal]:bottom-auto data-[orientation=horizontal]:start-6 data-[orientation=horizontal]:end-1 data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-auto",
    className,
  )}
  {...rest}
/>