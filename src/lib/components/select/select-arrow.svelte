<script lang="ts">
  import { SelectArrow as SelectArrowPrimitive, type SelectArrowState } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SelectArrowState> = $props()
</script>

<SelectArrowPrimitive
  class={cn("size-2 rotate-45 border-s border-t border-line bg-surface", className)}
  {...rest}
/>