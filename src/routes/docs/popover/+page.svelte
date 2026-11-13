<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverTitle,
    PopoverDescription,
    PopoverClose,
    PopoverShortcut,
  } from "#lib/components/popover"
  import { Button } from "#lib/components/button"
  import { Info, Share2 } from "@lucide/svelte"

  const installCode = `import {
  Popover, PopoverTrigger, PopoverContent, PopoverArrow,
  PopoverTitle, PopoverDescription, PopoverClose, PopoverShortcut,
} from "#lib/components/popover"`

  const usageCode = `<script lang="ts">
  import {
    Popover, PopoverTrigger, PopoverContent,
    PopoverTitle, PopoverDescription, PopoverClose,
  } from "#lib/components/popover"
  import { Share2 } from "@lucide/svelte"
<\/script>

<Popover>
  <PopoverTrigger>
    <Share2 aria-hidden="true" />
    Share
  </PopoverTrigger>
  <PopoverContent>
    <div class="flex flex-col gap-1">
      <PopoverTitle>Share this page</PopoverTitle>
      <PopoverDescription>Anyone with the link can view it.</PopoverDescription>
    </div>
    <div class="rounded-md border border-line bg-elevated px-3 py-2 font-mono text-xs text-muted">
      negentropy.ui/docs/popover
    </div>
    <div class="flex justify-end">
      <PopoverClose>Done</PopoverClose>
    </div>
  </PopoverContent>
</Popover>`

  const placementCode = `<script lang="ts">
  const sides = ["top", "right", "bottom", "left"] as const
  const aligns = ["start", "center", "end"] as const

  let side = $state<(typeof sides)[number]>("bottom")
  let align = $state<(typeof aligns)[number]>("center")
<\/script>

<div class="flex flex-col items-center gap-4">
  <div class="flex flex-wrap items-center justify-center gap-2">
    {#each sides as value (value)}
      <button
        type="button"
        aria-pressed={side === value}
        onclick={() => (side = value)}
        class="rounded-md border px-2.5 py-1 text-xs font-medium transition-colors {side === value
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-line text-muted hover:bg-elevated hover:text-fg'}"
      >
        {value}
      </button>
    {/each}
  </div>
  <div class="flex flex-wrap items-center justify-center gap-2">
    {#each aligns as value (value)}
      <button
        type="button"
        aria-pressed={align === value}
        onclick={() => (align = value)}
        class="rounded-md border px-2.5 py-1 text-xs font-medium transition-colors {align === value
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-line text-muted hover:bg-elevated hover:text-fg'}"
      >
        {value}
      </button>
    {/each}
  </div>

  <Popover>
    <PopoverTrigger tone="solid">Open {side} / {align}</PopoverTrigger>
    <PopoverContent {side} {align} sideOffset={8}>
      <div class="flex flex-col gap-1">
        <PopoverTitle>Placement</PopoverTitle>
        <PopoverDescription>
          It flips to the other side when there isn't room, and stays collisionPadding from the viewport edges.
        </PopoverDescription>
      </div>
      <div class="flex justify-end"><PopoverClose>Close</PopoverClose></div>
    </PopoverContent>
  </Popover>
</div>`

  const arrowCode = `<Popover>
  <PopoverTrigger tone="outline" aria-label="About this metric" size="icon">
    <Info aria-hidden="true" />
  </PopoverTrigger>
  <PopoverContent side="top" sideOffset={10} class="w-60">
    <PopoverArrow />
    <div class="flex flex-col gap-1">
      <PopoverTitle>Weekly active users</PopoverTitle>
      <PopoverDescription>Counted once per person, Monday to Sunday.</PopoverDescription>
    </div>
  </PopoverContent>
</Popover>`

  const controlledCode = `<script lang="ts">
  let open = $state(false)
<\/script>

<div class="flex flex-col items-center gap-3">
  <Button tone="outline" onclick={() => (open = !open)}>Toggle from outside</Button>
  <p class="text-sm text-muted">open: <span class="text-fg">{open}</span></p>
</div>

<Popover bind:open>
  <PopoverContent>
    <div class="flex flex-col gap-1">
      <PopoverTitle>Controlled</PopoverTitle>
      <PopoverDescription>Open state lives in the parent. Escape and an outside press still close it.</PopoverDescription>
    </div>
    <div class="flex justify-end"><PopoverClose>Close</PopoverClose></div>
  </PopoverContent>
</Popover>`

  const hoverCode = `<Popover openOnHover delay={150} closeDelay={200}>
  <PopoverTrigger tone="ghost">
    <Info aria-hidden="true" />
    Hover me
  </PopoverTrigger>
  <PopoverContent side="top" class="w-60">
    <div class="flex flex-col gap-1">
      <PopoverTitle>Open on hover</PopoverTitle>
      <PopoverDescription>
        Pressing still opens it, so keyboard and touch users can too. Opening on hover never moves focus.
      </PopoverDescription>
    </div>
  </PopoverContent>
</Popover>`

  const shortcutCode = `<Popover>
  <PopoverTrigger tone="outline" shortcut="mod+i">
    Details
    <PopoverShortcut />
  </PopoverTrigger>
  <PopoverContent>
    <div class="flex flex-col gap-1">
      <PopoverTitle>Details</PopoverTitle>
      <PopoverDescription>Press Cmd+I (Ctrl+I elsewhere) to open it from anywhere.</PopoverDescription>
    </div>
    <div class="flex justify-end"><PopoverClose>Close</PopoverClose></div>
  </PopoverContent>
</Popover>`

  const sides = ["top", "right", "bottom", "left"] as const
  const aligns = ["start", "center", "end"] as const

  let side = $state<(typeof sides)[number]>("bottom")
  let align = $state<(typeof aligns)[number]>("center")
  let controlled = $state(false)
