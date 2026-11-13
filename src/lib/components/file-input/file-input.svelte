<script lang="ts">
  import {
    FileInput as FileInputPrimitive,
    type FileInputOptions,
    type FileInputState,
  } from "@ui-sdk/svelte/file-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartProps<"div", FileInputState> & FileInputOptions = $props()
</script>

<FileInputPrimitive
  bind:value={value}
  class={cn("flex w-full max-w-80 min-w-0 flex-col items-start gap-3", className)}
  {...rest}
/>