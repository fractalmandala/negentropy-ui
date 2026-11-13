<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Drawer,
    DrawerTrigger,
    DrawerBackdrop,
    DrawerContent,
    DrawerHandle,
    DrawerTitle,
    DrawerDescription,
    DrawerClose,
    DrawerShortcut,
    DrawerOutlet,
    type SnapPoint,
  } from "$lib/components/drawer"
  import { Button } from "$lib/components/button"
  import { Minus, Plus, SlidersHorizontal } from "@lucide/svelte"

  const installCode = `import {
  Drawer, DrawerTrigger, DrawerBackdrop, DrawerContent, DrawerHandle,
  DrawerTitle, DrawerDescription, DrawerClose, DrawerShortcut, DrawerOutlet,
} from "$lib/components/drawer"`

  const usageCode = `<script lang="ts">
  import {
    Drawer, DrawerTrigger, DrawerBackdrop, DrawerContent,
    DrawerTitle, DrawerDescription, DrawerClose, DrawerShortcut,
  } from "$lib/components/drawer"
  import { Minus, Plus, SlidersHorizontal } from "@lucide/svelte"

  let calories = $state(350)
<\/script>

<Drawer>
  <DrawerTrigger shortcut="mod+shift+d">
    <SlidersHorizontal aria-hidden="true" />
    Move goal
    <DrawerShortcut />
  </DrawerTrigger>
  <DrawerBackdrop />
  <DrawerContent>
    <div aria-hidden="true" class="mx-auto h-1 w-9 rounded-full bg-line-strong"></div>
    <div class="flex flex-col gap-1">
      <DrawerTitle>Move goal</DrawerTitle>
      <DrawerDescription>Set your daily activity goal.</DrawerDescription>
    </div>
    <div class="flex items-center justify-between gap-4">
      <Button tone="outline" size="icon" aria-label="Decrease" disabled={calories <= 200} onclick={() => (calories -= 10)}>
        <Minus aria-hidden="true" />
      </Button>
      <div class="flex flex-col items-center">
        <span aria-live="polite" class="text-4xl font-semibold tabular-nums text-fg">{calories}</span>
        <span class="text-xs text-muted">Calories/day</span>
      </div>
      <Button tone="outline" size="icon" aria-label="Increase" disabled={calories >= 400} onclick={() => (calories += 10)}>
        <Plus aria-hidden="true" />
      </Button>
    </div>
    <div class="mt-auto flex flex-col gap-2">
      <DrawerClose value="submit">Submit</DrawerClose>
      <DrawerClose tone="outline">Cancel</DrawerClose>
    </div>
  </DrawerContent>
</Drawer>`

  const sidesCode = `<script lang="ts">
  const sides = [
    { side: "bottom", label: "Bottom" },
    { side: "top", label: "Top" },
    { side: "left", label: "Left" },
    { side: "right", label: "Right" },
  ] as const
<\/script>

{#each sides as { side, label } (side)}
  <Drawer {side} preventEdgeSwipe={side === "left" || side === "right"}>
    <DrawerTrigger tone="outline">{label}</DrawerTrigger>
    <DrawerBackdrop />
    <DrawerContent>
      <div class="flex flex-col gap-1">
        <DrawerTitle>From the {label.toLowerCase()}</DrawerTitle>
        <DrawerDescription>Drag it back toward that edge, press outside, or press Escape.</DrawerDescription>
      </div>
      <DrawerClose class="mt-auto">Close</DrawerClose>
    </DrawerContent>
  </Drawer>
{/each}`

  const snapCode = `<script lang="ts">
  const places = [
    { name: "Blue Bottle Coffee", detail: "Coffee · 0.2 mi" },
    { name: "Tartine Bakery", detail: "Bakery · 0.4 mi" },
    { name: "Dolores Park", detail: "Park · 0.5 mi" },
    { name: "Ritual Coffee Roasters", detail: "Coffee · 0.7 mi" },
    { name: "Alamo Square", detail: "Park · 1.1 mi" },
    { name: "Ferry Building", detail: "Market · 2.3 mi" },
    { name: "Coit Tower", detail: "Landmark · 2.9 mi" },
    { name: "Lands End", detail: "Trail · 5.4 mi" },
  ]
<\/script>

<Drawer snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5} expandOnScroll>
  <DrawerTrigger>Find a place</DrawerTrigger>
  <DrawerBackdrop />
  <DrawerContent>
    <DrawerHandle aria-label="Resize" />
    <div class="flex flex-col gap-1">
      <DrawerTitle>Places nearby</DrawerTitle>
      <DrawerDescription>Drag the sheet, or press the handle, to see more.</DrawerDescription>
    </div>
    <div class="min-h-0 flex-1 overflow-y-auto">
      <ul class="flex flex-col">
        {#each places as place (place.name)}
          <li class="flex flex-col gap-0.5 border-b border-line py-2.5 last:border-0">
            <span class="text-sm text-fg">{place.name}</span>
            <span class="text-xs text-muted">{place.detail}</span>
          </li>
        {/each}
      </ul>
    </div>
  </DrawerContent>
</Drawer>`

  const controlledCode = `<script lang="ts">
  import type { SnapPoint } from "$lib/components/drawer"

  let open = $state(false)
  let snapPoint = $state<SnapPoint | null>(0.5)
<\/script>

<div class="flex flex-col items-center gap-3">
  <Button tone="outline" onclick={() => (open = true)}>Open from outside</Button>
  <p class="text-sm text-muted">
    open: <span class="text-fg">{open}</span> · snap point: <span class="text-fg">{snapPoint}</span>
  </p>
</div>

<Drawer bind:open bind:snapPoint snapPoints={[0.25, 0.5, 1]}>
  <DrawerBackdrop />
  <DrawerContent>
    <DrawerHandle aria-label="Resize" />
    <div class="flex flex-col gap-1">
      <DrawerTitle>Controlled</DrawerTitle>
      <DrawerDescription>Both the open state and the resting point live in the parent.</DrawerDescription>
    </div>
    <DrawerClose class="mt-auto">Close</DrawerClose>
  </DrawerContent>
</Drawer>`

  const outletCode = `<Drawer>
  <div class="w-full max-w-sm">
    <DrawerOutlet
      class="overflow-hidden rounded-xl border border-line bg-surface"
      keyframes={{ scale: [1, 0.94], borderRadius: ["0px", "24px"] }}
    >
      <div class="flex items-center justify-between gap-3 px-3 py-3">
        <span class="text-sm font-semibold text-fg">Inbox</span>
        <DrawerTrigger>Compose</DrawerTrigger>
      </div>
      <ul class="flex flex-col border-t border-line">
        <li class="flex flex-col gap-0.5 border-b border-line px-3 py-2.5">
          <span class="text-sm text-fg">Inès</span>
          <span class="text-xs text-muted">The proofs are back from the printer.</span>
        </li>
        <li class="flex flex-col gap-0.5 px-3 py-2.5">
          <span class="text-sm text-fg">Kofi</span>
          <span class="text-xs text-muted">Lunch on Thursday?</span>
        </li>
      </ul>
    </DrawerOutlet>
  </div>
  <DrawerBackdrop />
  <DrawerContent>
    <div aria-hidden="true" class="mx-auto h-1 w-9 rounded-full bg-line-strong"></div>
    <div class="flex flex-col gap-1">
      <DrawerTitle>New message</DrawerTitle>
      <DrawerDescription>Drag the sheet slowly and watch the inbox behind it.</DrawerDescription>
    </div>
    <DrawerClose class="mt-auto">Send</DrawerClose>
  </DrawerContent>
</Drawer>`

  const sides = [
    { side: "bottom", label: "Bottom" },
    { side: "top", label: "Top" },
    { side: "left", label: "Left" },
    { side: "right", label: "Right" },
  ] as const

  const places = [
    { name: "Blue Bottle Coffee", detail: "Coffee · 0.2 mi" },
    { name: "Tartine Bakery", detail: "Bakery · 0.4 mi" },
    { name: "Dolores Park", detail: "Park · 0.5 mi" },
    { name: "Ritual Coffee Roasters", detail: "Coffee · 0.7 mi" },
    { name: "Alamo Square", detail: "Park · 1.1 mi" },
    { name: "Ferry Building", detail: "Market · 2.3 mi" },
    { name: "Coit Tower", detail: "Landmark · 2.9 mi" },
    { name: "Lands End", detail: "Trail · 5.4 mi" },
  ]

  let calories = $state(350)
  let controlled = $state(false)
  let snapPoint = $state<SnapPoint | null>(0.5)
