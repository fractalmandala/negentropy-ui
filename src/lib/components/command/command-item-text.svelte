<script lang="ts">
  import { CommandItemText as CommandItemTextPrimitive, type CommandItemTextState } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", CommandItemTextState> = $props()
</script>

<CommandItemTextPrimitive
  class={cn(
    "min-w-0 flex-1 truncate",
    "data-[matched]:text-muted group-data-[highlighted]/item:text-fg",
    "[&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-inherit [&_mark]:underline [&_mark]:decoration-1 [&_mark]:underline-offset-3",
    className,
  )}
  {...rest}
/>