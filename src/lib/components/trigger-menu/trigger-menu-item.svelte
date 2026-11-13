<script lang="ts">
  import {
    TriggerMenuItem as TriggerMenuItemPrimitive,
    type TriggerMenuItemProps,
    type TriggerMenuItemState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TriggerMenuItemState> & TriggerMenuItemProps = $props()
</script>

<TriggerMenuItemPrimitive
  class={cn(
    "group/item flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fg outline-none transition-colors select-none data-[highlighted]:bg-elevated data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    className,
  )}
  {...rest}
/>