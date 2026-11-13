<script lang="ts">
  import {
    DrawerOutlet as DrawerOutletPrimitive,
    type DrawerOutletProps,
    type DrawerOutletState,
  } from "@ui-sdk/svelte/drawer"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", DrawerOutletState> & DrawerOutletProps = $props()
</script>

<DrawerOutletPrimitive class={cn("block origin-top", className)} {...rest} />