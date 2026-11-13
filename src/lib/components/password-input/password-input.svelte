<script lang="ts">
  import {
    PasswordInput as PasswordInputPrimitive,
    type PasswordInputOptions,
    type PasswordInputState,
  } from "@ui-sdk/svelte/password-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "group/password flex w-full items-center gap-1 rounded-md border border-line bg-surface px-3 transition-colors has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring data-[disabled]:opacity-50 data-[readonly]:bg-elevated",
    variants: {
      size: { sm: "h-8", md: "h-9", lg: "h-11" },
    },
    defaults: { size: "md" },
  })

  let {
    value = $bindable(),
    visible = $bindable(),
    size = "md",
    class: className,
    ...rest
  }: PartProps<"div", PasswordInputState> &
    Omit<PasswordInputOptions, "value" | "visible"> & {
      /** The password. */
      value?: string
      /** Whether the password is shown. */
      visible?: boolean
      /** Height of the field box. */
      size?: "sm" | "md" | "lg"
    } = $props()
</script>

<PasswordInputPrimitive
  bind:value={value}
  bind:visible={visible}
  data-size={size}
  class={cn(styles({ size }), className)}
  {...rest}
/>