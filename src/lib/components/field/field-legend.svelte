<script lang="ts">
  import { FieldLegend as FieldLegendPrimitive, type FieldSetState } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"legend", FieldSetState> = $props()
</script>

<FieldLegendPrimitive
  class={cn("mb-1 p-0 text-[15px] font-semibold text-fg data-[disabled]:opacity-50", className)}
  {...rest}
/>