<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "#lib/components/slider"
  import { Field, FieldLabel } from "#lib/components/field"
  import { Button } from "#lib/components/button"

  const installCode = `import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "#lib/components/slider"`

  const usageCode = `<script lang="ts">
  import { Field, FieldLabel } from "#lib/components/field"
  import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "#lib/components/slider"
<\/script>

<Field>
  <Slider defaultValue={75}>
    <div class="flex items-center justify-between">
      <FieldLabel>Volume</FieldLabel>
      <SliderValue />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        <SliderThumb />
      </SliderTrack>
    </SliderControl>
  </Slider>
</Field>`

  const rangeCode = `<script lang="ts">
  import { Field, FieldLabel } from "#lib/components/field"
  import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "#lib/components/slider"
<\/script>

<Field>
  <Slider
    defaultValue={[25, 75]}
    step={5}
    format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
  >
    <div class="flex items-center justify-between">
      <FieldLabel>Price</FieldLabel>
      <SliderValue />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        <SliderThumb index={0} aria-label="Minimum price" />
        <SliderThumb index={1} aria-label="Maximum price" />
      </SliderTrack>
    </SliderControl>
  </Slider>
</Field>`

  const verticalCode = `<script lang="ts">
  import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb } from "#lib/components/slider"
<\/script>

<div class="flex items-end gap-8">
  <div class="flex flex-col items-center gap-2">
    <Slider orientation="vertical" defaultValue={50}>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label="Bass" />
        </SliderTrack>
      </SliderControl>
    </Slider>
    <span class="text-sm text-muted">Bass</span>
  </div>
  <div class="flex flex-col items-center gap-2">
    <Slider orientation="vertical" defaultValue={25}>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
          <SliderThumb aria-label="Treble" />
        </SliderTrack>
      </SliderControl>
    </Slider>
    <span class="text-sm text-muted">Treble</span>
  </div>
</div>`

  const controlledCode = `<script lang="ts">
  import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "#lib/components/slider"
  import { Button } from "#lib/components/button"

  let value = $state(60)
<\/script>

<div class="space-y-3">
  <Button size="sm" tone="outline" onclick={() => (value = 60)}>Reset</Button>
  <Slider bind:value min={0} max={100} step={5}>
    <div class="flex items-center justify-between">
      <span class="text-sm text-fg">Brightness</span>
      <SliderValue />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        <SliderThumb aria-label="Brightness" />
      </SliderTrack>
    </SliderControl>
  </Slider>
</div>`

  const formatCode = `<script lang="ts">
  import { Field, FieldLabel } from "#lib/components/field"
  import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "#lib/components/slider"
<\/script>

<Field>
  <Slider defaultValue={0.6} min={0} max={1} step={0.01} format={{ style: "percent" }}>
    <div class="flex items-center justify-between">
      <FieldLabel>Opacity</FieldLabel>
      <SliderValue />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        <SliderThumb />
      </SliderTrack>
    </SliderControl>
  </Slider>
</Field>`

  let brightness = $state(60)
</script>

