<script lang="ts">
  import { FieldGroup as FieldGroupPrimitive } from "@ui-sdk/svelte/field"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<FieldGroupPrimitive class={cn("flex flex-col gap-4", className)} {...rest} />