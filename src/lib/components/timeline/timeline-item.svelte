<script lang="ts">
  import {
    TimelineItem as TimelineItemPrimitive,
    type TimelineItemProps,
    type TimelineItemState,
  } from "@ui-sdk/svelte/timeline"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TimelineItemState> & TimelineItemProps = $props()
</script>

<TimelineItemPrimitive
  class={cn(
    "group/item relative grid grid-cols-[1.25rem_1fr] items-start gap-x-3 rounded-md pb-6 outline-offset-2 last:pb-0 data-[last]:pb-0 focus-visible:outline-2 focus-visible:outline-ring",
    "data-[orientation=horizontal]:w-32 data-[orientation=horizontal]:grid-cols-1 data-[orientation=horizontal]:gap-x-0 data-[orientation=horizontal]:gap-y-2 data-[orientation=horizontal]:pb-0 data-[orientation=horizontal]:pe-4",
    className,
  )}
  {...rest}
/>