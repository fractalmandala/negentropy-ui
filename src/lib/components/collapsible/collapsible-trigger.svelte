<script lang="ts">
  import {
    CollapsibleTrigger as CollapsibleTriggerPrimitive,
    type CollapsibleTriggerState,
  } from "@ui-sdk/svelte/collapsible"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", CollapsibleTriggerState> = $props()
</script>

<CollapsibleTriggerPrimitive
  class={cn(
    "inline-flex items-center justify-between gap-2 self-start rounded-md px-1 py-1.5 text-sm font-medium text-fg transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "group-data-[variant=card]/collapsible:self-stretch",
    "[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200 [&[data-open]>svg]:rotate-180",
    className,
  )}
  {...rest}
/>