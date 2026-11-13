<script lang="ts">
  import {
    FieldSet as FieldSetPrimitive,
    type FieldSetOptions,
    type FieldSetState,
  } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"fieldset", FieldSetState> & FieldSetOptions = $props()
</script>

<FieldSetPrimitive
  class={cn("m-0 flex w-full min-w-0 flex-col gap-4 border-0 p-0", className)}
  {...rest}
/>