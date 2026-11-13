<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import { Textarea, createInputController } from "$lib/components/textarea"
  import { Button } from "$lib/components/button"
  import { Send, Trash2 } from "@lucide/svelte"

  const installCode = `import { Textarea } from "$lib/components/textarea"`

  const usageCode = `<script lang="ts">
  import { Textarea } from "$lib/components/textarea"
<\/script>

<div class="flex w-80 flex-col gap-1.5">
  <label for="basic-message" class="text-sm font-medium text-fg">Message</label>
  <Textarea id="basic-message" rows={4} />
</div>`

  const controlledCode = `<script lang="ts">
  import { Textarea } from "$lib/components/textarea"

  let bio = $state("Product designer in Lisbon. I write about type and interfaces.")
<\/script>

<div class="flex w-80 flex-col gap-1.5">
  <label for="controlled-bio" class="text-sm font-medium text-fg">Bio</label>
  <Textarea id="controlled-bio" bind:value={bio} maxlength={160} rows={3} />
  <p class="text-sm text-muted tabular-nums">{bio.length} / 160 characters</p>
</div>`

  const autoResizeCode = `<script lang="ts">
  import { Textarea } from "$lib/components/textarea"
<\/script>

<div class="flex w-80 flex-col gap-1.5">
  <label for="auto-notes" class="text-sm font-medium text-fg">Notes</label>
  <Textarea
    id="auto-notes"
    autoResize
    resize="none"
    class="min-h-20 max-h-60"
  />
  <p class="text-sm text-muted">Your driver sees these notes.</p>
</div>`

  const shortcutCode = `<script lang="ts">
  import { Textarea } from "$lib/components/textarea"

  let sent = $state("")
<\/script>

<div class="flex w-80 flex-col gap-1.5">
  <label for="shortcut-reply" class="text-sm font-medium text-fg">Reply</label>
  <Textarea
    id="shortcut-reply"
    rows={3}
    submitShortcut="mod+enter"
    onSubmit={(value) => (sent = value)}
  />
  <p class="text-sm text-muted">
    {sent ? "Sent: " + sent : "Press Cmd/Ctrl+Enter to send. Enter adds a line."}
  </p>
</div>`

  const statesCode = `<div class="flex w-80 flex-col gap-3">
  <Textarea disabled aria-label="Disabled" rows={2} defaultValue="Replies are closed for this thread." />
  <Textarea readOnly aria-label="Read only" rows={2} defaultValue="Set by your plan." />
  <Textarea aria-invalid="true" data-invalid aria-label="Invalid" rows={2} defaultValue="Great." />
</div>`

  const sizesCode = `<div class="flex w-80 flex-col gap-3">
  <Textarea size="sm" aria-label="Small" rows={2} defaultValue="Small" />
  <Textarea size="md" aria-label="Medium" rows={2} defaultValue="Medium" />
  <Textarea size="lg" aria-label="Large" rows={2} defaultValue="Large" />
</div>`

  const formCode = `<script lang="ts">
  import { Textarea, createInputController } from "$lib/components/textarea"
  import { Button } from "$lib/components/button"

  const message = createInputController()
  let log = $state("")

  function onsubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    log = "Sent: " + data.get("message")
    message.clear()
  }
<\/script>

<form class="flex w-80 flex-col gap-3" {onsubmit}>
  <div class="flex flex-col gap-1.5">
    <label for="form-message" class="text-sm font-medium text-fg">Message</label>
    <Textarea id="form-message" name="message" controller={message} required rows={3} />
  </div>
  <div class="flex gap-2">
    <Button type="submit" size="sm"><Send aria-hidden="true" /> Send</Button>
    <Button type="button" size="sm" tone="outline" onclick={() => message.clear()}>
      <Trash2 aria-hidden="true" /> Clear
    </Button>
  </div>
  <p class="text-sm text-muted">{log}</p>
</form>`

  let bio = $state("Product designer in Lisbon. I write about type and interfaces.")
  let sent = $state("")
  let log = $state("")
  const message = createInputController()

  function onsubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    log = "Sent: " + data.get("message")
    message.clear()
  }
</script>

