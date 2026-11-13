<script lang="ts">
  import {
    Tabs as TabsPrimitive,
    type TabsOptions,
    type TabsState,
  } from "@ui-sdk/svelte/tabs"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", TabsState> & TabsOptions = $props()
</script>

<TabsPrimitive
  bind:value={value}
  class={cn("flex flex-col gap-3 data-[orientation=vertical]:flex-row", className)}
  {...rest}
/>