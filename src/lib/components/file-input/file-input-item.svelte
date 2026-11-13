<script lang="ts">
  import {
    FileInputItem as FileInputItemPrimitive,
    type FileInputItemState,
  } from "@ui-sdk/svelte/file-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", FileInputItemState> & {
    file?: File
  } = $props()
</script>

<FileInputItemPrimitive
  class={cn(
    "flex min-h-8 min-w-0 items-center gap-2 rounded-md ps-2.5 pe-1 outline-none focus-visible:bg-accent-soft focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-ring",
    "[&>svg]:shrink-0 [&>svg]:text-muted [&>span]:min-w-0 [&>span]:flex-1 [&>span]:truncate",
    "[&>[data-slot=hint]]:flex-none [&>[data-slot=hint]]:text-xs [&>[data-slot=hint]]:text-muted [&>[data-slot=hint]]:tabular-nums",
    className,
  )}
  {...rest}
/>