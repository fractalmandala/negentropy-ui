<script lang="ts">
  import { WaterfallColumnHeader as WaterfallColumnHeaderPrimitive } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<WaterfallColumnHeaderPrimitive
  class={cn(
    "w-16 flex-none",
    "first:flex first:min-w-24 first:flex-[0_1_11rem] first:items-center first:gap-1 first:overflow-hidden first:whitespace-nowrap",
    "last:relative last:min-w-0 last:flex-1 last:basis-40 last:self-stretch",
    className,
  )}
  {...rest}
/>