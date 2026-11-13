<script lang="ts">
  import {
    WaterfallBar as WaterfallBarPrimitive,
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

<WaterfallBarPrimitive
  class={cn(
    "relative min-w-0 flex-1 basis-40 self-stretch content-center rounded-md outline-none",
    "before:absolute before:inset-y-[7px] before:start-[var(--waterfall-start)] before:w-[max(var(--waterfall-size),2px)] before:rounded-[3px] before:bg-accent/55 before:content-['']",
    "data-[selected]:before:bg-accent",
    "focus-visible:shadow-[inset_0_0_0_1px_var(--color-ring)]",
    className,
  )}
  {...rest}
/>