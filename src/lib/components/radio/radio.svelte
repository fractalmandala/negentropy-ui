<script lang="ts">
  import { Radio as RadioPrimitive, type RadioProps, type RadioState } from "@ui-sdk/svelte/radio"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "group/radio inline-flex shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[checked]:border-accent data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[readonly]:cursor-default",
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-4",
        lg: "size-5",
      },
    },
    defaults: { size: "md" },
  })

  let {
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", RadioState> &
    RadioProps & {
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<RadioPrimitive
  data-size={size}
  class={cn(styles({ size }), className)}
  {...rest}
/>