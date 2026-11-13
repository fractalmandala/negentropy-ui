<script lang="ts">
  import {
    FieldDescription as FieldDescriptionPrimitive,
    type FieldDescriptionState,
  } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"p", FieldDescriptionState> = $props()
</script>

<FieldDescriptionPrimitive
  class={cn("text-sm leading-relaxed text-muted data-[disabled]:opacity-50", className)}
  {...rest}
/>