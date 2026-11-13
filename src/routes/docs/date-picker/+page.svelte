<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    DatePicker,
    DatePickerInput,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerHint,
    DatePickerClear,
    DatePickerPreset,
    createDatePickerController,
    type DatePickerValue,
  } from "#lib/components/date-picker"
  import {
    CalendarPrevious,
    CalendarHeading,
    CalendarNext,
    CalendarGrid,
    CalendarWeekdays,
    CalendarWeekday,
    CalendarWeeks,
    CalendarDay,
  } from "#lib/components/calendar"
  import { Field, FieldLabel, FieldDescription, FieldError } from "#lib/components/field"
  import { Button } from "#lib/components/button"
  import { Calendar, ChevronLeft, ChevronRight, X } from "@lucide/svelte"

  const installCode = `import {
  DatePicker, DatePickerInput, DatePickerTrigger, DatePickerContent,
  DatePickerHint, DatePickerClear, DatePickerPreset,
} from "#lib/components/date-picker"
import {
  CalendarPrevious, CalendarHeading, CalendarNext,
  CalendarGrid, CalendarWeekdays, CalendarWeekday, CalendarWeeks, CalendarDay,
} from "#lib/components/calendar"`

  const usageCode = `<script lang="ts">
  import {
    DatePicker, DatePickerInput, DatePickerTrigger, DatePickerContent, DatePickerHint,
  } from "#lib/components/date-picker"
  import {
    CalendarPrevious, CalendarHeading, CalendarNext,
    CalendarGrid, CalendarWeekdays, CalendarWeekday, CalendarWeeks, CalendarDay,
  } from "#lib/components/calendar"
  import { Calendar, ChevronLeft, ChevronRight } from "@lucide/svelte"
<\/script>

<DatePicker defaultValue="2026-10-16" today="2026-10-16">
  <div>
    <DatePickerInput aria-label="Due date" />
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerHint />
  <DatePickerContent>
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
  </DatePickerContent>
</DatePicker>`

  const rangeCode = `<script lang="ts">
  let row: HTMLElement | undefined = $state()
<\/script>

<DatePicker
  mode="range"
  months={2}
  pageBy="page"
  monthFormat="short"
  today="2026-10-16"
  defaultValue={["2026-10-12", "2026-10-16"]}
>
  <div bind:this={row}>
    <DatePickerInput aria-label="Check in" />
    <span class="shrink-0 text-muted">–</span>
    <DatePickerInput end aria-label="Check out" />
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerContent anchor={row} align="center">
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <div class="flex flex-wrap items-start justify-center gap-4">
      {#each [0, 1] as offset (offset)}
        <CalendarGrid {offset}>
          <CalendarWeekdays>
            {#snippet children(index)}
              <CalendarWeekday {index} />
            {/snippet}
          </CalendarWeekdays>
          <CalendarWeeks>
            {#snippet children(cell)}
              <CalendarDay value={cell.date} />
            {/snippet}
          </CalendarWeeks>
        </CalendarGrid>
      {/each}
    </div>
  </DatePickerContent>
</DatePicker>`

  const presetsCode = `<DatePicker mode="range" today="2026-10-16">
  <div>
    <DatePickerInput aria-label="Check in" />
    <span class="shrink-0 text-muted">–</span>
    <DatePickerInput end aria-label="Check out" />
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerContent>
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
    <div>
      <DatePickerPreset value={["2026-10-10", "2026-10-16"]}>Last 7 days</DatePickerPreset>
      <DatePickerPreset value={["2026-09-17", "2026-10-16"]}>Last 30 days</DatePickerPreset>
      <DatePickerPreset value={["2026-10-01", "2026-10-31"]}>This month</DatePickerPreset>
    </div>
  </DatePickerContent>
</DatePicker>`

  const clearCode = `<script lang="ts">
  import { X } from "@lucide/svelte"
<\/script>

<DatePicker defaultValue="2026-10-16" today="2026-10-16">
  <div>
    <DatePickerInput aria-label="Due date" />
    <DatePickerClear aria-label="Clear date"><X aria-hidden="true" /></DatePickerClear>
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerHint />
  <DatePickerContent>
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
  </DatePickerContent>
</DatePicker>`

  const controlledCode = `<script lang="ts">
  import type { DatePickerValue } from "#lib/components/date-picker"
  let value = $state<DatePickerValue>("2026-10-16")
  let open = $state(false)
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => (value = "2026-12-25")}>Christmas</Button>
  <Button size="sm" tone="outline" onclick={() => (open = !open)}>Toggle calendar</Button>
</div>
<DatePicker bind:value bind:open today="2026-10-16">
  <div>
    <DatePickerInput aria-label="Due date" />
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerHint />
  <DatePickerContent>
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
  </DatePickerContent>
</DatePicker>

<p class="text-sm text-muted">value: {value ?? "null"} · open: {open}</p>`

  const controllerCode = `<script lang="ts">
  import { createDatePickerController } from "#lib/components/date-picker"
  const picker = createDatePickerController()
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => picker.setValue("2026-12-25")}>Choose Christmas</Button>
  <Button size="sm" tone="outline" onclick={() => picker.open()}>Open</Button>
  <Button size="sm" tone="outline" onclick={() => picker.close()}>Close</Button>
</div>
<DatePicker controller={picker} defaultValue="2026-10-16" today="2026-10-16">
  <div>
    <DatePickerInput aria-label="Due date" />
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerHint />
  <DatePickerContent>
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
  </DatePickerContent>
</DatePicker>`

  const limitsCode = `<DatePicker
  defaultValue="2026-10-16"
  today="2026-10-16"
  min="2026-10-05"
  max="2026-11-20"
  unavailable={[{ weekday: [0, 6] }]}
>
  <div>
    <DatePickerInput aria-label="Delivery date" />
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerHint>
    {#snippet children(state)}
      Like {state.example}
    {/snippet}
  </DatePickerHint>
  <DatePickerContent>
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
  </DatePickerContent>
</DatePicker>`

  const localeCode = `<DatePicker locale="de-DE" defaultValue="2026-10-16" today="2026-10-16">
  <div>
    <DatePickerInput aria-label="Fälligkeitsdatum" />
    <DatePickerTrigger aria-label="Kalender öffnen"><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerHint />
  <DatePickerContent>
    <div>
      <CalendarPrevious aria-label="Voriger Monat"><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext aria-label="Nächster Monat"><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
  </DatePickerContent>
</DatePicker>`

  const statesCode = `<div class="flex flex-wrap items-start gap-6">
  <DatePicker disabled defaultValue="2026-10-16" today="2026-10-16">
    <div>
      <DatePickerInput aria-label="Disabled date" />
      <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
    </div>
    <DatePickerHint />
    <DatePickerContent>
      <div>
        <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
        <CalendarHeading />
        <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
      </div>
      <CalendarGrid>
        <CalendarWeekdays>
          {#snippet children(index)}
            <CalendarWeekday {index} />
          {/snippet}
        </CalendarWeekdays>
        <CalendarWeeks>
          {#snippet children(cell)}
            <CalendarDay value={cell.date} />
          {/snippet}
        </CalendarWeeks>
      </CalendarGrid>
    </DatePickerContent>
  </DatePicker>
  <DatePicker readOnly defaultValue="2026-10-16" today="2026-10-16">
    <div>
      <DatePickerInput aria-label="Read-only date" />
      <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
    </div>
    <DatePickerHint />
    <DatePickerContent>
      <div>
        <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
        <CalendarHeading />
        <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
      </div>
      <CalendarGrid>
        <CalendarWeekdays>
          {#snippet children(index)}
            <CalendarWeekday {index} />
          {/snippet}
        </CalendarWeekdays>
        <CalendarWeeks>
          {#snippet children(cell)}
            <CalendarDay value={cell.date} />
          {/snippet}
        </CalendarWeeks>
      </CalendarGrid>
    </DatePickerContent>
  </DatePicker>
</div>`

  const stayOpenCode = `<DatePicker closeOnSelect={false} defaultValue="2026-10-16" today="2026-10-16">
  <div>
    <DatePickerInput aria-label="Due date" />
    <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
  </div>
  <DatePickerHint />
  <DatePickerContent>
    <div>
      <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
      <CalendarHeading />
      <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
    </div>
    <CalendarGrid>
      <CalendarWeekdays>
        {#snippet children(index)}
          <CalendarWeekday {index} />
        {/snippet}
      </CalendarWeekdays>
      <CalendarWeeks>
        {#snippet children(cell)}
          <CalendarDay value={cell.date} />
        {/snippet}
      </CalendarWeeks>
    </CalendarGrid>
  </DatePickerContent>
</DatePicker>`

  const formCode = `<script lang="ts">
  let submitted = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    submitted = String(new FormData(event.currentTarget).get("due") ?? "")
  }
<\/script>

<form class="flex w-full max-w-xs flex-col gap-3" onsubmit={onSubmit}>
  <Field name="due">
    <FieldLabel>Due date</FieldLabel>
    <DatePicker required>
      <div>
        <DatePickerInput />
        <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
      </div>
      <DatePickerContent>
        <div>
          <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
          <CalendarHeading />
          <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
        </div>
        <CalendarGrid>
          <CalendarWeekdays>
            {#snippet children(index)}
              <CalendarWeekday {index} />
            {/snippet}
          </CalendarWeekdays>
          <CalendarWeeks>
            {#snippet children(cell)}
              <CalendarDay value={cell.date} />
            {/snippet}
          </CalendarWeeks>
        </CalendarGrid>
      </DatePickerContent>
    </DatePicker>
    <FieldDescription>When the invoice is due.</FieldDescription>
    <FieldError match="valueMissing">Choose a due date.</FieldError>
  </Field>
  <div><Button type="submit" size="sm">Submit</Button></div>
</form>

{#if submitted}
  <p class="text-sm text-muted">Submitted due={submitted}</p>
{/if}`

  let controlledValue = $state<DatePickerValue>("2026-10-16")
  let controlledOpen = $state(false)
  let rangeRow: HTMLElement | undefined = $state()
  let submitted = $state("")
  const picker = createDatePickerController()

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    submitted = String(new FormData(event.currentTarget).get("due") ?? "")
  }
