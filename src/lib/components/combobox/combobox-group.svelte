<script lang="ts">
  import { ComboboxGroup as ComboboxGroupPrimitive } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<ComboboxGroupPrimitive class={cn("flex flex-col", className)} {...rest} />