<script lang="ts">
  import {
    AvatarFallback as AvatarFallbackPrimitive,
    type AvatarFallbackProps,
    type AvatarState,
  } from "@ui-sdk/svelte/avatar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", AvatarState> & AvatarFallbackProps = $props()
</script>

<AvatarFallbackPrimitive
  class={cn("flex size-full items-center justify-center font-medium [&_svg]:size-1/2", className)}
  {...rest}
/>