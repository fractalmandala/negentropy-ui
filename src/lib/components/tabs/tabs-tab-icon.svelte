<script lang="ts">
  import {
    TabsTabIcon as TabsTabIconPrimitive,
    type TabsTabIconProps,
    type TabsTabIconState,
  } from "@ui-sdk/svelte/tabs"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", TabsTabIconState> & TabsTabIconProps = $props()
</script>

<TabsTabIconPrimitive class={cn("inline-flex shrink-0 [&_svg]:size-4", className)} {...rest} />