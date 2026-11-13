<script lang="ts">
  import {
    ToggleGroup as ToggleGroupPrimitive,
    type ToggleGroupOptions,
    type ToggleGroupState,
  } from "@ui-sdk/svelte/toggle"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex items-center gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    variants: {
      variant: {
        pills: "rounded-lg bg-elevated p-1",
        plain: "",
      },
    },
    defaults: { variant: "pills" },
  })

  let {
    value = $bindable(),
    variant = "pills",
    class: className,
    ...rest
  }: PartProps<"div", ToggleGroupState> &
    ToggleGroupOptions & {
      variant?: "pills" | "plain"
    } = $props()
</script>

<ToggleGroupPrimitive
  bind:value={value}
  class={cn(styles({ variant }), className)}
  {...rest}
/>