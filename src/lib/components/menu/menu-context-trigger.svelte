<script lang="ts">
  import {
    MenuContextTrigger as MenuContextTriggerPrimitive,
    type MenuContextTriggerProps,
    type MenuContextTriggerState,
  } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", MenuContextTriggerState> & MenuContextTriggerProps = $props()
</script>

<MenuContextTriggerPrimitive
  class={cn(
    "grid min-h-36 w-full max-w-sm cursor-default place-items-center rounded-lg border border-dashed border-line bg-surface px-4 text-center text-sm text-muted select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[open]:border-line-strong data-[open]:bg-elevated data-[open]:text-fg data-[disabled]:opacity-50",
    className,
  )}
  {...rest}
/>