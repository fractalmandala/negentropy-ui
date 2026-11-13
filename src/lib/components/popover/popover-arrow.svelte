<script lang="ts">
  import { PopoverArrow as PopoverArrowPrimitive, type PopoverArrowState } from "@ui-sdk/svelte/popover"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", PopoverArrowState> = $props()
</script>

<PopoverArrowPrimitive
  class={cn(
    "pointer-events-none absolute size-2 rotate-45 border-line bg-surface",
    "data-[side=bottom]:-top-1 data-[side=bottom]:border-t data-[side=bottom]:border-l",
    "data-[side=top]:-bottom-1 data-[side=top]:border-r data-[side=top]:border-b",
    "data-[side=left]:-right-1 data-[side=left]:border-t data-[side=left]:border-r",
    "data-[side=right]:-left-1 data-[side=right]:border-b data-[side=right]:border-l",
    className,
  )}
  {...rest}
/>