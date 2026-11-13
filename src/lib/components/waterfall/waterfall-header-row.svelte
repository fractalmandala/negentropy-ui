<script lang="ts">
  import { WaterfallHeaderRow as WaterfallHeaderRowPrimitive } from "@ui-sdk/svelte/waterfall"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<WaterfallHeaderRowPrimitive
  class={cn("flex h-8 items-center gap-2 rounded-md px-2 text-sm text-muted", className)}
  {...rest}
/>