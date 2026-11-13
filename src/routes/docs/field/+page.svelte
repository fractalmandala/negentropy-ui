<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldControl,
    FieldSet,
    FieldLegend,
    FieldGroup,
  } from "$lib/components/field"
  import { Button } from "$lib/components/button"

  const installCode = `import {
  Field, FieldLabel, FieldDescription, FieldError, FieldControl,
  FieldSet, FieldLegend, FieldGroup,
} from "$lib/components/field"`

  const usageCode = `<script lang="ts">
  import {
    Field, FieldLabel, FieldDescription, FieldError, FieldControl,
  } from "$lib/components/field"
<\/script>

<Field name="username">
  <FieldLabel>Username</FieldLabel>
  <FieldControl autocomplete="username" required />
  <FieldDescription>This is your public name.</FieldDescription>
  <FieldError />
</Field>`

  const validationCode = `<script lang="ts">
  import {
    Field, FieldLabel, FieldDescription, FieldError, FieldControl,
  } from "$lib/components/field"
  import { Button } from "$lib/components/button"

  let sent = $state("")

  function submit(event: SubmitEvent) {
    event.preventDefault()
    sent = String(new FormData(event.currentTarget as HTMLFormElement).get("email"))
  }
<\/script>

<form class="flex w-full flex-col gap-4" onsubmit={submit}>
  <Field name="email">
    <FieldLabel>Email</FieldLabel>
    <FieldControl type="email" required autocomplete="email" />
    <FieldDescription>
      {#snippet children(state)}
        {state.valid ? "Looks good." : "We'll send you a confirmation link."}
      {/snippet}
    </FieldDescription>
    <FieldError match="valueMissing">Enter your email address.</FieldError>
    <FieldError match="typeMismatch">Enter an address like hollis@example.com.</FieldError>
  </Field>
  <Field name="website">
    <FieldLabel>Website</FieldLabel>
    <FieldControl type="url" required autocomplete="url" />
    <FieldError />
  </Field>
  <div><Button type="submit">Subscribe</Button></div>
</form>
{#if sent}<p class="text-sm text-success">Subscribed {sent}</p>{/if}`

  const serverErrorCode = `<script lang="ts">
  let serverError = $state<string | null>(null)
<\/script>

<Field name="email" invalid={serverError ? true : undefined}>
  <FieldLabel>Email</FieldLabel>
  <FieldControl type="email" required oninput={() => (serverError = null)} />
  <FieldError match="valueMissing">Enter your email address.</FieldError>
  {#if serverError}
    <FieldError match>{serverError}</FieldError>
  {/if}
</Field>
<Button
  tone="outline"
  size="sm"
  onclick={() => (serverError = "That address is already registered.")}
>
  Reject from server
</Button>`

  const fieldSetCode = `<script lang="ts">
  let sameAsShipping = $state(false)
<\/script>

<label class="flex items-center gap-2 text-sm text-fg">
  <input type="checkbox" bind:checked={sameAsShipping} />
  Billing is the same as shipping
</label>
<FieldSet disabled={sameAsShipping}>
  <FieldLegend>Billing address</FieldLegend>
  <FieldDescription>We need your address to deliver your order.</FieldDescription>
  <FieldGroup>
    <Field name="billing-street">
      <FieldLabel>Street address</FieldLabel>
      <FieldControl autocomplete="billing street-address" />
    </Field>
    <Field name="billing-city">
      <FieldLabel>City</FieldLabel>
      <FieldControl autocomplete="billing address-level2" />
    </Field>
  </FieldGroup>
</FieldSet>`

  const selectCode = `<Field name="department">
  <FieldLabel>Department</FieldLabel>
  <FieldControl>
    {#snippet render({ props })}
      <select {...props}>
        <option value="design">Design</option>
        <option value="engineering">Engineering</option>
        <option value="support">Support</option>
      </select>
    {/snippet}
  </FieldControl>
  <FieldDescription>Who should see your request.</FieldDescription>
</Field>`

  const statesCode = `<Field name="nickname">
  <FieldLabel>Nickname</FieldLabel>
  <FieldControl required />
  <FieldDescription>A required control marks every part with data-required.</FieldDescription>
</Field>
<Field name="legacy" disabled>
  <FieldLabel>Legacy ID</FieldLabel>
  <FieldControl value="4815162342" />
  <FieldDescription>A disabled field disables its control.</FieldDescription>
</Field>`

  let sent = $state("")
  let serverError = $state<string | null>(null)
  let sameAsShipping = $state(false)

  function submit(event: SubmitEvent) {
    event.preventDefault()
    sent = String(new FormData(event.currentTarget as HTMLFormElement).get("email"))
  }
