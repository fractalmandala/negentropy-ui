<script lang="ts">
  import {
    AccordionItem as AccordionItemPrimitive,
    type AccordionItemProps,
    type AccordionItemState,
  } from "@ui-sdk/svelte/accordion"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", AccordionItemState> & AccordionItemProps = $props()
</script>

<AccordionItemPrimitive
  class={cn(
    "group-data-[variant=bordered]/accordion:border-b group-data-[variant=bordered]/accordion:border-line",
    "group-data-[variant=cards]/accordion:rounded-lg group-data-[variant=cards]/accordion:border group-data-[variant=cards]/accordion:border-line group-data-[variant=cards]/accordion:bg-surface group-data-[variant=cards]/accordion:px-3",
    className,
  )}
  {...rest}
/>