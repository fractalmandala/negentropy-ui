<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    DateInput,
    DateInputSegment,
    createDateInputController,
  } from "#lib/components/date-input"
  import { Field, FieldLabel, FieldDescription, FieldError } from "#lib/components/field"
  import { Button } from "#lib/components/button"

  const installCode = `import { DateInput, DateInputSegment } from "#lib/components/date-input"`

  const usageCode = `<script lang="ts">
  import { DateInput } from "#lib/components/date-input"
  import { Field, FieldLabel } from "#lib/components/field"
<\/script>

<Field>
  <FieldLabel>Start date</FieldLabel>
  <DateInput defaultValue="2026-11-02" />
</Field>`

  const dateTimeCode = `<Field>
  <FieldLabel>Departure</FieldLabel>
  <DateInput granularity="minute" defaultValue="2026-11-02T14:30" />
  <FieldDescription>Tab through the date, then the time. Type P or A in the last segment.</FieldDescription>
</Field>`

  const localeCode = `<div class="flex flex-col gap-4">
  <Field>
    <FieldLabel>Date (en-GB)</FieldLabel>
    <DateInput locale="en-GB" defaultValue="2026-11-02" />
  </Field>
  <Field>
    <FieldLabel>Datum (de-DE)</FieldLabel>
    <DateInput locale="de-DE" defaultValue="2026-11-02" />
  </Field>
  <Field>
    <FieldLabel>日付 (ja-JP)</FieldLabel>
    <DateInput locale="ja-JP" defaultValue="2026-11-02" />
  </Field>
</div>`

  const controlledCode = `<script lang="ts">
  let value = $state<string | null>("2026-11-02")
<\/script>

<Button size="sm" tone="outline" onclick={() => (value = null)}>Clear</Button>
<Field>
  <FieldLabel>Due date</FieldLabel>
  <DateInput bind:value onValueChange={(next) => console.log(next ?? "empty")} />
</Field>
<p class="text-sm text-muted">value: {value ?? "null"}</p>`

  const controllerCode = `<script lang="ts">
  import { createDateInputController } from "#lib/components/date-input"
  const publish = createDateInputController()
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => publish.setValue("2026-12-25")}>Christmas</Button>
  <Button size="sm" tone="outline" onclick={() => publish.focus("year")}>Edit Year</Button>
  <Button size="sm" tone="outline" onclick={() => publish.clear()}>Clear</Button>
</div>
<Field>
  <FieldLabel>Publish on</FieldLabel>
  <DateInput controller={publish} />
</Field>`

  const limitsCode = `<Field>
  <FieldLabel>Check-in</FieldLabel>
  <DateInput min="2026-01-01" max="2026-12-31" defaultValue="2026-06-15" />
  <FieldDescription>Any day in 2026. Step the year to 2027 to see it turn invalid.</FieldDescription>
  <FieldError />
</Field>`

  const segmentsCode = `<Field>
  <FieldLabel>Start date</FieldLabel>
  <DateInput defaultValue="2026-11-02">
    {#snippet children(state)}
      {#each state.segments as segment (segment.key)}
        {#if segment.editable}
          <DateInputSegment {segment} />
        {:else}
          <DateInputSegment {segment}>–</DateInputSegment>
        {/if}
      {/each}
    {/snippet}
  </DateInput>
</Field>`

  const sizesCode = `<div class="flex flex-col gap-4">
  <Field>
    <FieldLabel>Small</FieldLabel>
    <DateInput size="sm" defaultValue="2026-11-02" />
  </Field>
  <Field>
    <FieldLabel>Medium</FieldLabel>
    <DateInput size="md" defaultValue="2026-11-02" />
  </Field>
  <Field>
    <FieldLabel>Large</FieldLabel>
    <DateInput size="lg" defaultValue="2026-11-02" />
  </Field>
</div>`

  const statesCode = `<div class="flex flex-col gap-4">
  <Field>
    <FieldLabel>Disabled</FieldLabel>
    <DateInput defaultValue="2026-11-02" disabled />
  </Field>
  <Field>
    <FieldLabel>Read-only</FieldLabel>
    <DateInput defaultValue="2026-11-02" readOnly />
  </Field>
  <Field>
    <FieldLabel>Required</FieldLabel>
    <DateInput name="signed" required />
  </Field>
</div>`

  let due = $state<string | null>("2026-11-02")
  const publish = createDateInputController()
