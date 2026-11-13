<script lang="ts">
  import {
    TimelineDescription as TimelineDescriptionPrimitive,
    type TimelineDescriptionState,
  } from "@ui-sdk/svelte/timeline"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TimelineDescriptionState> = $props()
</script>

<TimelineDescriptionPrimitive
  class={cn(
    "col-start-2 mt-1 text-sm text-muted data-[orientation=horizontal]:col-start-1",
    className,
  )}
  {...rest}
/>