<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    OTPInput,
    OTPInputGroup,
    OTPInputSlot,
    OTPInputSeparator,
    createOTPInputController,
  } from "#lib/components/otp-input"
  import { Field, FieldLabel, FieldError, FieldDescription } from "#lib/components/field"
  import { Button } from "#lib/components/button"
  import { Minus } from "@lucide/svelte"

  const installCode = `import {
  OTPInput, OTPInputGroup, OTPInputSlot, OTPInputSeparator,
  createOTPInputController,
} from "#lib/components/otp-input"`

  const usageCode = `<script lang="ts">
  import { OTPInput, OTPInputGroup, OTPInputSlot } from "#lib/components/otp-input"
<\/script>

<OTPInput maxLength={4} aria-label="Verification code">
  <OTPInputGroup>
    {#each [0, 1, 2, 3] as index (index)}
      <OTPInputSlot {index} />
    {/each}
  </OTPInputGroup>
</OTPInput>`

  const basicCode = `<script lang="ts">
  import { Field, FieldLabel } from "#lib/components/field"
  import {
    OTPInput, OTPInputGroup, OTPInputSeparator, OTPInputSlot,
  } from "#lib/components/otp-input"
  import { Minus } from "@lucide/svelte"
<\/script>

<Field>
  <FieldLabel>Verification code</FieldLabel>
  <OTPInput maxLength={6}>
    <OTPInputGroup>
      {#each [0, 1, 2] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
    <OTPInputSeparator><Minus aria-hidden="true" /></OTPInputSeparator>
    <OTPInputGroup>
      {#each [3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
</Field>`

  const controlledCode = `<script lang="ts">
  import { OTPInput, OTPInputGroup, OTPInputSlot, createOTPInputController } from "#lib/components/otp-input"
  import { Button } from "#lib/components/button"

  let code = $state("")
  const otp = createOTPInputController()
<\/script>

<div class="flex flex-col items-start gap-3">
  <OTPInput bind:value={code} controller={otp} maxLength={6} aria-label="Verification code">
    <OTPInputGroup>
      {#each [0, 1, 2, 3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
  <p class="font-mono text-sm text-muted">value: {code || "(empty)"}</p>
  <div class="flex gap-2">
    <Button size="sm" tone="outline" onclick={() => otp.setValue("482913")}>Fill</Button>
    <Button size="sm" tone="outline" onclick={() => otp.clear()}>Clear</Button>
    <Button size="sm" tone="outline" onclick={() => otp.focus()}>Focus</Button>
  </div>
</div>`

  const alphanumericCode = `<script lang="ts">
  import { Field, FieldLabel, FieldDescription } from "#lib/components/field"
  import {
    OTPInput, OTPInputGroup, OTPInputSeparator, OTPInputSlot,
  } from "#lib/components/otp-input"
  import { Minus } from "@lucide/svelte"
<\/script>

<Field>
  <FieldLabel>Recovery code</FieldLabel>
  <OTPInput maxLength={8} pattern="alphanumeric">
    <OTPInputGroup>
      {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
    <OTPInputSeparator><Minus aria-hidden="true" /></OTPInputSeparator>
    <OTPInputGroup>
      {#each [4, 5, 6, 7] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
  <FieldDescription>Type letters and digits, or paste ab12-cd34.</FieldDescription>
</Field>`

  const completeCode = `<script lang="ts">
  import { OTPInput, OTPInputGroup, OTPInputSlot } from "#lib/components/otp-input"

  let committed = $state("")
<\/script>

<div class="flex flex-col items-start gap-3">
  <OTPInput
    maxLength={6}
    aria-label="Verification code"
    onValueCommit={(value) => (committed = value)}
  >
    <OTPInputGroup>
      {#each [0, 1, 2, 3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
  {#if committed}
    <p class="text-sm text-success">Checking {committed}</p>
  {:else}
    <p class="text-sm text-muted">Fill every slot to commit the code.</p>
  {/if}
</div>`

  const sizesCode = `<div class="flex flex-col items-start gap-4">
  <OTPInput size="sm" maxLength={4} aria-label="Small code">
    <OTPInputGroup>
      {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
  <OTPInput size="md" maxLength={4} aria-label="Medium code">
    <OTPInputGroup>
      {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
  <OTPInput size="lg" maxLength={4} aria-label="Large code">
    <OTPInputGroup>
      {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
</div>`

  const statesCode = `<div class="flex flex-col items-start gap-4">
  <OTPInput disabled defaultValue="1234" maxLength={4} aria-label="Disabled code">
    <OTPInputGroup>
      {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
  <OTPInput readOnly defaultValue="6543" maxLength={4} aria-label="Read-only code">
    <OTPInputGroup>
      {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
</div>`

  const invalidCode = `<script lang="ts">
  import { Field, FieldLabel, FieldError } from "#lib/components/field"
  import { OTPInput, OTPInputGroup, OTPInputSlot } from "#lib/components/otp-input"

  let expired = $state(true)
<\/script>

<Field invalid={expired}>
  <FieldLabel>Verification code</FieldLabel>
  <OTPInput defaultValue="482913" onValueChange={() => (expired = false)}>
    <OTPInputGroup>
      {#each [0, 1, 2, 3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
    </OTPInputGroup>
  </OTPInput>
  <FieldError>That code has expired. Request a new one.</FieldError>
</Field>`

  let code = $state("")
  let committed = $state("")
  let expired = $state(true)
  const otp = createOTPInputController()
