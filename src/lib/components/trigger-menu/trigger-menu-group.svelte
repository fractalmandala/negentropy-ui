<script lang="ts">
  import { TriggerMenuGroup as TriggerMenuGroupPrimitive } from "@ui-sdk/svelte/trigger-menu"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<TriggerMenuGroupPrimitive class={cn(className)} {...rest} />