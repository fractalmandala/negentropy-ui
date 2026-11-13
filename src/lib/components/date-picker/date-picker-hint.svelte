<script lang="ts">
  import {
    DatePickerHint as DatePickerHintPrimitive,
    type DatePickerHintState,
  } from "@ui-sdk/svelte/date-picker"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", DatePickerHintState> = $props()
</script>

<DatePickerHintPrimitive
  class={cn("min-h-4 text-xs tabular-nums text-muted", className)}
  {...rest}
/>