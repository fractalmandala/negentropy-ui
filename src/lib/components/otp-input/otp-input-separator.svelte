<script lang="ts">
  import {
    OTPInputSeparator as OTPInputSeparatorPrimitive,
    type OTPInputState,
  } from "@ui-sdk/svelte/otp-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", OTPInputState> = $props()
</script>

<OTPInputSeparatorPrimitive
  class={cn("flex items-center text-muted data-[disabled]:opacity-50 [&_svg]:size-4", className)}
  {...rest}
/>