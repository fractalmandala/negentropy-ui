<script lang="ts">
  import {
    Checkbox as CheckboxPrimitive,
    type CheckboxOptions,
    type CheckboxState,
  } from "@ui-sdk/svelte/checkbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex shrink-0 items-center justify-center rounded-sm border border-line-strong bg-surface text-accent-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[checked]:border-accent data-[checked]:bg-accent data-[indeterminate]:border-accent data-[indeterminate]:bg-accent data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[readonly]:cursor-default",
    variants: {
      size: {
        sm: "size-3.5 [&_svg]:size-2.5",
        md: "size-4 [&_svg]:size-3",
        lg: "size-5 [&_svg]:size-3.5",
      },
    },
    defaults: { size: "md" },
  })

  let {
    checked = $bindable(),
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", CheckboxState> &
    CheckboxOptions & {
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<CheckboxPrimitive
  bind:checked={checked}
  class={cn(styles({ size }), className)}
  {...rest}
/>