<script lang="ts">
  import {
    Timeline as TimelinePrimitive,
    type TimelineOptions,
    type TimelineState,
  } from "@ui-sdk/svelte/timeline"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TimelineState> & TimelineOptions = $props()
</script>

<TimelinePrimitive
  class={cn(
    "flex flex-col data-[orientation=horizontal]:flex-row data-[busy]:opacity-60",
    className,
  )}
  {...rest}
/>