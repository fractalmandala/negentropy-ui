<script lang="ts">
  import {
    TreeGroup as TreeGroupPrimitive,
    type TreeGroupProps,
    type TreeGroupState,
  } from "@ui-sdk/svelte/tree"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TreeGroupState> & TreeGroupProps = $props()
</script>

<TreeGroupPrimitive
  class={cn("flex flex-col gap-px", className)}
  {...rest}
/>