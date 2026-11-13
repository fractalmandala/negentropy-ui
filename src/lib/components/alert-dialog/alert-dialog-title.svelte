<script lang="ts">
  import { AlertDialogTitle as AlertDialogTitlePrimitive } from "@ui-sdk/svelte/alert-dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"h2"> = $props()
</script>

<AlertDialogTitlePrimitive
  class={cn("text-base font-semibold tracking-tight text-fg", className)}
  {...rest}
/>