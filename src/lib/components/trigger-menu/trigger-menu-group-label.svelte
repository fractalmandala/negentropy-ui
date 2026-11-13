<script lang="ts">
  import { TriggerMenuGroupLabel as TriggerMenuGroupLabelPrimitive } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<TriggerMenuGroupLabelPrimitive
  class={cn("px-2 py-1.5 text-xs font-medium text-faint", className)}
  {...rest}
/>