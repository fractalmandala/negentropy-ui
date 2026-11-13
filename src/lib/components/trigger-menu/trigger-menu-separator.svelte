<script lang="ts">
  import { TriggerMenuSeparator as TriggerMenuSeparatorPrimitive } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<TriggerMenuSeparatorPrimitive class={cn("-mx-1 my-1 h-px bg-line", className)} {...rest} />