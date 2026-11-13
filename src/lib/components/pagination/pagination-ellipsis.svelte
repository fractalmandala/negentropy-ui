<script lang="ts">
  import { PaginationEllipsis as PaginationEllipsisPrimitive } from "@ui-sdk/svelte/pagination"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span"> = $props()
</script>

<PaginationEllipsisPrimitive
  class={cn("inline-flex h-9 min-w-9 items-center justify-center text-muted [&_svg]:size-4", className)}
  {...rest}
/>