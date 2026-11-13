<script lang="ts">
  import { ListboxSeparator as ListboxSeparatorPrimitive } from "@ui-sdk/svelte/listbox"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<ListboxSeparatorPrimitive class={cn("-mx-1 my-1 h-px bg-line", className)} {...rest} />