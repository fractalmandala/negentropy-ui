<script lang="ts">
  import { CommandEmpty as CommandEmptyPrimitive, type CommandEmptyState } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", CommandEmptyState> = $props()
</script>

<CommandEmptyPrimitive
  class={cn("shrink-0 px-3 py-8 text-center text-sm text-muted", className)}
  {...rest}
/>