</script>

<svelte:head>
  <title>OTP Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="OTP Input"
  description="Enter a one-time code with support for pasting, autofill, and native form validation. Wraps the ui-sdk OTP Input: one real input holds the whole code, and the slots are its presentation."
  entry="@ui-sdk/svelte/otp-input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/otp-input</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      Groups and separators change the presentation of one value. They create no extra fields and
      no extra tab stops: the slots display a single native input, which handles selection, paste,
      undo, form submission and autofill with
      <code class="font-mono text-accent">autocomplete="one-time-code"</code>.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Set <code class="font-mono text-accent">maxLength</code> to the code's length and render that
      many slots, each with its zero-based <code class="font-mono text-accent">index</code>. The
      default length is six. Name the input with a
      <a href="/docs/field" class="text-accent underline">Field</a> label or
      <code class="font-mono text-accent">aria-label</code>.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Type a six-digit code or paste 123-456. Click a slot to edit it, use the arrow keys to move, and your usual undo shortcut to undo."
      code={basicCode}
    >
      <div class="w-full max-w-xs">
        <Field>
          <FieldLabel>Verification code</FieldLabel>
          <OTPInput maxLength={6}>
            <OTPInputGroup>
              {#each [0, 1, 2] as index (index)}<OTPInputSlot {index} />{/each}
            </OTPInputGroup>
            <OTPInputSeparator><Minus aria-hidden="true" /></OTPInputSeparator>
            <OTPInputGroup>
              {#each [3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
            </OTPInputGroup>
          </OTPInput>
        </Field>
      </div>
    </Demo>

    <Demo
      title="Controlled, with a controller"
      description="bind:value holds the code. A controller fills, clears and focuses it from another control; writes pass through the same filtering and callbacks as typing."
      code={controlledCode}
    >
      <div class="flex flex-col items-start gap-3">
        <OTPInput bind:value={code} controller={otp} maxLength={6} aria-label="Verification code">
          <OTPInputGroup>
            {#each [0, 1, 2, 3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
          </OTPInputGroup>
        </OTPInput>
        <p class="font-mono text-sm text-muted">value: {code || "(empty)"}</p>
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => otp.setValue("482913")}>Fill</Button>
          <Button size="sm" tone="outline" onclick={() => otp.clear()}>Clear</Button>
          <Button size="sm" tone="outline" onclick={() => otp.focus()}>Focus</Button>
        </div>
      </div>
    </Demo>

    <Demo
      title="Alphanumeric"
      description="pattern accepts digits, letters, alphanumeric or a regular expression. Pasting ab12-cd34 drops the hyphen and fills all eight slots."
      code={alphanumericCode}
    >
      <div class="w-full max-w-sm">
        <Field>
          <FieldLabel>Recovery code</FieldLabel>
          <OTPInput maxLength={8} pattern="alphanumeric">
            <OTPInputGroup>
              {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
            </OTPInputGroup>
            <OTPInputSeparator><Minus aria-hidden="true" /></OTPInputSeparator>
            <OTPInputGroup>
              {#each [4, 5, 6, 7] as index (index)}<OTPInputSlot {index} />{/each}
            </OTPInputGroup>
          </OTPInput>
          <FieldDescription>Type letters and digits, or paste ab12-cd34.</FieldDescription>
        </Field>
      </div>
    </Demo>

    <Demo
      title="On complete"
      description="onValueCommit runs when a change fills every slot — typing, paste, autofill or a controller write. Changing an already-full code runs it again; deleting one does not."
      code={completeCode}
    >
      <div class="flex flex-col items-start gap-3">
        <OTPInput
          maxLength={6}
          aria-label="Verification code"
          onValueCommit={(value) => (committed = value)}
        >
          <OTPInputGroup>
            {#each [0, 1, 2, 3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
          </OTPInputGroup>
        </OTPInput>
        {#if committed}
          <p class="text-sm text-success">Checking {committed}</p>
        {:else}
          <p class="text-sm text-muted">Fill every slot to commit the code.</p>
        {/if}
      </div>
    </Demo>

    <Demo
      title="Sizes"
      description="size on the root sets every slot's box through the group, so the slots stay in step."
      code={sizesCode}
    >
      <div class="flex flex-col items-start gap-4">
        <OTPInput size="sm" maxLength={4} aria-label="Small code">
          <OTPInputGroup>
            {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
          </OTPInputGroup>
        </OTPInput>
        <OTPInput size="md" maxLength={4} aria-label="Medium code">
          <OTPInputGroup>
            {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
          </OTPInputGroup>
        </OTPInput>
        <OTPInput size="lg" maxLength={4} aria-label="Large code">
          <OTPInputGroup>
            {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
          </OTPInputGroup>
        </OTPInput>
      </div>
    </Demo>

    <Demo
      title="Disabled and read-only"
      description="A disabled code can't be focused, changed or submitted. A read-only code stays focusable and submitted, but can't change."
      code={statesCode}
    >
      <div class="flex flex-col items-start gap-4">
        <OTPInput disabled defaultValue="1234" maxLength={4} aria-label="Disabled code">
          <OTPInputGroup>
            {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
          </OTPInputGroup>
        </OTPInput>
        <OTPInput readOnly defaultValue="6543" maxLength={4} aria-label="Read-only code">
          <OTPInputGroup>
            {#each [0, 1, 2, 3] as index (index)}<OTPInputSlot {index} />{/each}
          </OTPInputGroup>
        </OTPInput>
      </div>
    </Demo>

    <Demo
      title="Rejected by the server"
      description="Inside a Field, invalid marks the input with aria-invalid and connects the FieldError. Edit any digit to clear it."
      code={invalidCode}
    >
      <div class="w-full max-w-xs">
        <Field invalid={expired}>
          <FieldLabel>Verification code</FieldLabel>
          <OTPInput defaultValue="482913" onValueChange={() => (expired = false)}>
            <OTPInputGroup>
              {#each [0, 1, 2, 3, 4, 5] as index (index)}<OTPInputSlot {index} />{/each}
            </OTPInputGroup>
          </OTPInput>
          <FieldError>That code has expired. Request a new one.</FieldError>
        </Field>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="OTPInput size"
      rows={[
        { name: "sm", type: "string", default: "size-8", description: "Compact slots, small text." },
        { name: "md", type: "default", default: "size-10", description: "Default slot box." },
        { name: "lg", type: "string", default: "size-12", description: "Large slots for touch." },
      ]}
    />
    <PropsTable
      caption="OTPInput pattern"
      rows={[
        { name: "digits", type: "default", description: "Numbers only; a numeric keyboard on touch screens." },
        { name: "letters", type: "string", description: "Letters only." },
        { name: "alphanumeric", type: "string", description: "Letters and digits." },
        { name: "RegExp", type: "RegExp", description: "Each character must match, like /[0-9A-F]/i. Set inputMode separately to choose the keyboard." },
      ]}
    />
    <PropsTable
      caption="State attributes for styling"
      rows={[
        { name: "data-complete", type: "root, group", description: "Every slot is filled." },
        { name: "data-filled", type: "root, group, slot", description: "The code holds a character; on a slot, that slot holds one." },
        { name: "data-focused", type: "root, group", description: "The input has focus." },
        { name: "data-active", type: "slot", description: "Typing goes here: the selected character, or the empty slot after the last one. Only while focused." },
        { name: "data-fake-caret", type: "slot", description: "The active slot is empty. The wrapper draws a blinking caret; the input's own caret is hidden." },
        { name: "data-disabled", type: "every part", description: "Disabled by its own prop or a fieldset." },
      ]}
    />
    <p class="text-sm text-muted">
      Slots keep <code class="font-mono text-accent">position: relative</code> so the caret stays
      inside them, and join with a shared border. An invalid code turns the slot borders danger
      through the input's <code class="font-mono text-accent">aria-invalid</code>. The caret
      animation is disabled under <code class="font-mono text-accent">prefers-reduced-motion</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">id</code>, <code class="font-mono text-accent">autofocus</code>,
      <code class="font-mono text-accent">aria-label</code>, <code class="font-mono text-accent">aria-labelledby</code>,
      <code class="font-mono text-accent">aria-describedby</code> and
      <code class="font-mono text-accent">aria-invalid</code> go to the input; every other attribute
      goes to the root. All parts forward the <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets.
    </p>
    <PropsTable
      caption="OTPInput (root)"
      rows={[
        { name: "value", type: "string", description: "The code. Bind with bind:value to control." },
        { name: "defaultValue", type: "string", default: '""', description: "The code it starts with when uncontrolled. A form reset returns here." },
        { name: "maxLength", type: "number", default: "6", description: "How many characters the code has, one slot each." },
        { name: "pattern", type: "OTPInputPattern", default: '"digits"', description: "digits, letters, alphanumeric, or a RegExp each character must match. Anything else typed, pasted or dropped is ignored." },
        { name: "inputMode", type: '"numeric" | "text" | "decimal" | "tel" | "none"', description: "The keyboard touch screens show. Defaults to numeric for digits, text otherwise." },
        { name: "textAlign", type: '"start" | "center" | "end"', default: '"start"', description: "Where the invisible input keeps its text and caret, which decides where the browser puts its own popups." },
        { name: "autoComplete", type: "string", default: '"one-time-code"', description: "The input's autocomplete, so phones and password managers can offer a code." },
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Negentropy: slot box size, shared with every slot through the group." },
        { name: "disabled", type: "boolean", default: "false", description: "Can't be focused or changed, and isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Focusable and submitted, but the code can't change." },
        { name: "required", type: "boolean", default: "false", description: "Requires a code before the form submits. A partial code is too short either way." },
        { name: "name", type: "string", description: "The name it submits the code under. Falls back to the field's name." },
        { name: "form", type: "string", description: "The id of a form to belong to, when it isn't inside that form." },
        { name: "controller", type: "OTPInputController", description: "Read and write the code from anywhere via createOTPInputController()." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs on every change. details.reason says why; details.cancel() keeps the code as it was." },
        { name: "onValueCommit", type: "(value, details) => void", description: "Runs when a change fills every slot, with the whole code." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
        { name: "class", type: "string", description: "Extra classes merged onto the root (user wins)." },
      ]}
    />
    <PropsTable
      caption="OTPInputGroup"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the group. Lays out a run of slots." },
        { name: "children", type: "Snippet<[OTPInputState]>", description: "The slots, and separators between runs." },
        { name: "render", type: "Snippet", description: "Render your own element and spread props onto it." },
      ]}
    />
    <PropsTable
      caption="OTPInputSlot"
      rows={[
        { name: "index", type: "number", description: "Which character of the code the slot shows, from 0. Required." },
        { name: "children", type: "Snippet<[OTPInputSlotState]>", description: "Draw the contents yourself. Without it the slot shows state.char." },
        { name: "class", type: "string", description: "Extra classes merged onto the slot." },
      ]}
    />
    <PropsTable
      caption="OTPInputSeparator"
      rows={[
        { name: "children", type: "Snippet<[OTPInputState]>", description: "What to draw between groups, like a dash icon." },
        { name: "class", type: "string", description: "Extra classes merged onto the separator." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "value", type: "string", description: "Root, groups and separators: the code." },
        { name: "slots", type: "OTPInputSlotData[]", description: "Root, groups and separators: one entry per slot." },
        { name: "focused", type: "boolean", description: "Whether the input has focus." },
        { name: "complete", type: "boolean", description: "Root, groups and separators: whether every slot is filled." },
        { name: "disabled", type: "boolean", description: "Disabled by itself or by a fieldset." },
        { name: "char", type: "string | null", description: "Slot only: the character, or null when empty." },
        { name: "active", type: "boolean", description: "Slot only: whether typing goes here." },
        { name: "hasFakeCaret", type: "boolean", description: "Slot only: active and empty, so it should draw a caret." },
        { name: "index", type: "number", description: "Slot only: which character it shows." },
      ]}
    />
    <PropsTable
      caption="Controller and change reasons"
      rows={[
        { name: "getValue()", type: "() => string", description: "The code." },
        { name: "setValue(value, options?)", type: "(string, OTPInputChangeOptions?) => boolean", description: "Sets the code as typing would, dropping characters that don't fit. False when canceled or unchanged." },
        { name: "clear(options?)", type: "(OTPInputChangeOptions?) => boolean", description: "Empties the code. False when canceled or unchanged." },
        { name: "focus()", type: "() => void", description: "Moves focus to the input." },
        { name: "details.reason", type: "OTPInputValueChangeReason", description: "input-change, paste, undo, redo, reset, restore or imperative. Autofill and keyboard suggestions are input-change." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Name the input with a <code class="font-mono text-accent">FieldLabel</code>, a native label, <code class="font-mono text-accent">aria-label</code> or <code class="font-mono text-accent">aria-labelledby</code>. Screen readers encounter one input holding the whole code; the slots, groups and separators are hidden from them.</li>
      <li><span class="text-fg">Arrow keys</span>, <span class="text-fg">Home</span> and <span class="text-fg">End</span> move the selection between slots. Typing replaces the selected character.</li>
      <li><span class="text-fg">Backspace</span> deletes the last character. Pressing a filled slot lets you retype it.</li>
      <li>Your usual shortcuts undo and redo: <span class="text-fg">Command/Control+Z</span> and <span class="text-fg">Shift+Command+Z</span> or <span class="text-fg">Control+Y</span>.</li>
      <li>Pasting a code such as <code class="font-mono text-accent">123-456</code> removes the separators and fills every slot. Characters the pattern doesn't accept are ignored.</li>
      <li>The input asks for a one-time code and a numeric keyboard, so phones offer a code from a message and password managers fill it.</li>
      <li>Set <code class="font-mono text-accent">name</code> to submit the code. <code class="font-mono text-accent">required</code> blocks an empty code, and a partial code fails length validation: a typed partial code reports <code class="font-mono text-accent">tooShort</code>.</li>
      <li>A disabled code can't be typed into. Keep <code class="font-mono text-accent">position: relative</code> on each slot so its caret stays inside it.</li>
    </ul>
  </Section>
</div>