<script lang="ts">
  import {
    DrawerBackdrop as DrawerBackdropPrimitive,
    type DrawerBackdropState,
  } from "@ui-sdk/svelte/drawer"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", DrawerBackdropState> = $props()
</script>

<DrawerBackdropPrimitive
  class={cn("fixed inset-0 z-50 bg-black/40", className)}
  {...rest}
/>