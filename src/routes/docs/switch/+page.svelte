<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { Switch, SwitchThumb } from "#lib/components/switch"
  import { Button } from "#lib/components/button"
  import { Moon, Sun, LoaderCircle } from "@lucide/svelte"

  const installCode = `import { Switch, SwitchThumb } from "#lib/components/switch"`

  const usageCode = `<script lang="ts">
  import { Switch, SwitchThumb } from "#lib/components/switch"
<\/script>

<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Airplane mode
  <Switch>
    <SwitchThumb />
  </Switch>
</label>`

  const controlledCode = `<script lang="ts">
  import { Switch, SwitchThumb } from "#lib/components/switch"
  import { Button } from "#lib/components/button"

  let checked = $state(true)
<\/script>

<Button size="sm" tone="outline" onclick={() => (checked = !checked)}>Toggle from outside</Button>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Wi-Fi
  <Switch bind:checked>
    <SwitchThumb />
  </Switch>
</label>
<p class="text-sm text-muted">{checked ? "On" : "Off"}</p>`

  const sizesCode = `<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Small
  <Switch size="sm" defaultChecked><SwitchThumb /></Switch>
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Medium
  <Switch size="md" defaultChecked><SwitchThumb /></Switch>
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Large
  <Switch size="lg" defaultChecked><SwitchThumb /></Switch>
</label>`

  const statesCode = `<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Disabled (always on)
  <Switch defaultChecked disabled><SwitchThumb /></Switch>
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Read-only (managed elsewhere)
  <Switch name="encrypt" defaultChecked readOnly><SwitchThumb /></Switch>
</label>
<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Off and disabled
  <Switch disabled><SwitchThumb /></Switch>
</label>`

  const iconsCode = `<script lang="ts">
  import { Switch, SwitchThumb } from "#lib/components/switch"
  import { Moon, Sun } from "@lucide/svelte"
<\/script>

<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Dark mode
  <Switch size="lg">
    <SwitchThumb>
      {#snippet children(state)}
        {#if state.checked}<Moon aria-hidden="true" />{:else}<Sun aria-hidden="true" />{/if}
      {/snippet}
    </SwitchThumb>
  </Switch>
</label>`

  const formCode = `<script lang="ts">
  import { Switch, SwitchThumb } from "#lib/components/switch"
  import { Button } from "#lib/components/button"

  let submitted = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const entries = [...new FormData(event.currentTarget)].map(([name, value]) => name + "=" + value)
    submitted = entries.length ? entries.join("&") : "nothing"
  }
<\/script>

<form class="flex flex-col gap-3" onsubmit={onSubmit}>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    Product updates
    <Switch name="updates"><SwitchThumb /></Switch>
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    Weekly digest
    <Switch name="digest" value="weekly" defaultChecked><SwitchThumb /></Switch>
  </label>
  <div class="flex gap-2">
    <Button type="submit" size="sm">Save</Button>
    <Button type="reset" size="sm" tone="outline">Reset</Button>
  </div>
</form>
<p class="text-sm text-muted">Submitted: {submitted || "not yet"}</p>`

  const asyncCode = `<script lang="ts">
  import { LoaderCircle } from "@lucide/svelte"
  import { Switch, SwitchThumb } from "#lib/components/switch"

  let saving = $state(false)

  function save() {
    saving = true
    setTimeout(() => (saving = false), 900)
  }
<\/script>

<label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
  Two-factor authentication
  <Switch
    size="lg"
    defaultChecked
    aria-busy={saving}
    onCheckedChange={(_next, details) => {
      if (saving) {
        details.cancel()
        return
      }
      save()
    }}
  >
    <SwitchThumb>
      {#if saving}<LoaderCircle class="animate-spin" aria-hidden="true" />{/if}
    </SwitchThumb>
  </Switch>
</label>
<p class="text-sm text-muted">{saving ? "Saving..." : "Saved"}</p>`

  const settings = [
    { label: "Public profile", description: "Anyone can see your name and photo.", defaultChecked: false },
    { label: "Show activity status", description: "Teammates can see when you're online.", defaultChecked: true },
  ]

  let controlled = $state(true)
  let submitted = $state("")
  let saving = $state(false)

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    const entries = [...new FormData(event.currentTarget)].map(([name, value]) => name + "=" + value)
    submitted = entries.length ? entries.join("&") : "nothing"
  }

  function save() {
    saving = true
    setTimeout(() => (saving = false), 900)
  }
</script>

