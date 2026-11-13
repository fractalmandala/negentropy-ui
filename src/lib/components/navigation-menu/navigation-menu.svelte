<script lang="ts">
  import {
    NavigationMenu as NavigationMenuPrimitive,
    type NavigationMenuOptions,
    type NavigationMenuState,
  } from "@ui-sdk/svelte/navigation-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"nav", NavigationMenuState> & NavigationMenuOptions = $props()
</script>

<NavigationMenuPrimitive
  bind:value={value}
  class={cn(
    "group/nav relative flex w-fit items-center rounded-lg border border-line bg-surface p-1 shadow-sm data-[nested]:border-0 data-[nested]:bg-transparent data-[nested]:p-0 data-[nested]:shadow-none",
    className,
  )}
  {...rest}
/>