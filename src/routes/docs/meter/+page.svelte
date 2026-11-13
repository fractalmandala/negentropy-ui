<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "#lib/components/meter"

  const installCode = `import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "#lib/components/meter"`

  const usageCode = `<script lang="ts">
  import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "#lib/components/meter"
<\/script>

<Meter value={68}>
  <MeterLabel>Storage used</MeterLabel>
  <MeterValue />
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>`

  const boundsCode = `<script lang="ts">
  import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "#lib/components/meter"
<\/script>

<Meter value={720} min={300} max={850} format={{ style: "decimal" }}>
  <MeterLabel>Credit score</MeterLabel>
  <MeterValue />
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>`

  const tonesCode = `<script lang="ts">
  import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "#lib/components/meter"
<\/script>

<div class="space-y-4">
  <Meter value={35}>
    <MeterLabel>CPU</MeterLabel>
    <MeterValue />
    <MeterTrack><MeterIndicator tone="accent" /></MeterTrack>
  </Meter>
  <Meter value={52}>
    <MeterLabel>Memory</MeterLabel>
    <MeterValue />
    <MeterTrack><MeterIndicator tone="success" /></MeterTrack>
  </Meter>
  <Meter value={78}>
    <MeterLabel>Disk</MeterLabel>
    <MeterValue />
    <MeterTrack><MeterIndicator tone="warning" /></MeterTrack>
  </Meter>
  <Meter value={94}>
    <MeterLabel>Quota</MeterLabel>
    <MeterValue />
    <MeterTrack><MeterIndicator tone="danger" /></MeterTrack>
  </Meter>
</div>`

  const valueLabelCode = `<script lang="ts">
  import { Meter, MeterLabel, MeterValue, MeterTrack, MeterIndicator } from "#lib/components/meter"
<\/script>

<Meter
  value={750}
  max={1000}
  getValueLabel={(value, details) =>
    \`\${value} of \${details.max} requests, \${details.formatted}\`}
>
  <MeterLabel>API requests</MeterLabel>
  <MeterValue>
    {#snippet children(state)}{state.text} used{/snippet}
  </MeterValue>
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>`
</script>

