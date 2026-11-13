<script lang="ts">
  import { TabsIndicator as TabsIndicatorPrimitive, type TabsIndicatorState } from "@ui-sdk/svelte/tabs"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", TabsIndicatorState> = $props()
</script>

<TabsIndicatorPrimitive
  class={cn("absolute rounded-full bg-accent transition-all duration-200", className)}
  {...rest}
/>