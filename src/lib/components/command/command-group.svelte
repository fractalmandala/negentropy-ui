<script lang="ts">
  import { CommandGroup as CommandGroupPrimitive } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div"> = $props()
</script>

<CommandGroupPrimitive
  class={cn("flex flex-col gap-0.5 py-1 [&:not(:has([data-slot=command-item]))]:hidden", className)}
  {...rest}
/>