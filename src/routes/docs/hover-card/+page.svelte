<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
    HoverCardArrow,
    createHoverCardController,
  } from "#lib/components/hover-card"
  import { Button } from "#lib/components/button"
  import { Avatar, AvatarFallback } from "#lib/components/avatar"
  import { MapPin, Link as LinkIcon, CalendarDays } from "@lucide/svelte"

  type Author = {
    name: string
    handle: string
    bio: string
    joined: string
  }

  const installCode = `import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
  createHoverCardController,
} from "#lib/components/hover-card"`

  const usageCode = `<script lang="ts">
  import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
  } from "#lib/components/hover-card"
<\/script>

<HoverCard>
  <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
  <HoverCardContent>
    <p class="font-semibold text-fg">Ada Lovelace</p>
    <p class="text-muted">Writes about algorithms, engines and the notes in between.</p>
  </HoverCardContent>
</HoverCard>`

  const arrowCode = `<HoverCard>
  <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
  <HoverCardContent side="top" class="w-64">
    <p class="font-semibold text-fg">Ada Lovelace</p>
    <p class="text-muted">Hover cards keep the pointer's path: move from the link into the card and it stays open.</p>
    <HoverCardArrow />
  </HoverCardContent>
</HoverCard>`

  const sideCode = `<script lang="ts">
  let side = $state<"top" | "bottom" | "left" | "right">("bottom")
  let align = $state<"start" | "center" | "end">("center")
<\/script>

<HoverCard>
  <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
  <HoverCardContent {side} {align} sideOffset={8} class="w-56">
    <p class="font-semibold text-fg">{side} / {align}</p>
    <p class="text-muted">The card flips to the other side when there is no room.</p>
    <HoverCardArrow />
  </HoverCardContent>
</HoverCard>`

  const sharedCode = `<script lang="ts">
  import { createHoverCardController } from "#lib/components/hover-card"

  type Author = { name: string; handle: string; bio: string; joined: string }

  const controller = createHoverCardController<Author>()
  const authors: Author[] = [
    { name: "Ada Lovelace", handle: "ada", bio: "Algorithms and engines.", joined: "Joined 1843" },
    { name: "Grace Hopper", handle: "grace", bio: "Compilers and cobol.", joined: "Joined 1944" },
  ]
<\/script>

{#each authors as author (author.handle)}
  <HoverCardTrigger {controller} payload={author} href={\`https://example.com/\${author.handle}\`}>
    @{author.handle}
  </HoverCardTrigger>
{/each}

<HoverCard {controller}>
  <HoverCardContent class="w-72">
    {#snippet children(state)}
      {@const author = state.payload as Author | undefined}
      {#if author}
        <p class="font-semibold text-fg">{author.name}</p>
        <p class="text-muted">{author.bio}</p>
        <p class="text-xs text-faint">{author.joined}</p>
      {/if}
    {/snippet}
  </HoverCardContent>
</HoverCard>`

  const controlledCode = `<script lang="ts">
  let open = $state(false)
<\/script>

<Button size="sm" tone="outline" onclick={() => (open = !open)}>
  {open ? "Close" : "Open"} the card
</Button>

<HoverCard bind:open delay={200} closeDelay={400}>
  <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
  <HoverCardContent>
    <p class="font-semibold text-fg">Controlled</p>
    <p class="text-muted">bind:open drives the card from outside; hover and focus still work.</p>
  </HoverCardContent>
</HoverCard>`

  let side = $state<"top" | "bottom" | "left" | "right">("bottom")
  let align = $state<"start" | "center" | "end">("center")
  let controlledOpen = $state(false)

  const sides = ["top", "bottom", "left", "right"] as const
  const aligns = ["start", "center", "end"] as const

  const controller = createHoverCardController<Author>()
  const authors: Author[] = [
    { name: "Ada Lovelace", handle: "ada", bio: "Algorithms, engines and the notes in between.", joined: "Joined 1843" },
    { name: "Grace Hopper", handle: "grace", bio: "Compilers, cobol and the first bug.", joined: "Joined 1944" },
    { name: "Alan Turing", handle: "alan", bio: "Machines that think, and how to tell.", joined: "Joined 1936" },
  ]
</script>

