<script lang="ts">
  import { PaginationList as PaginationListPrimitive, type PaginationState } from "@ui-sdk/svelte/pagination"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"ul", PaginationState> = $props()
</script>

<PaginationListPrimitive
  class={cn("flex flex-wrap items-center justify-center gap-1", className)}
  {...rest}
/>