<script lang="ts" generics="T = string, Multiple extends boolean | undefined = false">
  import { Combobox as ComboboxPrimitive, type ComboboxOptions } from "@ui-sdk/svelte/combobox"
  import type { Snippet } from "svelte"

  let {
    value = $bindable(),
    defaultValue,
    multiple,
    query = $bindable(),
    open = $bindable(),
    onValueChange,
    children,
    ...rest
  }: ComboboxOptions<T, Multiple> & { children?: Snippet } = $props()
</script>

<!-- The value props are a union keyed on `multiple`; forward them apart so the
     shared rest spreads onto the generic primitive (the source casts likewise). -->
<ComboboxPrimitive
  bind:value={() => value as never, (next) => (value = next as never)}
  defaultValue={defaultValue as never}
  multiple={multiple as never}
  bind:query={query}
  bind:open={open}
  onValueChange={onValueChange as never}
  {...rest}
>
  {@render children?.()}
</ComboboxPrimitive>