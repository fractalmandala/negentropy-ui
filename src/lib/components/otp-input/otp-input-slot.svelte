<script lang="ts">
  import {
    OTPInputSlot as OTPInputSlotPrimitive,
    type OTPInputSlotProps,
    type OTPInputSlotState,
  } from "@ui-sdk/svelte/otp-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", OTPInputSlotState> & OTPInputSlotProps = $props()
</script>

<OTPInputSlotPrimitive
  class={cn(
    "relative -ml-px grid size-10 place-items-center border border-line bg-surface text-base tabular-nums text-fg transition-colors first:ml-0 first:rounded-l-md last:rounded-r-md data-[active]:z-10 data-[active]:border-fg data-[active]:outline-2 data-[active]:outline-offset-0 data-[active]:outline-ring data-[disabled]:opacity-50 group-has-[[aria-invalid=true]]/otp:border-danger",
    "group-data-[size=sm]/otp:size-8 group-data-[size=sm]/otp:text-sm group-data-[size=lg]/otp:size-12 group-data-[size=lg]/otp:text-lg",
    "data-[fake-caret]:after:absolute data-[fake-caret]:after:h-4 data-[fake-caret]:after:w-px data-[fake-caret]:after:bg-fg data-[fake-caret]:after:content-[''] motion-safe:data-[fake-caret]:after:animate-pulse",
    className,
  )}
  {...rest}
/>