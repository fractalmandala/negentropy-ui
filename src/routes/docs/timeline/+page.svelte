<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Timeline,
    TimelineItem,
    TimelineMarker,
    TimelineConnector,
    TimelineTitle,
    TimelineTime,
    TimelineDescription,
    createTimelineController,
    type TimelineStatus,
  } from "$lib/components/timeline"
  import { Button } from "$lib/components/button"
  import { Check } from "@lucide/svelte"

  const installCode = `import {
  Timeline, TimelineItem, TimelineMarker, TimelineConnector,
  TimelineTitle, TimelineTime, TimelineDescription,
} from "$lib/components/timeline"`

  const usageCode = `<script lang="ts">
  import {
    Timeline, TimelineItem, TimelineMarker, TimelineConnector,
    TimelineTitle, TimelineTime, TimelineDescription,
  } from "$lib/components/timeline"
<\/script>

<Timeline aria-label="Activity">
  <TimelineItem>
    <TimelineMarker />
    <TimelineConnector />
    <TimelineTitle>Deployed to production</TimelineTitle>
    <TimelineTime datetime="2026-11-10T14:32">2:32 PM</TimelineTime>
    <TimelineDescription>Version 2.4.1 is live.</TimelineDescription>
  </TimelineItem>
</Timeline>`

  const events = [
    {
      title: "Deployed to production",
      dateTime: "2026-11-10T14:32",
      time: "Today, 2:32 PM",
      description: "Version 2.4.1 is live in every region.",
    },
    {
      title: "Checks passed",
      dateTime: "2026-11-10T14:20",
      time: "Today, 2:20 PM",
      description: "312 tests and the bundle size budget.",
    },
    {
      title: "Pull request merged",
      dateTime: "2026-11-10T13:58",
      time: "Today, 1:58 PM",
      description: "Ada merged Cache search results into main.",
    },
    {
      title: "Review requested",
      dateTime: "2026-11-09T17:05",
      time: "Yesterday, 5:05 PM",
      description: "Grace and Linus were asked to review.",
    },
  ]

  const basicCode = `<Timeline aria-label="Activity">
  {#each events as event (event.title)}
    <TimelineItem>
      <TimelineMarker />
      <TimelineConnector />
      <TimelineTitle>{event.title}</TimelineTitle>
      <TimelineTime datetime={event.dateTime}>{event.time}</TimelineTime>
      <TimelineDescription>{event.description}</TimelineDescription>
    </TimelineItem>
  {/each}
</Timeline>`

  const steps: {
    value: string
    title: string
    dateTime: string
    time: string
    description: string
    status: TimelineStatus
  }[] = [
    {
      value: "placed",
      title: "Order placed",
      dateTime: "2026-11-01",
      time: "Nov 1",
      description: "We received your order.",
      status: "complete",
    },
    {
      value: "packed",
      title: "Packed",
      dateTime: "2026-11-02",
      time: "Nov 2",
      description: "Your items left the shelf.",
      status: "complete",
    },
    {
      value: "shipped",
      title: "Shipped, in progress",
      dateTime: "2026-11-03",
      time: "Nov 3",
      description: "On its way with the carrier.",
      status: "current",
    },
    {
      value: "delivered",
      title: "Delivered",
      dateTime: "2026-11-05",
      time: "Nov 5",
      description: "Expected by Thursday.",
      status: "upcoming",
    },
  ]

  const controller = createTimelineController()

  const statusCode = `<script lang="ts">
  import { Check } from "@lucide/svelte"
  import { createTimelineController, type TimelineStatus } from "$lib/components/timeline"

  const controller = createTimelineController()
  const steps: { value: string; title: string; status: TimelineStatus }[] = [
    { value: "placed", title: "Order placed", status: "complete" },
    { value: "shipped", title: "Shipped, in progress", status: "current" },
    { value: "delivered", title: "Delivered", status: "upcoming" },
  ]
<\/script>

<Button size="sm" tone="outline" onclick={() => controller.focus("shipped")}>
  Go to current step
</Button>
<Timeline aria-label="Order status" {controller}>
  {#each steps as step (step.value)}
    <TimelineItem value={step.value} status={step.status}>
      <TimelineMarker>
        {#if step.status === "complete"}<Check aria-hidden="true" />{/if}
      </TimelineMarker>
      <TimelineConnector />
      <TimelineTitle>{step.title}</TimelineTitle>
    </TimelineItem>
  {/each}
</Timeline>`

  const milestones = [
    { title: "Kickoff", dateTime: "2026-01", time: "January" },
    { title: "Design review", dateTime: "2026-03", time: "March" },
    { title: "Beta", dateTime: "2026-06", time: "June" },
    { title: "Launch", dateTime: "2026-09", time: "September" },
  ]

  const horizontalCode = `<Timeline orientation="horizontal" loop={false} aria-label="Roadmap">
  {#each milestones as milestone (milestone.title)}
    <TimelineItem>
      <TimelineMarker />
      <TimelineConnector />
      <TimelineTitle>{milestone.title}</TimelineTitle>
      <TimelineTime datetime={milestone.dateTime}>{milestone.time}</TimelineTime>
    </TimelineItem>
  {/each}
</Timeline>`

  const updates = [
    { id: 1, author: "Ada", date: "2026-11-10", time: "Nov 10", text: "Shipped the new onboarding flow." },
    { id: 2, author: "Grace", date: "2026-11-10", time: "Nov 10", text: "Fixed the flaky upload test." },
    { id: 3, author: "Linus", date: "2026-11-09", time: "Nov 9", text: "Moved the docs to the new theme." },
    { id: 4, author: "Margaret", date: "2026-11-09", time: "Nov 9", text: "Wrote the launch checklist." },
    { id: 5, author: "Ada", date: "2026-11-08", time: "Nov 8", text: "Cut search latency in half." },
    { id: 6, author: "Grace", date: "2026-11-07", time: "Nov 7", text: "Added keyboard shortcuts to the editor." },
  ]

  const feedCode = `<script lang="ts">
  let count = $state(3)
  let busy = $state(false)

  function loadMore() {
    busy = true
    setTimeout(() => {
      count += 3
      busy = false
    }, 600)
  }
<\/script>

<Button size="sm" tone="outline" disabled={busy || count >= updates.length} onclick={loadMore}>
  {busy ? "Loading…" : "Load more"}
</Button>
<Timeline feed {busy} aria-label="Team updates">
  {#each updates.slice(0, count) as update (update.id)}
    <TimelineItem>
      <TimelineMarker />
      <TimelineConnector />
      <TimelineTitle>{update.author}</TimelineTitle>
      <TimelineTime datetime={update.date}>{update.time}</TimelineTime>
      <TimelineDescription>{update.text}</TimelineDescription>
    </TimelineItem>
  {/each}
</Timeline>`

  const headingCode = `<Timeline aria-label="Changelog">
  <TimelineItem>
    <TimelineMarker />
    <TimelineConnector />
    <TimelineTitle>
      {#snippet render({ props })}
        <h3 {...props}>Version 2.4</h3>
      {/snippet}
    </TimelineTitle>
    <TimelineTime datetime="2026-10-28">October 28</TimelineTime>
    <TimelineDescription>Faster search and resumable uploads.</TimelineDescription>
  </TimelineItem>
</Timeline>`

  let count = $state(3)
  let busy = $state(false)

  function loadMore() {
    busy = true
    setTimeout(() => {
      count += 3
      busy = false
    }, 600)
  }
