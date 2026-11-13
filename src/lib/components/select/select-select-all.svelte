<script lang="ts">
  import { SelectSelectAll as SelectSelectAllPrimitive, type SelectSelectAllState } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SelectSelectAllState> = $props()
</script>

<SelectSelectAllPrimitive
  class={cn(
    "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm font-medium text-fg outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-elevated [&_svg]:absolute [&_svg]:end-2 [&_svg]:size-3.5",
    className,
  )}
  {...rest}
/>