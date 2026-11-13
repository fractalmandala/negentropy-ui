<script lang="ts">
  import {
    ToolbarSeparator as ToolbarSeparatorPrimitive,
    type ToolbarSeparatorState,
  } from "@ui-sdk/svelte/toolbar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", ToolbarSeparatorState> = $props()
</script>

<ToolbarSeparatorPrimitive
  class={cn(
    "shrink-0 bg-line data-[orientation=vertical]:mx-1 data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px data-[orientation=horizontal]:my-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-4",
    className,
  )}
  {...rest}
/>