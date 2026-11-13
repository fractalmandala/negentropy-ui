<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    NumberInput,
    NumberInputGroup,
    NumberInputControl,
    NumberInputDecrement,
    NumberInputIncrement,
    NumberInputScrubArea,
    NumberInputScrubAreaCursor,
    createNumberInputController,
  } from "$lib/components/number-input"
  import { Button } from "$lib/components/button"
  import { Minus, Plus, MoveHorizontal, RotateCcw, Trash2 } from "@lucide/svelte"

  const installCode = `import {
  NumberInput,
  NumberInputGroup,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputIncrement,
} from "$lib/components/number-input"`

  const usageCode = `<script lang="ts">
  import {
    NumberInput,
    NumberInputGroup,
    NumberInputControl,
    NumberInputDecrement,
    NumberInputIncrement,
  } from "$lib/components/number-input"
  import { Minus, Plus } from "@lucide/svelte"
<\/script>

<div class="flex w-56 flex-col gap-1.5">
  <label for="basic-quantity" class="text-sm font-medium text-fg">Quantity</label>
  <NumberInput defaultValue={1} min={0}>
    <NumberInputGroup>
      <NumberInputDecrement aria-label="Decrease quantity">
        <Minus aria-hidden="true" />
      </NumberInputDecrement>
      <NumberInputControl id="basic-quantity" />
      <NumberInputIncrement aria-label="Increase quantity">
        <Plus aria-hidden="true" />
      </NumberInputIncrement>
    </NumberInputGroup>
  </NumberInput>
</div>`

  const boundsCode = `<div class="flex w-56 flex-col gap-1.5">
  <label for="bounds-guests" class="text-sm font-medium text-fg">Guests</label>
  <NumberInput defaultValue={2} min={1} max={8}>
    <NumberInputGroup>
      <NumberInputDecrement aria-label="Decrease guests">
        <Minus aria-hidden="true" />
      </NumberInputDecrement>
      <NumberInputControl id="bounds-guests" />
      <NumberInputIncrement aria-label="Increase guests">
        <Plus aria-hidden="true" />
      </NumberInputIncrement>
    </NumberInputGroup>
  </NumberInput>
  <p class="text-sm text-muted">Tables seat between 1 and 8 guests.</p>
</div>`

  const stepCode = `<div class="flex w-56 flex-col gap-1.5">
  <label for="step-hours" class="text-sm font-medium text-fg">Hours</label>
  <NumberInput defaultValue={1.5} min={0} max={24} step={0.25} largeStep={1} smallStep={0.05}>
    <NumberInputGroup>
      <NumberInputDecrement aria-label="Decrease hours">
        <Minus aria-hidden="true" />
      </NumberInputDecrement>
      <NumberInputControl id="step-hours" />
      <NumberInputIncrement aria-label="Increase hours">
        <Plus aria-hidden="true" />
      </NumberInputIncrement>
    </NumberInputGroup>
  </NumberInput>
  <p class="text-sm text-muted">Shift steps by 1, Alt/Option by 0.05.</p>
</div>`

  const formatsCode = `<script lang="ts">
  const formats = [
    { id: "fmt-price", label: "Price", defaultValue: 19.99, step: 0.01, format: { style: "currency", currency: "USD" } },
    { id: "fmt-discount", label: "Discount", defaultValue: 0.15, step: 0.01, format: { style: "percent" } },
    { id: "fmt-weight", label: "Weight", defaultValue: 2.5, step: 0.1, format: { style: "unit", unit: "kilogram" } },
  ] satisfies {
    id: string
    label: string
    defaultValue: number
    step: number
    format: Intl.NumberFormatOptions
  }[]
<\/script>

<div class="flex w-56 flex-col gap-4">
  {#each formats as f (f.id)}
    <div class="flex flex-col gap-1.5">
      <label for={f.id} class="text-sm font-medium text-fg">{f.label}</label>
      <NumberInput defaultValue={f.defaultValue} min={0} step={f.step} format={f.format}>
        <NumberInputGroup>
          <NumberInputDecrement aria-label={"Decrease " + f.label}>
            <Minus aria-hidden="true" />
          </NumberInputDecrement>
          <NumberInputControl id={f.id} />
          <NumberInputIncrement aria-label={"Increase " + f.label}>
            <Plus aria-hidden="true" />
          </NumberInputIncrement>
        </NumberInputGroup>
      </NumberInput>
    </div>
  {/each}
</div>`

  const controlledCode = `<script lang="ts">
  import { Button } from "$lib/components/button"

  let servings = $state<number | null>(4)
  let committed = $state("")
<\/script>

<div class="flex w-56 flex-col gap-3">
  <div class="flex flex-wrap gap-2">
    <Button size="sm" tone="outline" onclick={() => (servings = 4)}>
      <RotateCcw aria-hidden="true" /> Reset to 4
    </Button>
    <Button size="sm" tone="outline" onclick={() => (servings = null)}>
      <Trash2 aria-hidden="true" /> Clear
    </Button>
  </div>
  <div class="flex flex-col gap-1.5">
    <label for="controlled-servings" class="text-sm font-medium text-fg">Servings</label>
    <NumberInput
      bind:value={servings}
      min={1}
      max={12}
      onValueCommit={(value, details) =>
        (committed = (value ?? "empty") + " (" + details.reason + ")")}
    >
      <NumberInputGroup>
        <NumberInputDecrement aria-label="Decrease servings">
          <Minus aria-hidden="true" />
        </NumberInputDecrement>
        <NumberInputControl id="controlled-servings" />
        <NumberInputIncrement aria-label="Increase servings">
          <Plus aria-hidden="true" />
        </NumberInputIncrement>
      </NumberInputGroup>
    </NumberInput>
  </div>
  <p class="text-sm text-muted">Value: {servings ?? "empty"}</p>
  <p class="text-sm text-muted">Committed: {committed || "not yet"}</p>
</div>`

  const scrubCode = `<script lang="ts">
  import { MoveHorizontal } from "@lucide/svelte"

  let scrubbed = $state<number | null>(120)
<\/script>

<div class="flex w-56 flex-col gap-1.5">
  <NumberInput defaultValue={120} min={0} onValueCommit={(value) => (scrubbed = value)}>
    <NumberInputScrubArea pixelsPerStep={4}>
      <label for="scrub-x" class="text-sm font-medium text-fg">X position</label>
      <NumberInputScrubAreaCursor>
        <MoveHorizontal aria-hidden="true" />
      </NumberInputScrubAreaCursor>
    </NumberInputScrubArea>
    <NumberInputGroup>
      <NumberInputControl id="scrub-x" />
    </NumberInputGroup>
  </NumberInput>
  <p class="text-sm text-muted">Drag the label sideways. Committed: {scrubbed ?? "empty"}</p>
</div>`

  const statesCode = `<div class="flex w-56 flex-col gap-4">
  <div class="flex flex-col gap-1.5">
    <label for="state-disabled" class="text-sm font-medium text-fg">Sold out</label>
    <NumberInput defaultValue={3} disabled>
      <NumberInputGroup>
        <NumberInputDecrement aria-label="Decrease">
          <Minus aria-hidden="true" />
        </NumberInputDecrement>
        <NumberInputControl id="state-disabled" />
        <NumberInputIncrement aria-label="Increase">
          <Plus aria-hidden="true" />
        </NumberInputIncrement>
      </NumberInputGroup>
    </NumberInput>
  </div>
  <div class="flex flex-col gap-1.5">
    <label for="state-readonly" class="text-sm font-medium text-fg">Seats included</label>
    <NumberInput defaultValue={5} readOnly>
      <NumberInputGroup>
        <NumberInputDecrement aria-label="Decrease">
          <Minus aria-hidden="true" />
        </NumberInputDecrement>
        <NumberInputControl id="state-readonly" />
        <NumberInputIncrement aria-label="Increase">
          <Plus aria-hidden="true" />
        </NumberInputIncrement>
      </NumberInputGroup>
    </NumberInput>
  </div>
</div>`

  const sizesCode = `<div class="flex w-56 flex-col gap-3">
  <NumberInput defaultValue={4} min={0}>
    <NumberInputGroup size="sm">
      <NumberInputDecrement aria-label="Decrease small"><Minus aria-hidden="true" /></NumberInputDecrement>
      <NumberInputControl aria-label="Small" />
      <NumberInputIncrement aria-label="Increase small"><Plus aria-hidden="true" /></NumberInputIncrement>
    </NumberInputGroup>
  </NumberInput>
  <NumberInput defaultValue={4} min={0}>
    <NumberInputGroup size="md">
      <NumberInputDecrement aria-label="Decrease medium"><Minus aria-hidden="true" /></NumberInputDecrement>
      <NumberInputControl aria-label="Medium" />
      <NumberInputIncrement aria-label="Increase medium"><Plus aria-hidden="true" /></NumberInputIncrement>
    </NumberInputGroup>
  </NumberInput>
  <NumberInput defaultValue={4} min={0}>
    <NumberInputGroup size="lg">
      <NumberInputDecrement aria-label="Decrease large"><Minus aria-hidden="true" /></NumberInputDecrement>
      <NumberInputControl aria-label="Large" />
      <NumberInputIncrement aria-label="Increase large"><Plus aria-hidden="true" /></NumberInputIncrement>
    </NumberInputGroup>
  </NumberInput>
</div>`

  const formats = [
    { id: "fmt-price", label: "Price", defaultValue: 19.99, step: 0.01, format: { style: "currency", currency: "USD" } },
    { id: "fmt-discount", label: "Discount", defaultValue: 0.15, step: 0.01, format: { style: "percent" } },
    { id: "fmt-weight", label: "Weight", defaultValue: 2.5, step: 0.1, format: { style: "unit", unit: "kilogram" } },
  ] satisfies {
    id: string
    label: string
    defaultValue: number
    step: number
    format: Intl.NumberFormatOptions
  }[]

  const controllerCode = `<script lang="ts">
  import { createNumberInputController } from "$lib/components/number-input"
  import { Button } from "$lib/components/button"

  const zoom = createNumberInputController()
<\/script>

<div class="flex w-56 flex-col gap-3">
  <div class="flex flex-wrap gap-2">
    <Button size="sm" tone="outline" onclick={() => zoom.decrement({ large: true })}>Zoom out</Button>
    <Button size="sm" tone="outline" onclick={() => zoom.increment({ large: true })}>Zoom in</Button>
    <Button size="sm" tone="outline" onclick={() => zoom.setValue(100)}>Actual size</Button>
    <Button size="sm" tone="outline" onclick={() => zoom.focus()}>Focus</Button>
  </div>
  <div class="flex flex-col gap-1.5">
    <label for="controller-zoom" class="text-sm font-medium text-fg">Zoom</label>
    <NumberInput
      defaultValue={100}
      min={10}
      max={400}
      step={10}
      format={{ style: "unit", unit: "percent" }}
      controller={zoom}
    >
      <NumberInputGroup>
        <NumberInputDecrement aria-label="Decrease zoom"><Minus aria-hidden="true" /></NumberInputDecrement>
        <NumberInputControl id="controller-zoom" />
        <NumberInputIncrement aria-label="Increase zoom"><Plus aria-hidden="true" /></NumberInputIncrement>
      </NumberInputGroup>
    </NumberInput>
  </div>
</div>`

  let servings = $state<number | null>(4)
  let committed = $state("")
  let scrubbed = $state<number | null>(120)
  const zoom = createNumberInputController()
