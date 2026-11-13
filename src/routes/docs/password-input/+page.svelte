<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputToggle,
    createPasswordInputController,
  } from "#lib/components/password-input"
  import { Button } from "#lib/components/button"
  import { Eye, EyeOff, Check, X, Lock, Wand2, Trash2, Crosshair } from "@lucide/svelte"

  const installCode = `import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "#lib/components/password-input"`

  const usageCode = `<script lang="ts">
  import {
    PasswordInput,
    PasswordInputControl,
    PasswordInputToggle,
  } from "#lib/components/password-input"
  import { Eye, EyeOff } from "@lucide/svelte"
<\/script>

<div class="flex w-72 flex-col gap-1.5">
  <label for="basic-password" class="text-sm font-medium text-fg">Password</label>
  <PasswordInput name="password">
    <PasswordInputControl id="basic-password" />
    <PasswordInputToggle aria-label="Show password">
      {#snippet children(state)}
        {#if state.visible}
          <EyeOff aria-hidden="true" />
        {:else}
          <Eye aria-hidden="true" />
        {/if}
      {/snippet}
    </PasswordInputToggle>
  </PasswordInput>
  <p class="text-sm text-muted">Use at least 8 characters.</p>
</div>`

  const controlledCode = `<script lang="ts">
  let password = $state("")
  let visible = $state(false)
<\/script>

<div class="flex w-72 flex-col gap-1.5">
  <label for="controlled-password" class="text-sm font-medium text-fg">Password</label>
  <PasswordInput bind:value={password} bind:visible={visible}>
    <PasswordInputControl id="controlled-password" />
    <PasswordInputToggle aria-label="Show password">
      {#snippet children(state)}
        {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
      {/snippet}
    </PasswordInputToggle>
  </PasswordInput>
  <p class="text-sm text-muted">
    {password.length} characters, {visible ? "shown" : "hidden"}.
  </p>
  <Button size="sm" tone="outline" onclick={() => (visible = !visible)}>
    Toggle from outside
  </Button>
</div>`

  const rulesCode = `<script lang="ts">
  import { Check, X } from "@lucide/svelte"

  const rules = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "A number", test: (p: string) => /\\d/.test(p) },
    { label: "An uppercase and a lowercase letter", test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p) },
  ]

  let newPassword = $state("")
<\/script>

<div class="flex w-72 flex-col gap-1.5">
  <label for="new-password" class="text-sm font-medium text-fg">Create a password</label>
  <PasswordInput bind:value={newPassword} autoComplete="new-password">
    <PasswordInputControl id="new-password" />
    <PasswordInputToggle aria-label="Show password">
      {#snippet children(state)}
        {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
      {/snippet}
    </PasswordInputToggle>
  </PasswordInput>
  <ul class="flex flex-col gap-1 text-sm" aria-label="Password requirements">
    {#each rules as rule (rule.label)}
      <li class="flex items-center gap-2" class:text-success={rule.test(newPassword)} class:text-muted={!rule.test(newPassword)}>
        {#if rule.test(newPassword)}
          <Check class="size-3.5" aria-hidden="true" />
          <span class="sr-only">Done:</span>
        {:else}
          <X class="size-3.5" aria-hidden="true" />
          <span class="sr-only">To do:</span>
        {/if}
        {rule.label}
      </li>
    {/each}
  </ul>
</div>`

  const visibleCode = `<div class="flex w-72 flex-col gap-1.5">
  <label for="wifi-password" class="text-sm font-medium text-fg">Wi-Fi password</label>
  <PasswordInput defaultVisible defaultValue="maple-orbit-42" autoComplete="new-password">
    <PasswordInputControl id="wifi-password" />
    <PasswordInputToggle aria-label="Show password">
      {#snippet children(state)}
        {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
      {/snippet}
    </PasswordInputToggle>
  </PasswordInput>
  <p class="text-sm text-muted">Guests read it from here, so it starts shown.</p>
</div>`

  const capsLockCode = `<script lang="ts">
  import { Lock } from "@lucide/svelte"
<\/script>

<div class="flex w-72 flex-col gap-1.5">
  <label for="caps-password" class="text-sm font-medium text-fg">Password</label>
  <PasswordInput>
    {#snippet children(state)}
      <PasswordInputControl id="caps-password" />
      <span class="flex w-4 shrink-0 items-center justify-center text-warning">
        {#if state.capsLock}<Lock class="size-3.5" aria-hidden="true" />{/if}
      </span>
      <PasswordInputToggle aria-label="Show password">
        {#snippet children(toggle)}
          {#if toggle.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
        {/snippet}
      </PasswordInputToggle>
    {/snippet}
  </PasswordInput>
  <p class="text-sm text-muted">Focus the field and press Caps Lock to see the warning.</p>
</div>`

  const statesCode = `<div class="flex w-72 flex-col gap-4">
  <div class="flex flex-col gap-1.5">
    <label for="disabled-password" class="text-sm font-medium text-fg">Managed password</label>
    <PasswordInput defaultValue="hunter22" disabled>
      <PasswordInputControl id="disabled-password" />
      <PasswordInputToggle aria-label="Show password">
        {#snippet children(state)}
          {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
        {/snippet}
      </PasswordInputToggle>
    </PasswordInput>
  </div>
  <div class="flex flex-col gap-1.5">
    <label for="readonly-key" class="text-sm font-medium text-fg">Recovery key</label>
    <PasswordInput readOnly defaultValue="7Hq2-vX9p-Lm4c" autoComplete="off">
      <PasswordInputControl id="readonly-key" />
      <PasswordInputToggle aria-label="Show recovery key">
        {#snippet children(state)}
          {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
        {/snippet}
      </PasswordInputToggle>
    </PasswordInput>
  </div>
</div>`

  const controllerCode = `<script lang="ts">
  import { createPasswordInputController } from "#lib/components/password-input"
  import { Button } from "#lib/components/button"

  const password = createPasswordInputController()
<\/script>

<div class="flex w-72 flex-col gap-3">
  <PasswordInput controller={password} autoComplete="new-password">
    <PasswordInputControl aria-label="New password" />
    <PasswordInputToggle aria-label="Show password">
      {#snippet children(state)}
        {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
      {/snippet}
    </PasswordInputToggle>
  </PasswordInput>
  <div class="flex flex-wrap gap-2">
    <Button size="sm" tone="outline" onclick={() => { password.setValue("plum-kettle-orbit-42"); password.setVisible(true) }}>
      <Wand2 aria-hidden="true" /> Suggest
    </Button>
    <Button size="sm" tone="outline" onclick={() => password.toggleVisible()}>Toggle</Button>
    <Button size="sm" tone="outline" onclick={() => password.clear()}>
      <Trash2 aria-hidden="true" /> Clear
    </Button>
    <Button size="sm" tone="outline" onclick={() => password.focus()}>
      <Crosshair aria-hidden="true" /> Focus
    </Button>
  </div>
</div>`

  const rules = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "A number", test: (p: string) => /\d/.test(p) },
    {
      label: "An uppercase and a lowercase letter",
      test: (p: string) => /[a-z]/.test(p) && /[A-Z]/.test(p),
    },
  ]

  let password = $state("")
  let newPassword = $state("")
  let visible = $state(false)
  const suggested = createPasswordInputController()
