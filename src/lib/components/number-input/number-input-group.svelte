<script lang="ts">
  import {
    NumberInputGroup as NumberInputGroupPrimitive,
    type NumberInputState,
  } from "@ui-sdk/svelte/number-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "group/number flex w-full items-center rounded-md border border-line bg-surface p-0.5 transition-colors has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring data-[disabled]:opacity-50 data-[readonly]:bg-elevated",
    variants: {
      size: { sm: "h-8", md: "h-9", lg: "h-11" },
    },
    defaults: { size: "md" },
  })

  let {
    size = "md",
    class: className,
    ...rest
  }: PartProps<"div", NumberInputState> & {
    /** Height of the field box. Its control and step buttons fill it. */
    size?: "sm" | "md" | "lg"
  } = $props()
</script>

<NumberInputGroupPrimitive
  data-size={size}
  class={cn(styles({ size }), className)}
  {...rest}
/>