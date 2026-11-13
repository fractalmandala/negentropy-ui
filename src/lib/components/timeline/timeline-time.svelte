<script lang="ts">
  import {
    TimelineTime as TimelineTimePrimitive,
    type TimelineTimeState,
  } from "@ui-sdk/svelte/timeline"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"time", TimelineTimeState> = $props()
</script>

<TimelineTimePrimitive
  class={cn(
    "col-start-2 text-xs text-muted tabular-nums data-[orientation=horizontal]:col-start-1",
    className,
  )}
  {...rest}
/>