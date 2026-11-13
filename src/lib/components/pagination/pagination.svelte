<script lang="ts">
  import { Pagination as PaginationPrimitive, type PaginationOptions, type PaginationState } from "@ui-sdk/svelte/pagination"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { page = $bindable(), class: className, ...rest }:
    PartProps<"nav", PaginationState> & PaginationOptions = $props()
</script>

<PaginationPrimitive
  bind:page={page}
  class={cn(className)}
  {...rest}
/>