<svelte:head>
  <title>Meter — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Meter"
  description="Show a measurement within a known range, such as storage used or an account quota. Wraps the ui-sdk Meter with a semantic meter role and a formatted value."
  entry="@ui-sdk/svelte/meter"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/meter</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Pass the reading as <code class="font-mono text-accent">value</code> (required). The label names
      the meter, the value part shows the formatted reading, and the indicator sets its own width as
      an inline percentage of the track. The visible value is hidden from screen readers, since the
      meter role already announces it.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="A reading of 68 on the default 0–100 scale." code={usageCode}>
      <div class="w-full max-w-sm">
        <Meter value={68}>
          <MeterLabel>Storage used</MeterLabel>
          <MeterValue />
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      </div>
    </Demo>

    <Demo title="Bounds" description="min and max set the range; the fill shows the position while the value stays as given." code={boundsCode}>
      <div class="w-full max-w-sm">
        <Meter value={720} min={300} max={850} format={{ style: "decimal" }}>
          <MeterLabel>Credit score</MeterLabel>
          <MeterValue />
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      </div>
    </Demo>

    <Demo title="Tones" description="tone on MeterIndicator picks the fill color from the semantic palette." code={tonesCode}>
      <div class="w-full max-w-sm space-y-4">
        <Meter value={35}>
          <MeterLabel>CPU</MeterLabel>
          <MeterValue />
          <MeterTrack><MeterIndicator tone="accent" /></MeterTrack>
        </Meter>
        <Meter value={52}>
          <MeterLabel>Memory</MeterLabel>
          <MeterValue />
          <MeterTrack><MeterIndicator tone="success" /></MeterTrack>
        </Meter>
        <Meter value={78}>
          <MeterLabel>Disk</MeterLabel>
          <MeterValue />
          <MeterTrack><MeterIndicator tone="warning" /></MeterTrack>
        </Meter>
        <Meter value={94}>
          <MeterLabel>Quota</MeterLabel>
          <MeterValue />
          <MeterTrack><MeterIndicator tone="danger" /></MeterTrack>
        </Meter>
      </div>
    </Demo>

    <Demo title="Custom value label" description="getValueLabel adds context for screen readers; the children snippet customizes the visible text." code={valueLabelCode}>
      <div class="w-full max-w-sm">
        <Meter
          value={750}
          max={1000}
          getValueLabel={(value, details) =>
            `${value} of ${details.max} requests, ${details.formatted}`}
        >
          <MeterLabel>API requests</MeterLabel>
          <MeterValue>
            {#snippet children(state)}{state.text} used{/snippet}
          </MeterValue>
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="MeterIndicator tone"
      rows={[
        { name: "accent", type: "default", description: "The brand accent fill." },
        { name: "success", type: "string", description: "A positive reading, like healthy usage." },
        { name: "warning", type: "string", description: "A reading nearing its limit." },
        { name: "danger", type: "string", description: "A reading at or over its limit." },
      ]}
    />
    <p class="text-sm text-muted">
      The meter has no state attributes: the reading lives in the
      <code class="font-mono text-accent">--meter-value</code> CSS variable on the root (a percentage
      between min and max) and in the indicator's inline width. Use
      <code class="font-mono text-accent">--meter-value</code> to position other content alongside the
      reading. Set <code class="font-mono text-accent">dir="rtl"</code> on surrounding content to fill
      the track from the right.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Meter (root)"
      rows={[
        { name: "value", type: "number", description: "The reading. Required. Outside min/max the fill, percentage and aria-valuenow are clamped; state keeps the value as given." },
        { name: "min", type: "number", default: "0", description: "The lowest value." },
        { name: "max", type: "number", default: "100", description: "The highest value." },
        { name: "format", type: "NumberFormat", description: "Intl.NumberFormat options or a function. Percent style shows the position between min and max; other styles show the value itself." },
        { name: "locale", type: "string", description: "Locale for formatting. Defaults to the page lang, then the browser language." },
        { name: "getValueLabel", type: "(value, details) => string", description: "The text screen readers announce. details carries formatted, percent, min and max." },
        { name: "aria-label", type: "string", description: "Names the meter when no MeterLabel is rendered." },
      ]}
    />
    <PropsTable
      caption="MeterLabel"
      rows={[
        { name: "children", type: "Snippet<[MeterState]>", description: "The visible name; also names the meter for screen readers." },
        { name: "render", type: "Snippet", description: "Replace the span element; receives props, state and children." },
      ]}
    />
    <PropsTable
      caption="MeterValue"
      rows={[
        { name: "children", type: "Snippet<[MeterValueState]>", description: "Custom content; state.text is the formatted value. Renders state.text by default. Hidden from screen readers." },
        { name: "render", type: "Snippet", description: "Replace the span element; receives props, state and children." },
      ]}
    />
    <PropsTable
      caption="MeterTrack"
      rows={[
        { name: "class", type: "string", description: "Merged with the wrapper classes; give it a height, background and width." },
        { name: "render", type: "Snippet", description: "Replace the track element; receives props, state and children." },
      ]}
    />
    <PropsTable
      caption="MeterIndicator"
      rows={[
        { name: "tone", type: '"accent" | "success" | "warning" | "danger"', default: '"accent"', description: "Fill color from the semantic palette." },
        { name: "render", type: "Snippet", description: "Replace the indicator element; receives props, state and children. The primitive still writes the inline width." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Exposes the <code class="font-mono text-accent">meter</code> role with <code class="font-mono text-accent">aria-valuenow</code>, <code class="font-mono text-accent">aria-valuemin</code> and <code class="font-mono text-accent">aria-valuemax</code>, and the formatted value in its accessible description.</li>
      <li>Name it with <code class="font-mono text-accent">MeterLabel</code> or <code class="font-mono text-accent">aria-label</code> on the root.</li>
      <li>The visible <code class="font-mono text-accent">MeterValue</code> is hidden from screen readers to avoid reading the value twice.</li>
      <li>Use <code class="font-mono text-accent">getValueLabel</code> when the formatted value says too little, like "750 of 1000 requests, 75%".</li>
      <li>A value above the maximum reads as the maximum and fills the track; a meter always has a value, since there is no busy state. Use Progress for indeterminate work.</li>
      <li>Meter is read-only: pass a new <code class="font-mono text-accent">value</code> when the reading changes. It has no callbacks and no controller.</li>
    </ul>
  </Section>
</div>