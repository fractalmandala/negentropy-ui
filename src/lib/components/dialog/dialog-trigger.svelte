<script lang="ts">
  import {
    DialogTrigger as DialogTriggerPrimitive,
    type DialogTriggerProps,
    type DialogTriggerState,
  } from "@ui-sdk/svelte/dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", DialogTriggerState> & DialogTriggerProps = $props()
</script>

<DialogTriggerPrimitive
  class={cn(
    "inline-flex h-9 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
    className,
  )}
  {...rest}
/>