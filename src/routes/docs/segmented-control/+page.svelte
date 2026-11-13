<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    SegmentedControl,
    SegmentedControlItem,
    SegmentedControlIndicator,
    createSegmentedControlController,
  } from "#lib/components/segmented-control"
  import { Button } from "#lib/components/button"
  import { List, LayoutGrid, SquareKanban } from "@lucide/svelte"

  const range = createSegmentedControlController()

  const installCode = `import {
  SegmentedControl, SegmentedControlItem, SegmentedControlIndicator,
} from "#lib/components/segmented-control"`

  const usageCode = `<script lang="ts">
  import { List, LayoutGrid, SquareKanban } from "@lucide/svelte"
  import {
    SegmentedControl, SegmentedControlItem, SegmentedControlIndicator,
  } from "#lib/components/segmented-control"
<\/script>

<SegmentedControl aria-label="View" defaultValue="list">
  <SegmentedControlIndicator />
  <SegmentedControlItem value="list"><List aria-hidden="true" /> List</SegmentedControlItem>
  <SegmentedControlItem value="grid"><LayoutGrid aria-hidden="true" /> Grid</SegmentedControlItem>
  <SegmentedControlItem value="board"><SquareKanban aria-hidden="true" /> Board</SegmentedControlItem>
</SegmentedControl>`

  const controlledCode = `<script lang="ts">
  import { createSegmentedControlController } from "#lib/components/segmented-control"

  const range = createSegmentedControlController()
  let value = $state<string | null>("week")
  let reason = $state("")
<\/script>

<Button size="sm" tone="outline" onclick={() => range.setValue("month")}>Show Month</Button>
<SegmentedControl
  aria-label="Range"
  bind:value
  controller={range}
  onValueChange={(next, details) => (reason = details.reason)}
>
  <SegmentedControlIndicator />
  <SegmentedControlItem value="day">Day</SegmentedControlItem>
  <SegmentedControlItem value="week">Week</SegmentedControlItem>
  <SegmentedControlItem value="month">Month</SegmentedControlItem>
</SegmentedControl>
<p>{value ?? "none"} · {reason || "no change yet"}</p>`

  const sizesCode = `<SegmentedControl aria-label="Density" size="sm" defaultValue="comfortable">
  <SegmentedControlIndicator />
  <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
  <SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
</SegmentedControl>
<SegmentedControl aria-label="Density" size="md" defaultValue="comfortable">
  <SegmentedControlIndicator />
  <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
  <SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
</SegmentedControl>
<SegmentedControl aria-label="Density" size="lg" defaultValue="comfortable">
  <SegmentedControlIndicator />
  <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
  <SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
</SegmentedControl>`

  const verticalCode = `<SegmentedControl aria-label="Vertical alignment" orientation="vertical" defaultValue="middle">
  <SegmentedControlIndicator />
  <SegmentedControlItem value="top">Top</SegmentedControlItem>
  <SegmentedControlItem value="middle">Middle</SegmentedControlItem>
  <SegmentedControlItem value="bottom">Bottom</SegmentedControlItem>
</SegmentedControl>`

  const disabledCode = `<SegmentedControl aria-label="Theme" defaultValue="system" disabled>
  <SegmentedControlIndicator />
  <SegmentedControlItem value="light">Light</SegmentedControlItem>
  <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
  <SegmentedControlItem value="system">System</SegmentedControlItem>
</SegmentedControl>
<SegmentedControl aria-label="Billing period" defaultValue="monthly">
  <SegmentedControlIndicator />
  <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
  <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
  <SegmentedControlItem value="lifetime" disabled>Lifetime</SegmentedControlItem>
</SegmentedControl>`

  const formCode = `<script lang="ts">
  let saved = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    saved = "theme=" + data.get("theme")
  }
<\/script>

<form onsubmit={onSubmit}>
  <SegmentedControl name="theme" required defaultValue="system" aria-label="Theme">
    <SegmentedControlIndicator />
    <SegmentedControlItem value="light">Light</SegmentedControlItem>
    <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
    <SegmentedControlItem value="system">System</SegmentedControlItem>
  </SegmentedControl>
  <Button size="sm" type="submit">Save</Button>
  <Button size="sm" tone="outline" type="reset">Reset</Button>
</form>
<p>{saved || "nothing saved yet"}</p>`

  let value = $state<string | null>("week")
  let reason = $state("")
  let saved = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    saved = "theme=" + data.get("theme")
  }
</script>

