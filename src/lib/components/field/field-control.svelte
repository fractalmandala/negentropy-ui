<script lang="ts">
  import { FieldControl as FieldControlPrimitive, type FieldState } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"input", FieldState> = $props()
</script>

<FieldControlPrimitive
  class={cn(
    "h-9 w-full min-w-0 rounded-md border border-line bg-surface px-3 text-sm text-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[invalid]:border-danger",
    className,
  )}
  {...rest}
/>