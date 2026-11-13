<script lang="ts">
  import {
    FileInputItemRemove as FileInputItemRemovePrimitive,
    type FileInputItemRemoveState,
  } from "@ui-sdk/svelte/file-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", FileInputItemRemoveState, "type"> & {
    file?: File
  } = $props()
</script>

<FileInputItemRemovePrimitive
  class={cn(
    "inline-grid size-6 shrink-0 place-items-center rounded-sm border-0 bg-transparent p-0 text-muted transition-colors hover:not-data-[disabled]:bg-elevated hover:not-data-[disabled]:text-fg data-[disabled]:invisible [&>svg]:size-3.5",
    className,
  )}
  {...rest}
/>