<script lang="ts">
  import { RatingItem as RatingItemPrimitive, type RatingItemState } from "@ui-sdk/svelte/rating"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"
  import { defineVariants } from "$lib/utils/variants"

  const styles = defineVariants({
    base: `relative inline-flex text-line [--rating-color:var(--color-accent)] data-[highlighted]:[--rating-color:var(--color-muted)] [&>svg]:shrink-0 before:pointer-events-none before:absolute before:inset-0 before:content-[''] before:bg-[linear-gradient(to_right,var(--rating-color)_calc(var(--rating-fill)*100%),transparent_0)] before:[mask-image:url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M11.525%202.295a.53.53%200%200%201%20.95%200l2.31%204.679a2.123%202.123%200%200%200%201.595%201.16l5.166.756a.53.53%200%201%20.294.904l-3.736%203.638a2.123%202.123%200%200%200-.611%201.878l.882%205.14a.53.53%200%201-.771.56l-4.618-2.428a2.122%202.122%200%200%200-1.973%200L6.396%2021.01a.53.53%200%201-.77-.56l.881-5.139a2.122%202.122%200%200%200-.611-1.879L2.16%209.795a.53.53%200%201%20.294-.906l5.165-.755a2.122%202.122%200%200%200%201.597-1.16z'%20stroke='black'%20stroke-width='2'%20stroke-linejoin='round'/%3E%3C/svg%3E")] before:[mask-repeat:no-repeat] before:[mask-size:100%_100%] rtl:before:bg-[linear-gradient(to_left,var(--rating-color)_calc(var(--rating-fill)*100%),transparent_0)] [&_[data-slot=rating-radio]]:cursor-pointer [&_[data-slot=rating-radio]]:rounded-xs [&_[data-slot=rating-radio]:focus-visible]:outline-offset-0 data-[disabled]:[&_[data-slot=rating-radio]]:cursor-default data-[readonly]:[&_[data-slot=rating-radio]]:cursor-default`,
    variants: {
      size: {
        sm: "[&>svg]:size-4",
        md: "[&>svg]:size-6",
        lg: "[&>svg]:size-8",
      },
    },
    defaults: { size: "md" },
  })

  let { size = "md", class: className, ...rest }:
    PartProps<"span", RatingItemState> & { size?: "sm" | "md" | "lg" } = $props()
</script>

<RatingItemPrimitive
  class={cn(styles({ size }), className)}
  {...rest}
/>