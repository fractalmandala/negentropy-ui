<script lang="ts">
  import {
    TimelineTitle as TimelineTitlePrimitive,
    type TimelineTitleState,
  } from "@ui-sdk/svelte/timeline"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TimelineTitleState> = $props()
</script>

<TimelineTitlePrimitive
  class={cn(
    "col-start-2 row-start-1 text-sm leading-5 font-medium text-fg data-[orientation=horizontal]:col-start-1 data-[orientation=horizontal]:row-start-2",
    className,
  )}
  {...rest}
/>