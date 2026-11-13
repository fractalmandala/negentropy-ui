<script lang="ts">
  import {
    FieldError as FieldErrorPrimitive,
    type FieldErrorProps,
    type FieldErrorState,
  } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", FieldErrorState> & FieldErrorProps = $props()
</script>

<FieldErrorPrimitive
  class={cn("text-sm leading-relaxed text-danger data-[disabled]:opacity-50", className)}
  {...rest}
/>