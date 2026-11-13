<script lang="ts">
  import { PaginationLink as PaginationLinkPrimitive, type PaginationLinkProps, type PaginationLinkState } from "@ui-sdk/svelte/pagination"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium tabular-nums transition-colors",
    variants: {
      variant: {
        soft: "text-muted hover:bg-elevated hover:text-fg data-[current]:bg-accent-soft data-[current]:text-accent",
        solid: "text-muted hover:bg-elevated hover:text-fg data-[current]:bg-accent data-[current]:text-accent-fg",
        outline: "border border-line text-muted hover:bg-elevated hover:text-fg data-[current]:border-accent data-[current]:text-accent",
      },
    },
    defaults: { variant: "soft" },
  })

  let { variant = "soft", class: className, ...rest }:
    PartProps<"a", PaginationLinkState> & PaginationLinkProps & {
      variant?: "soft" | "solid" | "outline"
    } = $props()
</script>

<PaginationLinkPrimitive
  class={cn(styles({ variant }), className)}
  {...rest}
/>