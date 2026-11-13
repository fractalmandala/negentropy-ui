<script lang="ts">
  import {
    ListboxItemIndicator as ListboxItemIndicatorPrimitive,
    type ListboxItemIndicatorProps,
    type ListboxItemIndicatorState,
  } from "@ui-sdk/svelte/listbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", ListboxItemIndicatorState> & ListboxItemIndicatorProps = $props()
</script>

<ListboxItemIndicatorPrimitive
  class={cn("absolute end-2 flex size-3.5 items-center justify-center text-accent [&_svg]:size-3.5", className)}
  {...rest}
/>