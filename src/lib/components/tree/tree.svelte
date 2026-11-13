<script lang="ts" generics="Mode extends TreeMode = 'single'">
  import {
    Tree as TreePrimitive,
    treeFromPaths,
    type TreeMode,
    type TreeOptions,
    type TreeState,
  } from "@ui-sdk/svelte/tree"
  import { cn } from "#lib/utils/cn"
  import type { PartPropsPortable } from "#lib/utils/part-render"
  import TreeItems from "./tree-items.svelte"

  let {
    mode,
    value = $bindable(),
    expanded = $bindable(),
    checked = $bindable(),
    items,
    paths,
    checkable,
    children,
    class: className,
    ...rest
  }: PartPropsPortable<"div", TreeState> & TreeOptions<Mode> = $props()

  const data = $derived(items ?? (paths ? treeFromPaths(paths) : undefined))
</script>

{#snippet fallback(_state: TreeState)}
  {#if data}<TreeItems items={data} checkable={checkable ?? false} />{/if}
{/snippet}

<TreePrimitive
  {mode}
  bind:value={value}
  bind:expanded={expanded}
  bind:checked={checked}
  {items}
  {paths}
  {checkable}
  class={cn(
    "flex w-80 max-w-full flex-col gap-px rounded-lg border border-line bg-surface p-1.5 text-sm text-fg",
    "data-[disabled]:opacity-60",
    className,
  )}
  {...rest}
  children={children ?? fallback}
/>