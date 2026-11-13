<script lang="ts">
  import {
    NumberInputScrubAreaCursor as NumberInputScrubAreaCursorPrimitive,
    type NumberInputState,
  } from "@ui-sdk/svelte/number-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", NumberInputState> = $props()
</script>

<!-- The core positions it in the body with an inline translate, so the negative margins center the icon on the pointer. -->
<NumberInputScrubAreaCursorPrimitive
  class={cn("-mt-2.5 -ms-2.5 text-fg [&_svg]:size-5", className)}
  {...rest}
/>