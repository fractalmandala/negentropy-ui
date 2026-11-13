<script lang="ts">
  import { CommandSeparator as CommandSeparatorPrimitive } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div"> = $props()
</script>

<CommandSeparatorPrimitive class={cn("my-1 h-px shrink-0 bg-line", className)} {...rest} />