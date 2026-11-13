<script lang="ts">
  import { CommandList as CommandListPrimitive, type CommandListState } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", CommandListState> = $props()
</script>

<CommandListPrimitive
  class={cn(
    "relative max-h-72 min-h-0 flex-1 scroll-py-1.5 overflow-x-hidden overflow-y-auto overscroll-contain p-1.5 outline-none",
    "[&:not(:has([data-slot=command-item]))]:hidden",
    "data-[has-icons]:[&_[data-slot=command-item]:not([data-has-icon])]:ps-8",
    className,
  )}
  {...rest}
/>