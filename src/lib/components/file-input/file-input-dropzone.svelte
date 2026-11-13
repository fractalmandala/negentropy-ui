<script lang="ts">
  import {
    FileInputDropzone as FileInputDropzonePrimitive,
    type FileInputDropzoneProps,
    type FileInputDropzoneState,
  } from "@ui-sdk/svelte/file-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "flex min-w-0 flex-col items-center gap-1 self-stretch rounded-lg border border-line bg-surface px-6 py-8 text-center transition-colors [&>svg]:mb-2 [&>svg]:size-6 [&>svg]:text-muted data-[dragging]:border-accent data-[dragging]:bg-accent-soft data-[drag-reject]:border-danger data-[drag-reject]:bg-danger/10 data-[drag-reject]:text-danger data-[drag-reject]:[&>svg]:text-danger data-[disabled]:text-faint",
    variants: {
      variant: {
        inline: "",
        overlay:
          "pointer-events-none fixed inset-0 z-50 hidden place-content-end-center rounded-none border-0 bg-transparent p-0 pb-8 shadow-[inset_0_0_0_2px_var(--color-accent)] data-[dragging]:grid",
      },
    },
    defaults: { variant: "inline" },
  })

  let {
    variant = "inline",
    class: className,
    ...rest
  }: PartProps<"div", FileInputDropzoneState> &
    FileInputDropzoneProps & {
      variant?: "inline" | "overlay"
    } = $props()
</script>

<FileInputDropzonePrimitive class={cn(styles({ variant }), className)} {...rest} />