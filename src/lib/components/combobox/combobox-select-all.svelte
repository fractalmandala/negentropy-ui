<script lang="ts">
  import { ComboboxSelectAll as ComboboxSelectAllPrimitive, type ComboboxSelectAllState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", ComboboxSelectAllState> = $props()
</script>

<ComboboxSelectAllPrimitive
  class={cn(
    "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm font-medium text-fg outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-elevated [&_svg]:absolute [&_svg]:end-2 [&_svg]:size-3.5",
    className,
  )}
  {...rest}
/>