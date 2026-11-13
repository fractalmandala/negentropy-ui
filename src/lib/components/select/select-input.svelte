<script lang="ts">
  import { SelectInput as SelectInputPrimitive, type SelectInputState } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"input", SelectInputState> = $props()
</script>

<SelectInputPrimitive
  class={cn(
    "h-8 w-full shrink-0 rounded-md border border-line bg-elevated px-2 text-sm text-fg placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring",
    className,
  )}
  {...rest}
/>