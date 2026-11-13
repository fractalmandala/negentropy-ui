<script lang="ts">
  import { ComboboxList as ComboboxListPrimitive, type ComboboxContentState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", ComboboxContentState> = $props()
</script>

<ComboboxListPrimitive
  class={cn("min-h-0 flex-1 scroll-py-2 overflow-y-auto overscroll-contain outline-none", className)}
  {...rest}
/>