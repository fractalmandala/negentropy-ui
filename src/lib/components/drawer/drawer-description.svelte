<script lang="ts">
  import { DrawerDescription as DrawerDescriptionPrimitive } from "@ui-sdk/svelte/drawer"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"p"> = $props()
</script>

<DrawerDescriptionPrimitive
  class={cn("text-sm leading-relaxed text-muted", className)}
  {...rest}
/>