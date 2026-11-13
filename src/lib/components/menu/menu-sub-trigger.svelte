<script lang="ts">
  import {
    MenuSubTrigger as MenuSubTriggerPrimitive,
    type MenuSubTriggerProps,
    type MenuTriggerState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", MenuTriggerState> & MenuSubTriggerProps = $props()
</script>

<MenuSubTriggerPrimitive
  class={cn(
    "group/item relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fg outline-none transition-colors select-none data-[highlighted]:bg-elevated data-[open]:bg-elevated data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&>svg:last-child]:ml-auto [&>svg:last-child]:size-3.5 [&>svg:last-child]:opacity-70",
    className,
  )}
  {...rest}
/>