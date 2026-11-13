<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    ScrollArea,
    ScrollAreaViewport,
    ScrollAreaContent,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner,
    ScrollAreaScrollToEnd,
    createScrollAreaController,
  } from "$lib/components/scroll-area"
  import { Button } from "$lib/components/button"

  const tags = Array.from({ length: 30 }, (_, i) => "v1.2.0-beta." + (30 - i))

  const chips = [
    "Sand", "Clay", "Rust", "Moss", "Sage", "Fog",
    "Slate", "Ink", "Bone", "Ember", "Pine", "Dusk",
  ]

  const releases = [
    { version: "v1.12.0", date: "Oct 28, 2026", status: "Latest", downloads: "18,204", size: "4.3 MB", node: "20+" },
    { version: "v1.11.2", date: "Oct 14, 2026", status: "Stable", downloads: "26,931", size: "4.2 MB", node: "20+" },
    { version: "v1.11.1", date: "Oct 2, 2026", status: "Stable", downloads: "9,412", size: "4.2 MB", node: "20+" },
    { version: "v1.11.0", date: "Sep 23, 2026", status: "Stable", downloads: "31,077", size: "4.2 MB", node: "20+" },
    { version: "v1.10.3", date: "Sep 9, 2026", status: "Stable", downloads: "12,640", size: "4.1 MB", node: "18+" },
    { version: "v1.10.2", date: "Aug 27, 2026", status: "Stable", downloads: "8,315", size: "4.1 MB", node: "18+" },
    { version: "v1.10.1", date: "Aug 18, 2026", status: "Stable", downloads: "5,902", size: "4.1 MB", node: "18+" },
    { version: "v1.10.0", date: "Aug 5, 2026", status: "Stable", downloads: "22,486", size: "4.0 MB", node: "18+" },
  ]

  const controller = createScrollAreaController()

  const installCode = `import {
  ScrollArea, ScrollAreaViewport, ScrollAreaContent,
  ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaCorner, ScrollAreaScrollToEnd,
} from "$lib/components/scroll-area"`

  const usageCode = `<script lang="ts">
  import {
    ScrollArea, ScrollAreaViewport, ScrollAreaContent, ScrollAreaScrollbar, ScrollAreaThumb,
  } from "$lib/components/scroll-area"

  const tags = Array.from({ length: 30 }, (_, i) => "v1.2.0-beta." + (30 - i))
<\/script>

<ScrollArea class="h-64 w-full max-w-xs">
  <ScrollAreaViewport role="region" aria-label="Tags">
    <ScrollAreaContent>
      <ul class="divide-y divide-line">
        {#each tags as tag (tag)}
          <li class="py-1.5 font-mono text-xs">{tag}</li>
        {/each}
      </ul>
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar>
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
</ScrollArea>`

  const horizontalCode = `<ScrollArea type="auto" class="h-auto w-full max-w-md">
  <ScrollAreaViewport role="region" aria-label="Palette">
    <ScrollAreaContent>
      <div class="flex w-max gap-2">
        {#each chips as chip (chip)}
          <span class="rounded-full border border-line bg-elevated px-3 py-1 text-xs text-muted">{chip}</span>
        {/each}
      </div>
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar orientation="horizontal">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
</ScrollArea>`

  const bothAxesCode = `<ScrollArea type="auto" class="h-64 w-full max-w-lg">
  <ScrollAreaViewport role="region" aria-label="Releases">
    <ScrollAreaContent class="p-0">
      <table class="w-max text-xs">
        <thead>
          <tr class="text-left text-faint">
            <th class="px-3 py-2 font-medium">Version</th>
            <th class="px-3 py-2 font-medium">Released</th>
            <th class="px-3 py-2 font-medium">Status</th>
            <th class="px-3 py-2 font-medium">Downloads</th>
            <th class="px-3 py-2 font-medium">Size</th>
            <th class="px-3 py-2 font-medium">Node</th>
          </tr>
        </thead>
        <tbody>
          {#each releases as release (release.version)}
            <tr class="border-t border-line">
              <th scope="row" class="px-3 py-2 text-left font-mono font-normal text-fg">{release.version}</th>
              <td class="px-3 py-2 text-muted">{release.date}</td>
              <td class="px-3 py-2 text-muted">{release.status}</td>
              <td class="px-3 py-2 text-muted">{release.downloads}</td>
              <td class="px-3 py-2 text-muted">{release.size}</td>
              <td class="px-3 py-2 text-muted">{release.node}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
  <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
  <ScrollAreaCorner />
</ScrollArea>`

  const controllerCode = `<script lang="ts">
  import { createScrollAreaController } from "$lib/components/scroll-area"

  const controller = createScrollAreaController()
<\/script>

<div class="w-full max-w-xs space-y-3">
  <div class="flex gap-2">
    <Button size="sm" tone="outline" onclick={() => controller.scrollToStart({ behavior: "smooth" })}>
      Back to top
    </Button>
    <Button size="sm" tone="outline" onclick={() => controller.scrollToEnd({ behavior: "smooth" })}>
      Jump to end
    </Button>
  </div>
  <ScrollArea {controller} class="h-56 w-full">
    <ScrollAreaViewport role="region" aria-label="Tags">
      <ScrollAreaContent>
        <ul class="divide-y divide-line">
          {#each tags as tag (tag)}
            <li class="py-1.5 font-mono text-xs">{tag}</li>
          {/each}
        </ul>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
  </ScrollArea>
</div>`

  const chatCode = `<script lang="ts">
  let messages = $state([
    { from: "Hollis", text: "Launch checklist is ready for Thursday." },
    { from: "Inès", text: "Updated the pricing page copy." },
    { from: "Kofi", text: "Design review notes are in the folder." },
  ])
<\/script>

<div class="w-full max-w-sm space-y-3">
  <Button
    size="sm"
    tone="outline"
    onclick={() => (messages = [...messages, { from: "Wren", text: "Another update just landed." }])}
  >
    Add message
  </Button>
  <ScrollArea stickToEnd type="auto" class="h-56 w-full">
    <ScrollAreaViewport role="log" aria-label="Messages">
      <ScrollAreaContent>
        <ul class="space-y-2">
          {#each messages as message, i (i)}
            <li class="rounded-md bg-elevated px-3 py-2 text-xs">
              <span class="font-medium text-fg">{message.from}</span>
              <span class="text-muted"> {message.text}</span>
            </li>
          {/each}
        </ul>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaScrollToEnd>Jump to latest</ScrollAreaScrollToEnd>
  </ScrollArea>
</div>`

  let messages = $state([
    { from: "Hollis", text: "Launch checklist is ready for Thursday." },
    { from: "Inès", text: "Updated the pricing page copy." },
    { from: "Kofi", text: "Design review notes are in the folder." },
  ])