<svelte:head>
  <title>Slider — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Slider"
  description="Adjust a number or a range with draggable thumbs and keyboard controls. Wraps the ui-sdk Slider with native range inputs, formatted values and vertical orientation."
  entry="@ui-sdk/svelte/slider"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/slider</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Compose the control, track, indicator and one thumb per value. The primitive positions the
      indicator and thumbs with inline percentages, so the track only needs a size and a background.
      Name a single thumb with a <code class="font-mono text-accent">FieldLabel</code> or
      <code class="font-mono text-accent">aria-label</code>; give each thumb of a range its own label.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Drag the thumb, or focus it and use the arrow keys." code={usageCode}>
      <div class="w-full max-w-sm">
        <Field>
          <Slider defaultValue={75}>
            <div class="flex items-center justify-between">
              <FieldLabel>Volume</FieldLabel>
              <SliderValue />
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </Field>
      </div>
    </Demo>

    <Demo title="Range" description="An array value renders one thumb per number; the indicator fills between them." code={rangeCode}>
      <div class="w-full max-w-sm">
        <Field>
          <Slider
            defaultValue={[25, 75]}
            step={5}
            format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
          >
            <div class="flex items-center justify-between">
              <FieldLabel>Price</FieldLabel>
              <SliderValue />
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb index={0} aria-label="Minimum price" />
                <SliderThumb index={1} aria-label="Maximum price" />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </Field>
      </div>
    </Demo>

    <Demo title="Vertical" description="orientation='vertical' grows upward; the bottom is the minimum." code={verticalCode}>
      <div class="flex items-end gap-8">
        <div class="flex flex-col items-center gap-2">
          <Slider orientation="vertical" defaultValue={50}>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label="Bass" />
              </SliderTrack>
            </SliderControl>
          </Slider>
          <span class="text-sm text-muted">Bass</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Slider orientation="vertical" defaultValue={25}>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label="Treble" />
              </SliderTrack>
            </SliderControl>
          </Slider>
          <span class="text-sm text-muted">Treble</span>
        </div>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:value controls the slider from outside; Reset writes the state back." code={controlledCode}>
      <div class="w-full max-w-sm space-y-3">
        <Button size="sm" tone="outline" onclick={() => (brightness = 60)}>Reset</Button>
        <Slider bind:value={brightness} min={0} max={100} step={5}>
          <div class="flex items-center justify-between">
            <span class="text-sm text-fg">Brightness</span>
            <SliderValue />
          </div>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Brightness" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </div>
    </Demo>

    <Demo title="Formatted" description="format takes Intl.NumberFormat options or a function; the value stays a plain number." code={formatCode}>
      <div class="w-full max-w-sm">
        <Field>
          <Slider defaultValue={0.6} min={0} max={1} step={0.01} format={{ style: "percent" }}>
            <div class="flex items-center justify-between">
              <FieldLabel>Opacity</FieldLabel>
              <SliderValue />
            </div>
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </Field>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Slider orientation"
      rows={[
        { name: "horizontal", type: "default", description: "The thumb moves left to right; ArrowLeft/ArrowRight step the value." },
        { name: "vertical", type: "string", description: "The thumb moves bottom to top; ArrowUp/ArrowDown step the value. Give the slider a height." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling: <code class="font-mono text-accent">data-orientation</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-dragging</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code>, and
      <code class="font-mono text-accent">data-index</code> on each thumb.
    </p>
    <p class="text-sm text-muted">
      CSS variables written by the primitive:
      <code class="font-mono text-accent">--slider-indicator-start</code> and
      <code class="font-mono text-accent">--slider-indicator-size</code> on the indicator, and
      <code class="font-mono text-accent">--slider-thumb-position</code> on each thumb, all percentages
      along the track. Use them for anything that should follow the fill, like a bubble above a thumb.
      The thumb's hidden range input takes focus, so draw the focus ring on the thumb with
      <code class="font-mono text-accent">:has(:focus-visible)</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Slider (root)"
      rows={[
        { name: "value", type: "number | number[]", description: "The value: a number for one thumb, an array for a range. Bind with bind:value to control." },
        { name: "defaultValue", type: "number | number[]", description: "Initial value when uncontrolled. A form reset returns to it." },
        { name: "min", type: "number", default: "0", description: "The lowest value." },
        { name: "max", type: "number", default: "100", description: "The highest value. Steps are counted from min." },
        { name: "step", type: "number", default: "1", description: "How far one step moves." },
        { name: "largeStep", type: "number", default: "10 steps", description: "How far PageUp/PageDown and Shift+arrow move." },
        { name: "minStepsBetweenThumbs", type: "number", default: "0", description: "Minimum steps between neighbouring thumbs; they never pass each other." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The slider's axis. Vertical sliders grow upward." },
        { name: "disabled", type: "boolean", default: "false", description: "Thumbs can't be focused or moved, and nothing is submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Focusable and submitted, but drags and keys don't change the value." },
        { name: "required", type: "boolean", default: "false", description: "Marks it required with data-required; a slider always has a value." },
        { name: "name", type: "string", description: "Form field name. A range submits as \"start/end\"." },
        { name: "form", type: "string", description: "Id of a form to belong to, when outside it." },
        { name: "format", type: "NumberFormat", description: "Intl.NumberFormat options or a function of the value, for SliderValue and screen readers." },
        { name: "locale", type: "string", description: "Locale for formatting. Defaults to the page lang, then the browser language." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs on every step of a drag or key. details.thumb says which thumb moved; details.cancel() stops it." },
        { name: "onValueCommit", type: "(value, details) => void", description: "Runs once when an interaction that changed the value ends. For saving." },
        { name: "controller", type: "SliderController", description: "Move the slider from anywhere via createSliderController()." },
      ]}
    />
    <PropsTable
      caption="SliderThumb"
      rows={[
        { name: "index", type: "number", default: "0", description: "Which value the thumb shows, from 0. Give each thumb of a range its own." },
        { name: "aria-label", type: "string", description: "Names the thumb's hidden range input. Required for each thumb of a range without a FieldLabel." },
        { name: "render", type: "Snippet", description: "Replace the thumb element; receives props, state and children." },
        { name: "children", type: "Snippet<[SliderThumbState]>", description: "Content inside the thumb; state adds index, thumbValue and percent." },
      ]}
    />
    <PropsTable
      caption="SliderValue"
      rows={[
        { name: "children", type: "Snippet<[SliderValueState]>", description: "Custom content; state.text is the formatted value, a range joined with an en dash. Renders state.text by default." },
        { name: "render", type: "Snippet", description: "Replace the output element; receives props, state and children." },
      ]}
    />
    <PropsTable
      caption="SliderControl / SliderTrack / SliderIndicator"
      rows={[
        { name: "class", type: "string", description: "Merged with the wrapper classes; user classes win." },
        { name: "render", type: "Snippet", description: "Replace the part's element; receives props, state and children." },
        { name: "children", type: "Snippet<[SliderState]>", description: "Content inside the part; every part receives the slider's state." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA slider pattern, and the multi-thumb slider pattern for ranges. Each thumb is a native <code class="font-mono text-accent">&lt;input type="range"&gt;</code> inside the thumb element, and the slider is a group around them.</li>
      <li><span class="text-fg">ArrowRight/ArrowUp</span> step up, <span class="text-fg">ArrowLeft/ArrowDown</span> step down; directions flip in right-to-left.</li>
      <li><span class="text-fg">PageUp/PageDown</span> and <span class="text-fg">Shift+arrow</span> move by <code class="font-mono text-accent">largeStep</code>; <span class="text-fg">Home/End</span> go to the bounds, or as far as a neighbouring thumb allows.</li>
      <li><span class="text-fg">Tab</span> moves through the thumbs in order. The hidden input takes focus, so style the ring on the thumb with <code class="font-mono text-accent">:has(:focus-visible)</code>.</li>
      <li>Name a single thumb with a <code class="font-mono text-accent">FieldLabel</code> in a <code class="font-mono text-accent">Field</code> or <code class="font-mono text-accent">aria-label</code> on the thumb. In a range, label each thumb and name the group.</li>
      <li>A hidden input beside the slider submits the value under <code class="font-mono text-accent">name</code>; a range submits <code class="font-mono text-accent">"start/end"</code>. Form reset returns to <code class="font-mono text-accent">defaultValue</code>.</li>
      <li><code class="font-mono text-accent">SliderValue</code> is not announced as it changes — the thumb already speaks its value.</li>
    </ul>
  </Section>
</div>