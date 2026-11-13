<script lang="ts">
  import {
    TokenInputToken as TokenInputTokenPrimitive,
    type TokenInputTokenState,
  } from "@ui-sdk/svelte/token-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span", TokenInputTokenState> = $props()
</script>

<TokenInputTokenPrimitive
  class={cn(
    "inline-flex h-[22px] items-center gap-1 rounded-sm border border-line bg-elevated px-2 align-[1px] text-xs leading-5 whitespace-nowrap text-fg data-[selected]:border-fg data-[selected]:bg-accent-soft data-[pending]:text-muted data-[unresolved]:text-muted data-[disabled]:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:text-muted",
    className,
  )}
  {...rest}
/>