</script>

<svelte:head>
  <title>Scroll Area — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Scroll Area"
  description="A scrolling region with scrollbars that match your design. Wraps the ui-sdk Scroll Area: the browser still does the scrolling, so the wheel, touch, keyboard and find in page work as usual, while the parts add edge state, drag paging and follow-to-end."
  entry="@ui-sdk/svelte/scroll-area"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/scroll-area</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the content inside a viewport, then add a scrollbar for each axis you want to style. The
      viewport is the real scroller: give the root a size and the viewport fills it. Render only the
      scrollbars you want — with none, the browser's own scrollbars stay.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Scroll with the wheel, the keyboard or the thumb. The scrollbar shows while the pointer is over the list."
      code={usageCode}
    >
      <ScrollArea class="h-64 w-full max-w-xs">
        <ScrollAreaViewport role="region" aria-label="Tags">
          <ScrollAreaContent>
            <ul class="divide-y divide-line">
              {#each tags as tag (tag)}
                <li class="py-1.5 font-mono text-xs">{tag}</li>
              {/each}
            </ul>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar>
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </Demo>

    <Demo
      title="Horizontal"
      description="A horizontal scrollbar scrolls the inline axis, so the row grows as wide as it needs. Drag it, or use Shift and the wheel."
      code={horizontalCode}
    >
      <ScrollArea type="auto" class="h-auto w-full max-w-md">
        <ScrollAreaViewport role="region" aria-label="Palette">
          <ScrollAreaContent>
            <div class="flex w-max gap-2">
              {#each chips as chip (chip)}
                <span class="rounded-full border border-line bg-elevated px-3 py-1 text-xs text-muted">{chip}</span>
              {/each}
            </div>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </Demo>

    <Demo
      title="Both axes"
      description="With both scrollbars, each stops short of the corner where they meet, which ScrollAreaCorner fills."
      code={bothAxesCode}
    >
      <ScrollArea type="auto" class="h-64 w-full max-w-lg">
        <ScrollAreaViewport role="region" aria-label="Releases">
          <ScrollAreaContent class="p-0">
            <table class="w-max text-xs">
              <thead>
                <tr class="text-left text-faint">
                  <th class="px-3 py-2 font-medium">Version</th>
                  <th class="px-3 py-2 font-medium">Released</th>
                  <th class="px-3 py-2 font-medium">Status</th>
                  <th class="px-3 py-2 font-medium">Downloads</th>
                  <th class="px-3 py-2 font-medium">Size</th>
                  <th class="px-3 py-2 font-medium">Node</th>
                </tr>
              </thead>
              <tbody>
                {#each releases as release (release.version)}
                  <tr class="border-t border-line">
                    <th scope="row" class="px-3 py-2 text-left font-mono font-normal text-fg">{release.version}</th>
                    <td class="px-3 py-2 text-muted">{release.date}</td>
                    <td class="px-3 py-2 text-muted">{release.status}</td>
                    <td class="px-3 py-2 text-muted">{release.downloads}</td>
                    <td class="px-3 py-2 text-muted">{release.size}</td>
                    <td class="px-3 py-2 text-muted">{release.node}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollArea>
    </Demo>

    <Demo
      title="Controller"
      description="createScrollAreaController() scrolls the area from buttons outside it, smoothly or instantly."
      code={controllerCode}
    >
      <div class="w-full max-w-xs space-y-3">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => controller.scrollToStart({ behavior: "smooth" })}>
            Back to top
          </Button>
          <Button size="sm" tone="outline" onclick={() => controller.scrollToEnd({ behavior: "smooth" })}>
            Jump to end
          </Button>
        </div>
        <ScrollArea {controller} class="h-56 w-full">
          <ScrollAreaViewport role="region" aria-label="Tags">
            <ScrollAreaContent>
              <ul class="divide-y divide-line">
                {#each tags as tag (tag)}
                  <li class="py-1.5 font-mono text-xs">{tag}</li>
                {/each}
              </ul>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        </ScrollArea>
      </div>
    </Demo>

    <Demo
      title="Follow to end"
      description="stickToEnd starts at the bottom and keeps new messages in view. Scroll up to let go; Jump to latest sticks again."
      code={chatCode}
    >
      <div class="w-full max-w-sm space-y-3">
        <Button
          size="sm"
          tone="outline"
          onclick={() => (messages = [...messages, { from: "Wren", text: "Another update just landed." }])}
        >
          Add message
        </Button>
        <ScrollArea stickToEnd type="auto" class="h-56 w-full">
          <ScrollAreaViewport role="log" aria-label="Messages">
            <ScrollAreaContent>
              <ul class="space-y-2">
                {#each messages as message, i (i)}
                  <li class="rounded-md bg-elevated px-3 py-2 text-xs">
                    <span class="font-medium text-fg">{message.from}</span>
                    <span class="text-muted"> {message.text}</span>
                  </li>
                {/each}
              </ul>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
          <ScrollAreaScrollToEnd>Jump to latest</ScrollAreaScrollToEnd>
        </ScrollArea>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="type — when scrollbars show"
      rows={[
        { name: "hover", type: "default", description: "While the pointer is over the area, or while scrolling." },
        { name: "scroll", type: "string", description: "While its own axis scrolls, or its thumb is dragged." },
        { name: "auto", type: "string", description: "Whenever the content overflows on its axis." },
        { name: "always", type: "string", description: "Always, even when the content fits, with no thumb then." },
      ]}
    />
    <PropsTable
      caption="ScrollAreaScrollbar orientation"
      rows={[
        { name: "vertical", type: "default", description: "Sits over the viewport's inline-end edge and scrolls the block axis." },
        { name: "horizontal", type: "string", description: "Sits over the bottom edge and scrolls the inline axis." },
      ]}
    />
    <p class="text-sm text-muted">
      The wrapper shows a scrollbar under <code class="font-mono text-accent">data-visible</code> and
      darkens its thumb under <code class="font-mono text-accent">data-scrolling</code>,
      <code class="font-mono text-accent">data-hovering</code> and
      <code class="font-mono text-accent">data-dragging</code>. The root also carries
      <code class="font-mono text-accent">data-overflow-x</code>,
      <code class="font-mono text-accent">data-overflow-y</code>,
      <code class="font-mono text-accent">data-at-start</code>,
      <code class="font-mono text-accent">data-at-end</code>,
      <code class="font-mono text-accent">data-at-x-start</code>,
      <code class="font-mono text-accent">data-at-x-end</code>,
      <code class="font-mono text-accent">data-at-y-start</code>,
      <code class="font-mono text-accent">data-at-y-end</code> and
      <code class="font-mono text-accent">data-sticking</code>.
    </p>
    <PropsTable
      caption="Root CSS variables"
      rows={[
        { name: "--scroll-area-overflow-y-start", type: "length", description: "How far the content reaches above the view. Grow a top fade with it." },
        { name: "--scroll-area-overflow-y-end", type: "length", description: "How far the content reaches below the view." },
        { name: "--scroll-area-overflow-x-start", type: "length", description: "How far the content reaches past the inline start." },
        { name: "--scroll-area-overflow-x-end", type: "length", description: "How far the content reaches past the inline end." },
        { name: "--scroll-area-progress-y", type: "0 to 1", description: "How far down the view is. A reading progress bar can scale with it." },
        { name: "--scroll-area-progress-x", type: "0 to 1", description: "How far along the inline axis the view is." },
      ]}
    />
    <p class="text-sm text-muted">
      These variables are not inherited, so scrolling restyles the root and never the content. A child
      of the root that reads one takes it with
      <code class="font-mono text-accent">--scroll-area-overflow-y-start: inherit</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="ScrollArea (root)"
      rows={[
        { name: "type", type: '"hover" | "scroll" | "auto" | "always"', default: '"hover"', description: "When the scrollbars show. Each scrollbar gets data-visible while it should." },
        { name: "scrollHideDelay", type: "number", default: "600", description: "How long scrollbars stay after they stop being needed, in ms, with scroll and hover." },
        { name: "stickToEnd", type: "boolean", default: "false", description: "Keeps the end in view as content grows. Scrolling toward the start lets go." },
        { name: "controller", type: "ScrollAreaController", description: "Scroll and read the area from anywhere via createScrollAreaController()." },
        { name: "class", type: "string", description: "Extra classes. Give the root a size; it defaults to h-64 w-full." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="ScrollAreaViewport"
      rows={[
        { name: "role", type: "string", description: 'Make it a landmark with role="region" and an aria-label, or role="log" for a chat.' },
        { name: "aria-label", type: "string", description: "Accessible name for the scrolling region." },
        { name: "onscroll", type: "(event) => void", description: "Native scroll event, for reading the controller's position." },
        { name: "class", type: "string", description: "Extra classes. It fills the root; ui-sdk sets its overflow." },
      ]}
    />
    <PropsTable
      caption="ScrollAreaContent"
      rows={[
        { name: "class", type: "string", description: "Extra classes. Defaults to px-4 py-3 text-sm; pass p-0 for a full-bleed table." },
        { name: "children", type: "Snippet<[state]>", description: "The content to scroll." },
      ]}
    />
    <PropsTable
      caption="ScrollAreaScrollbar"
      rows={[
        { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "The axis it scrolls. Its thumb follows it." },
        { name: "class", type: "string", description: "Extra classes merged onto the track." },
      ]}
    />
    <PropsTable
      caption="ScrollAreaThumb / ScrollAreaCorner"
      rows={[
        { name: "class", type: "string", description: "Extra classes. The thumb sizes and moves itself from its scrollbar's CSS variables." },
        { name: "render", type: "Snippet", description: "Swap the element, spreading the supplied props." },
      ]}
    />
    <PropsTable
      caption="ScrollAreaScrollToEnd"
      rows={[
        { name: "children", type: "Snippet<[state]>", description: "The button's label, e.g. Jump to latest. Name it with its content." },
        { name: "class", type: "string", description: "Extra classes. It is inert and faded out while the view is at the end." },
      ]}
    />
    <PropsTable
      caption="ScrollAreaController"
      rows={[
        { name: "scrollToEnd(options?)", type: "(options?) => void", description: "Scrolls to the bottom, or the inline end when only that axis overflows. With stickToEnd it sticks again." },
        { name: "scrollToStart(options?)", type: "(options?) => void", description: "Scrolls to the top, or the inline start." },
        { name: "isAtEnd() / isAtStart()", type: "() => boolean", description: "Reads the position now, even inside a scroll event before the attributes catch up." },
        { name: "isSticking()", type: "() => boolean", description: "Whether the view follows the end as content grows." },
        { name: "options.behavior", type: '"instant" | "smooth"', description: "smooth eases there, and is instant when the user prefers reduced motion." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "overflowX / overflowY", type: "boolean", description: "Root, viewport and content: whether the content is wider or taller than the viewport." },
        { name: "atStart / atEnd", type: "boolean", description: "Whether the view is at the start or the end." },
        { name: "scrolling / hovering", type: "boolean", description: "Whether the user is scrolling now, or a mouse or pen is over the area." },
        { name: "sticking", type: "boolean", description: "Whether the view follows the end with stickToEnd." },
        { name: "visible / dragging", type: "boolean", description: "Scrollbar: whether it should show, and whether its thumb is dragged. Thumb: dragging only." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>No WAI-ARIA pattern covers scroll areas: the viewport is a native scroller, and keyboard access follows axe's <code class="font-mono text-accent">scrollable-region-focusable</code> rule.</li>
      <li>Make the viewport a landmark with <code class="font-mono text-accent">role="region"</code> and an <code class="font-mono text-accent">aria-label</code> when it is worth finding, or give a chat <code class="font-mono text-accent">role="log"</code>.</li>
      <li>Once focus is inside the viewport, <span class="text-fg">Arrow keys</span>, <span class="text-fg">Page Up/Down</span>, <span class="text-fg">Home</span>, <span class="text-fg">End</span> and <span class="text-fg">Space</span> scroll it natively.</li>
      <li>A viewport that scrolls and holds nothing focusable is a tab stop itself. One with links or fields inside is not, since Tab reaches them and they scroll it.</li>
      <li>Scrollbars and the corner are <code class="font-mono text-accent">aria-hidden</code>: screen readers scroll the viewport themselves. Pressing a scrollbar never moves focus.</li>
      <li>Dragging the thumb selects no text, pauses scroll snapping until the pointer lifts, and <span class="text-fg">Escape</span> puts the content back where the drag started.</li>
      <li>Pressing the track pages toward the pointer by most of a viewport and keeps paging while held; with <span class="text-fg">Alt</span> (<span class="text-fg">Option</span> on a Mac) it jumps there and drags instead.</li>
      <li>A wheel over a scrollbar scrolls the viewport, then the page once the viewport cannot scroll further.</li>
      <li><code class="font-mono text-accent">ScrollAreaScrollToEnd</code> is inert while hidden, so it never takes focus; from the keyboard, focus moves to the viewport instead of the page.</li>
    </ul>
  </Section>
</div>