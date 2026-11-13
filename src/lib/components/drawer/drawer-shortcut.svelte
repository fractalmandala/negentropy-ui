<script lang="ts">
  import { DrawerShortcut as DrawerShortcutPrimitive } from "@ui-sdk/svelte/drawer"
  import type { DialogShortcutProps, DialogShortcutState } from "@ui-sdk/svelte/dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", DialogShortcutState> & DialogShortcutProps = $props()
</script>

<DrawerShortcutPrimitive
  class={cn("ml-auto font-mono text-xs text-faint", className)}
  {...rest}
/>