</script>

<svelte:head>
  <title>Date Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Date Input"
  description="A segmented field for typing a date one part at a time, in the order your user's language writes it. Wraps the ui-sdk Date Input: real inputs, spinbutton semantics and an ISO string value."
  entry="@ui-sdk/svelte/date-input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/date-input</code>.
      The controller creator and the segment types are re-exported from the same barrel.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the input in a Field and give it a label: the label names the group, and clicking it
      focuses the first segment. The value is an ISO date string like
      <code class="font-mono text-accent">"2026-11-02"</code>, the same as a native date input's.
      It stays <code class="font-mono text-accent">null</code> until every segment holds something,
      so your app only sees whole dates.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Type digits and each segment fills, then moves on. A month that cannot take another digit,
      like 4, moves on at once; typing a separator such as <code class="font-mono text-accent">/</code>
      or <code class="font-mono text-accent">.</code> moves on too. The day stays within its month:
      moving from January 31 to February shows the 28th. Paste a whole date into any segment.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Click the month and type 11042026. ArrowUp and ArrowDown step a segment." code={usageCode}>
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Start date</FieldLabel>
          <DateInput defaultValue="2026-11-02" />
        </Field>
      </div>
    </Demo>

    <Demo title="Date and time" description="granularity='minute' adds the time. The value becomes 2026-11-02T14:30." code={dateTimeCode}>
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Departure</FieldLabel>
          <DateInput granularity="minute" defaultValue="2026-11-02T14:30" />
          <FieldDescription>Tab through the date, then the time. Type P or A in the last segment.</FieldDescription>
        </Field>
      </div>
    </Demo>

    <Demo title="Locale" description="The same date in British English, German and Japanese. Each orders its parts its own way." code={localeCode}>
      <div class="w-full max-w-xs">
        <div class="flex flex-col gap-4">
          <Field>
            <FieldLabel>Date (en-GB)</FieldLabel>
            <DateInput locale="en-GB" defaultValue="2026-11-02" />
          </Field>
          <Field>
            <FieldLabel>Datum (de-DE)</FieldLabel>
            <DateInput locale="de-DE" defaultValue="2026-11-02" />
          </Field>
          <Field>
            <FieldLabel>日付 (ja-JP)</FieldLabel>
            <DateInput locale="ja-JP" defaultValue="2026-11-02" />
          </Field>
        </div>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:value reports each whole date, and null once any part is erased." code={controlledCode}>
      <div class="flex w-full max-w-xs flex-col gap-3">
        <Button size="sm" tone="outline" onclick={() => (due = null)}>Clear</Button>
        <Field>
          <FieldLabel>Due date</FieldLabel>
          <DateInput bind:value={due} />
        </Field>
        <p class="text-sm text-muted">value: {due ?? "null"}</p>
      </div>
    </Demo>

    <Demo title="Controller" description="createDateInputController() sets, clears and focuses a segment from elsewhere." code={controllerCode}>
      <div class="flex w-full max-w-xs flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => publish.setValue("2026-12-25")}>Christmas</Button>
          <Button size="sm" tone="outline" onclick={() => publish.focus("year")}>Edit Year</Button>
          <Button size="sm" tone="outline" onclick={() => publish.clear()}>Clear</Button>
        </div>
        <Field>
          <FieldLabel>Publish on</FieldLabel>
          <DateInput controller={publish} />
        </Field>
      </div>
    </Demo>

    <Demo title="Min, max and errors" description="A date outside the bounds sets data-invalid and blocks its form." code={limitsCode}>
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Check-in</FieldLabel>
          <DateInput min="2026-01-01" max="2026-12-31" defaultValue="2026-06-15" />
          <FieldDescription>Any day in 2026. Step the year to 2027 to see it turn invalid.</FieldDescription>
          <FieldError />
        </Field>
      </div>
    </Demo>

    <Demo title="Custom segments" description="The children snippet receives state.segments. Render a DateInputSegment for each, keyed by segment.key." code={segmentsCode}>
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Start date</FieldLabel>
          <DateInput defaultValue="2026-11-02">
            {#snippet children(state)}
              {#each state.segments as segment (segment.key)}
                {#if segment.editable}
                  <DateInputSegment {segment} />
                {:else}
                  <DateInputSegment {segment}>–</DateInputSegment>
                {/if}
              {/each}
            {/snippet}
          </DateInput>
        </Field>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="DateInput size"
      rows={[
        { name: "sm", type: "string", description: "32px tall, extra-small text." },
        { name: "md", type: "default", description: "36px tall, small text." },
        { name: "lg", type: "string", description: "44px tall, base text." },
      ]}
    />

    <Demo title="Sizes" description="size scales the field box; the segments keep their character-based widths." code={sizesCode}>
      <div class="w-full max-w-xs">
        <div class="flex flex-col gap-4">
          <Field>
            <FieldLabel>Small</FieldLabel>
            <DateInput size="sm" defaultValue="2026-11-02" />
          </Field>
          <Field>
            <FieldLabel>Medium</FieldLabel>
            <DateInput size="md" defaultValue="2026-11-02" />
          </Field>
          <Field>
            <FieldLabel>Large</FieldLabel>
            <DateInput size="lg" defaultValue="2026-11-02" />
          </Field>
        </div>
      </div>
    </Demo>

    <Demo title="States" description="disabled skips focus and the form. readOnly takes focus but never changes. required blocks an empty submit." code={statesCode}>
      <div class="w-full max-w-xs">
        <div class="flex flex-col gap-4">
          <Field>
            <FieldLabel>Disabled</FieldLabel>
            <DateInput defaultValue="2026-11-02" disabled />
          </Field>
          <Field>
            <FieldLabel>Read-only</FieldLabel>
            <DateInput defaultValue="2026-11-02" readOnly />
          </Field>
          <Field>
            <FieldLabel>Required</FieldLabel>
            <DateInput name="signed" required />
          </Field>
        </div>
      </div>
    </Demo>

    <p class="text-sm text-muted">
      Root state attributes: <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code>,
      <code class="font-mono text-accent">data-invalid</code>,
      <code class="font-mono text-accent">data-empty</code>.
      Each segment sets <code class="font-mono text-accent">data-type</code> to its unit
      (<code class="font-mono text-accent">year</code>, <code class="font-mono text-accent">month</code>,
      <code class="font-mono text-accent">day</code>, <code class="font-mono text-accent">hour</code>,
      <code class="font-mono text-accent">minute</code>, <code class="font-mono text-accent">second</code>,
      <code class="font-mono text-accent">dayPeriod</code>) or
      <code class="font-mono text-accent">literal</code> for the text between segments, plus
      <code class="font-mono text-accent">data-empty</code> while it holds nothing.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="DateInput (root)"
      rows={[
        { name: "value", type: "string | null", description: 'An ISO date like "2026-11-02", or "2026-11-02T14:30" with a time granularity. Bind with bind:value to control.' },
        { name: "defaultValue", type: "string | null", description: "The value it starts with when uncontrolled, and returns to on a form reset." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs once every segment holds something, and again with null when one is emptied. details.cancel() keeps the value." },
        { name: "granularity", type: '"day" | "hour" | "minute" | "second"', default: '"day"', description: "The smallest unit it shows. Anything below day adds the time." },
        { name: "hourCycle", type: "12 | 24", description: "The clock for the time. Defaults to the locale's." },
        { name: "min", type: "string", description: "The earliest value, as an ISO date or date and time. A value before it is invalid." },
        { name: "max", type: "string", description: "The latest value. A date alone takes any time that day." },
        { name: "unavailable", type: "DateMatchers", description: "ISO dates, { from, to }, { weekday: [0, 6] }, { before }, { after }, a predicate, or an array. A value on one is invalid." },
        { name: "locale", type: "string", description: "The language whose order, separators and clock it shows. Defaults to the page's." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether it can't be used. A Field or fieldset can disable it too." },
        { name: "readOnly", type: "boolean", default: "false", description: "Whether the value can be seen and submitted but not changed." },
        { name: "required", type: "boolean", default: "false", description: "Whether a value must be entered before its form submits." },
        { name: "name", type: "string", description: "The name the hidden input submits the ISO value under." },
        { name: "form", type: "string", description: "The id of the form it belongs to, when it isn't inside it." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and text size of the field box." },
        { name: "controller", type: "DateInputController", description: "Drive it from anywhere via createDateInputController()." },
        { name: "children", type: "Snippet<[DateInputState]>", description: "Receives { value, segments, disabled, readOnly, invalid } to render the segments yourself." },
      ]}
    />
    <PropsTable
      caption="DateInputSegment"
      rows={[
        { name: "segment", type: "DateInputSegmentData", description: "The segment it shows, from the root's state.segments. Required." },
        { name: "children", type: "Snippet<[DateInputSegmentState]>", description: "Content for a literal segment, like a dash. Editable segments render an input and ignore it." },
        { name: "class", type: "string", description: "Extra classes merged onto the input, or the span for a literal." },
      ]}
    />
    <PropsTable
      caption="DateInputController"
      rows={[
        { name: "getValue()", type: "() => string | null", description: "The value, or null while empty or partly filled." },
        { name: "setValue(value, options?)", type: "(value, options?) => boolean", description: "Sets the value. Returns false when it isn't a value the input can show, or when canceled." },
        { name: "clear(options?)", type: "(options?) => boolean", description: "Empties every segment." },
        { name: "focus(segment?)", type: '(segment?: string) => void', description: 'Focuses a segment by its unit, like "month" or "year", or the first one.' },
      ]}
    />
    <PropsTable
      caption="DateInputSegmentState"
      rows={[
        { name: "key", type: "string", description: 'Tells segments apart: the type, or "literal-<n>" for the text between them.' },
        { name: "type", type: "DateInputSegmentType", description: "The unit, or literal." },
        { name: "text", type: "string", description: "What it shows: the padded number, or AM and PM in the locale. Empty while it holds nothing." },
        { name: "value", type: "number | null", description: "The number it holds. AM is 0 and PM is 1." },
        { name: "min / max", type: "number", description: "The smallest and largest number it takes, like the days in the month." },
        { name: "empty", type: "boolean", description: "Whether it holds nothing yet." },
        { name: "editable", type: "boolean", description: "Whether it's a segment you type in, rather than the text between segments." },
        { name: "label", type: "string", description: 'Its name in the locale, like "month", which names it to assistive technology.' },
        { name: "disabled / readOnly / invalid", type: "boolean", description: "The input's states, beside the segment's own." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>The root is a <code class="font-mono text-accent">group</code>, named by its Field's label or by your <code class="font-mono text-accent">aria-label</code>. Each segment is a spinbutton named by its unit, like "month", with its value, range and text. An empty segment reads as "Empty".</li>
      <li>The text between segments is hidden from screen readers, which read each segment's name instead.</li>
      <li>Segments are real inputs, so phones show a number pad and typing works before the page's script runs.</li>
      <li><span class="text-fg">0–9</span> fill the segment, then move to the next one. <span class="text-fg">ArrowUp/ArrowDown</span> step by one, wrapping around; an empty segment starts at today.</li>
      <li><span class="text-fg">PageUp/PageDown</span> step by more: a year by 5, a month by 3, a day by 7, minutes by 15. <span class="text-fg">Home/End</span> go to the segment's first or last value.</li>
      <li><span class="text-fg">ArrowLeft/ArrowRight</span> move to the segment before or after. <span class="text-fg">Tab/Shift+Tab</span> move through the segments, then out of the input.</li>
      <li><span class="text-fg">Backspace</span> removes the last digit, then empties the segment, then moves back. <span class="text-fg">Delete</span> empties it. <span class="text-fg">A/P</span> choose AM or PM on a 12-hour clock.</li>
      <li><span class="text-fg">Enter</span> submits the form with what was typed. A partly filled or required empty date blocks the submit.</li>
      <li>In a right-to-left page the segments keep the locale's order, and ArrowLeft and ArrowRight follow the order on screen.</li>
    </ul>
  </Section>
</div>