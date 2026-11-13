<script lang="ts">
  import {
    MenuTrigger as MenuTriggerPrimitive,
    type MenuTriggerProps,
    type MenuTriggerState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    variants: {
      tone: {
        solid: "bg-accent text-accent-fg hover:bg-accent-hover data-[open]:bg-accent-hover",
        outline:
          "border border-line-strong bg-surface text-fg shadow-sm hover:bg-elevated data-[open]:bg-elevated",
        ghost: "bg-transparent text-fg hover:bg-elevated data-[open]:bg-elevated",
      },
      size: {
        sm: "h-8 px-2.5 text-[13px]",
        md: "h-9 px-4 text-sm",
      },
    },
    defaults: { tone: "outline", size: "md" },
  })

  let {
    tone = "outline",
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", MenuTriggerState> &
    MenuTriggerProps & {
      tone?: "solid" | "outline" | "ghost"
      size?: "sm" | "md"
    } = $props()
</script>

<MenuTriggerPrimitive
  class={cn(
    styles({ tone, size }),
    "group-data-[slot=menubar]/menubar:h-8 group-data-[slot=menubar]/menubar:rounded-md group-data-[slot=menubar]/menubar:border-0 group-data-[slot=menubar]/menubar:bg-transparent group-data-[slot=menubar]/menubar:px-2.5 group-data-[slot=menubar]/menubar:text-sm group-data-[slot=menubar]/menubar:shadow-none group-data-[slot=menubar]/menubar:hover:bg-elevated group-data-[slot=menubar]/menubar:data-[open]:bg-elevated",
    className,
  )}
  {...rest}
/>