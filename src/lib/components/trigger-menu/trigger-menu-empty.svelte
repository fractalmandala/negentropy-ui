<script lang="ts">
  import {
    TriggerMenuEmpty as TriggerMenuEmptyPrimitive,
    type TriggerMenuEmptyState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TriggerMenuEmptyState> = $props()
</script>

<TriggerMenuEmptyPrimitive
  class={cn("px-2 py-6 text-center text-sm text-muted", className)}
  {...rest}
/>