<svelte:head>
  <title>Segmented Control — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Segmented Control"
  description="Pick one of a few options from a row of buttons, with an indicator that slides to the choice. Wraps the ui-sdk SegmentedControl: a radio group with one value, a single tab stop and a hidden native radio per item, so it takes part in forms."
  entry="@ui-sdk/svelte/segmented-control"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/segmented-control</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Give each item a <code class="font-mono text-accent">value</code> and put one
      <code class="font-mono text-accent">SegmentedControlIndicator</code> inside the control, before the
      items. Name the control with <code class="font-mono text-accent">aria-label</code>. Without
      <code class="font-mono text-accent">defaultValue</code> nothing starts checked and Tab enters on
      the first enabled item.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Choose Grid, then use the arrow keys to move between views." code={usageCode}>
      <SegmentedControl aria-label="View" defaultValue="list">
        <SegmentedControlIndicator />
        <SegmentedControlItem value="list"><List aria-hidden="true" /> List</SegmentedControlItem>
        <SegmentedControlItem value="grid"><LayoutGrid aria-hidden="true" /> Grid</SegmentedControlItem>
        <SegmentedControlItem value="board"><SquareKanban aria-hidden="true" /> Board</SegmentedControlItem>
      </SegmentedControl>
    </Demo>

    <Demo title="Controlled" description="bind:value keeps the value in the parent; a controller checks an item from anywhere." code={controlledCode}>
      <div class="flex flex-col items-center gap-3">
        <Button size="sm" tone="outline" onclick={() => range.setValue("month")}>Show Month</Button>
        <SegmentedControl
          aria-label="Range"
          bind:value
          controller={range}
          onValueChange={(next, details) => (reason = details.reason)}
        >
          <SegmentedControlIndicator />
          <SegmentedControlItem value="day">Day</SegmentedControlItem>
          <SegmentedControlItem value="week">Week</SegmentedControlItem>
          <SegmentedControlItem value="month">Month</SegmentedControlItem>
        </SegmentedControl>
        <p class="font-mono text-xs text-muted">{value ?? "none"} · {reason || "no change yet"}</p>
      </div>
    </Demo>

    <Demo title="Sizes" description="size sets the item height, padding and text size; the indicator measures the checked item." code={sizesCode}>
      <div class="flex flex-col items-center gap-3">
        <SegmentedControl aria-label="Density" size="sm" defaultValue="comfortable">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
          <SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl aria-label="Density" size="md" defaultValue="comfortable">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
          <SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl aria-label="Density" size="lg" defaultValue="comfortable">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
          <SegmentedControlItem value="comfortable">Comfortable</SegmentedControlItem>
        </SegmentedControl>
      </div>
    </Demo>

    <Demo title="Vertical" description="orientation='vertical' stacks the items; arrow keys on both axes still move between them." code={verticalCode}>
      <SegmentedControl aria-label="Vertical alignment" orientation="vertical" defaultValue="middle">
        <SegmentedControlIndicator />
        <SegmentedControlItem value="top">Top</SegmentedControlItem>
        <SegmentedControlItem value="middle">Middle</SegmentedControlItem>
        <SegmentedControlItem value="bottom">Bottom</SegmentedControlItem>
      </SegmentedControl>
    </Demo>

    <Demo title="Disabled" description="A disabled control submits nothing. A disabled item is skipped by the arrow keys and cannot be focused." code={disabledCode}>
      <div class="flex flex-col items-center gap-3">
        <SegmentedControl aria-label="Theme" defaultValue="system" disabled>
          <SegmentedControlIndicator />
          <SegmentedControlItem value="light">Light</SegmentedControlItem>
          <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
          <SegmentedControlItem value="system">System</SegmentedControlItem>
        </SegmentedControl>
        <SegmentedControl aria-label="Billing period" defaultValue="monthly">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
          <SegmentedControlItem value="lifetime" disabled>Lifetime</SegmentedControlItem>
        </SegmentedControl>
      </div>
    </Demo>

    <Demo title="In a form" description="Each item renders a hidden native radio. name submits the checked value, required blocks submission until there is a choice, and Reset returns to defaultValue." code={formCode}>
      <form class="flex flex-col items-center gap-3" onsubmit={onSubmit}>
        <SegmentedControl name="theme" required defaultValue="system" aria-label="Theme">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="light">Light</SegmentedControlItem>
          <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
          <SegmentedControlItem value="system">System</SegmentedControlItem>
        </SegmentedControl>
        <div class="flex gap-2">
          <Button size="sm" type="submit">Save</Button>
          <Button size="sm" tone="outline" type="reset">Reset</Button>
        </div>
        <p class="font-mono text-xs text-muted">{saved || "nothing saved yet"}</p>
      </form>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="SegmentedControl size"
      rows={[
        { name: "sm", type: "string", default: "h-7", description: "Compact — dense toolbars and table headers." },
        { name: "md", type: "default", default: "h-8", description: "Default." },
        { name: "lg", type: "string", default: "h-9", description: "Prominent — a primary view switcher." },
      ]}
    />
    <PropsTable
      caption="SegmentedControl orientation"
      rows={[
        { name: "horizontal", type: "default", description: "Items run in a row." },
        { name: "vertical", type: "string", description: "Items stack in a column; the indicator follows down it." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling: <code class="font-mono text-accent">data-checked</code> and
      <code class="font-mono text-accent">data-unchecked</code> on items,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code> and
      <code class="font-mono text-accent">data-required</code> on the control and its items, and
      <code class="font-mono text-accent">data-orientation</code> on the control and the indicator.
      <code class="font-mono text-accent">readOnly</code> keeps items focusable and the value submitted
      while arrow keys move focus without checking anything.
    </p>
    <PropsTable
      caption="Indicator CSS variables (measured from the checked item)"
      rows={[
        { name: "--segmented-control-indicator-left", type: "length", description: "Distance from the control's left edge." },
        { name: "--segmented-control-indicator-top", type: "length", description: "Distance from the control's top edge." },
        { name: "--segmented-control-indicator-width", type: "length", description: "Width of the checked item." },
        { name: "--segmented-control-indicator-height", type: "length", description: "Height of the checked item." },
        { name: "--segmented-control-indicator-right / -bottom", type: "length", description: "Distances from the right and bottom edges, for right-to-left layouts." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="SegmentedControl (root)"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Negentropy prop: item height, padding and text size." },
        { name: "value", type: "string | null", description: "The checked item's value. Bind with bind:value to control; null checks nothing." },
        { name: "defaultValue", type: "string | null", description: "The item checked at first when uncontrolled. A form reset returns to it." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when a user or a form reset wants to change the value. details.cancel() stops it." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables every item: not focusable, not changeable, value not submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Keeps items focusable and the value submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until an item is checked, with the browser's own message." },
        { name: "name", type: "string", description: "The name the value submits under. Without one the control submits nothing." },
        { name: "form", type: "string", description: "The id of a form to belong to when the control isn't inside it." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last item to the first." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which way the items run, for styling and screen readers." },
        { name: "controller", type: "SegmentedControlController", description: "Checks items from anywhere via createSegmentedControlController(). One per mounted control." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="SegmentedControlItem"
      rows={[
        { name: "value", type: "string", description: "What the control's value becomes when this item is checked. Required." },
        { name: "disabled", type: "boolean", default: "false", description: "Skips the item like a disabled native radio: arrow keys pass it, and it can't be focused or checked." },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
        { name: "children", type: "Snippet<[SegmentedControlItemState]>", description: "The label. Receives checked, disabled, readOnly and required." },
      ]}
    />
    <PropsTable
      caption="SegmentedControlIndicator"
      rows={[
        { name: "class", type: "string", description: "Extra classes. The wrapper positions it from the indicator CSS variables and transitions top, left, width and height." },
        { name: "children", type: "Snippet<[SegmentedControlIndicatorState]>", description: "Receives value and orientation. It has no box while nothing is checked." },
      ]}
    />
    <PropsTable
      caption="SegmentedControlController"
      rows={[
        { name: "getValue()", type: "() => string | null", description: "The checked item's value." },
        { name: "setValue(value, details?)", type: "(value, details?) => boolean", description: "Checks an item as a user would. Returns false when canceled; disabled items and read-only controls ignore it." },
        { name: "focus()", type: "() => void", description: "Moves focus to the checked item, or the first one." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA radio group pattern: each item is a button with <code class="font-mono text-accent">role="radio"</code> and <code class="font-mono text-accent">aria-checked</code>, plus a hidden native radio that takes part in forms. The indicator is <code class="font-mono text-accent">role="presentation"</code>, so screen readers skip it.</li>
      <li><span class="text-fg">Tab</span> moves into the control onto the checked item, or the first enabled one, and the next Tab leaves it — one tab stop for the whole group.</li>
      <li><span class="text-fg">Arrow keys</span> on both axes move to the next or previous item and check it, skipping disabled ones and wrapping unless <code class="font-mono text-accent">loop={false}</code>.</li>
      <li><span class="text-fg">Space</span> checks the focused item; <span class="text-fg">Enter</span> submits its form.</li>
      <li>Name the control with <code class="font-mono text-accent">aria-label</code>, or put it in a field whose label names it. Each item's text is its accessible name.</li>
      <li>A disabled control or a disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> around it disables every item, and nothing submits.</li>
    </ul>
  </Section>
</div>