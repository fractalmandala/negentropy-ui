<script lang="ts">
  import { ProgressIndicator as ProgressIndicatorPrimitive, type ProgressState } from "@ui-sdk/svelte/progress"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ProgressState> = $props()
</script>

<ProgressIndicatorPrimitive
  class={cn(
    "h-full rounded-full bg-accent transition-[width] duration-300 ease-out",
    "group-data-[tone=success]/progress:bg-success group-data-[tone=warning]/progress:bg-warning group-data-[tone=danger]/progress:bg-danger",
    "data-[indeterminate]:w-2/5 data-[indeterminate]:animate-pulse data-[indeterminate]:transition-none",
    "motion-reduce:data-[indeterminate]:w-full motion-reduce:data-[indeterminate]:animate-none motion-reduce:data-[indeterminate]:opacity-40",
    className,
  )}
  {...rest}
/>