<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Waterfall,
    WaterfallHeaderRow,
    WaterfallColumnHeader,
    WaterfallAxis,
    WaterfallTick,
    WaterfallMark,
    WaterfallRow,
    WaterfallRowHeader,
    WaterfallIndicator,
    WaterfallCell,
    WaterfallBar,
    createWaterfallController,
    visibleWaterfallRows,
    type WaterfallAxisState,
    type WaterfallData,
  } from "#lib/components/waterfall"
  import { Button } from "#lib/components/button"
  import { ChevronRight } from "@lucide/svelte"

  const installCode = `import {
  Waterfall, WaterfallHeaderRow, WaterfallColumnHeader, WaterfallAxis,
  WaterfallTick, WaterfallMark, WaterfallRow, WaterfallRowHeader,
  WaterfallIndicator, WaterfallCell, WaterfallBar,
} from "#lib/components/waterfall"`

  const usageCode = `<script lang="ts">
  import { Waterfall, WaterfallBar, WaterfallRow, WaterfallRowHeader, type WaterfallData } from "#lib/components/waterfall"

  const requests: WaterfallData = [
    { value: "document", label: "/", start: 0, duration: 182 },
    { value: "script", label: "app.js", start: 192, duration: 410 },
  ]
<\/script>

<Waterfall aria-label="Network requests" items={requests}>
  {#each requests as request (request.value)}
    <WaterfallRow value={request.value}>
      <WaterfallRowHeader>{request.label}</WaterfallRowHeader>
      <WaterfallBar />
    </WaterfallRow>
  {/each}
</Waterfall>`

  const requests: WaterfallData = [
    { value: "document", label: "/", start: 0, duration: 182 },
    { value: "styles", label: "app.css", start: 190, duration: 96 },
    { value: "script", label: "app.js", start: 192, duration: 410 },
    { value: "font", label: "inter.woff2", start: 300, duration: 220 },
    { value: "user", label: "api/user", start: 610, duration: 240 },
    { value: "avatar", label: "avatar.png", start: 860, duration: 150 },
  ]

  const sizes: Record<string, string> = {
    document: "14 kB",
    styles: "8 kB",
    script: "212 kB",
    font: "48 kB",
    user: "1 kB",
    avatar: "36 kB",
  }

  const networkCode = `<Waterfall
  aria-label="Network requests"
  items={requests}
  getBarLabel={(request, { start, duration }) =>
    \`\${sizes[request.value]}, starts at \${start} ms, takes \${duration} ms\`}
>
  <WaterfallHeaderRow>
    <WaterfallColumnHeader>Name</WaterfallColumnHeader>
    <WaterfallColumnHeader>Size</WaterfallColumnHeader>
    <WaterfallColumnHeader aria-label="Timeline">
      <WaterfallAxis maxTicks={5} />
      <WaterfallMark time={620}>DOMContentLoaded</WaterfallMark>
    </WaterfallColumnHeader>
  </WaterfallHeaderRow>
  {#each requests as request (request.value)}
    <WaterfallRow value={request.value}>
      <WaterfallRowHeader>{request.label}</WaterfallRowHeader>
      <WaterfallCell>{sizes[request.value]}</WaterfallCell>
      <WaterfallBar />
    </WaterfallRow>
  {/each}
</Waterfall>`

  const trace: WaterfallData = [
    {
      value: "checkout",
      label: "POST /checkout",
      start: 0,
      duration: 920,
      children: [
        { value: "auth", label: "auth.verify", start: 12, duration: 64 },
        {
          value: "cart",
          label: "cart.load",
          start: 80,
          duration: 310,
          children: [
            { value: "cart-db", label: "db.query carts", start: 96, duration: 140 },
            { value: "prices", label: "pricing.quote", start: 240, duration: 136 },
          ],
        },
        {
          value: "payment",
          label: "payments.charge",
          start: 400,
          duration: 470,
          children: [
            { value: "fraud", label: "fraud.score", start: 410, duration: 120 },
            { value: "gateway", label: "gateway.capture", start: 540, duration: 310 },
          ],
        },
        { value: "email", label: "email.enqueue", start: 880, duration: 30 },
      ],
    },
  ]

  const spans = createWaterfallController()
  let expanded = $state(["checkout"])
  let selected = $state<string | null>(null)
  const rows = $derived(visibleWaterfallRows(trace, expanded))

  const traceCode = `<script lang="ts">
  import { ChevronRight } from "@lucide/svelte"
  import { createWaterfallController, visibleWaterfallRows } from "#lib/components/waterfall"

  const spans = createWaterfallController()
  let expanded = $state(["checkout"])
  let selected = $state<string | null>(null)
  const rows = $derived(visibleWaterfallRows(trace, expanded))
<\/script>

<Button size="sm" tone="outline" onclick={() => spans.expandAll()}>Expand all</Button>
<Button size="sm" tone="outline" onclick={() => spans.collapseAll()}>Collapse all</Button>
<Waterfall
  aria-label="Checkout trace"
  items={trace}
  controller={spans}
  bind:expanded
  bind:value={selected}
  format={{ style: "unit", unit: "millisecond", unitDisplay: "narrow" }}
>
  <WaterfallHeaderRow>
    <WaterfallColumnHeader>Span</WaterfallColumnHeader>
    <WaterfallColumnHeader aria-label="Timeline"><WaterfallAxis /></WaterfallColumnHeader>
  </WaterfallHeaderRow>
  {#each rows as { item } (item.value)}
    <WaterfallRow value={item.value}>
      <WaterfallRowHeader>
        {#if item.children}
          <WaterfallIndicator><ChevronRight aria-hidden="true" /></WaterfallIndicator>
        {/if}
        {item.label}
      </WaterfallRowHeader>
      <WaterfallBar />
    </WaterfallRow>
  {/each}
</Waterfall>
<p>Selected: {selected ?? "none"}</p>`

  const renderTrace: WaterfallData = [
    {
      value: "render",
      label: "render /dashboard",
      start: 0,
      duration: 1200,
      children: [
        { value: "session", label: "session", start: 20, duration: 80 },
        { value: "metrics", label: "metrics", start: 110, duration: 640 },
        { value: "alerts", label: "alerts", start: 110, duration: 260 },
        { value: "html", label: "stream html", start: 760, duration: 420 },
      ],
    },
  ]

  const renderSpans = [renderTrace[0], ...renderTrace[0].children!]
  const full: [number, number] = [0, 1200]

  function zoomed([start, end]: [number, number], factor: number) {
    const center = (start + end) / 2
    const half = Math.min(((end - start) * factor) / 2, full[1] / 2)
    const from = Math.min(Math.max(full[0], center - half), full[1] - half * 2)
    return [from, from + half * 2] as [number, number]
  }

  let range = $state(full)

  const zoomCode = `<script lang="ts">
  let range = $state<[number, number]>([0, 1200])
<\/script>

<Button size="sm" tone="outline" onclick={() => (range = zoomed(range, 0.5))}>Zoom in</Button>
<Button size="sm" tone="outline" onclick={() => (range = zoomed(range, 2))}>Zoom out</Button>
<Button size="sm" tone="ghost" onclick={() => (range = [0, 1200])}>Reset</Button>
<Waterfall
  aria-label="Dashboard render"
  items={renderTrace}
  {range}
  defaultExpanded={["render"]}
  defaultValue="metrics"
>
  <WaterfallHeaderRow>
    <WaterfallColumnHeader>Span</WaterfallColumnHeader>
    <WaterfallColumnHeader aria-label="Timeline">
      <WaterfallAxis>
        {#snippet children({ ticks }: WaterfallAxisState)}
          {#each ticks as tick (tick.time)}
            <WaterfallTick time={tick.time}>{tick.label}</WaterfallTick>
          {/each}
        {/snippet}
      </WaterfallAxis>
    </WaterfallColumnHeader>
  </WaterfallHeaderRow>
  {#each renderSpans as span (span.value)}
    <WaterfallRow value={span.value}>
      <WaterfallRowHeader>
        {#if span.children}
          <WaterfallIndicator><ChevronRight aria-hidden="true" /></WaterfallIndicator>
        {/if}
        {span.label}
      </WaterfallRowHeader>
      <WaterfallBar />
    </WaterfallRow>
  {/each}
</Waterfall>`

  const buildSteps: WaterfallData = [
    { value: "install", label: "install", start: 0, duration: 2400 },
    { value: "lint", label: "lint", start: 2400, duration: 900 },
    { value: "test", label: "test", start: 3300, duration: 4100 },
    { value: "bundle", label: "bundle", start: 7400, duration: 1800 },
  ]

  const autoCode = `<Waterfall aria-label="Build steps" items={buildSteps} />`

  let autoSelected = $state<string | null>("test")
