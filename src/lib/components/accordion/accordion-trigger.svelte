<script lang="ts">
  import {
    AccordionTrigger as AccordionTriggerPrimitive,
    type AccordionTriggerProps,
    type AccordionTriggerState,
  } from "@ui-sdk/svelte/accordion"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", AccordionTriggerState> & AccordionTriggerProps = $props()
</script>

<AccordionTriggerPrimitive
  class={cn(
    "flex flex-1 items-center gap-2 rounded-sm px-1 py-3 text-left text-sm font-medium text-fg transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "[&>svg]:shrink-0 [&>svg]:transition-transform [&>svg]:duration-200 [&[data-open]>svg]:rotate-180",
    className,
  )}
  {...rest}
/>