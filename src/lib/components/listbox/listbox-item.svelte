<script lang="ts">
  import {
    ListboxItem as ListboxItemPrimitive,
    type ListboxItemProps,
    type ListboxItemState,
  } from "@ui-sdk/svelte/listbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ListboxItemState> & ListboxItemProps<any> = $props()
</script>

<ListboxItemPrimitive
  class={cn(
    "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm text-fg outline-none select-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-elevated data-[selected]:bg-accent-soft data-[selected]:font-medium data-[selected]:data-[highlighted]:bg-accent-soft",
    className,
  )}
  {...rest}
/>