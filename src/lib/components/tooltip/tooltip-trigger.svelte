<script lang="ts">
  import {
    TooltipTrigger as TooltipTriggerPrimitive,
    type TooltipTriggerProps,
    type TooltipTriggerState,
  } from "@ui-sdk/svelte/tooltip"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    variants: {
      tone: {
        solid: "bg-accent text-accent-fg hover:bg-accent-hover",
        outline: "border border-line-strong bg-transparent text-fg hover:bg-elevated",
        ghost: "bg-transparent text-fg hover:bg-elevated",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaults: { tone: "outline", size: "md" },
  })

  let {
    tone = "outline",
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", TooltipTriggerState> &
    TooltipTriggerProps & {
      tone?: "solid" | "outline" | "ghost"
      size?: "sm" | "md" | "lg" | "icon"
    } = $props()
</script>

<TooltipTriggerPrimitive class={cn(styles({ tone, size }), className)} {...rest} />