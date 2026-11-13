<script lang="ts">
  import { ComboboxArrow as ComboboxArrowPrimitive, type ComboboxArrowState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", ComboboxArrowState> = $props()
</script>

<ComboboxArrowPrimitive
  class={cn("size-2 rotate-45 border-s border-t border-line bg-surface", className)}
  {...rest}
/>