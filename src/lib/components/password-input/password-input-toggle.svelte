<script lang="ts">
  import {
    PasswordInputToggle as PasswordInputTogglePrimitive,
    type PasswordInputState,
  } from "@ui-sdk/svelte/password-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"button", PasswordInputState> = $props()
</script>

<PasswordInputTogglePrimitive
  class={cn(
    "inline-flex size-6 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-elevated hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[visible]:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-40 [&_svg]:size-4",
    className,
  )}
  {...rest}
/>