<script lang="ts">
  import {
    PasswordInputControl as PasswordInputControlPrimitive,
    type PasswordInputState,
  } from "@ui-sdk/svelte/password-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"input", PasswordInputState, "value" | "defaultValue" | "defaultvalue"> = $props()
</script>

<PasswordInputControlPrimitive
  class={cn(
    "h-full min-w-0 flex-1 bg-transparent text-sm text-fg outline-none disabled:cursor-not-allowed data-[readonly]:cursor-default data-[visible]:slashed-zero",
    "group-data-[size=sm]/password:text-[13px] group-data-[size=lg]/password:text-base",
    className,
  )}
  {...rest}
/>