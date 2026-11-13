<script lang="ts">
  import {
    DialogContent as DialogContentPrimitive,
    type DialogContentProps,
    type DialogContentState,
  } from "@ui-sdk/svelte/dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", DialogContentState> & DialogContentProps = $props()
</script>

<DialogContentPrimitive
  class={cn(
    "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100%-2rem))] flex-col gap-4 rounded-xl border border-line bg-surface p-5 text-fg shadow-2xl outline-none",
    "data-[presentation=sheet]:relative data-[presentation=sheet]:inset-auto data-[presentation=sheet]:m-0 data-[presentation=sheet]:mx-auto data-[presentation=sheet]:w-[min(36rem,100%)] data-[presentation=sheet]:max-h-none data-[presentation=sheet]:rounded-b-none",
    className,
  )}
  {...rest}
/>