<script lang="ts">
  import { MeterIndicator as MeterIndicatorPrimitive, type MeterState } from "@ui-sdk/svelte/meter"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "h-full rounded-full transition-[width] duration-300",
    variants: {
      tone: {
        accent: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        danger: "bg-danger",
      },
    },
    defaults: { tone: "accent" },
  })

  let { tone = "accent", class: className, ...rest }:
    PartProps<"div", MeterState> & { tone?: "accent" | "success" | "warning" | "danger" } = $props()
</script>

<MeterIndicatorPrimitive
  class={cn(styles({ tone }), className)}
  {...rest}
/>