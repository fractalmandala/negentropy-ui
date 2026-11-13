<script lang="ts">
  import {
    TriggerMenuList as TriggerMenuListPrimitive,
    type TriggerMenuContentState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TriggerMenuContentState> = $props()
</script>

<TriggerMenuListPrimitive
  class={cn("max-h-[min(16rem,var(--list-height,16rem))] overflow-y-auto p-1", className)}
  {...rest}
/>