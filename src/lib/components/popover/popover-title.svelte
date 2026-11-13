<script lang="ts">
  import { PopoverTitle as PopoverTitlePrimitive } from "@ui-sdk/svelte/popover"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"h2"> = $props()
</script>

<PopoverTitlePrimitive
  class={cn("text-sm leading-5 font-semibold text-fg", className)}
  {...rest}
/>