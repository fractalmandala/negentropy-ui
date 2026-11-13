import type { Snippet } from "svelte"
import type { Attachment } from "svelte/attachments"
import type { SvelteHTMLElements } from "svelte/elements"

// Portable mirror of ui-sdk's SlotAttributes. Typing a part's `render` snippet
// with this keeps packaged declarations from referencing the adapter's internal
// use-primitive module, which is not a public export.
export type PartSlotAttributes = {
  [key: string]: unknown
  [key: symbol]: Attachment<HTMLElement> | undefined
}

export type PartRender<State> = Snippet<
  [
    {
      props: PartSlotAttributes
      state: State
      children?: Snippet<[State]>
    },
  ]
>

// PartProps with a portable `render` snippet. Mirrors ui-sdk's PartProps shape
// so HTML attributes keep their types (Omit over PartProps would collapse its
// index signature and widen `class` to unknown).
export type PartPropsPortable<
  Tag extends keyof SvelteHTMLElements,
  State = {},
  Own extends string = never,
> = Omit<SvelteHTMLElements[Tag], "children" | Own> & {
  [attribute: string]: unknown
} & {
  render?: PartRender<State>
  children?: Snippet<[State]>
}