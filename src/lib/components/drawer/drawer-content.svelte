<script lang="ts">
  import {
    DrawerContent as DrawerContentPrimitive,
    type DrawerContentProps,
    type DrawerContentState,
  } from "@ui-sdk/svelte/drawer"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", DrawerContentState> & DrawerContentProps = $props()
</script>

<DrawerContentPrimitive
  class={cn(
    "relative flex w-full max-h-[85dvh] flex-col gap-4 border border-line bg-surface p-[18px] pb-[max(18px,env(safe-area-inset-bottom))] text-fg shadow-2xl outline-none",
    "after:pointer-events-none after:absolute after:bg-inherit after:content-['']",
    "data-[side=bottom]:mx-auto data-[side=bottom]:h-fit data-[side=bottom]:max-w-[32rem] data-[side=bottom]:rounded-t-xl data-[side=bottom]:after:inset-x-0 data-[side=bottom]:after:top-full data-[side=bottom]:after:h-24",
    "data-[side=top]:mx-auto data-[side=top]:h-fit data-[side=top]:max-w-[32rem] data-[side=top]:rounded-b-xl data-[side=top]:after:inset-x-0 data-[side=top]:after:bottom-full data-[side=top]:after:h-24",
    "data-[side=left]:h-full data-[side=left]:max-h-none data-[side=left]:w-80 data-[side=left]:max-w-[85vw] data-[side=left]:rounded-r-xl data-[side=left]:after:inset-y-0 data-[side=left]:after:right-full data-[side=left]:after:w-24",
    "data-[side=right]:h-full data-[side=right]:max-h-none data-[side=right]:w-80 data-[side=right]:max-w-[85vw] data-[side=right]:rounded-l-xl data-[side=right]:after:inset-y-0 data-[side=right]:after:left-full data-[side=right]:after:w-24",
    '[&[data-snap-point]:not([data-snap-point="content"])]:h-[calc(100dvh-3rem)] [&[data-snap-point]:not([data-snap-point="content"])]:max-h-none',
    "data-[nested-open]:scale-[0.97] data-[dragging]:select-none",
    className,
  )}
  {...rest}
/>