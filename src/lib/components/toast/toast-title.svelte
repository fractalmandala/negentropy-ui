<script lang="ts">
  import { ToastTitle as ToastTitlePrimitive } from "@ui-sdk/svelte/toast"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div"> = $props()
</script>

<ToastTitlePrimitive
  class={cn("min-w-0 flex-1 text-sm leading-5 font-semibold text-fg", className)}
  {...rest}
/>