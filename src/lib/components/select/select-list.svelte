<script lang="ts">
  import { SelectList as SelectListPrimitive, type SelectContentState } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SelectContentState> = $props()
</script>

<SelectListPrimitive
  class={cn("min-h-0 flex-1 scroll-py-2 overflow-y-auto overscroll-contain outline-none", className)}
  {...rest}
/>