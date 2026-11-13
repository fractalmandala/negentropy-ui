<script lang="ts">
  import {
    Separator as SeparatorPrimitive,
    type SeparatorOptions,
    type SeparatorState,
  } from "@ui-sdk/svelte/separator"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
    variants: {
      variant: {
        solid: "bg-line",
        dashed:
          "border-dashed border-line bg-transparent data-[orientation=horizontal]:border-t data-[orientation=vertical]:border-l",
      },
    },
    defaults: { variant: "solid" },
  })

  let {
    variant = "solid",
    class: className,
    ...rest
  }: PartProps<"div", SeparatorState> &
    SeparatorOptions & {
      /** A filled line, or a dashed one. */
      variant?: "solid" | "dashed"
    } = $props()
</script>

<SeparatorPrimitive class={cn(styles({ variant }), className)} {...rest} />