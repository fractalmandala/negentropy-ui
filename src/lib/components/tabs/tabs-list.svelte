<script lang="ts">
  import { TabsList as TabsListPrimitive, type TabsListState } from "@ui-sdk/svelte/tabs"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "group/tabs relative flex items-center gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
    variants: {
      variant: {
        underline:
          "border-b border-line data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r",
        pills: "rounded-lg bg-elevated p-1",
      },
    },
    defaults: { variant: "underline" },
  })

  let {
    variant = "underline",
    class: className,
    ...rest
  }: PartProps<"div", TabsListState> & {
    /** Visual style of the tab list and its tabs. */
    variant?: "underline" | "pills"
  } = $props()
</script>

<TabsListPrimitive data-variant={variant} class={cn(styles({ variant }), className)} {...rest} />