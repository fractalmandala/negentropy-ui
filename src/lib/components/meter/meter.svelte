<script lang="ts">
  import { Meter as MeterPrimitive, type MeterOptions, type MeterState } from "@ui-sdk/svelte/meter"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", MeterState> & MeterOptions = $props()
</script>

<MeterPrimitive
  class={cn("flex w-full flex-wrap items-center gap-x-3 gap-y-2", className)}
  {...rest}
/>