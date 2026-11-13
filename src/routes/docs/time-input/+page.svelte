<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    TimeInput,
    TimeInputSegment,
    createTimeInputController,
  } from "$lib/components/time-input"
  import { Field, FieldLabel, FieldDescription, FieldError } from "$lib/components/field"
  import { Button } from "$lib/components/button"

  const installCode = `import { TimeInput, TimeInputSegment } from "$lib/components/time-input"`

  const usageCode = `<script lang="ts">
  import { TimeInput } from "$lib/components/time-input"
  import { Field, FieldLabel } from "$lib/components/field"
<\/script>

<Field>
  <FieldLabel>Meeting time</FieldLabel>
  <TimeInput defaultValue="09:30" />
</Field>`

  const clockCode = `<div class="flex flex-col gap-4">
  <Field>
    <FieldLabel>12-hour clock</FieldLabel>
    <TimeInput hourCycle={12} defaultValue="18:45" />
  </Field>
  <Field>
    <FieldLabel>24-hour clock</FieldLabel>
    <TimeInput hourCycle={24} defaultValue="18:45" />
  </Field>
  <Field>
    <FieldLabel>With seconds</FieldLabel>
    <TimeInput granularity="second" hourCycle={24} defaultValue="18:45:30" />
  </Field>
</div>`

  const controlledCode = `<script lang="ts">
  let value = $state<string | null>("09:30")
<\/script>

<Button size="sm" tone="outline" onclick={() => (value = null)}>Clear</Button>
<Field>
  <FieldLabel>Standup</FieldLabel>
  <TimeInput bind:value />
</Field>
<p class="text-sm text-muted">value: {value ?? "null"}</p>`

  const controllerCode = `<script lang="ts">
  import { createTimeInputController } from "$lib/components/time-input"
  const opens = createTimeInputController()
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => opens.setValue("08:00")}>Open at 8</Button>
  <Button size="sm" tone="outline" onclick={() => opens.focus("minute")}>Edit Minutes</Button>
  <Button size="sm" tone="outline" onclick={() => opens.clear()}>Clear</Button>
</div>
<Field>
  <FieldLabel>Opening hour</FieldLabel>
  <TimeInput controller={opens} hourCycle={24} />
</Field>`

  const limitsCode = `<Field>
  <FieldLabel>Delivery slot</FieldLabel>
  <TimeInput min="09:00" max="17:30" defaultValue="12:00" hourCycle={24} />
  <FieldDescription>Between 09:00 and 17:30. Step the hour to 18 to see it turn invalid.</FieldDescription>
  <FieldError />
</Field>`

  const segmentsCode = `<Field>
  <FieldLabel>Meeting time</FieldLabel>
  <TimeInput defaultValue="09:30" hourCycle={24}>
    {#snippet children(state)}
      {#each state.segments as segment (segment.key)}
        {#if segment.editable}
          <TimeInputSegment {segment} />
        {:else}
          <TimeInputSegment {segment}>h</TimeInputSegment>
        {/if}
      {/each}
    {/snippet}
  </TimeInput>
</Field>`

  const sizesCode = `<div class="flex flex-col gap-4">
  <Field>
    <FieldLabel>Small</FieldLabel>
    <TimeInput size="sm" defaultValue="09:30" />
  </Field>
  <Field>
    <FieldLabel>Medium</FieldLabel>
    <TimeInput size="md" defaultValue="09:30" />
  </Field>
  <Field>
    <FieldLabel>Large</FieldLabel>
    <TimeInput size="lg" defaultValue="09:30" />
  </Field>
</div>`

  const statesCode = `<div class="flex flex-col gap-4">
  <Field>
    <FieldLabel>Disabled</FieldLabel>
    <TimeInput defaultValue="09:30" disabled />
  </Field>
  <Field>
    <FieldLabel>Read-only</FieldLabel>
    <TimeInput defaultValue="09:30" readOnly />
  </Field>
  <Field>
    <FieldLabel>Required</FieldLabel>
    <TimeInput name="slot" required />
  </Field>
</div>`

  let standup = $state<string | null>("09:30")
  const opens = createTimeInputController()
