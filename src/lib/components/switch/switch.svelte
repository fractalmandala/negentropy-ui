<script lang="ts">
  import {
    Switch as SwitchPrimitive,
    type SwitchOptions,
    type SwitchState,
  } from "@ui-sdk/svelte/switch"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "group/switch relative inline-flex shrink-0 items-center rounded-full bg-line-strong p-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[checked]:bg-accent data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[readonly]:cursor-default",
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaults: { size: "md" },
  })

  let {
    checked = $bindable(),
    size = "md",
    class: className,
    ...rest
  }: PartProps<"button", SwitchState> &
    SwitchOptions & {
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<SwitchPrimitive
  bind:checked={checked}
  data-size={size}
  class={cn(styles({ size }), className)}
  {...rest}
/>