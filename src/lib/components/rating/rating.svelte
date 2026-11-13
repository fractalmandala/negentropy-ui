<script lang="ts">
  import { Rating as RatingPrimitive, type RatingOptions, type RatingState } from "@ui-sdk/svelte/rating"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { value = $bindable(), class: className, ...rest }:
    PartProps<"div", RatingState> & RatingOptions = $props()
</script>

<RatingPrimitive
  bind:value={value}
  class={cn("inline-flex gap-0.5 data-[disabled]:opacity-60", className)}
  {...rest}
/>