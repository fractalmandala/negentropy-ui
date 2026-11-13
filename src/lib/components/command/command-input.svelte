<script lang="ts">
  import { CommandInput as CommandInputPrimitive, type CommandInputState } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", CommandInputState> = $props()
</script>

<CommandInputPrimitive
  class={cn(
    "h-11 w-full min-w-0 shrink-0 border-b border-line bg-transparent px-3 text-sm text-fg outline-none disabled:opacity-50",
    className,
  )}
  {...rest}
/>