</script>

<svelte:head>
  <title>Password Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Password Input"
  description="A password field with a button that shows and hides what's typed. Wraps the ui-sdk Password Input, which keeps the caret in place, offers the right password to password managers, and hides the password again when its form submits."
  entry="@ui-sdk/svelte/password-input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Password Input is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/password-input</code>. Import the three parts:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      Put form options such as <code class="font-mono text-accent">name</code>,
      <code class="font-mono text-accent">form</code>, <code class="font-mono text-accent">required</code>,
      <code class="font-mono text-accent">disabled</code> and
      <code class="font-mono text-accent">readOnly</code> on the root. Put other native input attributes
      such as <code class="font-mono text-accent">id</code> on the control.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Composition: the root holds the value and visibility, the control renders the native input, and
      the toggle shows and hides it.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      The toggle switches the input between <code class="font-mono text-accent">password</code> and
      <code class="font-mono text-accent">text</code>, and is a
      <code class="font-mono text-accent">type="button"</code>, so pressing
      <span class="text-fg">Enter</span> in the input still submits the form.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Type a password, then press the toggle to reveal or hide it. A pointer press keeps the caret in the field; Tab to the toggle and press Space or Enter to use it from the keyboard."
      code={usageCode}
    >
      <div class="flex w-72 flex-col gap-1.5">
        <label for="basic-password" class="text-sm font-medium text-fg">Password</label>
        <PasswordInput name="password">
          <PasswordInputControl id="basic-password" />
          <PasswordInputToggle aria-label="Show password">
            {#snippet children(state)}
              {#if state.visible}
                <EyeOff aria-hidden="true" />
              {:else}
                <Eye aria-hidden="true" />
              {/if}
            {/snippet}
          </PasswordInputToggle>
        </PasswordInput>
        <p class="text-sm text-muted">Use at least 8 characters.</p>
      </div>
    </Demo>

    <Demo
      title="Controlled value and visibility"
      description="bind:value and bind:visible chain through the wrapper, so a button outside the field can toggle it too."
      code={controlledCode}
    >
      <div class="flex w-72 flex-col gap-1.5">
        <label for="controlled-password" class="text-sm font-medium text-fg">Password</label>
        <PasswordInput bind:value={password} bind:visible={visible}>
          <PasswordInputControl id="controlled-password" />
          <PasswordInputToggle aria-label="Show password">
            {#snippet children(state)}
              {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
            {/snippet}
          </PasswordInputToggle>
        </PasswordInput>
        <p class="text-sm text-muted">
          {password.length} characters, {visible ? "shown" : "hidden"}.
        </p>
        <Button size="sm" tone="outline" onclick={() => (visible = !visible)}>
          Toggle from outside
        </Button>
      </div>
    </Demo>

    <Demo
      title="New password with a checklist"
      description="autoComplete=new-password tells managers to offer a new one. The checklist is derived from the value — the component imposes no password policy of its own."
      code={rulesCode}
    >
      <div class="flex w-72 flex-col gap-1.5">
        <label for="new-password" class="text-sm font-medium text-fg">Create a password</label>
        <PasswordInput bind:value={newPassword} autoComplete="new-password">
          <PasswordInputControl id="new-password" />
          <PasswordInputToggle aria-label="Show password">
            {#snippet children(state)}
              {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
            {/snippet}
          </PasswordInputToggle>
        </PasswordInput>
        <ul class="flex flex-col gap-1 text-sm" aria-label="Password requirements">
          {#each rules as rule (rule.label)}
            <li
              class="flex items-center gap-2"
              class:text-success={rule.test(newPassword)}
              class:text-muted={!rule.test(newPassword)}
            >
              {#if rule.test(newPassword)}
                <Check class="size-3.5" aria-hidden="true" />
                <span class="sr-only">Done:</span>
              {:else}
                <X class="size-3.5" aria-hidden="true" />
                <span class="sr-only">To do:</span>
              {/if}
              {rule.label}
            </li>
          {/each}
        </ul>
      </div>
    </Demo>

    <Demo
      title="Shown at first"
      description="defaultVisible starts with the text shown, useful for a Wi-Fi password someone needs to read or copy."
      code={visibleCode}
    >
      <div class="flex w-72 flex-col gap-1.5">
        <label for="wifi-password" class="text-sm font-medium text-fg">Wi-Fi password</label>
        <PasswordInput defaultVisible defaultValue="maple-orbit-42" autoComplete="new-password">
          <PasswordInputControl id="wifi-password" />
          <PasswordInputToggle aria-label="Show password">
            {#snippet children(state)}
              {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
            {/snippet}
          </PasswordInputToggle>
        </PasswordInput>
        <p class="text-sm text-muted">Guests read it from here, so it starts shown.</p>
      </div>
    </Demo>

    <Demo
      title="Caps Lock warning"
      description="The root's children snippet receives capsLock, which updates from key events while the field has focus. Reserve space for the icon so the layout doesn't shift."
      code={capsLockCode}
    >
      <div class="flex w-72 flex-col gap-1.5">
        <label for="caps-password" class="text-sm font-medium text-fg">Password</label>
        <PasswordInput>
          {#snippet children(state)}
            <PasswordInputControl id="caps-password" />
            <span class="flex w-4 shrink-0 items-center justify-center text-warning">
              {#if state.capsLock}<Lock class="size-3.5" aria-hidden="true" />{/if}
            </span>
            <PasswordInputToggle aria-label="Show password">
              {#snippet children(toggle)}
                {#if toggle.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
              {/snippet}
            </PasswordInputToggle>
          {/snippet}
        </PasswordInput>
        <p class="text-sm text-muted">Focus the field and press Caps Lock to see the warning.</p>
      </div>
    </Demo>

    <Demo
      title="Disabled and read-only"
      description="Disabled turns off both the field and the toggle and skips them in the tab order. Read-only keeps the field focusable and submitted, and the toggle still works."
      code={statesCode}
    >
      <div class="flex w-72 flex-col gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="disabled-password" class="text-sm font-medium text-fg">Managed password</label>
          <PasswordInput defaultValue="hunter22" disabled>
            <PasswordInputControl id="disabled-password" />
            <PasswordInputToggle aria-label="Show password">
              {#snippet children(state)}
                {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
              {/snippet}
            </PasswordInputToggle>
          </PasswordInput>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="readonly-key" class="text-sm font-medium text-fg">Recovery key</label>
          <PasswordInput readOnly defaultValue="7Hq2-vX9p-Lm4c" autoComplete="off">
            <PasswordInputControl id="readonly-key" />
            <PasswordInputToggle aria-label="Show recovery key">
              {#snippet children(state)}
                {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
              {/snippet}
            </PasswordInputToggle>
          </PasswordInput>
        </div>
      </div>
    </Demo>

    <Demo
      title="Controller"
      description="createPasswordInputController() reads, writes, shows and hides the field from anywhere. Writes report the imperative reason."
      code={controllerCode}
    >
      <div class="flex w-72 flex-col gap-3">
        <PasswordInput controller={suggested} autoComplete="new-password">
          <PasswordInputControl aria-label="New password" />
          <PasswordInputToggle aria-label="Show password">
            {#snippet children(state)}
              {#if state.visible}<EyeOff aria-hidden="true" />{:else}<Eye aria-hidden="true" />{/if}
            {/snippet}
          </PasswordInputToggle>
        </PasswordInput>
        <div class="flex flex-wrap gap-2">
          <Button
            size="sm"
            tone="outline"
            onclick={() => {
              suggested.setValue("plum-kettle-orbit-42")
              suggested.setVisible(true)
            }}
          >
            <Wand2 aria-hidden="true" /> Suggest
          </Button>
          <Button size="sm" tone="outline" onclick={() => suggested.toggleVisible()}>Toggle</Button>
          <Button size="sm" tone="outline" onclick={() => suggested.clear()}>
            <Trash2 aria-hidden="true" /> Clear
          </Button>
          <Button size="sm" tone="outline" onclick={() => suggested.focus()}>
            <Crosshair aria-hidden="true" /> Focus
          </Button>
        </div>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">size</code> on the root sets the box height; the control and
      toggle fill it. Every part exposes <code class="font-mono text-accent">data-visible</code>,
      <code class="font-mono text-accent">data-filled</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code> and
      <code class="font-mono text-accent">data-capslock</code>.
    </p>
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "h-8", description: "Compact, for dense forms." },
        { name: "md", type: "default", default: "h-9", description: "Default." },
        { name: "lg", type: "string", default: "h-11", description: "Prominent, for touch." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-visible", type: "attribute", description: "Present while the password is shown, so the field is a text field. The wrapper also sets aria-pressed on the toggle." },
        { name: "data-filled", type: "attribute", description: "Present while the field holds any text." },
        { name: "data-capslock", type: "attribute", description: "Present while Caps Lock is on and the field has focus." },
        { name: "data-disabled", type: "attribute", description: "Present when disabled by its own prop, a Field or a fieldset." },
        { name: "data-readonly", type: "attribute", description: "Present when read-only." },
        { name: "data-required", type: "attribute", description: "Present when a password is required." },
      ]}
    />
    <PropsTable
      caption="autoComplete"
      rows={[
        { name: "current-password", type: "default", description: "For signing in. The browser offers the saved password." },
        { name: "new-password", type: "string", description: "For signing up or changing a password. Managers offer to generate one." },
        { name: "off", type: "string", description: "For a recovery key or other secret that isn't a login password." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Every part forwards its attributes plus <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive the same state.
    </p>
    <PropsTable
      caption="PasswordInput (root) — Negentropy props"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height of the field box." },
        { name: "class", type: "string", description: "Extra classes merged onto the root (user wins)." },
      ]}
    />
    <PropsTable
      caption="PasswordInput (root) — ui-sdk options"
      rows={[
        { name: "value", type: "string", description: "The password. Bind it with bind:value." },
        { name: "defaultValue", type: "string", description: "The value it starts with. A form reset returns here." },
        { name: "onValueChange", type: "(value: string, details: ChangeDetails<InputValueChangeReason>) => void", description: "Runs on typing, a form reset or a controller write. details.cancel() keeps the value as it was." },
        { name: "visible", type: "boolean", description: "Whether the password is shown. Bind it with bind:visible." },
        { name: "defaultVisible", type: "boolean", default: "false", description: "Whether the password is shown at first, when uncontrolled." },
        { name: "onVisibleChange", type: "(visible: boolean, details: ChangeDetails<PasswordInputVisibleChangeReason>) => void", description: "Runs when the password wants to be shown or hidden. details.cancel() keeps it as it was; the field is still a password field while the browser reads a submitted form." },
        { name: "autoComplete", type: '"current-password" | "new-password" | "off" | (string & {})', default: '"current-password"', description: "What the browser and password managers fill in." },
        { name: "name", type: "string", description: "The name the password submits under. Inside a Field, the Field's name." },
        { name: "form", type: "string", description: "The id of the form the field belongs to when it isn't inside it." },
        { name: "required", type: "boolean", default: "false", description: "Whether a password is required to submit the form." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the field and the toggle. A Field or disabled fieldset applies too." },
        { name: "readOnly", type: "boolean", default: "false", description: "Makes the field read-only. The toggle still shows and hides it." },
        { name: "controller", type: "PasswordInputController", description: "Reads, writes, shows and hides it from anywhere. Create one with createPasswordInputController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="PasswordInputControl"
      rows={[
        { name: "id", type: "string", description: "Point a visible label at it with for." },
        { name: "aria-label", type: "string", description: "Accessible name when there is no visible label." },
        { name: "class", type: "string", description: "Extra classes merged onto the input (user wins)." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Swaps the input for your own element." },
      ]}
    />
    <PropsTable
      caption="PasswordInputToggle"
      rows={[
        { name: "aria-label", type: "string", description: 'Name it by what it does, such as "Show password", and keep that name the same. aria-pressed conveys the state.' },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
        { name: "children", type: "Snippet<[PasswordInputState]>", description: "The button's content. Read state.visible to swap the eye icon." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Swaps the button for your own element." },
      ]}
    />
    <PropsTable
      caption="PasswordInputState (every part)"
      rows={[
        { name: "visible", type: "boolean", description: "Whether the password is shown." },
        { name: "capsLock", type: "boolean", description: "Whether Caps Lock is on while the field has focus." },
        { name: "filled", type: "boolean", description: "Whether the field holds any text." },
        { name: "disabled", type: "boolean", description: "Whether the field is disabled, by itself, its Field or a fieldset." },
        { name: "readOnly", type: "boolean", description: "Whether the field is read-only." },
        { name: "required", type: "boolean", description: "Whether a form won't submit while the field is empty." },
      ]}
    />
    <PropsTable
      caption="Value change reasons"
      rows={[
        { name: "input-change", type: "Event", description: "Typing, pasting, dropping, autofill or a password manager's fill." },
        { name: "reset", type: "none", description: "A form reset." },
        { name: "imperative", type: "none", description: "A controller call." },
      ]}
    />
    <PropsTable
      caption="Visibility change reasons"
      rows={[
        { name: "toggle-press", type: "MouseEvent | KeyboardEvent", description: "The toggle was pressed." },
        { name: "form-submit", type: "SubmitEvent", description: "The form was submitted, which hides a shown password so the browser offers to save it." },
        { name: "reset", type: "none", description: "A form reset." },
        { name: "page-hide", type: "PageTransitionEvent", description: "The page was hidden, which hides a shown password before the browser keeps the page." },
        { name: "imperative", type: "none", description: "A controller call." },
      ]}
    />
    <PropsTable
      caption="createPasswordInputController()"
      rows={[
        { name: "getValue()", type: "() => string", description: "The current value." },
        { name: "setValue(value, options?)", type: "(string, ChangeOptions?) => boolean", description: "Sets the value as if typed, so input fires. False when canceled or unchanged." },
        { name: "clear(options?)", type: "(ChangeOptions?) => boolean", description: "Empties the field. False when canceled or unchanged." },
        { name: "isVisible()", type: "() => boolean", description: "Whether the password is shown." },
        { name: "setVisible(visible, options?)", type: "(boolean, ChangeOptions?) => boolean", description: "Shows or hides the password. False when canceled." },
        { name: "toggleVisible(options?)", type: "(ChangeOptions?) => boolean", description: "Shows it if hidden, hides it if shown. False when canceled." },
        { name: "focus()", type: "() => void", description: "Moves focus to the field." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <p class="text-sm text-muted">
      There is no WAI-ARIA pattern for a password field. The input stays a native password field named
      by its label or an <code class="font-mono text-accent">aria-label</code>, and the toggle follows
      the WAI-ARIA button pattern as a toggle button.
    </p>
    <PropsTable
      caption="Keyboard"
      rows={[
        { name: "Tab", type: "key", description: "Moves from the input to the toggle." },
        { name: "Space / Enter on the toggle", type: "key", description: "Shows or hides the password and keeps focus on the toggle." },
        { name: "Enter in the input", type: "key", description: "Submits the form. It never presses the toggle." },
      ]}
    />
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>
        Name the toggle by what it does, such as <span class="text-fg">Show password</span>, and keep
        that name the same when the password shows. Its
        <code class="font-mono text-accent">aria-pressed</code> state tells screen readers whether the
        password is shown, and <code class="font-mono text-accent">aria-controls</code> points to the
        input.
      </li>
      <li>
        A pointer press on the toggle keeps focus in the input, with the caret and selection where they
        were. A press from elsewhere brings focus back to the input. A keyboard press keeps focus on
        the toggle.
      </li>
      <li>
        Submitting hides a shown password before the page's own submit handler runs, so the browser
        offers to save it. It hides even when the change callback cancels, while the browser reads the
        form.
      </li>
      <li>
        Resetting the form hides the password and restores its default value. Hiding the page also
        hides it, so the browser never keeps it as text.
      </li>
      <li>
        A shown password is never spellchecked, autocorrected or capitalized. The wrapper renders it
        with slashed zeros so <code class="font-mono text-accent">0</code> and
        <code class="font-mono text-accent">O</code> stay distinguishable.
      </li>
      <li>
        Use <code class="font-mono text-accent">autoComplete="new-password"</code> when creating or
        changing a password, and <code class="font-mono text-accent">current-password</code> for
        signing in, so managers offer the right one.
      </li>
      <li>
        Caps Lock marks the input while the field has focus, including on a click into the field
        before any key is pressed. Reserve space for the warning so the layout doesn't shift.
      </li>
      <li>
        A disabled fieldset disables the toggle too. A click with no pointer behind it, like a screen
        reader's, still shows the password.
      </li>
    </ul>
  </Section>
</div>