<svelte:head>
  <title>Switch — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Switch"
  description="Turn a setting on or off, with a thumb that slides to show its state. Wraps the ui-sdk Switch, which pairs a button with the switch role with a hidden native input that takes part in forms."
  entry="@ui-sdk/svelte/switch"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Switch is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/switch</code>. Import the parts from the library:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      The behavior comes from <code class="font-mono text-accent">@ui-sdk/core</code>, installed alongside
      <code class="font-mono text-accent">@ui-sdk/svelte</code>.
      <code class="font-mono text-accent">createSwitchController</code> is re-exported for driving a switch
      from anywhere.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      A switch is for a setting that takes effect as soon as it changes. Keep its label the same in both
      states: the label says what the setting is, and the switch shows whether it's on.
      <code class="font-mono text-accent">SwitchThumb</code> stays mounted and slides with the state.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Click the switch or its label, or focus it and press Space." code={usageCode}>
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        Airplane mode
        <Switch>
          <SwitchThumb />
        </Switch>
      </label>
    </Demo>

    <Demo title="Controlled" description="bind:checked owns the value, so a button elsewhere can change it." code={controlledCode}>
      <div class="flex w-full max-w-sm flex-col gap-3">
        <Button size="sm" tone="outline" onclick={() => (controlled = !controlled)}>Toggle from outside</Button>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Wi-Fi
          <Switch bind:checked={controlled}>
            <SwitchThumb />
          </Switch>
        </label>
        <p class="text-sm text-muted">{controlled ? "On" : "Off"}</p>
      </div>
    </Demo>

    <Demo title="Sizes" description="size='sm' | 'md' | 'lg' scales the track, and the thumb follows it." code={sizesCode}>
      <div class="flex flex-col gap-3">
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Small
          <Switch size="sm" defaultChecked><SwitchThumb /></Switch>
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Medium
          <Switch size="md" defaultChecked><SwitchThumb /></Switch>
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Large
          <Switch size="lg" defaultChecked><SwitchThumb /></Switch>
        </label>
      </div>
    </Demo>

    <Demo title="Disabled and read-only" description="Disabled leaves the tab order and submits nothing; read-only stays focusable and still submits." code={statesCode}>
      <div class="flex flex-col gap-3">
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Disabled (always on)
          <Switch defaultChecked disabled><SwitchThumb /></Switch>
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Read-only (managed elsewhere)
          <Switch name="encrypt" defaultChecked readOnly><SwitchThumb /></Switch>
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Off and disabled
          <Switch disabled><SwitchThumb /></Switch>
        </label>
      </div>
    </Demo>

    <Demo title="Icon in the thumb" description="The thumb's children snippet receives its state, so it can show a sun or a moon." code={iconsCode}>
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        Dark mode
        <Switch size="lg">
          <SwitchThumb>
            {#snippet children(state)}
              {#if state.checked}<Moon aria-hidden="true" />{:else}<Sun aria-hidden="true" />{/if}
            {/snippet}
          </SwitchThumb>
        </Switch>
      </label>
    </Demo>

    <Demo title="Choice cards" description="A whole card can be the label, so a click anywhere on it toggles the setting." code={usageCode}>
      <div class="flex w-full max-w-md flex-col gap-3">
        {#each settings as setting (setting.label)}
          <label class="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-line bg-surface p-4 transition-colors has-[[data-checked]]:border-accent hover:bg-elevated">
            <span class="flex flex-col gap-1">
              <span class="text-sm font-medium text-fg">{setting.label}</span>
              <span class="text-sm text-muted">{setting.description}</span>
            </span>
            <Switch defaultChecked={setting.defaultChecked}><SwitchThumb /></Switch>
          </label>
        {/each}
      </div>
    </Demo>

    <Demo title="In a form" description="A switch that's on submits its value; one that's off submits nothing. Reset restores defaultChecked." code={formCode}>
      <div class="w-full max-w-sm space-y-3">
        <form class="flex flex-col gap-3" onsubmit={onSubmit}>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            Product updates
            <Switch name="updates"><SwitchThumb /></Switch>
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            Weekly digest
            <Switch name="digest" value="weekly" defaultChecked><SwitchThumb /></Switch>
          </label>
          <div class="flex gap-2">
            <Button type="submit" size="sm">Save</Button>
            <Button type="reset" size="sm" tone="outline">Reset</Button>
          </div>
        </form>
        <p class="text-sm text-muted">Submitted: {submitted || "not yet"}</p>
      </div>
    </Demo>

    <Demo title="Saving asynchronously" description="Cancel the change in onCheckedChange while a save is running, so the value only commits once it's saved. aria-busy and a spinner in the thumb report the wait." code={asyncCode}>
      <div class="flex w-full max-w-sm flex-col gap-3">
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          Two-factor authentication
          <Switch
            size="lg"
            defaultChecked
            aria-busy={saving}
            onCheckedChange={(_next, details) => {
              if (saving) {
                details.cancel()
                return
              }
              save()
            }}
          >
            <SwitchThumb>
              {#if saving}<LoaderCircle class="animate-spin" aria-hidden="true" />{/if}
            </SwitchThumb>
          </Switch>
        </label>
        <p class="text-sm text-muted">{saving ? "Saving..." : "Saved"}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Switch has one visual axis, <code class="font-mono text-accent">size</code>. The thumb reads the track's
      size through a named Tailwind group, so it always fits and travels the right distance — and it reverses
      under <code class="font-mono text-accent">dir="rtl"</code>.
    </p>
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "h-4 w-7", description: "Compact, for dense settings lists." },
        { name: "md", type: "default", default: "h-5 w-9", description: "Default." },
        { name: "lg", type: "string", default: "h-6 w-11", description: "Prominent; leaves room for an icon in the thumb." },
      ]}
    />
    <PropsTable
      caption="State attributes (Switch and SwitchThumb)"
      rows={[
        { name: "data-checked", type: "attribute", description: "Present while on. The track fills with the accent and the thumb slides." },
        { name: "data-unchecked", type: "attribute", description: "Present while off." },
        { name: "data-disabled", type: "attribute", description: "Present when disabled by its own prop or a fieldset." },
        { name: "data-readonly", type: "attribute", description: "Present when read-only." },
        { name: "data-required", type: "attribute", description: "Present when a form won't submit until it's on." },
        { name: "data-invalid", type: "attribute", description: "Switch only: present while a Field around it shows as invalid. The thumb doesn't get it." },
        { name: "data-size", type: "attribute", description: "Negentropy adds the chosen size so the thumb can match it." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Both parts forward native HTML attributes plus their <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive the part's state.
    </p>
    <PropsTable
      caption="Switch — Negentropy props"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track size; the thumb follows it." },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
      ]}
    />
    <PropsTable
      caption="Switch — ui-sdk options"
      rows={[
        { name: "checked", type: "boolean", description: "Whether it's on. Bind with bind:checked to control." },
        { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state when uncontrolled. A form reset returns to it." },
        { name: "onCheckedChange", type: "(checked, details) => void", description: "Runs when a user or a reset wants to change it. details.cancel() stops it." },
        { name: "disabled", type: "boolean", default: "false", description: "Can't be focused or changed, and isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Stays focusable and submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until it's on." },
        { name: "name", type: "string", description: "The name it submits under. Without one it submits nothing." },
        { name: "value", type: "string", default: '"on"', description: "What it submits while on." },
        { name: "form", type: "string", description: "The id of a form to join from elsewhere on the page." },
        { name: "controller", type: "SwitchController", description: "Drive it from anywhere via createSwitchController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="SwitchThumb"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
        { name: "children", type: "Snippet<[SwitchThumbState]>", description: "Optional content, like a spinner or an icon. Receives the switch's state." },
        { name: "render", type: "Snippet", description: "Swap the element. Keep the part's props on it so its state stays connected." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "checked", type: "boolean", description: "Whether it's on." },
        { name: "disabled", type: "boolean", description: "Disabled by itself or a fieldset." },
        { name: "readOnly", type: "boolean", description: "Focusable and submitted, but presses don't change it." },
        { name: "required", type: "boolean", description: "A form won't submit until it's on." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA switch pattern: a button with <code class="font-mono text-accent">role="switch"</code> and <code class="font-mono text-accent">aria-checked</code>, plus a hidden native checkbox that takes part in forms.</li>
      <li><span class="text-fg">Tab</span> moves to the next switch; <span class="text-fg">Space</span> turns it on or off; <span class="text-fg">Enter</span> submits its form and never toggles it.</li>
      <li>Keep the label the same in both states. The label names the setting; <code class="font-mono text-accent">aria-checked</code> says whether it's on, so renaming it would hide the change from screen readers.</li>
      <li>Clicking the label toggles the switch. Wrap both in a <code class="font-mono text-accent">&lt;label&gt;</code>, or give the switch an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables the switches inside it. Read-only switches stay focusable and still submit.</li>
      <li>While a save is running, set <code class="font-mono text-accent">aria-busy</code> and cancel the change in <code class="font-mono text-accent">onCheckedChange</code> so the value only commits once it's saved.</li>
    </ul>
  </Section>
</div>