</script>

<svelte:head>
  <title>Timeline — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Timeline"
  description="Dated events in order, like an activity feed, a changelog or an order's progress. Wraps the ui-sdk Timeline: a named list for screen readers with one tab stop and arrow keys between events."
  entry="@ui-sdk/svelte/timeline"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/timeline</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Every part inside an item is optional. <code class="font-mono text-accent">TimelineMarker</code>
      is the dot or icon on the line and <code class="font-mono text-accent">TimelineConnector</code>
      the line to the next event; both are hidden from screen readers. Pass
      <code class="font-mono text-accent">datetime</code> to
      <code class="font-mono text-accent">TimelineTime</code> so the date is machine readable while the
      text stays friendly, and give the root an <code class="font-mono text-accent">aria-label</code>.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Activity"
      description="Tab into the list, then use Up and Down to move between events. Home and End jump to the first and last."
      code={basicCode}
    >
      <div class="w-full max-w-sm">
        <Timeline aria-label="Activity">
          {#each events as event (event.title)}
            <TimelineItem>
              <TimelineMarker />
              <TimelineConnector />
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineTime datetime={event.dateTime}>{event.time}</TimelineTime>
              <TimelineDescription>{event.description}</TimelineDescription>
            </TimelineItem>
          {/each}
        </Timeline>
      </div>
    </Demo>

    <Demo
      title="Status"
      description="complete, current and upcoming style every part of an event. Tab lands on the current step first; the button focuses it from outside through a controller."
      code={statusCode}
    >
      <div class="w-full max-w-sm space-y-3">
        <Button size="sm" tone="outline" onclick={() => controller.focus("shipped")}>
          Go to current step
        </Button>
        <Timeline aria-label="Order status" {controller}>
          {#each steps as step (step.value)}
            <TimelineItem value={step.value} status={step.status}>
              <TimelineMarker>
                {#if step.status === "complete"}<Check aria-hidden="true" />{/if}
              </TimelineMarker>
              <TimelineConnector />
              <TimelineTitle>{step.title}</TimelineTitle>
              <TimelineTime datetime={step.dateTime}>{step.time}</TimelineTime>
              <TimelineDescription>{step.description}</TimelineDescription>
            </TimelineItem>
          {/each}
        </Timeline>
      </div>
    </Demo>

    <Demo
      title="Horizontal"
      description="orientation='horizontal' lays the events out as a row and swaps in Left and Right. loop={false} stops at either end."
      code={horizontalCode}
    >
      <div class="w-full overflow-x-auto">
        <Timeline orientation="horizontal" loop={false} aria-label="Roadmap">
          {#each milestones as milestone (milestone.title)}
            <TimelineItem>
              <TimelineMarker />
              <TimelineConnector />
              <TimelineTitle>{milestone.title}</TimelineTitle>
              <TimelineTime datetime={milestone.dateTime}>{milestone.time}</TimelineTime>
            </TimelineItem>
          {/each}
        </Timeline>
      </div>
    </Demo>

    <Demo
      title="Feed"
      description="feed turns the list into a WAI-ARIA feed of articles, so Page Down and Page Up move between them from anywhere inside one. busy sets aria-busy while more load."
      code={feedCode}
    >
      <div class="w-full max-w-sm space-y-3">
        <Button
          size="sm"
          tone="outline"
          disabled={busy || count >= updates.length}
          onclick={loadMore}
        >
          {busy ? "Loading…" : "Load more"}
        </Button>
        <Timeline feed {busy} aria-label="Team updates">
          {#each updates.slice(0, count) as update (update.id)}
            <TimelineItem>
              <TimelineMarker />
              <TimelineConnector />
              <TimelineTitle>{update.author}</TimelineTitle>
              <TimelineTime datetime={update.date}>{update.time}</TimelineTime>
              <TimelineDescription>{update.text}</TimelineDescription>
            </TimelineItem>
          {/each}
        </Timeline>
      </div>
    </Demo>

    <Demo
      title="Title as a heading"
      description="The render snippet swaps the title for an h3, so people can also move between events by heading. Spread props onto the element."
      code={headingCode}
    >
      <div class="w-full max-w-sm">
        <Timeline aria-label="Changelog">
          <TimelineItem>
            <TimelineMarker />
            <TimelineConnector />
            <TimelineTitle>
              {#snippet render({ props })}
                <h3 {...props}>Version 2.4</h3>
              {/snippet}
            </TimelineTitle>
            <TimelineTime datetime="2026-10-28">October 28</TimelineTime>
            <TimelineDescription>Faster search and resumable uploads.</TimelineDescription>
          </TimelineItem>
          <TimelineItem>
            <TimelineMarker />
            <TimelineConnector />
            <TimelineTitle>
              {#snippet render({ props })}
                <h3 {...props}>Version 2.3</h3>
              {/snippet}
            </TimelineTitle>
            <TimelineTime datetime="2026-09-30">September 30</TimelineTime>
            <TimelineDescription>Shared links and a new sidebar.</TimelineDescription>
          </TimelineItem>
        </Timeline>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Timeline has no tone or size props. Its variants are orientation, looping and the
      list/feed role; an item's <code class="font-mono text-accent">status</code> drives the marker and
      connector.
    </p>
    <PropsTable
      caption="orientation"
      rows={[
        { name: "vertical", type: "default", description: "Events stack in a column; Up/Down move between them." },
        { name: "horizontal", type: "string", description: "Events run in a row; Left/Right move between them and swap in right-to-left text." },
      ]}
    />
    <PropsTable
      caption="TimelineItem status"
      rows={[
        { name: "complete", type: "string", description: "Filled accent marker and connector — the event is done." },
        { name: "current", type: "string", description: "Accent marker with a soft halo; sets aria-current='step' and takes the tab stop first." },
        { name: "upcoming", type: "string", description: "Dashed marker — the event has not happened yet." },
        { name: "undefined", type: "default", description: "No status: a plain outlined marker, for a feed or changelog." },
      ]}
    />
    <PropsTable
      caption="list vs feed"
      rows={[
        { name: "feed={false}", type: "default", description: "A list of listitems. Page Down does nothing." },
        { name: "feed", type: "boolean", description: "A feed of articles with aria-posinset/aria-setsize; Page Down and Page Up move between them." },
        { name: "loop={false}", type: "boolean", description: "Arrow keys stop at either end instead of wrapping." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling: <code class="font-mono text-accent">data-orientation</code>,
      <code class="font-mono text-accent">data-complete</code>,
      <code class="font-mono text-accent">data-current</code>,
      <code class="font-mono text-accent">data-upcoming</code>,
      <code class="font-mono text-accent">data-first</code>,
      <code class="font-mono text-accent">data-last</code>,
      <code class="font-mono text-accent">data-busy</code>. The root writes
      <code class="font-mono text-accent">--timeline-count</code> and each item
      <code class="font-mono text-accent">--timeline-index</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Every part forwards all HTML attributes plus the ui-sdk
      <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive that part's state.
    </p>
    <PropsTable
      caption="Timeline (root)"
      rows={[
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"vertical"', description: "Which arrow keys move between events." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last event to the first." },
        { name: "feed", type: "boolean", default: "false", description: "Render a feed of articles instead of a list; enables Page Down/Page Up." },
        { name: "busy", type: "boolean", default: "false", description: "Sets aria-busy while a feed loads or changes events. Only a feed reads it." },
        { name: "controller", type: "TimelineController", description: "Focus an event from anywhere via createTimelineController()." },
        { name: "aria-label", type: "string", description: "Accessible name for the list or feed." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
        { name: "class", type: "string", description: "Extra classes merged onto the element (user wins)." },
      ]}
    />
    <PropsTable
      caption="TimelineItem"
      rows={[
        { name: "value", type: "string", description: "Names the event for controller.focus(). Generated when left out." },
        { name: "status", type: '"complete" | "current" | "upcoming"', description: "Where the event stands. 'current' sets aria-current='step' and takes the tab stop first." },
        { name: "class", type: "string", description: "Extra classes merged onto the item." },
      ]}
    />
    <PropsTable
      caption="TimelineMarker / TimelineConnector"
      rows={[
        { name: "children", type: "Snippet<[state]>", description: "Marker content, typically an icon. Both parts are aria-hidden." },
        { name: "class", type: "string", description: "Extra classes. Status arrives as data-complete/data-current/data-upcoming." },
      ]}
    />
    <PropsTable
      caption="TimelineTitle / TimelineTime / TimelineDescription"
      rows={[
        { name: "datetime", type: "string", description: "TimelineTime only: the machine-readable date on the <time> element." },
        { name: "children", type: "Snippet<[state]>", description: "The text. The title names the event; time and description describe it." },
        { name: "render", type: "Snippet", description: "Swap the element, e.g. render the title as an h3. Spread props onto it." },
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
      ]}
    />
    <PropsTable
      caption="createTimelineController()"
      rows={[
        { name: "focus(value?)", type: "(value?: string) => void", description: "Moves focus to an event by its value, or to the event holding the tab stop." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>A timeline is a <code class="font-mono text-accent">list</code> of <code class="font-mono text-accent">listitem</code>s named with <code class="font-mono text-accent">aria-label</code>. Each event is named by its title through <code class="font-mono text-accent">aria-labelledby</code> and described by its time and description through <code class="font-mono text-accent">aria-describedby</code>.</li>
      <li>With <code class="font-mono text-accent">feed</code> it follows the WAI-ARIA feed pattern: a <code class="font-mono text-accent">feed</code> of <code class="font-mono text-accent">article</code>s with <code class="font-mono text-accent">aria-posinset</code> and <code class="font-mono text-accent">aria-setsize</code>, and <code class="font-mono text-accent">aria-busy</code> while loading.</li>
      <li>The events share one tab stop (roving focus). <span class="text-fg">Tab</span> enters on the current event, else the first, and returns to the event focused last.</li>
      <li><span class="text-fg">ArrowDown/ArrowUp</span> move between events vertically; <span class="text-fg">ArrowRight/ArrowLeft</span> horizontally, swapping in right-to-left text. <span class="text-fg">Home/End</span> jump to the first or last.</li>
      <li>In a feed, <span class="text-fg">PageDown/PageUp</span> move to the next or previous article from anywhere inside one.</li>
      <li>Arrow keys move only from an event itself, so links and buttons inside keep them; <span class="text-fg">Tab</span> moves from the event to those controls.</li>
      <li>The current event carries <code class="font-mono text-accent">aria-current="step"</code>. Markers and connectors are hidden from assistive technology, so say the status in the title or description too when it matters.</li>
    </ul>
  </Section>
</div>