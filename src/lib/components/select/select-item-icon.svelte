<script lang="ts">
  import {
    SelectItemIcon as SelectItemIconPrimitive,
    type SelectItemIconProps,
    type SelectItemIconState,
  } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", SelectItemIconState> & SelectItemIconProps = $props()
</script>

<SelectItemIconPrimitive
  class={cn("flex shrink-0 text-muted [&_svg]:size-4", className)}
  {...rest}
/>