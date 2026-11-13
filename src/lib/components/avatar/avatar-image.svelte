<script lang="ts">
  import { AvatarImage as AvatarImagePrimitive, type AvatarState } from "@ui-sdk/svelte/avatar"
  import type { PartProps } from "@ui-sdk/svelte"
  import { cn } from "$lib/utils/cn"

  let { class: className, ...rest }: PartProps<"img", AvatarState> = $props()
</script>

<AvatarImagePrimitive class={cn("size-full object-cover", className)} {...rest} />