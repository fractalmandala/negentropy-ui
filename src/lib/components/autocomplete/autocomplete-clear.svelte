<script lang="ts">
  import {
    AutocompleteClear as AutocompleteClearPrimitive,
    type AutocompleteClearProps,
    type AutocompleteClearState,
  } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", AutocompleteClearState> & AutocompleteClearProps = $props()
</script>

<AutocompleteClearPrimitive
  class={cn(
    "inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-3.5",
    className,
  )}
  {...rest}
/>