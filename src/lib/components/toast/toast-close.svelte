<script lang="ts">
  import {
    ToastClose as ToastClosePrimitive,
    type ToastButtonState,
    type ToastCloseProps,
  } from "@ui-sdk/svelte/toast"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", ToastButtonState> & ToastCloseProps = $props()
</script>

<ToastClosePrimitive
  class={cn(
    "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[pending]:cursor-wait [&_svg]:size-4",
    className,
  )}
  {...rest}
/>