<script lang="ts">
  import { TokenInputTokenRemove as TokenInputTokenRemovePrimitive } from "@ui-sdk/svelte/token-input"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"span"> = $props()
</script>

<TokenInputTokenRemovePrimitive
  class={cn(
    "inline-grid size-4 shrink-0 cursor-default place-items-center rounded-xs text-muted transition-colors hover:bg-surface hover:text-fg data-[disabled]:hidden data-[readonly]:hidden [&_svg]:size-3",
    className,
  )}
  {...rest}
/>