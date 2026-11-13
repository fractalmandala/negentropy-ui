<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import { Label } from "$lib/components/label"

  const inputClass =
    "h-9 w-full rounded-md border border-line bg-surface px-3 text-sm text-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
  const choiceClass = "size-4 accent-accent"

  const installCode = `import { Label } from "$lib/components/label"`

  const usageCode = `<script lang="ts">
  import { Label } from "$lib/components/label"
<\/script>

<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="display-name">Display name</Label>
  <input id="display-name" type="text" autocomplete="name" class="${inputClass}" />
</div>`

  const wrapCode = `<Label>
  <input type="checkbox" name="terms" class="${choiceClass}" />
  Accept terms and conditions
</Label>`

  const groupCode = `<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="shipping-speed">Shipping speed</Label>
  <div id="shipping-speed" role="radiogroup" class="flex flex-col gap-2">
    <Label><input type="radio" name="speed" value="standard" checked class="${choiceClass}" /> Standard</Label>
    <Label><input type="radio" name="speed" value="express" class="${choiceClass}" /> Express</Label>
    <Label><input type="radio" name="speed" value="overnight" class="${choiceClass}" /> Overnight</Label>
  </div>
</div>`

  const rangeCode = `<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="volume">Volume</Label>
  <input id="volume" type="range" min="0" max="100" value="75" class="w-full accent-accent" />
</div>`

  const disabledCode = `<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="account-id">Account ID</Label>
  <input id="account-id" type="text" value="4815162342" disabled class="${inputClass}" />
</div>`

  const renderCode = `<div class="flex w-full max-w-xs flex-col gap-2">
  <Label for="note">
    {#snippet render({ props })}
      <span {...props} class="text-xs font-semibold uppercase tracking-wide text-muted">Note</span>
    {/snippet}
  </Label>
  <input id="note" type="text" class="${inputClass}" />
</div>`
</script>

