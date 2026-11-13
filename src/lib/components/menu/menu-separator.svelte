<script lang="ts">
  import { MenuSeparator as MenuSeparatorPrimitive } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<MenuSeparatorPrimitive class={cn("-mx-1 my-1 h-px bg-line", className)} {...rest} />