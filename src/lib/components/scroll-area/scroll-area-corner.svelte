<script lang="ts">
  import { ScrollAreaCorner as ScrollAreaCornerPrimitive } from "@ui-sdk/svelte/scroll-area"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<ScrollAreaCornerPrimitive class={cn(className)} {...rest} />