<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipArrow,
    TooltipShortcut,
    createTooltipController,
  } from "$lib/components/tooltip"
  import { Bold, Bookmark, Check, Copy, Italic, Save, Underline } from "@lucide/svelte"

  const installCode = `import {
  Tooltip, TooltipTrigger, TooltipContent, TooltipArrow, TooltipShortcut,
  createTooltipController,
} from "$lib/components/tooltip"`

  const usageCode = `<script lang="ts">
  import {
    Tooltip, TooltipTrigger, TooltipContent, TooltipArrow,
  } from "$lib/components/tooltip"
  import { Bookmark } from "@lucide/svelte"
<\/script>

<Tooltip>
  <TooltipTrigger tone="ghost" size="icon" aria-label="Bookmark">
    <Bookmark aria-hidden="true" />
  </TooltipTrigger>
  <TooltipContent side="top">
    <TooltipArrow />
    Bookmark
  </TooltipContent>
</Tooltip>`

  const sidesCode = `<script lang="ts">
  const sides = ["top", "right", "bottom", "left"] as const
<\/script>

{#each sides as side (side)}
  <Tooltip>
    <TooltipTrigger tone="outline" size="icon" aria-label="Open {side}">
      <Save aria-hidden="true" />
    </TooltipTrigger>
    <TooltipContent {side} sideOffset={8}>
      <TooltipArrow />
      {side}
    </TooltipContent>
  </Tooltip>
{/each}`

  const copyCode = `<script lang="ts">
  const command = "pnpm add negentropy-ui"
  let copied = $state(false)
<\/script>

<div class="flex items-center gap-2">
  <code class="rounded-md border border-line bg-elevated px-2.5 py-1.5 font-mono text-sm text-fg">{command}</code>
  <Tooltip
    closeOnPress={false}
    onOpenChangeComplete={(open) => {
      if (!open) copied = false
    }}
  >
    <TooltipTrigger
      tone="ghost"
      size="icon"
      aria-label={copied ? "Copied" : "Copy"}
      onclick={() => {
        navigator.clipboard?.writeText(command).catch(() => {})
        copied = true
      }}
    >
      {#if copied}
        <Check aria-hidden="true" />
      {:else}
        <Copy aria-hidden="true" />
      {/if}
    </TooltipTrigger>
    <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
  </Tooltip>
</div>`

  const shortcutCode = `<Tooltip shortcut="mod+s">
  <TooltipTrigger tone="outline">
    <Save aria-hidden="true" />
    Save
  </TooltipTrigger>
  <TooltipContent>
    Save changes
    <TooltipShortcut />
  </TooltipContent>
</Tooltip>`

  const sharedCode = `<script lang="ts">
  import { createTooltipController } from "$lib/components/tooltip"
  import { Bold, Italic, Underline } from "@lucide/svelte"

  const formats = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
  ]

  const formatTip = createTooltipController<string>()
<\/script>

<div class="flex items-center gap-1" role="group" aria-label="Formatting">
  {#each formats as format (format.label)}
    <TooltipTrigger
      controller={formatTip}
      payload={format.label}
      tone="ghost"
      size="icon"
      aria-label={format.label}
    >
      <format.icon aria-hidden="true" />
    </TooltipTrigger>
  {/each}
  <Tooltip controller={formatTip}>
    <TooltipContent>
      {#snippet children(state)}{state.payload as string}{/snippet}
    </TooltipContent>
  </Tooltip>
</div>`

  const sides = ["top", "right", "bottom", "left"] as const

  const formats = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
  ]

  const formatTip = createTooltipController<string>()

  const command = "pnpm add negentropy-ui"
  let copied = $state(false)
</script>

