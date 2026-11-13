<script lang="ts">
  import { MenuGroup as MenuGroupPrimitive } from "@ui-sdk/svelte/menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<MenuGroupPrimitive class={cn(className)} {...rest} />