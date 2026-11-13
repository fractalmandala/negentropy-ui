<script lang="ts">
  import { SelectGroup as SelectGroupPrimitive } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<SelectGroupPrimitive class={cn("flex flex-col", className)} {...rest} />