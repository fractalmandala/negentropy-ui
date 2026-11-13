<script lang="ts">
  import {
    Progress as ProgressPrimitive,
    type ProgressOptions,
    type ProgressState,
  } from "@ui-sdk/svelte/progress"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ProgressState> & ProgressOptions = $props()
</script>

<ProgressPrimitive
  class={cn("flex w-full flex-wrap items-center gap-x-3 gap-y-2", className)}
  {...rest}
/>