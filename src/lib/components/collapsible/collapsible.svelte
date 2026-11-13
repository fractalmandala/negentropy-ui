<script lang="ts">
  import {
    Collapsible as CollapsiblePrimitive,
    type CollapsibleOptions,
    type CollapsibleState,
  } from "@ui-sdk/svelte/collapsible"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "group/collapsible flex w-full flex-col gap-2",
    variants: {
      variant: {
        plain: "",
        card: "rounded-lg border border-line bg-surface p-3",
      },
    },
    defaults: { variant: "plain" },
  })

  let {
    open = $bindable(),
    variant = "plain",
    class: className,
    ...rest
  }: PartProps<"div", CollapsibleState> &
    CollapsibleOptions & {
      /** Bare disclosure, or a bordered surface around it. */
      variant?: "plain" | "card"
    } = $props()
</script>

<CollapsiblePrimitive
  bind:open={open}
  data-variant={variant}
  class={cn(styles({ variant }), className)}
  {...rest}
/>