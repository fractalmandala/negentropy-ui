export { default as OTPInput } from "./otp-input.svelte"
export { default as OTPInputGroup } from "./otp-input-group.svelte"
export { default as OTPInputSlot } from "./otp-input-slot.svelte"
export { default as OTPInputSeparator } from "./otp-input-separator.svelte"
export { createOTPInputController } from "@ui-sdk/svelte/otp-input"
export type {
  OTPInputChangeOptions,
  OTPInputController,
  OTPInputOptions,
  OTPInputPattern,
  OTPInputSlotData,
  OTPInputSlotProps,
  OTPInputSlotState,
  OTPInputState,
  OTPInputValueChangeReason,
} from "@ui-sdk/svelte/otp-input"