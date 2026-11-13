<script lang="ts">
  import {
    ToastAction as ToastActionPrimitive,
    type ToastActionProps,
    type ToastButtonState,
  } from "@ui-sdk/svelte/toast"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", ToastButtonState> & ToastActionProps = $props()
</script>

<ToastActionPrimitive
  class={cn(
    "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-transparent px-3 text-xs font-medium text-fg transition-colors hover:bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[pending]:cursor-wait data-[pending]:opacity-70",
    className,
  )}
  {...rest}
/>