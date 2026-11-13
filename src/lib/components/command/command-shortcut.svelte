<script lang="ts">
  import {
    CommandShortcut as CommandShortcutPrimitive,
    type CommandShortcutProps,
    type CommandShortcutState,
  } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", CommandShortcutState> & CommandShortcutProps = $props()
</script>

<CommandShortcutPrimitive
  class={cn("ms-auto shrink-0 font-mono text-xs text-faint", className)}
  {...rest}
/>