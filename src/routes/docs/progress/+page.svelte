<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Progress,
    ProgressLabel,
    ProgressValue,
    ProgressTrack,
    ProgressIndicator,
    type GaugeLabelDetails,
  } from "$lib/components/progress"
  import { Button } from "$lib/components/button"

  const installCode = `import {
  Progress,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressIndicator,
} from "$lib/components/progress"`

  const usageCode = `<script lang="ts">
  import {
    Progress,
    ProgressLabel,
    ProgressValue,
    ProgressTrack,
    ProgressIndicator,
  } from "$lib/components/progress"
<\/script>

<Progress value={60}>
  <ProgressLabel>Exporting video</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`

  const steppingCode = `<script lang="ts">
  import { Button } from "$lib/components/button"

  const total = 5
  let uploaded = $state(1)
<\/script>

<div class="flex gap-2">
  <Button size="sm" onclick={() => uploaded < total && uploaded++}>Upload next</Button>
  <Button size="sm" tone="outline" onclick={() => (uploaded = 0)}>Reset</Button>
</div>

<Progress value={(uploaded / total) * 100}>
  <ProgressLabel>Uploading photos</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`

  const indeterminateCode = `<Progress value={null}>
  <ProgressLabel>Connecting to server</ProgressLabel>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`

  const sizesCode = `<Progress value={35}>
  <ProgressLabel>Thin</ProgressLabel>
  <ProgressValue />
  <ProgressTrack size="sm"><ProgressIndicator /></ProgressTrack>
</Progress>

<Progress value={55}>
  <ProgressLabel>Default</ProgressLabel>
  <ProgressValue />
  <ProgressTrack><ProgressIndicator /></ProgressTrack>
</Progress>

<Progress value={80}>
  <ProgressLabel>Chunky, finished soon</ProgressLabel>
  <ProgressValue />
  <ProgressTrack size="lg" tone="success"><ProgressIndicator /></ProgressTrack>
</Progress>`

  const tonesCode = `<Progress value={92}>
  <ProgressLabel>Build</ProgressLabel>
  <ProgressValue />
  <ProgressTrack tone="success"><ProgressIndicator /></ProgressTrack>
</Progress>

<Progress value={48}>
  <ProgressLabel>Disk almost full</ProgressLabel>
  <ProgressValue />
  <ProgressTrack tone="warning"><ProgressIndicator /></ProgressTrack>
</Progress>

<Progress value={18}>
  <ProgressLabel>Retry budget</ProgressLabel>
  <ProgressValue />
  <ProgressTrack tone="danger"><ProgressIndicator /></ProgressTrack>
</Progress>`

  const boundsCode = `<Progress value={3} min={1} max={5}>
  <ProgressLabel>Account setup, step 3 of 5</ProgressLabel>
  <ProgressValue />
  <ProgressTrack><ProgressIndicator /></ProgressTrack>
</Progress>`

  const formatCode = `<Progress value={120} max={250} format={{ style: "unit", unit: "gigabyte" }}>
  <ProgressLabel>Download</ProgressLabel>
  <ProgressValue />
  <ProgressTrack><ProgressIndicator /></ProgressTrack>
</Progress>

<Progress value={45} max={60} format={(minutes) => \`\${60 - minutes} min left\`}>
  <ProgressLabel>Backup</ProgressLabel>
  <ProgressValue />
  <ProgressTrack><ProgressIndicator /></ProgressTrack>
</Progress>

<Progress value={40} locale="de-DE">
  <ProgressLabel>Synchronisierung</ProgressLabel>
  <ProgressValue />
  <ProgressTrack><ProgressIndicator /></ProgressTrack>
</Progress>`

  const valueLabelCode = `<script lang="ts">
  import type { GaugeLabelDetails } from "$lib/components/progress"

  const valueLabel = (value: number | null, details: GaugeLabelDetails) =>
    \`\${value} of \${details.max} files, \${details.formatted}\`
<\/script>

<Progress value={3} max={12} getValueLabel={valueLabel}>
  <ProgressLabel>Copying files</ProgressLabel>
  <ProgressValue>3 of 12</ProgressValue>
  <ProgressTrack><ProgressIndicator /></ProgressTrack>
</Progress>`

  let uploaded = $state(1)
  const total = 5

  const valueLabel = (value: number | null, details: GaugeLabelDetails) =>
    `${value} of ${details.max} files, ${details.formatted}`
</script>

