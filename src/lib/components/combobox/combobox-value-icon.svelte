<script lang="ts">
  import { ComboboxValueIcon as ComboboxValueIconPrimitive } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span"> = $props()
</script>

<ComboboxValueIconPrimitive
  class={cn("flex shrink-0 text-muted [&_svg]:size-4", className)}
  {...rest}
/>