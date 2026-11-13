<script lang="ts">
  import { ListboxGroupLabel as ListboxGroupLabelPrimitive } from "@ui-sdk/svelte/listbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<ListboxGroupLabelPrimitive
  class={cn("px-2 py-1.5 text-xs font-medium text-faint", className)}
  {...rest}
/>