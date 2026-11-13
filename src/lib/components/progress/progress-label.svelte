<script lang="ts">
  import { ProgressLabel as ProgressLabelPrimitive, type ProgressState } from "@ui-sdk/svelte/progress"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", ProgressState> = $props()
</script>

<ProgressLabelPrimitive class={cn("text-sm font-medium text-fg", className)} {...rest} />