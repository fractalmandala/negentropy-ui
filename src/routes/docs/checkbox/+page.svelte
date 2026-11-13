<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Checkbox,
    CheckboxIndicator,
    CheckboxGroup,
    type CheckedState,
  } from "#lib/components/checkbox"
  import { Button } from "#lib/components/button"
  import { Check, Minus } from "@lucide/svelte"

  const installCode = `import { Checkbox, CheckboxIndicator, CheckboxGroup } from "#lib/components/checkbox"`

  const usageCode = `<script lang="ts">
  import { Checkbox, CheckboxIndicator } from "#lib/components/checkbox"
  import { Check } from "@lucide/svelte"
<\/script>

<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox>
    <CheckboxIndicator>
      <Check aria-hidden="true" />
    </CheckboxIndicator>
  </Checkbox>
  Accept terms and conditions
</label>`

  const controlledCode = `<script lang="ts">
  import { Checkbox, CheckboxIndicator, type CheckedState } from "#lib/components/checkbox"
  import { Button } from "#lib/components/button"
  import { Check } from "@lucide/svelte"

  let checked = $state<CheckedState>(false)
<\/script>

<Button size="sm" tone="outline" onclick={() => (checked = !checked)}>Toggle from outside</Button>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox bind:checked>
    <CheckboxIndicator>
      <Check aria-hidden="true" />
    </CheckboxIndicator>
  </Checkbox>
  Email me about product updates
</label>
<p class="text-sm text-muted">State: {String(checked)}</p>`

  const groupCode = `<script lang="ts">
  import { Checkbox, CheckboxGroup, CheckboxIndicator } from "#lib/components/checkbox"
  import { Check, Minus } from "@lucide/svelte"

  const toppings = [
    { value: "cheese", label: "Cheese" },
    { value: "mushrooms", label: "Mushrooms" },
    { value: "olives", label: "Olives" },
    { value: "peppers", label: "Peppers" },
  ]
<\/script>

<CheckboxGroup aria-label="Toppings" defaultValue={["cheese", "olives"]} allValues={toppings.map((t) => t.value)}>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-fg">
    <Checkbox parent>
      <CheckboxIndicator>
        {#snippet children(state)}
          {#if state.indeterminate}<Minus aria-hidden="true" />{:else}<Check aria-hidden="true" />{/if}
        {/snippet}
      </CheckboxIndicator>
    </Checkbox>
    Select all
  </label>
  <div class="flex flex-col gap-2.5 border-l border-line pl-4">
    {#each toppings as topping (topping.value)}
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        <Checkbox value={topping.value}>
          <CheckboxIndicator>
            <Check aria-hidden="true" />
          </CheckboxIndicator>
        </Checkbox>
        {topping.label}
      </label>
    {/each}
  </div>
</CheckboxGroup>`

  const sizesCode = `<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox size="sm" defaultChecked>
    <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
  </Checkbox>
  Small
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox size="md" defaultChecked>
    <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
  </Checkbox>
  Medium
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox size="lg" defaultChecked>
    <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
  </Checkbox>
  Large
</label>`

  const statesCode = `<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox defaultChecked disabled>
    <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
  </Checkbox>
  Disabled (always on)
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox name="two-factor" defaultChecked readOnly>
    <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
  </Checkbox>
  Read-only (managed elsewhere)
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  <Checkbox defaultChecked="indeterminate">
    <CheckboxIndicator>
      {#snippet children(state)}
        {#if state.indeterminate}<Minus aria-hidden="true" />{:else}<Check aria-hidden="true" />{/if}
      {/snippet}
    </CheckboxIndicator>
  </Checkbox>
  Indeterminate (a press checks it)
</label>`

  const formCode = `<script lang="ts">
  import { Checkbox, CheckboxIndicator } from "#lib/components/checkbox"
  import { Button } from "#lib/components/button"
  import { Check } from "@lucide/svelte"

  let submitted = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const entries = [...new FormData(event.currentTarget)].map(([name, value]) => name + "=" + value)
    submitted = entries.length ? entries.join("&") : "nothing"
  }
<\/script>

<form class="flex flex-col gap-3" onsubmit={onSubmit}>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Checkbox name="terms" value="yes" required>
      <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
    </Checkbox>
    Accept terms and conditions
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Checkbox name="newsletter" value="weekly" defaultChecked>
      <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
    </Checkbox>
    Send me the weekly newsletter
  </label>
  <div class="flex gap-2">
    <Button type="submit" size="sm">Create account</Button>
    <Button type="reset" size="sm" tone="outline">Reset</Button>
  </div>
</form>
<p class="text-sm text-muted">Submitted: {submitted || "not yet"}</p>`

  const toppings = [
    { value: "cheese", label: "Cheese" },
    { value: "mushrooms", label: "Mushrooms" },
    { value: "olives", label: "Olives" },
    { value: "peppers", label: "Peppers" },
  ]

  let controlled = $state<CheckedState>(false)
  let submitted = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const entries = [...new FormData(event.currentTarget)].map(([name, value]) => name + "=" + value)
    submitted = entries.length ? entries.join("&") : "nothing"
  }
