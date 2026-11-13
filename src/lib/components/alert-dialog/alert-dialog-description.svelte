<script lang="ts">
  import { AlertDialogDescription as AlertDialogDescriptionPrimitive } from "@ui-sdk/svelte/alert-dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"p"> = $props()
</script>

<AlertDialogDescriptionPrimitive
  class={cn("text-sm leading-relaxed text-muted", className)}
  {...rest}
/>