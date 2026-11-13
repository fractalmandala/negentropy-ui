<script lang="ts">
  import {
    Avatar as AvatarPrimitive,
    type AvatarOptions,
    type AvatarState,
  } from "@ui-sdk/svelte/avatar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-elevated text-muted outline-1 -outline-offset-1 outline-line select-none data-[loading-status=error]:bg-accent-soft data-[loading-status=error]:text-accent",
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-xl",
      },
    },
    defaults: { size: "md" },
  })

  let {
    size = "md",
    class: className,
    ...rest
  }: PartProps<"span", AvatarState> &
    AvatarOptions & {
      size?: "sm" | "md" | "lg" | "xl"
    } = $props()
</script>

<AvatarPrimitive class={cn(styles({ size }), className)} {...rest} />