<script lang="ts">
  import {
    ProgressValue as ProgressValuePrimitive,
    type ProgressValueState,
  } from "@ui-sdk/svelte/progress"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", ProgressValueState> = $props()
</script>

<ProgressValuePrimitive
  class={cn("ms-auto text-sm text-muted tabular-nums", className)}
  {...rest}
/>