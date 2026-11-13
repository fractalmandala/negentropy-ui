<script lang="ts">
  import {
    InputClear as InputClearPrimitive,
    type InputGroupState,
  } from "@ui-sdk/svelte/input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", InputGroupState> = $props()
</script>

<InputClearPrimitive
  class={cn(
    "inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-40 [&_svg]:size-3.5",
    className,
  )}
  {...rest}
/>