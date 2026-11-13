<script lang="ts">
  import {
    FileInputList as FileInputListPrimitive,
    type FileInputState,
  } from "@ui-sdk/svelte/file-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", FileInputState> = $props()
</script>

<FileInputListPrimitive
  class={cn(
    "hidden flex-col items-stretch gap-px self-stretch rounded-lg border border-line bg-surface p-[5px] text-sm has-[[data-slot=file-input-item]]:flex",
    className,
  )}
  {...rest}
/>