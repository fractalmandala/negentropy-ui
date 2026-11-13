<script lang="ts">
  import { SelectItemText as SelectItemTextPrimitive, type SelectItemTextState } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", SelectItemTextState> = $props()
</script>

<SelectItemTextPrimitive
  class={cn(
    "min-w-0 flex-1 truncate data-[matched]:text-muted [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-fg",
    className,
  )}
  {...rest}
/>