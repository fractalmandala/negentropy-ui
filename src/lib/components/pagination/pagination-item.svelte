<script lang="ts">
  import { PaginationItem as PaginationItemPrimitive } from "@ui-sdk/svelte/pagination"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"li"> = $props()
</script>

<PaginationItemPrimitive
  class={cn(className)}
  {...rest}
/>