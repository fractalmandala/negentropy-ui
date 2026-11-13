<script lang="ts">
  import { ProgressTrack as ProgressTrackPrimitive, type ProgressState } from "@ui-sdk/svelte/progress"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "group/progress relative flex w-full box-border overflow-hidden rounded-full border border-line bg-elevated",
    variants: {
      size: {
        sm: "h-2.5 p-px",
        md: "h-3.5 p-[2px]",
        lg: "h-5 p-[3px]",
      },
    },
    defaults: { size: "md" },
  })

  let {
    size = "md",
    tone = "accent",
    class: className,
    ...rest
  }: PartProps<"div", ProgressState> & {
    /** Height of the rail. */
    size?: "sm" | "md" | "lg"
    /** Colour of the fill. */
    tone?: "accent" | "success" | "warning" | "danger"
  } = $props()
</script>

<ProgressTrackPrimitive
  data-size={size}
  data-tone={tone}
  class={cn(styles({ size }), className)}
  {...rest}
/>