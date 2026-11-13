<script lang="ts">
  import {
    TabsTab as TabsTabPrimitive,
    type TabsTabProps,
    type TabsTabState,
  } from "@ui-sdk/svelte/tabs"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", TabsTabState> & TabsTabProps = $props()
</script>

<TabsTabPrimitive
  class={cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[selected]:text-fg",
    "group-data-[variant=underline]/tabs:rounded-none group-data-[variant=underline]/tabs:border-b-2 group-data-[variant=underline]/tabs:border-transparent group-data-[variant=underline]/tabs:data-[selected]:border-accent group-data-[variant=underline]/tabs:data-[selected]:text-accent",
    "group-data-[variant=pills]/tabs:rounded-md group-data-[variant=pills]/tabs:data-[selected]:bg-surface group-data-[variant=pills]/tabs:data-[selected]:text-fg group-data-[variant=pills]/tabs:data-[selected]:shadow-sm",
    className,
  )}
  {...rest}
/>