</script>

<svelte:head>
  <title>Field — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Field"
  description="Connect a form control to its label, description and validation errors. Wraps the ui-sdk Field, which wires id, for and aria-describedby for you and replaces the browser's validation bubble with messages in the page."
  entry="@ui-sdk/svelte/field"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/field</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">FieldControl</code> renders a native
      <code class="font-mono text-accent">&lt;input&gt;</code>, or any element through its
      <code class="font-mono text-accent">render</code> snippet, and joins the field around it.
      A control of your own can join the same way with
      <code class="font-mono text-accent">useFieldControl()</code>, also exported from this entry.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the label, the control, the description and the error inside one
      <code class="font-mono text-accent">Field</code>. The label names the control; the description
      and any error that shows describe it. Give the field a
      <code class="font-mono text-accent">name</code> and the control submits under it.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Press the label to focus the control. The required mark comes from data-required, with no extra markup."
      code={usageCode}
    >
      <div class="w-full max-w-xs">
        <Field name="username">
          <FieldLabel>Username</FieldLabel>
          <FieldControl autocomplete="username" required />
          <FieldDescription>This is your public name.</FieldDescription>
          <FieldError />
        </Field>
      </div>
    </Demo>

    <Demo
      title="Validation"
      description="Submit empty or invalid to see errors in the page. The first invalid control takes focus, and errors clear as you correct the value."
      code={validationCode}
    >
      <div class="w-full max-w-sm space-y-4">
        <form class="flex w-full flex-col gap-4" onsubmit={submit}>
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <FieldControl type="email" required autocomplete="email" />
            <FieldDescription>
              {#snippet children(state)}
                {state.valid ? "Looks good." : "We'll send you a confirmation link."}
              {/snippet}
            </FieldDescription>
            <FieldError match="valueMissing">Enter your email address.</FieldError>
            <FieldError match="typeMismatch">Enter an address like hollis@example.com.</FieldError>
          </Field>
          <Field name="website">
            <FieldLabel>Website</FieldLabel>
            <FieldControl type="url" required autocomplete="url" />
            <FieldError />
          </Field>
          <div><Button type="submit">Subscribe</Button></div>
        </form>
        {#if sent}<p class="text-sm text-success">Subscribed {sent}</p>{/if}
      </div>
    </Demo>

    <Demo
      title="Errors from your code"
      description="Pass invalid when a server or form library supplies the error. match with no value shows your own message; typing clears it."
      code={serverErrorCode}
    >
      <div class="w-full max-w-sm space-y-4">
        <Field name="email" invalid={serverError ? true : undefined}>
          <FieldLabel>Email</FieldLabel>
          <FieldControl type="email" required oninput={() => (serverError = null)} />
          <FieldError match="valueMissing">Enter your email address.</FieldError>
          {#if serverError}
            <FieldError match>{serverError}</FieldError>
          {/if}
        </Field>
        <Button
          tone="outline"
          size="sm"
          onclick={() => (serverError = "That address is already registered.")}
        >
          Reject from server
        </Button>
      </div>
    </Demo>

    <Demo
      title="Field set"
      description="FieldSet is a native fieldset: disabling it disables every control inside and leaves them out of the form. The legend names the group."
      code={fieldSetCode}
    >
      <div class="w-full max-w-sm space-y-4">
        <label class="flex items-center gap-2 text-sm text-fg">
          <input type="checkbox" bind:checked={sameAsShipping} />
          Billing is the same as shipping
        </label>
        <FieldSet disabled={sameAsShipping}>
          <FieldLegend>Billing address</FieldLegend>
          <FieldDescription>We need your address to deliver your order.</FieldDescription>
          <FieldGroup>
            <Field name="billing-street">
              <FieldLabel>Street address</FieldLabel>
              <FieldControl autocomplete="billing street-address" />
            </Field>
            <Field name="billing-city">
              <FieldLabel>City</FieldLabel>
              <FieldControl autocomplete="billing address-level2" />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </Demo>

    <Demo
      title="A control we don't ship"
      description="The render snippet swaps in a native select and keeps the field's name, label, description and validity."
      code={selectCode}
    >
      <div class="w-full max-w-xs">
        <Field name="department">
          <FieldLabel>Department</FieldLabel>
          <FieldControl>
            {#snippet render({ props })}
              <select {...props}>
                <option value="design">Design</option>
                <option value="engineering">Engineering</option>
                <option value="support">Support</option>
              </select>
            {/snippet}
          </FieldControl>
          <FieldDescription>Who should see your request.</FieldDescription>
        </Field>
      </div>
    </Demo>

    <Demo
      title="Required and disabled"
      description="Every part of a field carries the same state attributes, so a label can turn red or dim with its control."
      code={statesCode}
    >
      <div class="w-full max-w-sm space-y-5">
        <Field name="nickname">
          <FieldLabel>Nickname</FieldLabel>
          <FieldControl required />
          <FieldDescription>A required control marks every part with data-required.</FieldDescription>
        </Field>
        <Field name="legacy" disabled>
          <FieldLabel>Legacy ID</FieldLabel>
          <FieldControl value="4815162342" />
          <FieldDescription>A disabled field disables its control.</FieldDescription>
        </Field>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Field has no visual variants of its own: it lays out and connects. Style from the state
      attributes every part shares. <code class="font-mono text-accent">FieldLabel</code> already
      shows a danger asterisk while <code class="font-mono text-accent">data-required</code> is
      present, and turns danger while <code class="font-mono text-accent">data-invalid</code> is.
    </p>
    <PropsTable
      caption="State attributes on every field part"
      rows={[
        { name: "data-disabled", type: "present", description: "The field is disabled, by its own prop or a fieldset around it." },
        { name: "data-invalid", type: "present", description: "The field shows as invalid: invalid you passed, or a submit found the control invalid." },
        { name: "data-valid", type: "present", description: "The browser's validation passes, once shown." },
        { name: "data-required", type: "present", description: "The control is required, read from required or aria-required." },
        { name: "data-focused", type: "present", description: "Focus is inside the control." },
        { name: "data-slot", type: "string", description: "field, field-label, field-description, field-error, field-control, field-set, field-legend, field-group." },
      ]}
    />
    <PropsTable
      caption="Composition"
      rows={[
        { name: "Field", type: "div", description: "One control with its label, description and errors. Stacks as a column." },
        { name: "FieldSet", type: "fieldset", description: "Groups related fields under a legend and disables them together." },
        { name: "FieldLegend", type: "legend", description: "Names the set. Keep it the set's first child." },
        { name: "FieldGroup", type: "div", description: "Stacks fields inside a set. No role and no state: the set is what names and disables." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      A field has no change events. Read its state from the parts' data attributes, or from the
      <code class="font-mono text-accent">render</code> and <code class="font-mono text-accent">children</code>
      snippets, which receive it. Every part forwards all native attributes and both snippets.
    </p>
    <PropsTable
      caption="Field (root)"
      rows={[
        { name: "name", type: "string", description: "The name the control submits under, when the control doesn't set its own." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the control and marks every part." },
        { name: "invalid", type: "boolean", description: "true shows errors now, false shows none whatever the browser thinks. Leave it out for the browser's own validation after a submit." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
        { name: "class", type: "string", description: "Extra classes merged onto the element (user wins)." },
      ]}
    />
    <PropsTable
      caption="FieldLabel"
      rows={[
        { name: "id", type: "string", description: "Its own id. The field generates one when you leave it out." },
        { name: "children", type: "Snippet<[FieldState]>", description: "The label text. Receives the field's state." },
        { name: "render", type: "Snippet", description: "Render another element. Outside a Field it is a plain label that names the control it wraps." },
        { name: "class", type: "string", description: "Extra classes merged onto the label." },
      ]}
    />
    <PropsTable
      caption="FieldDescription"
      rows={[
        { name: "children", type: "Snippet<[FieldDescriptionState]>", description: "The description. Receives the field's state, or only disabled when it describes a field set." },
        { name: "render", type: "Snippet", description: "Render another element, such as a span." },
        { name: "class", type: "string", description: "Extra classes merged onto the paragraph." },
      ]}
    />
    <PropsTable
      caption="FieldError"
      rows={[
        { name: "match", type: "boolean | ValidityKey", description: "When it shows. true always, false never, a validity flag like \"valueMissing\" only for that problem. Without it, any problem shows it." },
        { name: "children", type: "Snippet<[FieldErrorState]>", description: "Your message. Without content it shows state.message, the browser's message for the current problem." },
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
      ]}
    />
    <PropsTable
      caption="FieldControl"
      rows={[
        { name: "type", type: "string", default: '"text"', description: "The native input type, like email, url or tel." },
        { name: "name", type: "string", description: "Overrides the field's name for submission." },
        { name: "required", type: "boolean", default: "false", description: "Native constraint. Marks every part with data-required." },
        { name: "render", type: "Snippet", description: "Render another element, such as a native select, and spread props onto it." },
        { name: "class", type: "string", description: "Extra classes merged onto the control." },
      ]}
    />
    <PropsTable
      caption="FieldSet / FieldLegend / FieldGroup"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "FieldSet: disables every control inside it, except those in its legend, and leaves them out of the form." },
        { name: "debug", type: "boolean", default: "false", description: "FieldSet: logs every state change with its reason in development." },
        { name: "class", type: "string", description: "Extra classes merged onto the fieldset, legend or group." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "disabled", type: "boolean", description: "Disabled by itself or by a fieldset." },
        { name: "required", type: "boolean", description: "The control is required." },
        { name: "focused", type: "boolean", description: "Focus is inside the control." },
        { name: "invalid", type: "boolean", description: "The field shows as invalid." },
        { name: "valid", type: "boolean", description: "The browser's validation passes, once shown. Always false while you pass invalid." },
        { name: "message", type: "string", description: "FieldError only: the browser's message for the current problem." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>The label names the control with <code class="font-mono text-accent">aria-labelledby</code>, beside a native <code class="font-mono text-accent">&lt;label for&gt;</code> where the control can take one. Pressing the label of a text field focuses it.</li>
      <li>The description and any error that shows describe the control through <code class="font-mono text-accent">aria-describedby</code>; an invalid control has <code class="font-mono text-accent">aria-invalid</code>.</li>
      <li>Errors stay hidden until the form tries to submit, then update as the value changes. A form reset hides them again. A field marked <code class="font-mono text-accent">invalid</code> shows its error right away.</li>
      <li>Errors in the page replace the browser's validation bubble, and the first invalid control takes focus.</li>
      <li><code class="font-mono text-accent">FieldSet</code> is a native <code class="font-mono text-accent">&lt;fieldset&gt;</code> and <code class="font-mono text-accent">FieldLegend</code> a native <code class="font-mono text-accent">&lt;legend&gt;</code>, so the group is named and disabled before scripts run. Keep the legend the first child.</li>
      <li>A <code class="font-mono text-accent">FieldDescription</code> right inside a set, outside any field, describes the set, so screen readers read it as focus enters the group.</li>
      <li>A checkbox, switch or radio group inside a field uses the field's label and description. Pressing the label toggles a checkbox or switch; each radio keeps a label of its own.</li>
      <li>Disabled controls are left out of submitted values; a read-only control still submits.</li>
    </ul>
  </Section>
</div>