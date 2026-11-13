<script lang="ts" generics="T = string, Multiple extends boolean | undefined = false">
  import { Select as SelectPrimitive, type SelectOptions } from "@ui-sdk/svelte/select"
  import type { Snippet } from "svelte"

  let {
    value = $bindable(),
    defaultValue,
    multiple,
    open = $bindable(),
    query = $bindable(),
    onValueChange,
    children,
    ...rest
  }: SelectOptions<T, Multiple> & { children?: Snippet } = $props()
</script>

<!-- The value props are a union keyed on `multiple`; forward them apart so the
     shared rest spreads onto the generic primitive (the source casts likewise). -->
<SelectPrimitive
  bind:value={() => value as never, (next) => (value = next as never)}
  defaultValue={defaultValue as never}
  multiple={multiple as never}
  bind:open={open}
  bind:query={query}
  onValueChange={onValueChange as never}
  {...rest}
>
  {@render children?.()}
</SelectPrimitive>