<script lang="ts">
  import {
    InputGroup as InputGroupPrimitive,
    type InputGroupOptions,
    type InputGroupState,
  } from "@ui-sdk/svelte/input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", InputGroupState> & InputGroupOptions = $props()
</script>

<InputGroupPrimitive
  class={cn(
    "flex w-full items-center gap-2 rounded-md border border-line bg-surface px-3 text-muted transition-colors has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring data-[disabled]:opacity-50 data-[readonly]:bg-elevated",
    "[&_[data-slot=input]]:min-w-0 [&_[data-slot=input]]:flex-1 [&_[data-slot=input]]:rounded-none [&_[data-slot=input]]:border-0 [&_[data-slot=input]]:bg-transparent [&_[data-slot=input]]:px-0 [&_[data-slot=input]]:outline-none",
    "[&>span:has(+input)]:-me-2 [&>input+span]:-ms-2",
    className,
  )}
  {...rest}
/>