<svelte:head>
  <title>Textarea — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Textarea"
  description="A multi-line text field for messages, notes and descriptions. Wraps the ui-sdk Textarea, which can grow with its text, submit from the keyboard and report the same change reasons as Input."
  entry="@ui-sdk/svelte/textarea"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Textarea is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/textarea</code>. Import it from the library:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      It is a single part: <code class="font-mono text-accent">Textarea</code> renders a native
      <code class="font-mono text-accent">&lt;textarea&gt;</code>, so
      <code class="font-mono text-accent">rows</code>, <code class="font-mono text-accent">maxlength</code>,
      <code class="font-mono text-accent">spellcheck</code> and every other native attribute pass through.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Give it a visible <code class="font-mono text-accent">&lt;label&gt;</code> or an
      <code class="font-mono text-accent">aria-label</code>. Press
      <span class="text-fg">Enter</span> to start a new line. Its text is the element's content, so it
      takes no children.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Click the label to focus the field, then type. Enter starts a new line." code={usageCode}>
      <div class="flex w-80 flex-col gap-1.5">
        <label for="basic-message" class="text-sm font-medium text-fg">Message</label>
        <Textarea id="basic-message" rows={4} />
      </div>
    </Demo>

    <Demo
      title="Controlled with a character count"
      description="bind:value drives the count, and the native maxlength caps the text at 160 characters."
      code={controlledCode}
    >
      <div class="flex w-80 flex-col gap-1.5">
        <label for="controlled-bio" class="text-sm font-medium text-fg">Bio</label>
        <Textarea id="controlled-bio" bind:value={bio} maxlength={160} rows={3} />
        <p class="text-sm text-muted tabular-nums">{bio.length} / 160 characters</p>
      </div>
    </Demo>

    <Demo
      title="Auto resize"
      description="autoResize grows and shrinks with the text. CSS min-height and max-height bound it; past the maximum it scrolls. Set resize=none so the drag handle doesn't fight it."
      code={autoResizeCode}
    >
      <div class="flex w-80 flex-col gap-1.5">
        <label for="auto-notes" class="text-sm font-medium text-fg">Notes</label>
        <Textarea id="auto-notes" autoResize resize="none" class="min-h-20 max-h-60" />
        <p class="text-sm text-muted">Your driver sees these notes.</p>
      </div>
    </Demo>

    <Demo
      title="Submit shortcut"
      description="With mod+enter, Enter still adds a line and Cmd/Ctrl+Enter submits. onSubmit receives the value instead of submitting a form."
      code={shortcutCode}
    >
      <div class="flex w-80 flex-col gap-1.5">
        <label for="shortcut-reply" class="text-sm font-medium text-fg">Reply</label>
        <Textarea
          id="shortcut-reply"
          rows={3}
          submitShortcut="mod+enter"
          onSubmit={(value) => (sent = value)}
        />
        <p class="text-sm text-muted">
          {sent ? "Sent: " + sent : "Press Cmd/Ctrl+Enter to send. Enter adds a line."}
        </p>
      </div>
    </Demo>

    <Demo
      title="In a form"
      description="The value submits under name. required blocks an empty message, and a controller clears the field after sending."
      code={formCode}
    >
      <form class="flex w-80 flex-col gap-3" {onsubmit}>
        <div class="flex flex-col gap-1.5">
          <label for="form-message" class="text-sm font-medium text-fg">Message</label>
          <Textarea id="form-message" name="message" controller={message} required rows={3} />
        </div>
        <div class="flex gap-2">
          <Button type="submit" size="sm"><Send aria-hidden="true" /> Send</Button>
          <Button type="button" size="sm" tone="outline" onclick={() => message.clear()}>
            <Trash2 aria-hidden="true" /> Clear
          </Button>
        </div>
        <p class="text-sm text-muted">{log}</p>
      </form>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">size</code> sets text size and padding;
      <code class="font-mono text-accent">resize</code> sets which way the corner drags. State is
      exposed as <code class="font-mono text-accent">data-filled</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code> and
      <code class="font-mono text-accent">data-required</code>.
    </p>
    <Demo title="Sizes" description="Three text sizes with matching padding." code={sizesCode}>
      <div class="flex w-80 flex-col gap-3">
        <Textarea size="sm" aria-label="Small" rows={2} defaultValue="Small" />
        <Textarea size="md" aria-label="Medium" rows={2} defaultValue="Medium" />
        <Textarea size="lg" aria-label="Large" rows={2} defaultValue="Large" />
      </div>
    </Demo>
    <Demo
      title="States"
      description="Disabled leaves the tab order and the submitted values. Read-only stays focusable and submitted. Invalid marks the field for assistive technology and turns the border danger."
      code={statesCode}
    >
      <div class="flex w-80 flex-col gap-3">
        <Textarea disabled aria-label="Disabled" rows={2} defaultValue="Replies are closed for this thread." />
        <Textarea readOnly aria-label="Read only" rows={2} defaultValue="Set by your plan." />
        <Textarea aria-invalid="true" data-invalid aria-label="Invalid" rows={2} defaultValue="Great." />
      </div>
    </Demo>
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "text-[13px]", description: "Compact, for dense forms." },
        { name: "md", type: "default", default: "text-sm", description: "Default." },
        { name: "lg", type: "string", default: "text-base", description: "Prominent, for long-form writing." },
      ]}
    />
    <PropsTable
      caption="resize"
      rows={[
        { name: "vertical", type: "default", description: "Drag the corner to change the height. The default." },
        { name: "none", type: "string", description: "No drag handle. Use with autoResize." },
        { name: "both", type: "string", description: "Drag to change height and width." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Textarea forwards every native textarea attribute. Its
      <code class="font-mono text-accent">render</code> snippet receives the props to spread and the
      state; the element's content is its text, so a
      <code class="font-mono text-accent">children</code> snippet is not used.
    </p>
    <PropsTable
      caption="Textarea — Negentropy props"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Text size and padding." },
        { name: "resize", type: '"vertical" | "none" | "both"', default: '"vertical"', description: "Which way the user can drag the corner." },
        { name: "class", type: "string", description: "Extra classes merged onto the element (user wins). Use min-h/max-h to bound autoResize." },
      ]}
    />
    <PropsTable
      caption="Textarea — ui-sdk options"
      rows={[
        { name: "value", type: "string", description: "The text. Bind it with bind:value to control the field." },
        { name: "defaultValue", type: "string", description: "The text it starts with when uncontrolled. A form reset returns here." },
        { name: "onValueChange", type: "(value: string, details: ChangeDetails<InputValueChangeReason>) => void", description: "Runs on typing, a form reset or a controller write. details.cancel() keeps the text as it was." },
        { name: "autoResize", type: "boolean", default: "false", description: "Grows and shrinks with the text. Bound it with CSS min-height and max-height; past the maximum it scrolls." },
        { name: "submitShortcut", type: '"enter" | "mod+enter"', description: 'Which keys submit. "enter" submits and Shift+Enter adds a line; "mod+enter" adds a line on Enter and submits on Cmd/Ctrl+Enter. Without it, Enter always adds a line.' },
        { name: "onSubmit", type: "(value: string, details: TextareaSubmitDetails) => void", description: "Runs on the submit shortcut unless an input method is composing. Without it, the shortcut submits the enclosing form." },
        { name: "controller", type: "InputController", description: "Reads and writes the field from anywhere. Create one with createInputController()." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the field. A disabled Field or fieldset applies too." },
        { name: "readOnly", type: "boolean", default: "false", description: "Makes the field read-only. A native readonly attribute does the same." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission while empty, with the browser's own message." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="State (render snippet)"
      rows={[
        { name: "filled", type: "boolean", description: "Whether the field holds any text." },
        { name: "disabled", type: "boolean", description: "Whether the field is disabled." },
        { name: "readOnly", type: "boolean", description: "Whether the field is read-only." },
        { name: "required", type: "boolean", description: "Whether the field is required." },
      ]}
    />
    <PropsTable
      caption="TextareaSubmitDetails"
      rows={[
        { name: "event", type: "Event | undefined", description: "The key press that submitted." },
      ]}
    />
    <PropsTable
      caption="Change reasons"
      rows={[
        { name: "input-change", type: "Event", description: "Typing, pasting or dropping changed the value." },
        { name: "reset", type: "none", description: "A form reset." },
        { name: "imperative", type: "none", description: "A controller call." },
      ]}
    />
    <PropsTable
      caption="createInputController()"
      rows={[
        { name: "getValue()", type: "() => string", description: "The current value." },
        { name: "setValue(value, options?)", type: "(string, ChangeOptions?) => boolean", description: "Sets the value as if typed, so input fires. False when canceled or unchanged." },
        { name: "clear(options?)", type: "(ChangeOptions?) => boolean", description: "Empties the field. False when canceled or unchanged." },
        { name: "focus()", type: "() => void", description: "Moves focus to the field." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>
        There is no WAI-ARIA pattern for a multi-line text field. It stays a native
        <code class="font-mono text-accent">&lt;textarea&gt;</code>, with standard text editing,
        selection, spell checking and form behavior.
      </li>
      <li>
        Give it a visible <code class="font-mono text-accent">&lt;label&gt;</code> or an
        <code class="font-mono text-accent">aria-label</code>. The label names the field and clicking
        it focuses the textarea. Keep descriptions and errors in their Field parts so they are
        associated with it.
      </li>
      <li>
        Without <code class="font-mono text-accent">submitShortcut</code>,
        <span class="text-fg">Enter</span> starts a new line and never submits.
      </li>
      <li>
        With <code class="font-mono text-accent">submitShortcut="enter"</code>,
        <span class="text-fg">Enter</span> submits the form and
        <span class="text-fg">Shift+Enter</span> starts a new line.
      </li>
      <li>
        With <code class="font-mono text-accent">submitShortcut="mod+enter"</code>,
        <span class="text-fg">Enter</span> starts a new line and
        <span class="text-fg">Cmd/Ctrl+Enter</span> submits.
      </li>
      <li>
        <span class="text-fg">Enter</span> while an input method is composing never submits, so
        choosing a candidate word is safe.
      </li>
      <li>
        The shortcut submits like a submit button, so <code class="font-mono text-accent">required</code>
        and the form's own submit handler still apply.
      </li>
      <li>
        For <code class="font-mono text-accent">autoResize</code>, set
        <code class="font-mono text-accent">min-height</code> and
        <code class="font-mono text-accent">max-height</code> so growth is bounded and the label stays
        put. Browsers with <code class="font-mono text-accent">field-sizing: content</code> size it
        natively; elsewhere it measures on value change, form reset and width change.
      </li>
    </ul>
  </Section>
</div>