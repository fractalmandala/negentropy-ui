<script lang="ts">
  import {
    Input as InputPrimitive,
    type InputState,
    type TextControlProps,
  } from "@ui-sdk/svelte/input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "w-full min-w-0 rounded-md border border-line bg-surface text-fg transition-colors placeholder:text-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[readonly]:cursor-default data-[invalid]:border-danger",
    variants: {
      size: {
        sm: "h-8 px-2.5 text-[13px]",
        md: "h-9 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },
    defaults: { size: "md" },
  })

  let {
    value = $bindable(),
    size = "md",
    class: className,
    ...rest
  }: PartProps<"input", InputState, "value" | "defaultValue" | "defaultvalue" | "size"> &
    TextControlProps & {
      /** Height and padding. Replaces the native size attribute, which counts characters. */
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<InputPrimitive bind:value={value} class={cn(styles({ size }), className)} {...rest} />