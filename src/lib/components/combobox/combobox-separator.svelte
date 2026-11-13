<script lang="ts">
  import { ComboboxSeparator as ComboboxSeparatorPrimitive } from "@ui-sdk/svelte/combobox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<ComboboxSeparatorPrimitive class={cn("-mx-1 my-1 h-px bg-line", className)} {...rest} />