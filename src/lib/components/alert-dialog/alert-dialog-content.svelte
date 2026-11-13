<script lang="ts">
  import { AlertDialogContent as AlertDialogContentPrimitive } from "@ui-sdk/svelte/alert-dialog"
  import { type DialogContentProps, type DialogContentState } from "@ui-sdk/svelte/dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  // AlertDialogContent is the dialog content part, so it carries the dialog's
  // state (presentation may be "sheet"); the narrower alert state would not fit.
  let {
    class: className,
    ...rest
  }: PartProps<"div", DialogContentState> & DialogContentProps = $props()
</script>

<AlertDialogContentPrimitive
  class={cn(
    "fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[min(22rem,calc(100%-2rem))] flex-col gap-4 rounded-xl border border-line bg-surface p-5 text-fg shadow-2xl outline-none",
    "transition-[opacity,translate,scale] duration-200 data-[starting-style]:translate-y-4 data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0 data-[ending-style]:translate-y-4 data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0 data-[ending-style]:duration-150",
    "data-[nested-open]:-translate-y-3 data-[nested-open]:scale-[0.97]",
    className,
  )}
  {...rest}
/>