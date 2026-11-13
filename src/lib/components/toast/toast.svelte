<script lang="ts">
  import { Toast as ToastPrimitive, type ToastState } from "@ui-sdk/svelte/toast"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"li", ToastState> = $props()
</script>

<ToastPrimitive
  class={cn(
    "group/toast absolute [inset-inline:0px] z-[calc(100_-_var(--toast-index))] flex h-[var(--toast-height)] box-border items-center gap-3 overflow-hidden rounded-lg border border-line bg-surface p-4 text-sm text-fg shadow-lg outline-offset-2 select-none",
    "[--y:calc(var(--dir)*var(--toast-index)*0.75rem)]",
    "[translate:calc(var(--toast-swipe-x,0px)_+_var(--exit-x,0px))_calc(var(--y)_+_var(--toast-swipe-y,0px)_+_var(--exit-y,0px)*var(--slide,1))]",
    "scale-[calc(1_-_var(--toast-index)*0.05)]",
    "transition-[translate,scale,opacity,height,box-shadow] duration-[400ms] ease",
    "group-data-[side=bottom]/toasts:bottom-0 group-data-[side=top]/toasts:top-0",
    "data-[type=success]:border-success/40 data-[type=error]:border-danger/40 data-[type=warning]:border-warning/40 data-[type=info]:border-accent/40",
    "before:pointer-events-none before:absolute before:inset-0 before:bg-inherit before:opacity-0 before:transition-inherit before:content-['']",
    "[&:not([data-front],[data-expanded])]:h-[var(--toast-front-height)] [&:not([data-front],[data-expanded])]:before:opacity-100",
    "data-[expanded]:[--y:calc(var(--dir)*(var(--toast-offset)_+_var(--toast-index)*0.75rem))] data-[expanded]:scale-100 data-[expanded]:duration-[200ms] data-[expanded]:ease-out",
    "data-[starting-style]:transition-none [&[data-starting-style]:not([data-front])]:opacity-0 [&[data-starting-style][data-front]]:[--y:calc(var(--dir)*-100%)]",
    "data-[ending-style]:opacity-0 data-[ending-style]:duration-[200ms] data-[ending-style]:ease-out",
    "motion-safe:data-[ending-style]:[--exit-y:calc(var(--dir)*-100%)]",
    "motion-safe:data-[ending-style]:data-[swipe-direction=left]:[--exit-x:-100%] motion-safe:data-[ending-style]:data-[swipe-direction=right]:[--exit-x:100%]",
    "[&[data-ending-style]:not([data-front],[data-expanded])]:[--exit-y:0px]",
    "data-[swipe-direction=left]:[--slide:0] data-[swipe-direction=right]:[--slide:0]",
    "data-[swiping]:transition-none",
    "motion-reduce:transition-opacity",
    className,
  )}
  {...rest}
/>