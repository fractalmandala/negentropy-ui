<script lang="ts" generics="T = string, Multiple extends boolean | undefined = false">
  import {
    Listbox as ListboxPrimitive,
    type ListboxOptions,
    type ListboxState,
    type ListboxValue,
  } from "@ui-sdk/svelte/listbox"
  import { cn } from "$lib/utils/cn"
  import type { PartPropsPortable } from "$lib/utils/part-render"

  let {
    value = $bindable(),
    class: className,
    ...rest
  }: PartPropsPortable<"div", ListboxState> & ListboxOptions<T, Multiple> = $props()
</script>

<!-- The adapter types value as unknown, so the binding narrows it back to this list's value. -->
<ListboxPrimitive
  bind:value={() => value, (next) => (value = next as ListboxValue<T, Multiple> | undefined)}
  class={cn(
    "flex max-h-72 w-full min-w-48 scroll-py-1 flex-col gap-px overflow-y-auto overscroll-contain rounded-lg border border-line bg-surface p-1 text-sm text-fg shadow-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[readonly]:bg-elevated",
    "data-[orientation=horizontal]:max-h-none data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:min-w-0 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=horizontal]:gap-1 data-[orientation=horizontal]:overflow-x-auto data-[orientation=horizontal]:overflow-y-hidden data-[orientation=horizontal]:rounded-none data-[orientation=horizontal]:border-0 data-[orientation=horizontal]:bg-transparent data-[orientation=horizontal]:p-0 data-[orientation=horizontal]:shadow-none",
    "data-[orientation=horizontal]:[&_[data-slot=listbox-item]]:justify-center data-[orientation=horizontal]:[&_[data-slot=listbox-item]]:rounded-md data-[orientation=horizontal]:[&_[data-slot=listbox-item]]:px-3 data-[orientation=horizontal]:[&_[data-slot=listbox-item]]:text-muted data-[orientation=horizontal]:[&_[data-slot=listbox-item]]:data-[selected]:bg-elevated data-[orientation=horizontal]:[&_[data-slot=listbox-item]]:data-[selected]:text-fg",
    className,
  )}
  {...rest}
/>