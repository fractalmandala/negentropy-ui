<script lang="ts">
  import {
    TriggerMenuInput as TriggerMenuInputPrimitive,
    type TriggerMenuInputState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"textarea", TriggerMenuInputState> = $props()
</script>

<TriggerMenuInputPrimitive
  class={cn(
    "min-h-20 w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-sm text-fg shadow-sm transition-colors placeholder:text-faint hover:border-line-strong focus-visible:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring disabled:opacity-50",
    className,
  )}
  {...rest}
/>