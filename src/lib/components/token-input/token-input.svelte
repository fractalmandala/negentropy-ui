<script lang="ts">
  import {
    TokenInput as TokenInputPrimitive,
    type Token,
    type TokenInputOptions,
  } from "@ui-sdk/svelte/token-input"
  import type { Snippet } from "svelte"

  let {
    value = $bindable(),
    children,
    ...rest
  }: TokenInputOptions & {
    children?: Snippet
    token?: Snippet<[Token]>
    [key: string]: unknown
  } = $props()
</script>

<TokenInputPrimitive bind:value={value} {...rest}>
  {@render children?.()}
</TokenInputPrimitive>