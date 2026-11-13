<script lang="ts">
  import {
    TriggerMenuHint as TriggerMenuHintPrimitive,
    type TriggerMenuHintState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", TriggerMenuHintState> = $props()
</script>

<TriggerMenuHintPrimitive class={cn("pointer-events-none text-faint", className)} {...rest} />