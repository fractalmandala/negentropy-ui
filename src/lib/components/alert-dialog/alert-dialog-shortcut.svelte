<script lang="ts">
  import {
    AlertDialogShortcut as AlertDialogShortcutPrimitive,
    type AlertDialogShortcutProps,
    type AlertDialogShortcutState,
  } from "@ui-sdk/svelte/alert-dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", AlertDialogShortcutState> & AlertDialogShortcutProps = $props()
</script>

<AlertDialogShortcutPrimitive
  class={cn("ml-auto font-mono text-xs text-faint", className)}
  {...rest}
/>