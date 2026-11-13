<script lang="ts">
  import {
    CommandItem as CommandItemPrimitive,
    type CommandItemProps,
    type CommandItemState,
  } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", CommandItemState> & CommandItemProps = $props()
</script>

<CommandItemPrimitive
  class={cn(
    "group/item flex cursor-default items-center gap-2 rounded-md px-2.5 py-2 text-sm text-fg select-none",
    "data-[highlighted]:bg-elevated data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[pending]:cursor-wait",
    "[&>svg]:ms-auto [&>svg]:size-3.5 [&>svg]:shrink-0 [&>svg]:text-faint",
    className,
  )}
  {...rest}
/>