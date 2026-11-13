<script lang="ts">
  import {
    Menubar as MenubarPrimitive,
    type MenubarOptions,
    type MenubarState,
  } from "@ui-sdk/svelte/menubar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", MenubarState> & MenubarOptions = $props()
</script>

<MenubarPrimitive
  class={cn(
    "group/menubar flex w-fit items-center gap-0.5 rounded-lg border border-line bg-surface p-1 data-[orientation=vertical]:min-w-32 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[disabled]:opacity-60",
    className,
  )}
  {...rest}
/>