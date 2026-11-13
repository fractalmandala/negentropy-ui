<script lang="ts">
  import {
    AccordionHeader as AccordionHeaderPrimitive,
    type AccordionHeaderProps,
    type AccordionHeaderState,
  } from "@ui-sdk/svelte/accordion"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"h3", AccordionHeaderState> & AccordionHeaderProps = $props()
</script>

<AccordionHeaderPrimitive class={cn("m-0 flex text-base font-normal", className)} {...rest} />