<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Calendar,
    CalendarPrevious,
    CalendarHeading,
    CalendarNext,
    CalendarMonthSelect,
    CalendarYearSelect,
    CalendarGrid,
    CalendarWeekdays,
    CalendarWeekday,
    CalendarWeeks,
    CalendarDay,
    createCalendarController,
    type CalendarValue,
  } from "#lib/components/calendar"
  import { Button } from "#lib/components/button"
  import { ChevronLeft, ChevronRight } from "@lucide/svelte"

  const installCode = `import {
  Calendar, CalendarPrevious, CalendarHeading, CalendarNext,
  CalendarGrid, CalendarWeekdays, CalendarWeekday, CalendarWeeks, CalendarDay,
} from "#lib/components/calendar"`

  const usageCode = `<script lang="ts">
  import {
    Calendar, CalendarPrevious, CalendarHeading, CalendarNext,
    CalendarGrid, CalendarWeekdays, CalendarWeekday, CalendarWeeks, CalendarDay,
  } from "#lib/components/calendar"
  import { ChevronLeft, ChevronRight } from "@lucide/svelte"
<\/script>

<Calendar defaultValue="2026-10-16" today="2026-10-16">
  <div class="flex items-center justify-between gap-1">
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
</Calendar>`

  const rangeCode = `<Calendar
  mode="range"
  months={2}
  pageBy="page"
  monthFormat="short"
  today="2026-10-16"
  defaultValue={["2026-10-12", "2026-10-16"]}
>
  <div class="flex items-center justify-between gap-1">
    <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
    <CalendarHeading />
    <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
  </div>
  <div class="flex flex-wrap items-start justify-center gap-6">
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
</Calendar>`

  const multipleCode = `<script lang="ts">
  let dates = $state<string[]>(["2026-10-07", "2026-10-16", "2026-10-26"])
<\/script>

<Calendar
  mode="multiple"
  today="2026-10-16"
  value={dates}
  onValueChange={(value) => (dates = value as string[])}
>
  <div class="flex items-center justify-between gap-1">
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
</Calendar>

<p class="text-sm text-muted">{dates.length} dates selected</p>`

  const controlledCode = `<script lang="ts">
  import type { CalendarValue } from "#lib/components/calendar"
  let value = $state<CalendarValue>("2026-10-16")
  let month = $state("2026-10")
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => (value = "2026-10-20")}>Pick the 20th</Button>
  <Button size="sm" tone="outline" onclick={() => (month = "2026-12")}>Show December</Button>
</div>
<Calendar bind:value bind:month today="2026-10-16">
  <div class="flex items-center justify-between gap-1">
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
</Calendar>

<p class="text-sm text-muted">value: {String(value)} · month: {month}</p>`

  const selectsCode = `<Calendar defaultMonth="1990-06" min="1920-01-01" max="2026-10-16" today="2026-10-16">
  <div class="flex items-center justify-between gap-1">
    <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
    <div class="flex min-w-0 flex-1 gap-1">
      <CalendarMonthSelect aria-label="Month" />
      <CalendarYearSelect aria-label="Year" />
    </div>
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
</Calendar>`

  const controllerCode = `<script lang="ts">
  import { createCalendarController } from "#lib/components/calendar"
  const calendar = createCalendarController()

  function select(date: string) {
    calendar.setValue(date)
    calendar.focus(date)
  }
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => select("2026-12-25")}>Go to Christmas</Button>
  <Button size="sm" tone="outline" onclick={() => select("2026-10-16")}>Back to today</Button>
</div>
<Calendar controller={calendar} defaultValue="2026-10-16" defaultMonth="2026-10" today="2026-10-16">
  <div class="flex items-center justify-between gap-1">
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
</Calendar>`

  const limitsCode = `<Calendar
  defaultValue="2026-10-16"
  today="2026-10-16"
  min="2026-10-05"
  max="2026-11-20"
  unavailable={["2026-10-08", { from: "2026-10-20", to: "2026-10-23" }, { weekday: [0, 6] }]}
>
  <div class="flex items-center justify-between gap-1">
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
</Calendar>`

  const disabledCode = `<div class="flex flex-wrap items-start justify-center gap-6">
  <Calendar disabled defaultValue="2026-10-16" today="2026-10-16">
    <div class="flex items-center justify-between gap-1">
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
  </Calendar>
  <Calendar readOnly defaultValue="2026-10-16" today="2026-10-16">
    <div class="flex items-center justify-between gap-1">
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
  </Calendar>
</div>`

  const fixedWeeksCode = `<Calendar fixedWeeks showOutsideDays={false} defaultMonth="2026-02" today="2026-10-16">
  <div class="flex items-center justify-between gap-1">
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
</Calendar>`

  let controlledValue = $state<CalendarValue>("2026-10-16")
  let controlledMonth = $state("2026-10")
  let dates = $state<string[]>(["2026-10-07", "2026-10-16", "2026-10-26"])
  const calendar = createCalendarController()

  function select(date: string) {
    calendar.setValue(date)
    calendar.focus(date)
  }
