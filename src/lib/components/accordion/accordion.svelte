<script lang="ts">
  import {
    Accordion as AccordionPrimitive,
    type AccordionOptions,
    type AccordionState,
  } from "@ui-sdk/svelte/accordion"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "group/accordion flex w-full flex-col",
    variants: {
      variant: {
        bordered: "border-t border-line",
        cards: "gap-2",
      },
    },
    defaults: { variant: "bordered" },
  })

  let {
    value = $bindable(),
    variant = "bordered",
    class: className,
    ...rest
  }: PartProps<"div", AccordionState> &
    AccordionOptions & {
      /** Divided rows, or separate bordered cards. */
      variant?: "bordered" | "cards"
    } = $props()
</script>

<AccordionPrimitive
  bind:value={value}
  data-variant={variant}
  class={cn(styles({ variant }), className)}
  {...rest}
/>