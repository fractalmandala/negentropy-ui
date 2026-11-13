<script lang="ts">
  import {
    OTPInput as OTPInputPrimitive,
    type OTPInputOptions,
    type OTPInputState,
  } from "@ui-sdk/svelte/otp-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    value = $bindable(),
    size = "md",
    class: className,
    ...rest
  }: PartProps<"div", OTPInputState> &
    Omit<OTPInputOptions, "value"> & {
      value?: string
      /** Slot box size, shared by every slot through the group. */
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<OTPInputPrimitive
  bind:value={value}
  data-size={size}
  class={cn("group/otp inline-flex items-center gap-2", className)}
  {...rest}
/>