</script>

<svelte:head>
  <title>Popover — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Popover"
  description="Rich content in a floating panel, opened from a button and anchored to it. Wraps the ui-sdk Popover, which positions the panel against its trigger, flips it when there isn't room, and manages focus and dismissal."
  entry="@ui-sdk/svelte/popover"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/popover</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the trigger and content inside the root. The title names the panel and the description
      describes it. The wrapper supplies the surface, border, corners, shadow and
      <code class="font-mono text-accent">transform-origin: var(--transform-origin)</code>; the
      ui-sdk writes the position, so don't set <code class="font-mono text-accent">position</code>,
      <code class="font-mono text-accent">inset</code> or <code class="font-mono text-accent">margin</code>
      yourself. Long content belongs in an inner scrolling element, because the panel must not clip
      an arrow that sits outside its edge.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Click, Enter or Space opens it; clicking the open trigger closes it. Focus moves to the first focusable element inside, and Escape returns it to the trigger."
      code={usageCode}
    >
      <Popover>
        <PopoverTrigger>
          <Share2 aria-hidden="true" />
          Share
        </PopoverTrigger>
        <PopoverContent>
          <div class="flex flex-col gap-1">
            <PopoverTitle>Share this page</PopoverTitle>
            <PopoverDescription>Anyone with the link can view it.</PopoverDescription>
          </div>
          <div class="rounded-md border border-line bg-elevated px-3 py-2 font-mono text-xs text-muted">
            negentropy.ui/docs/popover
          </div>
          <div class="flex justify-end">
            <PopoverClose>Done</PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </Demo>

    <Demo
      title="Placement"
      description="side picks the edge and align lines the panel up along it. start and end follow the reading direction. It flips when there isn't room."
      code={placementCode}
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex flex-wrap items-center justify-center gap-2">
          {#each sides as value (value)}
            <button
              type="button"
              aria-pressed={side === value}
              onclick={() => (side = value)}
              class="rounded-md border px-2.5 py-1 text-xs font-medium transition-colors {side === value
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line text-muted hover:bg-elevated hover:text-fg'}"
            >
              {value}
            </button>
          {/each}
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2">
          {#each aligns as value (value)}
            <button
              type="button"
              aria-pressed={align === value}
              onclick={() => (align = value)}
              class="rounded-md border px-2.5 py-1 text-xs font-medium transition-colors {align === value
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line text-muted hover:bg-elevated hover:text-fg'}"
            >
              {value}
            </button>
          {/each}
        </div>

        <Popover>
          <PopoverTrigger tone="solid">Open {side} / {align}</PopoverTrigger>
          <PopoverContent {side} {align} sideOffset={8}>
            <div class="flex flex-col gap-1">
              <PopoverTitle>Placement</PopoverTitle>
              <PopoverDescription>
                It flips to the other side when there isn't room, and stays collisionPadding from the viewport edges.
              </PopoverDescription>
            </div>
            <div class="flex justify-end"><PopoverClose>Close</PopoverClose></div>
          </PopoverContent>
        </Popover>
      </div>
    </Demo>

    <Demo
      title="Arrow"
      description="PopoverArrow points at the trigger from the side the panel landed on. The wrapper gives it the panel's fill and border and offsets it per side; arrowPadding keeps it clear of the corners."
      code={arrowCode}
    >
      <Popover>
        <PopoverTrigger tone="outline" aria-label="About this metric" size="icon">
          <Info aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent side="top" sideOffset={10} class="w-60">
          <PopoverArrow />
          <div class="flex flex-col gap-1">
            <PopoverTitle>Weekly active users</PopoverTitle>
            <PopoverDescription>Counted once per person, Monday to Sunday.</PopoverDescription>
          </div>
        </PopoverContent>
      </Popover>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:open keeps the state in the parent. details.cancel() in onOpenChange refuses a change."
      code={controlledCode}
    >
      <div class="flex flex-col items-center gap-3">
        <Button tone="outline" onclick={() => (controlled = !controlled)}>Toggle from outside</Button>
        <p class="text-sm text-muted">open: <span class="text-fg">{controlled}</span></p>
      </div>
      <Popover bind:open={controlled}>
        <PopoverContent>
          <div class="flex flex-col gap-1">
            <PopoverTitle>Controlled</PopoverTitle>
            <PopoverDescription>Open state lives in the parent. Escape and an outside press still close it.</PopoverDescription>
          </div>
          <div class="flex justify-end"><PopoverClose>Close</PopoverClose></div>
        </PopoverContent>
      </Popover>
    </Demo>

    <Demo
      title="Open on hover"
      description="delay is how long the pointer rests before it opens; closeDelay is the grace period once the pointer leaves both the trigger and the panel."
      code={hoverCode}
    >
      <Popover openOnHover delay={150} closeDelay={200}>
        <PopoverTrigger tone="ghost">
          <Info aria-hidden="true" />
          Hover me
        </PopoverTrigger>
        <PopoverContent side="top" class="w-60">
          <div class="flex flex-col gap-1">
            <PopoverTitle>Open on hover</PopoverTitle>
            <PopoverDescription>
              Pressing still opens it, so keyboard and touch users can too. Opening on hover never moves focus.
            </PopoverDescription>
          </div>
        </PopoverContent>
      </Popover>
    </Demo>

    <Demo
      title="Keyboard shortcut"
      description="shortcut presses the trigger from anywhere and sets aria-keyshortcuts; PopoverShortcut renders the keys for this platform."
      code={shortcutCode}
    >
      <Popover>
        <PopoverTrigger tone="outline" shortcut="mod+i">
          Details
          <PopoverShortcut />
        </PopoverTrigger>
        <PopoverContent>
          <div class="flex flex-col gap-1">
            <PopoverTitle>Details</PopoverTitle>
            <PopoverDescription>Press Cmd+I (Ctrl+I elsewhere) to open it from anywhere.</PopoverDescription>
          </div>
          <div class="flex justify-end"><PopoverClose>Close</PopoverClose></div>
        </PopoverContent>
      </Popover>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="PopoverTrigger tone"
      rows={[
        { name: "outline", type: "default", description: "Bordered — the usual way to open a panel." },
        { name: "solid", type: "string", description: "Filled accent — a primary action." },
        { name: "ghost", type: "string", description: "Quiet — for a trigger inside a row or toolbar." },
      ]}
    />
    <PropsTable
      caption="PopoverTrigger size"
      rows={[
        { name: "md", type: "default", description: "h-9 with px-4." },
        { name: "sm", type: "string", description: "h-8 with px-3 and smaller text." },
        { name: "lg", type: "string", description: "h-11 with px-6." },
        { name: "icon", type: "string", description: "A 9×9 square for a single icon. Give it an aria-label." },
      ]}
    />
    <PropsTable
      caption="PopoverClose tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent — the primary action." },
        { name: "outline", type: "string", description: "Bordered — a secondary action." },
        { name: "ghost", type: "string", description: "Quiet — for an icon-only close button." },
      ]}
    />
    <PropsTable
      caption="Popover presentation"
      rows={[
        { name: "popover", type: "default", description: "Always an anchored panel." },
        { name: "auto", type: "string", description: "A sheet on small touch screens, a popover otherwise. Decided each time it opens; the server renders a popover." },
        { name: "sheet", type: "string", description: "Slides up from the bottom and can be swiped away. The wrapper widens it and rounds only the top corners." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-side</code>,
      <code class="font-mono text-accent">data-align</code>,
      <code class="font-mono text-accent">data-presentation</code>,
      <code class="font-mono text-accent">data-starting-style</code>,
      <code class="font-mono text-accent">data-ending-style</code>,
      <code class="font-mono text-accent">data-arrow-clamped</code>.
      CSS variables on the content: <code class="font-mono text-accent">--anchor-width</code>,
      <code class="font-mono text-accent">--anchor-height</code>,
      <code class="font-mono text-accent">--available-width</code>,
      <code class="font-mono text-accent">--available-height</code>,
      <code class="font-mono text-accent">--transform-origin</code>,
      <code class="font-mono text-accent">--arrow-offset</code>.
      Match the trigger's width with <code class="font-mono text-accent">class="w-[var(--anchor-width)]"</code>,
      and bound a long panel with <code class="font-mono text-accent">max-h-[var(--available-height)]</code>
      plus an inner <code class="font-mono text-accent">min-h-0 flex-1 overflow-y-auto</code> area.
      <code class="font-mono text-accent">--available-width</code> and
      <code class="font-mono text-accent">--available-height</code> don't inherit, so a child that
      needs one copies it onto itself first.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Popover (root)"
      rows={[
        { name: "open", type: "boolean", description: "Whether it's open. Bind with bind:open." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Starts open when uncontrolled." },
        { name: "modal", type: 'boolean | "trap-focus"', default: "false", description: "false leaves the page usable and closes when focus leaves; true also traps focus, locks scroll and makes the page inert; trap-focus traps focus only. Defaults to true while it presents as a sheet." },
        { name: "presentation", type: '"auto" | "popover" | "sheet"', default: '"popover"', description: "How it presents. auto is a sheet on small touch screens; decided each time it opens, and the server renders popover for auto." },
        { name: "openOnHover", type: "boolean", default: "false", description: "Resting the pointer on the trigger opens it. Pressing still works." },
        { name: "delay", type: "number", default: "300", description: "Milliseconds the pointer rests before it opens, with openOnHover." },
        { name: "closeDelay", type: "number", default: "0", description: "Milliseconds before it closes once the pointer leaves it and its trigger." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, an outside press, focus or the window leaving, back and a sheet's swipe can close it." },
        { name: "onOpenChange", type: "(open, details) => void", description: "details.reason says why and details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the open or close animation finishes." },
        { name: "onPayloadChange", type: "(payload, details) => void", description: "Runs when another payload opens it or takes the open one over. details.cancel() keeps the previous payload." },
        { name: "onDismissAttempt", type: "(details) => void", description: "Runs when dismissible refused a deliberate dismissal. Ask 'Discard changes?' here." },
        { name: "controller", type: "PopoverController", description: "Open, close and inspect from anywhere, and connect triggers outside it. Create with createPopoverController()." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the popup into this element instead of in place. Nested popups stay inside their parent." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="PopoverTrigger"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"outline"', description: "Visual style." },
        { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height and padding. icon is a square for one icon." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops it from opening the popover." },
        { name: "focusableWhenDisabled", type: "boolean", default: "false", description: "Keeps a disabled trigger in the tab order with aria-disabled, so a tooltip can say why." },
        { name: "payload", type: "unknown", description: "Data the content renders when this trigger opens it, like the row it belongs to." },
        { name: "shortcut", type: "string", description: 'A keyboard shortcut that presses it, like "mod+i". Sets aria-keyshortcuts.' },
        { name: "controller", type: "PopoverController", description: "Connects a trigger outside the root, like one per table row." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="PopoverContent"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left" | "start" | "end"', default: '"bottom"', description: "Which side of the anchor it opens on. Flips when there isn't room. start and end follow the writing direction." },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "How it lines up along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between the anchor and the panel, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the anchor, in pixels." },
        { name: "collisionPadding", type: "number", default: "8", description: "Space to keep from the viewport edges, in pixels." },
        { name: "arrowPadding", type: "number", default: "6", description: "Space between the arrow and the panel's corners, in pixels." },
        { name: "anchor", type: "string | Anchor | null", description: "Positions against this instead of the trigger: an element, a selector, a point like { x, y }, or anything with getBoundingClientRect(). Read on every check, so it can move." },
        { name: "initialFocus", type: "PopoverInitialFocus", default: '"auto"', description: "Where focus goes on open. Hover never moves focus; a touch open focuses the panel so no keyboard appears." },
        { name: "finalFocus", type: "PopoverFinalFocus", default: '"trigger"', description: "Where focus goes when it closes while focus is inside." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Keeps it in the page, hidden, while closed." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the popup into this element instead of in place." },
        { name: "children", type: "Snippet<[state]>", description: "The panel body. state.payload carries the data from the trigger or controller." },
        { name: "class", type: "string", description: "Extra classes. Leave position, inset, margin and translate to the ui-sdk." },
      ]}
    />
    <PropsTable
      caption="PopoverArrow"
      rows={[
        { name: "class", type: "string", description: "Extra classes. Defaults to an 8px square rotated 45°, with the panel's fill and the two outward borders, offset per data-side." },
        { name: "children", type: "Snippet<[state]>", description: "Optional content. state.open says whether the popover is open." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Replaces the div with your own element." },
      ]}
    />
    <PropsTable
      caption="PopoverTitle / PopoverDescription"
      rows={[
        { name: "children", type: "Snippet", description: "Title renders an h2 and names the panel; description renders a p and describes it while rendered." },
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
      ]}
    />
    <PropsTable
      caption="PopoverClose"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"solid"', description: "Visual style." },
        { name: "children", type: "Snippet", description: "Button content. It closes the popover and returns focus to the trigger." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="PopoverShortcut"
      rows={[
        { name: "shortcut", type: "string", description: "The keys to show. Inside a trigger it defaults to the trigger's shortcut." },
        { name: "children", type: "Snippet<[state]>", description: "state.text is the shortcut formatted for this platform. Hidden from screen readers, which hear aria-keyshortcuts." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>The trigger is a button that opens a dialog, and focus inside follows the WAI-ARIA dialog pattern. It reflects the open state and points to the panel it controls with <code class="font-mono text-accent">aria-expanded</code> and <code class="font-mono text-accent">aria-controls</code>.</li>
      <li>Opening moves focus to the first focusable element. Each time focus moves in, the panel is named by <code class="font-mono text-accent">PopoverTitle</code> and described by <code class="font-mono text-accent">PopoverDescription</code>.</li>
      <li><span class="text-fg">Shift+Tab</span> from the first element returns focus to the trigger; <span class="text-fg">Tab</span> from the last moves to the element after the trigger. Focus leaving the panel closes it.</li>
      <li><span class="text-fg">Escape</span> closes it and returns focus to the trigger — except while an input method is composing text. A close button does the same.</li>
      <li>A touch press focuses the panel itself so no on-screen keyboard appears. Opening on hover leaves focus where it was.</li>
      <li>With <code class="font-mono text-accent">modal</code> true or trap-focus, <span class="text-fg">Tab</span> stays inside; true also locks scroll and makes the page inert, and an outside press only closes the panel.</li>
      <li>An outside press reaches what it hits, and a press on empty space returns focus to the trigger. Pressing a scrollbar outside leaves it open.</li>
      <li>Give an icon-only trigger or close button an <code class="font-mono text-accent">aria-label</code>. <code class="font-mono text-accent">PopoverArrow</code> is decorative and needs no name.</li>
      <li>When the trigger is removed while the panel is open, focus moves to the element after where it was.</li>
    </ul>
  </Section>
</div>