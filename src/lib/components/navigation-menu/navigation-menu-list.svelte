<script lang="ts">
  import {
    NavigationMenuList as NavigationMenuListPrimitive,
    type NavigationMenuListState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"ul", NavigationMenuListState> = $props()
</script>

<NavigationMenuListPrimitive
  class={cn(
    "flex flex-row flex-wrap items-center gap-0.5 data-[orientation=vertical]:w-48 data-[orientation=vertical]:flex-col data-[orientation=vertical]:flex-nowrap data-[orientation=vertical]:items-stretch",
    className,
  )}
  {...rest}
/>