<svelte:head>
  <title>Hover Card — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Hover Card"
  description="A preview of what a link points to, shown when the pointer rests on it or keyboard focus stays on it. Wraps the ui-sdk HoverCard with collision-aware positioning, an optional arrow and a shared controller."
  entry="@ui-sdk/svelte/hover-card"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/hover-card</code>. The controller creator is
      re-exported so one card can serve many links.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The root renders no element of its own: it holds the state and connects the parts.
      <code class="font-mono text-accent">HoverCardTrigger</code> is a link by default — pressing it
      follows the link, while resting the pointer on it or keeping keyboard focus on it opens
      <code class="font-mono text-accent">HoverCardContent</code> beside it.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      The card waits <code class="font-mono text-accent">delay</code> (600ms) before opening and
      <code class="font-mono text-accent">closeDelay</code> (300ms) before closing, so moving the pointer
      from the link into the card keeps it open. The ui-sdk writes
      <code class="font-mono text-accent">position: fixed</code> and the coordinates onto the content,
      and <code class="font-mono text-accent">position: absolute</code> plus the along-edge offset onto
      the arrow; the wrappers add only appearance, so never set position or inset on them yourself.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Rest the pointer on the link, or Tab to it and wait. Enter still follows the link." code={usageCode}>
      <div class="w-full max-w-sm">
        <p class="text-sm text-muted">
          Follow
          <HoverCard>
            <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
            <HoverCardContent>
              <div class="flex items-center gap-3">
                <Avatar class="size-10">
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div class="min-w-0">
                  <p class="font-semibold text-fg">Ada Lovelace</p>
                  <p class="truncate text-xs text-faint">@ada</p>
                </div>
              </div>
              <p class="text-muted">Writes about algorithms, engines and the notes in between.</p>
              <div class="flex items-center gap-1.5 text-xs text-faint">
                <MapPin class="size-3.5" aria-hidden="true" /> London
                <CalendarDays class="ms-2 size-3.5" aria-hidden="true" /> Joined 1843
              </div>
            </HoverCardContent>
          </HoverCard>
          for notes on the analytical engine.
        </p>
      </div>
    </Demo>

    <Demo title="With an arrow" description="HoverCardArrow points at the trigger. The wrapper turns it to face the side the card landed on." code={arrowCode}>
      <div class="flex w-full max-w-sm justify-center py-10">
        <HoverCard>
          <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
          <HoverCardContent side="top" class="w-64">
            <p class="font-semibold text-fg">Ada Lovelace</p>
            <p class="text-muted">
              Move the pointer from the link into the card and it stays open. Leave both and it closes
              after the close delay.
            </p>
            <HoverCardArrow />
          </HoverCardContent>
        </HoverCard>
      </div>
    </Demo>

    <Demo title="Side and alignment" description="side and align place the card; it flips when there is no room. sideOffset sets the gap." code={sideCode}>
      <div class="w-full max-w-md space-y-4">
        <div class="flex flex-wrap gap-2">
          {#each sides as value (value)}
            <Button size="sm" tone={side === value ? "solid" : "outline"} onclick={() => (side = value)}>
              {value}
            </Button>
          {/each}
        </div>
        <div class="flex flex-wrap gap-2">
          {#each aligns as value (value)}
            <Button size="sm" tone={align === value ? "solid" : "outline"} onclick={() => (align = value)}>
              {value}
            </Button>
          {/each}
        </div>
        <div class="flex justify-center py-12">
          <HoverCard>
            <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
            <HoverCardContent {side} {align} sideOffset={8} class="w-56">
              <p class="font-semibold text-fg">{side} / {align}</p>
              <p class="text-muted">The card flips to the other side when there is no room.</p>
              <HoverCardArrow />
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </Demo>

    <Demo title="One card, many links" description="A shared controller connects triggers outside the card. Each passes a payload the content renders, so a feed needs only one card." code={sharedCode}>
      <div class="w-full max-w-md space-y-4">
        <p class="text-sm text-muted">
          {#each authors as author, index (author.handle)}
            {#if index > 0}<span class="text-faint"> · </span>{/if}
            <HoverCardTrigger {controller} payload={author} href={`https://example.com/${author.handle}`}>
              @{author.handle}
            </HoverCardTrigger>
          {/each}
        </p>
        <HoverCard {controller}>
          <HoverCardContent class="w-72">
            {#snippet children(state)}
              {@const author = state.payload as Author | undefined}
              {#if author}
                <div class="flex items-center gap-3">
                  <Avatar class="size-9">
                    <AvatarFallback>{author.name.split(" ").map((part) => part[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div class="min-w-0">
                    <p class="font-semibold text-fg">{author.name}</p>
                    <p class="truncate text-xs text-faint">@{author.handle}</p>
                  </div>
                </div>
                <p class="text-muted">{author.bio}</p>
                <div class="flex items-center gap-1.5 text-xs text-faint">
                  <LinkIcon class="size-3.5" aria-hidden="true" /> example.com/{author.handle}
                </div>
                <p class="text-xs text-faint">{author.joined}</p>
              {/if}
            {/snippet}
          </HoverCardContent>
        </HoverCard>
        <p class="text-xs text-faint">
          Moving between the links takes the open card over without closing it, which fires
          onPayloadChange rather than onOpenChange.
        </p>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:open drives the card from outside. delay and closeDelay tune the hover timing." code={controlledCode}>
      <div class="w-full max-w-sm space-y-4">
        <Button size="sm" tone="outline" onclick={() => (controlledOpen = !controlledOpen)}>
          {controlledOpen ? "Close" : "Open"} the card
        </Button>
        <div class="flex justify-center py-8">
          <HoverCard bind:open={controlledOpen} delay={200} closeDelay={400}>
            <HoverCardTrigger href="https://example.com/ada">@ada</HoverCardTrigger>
            <HoverCardContent>
              <p class="font-semibold text-fg">Controlled</p>
              <p class="text-muted">
                bind:open drives the card from outside; hover and focus still work, and Escape closes it.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <p class="text-xs text-faint">Open: {controlledOpen}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="HoverCardContent side"
      rows={[
        { name: "bottom", type: "default", description: "Below the trigger. Flips to top when there is no room." },
        { name: "top", type: "string", description: "Above the trigger." },
        { name: "left", type: "string", description: "Before the trigger in the reading direction." },
        { name: "right", type: "string", description: "After the trigger in the reading direction." },
        { name: "start / end", type: "string", description: "Logical sides that follow the writing direction, so they mirror in right-to-left text." },
      ]}
    />
    <PropsTable
      caption="HoverCardContent align"
      rows={[
        { name: "center", type: "default", description: "Centred on the trigger." },
        { name: "start", type: "string", description: "Lines up with the trigger's leading edge." },
        { name: "end", type: "string", description: "Lines up with the trigger's trailing edge." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling:
      <code class="font-mono text-accent">data-open</code> and
      <code class="font-mono text-accent">data-closed</code> on the trigger, content and arrow;
      <code class="font-mono text-accent">data-starting-style</code> for the first frame and
      <code class="font-mono text-accent">data-ending-style</code> while it animates out;
      <code class="font-mono text-accent">data-side</code> and
      <code class="font-mono text-accent">data-align</code> for the placement it landed on, and
      <code class="font-mono text-accent">data-arrow-clamped</code> when the arrow had to stop short of
      the trigger's centre.
    </p>
    <p class="text-sm text-muted">
      Positioning CSS variables the ui-sdk writes:
      <code class="font-mono text-accent">--transform-origin</code> on the content, which the wrapper
      uses as its transform origin so the card scales from the trigger;
      <code class="font-mono text-accent">--anchor-width</code>,
      <code class="font-mono text-accent">--anchor-height</code>,
      <code class="font-mono text-accent">--available-width</code> and
      <code class="font-mono text-accent">--available-height</code> for sizing against the trigger and
      the room left; and <code class="font-mono text-accent">--arrow-offset</code> for pointing a
      pseudo-element at the trigger without an Arrow part.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="HoverCard (root)"
      rows={[
        { name: "open", type: "boolean", description: "Whether the card is open. Bind with bind:open to control it." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Whether the card starts open, when uncontrolled." },
        { name: "delay", type: "number", default: "600", description: "Milliseconds the pointer rests on the trigger, or keyboard focus stays on it, before the card opens." },
        { name: "closeDelay", type: "number", default: "300", description: "Milliseconds before the card closes once the pointer leaves the trigger and the card." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops the card from opening. The trigger keeps working as a link." },
        { name: "controller", type: "HoverCardController", description: "Open, close and inspect the card from anywhere, and connect triggers outside it. Create one with createHoverCardController()." },
        { name: "container", type: "PopupContainer", description: "Renders the popup into this element instead of in place." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when the card wants to open or close. details.reason says why; details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs once the card has finished opening or closing, after any animation." },
        { name: "onPayloadChange", type: "(payload, details) => void", description: "Runs when the payload changes, including a takeover of the open card, which fires no onOpenChange. details.cancel() keeps the previous payload." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason." },
      ]}
    />
    <PropsTable
      caption="HoverCardTrigger"
      rows={[
        { name: "href", type: "string", description: "The link it follows on Enter or a tap. The part renders an <a>." },
        { name: "payload", type: "unknown", description: "Data for the content to render when this trigger opens the card, like the profile it links to." },
        { name: "controller", type: "HoverCardController", description: "Connects a trigger outside the card, like every author link in a feed, to the card with this controller." },
        { name: "children", type: "Snippet<[HoverCardTriggerState]>", description: "The link's content. state.open says whether the card is open from this trigger." },
      ]}
    />
    <PropsTable
      caption="HoverCardContent"
      rows={[
        { name: "side", type: '"top" | "bottom" | "left" | "right" | "start" | "end"', default: '"bottom"', description: "Which side of the trigger the card opens on. Flips when there is no room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "How the card lines up with the trigger along that side." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between the trigger and the card, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the trigger, in pixels." },
        { name: "collisionPadding", type: "number", default: "8", description: "Space to keep from the viewport edges, in pixels." },
        { name: "arrowPadding", type: "number", default: "6", description: "Space to keep between the arrow and the card's corners, in pixels." },
        { name: "anchor", type: "Anchor | string | null", description: "Positions against this instead of the trigger: an element, a CSS selector, a point like { x, y }, or anything with getBoundingClientRect(). Read on every check, so it can move." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Keeps the card in the page, hidden, while closed, for animation libraries that drive the exit from state." },
        { name: "container", type: "PopupContainer", description: "Renders the popup into this element instead of in place." },
        { name: "children", type: "Snippet<[HoverCardContentState<Payload>]>", description: "The card's content. state carries open and the payload of the last open, typed by the component's Payload generic." },
      ]}
    />
    <PropsTable
      caption="HoverCardArrow"
      rows={[
        { name: "class", type: "string", description: "Merged with the wrapper classes: a 10px square rotated 45°, with the border on the two edges facing away from the card. The ui-sdk sets its position and along-edge offset." },
        { name: "children", type: "Snippet<[HoverCardArrowState]>", description: "Replaces the arrow's content. state.open is false as soon as the card starts closing." },
      ]}
    />
    <PropsTable
      caption="createHoverCardController<Payload>()"
      rows={[
        { name: "isOpen", type: "() => boolean", description: "Whether it is open. False as soon as it starts closing, while it still animates out." },
        { name: "setOpen", type: "(open, options?) => boolean", description: "Opens or closes it. Returns false when canceled or already in that state." },
        { name: "open", type: "(options?) => Promise<PopupResult>", description: "Opens it and resolves once it closes, with why and any return value. Accepts payload and anchor. Resolves exactly once and never rejects." },
        { name: "close", type: "(options?) => boolean", description: "Closes it. returnValue is passed to the promise open() returned." },
        { name: "toggle", type: "(options?) => boolean", description: "Opens when closed, closes when open." },
        { name: "getPayload", type: "() => Payload | undefined", description: "The payload of the last open, from a controller or the trigger that opened it." },
        { name: "focus", type: "() => void", description: "Moves focus to the trigger that opened it last, or the first trigger." },
      ]}
    />
    <PropsTable
      caption="State"
      rows={[
        { name: "HoverCardTriggerState", type: "{ open }", description: "Whether the card is open from this trigger." },
        { name: "HoverCardContentState<Payload>", type: "{ open, payload }", description: "open is false while it animates out. payload is the last open's data, typed as the controller's Payload." },
        { name: "HoverCardArrowState", type: "{ open }", description: "False as soon as the card starts closing, while it still animates out." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>The trigger stays a plain link and the card is a preview beside it, not a dialog. It takes no focus away from the page when it opens on hover.</li>
      <li><span class="text-fg">Tab</span> onto the link opens the card after <code class="font-mono text-accent">delay</code>; with the card open, Tab moves into it and <span class="text-fg">Shift+Tab</span> returns to the link. Tab out of the card moves on past the link and closes it.</li>
      <li>Keyboard focus opens the card after the same delay as the pointer, so tabbing through a page of links does not flash a card at every stop. Leaving the link before the delay keeps focus from opening it later.</li>
      <li><span class="text-fg">Enter</span> follows the link. <span class="text-fg">Escape</span> closes the card and leaves focus on the link; Escape inside the card closes it and returns focus to the link.</li>
      <li>The card stays open while focus is in it, even when the pointer leaves. Focus leaving the card closes it.</li>
      <li>Touch screens have no hover, so a tap follows the link without opening the card. Anything in the card must also be on the page the link goes to — never put the only copy of a control or a piece of information in a hover card.</li>
      <li>A click that focuses the link does not open the card from focus, so pressing the link navigates as expected.</li>
      <li>Give the link text that makes sense on its own, since the card is supplementary. Mark decorative icons <code class="font-mono text-accent">aria-hidden="true"</code>.</li>
      <li>Use a tooltip for a short label and a hover card for rich preview content. For content that must be reachable on touch, use a popover or a dialog instead.</li>
      <li>Under <code class="font-mono text-accent">prefers-reduced-motion</code> the wrapper drops the scale and fade transition, so the card appears and disappears without movement.</li>
    </ul>
  </Section>
</div>