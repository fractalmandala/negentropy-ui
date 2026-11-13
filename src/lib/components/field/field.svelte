<script lang="ts">
  import {
    Field as FieldPrimitive,
    type FieldOptions,
    type FieldState,
  } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div", FieldState> & FieldOptions = $props()
</script>

<FieldPrimitive class={cn("flex w-full min-w-0 flex-col gap-2", className)} {...rest} />