<script lang="ts">
  import {
    Textarea as TextareaPrimitive,
    type TextControlProps,
    type TextareaOptions,
    type TextareaState,
  } from "@ui-sdk/svelte/textarea"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "w-full min-w-0 rounded-md border border-line bg-surface text-fg transition-colors placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[readonly]:cursor-default data-[invalid]:border-danger",
    variants: {
      size: {
        sm: "px-2.5 py-1.5 text-[13px]",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
      resize: {
        vertical: "resize-y",
        none: "resize-none",
        both: "resize",
      },
    },
    defaults: { size: "md", resize: "vertical" },
  })

  let {
    value = $bindable(),
    size = "md",
    resize = "vertical",
    class: className,
    ...rest
  }: PartProps<"textarea", TextareaState, "value" | "defaultValue" | "defaultvalue"> &
    TextControlProps &
    TextareaOptions & {
      /** Text size and padding. */
      size?: "sm" | "md" | "lg"
      /** Which way the user can drag the corner. Use `none` with autoResize. */
      resize?: "vertical" | "none" | "both"
    } = $props()
</script>

<TextareaPrimitive
  bind:value={value}
  class={cn(styles({ size, resize }), className)}
  {...rest}
/>