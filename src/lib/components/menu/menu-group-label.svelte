<script lang="ts">
  import { MenuGroupLabel as MenuGroupLabelPrimitive } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<MenuGroupLabelPrimitive
  class={cn("px-2 py-1.5 text-xs font-medium text-faint", className)}
  {...rest}
/>