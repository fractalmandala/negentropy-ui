<script lang="ts">
  import { SelectStatus as SelectStatusPrimitive, type SelectStatusState } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", SelectStatusState> = $props()
</script>

<SelectStatusPrimitive
  class={cn("shrink-0 border-t border-line px-2 pt-1.5 pb-0.5 text-xs text-muted empty:hidden", className)}
  {...rest}
/>