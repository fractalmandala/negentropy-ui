<script lang="ts">
  import { CommandGroupLabel as CommandGroupLabelPrimitive } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div"> = $props()
</script>

<CommandGroupLabelPrimitive
  class={cn("px-2.5 py-1.5 text-xs font-medium text-faint", className)}
  {...rest}
/>