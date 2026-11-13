<script lang="ts">
  import {
    SegmentedControlItem as SegmentedControlItemPrimitive,
    type SegmentedControlItemProps,
    type SegmentedControlItemState,
  } from "@ui-sdk/svelte/segmented-control"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", SegmentedControlItemState> & SegmentedControlItemProps = $props()
</script>

<SegmentedControlItemPrimitive
  class={cn(
    "relative z-10 inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[checked]:text-fg data-[disabled]:pointer-events-none data-[disabled]:text-faint data-[readonly]:cursor-default [&_svg]:size-4 [&_svg]:shrink-0",
    "group-data-[size=sm]/segmented:h-7 group-data-[size=sm]/segmented:px-2.5 group-data-[size=sm]/segmented:text-xs",
    "group-data-[size=lg]/segmented:h-9 group-data-[size=lg]/segmented:px-4 group-data-[size=lg]/segmented:text-base",
    className,
  )}
  {...rest}
/>