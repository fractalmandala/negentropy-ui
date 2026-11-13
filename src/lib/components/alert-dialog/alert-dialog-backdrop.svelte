<script lang="ts">
  import {
    AlertDialogBackdrop as AlertDialogBackdropPrimitive,
    type AlertDialogBackdropState,
  } from "@ui-sdk/svelte/alert-dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", AlertDialogBackdropState> = $props()
</script>

<AlertDialogBackdropPrimitive
  class={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", className)}
  {...rest}
/>