<svelte:head>
  <title>Label — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Label"
  description="Name any control with a label, and let a press on the label reach it. Wraps the ui-sdk Label, which names controls a native label cannot reach — a radio group, a slider, a switch — and activates them on press."
  entry="@ui-sdk/svelte/label"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Label is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/label</code>. Import it from the library:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      Inside a <a href="/docs/field" class="text-accent underline">Field</a>, use
      <code class="font-mono text-accent">FieldLabel</code> instead: it also ties the field's
      description and errors to the control. The ui-sdk label primitive is marked experimental
      upstream; its behavior is covered by the tests listed under Accessibility.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Point <code class="font-mono text-accent">for</code> at the control's
      <code class="font-mono text-accent">id</code>, or wrap the control and skip the id. Label
      renders a native <code class="font-mono text-accent">&lt;label&gt;</code>: when the browser
      can reach the control on its own it does, and for anything else the control takes the label
      as its name and a press activates it.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Pointing at a control"
      description="Press the label to focus the input. A native label reaches an input on its own."
      code={usageCode}
    >
      <div class="flex w-full max-w-xs flex-col gap-2">
        <Label for="display-name">Display name</Label>
        <input id="display-name" type="text" autocomplete="name" class={inputClass} />
      </div>
    </Demo>

    <Demo
      title="Wrapping a control"
      description="Put the control inside the label and you need no id. Pressing anywhere on the text toggles the checkbox, and a double click doesn't select the text."
      code={wrapCode}
    >
      <Label>
        <input type="checkbox" name="terms" class={choiceClass} />
        Accept terms and conditions
      </Label>
    </Demo>

    <Demo
      title="Naming a group"
      description="A radiogroup isn't labelable, so a native label can't name it. Label writes aria-labelledby onto the group; each radio keeps a label of its own."
      code={groupCode}
    >
      <div class="flex w-full max-w-xs flex-col gap-2">
        <Label for="shipping-speed">Shipping speed</Label>
        <div id="shipping-speed" role="radiogroup" class="flex flex-col gap-2">
          <Label><input type="radio" name="speed" value="standard" checked class={choiceClass} /> Standard</Label>
          <Label><input type="radio" name="speed" value="express" class={choiceClass} /> Express</Label>
          <Label><input type="radio" name="speed" value="overnight" class={choiceClass} /> Overnight</Label>
        </div>
      </div>
    </Demo>

    <Demo
      title="A range control"
      description="Press Volume to focus the thumb, then use the arrow keys. The control reads as Volume."
      code={rangeCode}
    >
      <div class="flex w-full max-w-xs flex-col gap-2">
        <Label for="volume">Volume</Label>
        <input id="volume" type="range" min="0" max="100" value="75" class="w-full accent-accent" />
      </div>
    </Demo>

    <Demo
      title="A disabled control"
      description="A press on the label of a disabled control does nothing and moves no focus."
      code={disabledCode}
    >
      <div class="flex w-full max-w-xs flex-col gap-2">
        <Label for="account-id">Account ID</Label>
        <input id="account-id" type="text" value="4815162342" disabled class={inputClass} />
      </div>
    </Demo>

    <Demo
      title="Another element"
      description="The render snippet swaps in a span. A label that isn't a label still names its control and reaches it on a press."
      code={renderCode}
    >
      <div class="flex w-full max-w-xs flex-col gap-2">
        <Label for="note">
          {#snippet render({ props })}
            <span {...props} class="text-xs font-semibold uppercase tracking-wide text-muted">Note</span>
          {/snippet}
        </Label>
        <input id="note" type="text" class={inputClass} />
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Label has one visual shape and no variant props: it is inline-flex, medium weight, with a
      gap for a control it wraps. Override it with <code class="font-mono text-accent">class</code>,
      which wins. Its only state attribute is <code class="font-mono text-accent">data-slot="label"</code>;
      a disabled control is styled on the control, not the label.
    </p>
    <PropsTable
      caption="Ways to connect a label"
      rows={[
        { name: "for", type: "id reference", description: "Names the control with that id, even one that renders after the label or isn't labelable." },
        { name: "wrapping", type: "composition", description: "Put the control inside the label. No id needed; native label behavior applies." },
        { name: "render", type: "snippet", description: "Render a span or another element. Naming and press still work." },
      ]}
    />
    <PropsTable
      caption="What a press does"
      rows={[
        { name: "input, select, textarea", type: "native", description: "Focuses the control, as a native label does." },
        { name: "checkbox, switch, radio", type: "activate", description: "Checks or toggles it." },
        { name: "radio group", type: "activate", description: "Reaches the group; a ui-sdk RadioGroup focuses its checked radio." },
        { name: "slider", type: "focus", description: "Focuses the thumb, which takes the label as its name." },
        { name: "disabled control", type: "none", description: "Nothing happens and no focus moves." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Label forwards every native label attribute, plus the
      <code class="font-mono text-accent">render</code> and <code class="font-mono text-accent">children</code>
      snippets. It has no state of its own, so the snippets receive an empty state object.
    </p>
    <PropsTable
      caption="Label — Negentropy props"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element (user wins)." },
      ]}
    />
    <PropsTable
      caption="Label — ui-sdk options and attributes"
      rows={[
        { name: "for", type: "string", description: "The id of the control it names. Omit it when the label wraps the control." },
        { name: "id", type: "string", description: "Its own id, generated when you leave it out. The control's aria-labelledby points at it." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
        { name: "children", type: "Snippet", description: "The label text, and any control it wraps." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Render your own element and spread props onto it." },
      ]}
    />
    <PropsTable
      caption="Styling hooks"
      rows={[
        { name: "data-slot", type: '"label"', description: "Always present. The label carries no state attributes." },
        { name: "user-select", type: "built in", description: "A double click doesn't select the label's text, so you don't need user-select: none." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>A native <code class="font-mono text-accent">&lt;label&gt;</code> names the element its <code class="font-mono text-accent">for</code> points at only when that element is labelable, like an input or a button. Label names any other control through <code class="font-mono text-accent">aria-labelledby</code>.</li>
      <li>A control with an <code class="font-mono text-accent">aria-label</code> or an <code class="font-mono text-accent">aria-labelledby</code> of its own keeps that name; the author's name wins.</li>
      <li>A press does what a native label's does: it checks a checkbox, a switch or a radio, focuses a group's checked radio, and focuses anything else. A press on a disabled control does nothing.</li>
      <li>A label names a control that renders after it, so order in the markup doesn't matter.</li>
      <li>A double click on a label doesn't select its text.</li>
      <li>Give every control a visible label. Inside a field, <code class="font-mono text-accent">FieldLabel</code> also connects the description and errors.</li>
    </ul>
  </Section>
</div>