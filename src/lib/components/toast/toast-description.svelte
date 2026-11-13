<script lang="ts">
  import { ToastDescription as ToastDescriptionPrimitive } from "@ui-sdk/svelte/toast"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div"> = $props()
</script>

<ToastDescriptionPrimitive class={cn("min-w-0 text-sm text-muted", className)} {...rest} />