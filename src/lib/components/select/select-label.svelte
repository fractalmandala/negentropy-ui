<script lang="ts">
  import { SelectLabel as SelectLabelPrimitive } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<SelectLabelPrimitive
  class={cn("text-sm font-medium text-fg data-[disabled]:opacity-50", className)}
  {...rest}
/>