<script lang="ts">
  import { ComboboxItemText as ComboboxItemTextPrimitive, type ComboboxItemTextState } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", ComboboxItemTextState> = $props()
</script>

<ComboboxItemTextPrimitive
  class={cn(
    "min-w-0 flex-1 truncate data-[matched]:text-muted [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-fg",
    className,
  )}
  {...rest}
/>