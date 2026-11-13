export { default as Dialog } from "./dialog.svelte"
export { default as DialogTrigger } from "./dialog-trigger.svelte"
export { default as DialogBackdrop } from "./dialog-backdrop.svelte"
export { default as DialogContent } from "./dialog-content.svelte"
export { default as DialogTitle } from "./dialog-title.svelte"
export { default as DialogDescription } from "./dialog-description.svelte"
export { default as DialogClose } from "./dialog-close.svelte"
export { createDialogController } from "@ui-sdk/svelte/dialog"
export type {
  DialogController,
  DialogOpenChangeDetails,
  DialogOptions,
} from "@ui-sdk/svelte/dialog"