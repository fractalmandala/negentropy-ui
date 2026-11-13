<script lang="ts">
  import { FieldLabel as FieldLabelPrimitive, type FieldState } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"label", FieldState> = $props()
</script>

<FieldLabelPrimitive
  class={cn(
    "text-sm font-medium text-fg data-[disabled]:opacity-50 data-[invalid]:text-danger data-[required]:after:ml-0.5 data-[required]:after:text-danger data-[required]:after:content-['*']",
    className,
  )}
  {...rest}
/>