<script lang="ts">
  import type { TreeItemData } from "@ui-sdk/svelte/tree"
  import TreeItem from "./tree-item.svelte"
  import TreeGroup from "./tree-group.svelte"
  import TreeItemLabel from "./tree-item-label.svelte"
  import TreeItemIndicator from "./tree-item-indicator.svelte"
  import TreeItemCheckbox from "./tree-item-checkbox.svelte"
  import Self from "./tree-items.svelte"

  let {
    items,
    checkable = false,
  }: { items: TreeItemData[]; checkable?: boolean } = $props()
</script>

{#each items as item (item.value)}
  {#snippet row()}
    {#if item.children !== undefined}<TreeItemIndicator />{/if}
    {#if checkable}<TreeItemCheckbox />{/if}
    <span>{item.label}</span>
  {/snippet}
  {#snippet link({ props }: { props: Record<string, unknown> })}
    <a {...props} href={item.href}>{@render row()}</a>
  {/snippet}
  <TreeItem
    value={item.value}
    branch={item.children !== undefined}
    disabled={item.disabled}
  >
    <TreeItemLabel render={item.href ? link : undefined}>
      {@render row()}
    </TreeItemLabel>
    {#if item.children}
      <TreeGroup>
        <Self items={item.children} {checkable} />
      </TreeGroup>
    {/if}
  </TreeItem>
{/each}