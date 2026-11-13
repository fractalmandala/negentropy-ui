<script lang="ts">
  import { ToolbarLink as ToolbarLinkPrimitive, type ToolbarLinkState } from "@ui-sdk/svelte/toolbar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"a", ToolbarLinkState> = $props()
</script>

<ToolbarLinkPrimitive
  class={cn(
    "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-fg no-underline transition-colors hover:bg-elevated hover:underline hover:underline-offset-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:text-faint [&_svg]:size-4 [&_svg]:shrink-0",
    className,
  )}
  {...rest}
/>