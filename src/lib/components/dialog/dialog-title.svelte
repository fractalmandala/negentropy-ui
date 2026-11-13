<script lang="ts">
  import { DialogTitle as DialogTitlePrimitive } from "@ui-sdk/svelte/dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"h2"> = $props()
</script>

<DialogTitlePrimitive class={cn("text-lg font-semibold tracking-tight text-fg", className)} {...rest} />