<script lang="ts">
  import { CommandStatus as CommandStatusPrimitive, type CommandStatusState } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", CommandStatusState> = $props()
</script>

<CommandStatusPrimitive
  class={cn("shrink-0 border-b border-line px-3 py-1.5 text-xs text-muted", className)}
  {...rest}
/>