</script>

<svelte:head>
  <title>Calendar — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Calendar"
  description="A month grid for choosing one date, several dates, or a range. Wraps the ui-sdk Calendar: one tab stop, arrow-key navigation, ISO string values and no date library."
  entry="@ui-sdk/svelte/calendar"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/calendar</code>.
      The controller creator and the value types are re-exported from the same barrel.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Values are ISO date strings like <code class="font-mono text-accent">"2026-10-16"</code>,
      with no time or time zone attached. The weekday and week helpers render the table
      structure; you render each header and day from their snippets. An empty
      <code class="font-mono text-accent">Calendar</code> renders the whole default structure,
      and an empty <code class="font-mono text-accent">CalendarGrid</code> renders its headers and weeks.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Choose a date, then use Previous or Next to change the month. Arrow keys move through the days." code={usageCode}>
      <Calendar defaultValue="2026-10-16" today="2026-10-16">
        <div class="flex items-center justify-between gap-1">
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
      </Calendar>
    </Demo>

    <Demo title="Range, two months" description="mode='range' previews the range as you move. Escape cancels an unfinished range." code={rangeCode}>
      <Calendar
        mode="range"
        months={2}
        pageBy="page"
        monthFormat="short"
        today="2026-10-16"
        defaultValue={["2026-10-12", "2026-10-16"]}
      >
        <div class="flex items-center justify-between gap-1">
          <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
          <CalendarHeading />
          <CalendarNext><ChevronRight aria-hidden="true" /></CalendarNext>
        </div>
        <div class="flex flex-wrap items-start justify-center gap-6">
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
      </Calendar>
    </Demo>

    <Demo title="Multiple" description="mode='multiple' toggles each date. Its value is always a sorted array." code={multipleCode}>
      <div class="flex flex-col items-center gap-3">
        <Calendar
          mode="multiple"
          today="2026-10-16"
          value={dates}
          onValueChange={(value) => (dates = value as string[])}
        >
          <div class="flex items-center justify-between gap-1">
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
        </Calendar>
        <p class="text-sm text-muted">{dates.length} dates selected</p>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:value and bind:month control the selection and the displayed month separately." code={controlledCode}>
      <div class="flex flex-col items-center gap-3">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => (controlledValue = "2026-10-20")}>Pick the 20th</Button>
          <Button size="sm" tone="outline" onclick={() => (controlledMonth = "2026-12")}>Show December</Button>
        </div>
        <Calendar bind:value={controlledValue} bind:month={controlledMonth} today="2026-10-16">
          <div class="flex items-center justify-between gap-1">
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
        </Calendar>
        <p class="text-sm text-muted">value: {String(controlledValue)} · month: {controlledMonth}</p>
      </div>
    </Demo>

    <Demo title="Month and year selects" description="Native selects jump straight to a month, for a birthday. Years run from min to max." code={selectsCode}>
      <Calendar defaultMonth="1990-06" min="1920-01-01" max="2026-10-16" today="2026-10-16">
        <div class="flex items-center justify-between gap-1">
          <CalendarPrevious><ChevronLeft aria-hidden="true" /></CalendarPrevious>
          <div class="flex min-w-0 flex-1 gap-1">
            <CalendarMonthSelect aria-label="Month" />
            <CalendarYearSelect aria-label="Year" />
          </div>
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
      </Calendar>
    </Demo>

    <Demo title="Controller" description="createCalendarController() sets the value and moves focus from anywhere, turning the months to show the date." code={controllerCode}>
      <div class="flex flex-col items-center gap-3">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => select("2026-12-25")}>Go to Christmas</Button>
          <Button size="sm" tone="outline" onclick={() => select("2026-10-16")}>Back to today</Button>
        </div>
        <Calendar controller={calendar} defaultValue="2026-10-16" defaultMonth="2026-10" today="2026-10-16">
          <div class="flex items-center justify-between gap-1">
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
        </Calendar>
      </div>
    </Demo>

    <Demo title="Min, max and unavailable" description="Bounds stop the keys and the month buttons. Unavailable days stay focusable so they can be heard." code={limitsCode}>
      <Calendar
        defaultValue="2026-10-16"
        today="2026-10-16"
        min="2026-10-05"
        max="2026-11-20"
        unavailable={["2026-10-08", { from: "2026-10-20", to: "2026-10-23" }, { weekday: [0, 6] }]}
      >
        <div class="flex items-center justify-between gap-1">
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
      </Calendar>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="CalendarPrevious / CalendarNext tone"
      rows={[
        { name: "ghost", type: "default", description: "Quiet icon button that tints on hover." },
        { name: "outline", type: "string", description: "Bordered icon button." },
        { name: "solid", type: "string", description: "Filled accent icon button." },
      ]}
    />
    <PropsTable
      caption="Calendar mode"
      rows={[
        { name: "single", type: "default", description: "One ISO date, or null. deselectable lets a second press clear it." },
        { name: "multiple", type: "string", description: "A sorted array of ISO dates; each press toggles one." },
        { name: "range", type: "string", description: "[start, end] or null, previewed while the end is picked." },
      ]}
    />

    <Demo title="Disabled and read-only" description="disabled removes every control. readOnly keeps navigation but never changes the value." code={disabledCode}>
      <div class="flex flex-wrap items-start justify-center gap-6">
        <Calendar disabled defaultValue="2026-10-16" today="2026-10-16">
          <div class="flex items-center justify-between gap-1">
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
        </Calendar>
        <Calendar readOnly defaultValue="2026-10-16" today="2026-10-16">
          <div class="flex items-center justify-between gap-1">
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
        </Calendar>
      </div>
    </Demo>

    <Demo title="Fixed weeks" description="fixedWeeks keeps six rows in every month so the height never changes; showOutsideDays={false} blanks the edges." code={fixedWeeksCode}>
      <Calendar fixedWeeks showOutsideDays={false} defaultMonth="2026-02" today="2026-10-16">
        <div class="flex items-center justify-between gap-1">
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
      </Calendar>
    </Demo>

    <p class="text-sm text-muted">
      Day state attributes for styling: <code class="font-mono text-accent">data-selected</code>,
      <code class="font-mono text-accent">data-today</code>,
      <code class="font-mono text-accent">data-outside</code>,
      <code class="font-mono text-accent">data-unavailable</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-range-start</code>,
      <code class="font-mono text-accent">data-range-middle</code>,
      <code class="font-mono text-accent">data-range-end</code>,
      <code class="font-mono text-accent">data-preview</code>.
      The root also sets <code class="font-mono text-accent">data-mode</code> and
      <code class="font-mono text-accent">data-readonly</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Calendar (root)"
      rows={[
        { name: "mode", type: '"single" | "multiple" | "range"', default: '"single"', description: "How many dates it selects." },
        { name: "value", type: "CalendarValue", description: "An ISO date, a sorted list, or [start, end]. Bind with bind:value to control." },
        { name: "defaultValue", type: "CalendarValue", description: "The value it starts with when uncontrolled." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs on a press or a controller write. details.cancel() keeps the value." },
        { name: "month", type: "ISOMonth", description: 'The first month shown, like "2026-10". Bind with bind:month to control.' },
        { name: "defaultMonth", type: "string", description: "The first month shown when uncontrolled. Defaults to the selected date's month, else today's." },
        { name: "onMonthChange", type: "(month, details) => void", description: "Runs when the months shown want to change." },
        { name: "min", type: "string", description: "The earliest selectable date. Keys and Previous stop there." },
        { name: "max", type: "string", description: "The latest selectable date." },
        { name: "unavailable", type: "DateMatchers", description: "ISO dates, { from, to }, { weekday: [0, 6] }, { before }, { after }, a predicate, or an array. These stay focusable." },
        { name: "disabled", type: "boolean", default: "false", description: "Nothing can be picked or focused." },
        { name: "readOnly", type: "boolean", default: "false", description: "Dates can be focused and months turned, but the value never changes." },
        { name: "deselectable", type: "boolean", default: "false", description: "A second press on the selected date clears it, in single mode." },
        { name: "months", type: "number", default: "1", description: "How many months show side by side, each in its own grid." },
        { name: "pageBy", type: '"month" | "page"', default: '"month"', description: "Whether navigation turns one month or all the months shown." },
        { name: "locale", type: "string", description: "Language of the names and labels. Defaults to the page's lang, then the browser's." },
        { name: "weekStartsOn", type: "number", description: "First day of the week, 0 for Sunday. Defaults to the locale's." },
        { name: "weekdayFormat", type: '"long" | "short" | "narrow"', default: '"short"', description: "How weekday headers are written." },
        { name: "monthFormat", type: '"long" | "short" | "narrow"', default: '"long"', description: "How month names are written in the heading and month select." },
        { name: "fixedWeeks", type: "boolean", default: "false", description: "Every month shows six weeks, so the height never changes." },
        { name: "showOutsideDays", type: "boolean", default: "true", description: "Whether the neighbouring months' days show at the edges." },
        { name: "today", type: "string", description: "Pins today's date for aria-current and the starting month. Read on the client otherwise." },
        { name: "timeZone", type: "string", description: 'The zone that decides what day today is, like "America/New_York".' },
        { name: "minDays", type: "number", description: "The fewest days a range can span, counting both ends." },
        { name: "maxDays", type: "number", description: "The most days a range can span, counting both ends." },
        { name: "allowUnavailable", type: "boolean", default: "false", description: "Whether a range may hold unavailable dates between its ends." },
        { name: "onFocusedChange", type: "(date, details) => void", description: "Runs before focus moves to another day. Canceling keeps focus." },
        { name: "onAnchorChange", type: "(anchor, details) => void", description: "Runs when a range starts, ends, or Escape drops it (null)." },
        { name: "controller", type: "CalendarController", description: "Drive it from anywhere via createCalendarController()." },
      ]}
    />
    <PropsTable
      caption="CalendarPrevious / CalendarNext"
      rows={[
        { name: "tone", type: '"ghost" | "outline" | "solid"', default: '"ghost"', description: "Visual style of the month button." },
        { name: "aria-label", type: "string", description: 'Defaults to "Previous month" / "Next month". Pass it to name them in another language.' },
        { name: "children", type: "Snippet", description: "The icon. Without it the part renders ‹ or ›." },
      ]}
    />
    <PropsTable
      caption="CalendarHeading"
      rows={[
        { name: "children", type: "Snippet<[CalendarHeadingState]>", description: "Receives { month, label }. Without it the part renders the label, like October 2026." },
        { name: "class", type: "string", description: "Extra classes merged onto the h2." },
      ]}
    />
    <PropsTable
      caption="CalendarMonthSelect / CalendarYearSelect"
      rows={[
        { name: "aria-label", type: "string", description: "Accessible name for the native select." },
        { name: "children", type: "Snippet<[CalendarSelectState]>", description: "Receives { value, options, disabled } to render your own options." },
      ]}
    />
    <PropsTable
      caption="CalendarGrid"
      rows={[
        { name: "offset", type: "number", default: "0", description: "Which of the months shown it is, from 0." },
        { name: "children", type: "Snippet<[CalendarGridState]>", description: "Receives { month, label, weekdays, weeks } to write the table yourself. Keep cells marked hidden empty." },
      ]}
    />
    <PropsTable
      caption="CalendarWeekdays / CalendarWeeks"
      rows={[
        { name: "children", type: "Snippet<[number]> / Snippet<[CalendarGridCell]>", description: "Weekdays receives each column index; Weeks receives each cell, whose date you pass to CalendarDay." },
        { name: "class", type: "string", description: "Merged onto the thead / tbody element." },
      ]}
    />
    <PropsTable
      caption="CalendarWeekday"
      rows={[
        { name: "index", type: "number", description: "The column, from 0. Required." },
        { name: "children", type: "Snippet<[CalendarWeekdayState]>", description: "Receives { weekday, label, name }. Without it the part renders the label." },
      ]}
    />
    <PropsTable
      caption="CalendarDay"
      rows={[
        { name: "value", type: "string", description: "Its ISO date, usually cell.date. Required." },
        { name: "offset", type: "number", default: "0", description: "The offset of the grid it is in. Taken from the grid context otherwise." },
        { name: "children", type: "Snippet<[CalendarDayState]>", description: "Receives { date, label, selected, today, outside, disabled, unavailable, rangeStart, rangeEnd, inRange }." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the grid of the WAI-ARIA date picker dialog: each month is a <code class="font-mono text-accent">grid</code> named by its month, weekday headers are <code class="font-mono text-accent">columnheader</code>s named by their full names, and each day is a focusable <code class="font-mono text-accent">gridcell</code> named by its full date, like "Friday, October 16, 2026".</li>
      <li>Days carry <code class="font-mono text-accent">aria-selected</code>, <code class="font-mono text-accent">aria-disabled</code> and <code class="font-mono text-accent">aria-current="date"</code> on today. A grid that selects several dates or a range is <code class="font-mono text-accent">aria-multiselectable</code>.</li>
      <li>The grid has one Tab stop: the selected date when visible, otherwise today, otherwise the first available date. Moving into another month shows it and then focuses the date.</li>
      <li><span class="text-fg">Left/Right Arrow</span> move one day, following the page's direction; <span class="text-fg">Up/Down Arrow</span> move one week; <span class="text-fg">Home/End</span> go to the first or last day of the week.</li>
      <li><span class="text-fg">Page Up/Page Down</span> move one month, keeping the day where possible; with <span class="text-fg">Shift</span> they move one year.</li>
      <li><span class="text-fg">Enter/Space</span> select the focused date. <span class="text-fg">Escape</span> cancels an unfinished range.</li>
      <li>Unavailable dates cannot be selected but stay focusable, so keyboard and screen reader users can discover them. Dates outside <code class="font-mono text-accent">min</code> and <code class="font-mono text-accent">max</code> cannot receive focus.</li>
      <li>The heading is an <code class="font-mono text-accent">h2</code> the grid is labelled by, and screen readers hear it change. Keep one in the calendar even when you render your own selects, visually hidden if you like.</li>
    </ul>
  </Section>
</div>