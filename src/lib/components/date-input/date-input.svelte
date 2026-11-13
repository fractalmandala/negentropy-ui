<script lang="ts">
  import {
    DateInput as DateInputPrimitive,
    type DateInputOptions,
    type DateInputState,
  } from "@ui-sdk/svelte/date-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex w-auto items-center rounded-md border border-line bg-surface tabular-nums text-fg shadow-sm transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring data-[invalid]:border-danger data-[readonly]:bg-elevated data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-2.5 text-sm",
        lg: "h-11 px-3 text-base",
      },
    },
    defaults: { size: "md" },
  })

  let {
    value = $bindable(),
    size = "md",
    class: className,
    ...rest
  }: PartProps<"div", DateInputState> &
    Omit<DateInputOptions, "value"> & {
      value?: string | null
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<DateInputPrimitive bind:value={value} class={cn(styles({ size }), className)} {...rest} />