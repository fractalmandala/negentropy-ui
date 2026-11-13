<script lang="ts">
  import {
    SelectTrigger as SelectTriggerPrimitive,
    type SelectTriggerProps,
    type SelectTriggerState,
  } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex w-full min-w-48 items-center justify-between gap-2 rounded-md border border-line bg-surface text-start font-normal text-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[readonly]:bg-elevated [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:last-child]:text-muted",
    variants: {
      size: {
        sm: "h-8 px-2.5 text-[13px] [&_svg]:size-3.5",
        md: "h-9 px-3 text-sm [&_svg]:size-4",
        lg: "h-11 px-4 text-base [&_svg]:size-4.5",
      },
    },
    defaults: { size: "md" },
  })

  let {
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", SelectTriggerState> &
    SelectTriggerProps & {
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<SelectTriggerPrimitive class={cn(styles({ size }), className)} {...rest} />