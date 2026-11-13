<script lang="ts">
  import { MenuItems as MenuItemsPrimitive, type MenuData } from "@ui-sdk/svelte/menu"

  let { items, ...rest }: { items: MenuData; [key: string]: unknown } = $props()
</script>

<MenuItemsPrimitive {items} {...rest} />