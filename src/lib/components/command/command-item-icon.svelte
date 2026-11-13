<script lang="ts">
  import {
    CommandItemIcon as CommandItemIconPrimitive,
    type CommandItemIconProps,
    type CommandItemIconState,
  } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", CommandItemIconState> & CommandItemIconProps = $props()
</script>

<CommandItemIconPrimitive
  class={cn(
    "flex shrink-0 text-muted [&_svg]:size-3.5",
    "group-data-[highlighted]/item:text-fg group-data-[disabled]/item:text-fg",
    className,
  )}
  {...rest}
/>