<script lang="ts">
  import { ToastRegion as ToastRegionPrimitive, type ToastRegionProps } from "@ui-sdk/svelte/toast"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: ToastRegionProps = $props()
</script>

<ToastRegionPrimitive
  class={cn(
    "group/toasts box-border h-[var(--toast-front-height)] w-[min(22rem,calc(100vw-2rem))] m-4 p-0 outline-none",
    "[--dir:-1] data-[side=top]:[--dir:1]",
    "data-[align=center]:mx-0",
    "data-[expanded]:h-[calc(var(--toast-stack-height)_+_(var(--toast-count)_-_1)_*_0.75rem)]",
    className,
  )}
  {...rest}
/>