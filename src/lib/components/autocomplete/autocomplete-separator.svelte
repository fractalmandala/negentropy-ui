<script lang="ts">
  import { AutocompleteSeparator as AutocompleteSeparatorPrimitive } from "@ui-sdk/svelte/autocomplete"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "#lib/utils/cn"

  let { class: className, ...rest }: PartProps<"div"> = $props()
</script>

<AutocompleteSeparatorPrimitive class={cn("-mx-1 my-1 h-px bg-line", className)} {...rest} />