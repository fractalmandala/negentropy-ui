<script lang="ts">
  import {
    SelectValue as SelectValuePrimitive,
    type SelectValueProps,
    type SelectValueState,
  } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", SelectValueState> & SelectValueProps = $props()
</script>

<SelectValuePrimitive
  class={cn(
    "flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-start data-[placeholder]:text-muted",
    className,
  )}
  {...rest}
/>