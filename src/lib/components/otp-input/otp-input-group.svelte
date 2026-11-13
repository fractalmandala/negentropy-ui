<script lang="ts">
  import { OTPInputGroup as OTPInputGroupPrimitive, type OTPInputState } from "@ui-sdk/svelte/otp-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", OTPInputState> = $props()
</script>

<OTPInputGroupPrimitive class={cn("flex", className)} {...rest} />