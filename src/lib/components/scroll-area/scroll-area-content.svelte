<script lang="ts">
  import {
    ScrollAreaContent as ScrollAreaContentPrimitive,
    type ScrollAreaState,
  } from "@ui-sdk/svelte/scroll-area"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", ScrollAreaState> = $props()
</script>

<ScrollAreaContentPrimitive class={cn("px-4 py-3 text-sm text-fg", className)} {...rest} />