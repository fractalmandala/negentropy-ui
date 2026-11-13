<script lang="ts">
  import {
    CalendarPrevious as CalendarPreviousPrimitive,
    type CalendarStepState,
  } from "@ui-sdk/svelte/calendar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-40 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 [&_svg]:size-4",
    variants: {
      tone: {
        ghost: "text-muted hover:bg-elevated hover:text-fg",
        outline: "border border-line text-muted hover:bg-elevated hover:text-fg",
        solid: "bg-accent text-accent-fg hover:bg-accent-hover",
      },
    },
    defaults: { tone: "ghost" },
  })

  let {
    tone = "ghost",
    class: className,
    ...rest
  }: PartProps<"button", CalendarStepState> & {
    tone?: "ghost" | "outline" | "solid"
  } = $props()
</script>

<CalendarPreviousPrimitive class={cn(styles({ tone }), className)} {...rest} />