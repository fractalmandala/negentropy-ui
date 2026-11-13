<script lang="ts">
  import { PopoverDescription as PopoverDescriptionPrimitive } from "@ui-sdk/svelte/popover"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"p"> = $props()
</script>

<PopoverDescriptionPrimitive
  class={cn("text-sm leading-relaxed text-muted", className)}
  {...rest}
/>