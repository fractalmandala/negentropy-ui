<script lang="ts">
  import {
    ToolbarInput as ToolbarInputPrimitive,
    type ToolbarInputProps,
    type ToolbarInputState,
  } from "@ui-sdk/svelte/toolbar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", ToolbarInputState> & ToolbarInputProps = $props()
</script>

<ToolbarInputPrimitive
  class={cn(
    "h-8 w-36 shrink-0 rounded-md border border-line bg-bg px-2.5 text-sm text-fg transition-colors placeholder:text-faint hover:border-line-strong focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
    className,
  )}
  {...rest}
/>