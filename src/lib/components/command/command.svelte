<script lang="ts">
  import {
    Command as CommandPrimitive,
    type CommandOptions,
    type CommandState,
  } from "@ui-sdk/svelte/command"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "flex w-full flex-col overflow-hidden text-fg has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-ring",
    variants: {
      variant: {
        panel: "max-w-md rounded-xl border border-line bg-surface shadow-xl",
        bare: "bg-transparent",
      },
    },
    defaults: { variant: "panel" },
  })

  let {
    value = $bindable(),
    query = $bindable(),
    pages = $bindable(),
    variant = "panel",
    class: className,
    ...rest
  }: PartProps<"div", CommandState> &
    CommandOptions & {
      /** `panel` is a standalone palette; `bare` drops the frame for embedding in a dialog. */
      variant?: "panel" | "bare"
    } = $props()
</script>

<CommandPrimitive
  bind:value={value}
  bind:query={query}
  bind:pages={pages}
  data-variant={variant}
  class={cn(styles({ variant }), className)}
  {...rest}
/>