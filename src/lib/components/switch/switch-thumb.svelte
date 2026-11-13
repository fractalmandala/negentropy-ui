<script lang="ts">
  import { SwitchThumb as SwitchThumbPrimitive, type SwitchThumbState } from "@ui-sdk/svelte/switch"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"span", SwitchThumbState> = $props()
</script>

<SwitchThumbPrimitive
  class={cn(
    "pointer-events-none flex items-center justify-center rounded-full bg-fg text-bg shadow-sm transition-transform duration-200",
    "group-data-[size=sm]/switch:size-3 group-data-[size=sm]/switch:[&_svg]:size-2 group-data-[size=sm]/switch:ltr:data-[checked]:translate-x-3 group-data-[size=sm]/switch:rtl:data-[checked]:-translate-x-3",
    "group-data-[size=md]/switch:size-4 group-data-[size=md]/switch:[&_svg]:size-2.5 group-data-[size=md]/switch:ltr:data-[checked]:translate-x-4 group-data-[size=md]/switch:rtl:data-[checked]:-translate-x-4",
    "group-data-[size=lg]/switch:size-5 group-data-[size=lg]/switch:[&_svg]:size-3 group-data-[size=lg]/switch:ltr:data-[checked]:translate-x-5 group-data-[size=lg]/switch:rtl:data-[checked]:-translate-x-5",
    className,
  )}
  {...rest}
/>