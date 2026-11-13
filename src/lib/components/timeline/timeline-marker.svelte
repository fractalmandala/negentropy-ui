<script lang="ts">
  import {
    TimelineMarker as TimelineMarkerPrimitive,
    type TimelineMarkerState,
  } from "@ui-sdk/svelte/timeline"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TimelineMarkerState> = $props()
</script>

<TimelineMarkerPrimitive
  class={cn(
    "col-start-1 row-start-1 grid size-5 shrink-0 place-items-center self-center rounded-full border-2 border-line-strong bg-surface text-surface [&>svg]:size-2.5 [&>svg]:stroke-[3]",
    "data-[complete]:border-accent data-[complete]:bg-accent data-[complete]:text-accent-fg",
    "data-[current]:border-accent data-[current]:ring-4 data-[current]:ring-accent-soft",
    "data-[upcoming]:border-dashed",
    className,
  )}
  {...rest}
/>