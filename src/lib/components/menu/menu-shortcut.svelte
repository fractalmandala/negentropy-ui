<script lang="ts">
  import { MenuShortcut as MenuShortcutPrimitive } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span"> = $props()
</script>

<MenuShortcutPrimitive
  class={cn("ml-auto pl-4 text-xs tracking-widest text-faint", className)}
  {...rest}
/>