<svelte:head>
  <title>Progress — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Progress"
  description="Show how far a task has come, or that it is under way when the amount is unknown. Wraps the ui-sdk Progress with a labelled, formatted reading and a track you can size and colour."
  entry="@ui-sdk/svelte/progress"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/progress</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The root holds the value and the range. <code class="font-mono text-accent">ProgressLabel</code>
      names the bar, <code class="font-mono text-accent">ProgressValue</code> prints the formatted
      reading, and <code class="font-mono text-accent">ProgressIndicator</code> fills
      <code class="font-mono text-accent">ProgressTrack</code>. Leave out
      <code class="font-mono text-accent">value</code> for an indeterminate task.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Progress only displays your state: it has no <code class="font-mono text-accent">onValueChange</code>
      and <code class="font-mono text-accent">value</code> is not bindable. Pass the latest number as
      your task advances. For a reading such as storage used rather than a task that finishes, use Meter.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="A label, a formatted value and a track filled to 60%." code={usageCode}>
      <div class="w-full max-w-sm">
        <Progress value={60}>
          <ProgressLabel>Exporting video</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    </Demo>

    <Demo title="Advancing a task" description="Pass a new value as the work completes. The bar reaches data-complete at 100%." code={steppingCode}>
      <div class="w-full max-w-sm space-y-3">
        <div class="flex gap-2">
          <Button size="sm" onclick={() => uploaded < total && uploaded++}>Upload next</Button>
          <Button size="sm" tone="outline" onclick={() => (uploaded = 0)}>Reset</Button>
        </div>
        <Progress value={(uploaded / total) * 100}>
          <ProgressLabel>Uploading photos</ProgressLabel>
          <ProgressValue />
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    </Demo>

    <Demo title="Indeterminate" description="value={null} pulses a short fill; with reduced motion it becomes a still, full-width bar." code={indeterminateCode}>
      <div class="w-full max-w-sm">
        <Progress value={null}>
          <ProgressLabel>Connecting to server</ProgressLabel>
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    </Demo>

    <Demo title="Sizes" description="size on the track sets the rail height: sm, md (default) and lg." code={sizesCode}>
      <div class="w-full max-w-sm space-y-4">
        <Progress value={35}>
          <ProgressLabel>Thin</ProgressLabel>
          <ProgressValue />
          <ProgressTrack size="sm"><ProgressIndicator /></ProgressTrack>
        </Progress>
        <Progress value={55}>
          <ProgressLabel>Default</ProgressLabel>
          <ProgressValue />
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
        <Progress value={80}>
          <ProgressLabel>Chunky</ProgressLabel>
          <ProgressValue />
          <ProgressTrack size="lg"><ProgressIndicator /></ProgressTrack>
        </Progress>
      </div>
    </Demo>

    <Demo title="Tones" description="tone on the track recolours the indicator through the group/progress scope." code={tonesCode}>
      <div class="w-full max-w-sm space-y-4">
        <Progress value={92}>
          <ProgressLabel>Build</ProgressLabel>
          <ProgressValue />
          <ProgressTrack tone="success"><ProgressIndicator /></ProgressTrack>
        </Progress>
        <Progress value={48}>
          <ProgressLabel>Disk almost full</ProgressLabel>
          <ProgressValue />
          <ProgressTrack tone="warning"><ProgressIndicator /></ProgressTrack>
        </Progress>
        <Progress value={18}>
          <ProgressLabel>Retry budget</ProgressLabel>
          <ProgressValue />
          <ProgressTrack tone="danger"><ProgressIndicator /></ProgressTrack>
        </Progress>
      </div>
    </Demo>

    <Demo title="Bounds" description="min and max default to 0 and 100. Step 3 between 1 and 5 fills half the track." code={boundsCode}>
      <div class="w-full max-w-sm">
        <Progress value={3} min={1} max={5}>
          <ProgressLabel>Account setup, step 3 of 5</ProgressLabel>
          <ProgressValue />
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
      </div>
    </Demo>

    <Demo title="Format and locale" description="Intl.NumberFormat options, a function of the value, or a locale for digits and separators." code={formatCode}>
      <div class="w-full max-w-sm space-y-4">
        <Progress value={120} max={250} format={{ style: "unit", unit: "gigabyte" }}>
          <ProgressLabel>Download</ProgressLabel>
          <ProgressValue />
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
        <Progress value={45} max={60} format={(minutes) => `${60 - minutes} min left`}>
          <ProgressLabel>Backup</ProgressLabel>
          <ProgressValue />
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
        <Progress value={40} locale="de-DE">
          <ProgressLabel>Synchronisierung</ProgressLabel>
          <ProgressValue />
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
      </div>
    </Demo>

    <Demo title="Richer announcement" description="getValueLabel tells screen readers more than the compact visible reading." code={valueLabelCode}>
      <div class="w-full max-w-sm">
        <Progress value={3} max={12} getValueLabel={valueLabel}>
          <ProgressLabel>Copying files</ProgressLabel>
          <ProgressValue>3 of 12</ProgressValue>
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="ProgressTrack size"
      rows={[
        { name: "sm", type: "string", description: "A 10px rail with 1px padding, for dense lists and table cells." },
        { name: "md", type: "default", description: "A 14px rail with 2px padding. The everyday bar." },
        { name: "lg", type: "string", description: "A 20px rail with 3px padding, for a hero upload or onboarding step." },
      ]}
    />
    <PropsTable
      caption="ProgressTrack tone"
      rows={[
        { name: "accent", type: "default", description: "The brand accent fill." },
        { name: "success", type: "string", description: "A positive fill, for work that is going well or nearly done." },
        { name: "warning", type: "string", description: "A caution fill, for a budget or quota running low." },
        { name: "danger", type: "string", description: "A destructive fill, for retries or a failing task." },
      ]}
    />
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">tone</code> is published on the track as
      <code class="font-mono text-accent">data-tone</code> inside a
      <code class="font-mono text-accent">group/progress</code> scope, so the indicator picks it up with
      <code class="font-mono text-accent">group-data-[tone=success]/progress:bg-success</code>.
    </p>
    <p class="text-sm text-muted">
      State attributes for styling, present on every part:
      <code class="font-mono text-accent">data-indeterminate</code> while the value is null,
      <code class="font-mono text-accent">data-progressing</code> while it is below
      <code class="font-mono text-accent">max</code>, and
      <code class="font-mono text-accent">data-complete</code> once it reaches the end. The root also
      exposes <code class="font-mono text-accent">--progress-value</code>, the value's position between
      the bounds as a percentage, unset while indeterminate.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Progress (root)"
      rows={[
        { name: "value", type: "number | null", default: "null", description: "How far the task has come, between min and max. Null makes the bar indeterminate. Not bindable." },
        { name: "min", type: "number", default: "0", description: "The lowest value." },
        { name: "max", type: "number", default: "100", description: "The highest value." },
        { name: "format", type: "NumberFormat", default: '{ style: "percent" }', description: "Intl.NumberFormat options, or a function of the value. A percent style reports the position between min and max; any other style reports the value itself." },
        { name: "locale", type: "string", description: "Locale for digits and separators. Defaults to the page lang, then the browser language, once interactive; server markup uses English." },
        { name: "getValueLabel", type: "(value, details) => string", description: "Text screen readers announce instead of the formatted value. details carries formatted, percent, min and max." },
        { name: "aria-label", type: "string", description: "Names the bar when there is no visible ProgressLabel." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development builds." },
      ]}
    />
    <PropsTable
      caption="ProgressTrack"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and inner padding of the rail." },
        { name: "tone", type: '"accent" | "success" | "warning" | "danger"', default: '"accent"', description: "Colour handed to the indicator through group/progress." },
        { name: "class", type: "string", description: "Merged with the wrapper classes through cn()." },
      ]}
    />
    <PropsTable
      caption="ProgressIndicator"
      rows={[
        { name: "class", type: "string", description: "Merged with the wrapper classes. The primitive sets an inline width percentage; there is no inline width while indeterminate." },
        { name: "children", type: "Snippet<[ProgressState]>", description: "Replaces the fill with your own content, still receiving the state." },
      ]}
    />
    <PropsTable
      caption="ProgressLabel"
      rows={[
        { name: "children", type: "Snippet<[ProgressState]>", description: "The visible name. It also names the progressbar for screen readers." },
      ]}
    />
    <PropsTable
      caption="ProgressValue"
      rows={[
        { name: "children", type: "Snippet<[ProgressValueState]>", description: "Replaces the formatted reading. Without children it renders state.text, like 40%. Hidden from screen readers, which already hear the value." },
      ]}
    />
    <PropsTable
      caption="State"
      rows={[
        { name: "value", type: "number | null", description: "The value as you passed it, or null while indeterminate. Out-of-range values are kept here but clamped for the fill and aria-valuenow." },
        { name: "percent", type: "number | null", description: "Position between min and max, 0 to 100, clamped. Null while indeterminate." },
        { name: "status", type: '"indeterminate" | "progressing" | "complete"', description: "Whether the amount is unknown, under way, or done." },
        { name: "text", type: "string", description: "ProgressValue only. The formatted reading, empty while indeterminate." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>The root is a <code class="font-mono text-accent">role="progressbar"</code> exposing <code class="font-mono text-accent">aria-valuemin</code>, <code class="font-mono text-accent">aria-valuemax</code>, <code class="font-mono text-accent">aria-valuenow</code> and <code class="font-mono text-accent">aria-valuetext</code>.</li>
      <li>Name it with <code class="font-mono text-accent">ProgressLabel</code>, or with <code class="font-mono text-accent">aria-label</code> on the root when the name should not be visible. An unnamed bar is announced only as "progress bar".</li>
      <li>An indeterminate bar has no <code class="font-mono text-accent">aria-valuenow</code>, so it is announced as busy rather than as a percentage.</li>
      <li>The visible <code class="font-mono text-accent">ProgressValue</code> is hidden from screen readers to avoid reading the value twice. Use <code class="font-mono text-accent">getValueLabel</code> when the number needs context, such as "3 of 12 files".</li>
      <li>Values outside the range are clamped for the fill, the percentage and <code class="font-mono text-accent">aria-valuenow</code>, so a value above the maximum reads as the maximum.</li>
      <li>The indeterminate fill animates; under <code class="font-mono text-accent">prefers-reduced-motion</code> the animation is dropped and the bar becomes a still, full-width, dimmed fill.</li>
      <li>Set <code class="font-mono text-accent">dir="rtl"</code> on surrounding content to fill the track from the right.</li>
      <li>Progress is not interactive and takes no focus. Keep the control that advances the task — a button, a form, a file input — separately focusable and labelled.</li>
    </ul>
  </Section>
</div>