</script>

<svelte:head>
  <title>Time Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Time Input"
  description="A segmented field for typing a time, on the clock your user's language uses. Wraps the ui-sdk Time Input: hour, minute, optional seconds and AM/PM, submitting a 24-hour value."
  entry="@ui-sdk/svelte/time-input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/time-input</code>.
      The controller creator and the segment types are re-exported from the same barrel.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the input in a Field and give it a label. The value is a 24-hour time like
      <code class="font-mono text-accent">"14:30"</code>, the same as a native time input's,
      whatever clock the input shows. It stays <code class="font-mono text-accent">null</code>
      until every segment holds something.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Click the hour and type <code class="font-mono text-accent">230</code>, then
      <code class="font-mono text-accent">P</code>. Each segment fills and moves on;
      ArrowUp and ArrowDown step the focused one.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Type the hour, then the minute. On a 12-hour clock, A and P switch the day period." code={usageCode}>
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Meeting time</FieldLabel>
          <TimeInput defaultValue="09:30" />
        </Field>
      </div>
    </Demo>

    <Demo title="Clock and seconds" description="hourCycle chooses the clock; granularity='second' adds seconds. All three submit 24-hour values." code={clockCode}>
      <div class="w-full max-w-xs">
        <div class="flex flex-col gap-4">
          <Field>
            <FieldLabel>12-hour clock</FieldLabel>
            <TimeInput hourCycle={12} defaultValue="18:45" />
          </Field>
          <Field>
            <FieldLabel>24-hour clock</FieldLabel>
            <TimeInput hourCycle={24} defaultValue="18:45" />
          </Field>
          <Field>
            <FieldLabel>With seconds</FieldLabel>
            <TimeInput granularity="second" hourCycle={24} defaultValue="18:45:30" />
          </Field>
        </div>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:value reports each whole time, and null once any segment is erased." code={controlledCode}>
      <div class="flex w-full max-w-xs flex-col gap-3">
        <Button size="sm" tone="outline" onclick={() => (standup = null)}>Clear</Button>
        <Field>
          <FieldLabel>Standup</FieldLabel>
          <TimeInput bind:value={standup} />
        </Field>
        <p class="text-sm text-muted">value: {standup ?? "null"}</p>
      </div>
    </Demo>

    <Demo title="Controller" description="createTimeInputController() sets, clears and focuses a segment from elsewhere." code={controllerCode}>
      <div class="flex w-full max-w-xs flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => opens.setValue("08:00")}>Open at 8</Button>
          <Button size="sm" tone="outline" onclick={() => opens.focus("minute")}>Edit Minutes</Button>
          <Button size="sm" tone="outline" onclick={() => opens.clear()}>Clear</Button>
        </div>
        <Field>
          <FieldLabel>Opening hour</FieldLabel>
          <TimeInput controller={opens} hourCycle={24} />
        </Field>
      </div>
    </Demo>

    <Demo title="Min and max" description="A time outside the bounds sets data-invalid and blocks its form." code={limitsCode}>
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Delivery slot</FieldLabel>
          <TimeInput min="09:00" max="17:30" defaultValue="12:00" hourCycle={24} />
          <FieldDescription>Between 09:00 and 17:30. Step the hour to 18 to see it turn invalid.</FieldDescription>
          <FieldError />
        </Field>
      </div>
    </Demo>

    <Demo title="Custom segments" description="The children snippet receives state.segments. Render a TimeInputSegment for each, keyed by segment.key." code={segmentsCode}>
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Meeting time</FieldLabel>
          <TimeInput defaultValue="09:30" hourCycle={24}>
            {#snippet children(state)}
              {#each state.segments as segment (segment.key)}
                {#if segment.editable}
                  <TimeInputSegment {segment} />
                {:else}
                  <TimeInputSegment {segment}>h</TimeInputSegment>
                {/if}
              {/each}
            {/snippet}
          </TimeInput>
        </Field>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="TimeInput size"
      rows={[
        { name: "sm", type: "string", description: "32px tall, extra-small text." },
        { name: "md", type: "default", description: "36px tall, small text." },
        { name: "lg", type: "string", description: "44px tall, base text." },
      ]}
    />
    <PropsTable
      caption="TimeInput granularity and hourCycle"
      rows={[
        { name: "granularity", type: '"hour" | "minute" | "second"', default: '"minute"', description: "The smallest unit shown. hour shows the hour alone; second adds seconds." },
        { name: "hourCycle", type: "12 | 24", description: "The clock shown. Defaults to the locale's. The value is always 24-hour." },
      ]}
    />

    <Demo title="Sizes" description="size scales the field box; the segments keep their character-based widths." code={sizesCode}>
      <div class="w-full max-w-xs">
        <div class="flex flex-col gap-4">
          <Field>
            <FieldLabel>Small</FieldLabel>
            <TimeInput size="sm" defaultValue="09:30" />
          </Field>
          <Field>
            <FieldLabel>Medium</FieldLabel>
            <TimeInput size="md" defaultValue="09:30" />
          </Field>
          <Field>
            <FieldLabel>Large</FieldLabel>
            <TimeInput size="lg" defaultValue="09:30" />
          </Field>
        </div>
      </div>
    </Demo>

    <Demo title="States" description="disabled skips focus and the form. readOnly takes focus but never changes. required blocks an empty submit." code={statesCode}>
      <div class="w-full max-w-xs">
        <div class="flex flex-col gap-4">
          <Field>
            <FieldLabel>Disabled</FieldLabel>
            <TimeInput defaultValue="09:30" disabled />
          </Field>
          <Field>
            <FieldLabel>Read-only</FieldLabel>
            <TimeInput defaultValue="09:30" readOnly />
          </Field>
          <Field>
            <FieldLabel>Required</FieldLabel>
            <TimeInput name="slot" required />
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
      Each segment sets <code class="font-mono text-accent">data-type</code> to
      <code class="font-mono text-accent">hour</code>, <code class="font-mono text-accent">minute</code>,
      <code class="font-mono text-accent">second</code>, <code class="font-mono text-accent">dayPeriod</code>
      or <code class="font-mono text-accent">literal</code>, plus
      <code class="font-mono text-accent">data-empty</code> while it holds nothing.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="TimeInput (root)"
      rows={[
        { name: "value", type: "string | null", description: 'A time like "14:30", or "14:30:15" with seconds, or null. Bind with bind:value to control.' },
        { name: "defaultValue", type: "string | null", description: "The value it starts with when uncontrolled, and returns to on a form reset." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs once every segment holds something, and again with null when one is emptied. details.cancel() keeps the value." },
        { name: "granularity", type: '"hour" | "minute" | "second"', default: '"minute"', description: "The smallest unit it shows." },
        { name: "hourCycle", type: "12 | 24", description: "A 12 or 24 hour clock. Defaults to the locale's." },
        { name: "min", type: "string", description: 'The earliest time, like "09:00". A time before it is invalid.' },
        { name: "max", type: "string", description: 'The latest time, like "17:30". A time after it is invalid.' },
        { name: "locale", type: "string", description: "The language whose separators and clock it shows. Defaults to the page's." },
        { name: "disabled", type: "boolean", default: "false", description: "Whether it can't be used. A Field or fieldset can disable it too." },
        { name: "readOnly", type: "boolean", default: "false", description: "Whether the value can be seen and submitted but not changed." },
        { name: "required", type: "boolean", default: "false", description: "Whether a time must be entered before its form submits." },
        { name: "name", type: "string", description: "The name the hidden input submits the time under." },
        { name: "form", type: "string", description: "The id of the form it belongs to, when it isn't inside it." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and text size of the field box." },
        { name: "controller", type: "TimeInputController", description: "Drive it from anywhere via createTimeInputController()." },
        { name: "children", type: "Snippet<[TimeInputState]>", description: "Receives { value, segments, disabled, readOnly, invalid } to render the segments yourself." },
      ]}
    />
    <PropsTable
      caption="TimeInputSegment"
      rows={[
        { name: "segment", type: "TimeInputSegmentData", description: "The segment it shows, from the root's state.segments. Required." },
        { name: "children", type: "Snippet<[TimeInputSegmentState]>", description: "Content for a literal segment, like an h. Editable segments render an input and ignore it." },
        { name: "class", type: "string", description: "Extra classes merged onto the input, or the span for a literal." },
      ]}
    />
    <PropsTable
      caption="TimeInputController"
      rows={[
        { name: "getValue()", type: "() => string | null", description: "The value, or null while empty or partly filled." },
        { name: "setValue(value, options?)", type: "(value, options?) => boolean", description: "Sets the value. Returns false when it isn't a value the input can show, or when canceled." },
        { name: "clear(options?)", type: "(options?) => boolean", description: "Empties every segment." },
        { name: "focus(segment?)", type: "(segment?: string) => void", description: 'Focuses a segment by its unit, like "hour" or "minute", or the first one.' },
      ]}
    />
    <PropsTable
      caption="TimeInputSegmentState"
      rows={[
        { name: "key", type: "string", description: 'Tells segments apart: the type, or "literal-<n>" for the text between them.' },
        { name: "type", type: "TimeInputSegmentType", description: "hour, minute, second, dayPeriod or literal." },
        { name: "text", type: "string", description: "What it shows: the padded number, or AM and PM in the locale. Empty while it holds nothing." },
        { name: "value", type: "number | null", description: "The number it holds. AM is 0 and PM is 1." },
        { name: "min / max", type: "number", description: "The smallest and largest number it takes, like 23 on a 24-hour clock." },
        { name: "empty", type: "boolean", description: "Whether it holds nothing yet." },
        { name: "editable", type: "boolean", description: "Whether it's a segment you type in, rather than the text between segments." },
        { name: "label", type: "string", description: 'Its name in the locale, like "hour", which names it to assistive technology.' },
        { name: "disabled / readOnly / invalid", type: "boolean", description: "The input's states, beside the segment's own." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>The root is a <code class="font-mono text-accent">group</code>, named by its Field's label or by your <code class="font-mono text-accent">aria-label</code>. Each segment is a spinbutton named by its unit, like "hour" or "AM/PM", with its value, range and text.</li>
      <li>The text between segments is hidden from screen readers, which read each segment's name instead. Segments are real inputs, so phones show a number pad.</li>
      <li><span class="text-fg">0–9</span> fill the segment, then move to the next one. <span class="text-fg">ArrowUp/ArrowDown</span> step by one, wrapping around; an empty segment starts at the current time.</li>
      <li><span class="text-fg">PageUp/PageDown</span> take bigger steps, minutes by 15. <span class="text-fg">Home/End</span> go to the segment's first or last value.</li>
      <li><span class="text-fg">ArrowLeft/ArrowRight</span> move between segments. <span class="text-fg">Tab/Shift+Tab</span> move through them, then out of the input.</li>
      <li><span class="text-fg">Backspace</span> removes the last digit, then empties the segment, then moves back. <span class="text-fg">Delete</span> empties it. <span class="text-fg">A/P</span> choose AM or PM on a 12-hour clock.</li>
      <li><span class="text-fg">Enter</span> submits the form with what was typed. A partly filled or required empty time blocks the submit, and a time outside <code class="font-mono text-accent">min</code>/<code class="font-mono text-accent">max</code> is invalid.</li>
      <li>A 24-hour clock has no AM/PM segment. In a right-to-left page the segments keep the locale's order, and ArrowLeft and ArrowRight follow the order on screen.</li>
    </ul>
  </Section>
</div>