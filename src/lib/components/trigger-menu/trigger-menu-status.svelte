<script lang="ts">
  import {
    TriggerMenuStatus as TriggerMenuStatusPrimitive,
    type TriggerMenuStatusState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TriggerMenuStatusState> = $props()
</script>

<TriggerMenuStatusPrimitive class={cn("text-sm text-muted", className)} {...rest} />