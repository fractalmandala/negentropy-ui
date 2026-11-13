<script lang="ts">
  import {
    ListboxItemIcon as ListboxItemIconPrimitive,
    type ListboxItemIconProps,
    type ListboxItemIconState,
  } from "@ui-sdk/svelte/listbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", ListboxItemIconState> & ListboxItemIconProps = $props()
</script>

<ListboxItemIconPrimitive
  class={cn("flex shrink-0 text-muted [&_svg]:size-4", className)}
  {...rest}
/>