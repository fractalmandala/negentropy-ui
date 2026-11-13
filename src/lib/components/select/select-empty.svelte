<script lang="ts">
  import { SelectEmpty as SelectEmptyPrimitive, type SelectEmptyState } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SelectEmptyState> = $props()
</script>

<SelectEmptyPrimitive
  class={cn("px-2 py-6 text-center text-sm text-muted", className)}
  {...rest}
/>