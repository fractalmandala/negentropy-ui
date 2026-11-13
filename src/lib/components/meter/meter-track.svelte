<script lang="ts">
  import { MeterTrack as MeterTrackPrimitive, type MeterState } from "@ui-sdk/svelte/meter"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", MeterState> = $props()
</script>

<MeterTrackPrimitive
  class={cn("flex h-2.5 w-full overflow-hidden rounded-full bg-elevated p-0.5", className)}
  {...rest}
/>