<script lang="ts">
  import {
    TriggerMenuItems as TriggerMenuItemsPrimitive,
    type TriggerMenuData,
  } from "@ui-sdk/svelte/trigger-menu"

  let {
    items,
    ...rest
  }: { items: TriggerMenuData<unknown>; [key: string]: unknown } = $props()
</script>

<TriggerMenuItemsPrimitive {items} {...rest} />