</script>

<svelte:head>
  <title>Date Picker — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Date Picker"
  description="A text field that parses dates in the reader's language, with a calendar popup for choosing one. Wraps the ui-sdk Date Picker: ISO string values, ranges, presets and form submission, with no date library."
  entry="@ui-sdk/svelte/date-picker"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the picker parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/date-picker</code>.
      The calendar parts inside the popup come from
      <code class="font-mono text-accent">#lib/components/calendar</code> and are also
      re-exported from the date-picker barrel, so one import is enough.
      <code class="font-mono text-accent">createDatePickerController</code> and the value
      types come from the same barrel.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the input and the trigger in a plain <code class="font-mono text-accent">div</code>:
      the root styles that row as the field, and widens it when a second input is beside the first.
      <code class="font-mono text-accent">DatePickerHint</code> writes the format to type, like MM/DD/YYYY.
      Inside <code class="font-mono text-accent">DatePickerContent</code>, the first
      <code class="font-mono text-accent">div</code> becomes the header row and a
      <code class="font-mono text-accent">div</code> holding presets becomes the footer row.
      Values are ISO date strings such as <code class="font-mono text-accent">"2026-10-16"</code>,
      or <code class="font-mono text-accent">[start, end]</code> in range mode.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Type a date and press Enter, or open the calendar and choose a day. The field formats the date once it is committed." code={usageCode}>
      <DatePicker defaultValue="2026-10-16" today="2026-10-16">
        <div>
          <DatePickerInput aria-label="Due date" />
          <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
        </div>
        <DatePickerHint />
        <DatePickerContent>
          <div>
            <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
            <CalendarHeading />
            <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
          </div>
          <CalendarGrid>
            <CalendarWeekdays>
              {#snippet children(index)}
                <CalendarWeekday {index} />
              {/snippet}
            </CalendarWeekdays>
            <CalendarWeeks>
              {#snippet children(cell)}
                <CalendarDay value={cell.date} />
              {/snippet}
            </CalendarWeeks>
          </CalendarGrid>
        </DatePickerContent>
      </DatePicker>
    </Demo>

    <Demo title="Range, two months" description="mode='range' gives each end its own input. The popup stays open after the start and closes once the end is chosen. anchor centers it under the whole row." code={rangeCode}>
      <DatePicker
        mode="range"
        months={2}
        pageBy="page"
        monthFormat="short"
        today="2026-10-16"
        defaultValue={["2026-10-12", "2026-10-16"]}
      >
        <div bind:this={rangeRow}>
          <DatePickerInput aria-label="Check in" />
          <span class="shrink-0 text-muted">–</span>
          <DatePickerInput end aria-label="Check out" />
          <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
        </div>
        <DatePickerContent anchor={rangeRow} align="center">
          <div>
            <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
            <CalendarHeading />
            <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
          </div>
          <div class="flex flex-wrap items-start justify-center gap-4">
            {#each [0, 1] as offset (offset)}
              <CalendarGrid {offset}>
                <CalendarWeekdays>
                  {#snippet children(index)}
                    <CalendarWeekday {index} />
                  {/snippet}
                </CalendarWeekdays>
                <CalendarWeeks>
                  {#snippet children(cell)}
                    <CalendarDay value={cell.date} />
                  {/snippet}
                </CalendarWeeks>
              </CalendarGrid>
            {/each}
          </div>
        </DatePickerContent>
      </DatePicker>
    </Demo>

    <Demo title="Presets" description="A preset selects its value and closes the popup. It shows aria-pressed and data-selected while it matches the selection. Your application works out the relative dates." code={presetsCode}>
      <DatePicker mode="range" today="2026-10-16">
        <div>
          <DatePickerInput aria-label="Check in" />
          <span class="shrink-0 text-muted">–</span>
          <DatePickerInput end aria-label="Check out" />
          <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
        </div>
        <DatePickerContent>
          <div>
            <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
            <CalendarHeading />
            <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
          </div>
          <CalendarGrid>
            <CalendarWeekdays>
              {#snippet children(index)}
                <CalendarWeekday {index} />
              {/snippet}
            </CalendarWeekdays>
            <CalendarWeeks>
              {#snippet children(cell)}
                <CalendarDay value={cell.date} />
              {/snippet}
            </CalendarWeeks>
          </CalendarGrid>
          <div>
            <DatePickerPreset value={["2026-10-10", "2026-10-16"]}>Last 7 days</DatePickerPreset>
            <DatePickerPreset value={["2026-09-17", "2026-10-16"]}>Last 30 days</DatePickerPreset>
            <DatePickerPreset value={["2026-10-01", "2026-10-31"]}>This month</DatePickerPreset>
          </div>
        </DatePickerContent>
      </DatePicker>
    </Demo>

    <Demo title="Clear" description="DatePickerClear empties the value and focuses the input. It hides itself with data-empty while there is nothing to clear." code={clearCode}>
      <DatePicker defaultValue="2026-10-16" today="2026-10-16">
        <div>
          <DatePickerInput aria-label="Due date" />
          <DatePickerClear aria-label="Clear date"><X aria-hidden="true" /></DatePickerClear>
          <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
        </div>
        <DatePickerHint />
        <DatePickerContent>
          <div>
            <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
            <CalendarHeading />
            <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
          </div>
          <CalendarGrid>
            <CalendarWeekdays>
              {#snippet children(index)}
                <CalendarWeekday {index} />
              {/snippet}
            </CalendarWeekdays>
            <CalendarWeeks>
              {#snippet children(cell)}
                <CalendarDay value={cell.date} />
              {/snippet}
            </CalendarWeeks>
          </CalendarGrid>
        </DatePickerContent>
      </DatePicker>
    </Demo>

    <Demo title="Controlled" description="The value, the displayed month and the open state are separate. bind:value, bind:month and bind:open each control one of them." code={controlledCode}>
      <div class="flex flex-col items-start gap-3">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => (controlledValue = "2026-12-25")}>Christmas</Button>
          <Button size="sm" tone="outline" onclick={() => (controlledOpen = !controlledOpen)}>Toggle calendar</Button>
        </div>
        <DatePicker bind:value={controlledValue} bind:open={controlledOpen} today="2026-10-16">
          <div>
            <DatePickerInput aria-label="Due date" />
            <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
          </div>
          <DatePickerHint />
          <DatePickerContent>
            <div>
              <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
              <CalendarHeading />
              <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
            </div>
            <CalendarGrid>
              <CalendarWeekdays>
                {#snippet children(index)}
                  <CalendarWeekday {index} />
                {/snippet}
              </CalendarWeekdays>
              <CalendarWeeks>
                {#snippet children(cell)}
                  <CalendarDay value={cell.date} />
                {/snippet}
              </CalendarWeeks>
            </CalendarGrid>
          </DatePickerContent>
        </DatePicker>
        <p class="text-sm text-muted">value: {controlledValue ?? "null"} · open: {controlledOpen}</p>
      </div>
    </Demo>

    <Demo title="Controller" description="createDatePickerController() sets the value, turns the months, opens and closes the popup, and focuses a date from anywhere." code={controllerCode}>
      <div class="flex flex-col items-start gap-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => picker.setValue("2026-12-25")}>Choose Christmas</Button>
          <Button size="sm" tone="outline" onclick={() => picker.open()}>Open</Button>
          <Button size="sm" tone="outline" onclick={() => picker.close()}>Close</Button>
        </div>
        <DatePicker controller={picker} defaultValue="2026-10-16" today="2026-10-16">
          <div>
            <DatePickerInput aria-label="Due date" />
            <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
          </div>
          <DatePickerHint />
          <DatePickerContent>
            <div>
              <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
              <CalendarHeading />
              <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
            </div>
            <CalendarGrid>
              <CalendarWeekdays>
                {#snippet children(index)}
                  <CalendarWeekday {index} />
                {/snippet}
              </CalendarWeekdays>
              <CalendarWeeks>
                {#snippet children(cell)}
                  <CalendarDay value={cell.date} />
                {/snippet}
              </CalendarWeeks>
            </CalendarGrid>
          </DatePickerContent>
        </DatePicker>
      </div>
    </Demo>

    <Demo title="Min, max and unavailable" description="The bounds apply to typing, the calendar, presets and the controller alike. Type 11/21/2026, then 10/17/2026: both are refused. 10/19/2026 is accepted." code={limitsCode}>
      <DatePicker
        defaultValue="2026-10-16"
        today="2026-10-16"
        min="2026-10-05"
        max="2026-11-20"
        unavailable={[{ weekday: [0, 6] }]}
      >
        <div>
          <DatePickerInput aria-label="Delivery date" />
          <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
        </div>
        <DatePickerHint>
          {#snippet children(state)}
            Like {state.example}
          {/snippet}
        </DatePickerHint>
        <DatePickerContent>
          <div>
            <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
            <CalendarHeading />
            <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
          </div>
          <CalendarGrid>
            <CalendarWeekdays>
              {#snippet children(index)}
                <CalendarWeekday {index} />
              {/snippet}
            </CalendarWeekdays>
            <CalendarWeeks>
              {#snippet children(cell)}
                <CalendarDay value={cell.date} />
              {/snippet}
            </CalendarWeeks>
          </CalendarGrid>
        </DatePickerContent>
      </DatePicker>
    </Demo>

    <Demo title="Language" description="locale sets the input's format, the hint, the month names and the date labels. Type 3.12.2026 and press Enter. Values stay Gregorian ISO dates." code={localeCode}>
      <DatePicker locale="de-DE" defaultValue="2026-10-16" today="2026-10-16">
        <div>
          <DatePickerInput aria-label="Fälligkeitsdatum" />
          <DatePickerTrigger aria-label="Kalender öffnen"><Calendar aria-hidden="true" /></DatePickerTrigger>
        </div>
        <DatePickerHint />
        <DatePickerContent>
          <div>
            <CalendarPrevious aria-label="Voriger Monat"><ChevronLeft aria-hidden="true" /></CalendarPrevious>
            <CalendarHeading />
            <CalendarNext aria-label="Nächster Monat"><ChevronRight aria-hidden="true" /></CalendarNext>
          </div>
          <CalendarGrid>
            <CalendarWeekdays>
              {#snippet children(index)}
                <CalendarWeekday {index} />
              {/snippet}
            </CalendarWeekdays>
            <CalendarWeeks>
              {#snippet children(cell)}
                <CalendarDay value={cell.date} />
              {/snippet}
            </CalendarWeeks>
          </CalendarGrid>
        </DatePickerContent>
      </DatePicker>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="DatePicker mode"
      rows={[
        { name: "single", type: "default", description: "One ISO date or null, with one input." },
        { name: "range", type: "string", description: "[start, end] or null, with an input for each end. The value stays null until both ends are valid." },
      ]}
    />
    <PropsTable
      caption="presentation"
      rows={[
        { name: "auto", type: "default", description: "A sheet on small touch screens, a popover elsewhere." },
        { name: "popover", type: "string", description: "Always the anchored popup." },
        { name: "sheet", type: "string", description: "Always the sheet that slides up from the bottom of the screen." },
      ]}
    />
    <PropsTable
      caption="Closing behaviour"
      rows={[
        { name: "closeOnSelect", type: "boolean", default: "true", description: "Whether picking a date, finishing a range or pressing a preset closes the popup." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, an outside press, focus leaving, the back gesture or a swipe can close it. The trigger and the controller always can." },
        { name: "onDismissAttempt", type: "({ reason, event }) => void", description: "Runs when dismissible refused a dismissal made on purpose, so you can ask what is missing." },
      ]}
    />

    <Demo title="Disabled and read-only" description="disabled stops typing, opening and selection. readOnly lets people open the calendar and read its dates without changing the value." code={statesCode}>
      <div class="flex flex-wrap items-start gap-6">
        <DatePicker disabled defaultValue="2026-10-16" today="2026-10-16">
          <div>
            <DatePickerInput aria-label="Disabled date" />
            <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
          </div>
          <DatePickerHint />
          <DatePickerContent>
            <div>
              <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
              <CalendarHeading />
              <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
            </div>
            <CalendarGrid>
              <CalendarWeekdays>
                {#snippet children(index)}
                  <CalendarWeekday {index} />
                {/snippet}
              </CalendarWeekdays>
              <CalendarWeeks>
                {#snippet children(cell)}
                  <CalendarDay value={cell.date} />
                {/snippet}
              </CalendarWeeks>
            </CalendarGrid>
          </DatePickerContent>
        </DatePicker>
        <DatePicker readOnly defaultValue="2026-10-16" today="2026-10-16">
          <div>
            <DatePickerInput aria-label="Read-only date" />
            <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
          </div>
          <DatePickerHint />
          <DatePickerContent>
            <div>
              <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
              <CalendarHeading />
              <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
            </div>
            <CalendarGrid>
              <CalendarWeekdays>
                {#snippet children(index)}
                  <CalendarWeekday {index} />
                {/snippet}
              </CalendarWeekdays>
              <CalendarWeeks>
                {#snippet children(cell)}
                  <CalendarDay value={cell.date} />
                {/snippet}
              </CalendarWeeks>
            </CalendarGrid>
          </DatePickerContent>
        </DatePicker>
      </div>
    </Demo>

    <Demo title="Staying open" description="closeOnSelect={false} keeps the calendar open after a date, a finished range or a preset, for comparing several choices." code={stayOpenCode}>
      <DatePicker closeOnSelect={false} defaultValue="2026-10-16" today="2026-10-16">
        <div>
          <DatePickerInput aria-label="Due date" />
          <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
        </div>
        <DatePickerHint />
        <DatePickerContent>
          <div>
            <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
            <CalendarHeading />
            <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
          </div>
          <CalendarGrid>
            <CalendarWeekdays>
              {#snippet children(index)}
                <CalendarWeekday {index} />
              {/snippet}
            </CalendarWeekdays>
            <CalendarWeeks>
              {#snippet children(cell)}
                <CalendarDay value={cell.date} />
              {/snippet}
            </CalendarWeeks>
          </CalendarGrid>
        </DatePickerContent>
      </DatePicker>
    </Demo>

    <Demo title="In a form" description="name submits an ISO date. In a Field, the label, description and errors connect to the input, and required blocks an empty submission. A form reset restores defaultValue." code={formCode}>
      <div class="flex flex-col items-start gap-3">
        <form class="flex w-full max-w-xs flex-col gap-3" onsubmit={onSubmit}>
          <Field name="due">
            <FieldLabel>Due date</FieldLabel>
            <DatePicker required>
              <div>
                <DatePickerInput />
                <DatePickerTrigger><Calendar aria-hidden="true" /></DatePickerTrigger>
              </div>
              <DatePickerContent>
                <div>
                  <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
                  <CalendarHeading />
                  <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
                </div>
                <CalendarGrid>
                  <CalendarWeekdays>
                    {#snippet children(index)}
                      <CalendarWeekday {index} />
                    {/snippet}
                  </CalendarWeekdays>
                  <CalendarWeeks>
                    {#snippet children(cell)}
                      <CalendarDay value={cell.date} />
                    {/snippet}
                  </CalendarWeeks>
                </CalendarGrid>
              </DatePickerContent>
            </DatePicker>
            <FieldDescription>When the invoice is due.</FieldDescription>
            <FieldError match="valueMissing">Choose a due date.</FieldError>
          </Field>
          <div><Button type="submit" size="sm">Submit</Button></div>
        </form>
        {#if submitted}
          <p class="text-sm text-muted">Submitted due={submitted}</p>
        {/if}
      </div>
    </Demo>

    <p class="text-sm text-muted">
      State attributes for styling: the root sets
      <code class="font-mono text-accent">data-mode</code>,
      <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-disabled</code> and
      <code class="font-mono text-accent">data-invalid</code>;
      the input sets <code class="font-mono text-accent">data-invalid</code> and
      <code class="font-mono text-accent">data-disabled</code>;
      the trigger sets <code class="font-mono text-accent">data-open</code>;
      the content sets <code class="font-mono text-accent">data-presentation</code>,
      <code class="font-mono text-accent">data-starting-style</code> and
      <code class="font-mono text-accent">data-ending-style</code>;
      Clear sets <code class="font-mono text-accent">data-empty</code> and a preset sets
      <code class="font-mono text-accent">data-selected</code>.
      Days carry the <a class="text-accent underline" href="/docs/calendar">Calendar</a> attributes.
      Every part also has a <code class="font-mono text-accent">data-slot</code>, such as
      <code class="font-mono text-accent">date-picker-input</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="DatePicker (root)"
      rows={[
        { name: "mode", type: '"single" | "range"', default: '"single"', description: "One date, or a range with an input for each end." },
        { name: "value", type: "DatePickerValue", description: "An ISO date, [start, end] in range mode, or null. Bind with bind:value to control." },
        { name: "defaultValue", type: "DatePickerValue", description: "The value it starts with when uncontrolled, and returns to on a form reset." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs on a day press, a typed date committed on Enter or blur, a preset, Clear, a form reset or a controller write. details.cancel() keeps the value." },
        { name: "month", type: "ISOMonth", description: 'The first month shown, like "2026-10". Bind with bind:month to control.' },
        { name: "defaultMonth", type: "string", description: "The first month shown when uncontrolled. Defaults to the selected date's month, else today's." },
        { name: "onMonthChange", type: "(month, details) => void", description: "Runs when the months shown want to change, including when a typed date or a preset turns them." },
        { name: "open", type: "boolean", description: "Whether the popup is open. Bind with bind:open to control." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Whether the popup starts open when uncontrolled." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when the popup wants to open or close. details.reason says why; details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs once the popup has finished opening or closing, after any animation." },
        { name: "closeOnSelect", type: "boolean", default: "true", description: "Whether a pick, a finished range or a preset closes the popup." },
        { name: "presentation", type: '"auto" | "popover" | "sheet"', default: '"auto"', description: "How the popup presents. A sheet slides up from the bottom of the screen." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, an outside press, focus leaving, the back gesture or a swipe can close it." },
        { name: "onDismissAttempt", type: "({ reason, event }) => void", description: "Runs when dismissible refused an intentional dismissal." },
        { name: "min", type: "string", description: "The earliest date that can be typed or picked." },
        { name: "max", type: "string", description: "The latest date that can be typed or picked." },
        { name: "unavailable", type: "DateMatchers", description: "ISO dates, { from, to }, { weekday: [0, 6] }, { before }, { after }, a predicate, or an array. A preset holding one is disabled." },
        { name: "disabled", type: "boolean", default: "false", description: "Nothing can be typed, opened or picked." },
        { name: "readOnly", type: "boolean", default: "false", description: "The calendar opens and its dates can be read, but the value never changes." },
        { name: "months", type: "number", default: "1", description: "How many months show side by side, each in its own grid." },
        { name: "pageBy", type: '"month" | "page"', default: '"month"', description: "Whether navigation turns one month or all the months shown." },
        { name: "locale", type: "string", description: "Language of the input format, hint, names and labels. Defaults to the page's lang, then the browser's." },
        { name: "weekStartsOn", type: "number", description: "First day of the week, 0 for Sunday. Defaults to the locale's." },
        { name: "weekdayFormat", type: '"long" | "short" | "narrow"', default: '"short"', description: "How weekday headers are written." },
        { name: "monthFormat", type: '"long" | "short" | "narrow"', default: '"long"', description: "How month names are written in the heading and month select." },
        { name: "fixedWeeks", type: "boolean", default: "false", description: "Every month shows six weeks, so the popup never changes height." },
        { name: "showOutsideDays", type: "boolean", default: "true", description: "Whether the neighbouring months' days show at the edges." },
        { name: "today", type: "string", description: "Pins today's date for aria-current and the starting month. Read on the client otherwise." },
        { name: "timeZone", type: "string", description: 'The zone that decides what day today is, like "America/New_York".' },
        { name: "minDays", type: "number", description: "The fewest days a range can span, counting both ends." },
        { name: "maxDays", type: "number", description: "The most days a range can span, counting both ends." },
        { name: "allowUnavailable", type: "boolean", default: "false", description: "Whether a range may hold unavailable dates between its ends, never as an end." },
        { name: "name", type: "string", description: "The name the ISO date submits under. In range mode both ends submit under it unless startName and endName are set." },
        { name: "startName", type: "string", description: "The name a range's start submits under." },
        { name: "endName", type: "string", description: "The name a range's end submits under." },
        { name: "form", type: "string", description: "The id of the form it belongs to, when it sits outside it." },
        { name: "required", type: "boolean", default: "false", description: "Whether a date must be entered before its form submits." },
        { name: "container", type: "PopupContainer", description: "Renders the popup into this element instead of in place. Nested popups stay inside their parent." },
        { name: "controller", type: "DatePickerController", description: "Drive it from anywhere via createDatePickerController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development builds." },
      ]}
    />
    <PropsTable
      caption="DatePickerInput"
      rows={[
        { name: "end", type: "boolean", default: "false", description: "Whether it holds a range's end. The input without it holds the start, or the single date." },
        { name: "aria-label", type: "string", description: "Accessible name when no Field label is connected to it." },
        { name: "class", type: "string", description: "Extra classes merged onto the input." },
      ]}
    />
    <PropsTable
      caption="DatePickerTrigger"
      rows={[
        { name: "aria-label", type: "string", description: 'Defaults to an English label naming the chosen date. Pass it to translate.' },
        { name: "children", type: "Snippet<[DatePickerTriggerState]>", description: "Receives { open, disabled }. Without it the part renders a calendar icon." },
      ]}
    />
    <PropsTable
      caption="DatePickerHint"
      rows={[
        { name: "children", type: "Snippet<[DatePickerHintState]>", description: "Receives the format letters, like MM/DD/YYYY or TT.MM.JJJJ, and example, December 31 of this year written in that format. Without it the part renders the format letters." },
        { name: "class", type: "string", description: "Extra classes merged onto the span that describes the input." },
      ]}
    />
    <PropsTable
      caption="DatePickerClear"
      rows={[
        { name: "aria-label", type: "string", description: 'Accessible name, like "Clear date".' },
        { name: "children", type: "Snippet<[DatePickerClearState]>", description: "Receives { empty, disabled }. Without it the part renders an × icon." },
      ]}
    />
    <PropsTable
      caption="DatePickerContent"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the input it opens on. Flips when there is no room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How it lines up along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "0", description: "Gap between the input and the popup, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the input, in pixels." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space to keep from the viewport edges, in pixels." },
        { name: "arrowPadding", type: "number", default: "0", description: "Space between an arrow and the popup's corners, in pixels." },
        { name: "anchor", type: "string | Anchor | null", description: "Positions against this instead of the trigger: an element, a selector, a point like { x, y }, or anything with getBoundingClientRect()." },
        { name: "container", type: "PopupContainer", description: "Renders the popup into this element instead of in place." },
        { name: "finalFocus", type: "PopupFocusTarget", description: "Where focus goes when it closes while focus is inside it." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Whether it stays in the page, hidden, while closed." },
        { name: "children", type: "Snippet<[DatePickerContentState]>", description: "Receives { open, presentation }. Without it the part renders the header row and a grid for each month." },
      ]}
    />
    <PropsTable
      caption="DatePickerPreset"
      rows={[
        { name: "value", type: "DatePickerValue", description: "The value it selects: an ISO date, or [start, end] in range mode. Required." },
        { name: "children", type: "Snippet<[DatePickerPresetState]>", description: "Receives { selected, disabled }. Its label is what you write between the tags." },
      ]}
    />
    <PropsTable
      caption="Calendar parts inside the popup"
      rows={[
        { name: "CalendarPrevious / CalendarNext", type: "component", description: "Turn the months. tone is ghost, outline or solid." },
        { name: "CalendarHeading", type: "component", description: "The month name the grid is labelled by." },
        { name: "CalendarMonthSelect / CalendarYearSelect", type: "component", description: "Native selects that jump to a month." },
        { name: "CalendarGrid", type: "component", description: "One month's table. offset picks which of the months shown it is." },
        { name: "CalendarWeekdays / CalendarWeekday", type: "component", description: "The header row and one column header, written from a snippet." },
        { name: "CalendarWeeks / CalendarDay", type: "component", description: "The body rows and one day, whose value is cell.date." },
      ]}
    />
    <PropsTable
      caption="DatePickerController"
      rows={[
        { name: "getValue()", type: "() => DatePickerValue", description: "The selected value." },
        { name: "setValue(value, options?)", type: "(value, options?) => boolean", description: "Selects a value. False when canceled, unchanged, disabled, read-only, or holding a date that cannot be picked." },
        { name: "clear(options?)", type: "(options?) => boolean", description: "Selects nothing, as the Clear part does." },
        { name: "getMonth() / setMonth(month, options?)", type: "() => string / (month, options?) => boolean", description: "Reads or sets the first month shown." },
        { name: "previous(options?) / next(options?)", type: "(options?) => boolean", description: "Turns the months, as the navigation parts do." },
        { name: "focus(date?)", type: "(date?) => void", description: "Focuses a date in the open calendar, turning the months to show it, or the date with the tab stop." },
        { name: "isOpen() / setOpen(open, options?)", type: "() => boolean / (open, options?) => boolean", description: "Reads or sets whether the popup is open." },
        { name: "open(options?)", type: "(options?) => Promise", description: "Opens, and resolves once it closes, with why and how. Accepts a signal, and resolves with reason 'unmount' if the picker leaves the page." },
        { name: "close(options?) / toggle(options?)", type: "(options?) => boolean", description: "Closes, or opens when closed and closes when open." },
      ]}
    />
    <p class="text-sm text-muted">
      Change reasons on <code class="font-mono text-accent">onValueChange</code>:
      <code class="font-mono text-accent">item-press</code>,
      <code class="font-mono text-accent">input-commit</code>,
      <code class="font-mono text-accent">preset-press</code>,
      <code class="font-mono text-accent">clear-press</code>,
      <code class="font-mono text-accent">reset</code>,
      <code class="font-mono text-accent">restore</code>,
      <code class="font-mono text-accent">imperative</code>.
      On <code class="font-mono text-accent">onOpenChange</code> they also include
      <code class="font-mono text-accent">trigger-press</code>,
      <code class="font-mono text-accent">outside-press</code>,
      <code class="font-mono text-accent">escape-key</code>,
      <code class="font-mono text-accent">focus-out</code>,
      <code class="font-mono text-accent">window-blur</code>,
      <code class="font-mono text-accent">close-press</code>,
      <code class="font-mono text-accent">back</code> and
      <code class="font-mono text-accent">swipe</code>.
    </p>
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA date picker dialog: a plain text input every screen reader handles, a trigger button with <code class="font-mono text-accent">aria-haspopup="dialog"</code> and <code class="font-mono text-accent">aria-expanded</code> named by the chosen date, and a dialog holding the calendar's grid.</li>
      <li>The input parses what is typed on <span class="text-fg">Enter</span> or on leaving the field, using the locale's order. It also accepts ISO dates, digits without separators, two-digit years and month names. A date without a year uses the current year.</li>
      <li>Text that is not a date stays as typed and sets <code class="font-mono text-accent">aria-invalid</code> and <code class="font-mono text-accent">data-invalid</code>, keeping the previous value. The input reports "Enter a valid date." as its validation message, so its form will not submit until the text is a date again or empty.</li>
      <li><code class="font-mono text-accent">DatePickerHint</code> is a span that describes the input, so the format to type is heard rather than guessed.</li>
      <li><span class="text-fg">Alt+Down Arrow</span> in the input opens the calendar. <span class="text-fg">Enter/Space</span> on the trigger opens or closes it.</li>
      <li>Opening focuses the selected date, otherwise today, otherwise the first focusable date. The calendar's arrow keys, Home/End and Page Up/Page Down work inside the popup, and an ancestor's <code class="font-mono text-accent">dir="rtl"</code> reverses Left and Right Arrow.</li>
      <li><span class="text-fg">Escape</span> cancels an unfinished range first, then closes the popup. <span class="text-fg">Tab</span> moves through the controls and closes it on leaving, when dismissal is allowed. Picking a day fills the input, closes the dialog and returns focus to the trigger.</li>
      <li>In range mode each end can be typed, an end before the start is invalid, and the value changes only once both ends are set. Clearing either input clears the whole value while leaving the other date visible.</li>
      <li>Presets expose <code class="font-mono text-accent">aria-pressed</code>, and a preset holding a date that cannot be picked is disabled. Clear empties the value and focuses the input.</li>
      <li><code class="font-mono text-accent">required</code> blocks an empty submission, a form reset restores <code class="font-mono text-accent">defaultValue</code>, and a disabled <code class="font-mono text-accent">fieldset</code> or Field disables the picker. Hidden inputs submit the initial value on the server before hydration too.</li>
      <li>The trigger, popup and calendar navigation have English accessible labels by default. Pass <code class="font-mono text-accent">aria-label</code> to translate them alongside <code class="font-mono text-accent">locale</code>.</li>
    </ul>
  </Section>
</div>