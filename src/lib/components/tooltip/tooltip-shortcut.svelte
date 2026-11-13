<script lang="ts">
  import {
    TooltipShortcut as TooltipShortcutPrimitive,
    type TooltipShortcutProps,
    type TooltipShortcutState,
  } from "@ui-sdk/svelte/tooltip"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", TooltipShortcutState> & TooltipShortcutProps = $props()
</script>

<TooltipShortcutPrimitive
  class={cn("ms-auto font-mono text-faint", className)}
  {...rest}
/>