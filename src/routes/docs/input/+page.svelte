<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Input,
    InputGroup,
    InputClear,
    createInputController,
  } from "$lib/components/input"
  import { Button } from "$lib/components/button"
  import { X, Search, RotateCcw, Trash2, Crosshair, Send } from "@lucide/svelte"

  const installCode = `import { Input, InputGroup, InputClear } from "$lib/components/input"`

  const usageCode = `<script lang="ts">
  import { Input } from "$lib/components/input"
<\/script>

<div class="flex w-64 flex-col gap-1.5">
  <label for="basic-name" class="text-sm font-medium text-fg">Name</label>
  <Input id="basic-name" defaultValue="Hollis Grant" />
</div>`

  const controlledCode = `<script lang="ts">
  import { Input } from "$lib/components/input"
  import { Button } from "$lib/components/button"

  let name = $state("Hollis Grant")
<\/script>

<div class="flex w-64 flex-col gap-1.5">
  <label for="controlled-name" class="text-sm font-medium text-fg">Name</label>
  <Input id="controlled-name" bind:value={name} />
  <p class="text-sm text-muted">Hello, {name || "stranger"}.</p>
  <Button size="sm" tone="outline" onclick={() => (name = "")}>Reset</Button>
</div>`

  const groupCode = `<script lang="ts">
  import { Input, InputGroup, InputClear } from "$lib/components/input"
  import { X } from "@lucide/svelte"
<\/script>

<div class="flex w-72 flex-col gap-1.5">
  <label for="group-website" class="text-sm font-medium text-fg">Website</label>
  <InputGroup>
    <span class="text-sm">https://</span>
    <Input id="group-website" defaultValue="hollisgrant.com" />
    <InputClear aria-label="Clear website">
      <X aria-hidden="true" />
    </InputClear>
  </InputGroup>
  <p class="text-sm text-muted">Shown on your public profile.</p>
</div>`

  const searchCode = `<script lang="ts">
  import { Input, InputGroup, InputClear } from "$lib/components/input"
  import { Search, X } from "@lucide/svelte"
<\/script>

<InputGroup class="w-72">
  <Search class="size-4 shrink-0" aria-hidden="true" />
  <Input type="search" aria-label="Search people" />
  <InputClear aria-label="Clear search">
    <X aria-hidden="true" />
  </InputClear>
</InputGroup>`

  const sizesCode = `<div class="flex w-64 flex-col gap-3">
  <Input size="sm" aria-label="Small" defaultValue="Small" />
  <Input size="md" aria-label="Medium" defaultValue="Medium" />
  <Input size="lg" aria-label="Large" defaultValue="Large" />
</div>`

  const statesCode = `<div class="flex w-64 flex-col gap-3">
  <Input disabled aria-label="Disabled" defaultValue="Disabled" />
  <Input readOnly aria-label="Read only" defaultValue="Read only" />
  <Input required aria-label="Required" />
</div>`

  const filterCode = `<script lang="ts">
  import { Input } from "$lib/components/input"
<\/script>

<div class="flex w-40 flex-col gap-1.5">
  <label for="filter-code" class="text-sm font-medium text-fg">Code</label>
  <Input
    id="filter-code"
    inputmode="numeric"
    maxlength={6}
    onValueChange={(value, details) => {
      if (!/^\\d*$/.test(value)) details.cancel()
    }}
  />
  <p class="text-sm text-muted">Digits only, six at most.</p>
</div>`

  const controllerCode = `<script lang="ts">
  import { Input, createInputController } from "$lib/components/input"
  import { Button } from "$lib/components/button"

  const message = createInputController()
<\/script>

<div class="flex w-72 flex-col gap-3">
  <Input controller={message} aria-label="Message" />
  <div class="flex flex-wrap gap-2">
    <Button size="sm" tone="outline" onclick={() => message.setValue("On my way!")}>
      <Send aria-hidden="true" /> Quick reply
    </Button>
    <Button size="sm" tone="outline" onclick={() => message.clear()}>
      <Trash2 aria-hidden="true" /> Clear
    </Button>
    <Button size="sm" tone="outline" onclick={() => message.focus()}>
      <Crosshair aria-hidden="true" /> Focus
    </Button>
  </div>
</div>`

  let name = $state("Hollis Grant")
  const message = createInputController()
</script>

