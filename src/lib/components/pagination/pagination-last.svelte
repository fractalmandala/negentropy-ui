<script lang="ts">
  import { PaginationLast as PaginationLastPrimitive, type PaginationStepState } from "@ui-sdk/svelte/pagination"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"a", PaginationStepState> = $props()
</script>

<PaginationLastPrimitive
  class={cn("inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-md px-2 text-sm font-medium text-muted transition-colors hover:bg-elevated hover:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0", className)}
  {...rest}
/>