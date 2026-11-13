<script lang="ts">
  import { MeterValue as MeterValuePrimitive, type MeterValueState } from "@ui-sdk/svelte/meter"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", MeterValueState> = $props()
</script>

<MeterValuePrimitive
  class={cn("ml-auto text-sm text-muted tabular-nums", className)}
  {...rest}
/>