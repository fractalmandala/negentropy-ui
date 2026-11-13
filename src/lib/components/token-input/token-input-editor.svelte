<script lang="ts">
  import {
    TokenInputEditor as TokenInputEditorPrimitive,
    type TokenInputEditorProps,
    type TokenInputEditorState,
  } from "@ui-sdk/svelte/token-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let {
    class: className,
    ...rest
  }: PartProps<"div", TokenInputEditorState> & TokenInputEditorProps = $props()
</script>

<TokenInputEditorPrimitive
  class={cn(
    "relative min-h-20 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm leading-6 text-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[readonly]:border-line",
    "data-[empty]:before:pointer-events-none data-[empty]:before:absolute data-[empty]:before:text-muted data-[empty]:before:content-[attr(aria-placeholder)]",
    className,
  )}
  {...rest}
/>