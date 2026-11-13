<script lang="ts">
  import {
    CarouselNext as CarouselNextPrimitive,
    type CarouselControlProps,
    type CarouselNextState,
  } from "@ui-sdk/svelte/carousel"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex size-9 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:cursor-default data-[disabled]:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
    variants: {
      variant: {
        outline:
          "border border-line bg-surface text-fg hover:bg-elevated data-[disabled]:hover:bg-surface",
        ghost: "bg-transparent text-fg hover:bg-elevated data-[disabled]:hover:bg-transparent",
        solid:
          "bg-accent text-accent-fg hover:bg-accent-hover data-[disabled]:hover:bg-accent",
      },
    },
    defaults: { variant: "outline" },
  })

  let {
    variant = "outline",
    class: className,
    ...rest
  }: PartProps<"button", CarouselNextState> &
    CarouselControlProps & {
      variant?: "outline" | "ghost" | "solid"
    } = $props()
</script>

<CarouselNextPrimitive class={cn(styles({ variant }), className)} {...rest} />