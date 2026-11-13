<script lang="ts">
  import {
    SelectClear as SelectClearPrimitive,
    type SelectClearProps,
    type SelectClearState,
  } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", SelectClearState> & SelectClearProps = $props()
</script>

<SelectClearPrimitive
  class={cn(
    "inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-3.5",
    className,
  )}
  {...rest}
/>