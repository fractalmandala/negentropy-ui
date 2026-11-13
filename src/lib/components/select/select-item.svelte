<script lang="ts">
  import {
    SelectItem as SelectItemPrimitive,
    type SelectItemProps,
    type SelectItemState,
  } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", SelectItemState> & SelectItemProps<any> = $props()
</script>

<SelectItemPrimitive
  class={cn(
    "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pe-8 ps-2 text-sm text-fg outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-elevated data-[selected]:font-medium",
    className,
  )}
  {...rest}
/>