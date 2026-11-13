<script lang="ts">
  import {
    PopoverShortcut as PopoverShortcutPrimitive,
    type PopoverShortcutProps,
    type PopoverShortcutState,
  } from "@ui-sdk/svelte/popover"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", PopoverShortcutState> & PopoverShortcutProps = $props()
</script>

<PopoverShortcutPrimitive
  class={cn("ml-auto font-mono text-xs text-faint", className)}
  {...rest}
/>