<svelte:head>
  <title>Tooltip — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Tooltip"
  description="A short label or hint that appears when the pointer rests on its trigger or keyboard focus reaches it. Wraps the ui-sdk Tooltip: always in the page hidden while closed, so the trigger can point at it, and only one is open at a time."
  entry="@ui-sdk/svelte/tooltip"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/tooltip</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the trigger and content inside the root. By default the tooltip names a trigger that has
      no name of its own, like an icon button, and describes any other — so an icon-only trigger
      needs no <code class="font-mono text-accent">aria-label</code> when the tooltip is its name.
      Set <code class="font-mono text-accent">type</code> to choose explicitly. The content is always
      mounted and hidden while closed, so don't set <code class="font-mono text-accent">display</code>
      on it yourself.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Rest the pointer on the button, or Tab to it. The pointer can move onto the tooltip without closing it. Escape closes it and leaves focus on the trigger."
      code={usageCode}
    >
      <Tooltip>
        <TooltipTrigger tone="ghost" size="icon" aria-label="Bookmark">
          <Bookmark aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent side="top">
          <TooltipArrow />
          Bookmark
        </TooltipContent>
      </Tooltip>
    </Demo>

    <Demo
      title="Sides"
      description="side picks the edge and it flips when there isn't room. The arrow follows the side the tooltip landed on and points at the middle of the trigger."
      code={sidesCode}
    >
      {#each sides as side (side)}
        <Tooltip>
          <TooltipTrigger tone="outline" size="icon" aria-label="Open {side}">
            <Save aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent {side} sideOffset={8}>
            <TooltipArrow />
            {side}
          </TooltipContent>
        </Tooltip>
      {/each}
    </Demo>

    <Demo
      title="Copy feedback"
      description="closeOnPress=false keeps it open through the press so it can turn into Copied. onOpenChangeComplete resets the label once it closes."
      code={copyCode}
    >
      <div class="flex items-center gap-2">
        <code class="rounded-md border border-line bg-elevated px-2.5 py-1.5 font-mono text-sm text-fg">{command}</code>
        <Tooltip
          closeOnPress={false}
          onOpenChangeComplete={(open) => {
            if (!open) copied = false
          }}
        >
          <TooltipTrigger
            tone="ghost"
            size="icon"
            aria-label={copied ? "Copied" : "Copy"}
            onclick={() => {
              navigator.clipboard?.writeText(command).catch(() => {})
              copied = true
            }}
          >
            {#if copied}
              <Check aria-hidden="true" />
            {:else}
              <Copy aria-hidden="true" />
            {/if}
          </TooltipTrigger>
          <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
        </Tooltip>
      </div>
    </Demo>

    <Demo
      title="Shortcut hint"
      description="shortcut is a hint about what the trigger does: it sets aria-keyshortcuts and TooltipShortcut renders the keys. It doesn't bind them — the trigger's own handler does."
      code={shortcutCode}
    >
      <Tooltip shortcut="mod+s">
        <TooltipTrigger tone="outline">
          <Save aria-hidden="true" />
          Save
        </TooltipTrigger>
        <TooltipContent>
          Save changes
          <TooltipShortcut />
        </TooltipContent>
      </Tooltip>
    </Demo>

    <Demo
      title="Shared toolbar"
      description="One controller, many triggers. Each passes a payload and the content reads it from state. Moving along the toolbar opens the next tooltip at once, with no delay and no animation."
      code={sharedCode}
    >
      <div class="flex items-center gap-1" role="group" aria-label="Formatting">
        {#each formats as format (format.label)}
          <TooltipTrigger
            controller={formatTip}
            payload={format.label}
            tone="ghost"
            size="icon"
            aria-label={format.label}
          >
            <format.icon aria-hidden="true" />
          </TooltipTrigger>
        {/each}
        <Tooltip controller={formatTip}>
          <TooltipContent>
            {#snippet children(state)}{state.payload as string}{/snippet}
          </TooltipContent>
        </Tooltip>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="TooltipTrigger tone"
      rows={[
        { name: "outline", type: "default", description: "Bordered — a labelled button with a hint." },
        { name: "solid", type: "string", description: "Filled accent — a primary action." },
        { name: "ghost", type: "string", description: "Quiet — the usual choice for an icon-only toolbar button." },
      ]}
    />
    <PropsTable
      caption="TooltipTrigger size"
      rows={[
        { name: "md", type: "default", description: "h-9 with px-4." },
        { name: "sm", type: "string", description: "h-8 with px-3 and smaller text." },
        { name: "lg", type: "string", description: "h-11 with px-6." },
        { name: "icon", type: "string", description: "A 9×9 square for a single icon." },
      ]}
    />
    <PropsTable
      caption="Tooltip type"
      rows={[
        { name: "auto", type: "default", description: "Names a trigger with no name of its own, like an icon button; describes any other." },
        { name: "label", type: "string", description: "Always names the trigger. Use it when the tooltip repeats truncated text, so it isn't heard twice." },
        { name: "description", type: "string", description: "Always adds a description, leaving the trigger's own name alone." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes on the content: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-side</code>,
      <code class="font-mono text-accent">data-align</code>,
      <code class="font-mono text-accent">data-instant</code>,
      <code class="font-mono text-accent">data-starting-style</code>,
      <code class="font-mono text-accent">data-ending-style</code>.
      The trigger has no state attributes of its own, since it is often another component's trigger
      too. CSS variables: <code class="font-mono text-accent">--anchor-width</code>,
      <code class="font-mono text-accent">--anchor-height</code>,
      <code class="font-mono text-accent">--available-width</code>,
      <code class="font-mono text-accent">--available-height</code>,
      <code class="font-mono text-accent">--transform-origin</code>,
      <code class="font-mono text-accent">--arrow-offset</code>.
      The wrapper already caps the width at
      <code class="font-mono text-accent">min(16rem, var(--available-width))</code>, scales from
      <code class="font-mono text-accent">--transform-origin</code>, skips the transition on
      <code class="font-mono text-accent">data-instant</code>, and fades instead of scaling under
      reduced motion.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Tooltip (root)"
      rows={[
        { name: "open", type: "boolean", description: "Whether it's open. Bind with bind:open." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Starts open when uncontrolled." },
        { name: "delay", type: "number", default: "600", description: "Milliseconds the pointer rests before it opens. While another tooltip is open, or was a moment ago, the next opens at once — no provider needed." },
        { name: "closeDelay", type: "number", default: "0", description: "Milliseconds before it closes once the pointer leaves the trigger and the tooltip." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops the tooltip from opening. The trigger keeps working." },
        { name: "toggleable", type: "boolean", default: "false", description: "Pressing the trigger opens and closes it, so touch screens can show it too. For info buttons whose only job is the tip; the text is announced when a press opens it." },
        { name: "closeOnPress", type: "boolean", default: "true", description: "Whether pressing the trigger closes it. Set false for a copy button whose tooltip turns into Copied." },
        { name: "type", type: '"label" | "description"', description: "Whether it names its trigger or describes it. Defaults to naming an unnamed trigger." },
        { name: "shortcut", type: "string", description: 'The shortcut of what the trigger does, like "mod+s", as a hint. Sets aria-keyshortcuts; does not bind the keys.' },
        { name: "onOpenChange", type: "(open, details) => void", description: "details.reason says why and details.cancel() stops it. Cancel here to show a tooltip only when text is truncated." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the open or close animation finishes." },
        { name: "onPayloadChange", type: "(payload, details) => void", description: "Runs when another payload opens it or takes the open one over. details.cancel() keeps the previous payload." },
        { name: "controller", type: "TooltipController", description: "Open, close and inspect from anywhere, and connect triggers outside it. Create with createTooltipController()." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the popup into this element instead of in place." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="TooltipTrigger"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"outline"', description: "Visual style." },
        { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height and padding. icon is a square for one icon." },
        { name: "payload", type: "unknown", description: "Data the content renders when this trigger opens it, like its label in a shared toolbar." },
        { name: "controller", type: "TooltipController", description: "Connects a trigger outside the root to the same tooltip." },
        { name: "aria-label", type: "string", description: "Its own name. Required when several triggers share one tooltip, since only the trigger that opened it is described." },
        { name: "children", type: "Snippet<[state]>", description: "Button content. state.open says whether the tooltip is open from this trigger." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="TooltipContent"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left" | "start" | "end"', default: '"top"', description: "Which side of the anchor it opens on. Flips when there isn't room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "How it lines up along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between the anchor and the tooltip, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the anchor, in pixels." },
        { name: "collisionPadding", type: "number", default: "8", description: "Space to keep from the viewport edges, in pixels." },
        { name: "arrowPadding", type: "number", default: "6", description: "Space between the arrow and the tooltip's corners, in pixels." },
        { name: "anchor", type: "string | Anchor | null", description: "Positions against this instead of the trigger: an element, a selector, a point like { x, y }, or anything with getBoundingClientRect()." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the popup into this element instead of in place." },
        { name: "children", type: "Snippet<[state]>", description: "The tip. state.payload carries the trigger's data; state.instant says it opened at once. The content renders before the first open, so handle an undefined payload." },
        { name: "class", type: "string", description: "Extra classes. Leave position, inset, margin, translate and display to the ui-sdk." },
      ]}
    />
    <PropsTable
      caption="TooltipArrow"
      rows={[
        { name: "class", type: "string", description: "Extra classes. Defaults to an 8px square rotated 45°, with the tooltip's fill and the two outward borders, offset per data-side." },
        { name: "children", type: "Snippet<[state]>", description: "Optional content. state.open says whether the tooltip is open." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Replaces the div with your own element." },
      ]}
    />
    <PropsTable
      caption="TooltipShortcut"
      rows={[
        { name: "shortcut", type: "string", description: "The keys to show. Defaults to the tooltip's shortcut." },
        { name: "children", type: "Snippet<[state]>", description: "state.text is the shortcut formatted for this platform: ⌘S on Apple, Ctrl+S elsewhere. Empty without one." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
      ]}
    />
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">createTooltipController&lt;Payload&gt;()</code> exposes
      <code class="font-mono text-accent">isOpen()</code>,
      <code class="font-mono text-accent">setOpen()</code>,
      <code class="font-mono text-accent">open()</code>,
      <code class="font-mono text-accent">close()</code>,
      <code class="font-mono text-accent">toggle()</code>,
      <code class="font-mono text-accent">getPayload()</code> and
      <code class="font-mono text-accent">focus()</code>. On an open tooltip,
      <code class="font-mono text-accent">open(&#123; payload &#125;)</code> replaces the payload,
      like another trigger taking it over.
    </p>
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA tooltip pattern: the trigger is named or described by the tooltip through <code class="font-mono text-accent">aria-labelledby</code> or <code class="font-mono text-accent">aria-describedby</code>. It opens on hover and on keyboard focus, and stays open while the pointer moves onto it.</li>
      <li><span class="text-fg">Tab</span> onto the trigger opens it at once; focus leaving closes it. A click that focuses the trigger doesn't also open it from focus.</li>
      <li><span class="text-fg">Escape</span> closes it and leaves focus on the trigger, without closing a dialog or menu around it.</li>
      <li><span class="text-fg">Enter</span> and <span class="text-fg">Space</span> press the trigger and close the tooltip; on a <code class="font-mono text-accent">toggleable</code> trigger they open and close it, and the text is announced when a press opens it.</li>
      <li>Only one tooltip is open at a time. Once the pointer has been away a while, the delay applies again.</li>
      <li>A tooltip never takes focus, so it must not hold the only copy of essential information — put that in the page or in a popover.</li>
      <li>Browsers send hover events to a disabled button, but an <code class="font-mono text-accent">aria-disabled</code> trigger shows its tooltip on hover and focus and ignores presses, so it can explain why it's unavailable.</li>
      <li>When several triggers share one tooltip, only the trigger that opened it is described — give each one its own <code class="font-mono text-accent">aria-label</code>.</li>
      <li>On a popover trigger, hovering shows the tooltip and pressing opens the popover; Escape closes the tooltip and leaves the popover open.</li>
      <li><code class="font-mono text-accent">TooltipArrow</code> is decorative and needs no name. The wrapper fades instead of scaling under reduced motion.</li>
    </ul>
  </Section>
</div>