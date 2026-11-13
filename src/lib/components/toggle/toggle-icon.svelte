<script lang="ts">
  import {
    ToggleIcon as ToggleIconPrimitive,
    type ToggleIconProps,
    type ToggleIconState,
  } from "@ui-sdk/svelte/toggle"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", ToggleIconState> & ToggleIconProps = $props()
</script>

<ToggleIconPrimitive
  class={cn("inline-flex shrink-0 items-center justify-center rtl:data-[mirror]:-scale-x-100", className)}
  {...rest}
/>