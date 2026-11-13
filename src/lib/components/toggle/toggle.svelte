<script lang="ts">
  import {
    Toggle as TogglePrimitive,
    type ToggleOptions,
    type ToggleState,
  } from "@ui-sdk/svelte/toggle"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
      tone: {
        solid:
          "bg-elevated text-fg hover:bg-line data-[pressed]:bg-accent data-[pressed]:text-accent-fg data-[pressed]:hover:bg-accent-hover",
        outline:
          "border border-line-strong bg-transparent text-fg hover:bg-elevated data-[pressed]:border-accent data-[pressed]:bg-accent-soft data-[pressed]:text-accent",
        ghost:
          "bg-transparent text-muted hover:bg-elevated hover:text-fg data-[pressed]:bg-accent-soft data-[pressed]:text-accent",
      },
      size: {
        sm: "h-8 px-3 text-[13px] [&_svg]:size-3.5",
        md: "h-9 px-4 text-sm [&_svg]:size-4",
        lg: "h-11 px-6 text-base [&_svg]:size-4.5",
        icon: "h-9 w-9 [&_svg]:size-4",
      },
    },
    defaults: { tone: "outline", size: "md" },
  })

  let {
    pressed = $bindable(),
    tone = "outline",
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", ToggleState> &
    ToggleOptions & {
      tone?: "solid" | "outline" | "ghost"
      size?: "sm" | "md" | "lg" | "icon"
    } = $props()
</script>

<TogglePrimitive
  bind:pressed={pressed}
  class={cn(styles({ tone, size }), className)}
  {...rest}
/>