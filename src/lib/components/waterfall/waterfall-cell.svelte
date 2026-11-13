<script lang="ts">
  import {
    WaterfallCell as WaterfallCellPrimitive,
    type WaterfallRowPartProps,
    type WaterfallRowState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", WaterfallRowState> & WaterfallRowPartProps = $props()
</script>

<WaterfallCellPrimitive
  class={cn(
    "w-16 flex-none self-stretch content-center rounded-md text-muted tabular-nums outline-none",
    "focus-visible:shadow-[inset_0_0_0_1px_var(--color-ring)]",
    className,
  )}
  {...rest}
/>