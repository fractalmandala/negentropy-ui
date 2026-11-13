<script lang="ts">
  import { DialogDescription as DialogDescriptionPrimitive } from "@ui-sdk/svelte/dialog"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"p"> = $props()
</script>

<DialogDescriptionPrimitive class={cn("text-sm leading-relaxed text-muted", className)} {...rest} />