</script>

<svelte:head>
  <title>Waterfall — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Waterfall"
  description="A trace's spans as bars on one shared time axis, for network requests, OpenTelemetry traces or build steps. Wraps the ui-sdk Waterfall: a treegrid with expandable spans, one tab stop and a keyboard-navigable time axis."
  entry="@ui-sdk/svelte/waterfall"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/waterfall</code>. The bar, axis and row layout
      is already baked into the wrappers, driven by the
      <code class="font-mono text-accent">--waterfall-start</code>,
      <code class="font-mono text-accent">--waterfall-size</code> and
      <code class="font-mono text-accent">--waterfall-level</code> variables the primitive writes.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Each span has a <code class="font-mono text-accent">value</code>, a
      <code class="font-mono text-accent">label</code>, a
      <code class="font-mono text-accent">start</code> and a
      <code class="font-mono text-accent">duration</code> in milliseconds, and the spans it started as
      <code class="font-mono text-accent">children</code>. Pass every span as
      <code class="font-mono text-accent">items</code> and render a
      <code class="font-mono text-accent">WaterfallRow</code> for each with the span's value. Rows are
      flat siblings: the waterfall reads each one's level and place from
      <code class="font-mono text-accent">items</code>. Give it an accessible name.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      With no children at all, the waterfall renders a row per span itself — header, indicator and bar
      included — so a flat list needs no markup.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Network requests"
      description="A header row with an axis and a DOMContentLoaded mark. Arrow keys move between requests; Right moves into a row's cells, where each bar reads out its start and duration."
      code={networkCode}
    >
      <div class="w-full">
        <Waterfall
          aria-label="Network requests"
          items={requests}
          getBarLabel={(request, { start, duration }) =>
            `${sizes[request.value]}, starts at ${start} ms, takes ${duration} ms`}
        >
          <WaterfallHeaderRow>
            <WaterfallColumnHeader>Name</WaterfallColumnHeader>
            <WaterfallColumnHeader>Size</WaterfallColumnHeader>
            <WaterfallColumnHeader aria-label="Timeline">
              <WaterfallAxis maxTicks={5} />
              <WaterfallMark time={620}>DOMContentLoaded</WaterfallMark>
            </WaterfallColumnHeader>
          </WaterfallHeaderRow>
          {#each requests as request (request.value)}
            <WaterfallRow value={request.value}>
              <WaterfallRowHeader>{request.label}</WaterfallRowHeader>
              <WaterfallCell>{sizes[request.value]}</WaterfallCell>
              <WaterfallBar />
            </WaterfallRow>
          {/each}
        </Waterfall>
      </div>
    </Demo>

    <Demo
      title="Nested spans"
      description="Click an indicator or press Right/Left on a row to expand and collapse. Enter or Space selects. visibleWaterfallRows flattens the open spans; the controller drives Expand all and Collapse all."
      code={traceCode}
    >
      <div class="w-full space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => spans.expandAll()}>Expand all</Button>
          <Button size="sm" tone="outline" onclick={() => spans.collapseAll()}>Collapse all</Button>
          <Button size="sm" tone="ghost" onclick={() => spans.reveal("gateway")}>Reveal gateway</Button>
        </div>
        <Waterfall
          aria-label="Checkout trace"
          items={trace}
          controller={spans}
          bind:expanded
          bind:value={selected}
          format={{ style: "unit", unit: "millisecond", unitDisplay: "narrow" }}
        >
          <WaterfallHeaderRow>
            <WaterfallColumnHeader>Span</WaterfallColumnHeader>
            <WaterfallColumnHeader aria-label="Timeline"><WaterfallAxis /></WaterfallColumnHeader>
          </WaterfallHeaderRow>
          {#each rows as { item } (item.value)}
            <WaterfallRow value={item.value}>
              <WaterfallRowHeader>
                {#if item.children}
                  <WaterfallIndicator><ChevronRight aria-hidden="true" /></WaterfallIndicator>
                {/if}
                {item.label}
              </WaterfallRowHeader>
              <WaterfallBar />
            </WaterfallRow>
          {/each}
        </Waterfall>
        <p class="text-sm text-muted">
          Selected: <span class="font-mono text-fg">{selected ?? "none"}</span>
        </p>
      </div>
    </Demo>

    <Demo
      title="Zoom"
      description="range sets the stretch of time the axis shows. Bars outside it shrink to its edges, and the axis labels every other tick when it gets narrow. The axis children snippet renders custom ticks."
      code={zoomCode}
    >
      <div class="w-full space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => (range = zoomed(range, 0.5))}>Zoom in</Button>
          <Button size="sm" tone="outline" onclick={() => (range = zoomed(range, 2))}>Zoom out</Button>
          <Button size="sm" tone="ghost" onclick={() => (range = full)}>Reset</Button>
        </div>
        <Waterfall
          aria-label="Dashboard render"
          items={renderTrace}
          {range}
          defaultExpanded={["render"]}
          defaultValue="metrics"
        >
          <WaterfallHeaderRow>
            <WaterfallColumnHeader>Span</WaterfallColumnHeader>
            <WaterfallColumnHeader aria-label="Timeline">
              <WaterfallAxis>
                {#snippet children({ ticks }: WaterfallAxisState)}
                  {#each ticks as tick (tick.time)}
                    <WaterfallTick time={tick.time}>{tick.label}</WaterfallTick>
                  {/each}
                {/snippet}
              </WaterfallAxis>
            </WaterfallColumnHeader>
          </WaterfallHeaderRow>
          {#each renderSpans as span (span.value)}
            <WaterfallRow value={span.value}>
              <WaterfallRowHeader>
                {#if span.children}
                  <WaterfallIndicator><ChevronRight aria-hidden="true" /></WaterfallIndicator>
                {/if}
                {span.label}
              </WaterfallRowHeader>
              <WaterfallBar />
            </WaterfallRow>
          {/each}
        </Waterfall>
        <p class="text-sm text-muted">
          Range: <span class="font-mono text-fg">{range[0]}–{range[1]} ms</span>
        </p>
      </div>
    </Demo>

    <Demo
      title="Automatic rows"
      description="With no children the waterfall renders every span's row, header, indicator and bar for you. defaultValue preselects a span."
      code={autoCode}
    >
      <div class="w-full space-y-3">
        <Waterfall aria-label="Build steps" items={buildSteps} bind:value={autoSelected} />
        <p class="text-sm text-muted">
          Selected: <span class="font-mono text-fg">{autoSelected ?? "none"}</span>
        </p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Waterfall has no tone or size props. Its variants are structural: flat or nested spans, an
      optional header row and axis, a controlled time range, and row state.
    </p>
    <PropsTable
      caption="Composition"
      rows={[
        { name: "Flat spans", type: "default", description: "No children: one row per span, all at level 1." },
        { name: "Nested spans", type: "children[]", description: "Rows expand and collapse; --waterfall-level indents each header." },
        { name: "Automatic rows", type: "no children", description: "The root renders header, indicator and bar for every span itself." },
        { name: "Header row + axis", type: "optional", description: "Column headers, round-time ticks and marks across every row." },
      ]}
    />
    <PropsTable
      caption="Row state (data attributes)"
      rows={[
        { name: "data-selected", type: "attribute", description: "The selected span's row and its parts; the bar goes solid accent." },
        { name: "data-expanded", type: "attribute", description: "A span with children that is open; the indicator rotates 90°." },
        { name: "data-branch", type: "attribute", description: "The span has children, so its header reserves no indicator gap." },
        { name: "data-level", type: "1 | 2 | …", description: "Depth from 1; also in --waterfall-level for indentation." },
        { name: "data-outside", type: "attribute", description: "On a mark whose time falls outside the range, so it hides." },
      ]}
    />
    <PropsTable
      caption="CSS variables"
      rows={[
        { name: "--waterfall-start", type: "percentage", description: "Where the span starts on the axis; the bar's inset-inline-start." },
        { name: "--waterfall-size", type: "percentage", description: "How much of the axis the span covers; the bar's width. Zero outside the range." },
        { name: "--waterfall-level", type: "number", description: "The span's depth, used to indent its row header." },
        { name: "--waterfall-tick", type: "percentage", description: "Where a tick's time sits on the axis." },
        { name: "--waterfall-mark", type: "percentage", description: "Where a mark's time sits on the axis." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Every part forwards all HTML attributes plus the ui-sdk
      <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive that part's state.
    </p>
    <PropsTable
      caption="Waterfall (root)"
      rows={[
        { name: "items", type: "WaterfallData", description: "Required. The spans: value, label, start, duration and optional children." },
        { name: "range", type: "[number, number]", description: "The stretch of time the axis shows, in ms. Defaults to earliest start → latest end." },
        { name: "value", type: "string | null", description: "The selected span. Bind with bind:value to control; null selects nothing." },
        { name: "defaultValue", type: "string | null", description: "The span selected at first, when uncontrolled." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when selection wants to change. details.cancel() stops it." },
        { name: "expanded", type: "string[]", description: "The expanded spans' values. Bind with bind:expanded to control." },
        { name: "defaultExpanded", type: "string[]", description: "The spans expanded at first, when uncontrolled." },
        { name: "onExpandedChange", type: "(expanded, details) => void", description: "Runs when spans want to expand or collapse. details.cancel() stops it." },
        { name: "onHighlight", type: "(value, details) => void", description: "Runs when the keyboard moves to a row, with its index among visible rows. Scroll it into view here when virtualizing." },
        { name: "format", type: "NumberFormat", description: "Intl.NumberFormat options for a number of ms, or a function of it. Sets how times read on the axis and to screen readers." },
        { name: "locale", type: "string", description: "Locale for times. Defaults to the page lang, else the browser language once interactive." },
        { name: "getBarLabel", type: "(item, details) => string", description: "What screen readers hear for a bar. Defaults to 'Starts at 120 ms, lasts 340 ms'." },
        { name: "controller", type: "WaterfallController", description: "Drive it from anywhere via createWaterfallController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="WaterfallRow"
      rows={[
        { name: "value", type: "string", description: "Required. The value of the span this row shows." },
        { name: "aria-rowindex", type: "number", description: "Its index plus one, when rendering only the rows in view." },
      ]}
    />
    <PropsTable
      caption="WaterfallRowHeader / WaterfallIndicator / WaterfallCell / WaterfallBar"
      rows={[
        { name: "children", type: "Snippet<[WaterfallRowState]>", description: "Content. The header names the span and holds the indicator; the bar is the cell on the time axis." },
        { name: "class", type: "string", description: "Extra classes. Row state arrives as data-selected/data-expanded/data-branch/data-level." },
      ]}
    />
    <PropsTable
      caption="WaterfallHeaderRow / WaterfallColumnHeader"
      rows={[
        { name: "children", type: "Snippet", description: "The header row holds column headers; the last one holds the axis and marks." },
        { name: "aria-label", type: "string", description: "Name the timeline column, e.g. 'Timeline'." },
      ]}
    />
    <PropsTable
      caption="WaterfallAxis / WaterfallTick / WaterfallMark"
      rows={[
        { name: "maxTicks", type: "number", default: "6", description: "Axis only: the most ticks shown. Ticks fall on round times, so it may show fewer." },
        { name: "time", type: "number", description: "Tick and mark: the moment it marks, in milliseconds. Required." },
        { name: "children", type: "Snippet<[WaterfallAxisState]>", description: "Axis only: receives ticks to render your own WaterfallTick elements." },
      ]}
    />
    <PropsTable
      caption="Helpers"
      rows={[
        { name: "visibleWaterfallRows(items, expanded)", type: "(WaterfallData, string[]) => WaterfallDataRow[]", description: "Flattens the open spans in order. Each row has item, parent, level and index." },
        { name: "createWaterfallController()", type: "() => WaterfallController", description: "getValue/setValue, getExpanded/setExpanded, expand/collapse/toggle, expandAll/collapseAll, reveal(value), focus(value?)." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA treegrid pattern. Rows have <code class="font-mono text-accent">role="row"</code> with <code class="font-mono text-accent">aria-level</code>, <code class="font-mono text-accent">aria-posinset</code>, <code class="font-mono text-accent">aria-setsize</code>, <code class="font-mono text-accent">aria-selected</code> on the selected row and <code class="font-mono text-accent">aria-expanded</code> on spans with children.</li>
      <li><code class="font-mono text-accent">WaterfallRowHeader</code> is a <code class="font-mono text-accent">rowheader</code>, so screen readers repeat the span's name as focus moves down a column. Each bar is a <code class="font-mono text-accent">gridcell</code> labelled with its start and duration.</li>
      <li>The axis and its ticks are hidden from screen readers, who hear each bar's own times instead. Times are formatted with <code class="font-mono text-accent">Intl</code> in the page's language.</li>
      <li>One tab stop: <span class="text-fg">Tab</span> enters at the selected row, or the first, and returns to the row or cell focused last.</li>
      <li><span class="text-fg">Down/Up</span> move between rows, keeping the column when in a cell. <span class="text-fg">Right</span> expands a row or moves into its first cell; <span class="text-fg">Left</span> moves back through cells, collapses, then goes to the parent.</li>
      <li><span class="text-fg">Home/End</span> go to the first or last row (or the row's first/last cell); with <span class="text-fg">Ctrl</span> (⌘ on a Mac) to the column's ends. <span class="text-fg">PageUp/PageDown</span> move a page of rows.</li>
      <li><span class="text-fg">Enter/Space</span> select the focused row. Typing focuses the next row whose label starts with that text.</li>
      <li>In right-to-left text, Left and Right swap. When virtualizing, give the root <code class="font-mono text-accent">aria-rowcount</code> and each row <code class="font-mono text-accent">aria-rowindex</code> so the whole trace is counted.</li>
    </ul>
  </Section>
</div>