<svelte:head>
  <title>Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Input"
  description="A single-line text field for short values like a name, an email address or a search. Wraps the ui-sdk Input, which adds a clear button, text around the field, change reasons and cancelable changes on top of a native input."
  entry="@ui-sdk/svelte/input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Input is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/input</code>. Import the parts you need:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      The behavior comes from <code class="font-mono text-accent">@ui-sdk/core</code>, installed
      alongside <code class="font-mono text-accent">@ui-sdk/svelte</code>. Every native input
      attribute passes straight through to the element.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">Input</code> renders a native
      <code class="font-mono text-accent">&lt;input&gt;</code>. Give it a visible
      <code class="font-mono text-accent">&lt;label&gt;</code> or an
      <code class="font-mono text-accent">aria-label</code>, and start it with
      <code class="font-mono text-accent">defaultValue</code> or control it with
      <code class="font-mono text-accent">bind:value</code>.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Composition: <code class="font-mono text-accent">Input</code> alone, or
      <code class="font-mono text-accent">InputGroup</code> holding an
      <code class="font-mono text-accent">Input</code> and an
      <code class="font-mono text-accent">InputClear</code>.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="An uncontrolled field with a visible label. Click the label to focus it." code={usageCode}>
      <div class="flex w-64 flex-col gap-1.5">
        <label for="basic-name" class="text-sm font-medium text-fg">Name</label>
        <Input id="basic-name" defaultValue="Hollis Grant" />
      </div>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:value keeps the field and your state in sync. Every keystroke survives, and the greeting updates as you type."
      code={controlledCode}
    >
      <div class="flex w-64 flex-col gap-1.5">
        <label for="controlled-name" class="text-sm font-medium text-fg">Name</label>
        <Input id="controlled-name" bind:value={name} />
        <p class="text-sm text-muted">Hello, {name || "stranger"}.</p>
        <Button size="sm" tone="outline" onclick={() => (name = "")}>
          <RotateCcw aria-hidden="true" /> Reset
        </Button>
      </div>
    </Demo>

    <Demo
      title="Input group"
      description="Text around the field reads as part of the value. Pressing https:// focuses the input; Clear empties it and returns focus."
      code={groupCode}
    >
      <div class="flex w-72 flex-col gap-1.5">
        <label for="group-website" class="text-sm font-medium text-fg">Website</label>
        <InputGroup>
          <span class="text-sm">https://</span>
          <Input id="group-website" defaultValue="hollisgrant.com" />
          <InputClear aria-label="Clear website">
            <X aria-hidden="true" />
          </InputClear>
        </InputGroup>
        <p class="text-sm text-muted">Shown on your public profile.</p>
      </div>
    </Demo>

    <Demo
      title="Search"
      description="A leading icon and a clear button. The clear button only exists while there is text to clear."
      code={searchCode}
    >
      <InputGroup class="w-72">
        <Search class="size-4 shrink-0" aria-hidden="true" />
        <Input type="search" aria-label="Search people" />
        <InputClear aria-label="Clear search">
          <X aria-hidden="true" />
        </InputClear>
      </InputGroup>
    </Demo>

    <Demo
      title="Filtering what's typed"
      description="details.cancel() rejects a change and restores the previous text and caret position."
      code={filterCode}
    >
      <div class="flex w-40 flex-col gap-1.5">
        <label for="filter-code" class="text-sm font-medium text-fg">Code</label>
        <Input
          id="filter-code"
          inputmode="numeric"
          maxlength={6}
          onValueChange={(value, details) => {
            if (!/^\d*$/.test(value)) details.cancel()
          }}
        />
        <p class="text-sm text-muted">Digits only, six at most.</p>
      </div>
    </Demo>

    <Demo
      title="Controller"
      description="createInputController() drives the field from outside. Writes report the imperative reason, just like typing."
      code={controllerCode}
    >
      <div class="flex w-72 flex-col gap-3">
        <Input controller={message} aria-label="Message" />
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => message.setValue("On my way!")}>
            <Send aria-hidden="true" /> Quick reply
          </Button>
          <Button size="sm" tone="outline" onclick={() => message.clear()}>
            <Trash2 aria-hidden="true" /> Clear
          </Button>
          <Button size="sm" tone="outline" onclick={() => message.focus()}>
            <Crosshair aria-hidden="true" /> Focus
          </Button>
        </div>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">size</code> sets the height and padding. State is exposed
      as <code class="font-mono text-accent">data-filled</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code> and
      <code class="font-mono text-accent">data-required</code>, so you can style it without extra props.
    </p>
    <Demo title="Sizes" description="Three heights. Inside a group the field fills the group's box." code={sizesCode}>
      <div class="flex w-64 flex-col gap-3">
        <Input size="sm" aria-label="Small" defaultValue="Small" />
        <Input size="md" aria-label="Medium" defaultValue="Medium" />
        <Input size="lg" aria-label="Large" defaultValue="Large" />
      </div>
    </Demo>
    <Demo
      title="States"
      description="Disabled leaves the tab order and the submitted values. Read-only stays focusable, selectable and submitted. Required marks the field for native validation."
      code={statesCode}
    >
      <div class="flex w-64 flex-col gap-3">
        <Input disabled aria-label="Disabled" defaultValue="Disabled" />
        <Input readOnly aria-label="Read only" defaultValue="Read only" />
        <Input required aria-label="Required" />
      </div>
    </Demo>
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "h-8", description: "Compact, for dense toolbars and tables." },
        { name: "md", type: "default", default: "h-9", description: "Default." },
        { name: "lg", type: "string", default: "h-11", description: "Prominent, for touch and hero forms." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-filled", type: "attribute", description: "Present while the field holds any text." },
        { name: "data-disabled", type: "attribute", description: "Present when disabled by its own prop or a disabled fieldset." },
        { name: "data-readonly", type: "attribute", description: "Present when read-only." },
        { name: "data-required", type: "attribute", description: "Present when required." },
        { name: "data-invalid", type: "attribute", description: "Set by a Field once validation fails; the wrapper turns the border danger." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Every part forwards all native attributes plus its
      <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive the part's state.
    </p>
    <PropsTable
      caption="Input — Negentropy props"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and padding." },
        { name: "class", type: "string", description: "Extra classes merged onto the element (user wins)." },
      ]}
    />
    <PropsTable
      caption="Input — ui-sdk options"
      rows={[
        { name: "value", type: "string", description: "The text. Bind it with bind:value to control the field." },
        { name: "defaultValue", type: "string", description: "The text it starts with when uncontrolled. A form reset returns here." },
        { name: "onValueChange", type: "(value: string, details: ChangeDetails<InputValueChangeReason>) => void", description: "Runs on typing, a clear press, a form reset or a controller write. details.cancel() keeps the text and caret as they were." },
        { name: "controller", type: "InputController", description: "Reads and writes the field from anywhere. Create one with createInputController()." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the field. A disabled Field or fieldset applies too." },
        { name: "readOnly", type: "boolean", default: "false", description: "Makes the field read-only. A native readonly attribute does the same." },
        { name: "required", type: "boolean", default: "false", description: "Makes the field required for native form validation." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="InputGroup"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the group box (user wins)." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
        { name: "children", type: "Snippet<[InputGroupState]>", description: "The Input, plus text, icons and buttons around it. Pressing its text focuses the field." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Swaps the group's div for your own element." },
      ]}
    />
    <PropsTable
      caption="InputClear"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
        { name: "aria-label", type: "string", description: "Required accessible name, such as Clear search." },
        { name: "children", type: "Snippet<[InputGroupState]>", description: "The button's content, usually an icon." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Swaps the button for your own element." },
      ]}
    />
    <PropsTable
      caption="State — Input"
      rows={[
        { name: "filled", type: "boolean", description: "Whether the field holds any text." },
        { name: "disabled", type: "boolean", description: "Whether the field is disabled." },
        { name: "readOnly", type: "boolean", description: "Whether the field is read-only." },
        { name: "required", type: "boolean", description: "Whether the field is required." },
      ]}
    />
    <PropsTable
      caption="State — InputGroup and InputClear"
      rows={[
        { name: "filled", type: "boolean", description: "Whether the field in the group holds any text." },
        { name: "disabled", type: "boolean", description: "Whether the field in the group is disabled, by itself or a fieldset." },
        { name: "readOnly", type: "boolean", description: "Whether the field in the group is read-only." },
      ]}
    />
    <PropsTable
      caption="Change reasons"
      rows={[
        { name: "input-change", type: "Event", description: "Typing, pasting or dropping changed the value." },
        { name: "clear-press", type: "MouseEvent | KeyboardEvent", description: "An InputClear was pressed." },
        { name: "reset", type: "none", description: "A form reset." },
        { name: "imperative", type: "none", description: "A controller call." },
      ]}
    />
    <PropsTable
      caption="createInputController()"
      rows={[
        { name: "getValue()", type: "() => string", description: "The current value." },
        { name: "setValue(value, options?)", type: "(string, ChangeOptions?) => boolean", description: "Sets the value as if typed, so input fires. False when canceled or unchanged." },
        { name: "clear(options?)", type: "(ChangeOptions?) => boolean", description: "Empties the field as if the text was deleted. False when canceled or unchanged." },
        { name: "focus()", type: "() => void", description: "Moves focus to the field." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>
        Give the input a visible <code class="font-mono text-accent">&lt;label&gt;</code> or an
        <code class="font-mono text-accent">aria-label</code>. The label names the field, and clicking
        it focuses the input.
      </li>
      <li>
        The field stays a native <code class="font-mono text-accent">&lt;input&gt;</code>, so standard
        text editing, selection, autocomplete and form behavior all work. There is no extra ARIA
        pattern to learn.
      </li>
      <li>
        Give <code class="font-mono text-accent">InputClear</code> an accessible name such as
        <span class="text-fg">Clear search</span>. It renders only while there is text to clear, empties
        the field, reports <code class="font-mono text-accent">clear-press</code> and returns focus to
        the input. It hides while the field is disabled.
      </li>
      <li>
        Pressing an <code class="font-mono text-accent">InputGroup</code>'s text or icons focuses the
        field. That text is display content, not part of the submitted value.
      </li>
      <li>
        A required input marks its label required. An invalid input is marked once the form tries to
        submit, and a Field associates its error with the field.
      </li>
      <li>
        For a group's focus ring, style
        <code class="font-mono text-accent">:has(input:focus-visible)</code> — the wrapper already does
        — so a focused button inside the group keeps its own ring.
      </li>
      <li>
        A canceled change keeps the text and caret as they were, and waits for an IME to finish
        composing before restoring it.
      </li>
    </ul>
  </Section>
</div>