<script lang="ts">
  import { ComboboxLabel as ComboboxLabelPrimitive } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"label"> = $props()
</script>

<ComboboxLabelPrimitive
  class={cn("text-sm font-medium text-fg data-[disabled]:opacity-50", className)}
  {...rest}
/>