<script lang="ts">
  import { DialogBackdrop as DialogBackdropPrimitive, type DialogBackdropState } from "@ui-sdk/svelte/dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", DialogBackdropState> = $props()
</script>

<DialogBackdropPrimitive
  class={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
  {...rest}
/>