<script lang="ts">
  import { DrawerTitle as DrawerTitlePrimitive } from "@ui-sdk/svelte/drawer"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"h2"> = $props()
</script>

<DrawerTitlePrimitive
  class={cn("text-[15px] leading-[22px] font-semibold text-fg", className)}
  {...rest}
/>