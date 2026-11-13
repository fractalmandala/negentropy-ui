<script lang="ts">
  import {
    TriggerMenuItemIcon as TriggerMenuItemIconPrimitive,
    type TriggerMenuItemIconProps,
    type TriggerMenuItemIconState,
  } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", TriggerMenuItemIconState> & TriggerMenuItemIconProps = $props()
</script>

<TriggerMenuItemIconPrimitive
  class={cn(
    "inline-flex shrink-0 text-muted transition-colors group-data-[highlighted]/item:text-fg [&_svg]:size-4",
    className,
  )}
  {...rest}
/>