</script>

<svelte:head>
  <title>Drawer — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Drawer"
  description="A sheet that slides in from an edge and can rest at several heights. Wraps the ui-sdk Drawer: Dialog's focus and dismissal, plus dragging, snap points and a handle you can use with the keyboard."
  entry="@ui-sdk/svelte/drawer"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/drawer</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The content is the sheet. The drawer positions it inside a full-screen viewport and moves it
      with <code class="font-mono text-accent">translate</code>, so the wrapper gives it a size, a
      surface and corners per side and leaves positioning alone. The backdrop gets a color; the
      drawer manages its opacity. Put long content in an inner
      <code class="font-mono text-accent">min-h-0 flex-1 overflow-y-auto</code> area.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="A bottom sheet sized to its content. Adjust the goal, then Submit or Cancel. Escape, a press outside, or a drag toward the bottom edge also closes it. shortcut opens it from anywhere: Cmd+Shift+D, or Ctrl+Shift+D elsewhere."
      code={usageCode}
    >
      <Drawer>
        <DrawerTrigger shortcut="mod+shift+d">
          <SlidersHorizontal aria-hidden="true" />
          Move goal
          <DrawerShortcut />
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerContent>
          <div aria-hidden="true" class="mx-auto h-1 w-9 rounded-full bg-line-strong"></div>
          <div class="flex flex-col gap-1">
            <DrawerTitle>Move goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </div>
          <div class="flex items-center justify-between gap-4">
            <Button tone="outline" size="icon" aria-label="Decrease" disabled={calories <= 200} onclick={() => (calories -= 10)}>
              <Minus aria-hidden="true" />
            </Button>
            <div class="flex flex-col items-center">
              <span aria-live="polite" class="text-4xl font-semibold tabular-nums text-fg">{calories}</span>
              <span class="text-xs text-muted">Calories/day</span>
            </div>
            <Button tone="outline" size="icon" aria-label="Increase" disabled={calories >= 400} onclick={() => (calories += 10)}>
              <Plus aria-hidden="true" />
            </Button>
          </div>
          <div class="mt-auto flex flex-col gap-2">
            <DrawerClose value="submit">Submit</DrawerClose>
            <DrawerClose tone="outline">Cancel</DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </Demo>

    <Demo
      title="Sides"
      description="side picks the edge. start and end follow the writing direction. Left and right sheets are full height; bottom and top sheets size to their content up to 85dvh."
      code={sidesCode}
    >
      {#each sides as { side, label } (side)}
        <Drawer {side} preventEdgeSwipe={side === "left" || side === "right"}>
          <DrawerTrigger tone="outline">{label}</DrawerTrigger>
          <DrawerBackdrop />
          <DrawerContent>
            <div class="flex flex-col gap-1">
              <DrawerTitle>From the {label.toLowerCase()}</DrawerTitle>
              <DrawerDescription>Drag it back toward that edge, press outside, or press Escape.</DrawerDescription>
            </div>
            <DrawerClose class="mt-auto">Close</DrawerClose>
          </DrawerContent>
        </Drawer>
      {/each}
    </Demo>

    <Demo
      title="Snap points"
      description="It opens at 0.5 and can rest at 0.25, 0.5 or 1. Drag it, press the handle, or Tab to the handle and use Up, Down, Home and End. expandOnScroll moves the sheet before the list scrolls."
      code={snapCode}
    >
      <Drawer snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5} expandOnScroll>
        <DrawerTrigger>Find a place</DrawerTrigger>
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHandle aria-label="Resize" />
          <div class="flex flex-col gap-1">
            <DrawerTitle>Places nearby</DrawerTitle>
            <DrawerDescription>Drag the sheet, or press the handle, to see more.</DrawerDescription>
          </div>
          <div class="min-h-0 flex-1 overflow-y-auto">
            <ul class="flex flex-col">
              {#each places as place (place.name)}
                <li class="flex flex-col gap-0.5 border-b border-line py-2.5 last:border-0">
                  <span class="text-sm text-fg">{place.name}</span>
                  <span class="text-xs text-muted">{place.detail}</span>
                </li>
              {/each}
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:open and bind:snapPoint keep both in the parent. details.cancel() in onOpenChange or onSnapPointChange refuses a change, and a canceled swipe springs back."
      code={controlledCode}
    >
      <div class="flex flex-col items-center gap-3">
        <Button tone="outline" onclick={() => (controlled = true)}>Open from outside</Button>
        <p class="text-sm text-muted">
          open: <span class="text-fg">{controlled}</span> · snap point: <span class="text-fg">{snapPoint}</span>
        </p>
      </div>
      <Drawer bind:open={controlled} bind:snapPoint={snapPoint} snapPoints={[0.25, 0.5, 1]}>
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHandle aria-label="Resize" />
          <div class="flex flex-col gap-1">
            <DrawerTitle>Controlled</DrawerTitle>
            <DrawerDescription>Both the open state and the resting point live in the parent.</DrawerDescription>
          </div>
          <DrawerClose class="mt-auto">Close</DrawerClose>
        </DrawerContent>
      </Drawer>
    </Demo>

    <Demo
      title="Outlet"
      description="An outlet makes another element follow the sheet's progress. keyframes run from collapsed to fully expanded, so the inbox behind scales and rounds as you drag."
      code={outletCode}
    >
      <Drawer>
        <div class="w-full max-w-sm">
          <DrawerOutlet
            class="overflow-hidden rounded-xl border border-line bg-surface"
            keyframes={{ scale: [1, 0.94], borderRadius: ["0px", "24px"] }}
          >
            <div class="flex items-center justify-between gap-3 px-3 py-3">
              <span class="text-sm font-semibold text-fg">Inbox</span>
              <DrawerTrigger>Compose</DrawerTrigger>
            </div>
            <ul class="flex flex-col border-t border-line">
              <li class="flex flex-col gap-0.5 border-b border-line px-3 py-2.5">
                <span class="text-sm text-fg">Inès</span>
                <span class="text-xs text-muted">The proofs are back from the printer.</span>
              </li>
              <li class="flex flex-col gap-0.5 px-3 py-2.5">
                <span class="text-sm text-fg">Kofi</span>
                <span class="text-xs text-muted">Lunch on Thursday?</span>
              </li>
            </ul>
          </DrawerOutlet>
        </div>
        <DrawerBackdrop />
        <DrawerContent>
          <div aria-hidden="true" class="mx-auto h-1 w-9 rounded-full bg-line-strong"></div>
          <div class="flex flex-col gap-1">
            <DrawerTitle>New message</DrawerTitle>
            <DrawerDescription>Drag the sheet slowly and watch the inbox behind it.</DrawerDescription>
          </div>
          <DrawerClose class="mt-auto">Send</DrawerClose>
        </DrawerContent>
      </Drawer>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Drawer side"
      rows={[
        { name: "bottom", type: "default", description: "Slides up from the bottom; content-sized up to 85dvh, rounded top corners." },
        { name: "top", type: "string", description: "Slides down from the top; rounded bottom corners." },
        { name: "left", type: "string", description: "Full height, 20rem wide up to 85vw, rounded right corners." },
        { name: "right", type: "string", description: "Full height, 20rem wide up to 85vw, rounded left corners." },
        { name: "start / end", type: "string", description: "Left or right, resolved for the writing direction." },
      ]}
    />
    <PropsTable
      caption="SnapPoint"
      rows={[
        { name: '"content"', type: "default", description: "The sheet's own size." },
        { name: "0.5", type: "number", description: "A fraction of the viewport along the drawer's axis, up to 1." },
        { name: '320 / "320px"', type: "number | string", description: "Pixels. Numbers above 1 are pixel values." },
        { name: '"20rem"', type: "string", description: "A multiple of the root font size." },
        { name: '"50%"', type: "string", description: "A percentage of the viewport." },
      ]}
    />
    <PropsTable
      caption="DrawerTrigger / DrawerClose tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent — the primary action." },
        { name: "outline", type: "string", description: "Bordered — a secondary action." },
        { name: "ghost", type: "string", description: "Quiet — for an icon-only close button." },
      ]}
    />
    <PropsTable
      caption="Drawer driver"
      rows={[
        { name: "auto", type: "default", description: "Picks the driver for the device." },
        { name: "pointer", description: "Follows touch, mouse and pen with a spring fitted to iOS.", type: "string" },
        { name: "scroll-snap", type: "string", description: "Uses the browser's own scrolling for bottom drawers." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-side</code>,
      <code class="font-mono text-accent">data-snap-point</code>,
      <code class="font-mono text-accent">data-expanded</code>,
      <code class="font-mono text-accent">data-dragging</code>,
      <code class="font-mono text-accent">data-interactive</code>,
      <code class="font-mono text-accent">data-driver</code>,
      <code class="font-mono text-accent">data-nested-open</code>,
      <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>.
      CSS variables: <code class="font-mono text-accent">--drawer-progress</code>,
      <code class="font-mono text-accent">--drawer-dim</code>,
      <code class="font-mono text-accent">--drawer-expand</code>,
      <code class="font-mono text-accent">--drawer-stack</code>,
      <code class="font-mono text-accent">--keyboard-inset</code>.
      With <code class="font-mono text-accent">dismissible=false</code>, Escape, outside presses, back
      gestures and swipes all leave it open and <code class="font-mono text-accent">onDismissAttempt</code>
      reports what was tried. With <code class="font-mono text-accent">modalAbove</code>, the page stays
      usable and undimmed at or below that point, like Maps.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Drawer (root)"
      rows={[
        { name: "open", type: "boolean", description: "Whether it's open. Bind with bind:open." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Starts open when uncontrolled." },
        { name: "snapPoint", type: "SnapPoint | null", description: "The point it rests on. Bind with bind:snapPoint." },
        { name: "snapPoints", type: "SnapPoint[]", default: '["content"]', description: "Where it can rest. It opens at the first, or at defaultSnapPoint. \"content\" sizes the sheet to what's inside it." },
        { name: "defaultSnapPoint", type: "SnapPoint", description: "The point it opens at when uncontrolled. It opens there again each time." },
        { name: "side", type: "DrawerSide", default: '"bottom"', description: "The edge it comes from." },
        { name: "modal", type: 'boolean | "trap-focus"', default: "true", description: "true makes the page inert and traps focus; trap-focus traps focus only; false leaves the page usable." },
        { name: "modalAbove", type: "SnapPoint", description: "At or below this point the page stays usable and undimmed. Above it, modal applies." },
        { name: "closeOnOutsidePress", type: "boolean", default: "true", description: "Whether a press outside, like on the backdrop, closes it. Defaults to false while the drawer isn't modal." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, outside presses, swipes and the back gesture can close it." },
        { name: "driver", type: "DrawerDriver", default: '"auto"', description: "How it moves: pointer, scroll-snap, or auto." },
        { name: "expandOnScroll", type: "boolean", default: "true", description: "Dragging toward a larger point on scrollable content moves the sheet before the content scrolls." },
        { name: "physics", type: "Partial<SheetPhysics>", description: "Overrides spring, projection, rubber band and dim. Starts from sheetPhysics.ios." },
        { name: "themeColor", type: "boolean", default: "false", description: "Dims an existing meta theme-color with the backdrop." },
        { name: "preventEdgeSwipe", type: "boolean", default: "false", description: "Keeps presses near the screen's left and right edges from starting Safari's back swipe." },
        { name: "onOpenChange", type: "(open, details) => void", description: 'details.reason includes "swipe"; details.cancel() stops it; details.returnValue carries what closed it.' },
        { name: "onSnapPointChange", type: "(snapPoint, details) => void", description: "Runs when it moves to another point. details.cancel() makes a swipe spring back." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the sheet settles." },
        { name: "onDismissAttempt", type: "(details) => void", description: "Runs when a dismissal was refused, including a swipe." },
        { name: "pendingAnnouncement", type: "string", description: "What screen readers hear once a Close part's action has run for a second." },
        { name: "persistentElements", type: "(string | Element)[] | (() => Element[])", description: "Elements that stay usable while the page is inert." },
        { name: "controller", type: "DrawerController", description: "Open, close and move it from anywhere, and connect triggers and outlets outside it." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the backdrop and viewport into this element instead of in place." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="DrawerTrigger"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"solid"', description: "Visual style." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops it from opening the drawer." },
        { name: "focusableWhenDisabled", type: "boolean", default: "false", description: "Keeps a disabled trigger in the tab order with aria-disabled." },
        { name: "payload", type: "unknown", description: "Data the content renders when this trigger opens it." },
        { name: "shortcut", type: "string", description: 'A keyboard shortcut that presses it, like "mod+k". Sets aria-keyshortcuts.' },
        { name: "controller", type: "DrawerController", description: "Connects a trigger outside the root, like one per table row." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="DrawerBackdrop"
      rows={[
        { name: "class", type: "string", description: "Extra classes. Defaults to a fixed full-screen dim; the drawer drives its opacity, so don't set opacity yourself." },
        { name: "children", type: "Snippet<[state]>", description: "Optional content. state.interactive says the page behind is usable." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Replaces the div with your own element." },
      ]}
    />
    <PropsTable
      caption="DrawerContent"
      rows={[
        { name: "initialFocus", type: "DialogInitialFocus", description: 'Where focus goes on open. "content" starts on the sheet so a field does not summon the keyboard.' },
        { name: "finalFocus", type: "PopupFocusTarget", description: "Where focus goes when it closes while focus is inside." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Keeps it in the page, hidden, while closed." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the sheet into this element instead of in place." },
        { name: "children", type: "Snippet<[state]>", description: "The sheet body. state carries snapPoint, expanded, dragging, side and interactive." },
        { name: "class", type: "string", description: "Extra classes. Leave translate and transition to the drawer." },
      ]}
    />
    <PropsTable
      caption="DrawerHandle"
      rows={[
        { name: "aria-label", type: "string", description: 'Its accessible name, like "Resize". Required — it is a real button.' },
        { name: "children", type: "Snippet<[state]>", description: "Leave it empty for the grip bar. state.canExpand and state.canCollapse say which moves remain; state.snapPoint is the current point." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="DrawerTitle / DrawerDescription"
      rows={[
        { name: "children", type: "Snippet", description: "Title renders an h2 and names the drawer; description renders a p and describes it while rendered." },
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
      ]}
    />
    <PropsTable
      caption="DrawerClose"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"solid"', description: "Visual style." },
        { name: "value", type: "string", description: "Reported as returnValue in onOpenChange and by the controller." },
        { name: "action", type: "(event, details) => unknown", description: "Runs before it closes. A returned Promise keeps the drawer open and sets data-pending, aria-busy and aria-disabled; a rejection sets state.error." },
        { name: "children", type: "Snippet<[state]>", description: "Button content. state.pending and state.error describe the running action." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="DrawerShortcut"
      rows={[
        { name: "shortcut", type: "string", description: "The keys to show. Inside a trigger it defaults to the trigger's shortcut." },
        { name: "children", type: "Snippet<[state]>", description: "state.text is the shortcut formatted for this platform. Hidden from screen readers, which hear aria-keyshortcuts." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
      ]}
    />
    <PropsTable
      caption="DrawerOutlet"
      rows={[
        { name: "keyframes", type: "DrawerKeyframes", description: "Keyframes it plays as the sheet expands, like { scale: [1, 0.94] }: first while collapsed, last at the largest point. Transforms and opacity run on the compositor." },
        { name: "controller", type: "DrawerController", description: "Connects an outlet outside the root, like the app's shell." },
        { name: "children", type: "Snippet<[state]>", description: "The element that follows the sheet. state.open says whether the drawer is open." },
        { name: "class", type: "string", description: "Extra classes. Defaults to block with a top transform origin." },
      ]}
    />
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">createDrawerController&lt;Payload, Result&gt;()</code> also
      exposes <code class="font-mono text-accent">getSnapPoint()</code> and
      <code class="font-mono text-accent">setSnapPoint(point, options)</code> beside the usual
      open/close/toggle, and <code class="font-mono text-accent">sheetPhysics</code> supplies the
      motion presets.
    </p>
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>It is a dialog: <code class="font-mono text-accent">role="dialog"</code> with <code class="font-mono text-accent">aria-modal</code> while modal, named by <code class="font-mono text-accent">DrawerTitle</code> and described by <code class="font-mono text-accent">DrawerDescription</code>.</li>
      <li>Focus moves inside on open and returns to the trigger on close. A touch open focuses the content so a field does not summon the keyboard immediately.</li>
      <li><code class="font-mono text-accent">DrawerHandle</code> is a button and needs an accessible name. A press moves to the next larger snap point and wraps to the smallest; arrow keys along the sheet's axis move one point without wrapping; <span class="text-fg">Home</span> and <span class="text-fg">End</span> move to the ends.</li>
      <li>For a sheet with a single snap point, use a decorative bar with <code class="font-mono text-accent">aria-hidden="true"</code> instead of an inactive button.</li>
      <li>When the on-screen keyboard opens, the viewport shrinks and the focused field can scroll into view inside the sheet.</li>
      <li>With <code class="font-mono text-accent">modalAbove</code>, the page behind stays usable at or below that point and the backdrop lets presses through; announce the change with your own live region if it matters.</li>
      <li>A swipe reports the reason <code class="font-mono text-accent">"swipe"</code>, so a refused dismissal can be explained in <code class="font-mono text-accent">onDismissAttempt</code>.</li>
      <li>The drawer respects reduced motion, fading instead of sliding.</li>
    </ul>
  </Section>
</div>