<script lang="ts">
  import { SelectGroupLabel as SelectGroupLabelPrimitive } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<SelectGroupLabelPrimitive
  class={cn("px-2 py-1.5 text-xs font-medium text-faint", className)}
  {...rest}
/>