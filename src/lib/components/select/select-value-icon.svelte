<script lang="ts">
  import { SelectValueIcon as SelectValueIconPrimitive } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span"> = $props()
</script>

<SelectValueIconPrimitive
  class={cn("flex shrink-0 text-muted [&_svg]:size-4", className)}
  {...rest}
/>