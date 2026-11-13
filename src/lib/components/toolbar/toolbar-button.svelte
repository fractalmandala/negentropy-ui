<script lang="ts">
  import {
    ToolbarButton as ToolbarButtonPrimitive,
    type ToolbarButtonProps,
    type ToolbarButtonState,
  } from "@ui-sdk/svelte/toolbar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", ToolbarButtonState> & ToolbarButtonProps = $props()
</script>

<ToolbarButtonPrimitive
  class={cn(
    "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-fg transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:text-faint data-[pressed]:bg-accent-soft data-[pressed]:text-accent has-[>svg:only-child]:w-8 has-[>svg:only-child]:px-0 [&_svg]:size-4 [&_svg]:shrink-0",
    className,
  )}
  {...rest}
/>