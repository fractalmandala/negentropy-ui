<script lang="ts">
  import {
    ComboboxValue as ComboboxValuePrimitive,
    type ComboboxValueProps,
    type ComboboxValueState,
  } from "@ui-sdk/svelte/combobox"
  import type { Snippet } from "svelte"

  let props: ComboboxValueProps & { children?: Snippet<[ComboboxValueState]> } = $props()
</script>

<ComboboxValuePrimitive {...props} />