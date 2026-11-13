<script lang="ts">
  import { ListboxGroup as ListboxGroupPrimitive } from "@ui-sdk/svelte/listbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<ListboxGroupPrimitive class={cn("flex flex-col gap-px", className)} {...rest} />