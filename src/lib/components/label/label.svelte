<script lang="ts">
  import { Label as LabelPrimitive, type LabelOptions } from "@ui-sdk/svelte/label"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"label"> & LabelOptions = $props()
</script>

<LabelPrimitive
  class={cn("inline-flex items-center gap-2 text-sm font-medium text-fg", className)}
  {...rest}
/>