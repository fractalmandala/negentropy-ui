<script lang="ts">
  import { CommandPage as CommandPagePrimitive, type CommandPageProps } from "@ui-sdk/svelte/command"
  import type { Snippet } from "svelte"

  let {
    children,
    ...rest
  }: CommandPageProps & {
    children?: Snippet
    [key: string]: unknown
  } = $props()
</script>

<CommandPagePrimitive {...rest}>
  {@render children?.()}
</CommandPagePrimitive>