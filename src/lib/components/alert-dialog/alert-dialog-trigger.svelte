<script lang="ts">
  import {
    AlertDialogTrigger as AlertDialogTriggerPrimitive,
    type AlertDialogTriggerProps,
    type AlertDialogTriggerState,
  } from "@ui-sdk/svelte/alert-dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"
  import { defineVariants } from "#lib/utils/variants"

  const styles = defineVariants({
    base: "inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
    variants: {
      tone: {
        solid: "bg-accent text-accent-fg hover:bg-accent-hover",
        outline: "border border-line-strong bg-transparent text-fg hover:bg-elevated",
        ghost: "bg-transparent text-fg hover:bg-elevated",
        danger: "bg-danger text-danger-fg hover:opacity-90",
      },
    },
    defaults: { tone: "solid" },
  })

  let {
    tone = "solid",
    class: className,
    ...rest
  }: PartProps<"button", AlertDialogTriggerState> &
    AlertDialogTriggerProps & {
      tone?: "solid" | "outline" | "ghost" | "danger"
    } = $props()
</script>

<AlertDialogTriggerPrimitive class={cn(styles({ tone }), className)} {...rest} />