<script lang="ts">
  import {
    Button as ButtonPrimitive,
    type ButtonOptions,
    type ButtonState,
  } from "@ui-sdk/svelte/button"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[pending]:cursor-wait [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
      tone: {
        solid: "bg-accent text-accent-fg hover:bg-accent-hover",
        outline: "border border-line-strong bg-transparent text-fg hover:bg-elevated",
        ghost: "bg-transparent text-fg hover:bg-elevated",
        soft: "bg-accent-soft text-accent hover:bg-accent-soft/70",
        danger: "bg-danger text-danger-fg hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-[13px] [&_svg]:size-3.5",
        md: "h-9 px-4 text-sm [&_svg]:size-4",
        lg: "h-11 px-6 text-base [&_svg]:size-4.5",
        icon: "h-9 w-9 [&_svg]:size-4",
      },
    },
    defaults: { tone: "solid", size: "md" },
  })

  let {
    tone = "solid",
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", ButtonState, "type" | "onclick"> &
    ButtonOptions & {
      /** Visual style. */
      tone?: "solid" | "outline" | "ghost" | "soft" | "danger"
      /** Height and padding. `icon` is a square for a single icon. */
      size?: "sm" | "md" | "lg" | "icon"
    } = $props()
</script>

<ButtonPrimitive class={cn(styles({ tone, size }), className)} {...rest} />