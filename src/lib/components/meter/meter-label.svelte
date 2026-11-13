<script lang="ts">
  import { MeterLabel as MeterLabelPrimitive, type MeterState } from "@ui-sdk/svelte/meter"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", MeterState> = $props()
</script>

<MeterLabelPrimitive
  class={cn("text-sm font-medium text-fg", className)}
  {...rest}
/>