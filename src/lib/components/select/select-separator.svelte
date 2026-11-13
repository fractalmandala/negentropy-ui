<script lang="ts">
  import { SelectSeparator as SelectSeparatorPrimitive } from "@ui-sdk/svelte/select"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<SelectSeparatorPrimitive class={cn("-mx-1 my-1 h-px bg-line", className)} {...rest} />