</script>

<svelte:head>
  <title>Number Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Number Input"
  description="Enter numbers, step through values and format them for a locale. Wraps the ui-sdk Number Input, which keeps a numeric value while showing formatted text, and steps it with the keyboard, the step buttons, the wheel or a drag on its label."
  entry="@ui-sdk/svelte/number-input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Number Input is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/number-input</code>. Import the parts you need:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      Add <code class="font-mono text-accent">NumberInputScrubArea</code> and
      <code class="font-mono text-accent">NumberInputScrubAreaCursor</code> for drag-to-scrub, and
      <code class="font-mono text-accent">createNumberInputController</code> to drive it from elsewhere.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Composition: the root holds the value, the group is the field's box, and the control and step
      buttons live inside it.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Typing updates the value once the text is valid and within bounds.
      <span class="text-fg">Enter</span> or blur commits it: the text is parsed, clamped, snapped to
      the step and formatted. An empty field has the value
      <code class="font-mono text-accent">null</code>.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Type a number, press ArrowUp or ArrowDown, or hold a step button to repeat. The buttons stay out of the tab order."
      code={usageCode}
    >
      <div class="flex w-56 flex-col gap-1.5">
        <label for="basic-quantity" class="text-sm font-medium text-fg">Quantity</label>
        <NumberInput defaultValue={1} min={0}>
          <NumberInputGroup>
            <NumberInputDecrement aria-label="Decrease quantity">
              <Minus aria-hidden="true" />
            </NumberInputDecrement>
            <NumberInputControl id="basic-quantity" />
            <NumberInputIncrement aria-label="Increase quantity">
              <Plus aria-hidden="true" />
            </NumberInputIncrement>
          </NumberInputGroup>
        </NumberInput>
      </div>
    </Demo>

    <Demo
      title="Min and max"
      description="Type 20 and press Enter to clamp it to 8. At either bound that direction's button disables and gets data-at-bound."
      code={boundsCode}
    >
      <div class="flex w-56 flex-col gap-1.5">
        <label for="bounds-guests" class="text-sm font-medium text-fg">Guests</label>
        <NumberInput defaultValue={2} min={1} max={8}>
          <NumberInputGroup>
            <NumberInputDecrement aria-label="Decrease guests">
              <Minus aria-hidden="true" />
            </NumberInputDecrement>
            <NumberInputControl id="bounds-guests" />
            <NumberInputIncrement aria-label="Increase guests">
              <Plus aria-hidden="true" />
            </NumberInputIncrement>
          </NumberInputGroup>
        </NumberInput>
        <p class="text-sm text-muted">Tables seat between 1 and 8 guests.</p>
      </div>
    </Demo>

    <Demo
      title="Step, large step and small step"
      description="Steps are measured from min. Shift and Page Up/Down use largeStep; Alt/Option with an arrow uses smallStep. Home and End jump to the bounds."
      code={stepCode}
    >
      <div class="flex w-56 flex-col gap-1.5">
        <label for="step-hours" class="text-sm font-medium text-fg">Hours</label>
        <NumberInput defaultValue={1.5} min={0} max={24} step={0.25} largeStep={1} smallStep={0.05}>
          <NumberInputGroup>
            <NumberInputDecrement aria-label="Decrease hours">
              <Minus aria-hidden="true" />
            </NumberInputDecrement>
            <NumberInputControl id="step-hours" />
            <NumberInputIncrement aria-label="Increase hours">
              <Plus aria-hidden="true" />
            </NumberInputIncrement>
          </NumberInputGroup>
        </NumberInput>
        <p class="text-sm text-muted">Shift steps by 1, Alt/Option by 0.05.</p>
      </div>
    </Demo>

    <Demo
      title="Locale format"
      description="Intl.NumberFormat options control the display while the value stays numeric. Percents are fractions: 15% is 0.15. Leave the field to format what you typed."
      code={formatsCode}
    >
      <div class="flex w-56 flex-col gap-4">
        {#each formats as f (f.id)}
          <div class="flex flex-col gap-1.5">
            <label for={f.id} class="text-sm font-medium text-fg">{f.label}</label>
            <NumberInput defaultValue={f.defaultValue} min={0} step={f.step} format={f.format}>
              <NumberInputGroup>
                <NumberInputDecrement aria-label={"Decrease " + f.label}>
                  <Minus aria-hidden="true" />
                </NumberInputDecrement>
                <NumberInputControl id={f.id} />
                <NumberInputIncrement aria-label={"Increase " + f.label}>
                  <Plus aria-hidden="true" />
                </NumberInputIncrement>
              </NumberInputGroup>
            </NumberInput>
          </div>
        {/each}
      </div>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:value follows your state. onValueChange reports each valid change; onValueCommit runs once when the interaction ends — use it for saving."
      code={controlledCode}
    >
      <div class="flex w-56 flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => (servings = 4)}>
            <RotateCcw aria-hidden="true" /> Reset to 4
          </Button>
          <Button size="sm" tone="outline" onclick={() => (servings = null)}>
            <Trash2 aria-hidden="true" /> Clear
          </Button>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="controlled-servings" class="text-sm font-medium text-fg">Servings</label>
          <NumberInput
            bind:value={servings}
            min={1}
            max={12}
            onValueCommit={(value, details) =>
              (committed = (value ?? "empty") + " (" + details.reason + ")")}
          >
            <NumberInputGroup>
              <NumberInputDecrement aria-label="Decrease servings">
                <Minus aria-hidden="true" />
              </NumberInputDecrement>
              <NumberInputControl id="controlled-servings" />
              <NumberInputIncrement aria-label="Increase servings">
                <Plus aria-hidden="true" />
              </NumberInputIncrement>
            </NumberInputGroup>
          </NumberInput>
        </div>
        <p class="text-sm text-muted">Value: {servings ?? "empty"}</p>
        <p class="text-sm text-muted">Committed: {committed || "not yet"}</p>
      </div>
    </Demo>

    <Demo
      title="Scrub area"
      description="Drag the label sideways to change the value; right and up increase. Where pointer lock is available the drag continues past the screen edge and the cursor part stands in for the pointer."
      code={scrubCode}
    >
      <div class="flex w-56 flex-col gap-1.5">
        <NumberInput defaultValue={120} min={0} onValueCommit={(value) => (scrubbed = value)}>
          <NumberInputScrubArea pixelsPerStep={4}>
            <label for="scrub-x" class="text-sm font-medium text-fg">X position</label>
            <NumberInputScrubAreaCursor>
              <MoveHorizontal aria-hidden="true" />
            </NumberInputScrubAreaCursor>
          </NumberInputScrubArea>
          <NumberInputGroup>
            <NumberInputControl id="scrub-x" />
          </NumberInputGroup>
        </NumberInput>
        <p class="text-sm text-muted">Drag the label sideways. Committed: {scrubbed ?? "empty"}</p>
      </div>
    </Demo>

    <Demo
      title="Controller"
      description="createNumberInputController() steps the field from outside. Pass large: true for a large step. The same controller can drive a scrub area elsewhere, like a toolbar icon."
      code={controllerCode}
    >
      <div class="flex w-56 flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => zoom.decrement({ large: true })}>Zoom out</Button>
          <Button size="sm" tone="outline" onclick={() => zoom.increment({ large: true })}>Zoom in</Button>
          <Button size="sm" tone="outline" onclick={() => zoom.setValue(100)}>Actual size</Button>
          <Button size="sm" tone="outline" onclick={() => zoom.focus()}>Focus</Button>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="controller-zoom" class="text-sm font-medium text-fg">Zoom</label>
          <NumberInput
            defaultValue={100}
            min={10}
            max={400}
            step={10}
            format={{ style: "unit", unit: "percent" }}
            controller={zoom}
          >
            <NumberInputGroup>
              <NumberInputDecrement aria-label="Decrease zoom"><Minus aria-hidden="true" /></NumberInputDecrement>
              <NumberInputControl id="controller-zoom" />
              <NumberInputIncrement aria-label="Increase zoom"><Plus aria-hidden="true" /></NumberInputIncrement>
            </NumberInputGroup>
          </NumberInput>
        </div>
      </div>
    </Demo>

    <Demo
      title="Disabled and read-only"
      description="Disabled can't be focused, changed or submitted. Read-only stays focusable and submitted but stops typing, steps and scrubs."
      code={statesCode}
    >
      <div class="flex w-56 flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="state-disabled" class="text-sm font-medium text-fg">Sold out</label>
          <NumberInput defaultValue={3} disabled>
            <NumberInputGroup>
              <NumberInputDecrement aria-label="Decrease">
                <Minus aria-hidden="true" />
              </NumberInputDecrement>
              <NumberInputControl id="state-disabled" />
              <NumberInputIncrement aria-label="Increase">
                <Plus aria-hidden="true" />
              </NumberInputIncrement>
            </NumberInputGroup>
          </NumberInput>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="state-readonly" class="text-sm font-medium text-fg">Seats included</label>
          <NumberInput defaultValue={5} readOnly>
            <NumberInputGroup>
              <NumberInputDecrement aria-label="Decrease">
                <Minus aria-hidden="true" />
              </NumberInputDecrement>
              <NumberInputControl id="state-readonly" />
              <NumberInputIncrement aria-label="Increase">
                <Plus aria-hidden="true" />
              </NumberInputIncrement>
            </NumberInputGroup>
          </NumberInput>
        </div>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">size</code> on the group sets the box height; the control and
      step buttons fill it. Every part exposes
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code> and
      <code class="font-mono text-accent">data-scrubbing</code>.
    </p>
    <Demo title="Sizes" description="Three box heights. The control's text size follows the group." code={sizesCode}>
      <div class="flex w-56 flex-col gap-3">
        <NumberInput defaultValue={4} min={0}>
          <NumberInputGroup size="sm">
            <NumberInputDecrement aria-label="Decrease small"><Minus aria-hidden="true" /></NumberInputDecrement>
            <NumberInputControl aria-label="Small" />
            <NumberInputIncrement aria-label="Increase small"><Plus aria-hidden="true" /></NumberInputIncrement>
          </NumberInputGroup>
        </NumberInput>
        <NumberInput defaultValue={4} min={0}>
          <NumberInputGroup size="md">
            <NumberInputDecrement aria-label="Decrease medium"><Minus aria-hidden="true" /></NumberInputDecrement>
            <NumberInputControl aria-label="Medium" />
            <NumberInputIncrement aria-label="Increase medium"><Plus aria-hidden="true" /></NumberInputIncrement>
          </NumberInputGroup>
        </NumberInput>
        <NumberInput defaultValue={4} min={0}>
          <NumberInputGroup size="lg">
            <NumberInputDecrement aria-label="Decrease large"><Minus aria-hidden="true" /></NumberInputDecrement>
            <NumberInputControl aria-label="Large" />
            <NumberInputIncrement aria-label="Increase large"><Plus aria-hidden="true" /></NumberInputIncrement>
          </NumberInputGroup>
        </NumberInput>
      </div>
    </Demo>
    <PropsTable
      caption="NumberInputGroup size"
      rows={[
        { name: "sm", type: "string", default: "h-8", description: "Compact, for design-tool inspectors and tables." },
        { name: "md", type: "default", default: "h-9", description: "Default." },
        { name: "lg", type: "string", default: "h-11", description: "Prominent, for touch." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-disabled", type: "attribute", description: "On every part when disabled. On a step button it also means the value reached that button's bound." },
        { name: "data-at-bound", type: "attribute", description: "On a step button when the value is at the bound it steps toward." },
        { name: "data-readonly", type: "attribute", description: "Present when read-only." },
        { name: "data-required", type: "attribute", description: "Present when required." },
        { name: "data-scrubbing", type: "attribute", description: "On every part while a drag on the scrub area changes the value." },
        { name: "data-orientation", type: '"horizontal" | "vertical"', description: "On the scrub area: which way to drag." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Form options go on the root; native input attributes go on the control. Every part forwards its
      attributes plus <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive the part's state.
    </p>
    <PropsTable
      caption="NumberInput (root)"
      rows={[
        { name: "value", type: "number | null", description: "The value, or null for an empty field. Bind it with bind:value." },
        { name: "defaultValue", type: "number | null", description: "The value it starts with when uncontrolled. A form reset returns here." },
        { name: "onValueChange", type: "(value: number | null, details: ChangeDetails<NumberInputValueChangeReason>) => void", description: "Runs as a typed number becomes valid and on every step. details.cancel() stops it." },
        { name: "onValueCommit", type: "(value: number | null, details: CommitDetails<NumberInputValueChangeReason>) => void", description: "Runs once when an interaction that changed the value ends: typing committed, a key or button released, or a scrub ended." },
        { name: "min", type: "number", description: "The lowest value. Typed values below it are raised to it when committed." },
        { name: "max", type: "number", description: "The highest value. Typed values above it are lowered to it when committed." },
        { name: "step", type: "number", default: "1", description: "How far one step moves. Committed values snap to steps from min, or from 0 without one." },
        { name: "largeStep", type: "number", default: "10 × step", description: "How far Page Up/Down and Shift with an arrow, button, wheel or scrub move." },
        { name: "smallStep", type: "number", default: "step / 10", description: "How far Alt/Option with an arrow, the wheel or a scrub moves. Values it reaches snap to it rather than to step." },
        { name: "format", type: "Intl.NumberFormatOptions", description: 'How the value shows, like { style: "currency", currency: "USD" }. Typing accepts the same format; percents are fractions.' },
        { name: "locale", type: "string", description: "The locale for formatting and parsing. Defaults to the page lang, then the browser language once interactive. Server markup uses English until then." },
        { name: "wheel", type: "boolean", default: "false", description: "Lets the mouse wheel step the value while the input has focus." },
        { name: "disabled", type: "boolean", default: "false", description: "Can't be focused or changed, and isn't submitted. A disabled fieldset applies too." },
        { name: "readOnly", type: "boolean", default: "false", description: "Stays focusable and submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission while empty, with the browser's own message." },
        { name: "name", type: "string", description: "The name it submits under. The number is submitted as is, like 1234.5, never formatted." },
        { name: "form", type: "string", description: "The id of a form to belong to when it isn't inside that form." },
        { name: "controller", type: "NumberInputController", description: "Steps it from anywhere. Create one with createNumberInputController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
        { name: "class", type: "string", description: "Extra classes merged onto the root (user wins)." },
      ]}
    />
    <PropsTable
      caption="NumberInputGroup"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Negentropy prop: height of the field box." },
        { name: "class", type: "string", description: "Extra classes merged onto the group (user wins)." },
        { name: "children", type: "Snippet<[NumberInputState]>", description: "The control, the step buttons and any scrub handle." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Swaps the group's div for your own element." },
      ]}
    />
    <PropsTable
      caption="NumberInputControl"
      rows={[
        { name: "id", type: "string", description: "Point a visible label at it with for." },
        { name: "aria-label", type: "string", description: "Accessible name when there is no visible label." },
        { name: "class", type: "string", description: "Extra classes merged onto the input (user wins)." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Swaps the input for your own element." },
      ]}
    />
    <PropsTable
      caption="NumberInputIncrement / NumberInputDecrement"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Turns off this button alone. Pressing, clicking or holding it doesn't step; the other still does." },
        { name: "aria-label", type: "string", description: "Required accessible name, such as Increase quantity." },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
        { name: "children", type: "Snippet<[NumberInputButtonState]>", description: "The button's content. Read state.atBound to swap the icon for a label." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Swaps the button for your own element, to add a title or tooltip." },
      ]}
    />
    <PropsTable
      caption="NumberInputScrubArea"
      rows={[
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which way to drag. Right and up increase." },
        { name: "pixelsPerStep", type: "number", description: "How far the pointer moves for one step, in CSS pixels." },
        { name: "controller", type: "NumberInputController", description: "Connects a scrub area outside the number input, like a toolbar icon. Inside it, it connects on its own." },
        { name: "class", type: "string", description: "Extra classes merged onto the span (user wins)." },
      ]}
    />
    <PropsTable
      caption="NumberInputScrubAreaCursor"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the span (user wins). It renders in the body, positioned by an inline translate." },
        { name: "children", type: "Snippet<[NumberInputState]>", description: "The replacement cursor, usually an icon. Center it with negative margins." },
      ]}
    />
    <PropsTable
      caption="NumberInputState (every part)"
      rows={[
        { name: "value", type: "number | null", description: "The value, or null when empty." },
        { name: "disabled", type: "boolean", description: "Whether it's disabled, by itself or a fieldset." },
        { name: "readOnly", type: "boolean", description: "Whether it's read-only." },
        { name: "required", type: "boolean", description: "Whether a form won't submit while it's empty." },
        { name: "scrubbing", type: "boolean", description: "Whether a scrub is moving the value." },
      ]}
    />
    <PropsTable
      caption="NumberInputButtonState (step buttons)"
      rows={[
        { name: "atBound", type: "boolean", description: "Whether the value is at the bound this button steps toward, like the maximum for the increment." },
        { name: "disabled", type: "boolean", description: "Whether the button can't step: it or the field is disabled, the field is read-only, or the value is at its bound." },
      ]}
    />
    <PropsTable
      caption="Change reasons"
      rows={[
        { name: "input-change", type: "Event", description: "Typing, pasting or dropping changed the text." },
        { name: "input-commit", type: "KeyboardEvent | FocusEvent", description: "Enter or leaving the field committed what was typed." },
        { name: "step-key", type: "KeyboardEvent", description: "Arrow, Page Up, Page Down, Home or End stepped the value." },
        { name: "increment-press", type: "MouseEvent | PointerEvent", description: "The increment button was pressed or held." },
        { name: "decrement-press", type: "MouseEvent | PointerEvent", description: "The decrement button was pressed or held." },
        { name: "wheel", type: "WheelEvent", description: "The mouse wheel stepped a focused field." },
        { name: "scrub", type: "PointerEvent", description: "A drag on a scrub area." },
        { name: "reset", type: "none", description: "A form reset." },
        { name: "restore", type: "none", description: "The browser restored state, like after going back." },
        { name: "imperative", type: "none", description: "A controller call." },
      ]}
    />
    <PropsTable
      caption="createNumberInputController()"
      rows={[
        { name: "getValue()", type: "() => number | null", description: "The value, or null when empty." },
        { name: "setValue(value, options?)", type: "(number | null, NumberInputChangeOptions?) => boolean", description: "Sets the value as a user would. Clamped and snapped to the step." },
        { name: "increment(options?)", type: "(NumberInputChangeOptions & { large?: boolean }) => boolean", description: "Steps up, by largeStep with { large: true }." },
        { name: "decrement(options?)", type: "(NumberInputChangeOptions & { large?: boolean }) => boolean", description: "Steps down, by largeStep with { large: true }." },
        { name: "focus()", type: "() => void", description: "Moves focus to the input." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <p class="text-sm text-muted">
      Follows the keyboard model of the WAI-ARIA spinbutton pattern on a native text input, so
      ordinary text editing works too. Give the control a visible
      <code class="font-mono text-accent">&lt;label&gt;</code> or an
      <code class="font-mono text-accent">aria-label</code>, and name both step buttons. Each button
      points to the input with <code class="font-mono text-accent">aria-controls</code>.
    </p>
    <PropsTable
      caption="Keyboard"
      rows={[
        { name: "ArrowUp / ArrowDown", type: "key", description: "Step by step (default 1). A step button does the same." },
        { name: "Shift + arrow / button", type: "key", description: "Step by largeStep (default ten steps)." },
        { name: "PageUp / PageDown", type: "key", description: "Step by largeStep." },
        { name: "Alt/Option + arrow", type: "key", description: "Step by smallStep (default a tenth of a step)." },
        { name: "Home / End", type: "key", description: "Go to the minimum or maximum, when set." },
        { name: "Enter", type: "key", description: "Commits and formats what was typed." },
      ]}
    />
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>
        The step buttons stay out of the <span class="text-fg">Tab</span> order, because the focused
        input gives the same steps through its arrow keys.
      </li>
      <li>
        Holding a step button repeats the step, and commits once when it is released. Holding an
        arrow key also commits once, when the key comes up.
      </li>
      <li>
        A button at its bound is disabled and marked
        <code class="font-mono text-accent">data-at-bound</code>. Disabling one button leaves the other
        working.
      </li>
      <li>
        Letters can't be typed. Text that isn't a number goes back to the value when focus leaves, and
        a typed value outside the bounds is clamped then.
      </li>
      <li>
        A field with cents asks for a decimal keypad
        (<code class="font-mono text-accent">inputmode</code>), so mobile shows the right keyboard.
      </li>
      <li>
        The hidden input submits the plain number under
        <code class="font-mono text-accent">name</code>, never the formatted text: a displayed $4.50
        submits <code class="font-mono text-accent">4.5</code>. An empty value submits an empty string.
      </li>
      <li>
        The mouse wheel does nothing unless <code class="font-mono text-accent">wheel</code> is set, and
        then only while the input has focus — so scrolling the page never changes a value by accident.
      </li>
      <li>
        A scrub steps by distance rather than speed, and a scrub that doesn't move commits nothing.
        <code class="font-mono text-accent">data-scrubbing</code> marks every part during the drag.
      </li>
      <li>
        Set <code class="font-mono text-accent">locale</code> explicitly when the first server render
        matters; without it, server markup uses English until the page is interactive.
      </li>
    </ul>
  </Section>
</div>