</script>

<svelte:head>
  <title>Checkbox — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Checkbox"
  description="Choose one or more options, on their own or as a group with a select-all parent. Wraps the ui-sdk Checkbox, which pairs a button with the checkbox role with a hidden native input that takes part in forms."
  entry="@ui-sdk/svelte/checkbox"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Checkbox is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/checkbox</code>. Import the parts from the library:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      The behavior comes from <code class="font-mono text-accent">@ui-sdk/core</code>, installed alongside
      <code class="font-mono text-accent">@ui-sdk/svelte</code>. Controllers are re-exported too:
      <code class="font-mono text-accent">createCheckboxController</code> and
      <code class="font-mono text-accent">createCheckboxGroupController</code>.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Wrap the checkbox and its text in a <code class="font-mono text-accent">&lt;label&gt;</code> so clicking
      the text toggles it. <code class="font-mono text-accent">CheckboxIndicator</code> renders only while the
      checkbox is checked or indeterminate, so put the check icon inside it.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Click the box or its label, or focus it and press Space." code={usageCode}>
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        <Checkbox>
          <CheckboxIndicator>
            <Check aria-hidden="true" />
          </CheckboxIndicator>
        </Checkbox>
        Accept terms and conditions
      </label>
    </Demo>

    <Demo title="Controlled" description="bind:checked owns the value, so a button elsewhere can change it." code={controlledCode}>
      <div class="flex w-full max-w-sm flex-col gap-3">
        <Button size="sm" tone="outline" onclick={() => (controlled = !controlled)}>Toggle from outside</Button>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          <Checkbox bind:checked={controlled}>
            <CheckboxIndicator>
              <Check aria-hidden="true" />
            </CheckboxIndicator>
          </Checkbox>
          Email me about product updates
        </label>
        <p class="text-sm text-muted">State: {String(controlled)}</p>
      </div>
    </Demo>

    <Demo
      title="Group with select all"
      description="CheckboxGroup keeps one list of values. A parent checkbox checks them all and shows mixed when only some are checked."
      code={groupCode}
    >
      <div class="w-full max-w-xs">
        <CheckboxGroup aria-label="Toppings" defaultValue={["cheese", "olives"]} allValues={toppings.map((t) => t.value)}>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-fg">
            <Checkbox parent>
              <CheckboxIndicator>
                {#snippet children(state)}
                  {#if state.indeterminate}<Minus aria-hidden="true" />{:else}<Check aria-hidden="true" />{/if}
                {/snippet}
              </CheckboxIndicator>
            </Checkbox>
            Select all
          </label>
          <div class="flex flex-col gap-2.5 border-l border-line pl-4">
            {#each toppings as topping (topping.value)}
              <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
                <Checkbox value={topping.value}>
                  <CheckboxIndicator>
                    <Check aria-hidden="true" />
                  </CheckboxIndicator>
                </Checkbox>
                {topping.label}
              </label>
            {/each}
          </div>
        </CheckboxGroup>
      </div>
    </Demo>

    <Demo title="Sizes" description="size='sm' | 'md' | 'lg' scales the box and its icon together." code={sizesCode}>
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        <Checkbox size="sm" defaultChecked>
          <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
        </Checkbox>
        Small
      </label>
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        <Checkbox size="md" defaultChecked>
          <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
        </Checkbox>
        Medium
      </label>
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        <Checkbox size="lg" defaultChecked>
          <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
        </Checkbox>
        Large
      </label>
    </Demo>

    <Demo
      title="Disabled, read-only and indeterminate"
      description="Disabled leaves the tab order; read-only stays focusable and submits; indeterminate reports aria-checked='mixed'."
      code={statesCode}
    >
      <div class="flex flex-col gap-3">
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          <Checkbox defaultChecked disabled>
            <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
          </Checkbox>
          Disabled (always on)
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          <Checkbox name="two-factor" defaultChecked readOnly>
            <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
          </Checkbox>
          Read-only (managed elsewhere)
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          <Checkbox defaultChecked="indeterminate">
            <CheckboxIndicator>
              {#snippet children(state)}
                {#if state.indeterminate}<Minus aria-hidden="true" />{:else}<Check aria-hidden="true" />{/if}
              {/snippet}
            </CheckboxIndicator>
          </Checkbox>
          Indeterminate (a press checks it)
        </label>
      </div>
    </Demo>

    <Demo title="In a form" description="name and value submit when checked; required blocks submission; Reset restores defaultChecked." code={formCode}>
      <div class="w-full max-w-sm space-y-3">
        <form class="flex flex-col gap-3" onsubmit={onSubmit}>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Checkbox name="terms" value="yes" required>
              <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
            </Checkbox>
            Accept terms and conditions
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Checkbox name="newsletter" value="weekly" defaultChecked>
              <CheckboxIndicator><Check aria-hidden="true" /></CheckboxIndicator>
            </Checkbox>
            Send me the weekly newsletter
          </label>
          <div class="flex gap-2">
            <Button type="submit" size="sm">Create account</Button>
            <Button type="reset" size="sm" tone="outline">Reset</Button>
          </div>
        </form>
        <p class="text-sm text-muted">Submitted: {submitted || "not yet"}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Checkbox has one visual axis, <code class="font-mono text-accent">size</code>. Its state is exposed as
      data attributes, so you can restyle any state without new props.
    </p>
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "size-3.5", description: "Compact, for dense tables and toolbars." },
        { name: "md", type: "default", default: "size-4", description: "Default." },
        { name: "lg", type: "string", default: "size-5", description: "Prominent, for touch targets." },
      ]}
    />
    <PropsTable
      caption="State attributes (Checkbox and CheckboxIndicator)"
      rows={[
        { name: "data-checked", type: "attribute", description: "Present while checked. The wrapper fills it with the accent." },
        { name: "data-unchecked", type: "attribute", description: "Present while unchecked." },
        { name: "data-indeterminate", type: "attribute", description: "Present while mixed. Also fills with the accent." },
        { name: "data-disabled", type: "attribute", description: "Present when disabled by its own prop, its group or a fieldset." },
        { name: "data-readonly", type: "attribute", description: "Present when read-only." },
        { name: "data-required", type: "attribute", description: "Present when a form won't submit until it's checked." },
        { name: "data-starting-style", type: "attribute", description: "Indicator only: its first frame. The wrapper scales and fades from it." },
        { name: "data-ending-style", type: "attribute", description: "Indicator only: while it animates out, before it unmounts." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Every part forwards native HTML attributes plus its <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive the part's state.
    </p>
    <PropsTable
      caption="Checkbox — Negentropy props"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Box and icon size." },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
      ]}
    />
    <PropsTable
      caption="Checkbox — ui-sdk options"
      rows={[
        { name: "checked", type: "CheckedState", description: "true, false or 'indeterminate'. Bind with bind:checked to control." },
        { name: "defaultChecked", type: "CheckedState", default: "false", description: "Initial state when uncontrolled. A form reset returns to it." },
        { name: "onCheckedChange", type: "(checked, details) => void", description: "Runs when a user or a reset wants to change it. details.cancel() stops it." },
        { name: "disabled", type: "boolean", default: "false", description: "Can't be focused or changed, and isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Stays focusable and submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until checked. Indeterminate doesn't count." },
        { name: "name", type: "string", description: "The name it submits under. Without one it submits nothing." },
        { name: "value", type: "string", default: '"on"', description: "What it submits while checked." },
        { name: "form", type: "string", description: "The id of a form to join from elsewhere on the page." },
        { name: "parent", type: "boolean", default: "false", description: "Makes it the group's select-all: checks every value, shows mixed for some." },
        { name: "controller", type: "CheckboxController", description: "Drive it from anywhere via createCheckboxController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="CheckboxIndicator"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "Stay in the page while unchecked, with data-unchecked, to style both states." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
        { name: "children", type: "Snippet<[CheckboxIndicatorState]>", description: "The check. Receives state, so it can swap icons while indeterminate." },
      ]}
    />
    <PropsTable
      caption="CheckboxGroup"
      rows={[
        { name: "value", type: "string[]", description: "The checked values, in document order. Bind with bind:value to control." },
        { name: "defaultValue", type: "string[]", default: "[]", description: "Initial values when uncontrolled. A form reset returns to them." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when a checkbox or a reset wants to change the list. details.cancel() stops it." },
        { name: "allValues", type: "string[]", description: "Every value a parent checks. Pass it so the parent is right on the server." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables every checkbox in the group." },
        { name: "readOnly", type: "boolean", default: "false", description: "Every checkbox stays focusable and submitted, but presses don't change it." },
        { name: "required", type: "boolean", default: "false", description: "Blocks submission until at least one checkbox is checked." },
        { name: "name", type: "string", description: "The name every checked value submits under." },
        { name: "form", type: "string", description: "The id of a form to join from elsewhere on the page." },
        { name: "controller", type: "CheckboxGroupController", description: "Set values from anywhere via createCheckboxGroupController()." },
        { name: "class", type: "string", description: "Extra classes merged onto the group element." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "checked", type: "boolean", description: "Whether it's checked. False while indeterminate." },
        { name: "indeterminate", type: "boolean", description: "Whether it's mixed. A press makes it checked." },
        { name: "disabled", type: "boolean", description: "Disabled by itself, its group or a fieldset." },
        { name: "readOnly", type: "boolean", description: "Focusable and submitted, but presses don't change it." },
        { name: "required", type: "boolean", description: "A form won't submit until it's checked." },
        { name: "value", type: "string[]", description: "CheckboxGroup only: the checked values." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA checkbox pattern: a button with <code class="font-mono text-accent">role="checkbox"</code> and <code class="font-mono text-accent">aria-checked</code>, plus a hidden native checkbox that takes part in forms.</li>
      <li><span class="text-fg">Tab</span> moves to the next checkbox; <span class="text-fg">Space</span> checks or unchecks it, or checks a mixed one; <span class="text-fg">Enter</span> submits its form and never toggles it.</li>
      <li>Clicking the checkbox or its label toggles it once. Wrap both in a <code class="font-mono text-accent">&lt;label&gt;</code>, or give an icon-only checkbox an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>An indeterminate checkbox reports <code class="font-mono text-accent">aria-checked="mixed"</code> and <code class="font-mono text-accent">data-indeterminate</code>. Only your code puts it back into the mixed state; a press checks it.</li>
      <li>A group's parent follows the mixed-checkbox example: it points at its children with <code class="font-mono text-accent">aria-controls</code> and submits nothing itself.</li>
      <li>Name a group with <code class="font-mono text-accent">aria-label</code> or <code class="font-mono text-accent">aria-labelledby</code>. A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables the checkboxes inside it.</li>
      <li>Read-only checkboxes stay in the tab order and still submit, so a setting managed elsewhere remains readable.</li>
    </ul>
  </Section>
</div>