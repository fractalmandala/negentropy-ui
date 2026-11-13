<script lang="ts">
  import {
    WaterfallAxis as WaterfallAxisPrimitive,
    type WaterfallAxisProps,
    type WaterfallAxisState,
  } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", WaterfallAxisState> & WaterfallAxisProps = $props()
</script>

<WaterfallAxisPrimitive class={cn("@container relative h-full", className)} {...rest} />