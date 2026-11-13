<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { RadioGroup, Radio, RadioIndicator } from "#lib/components/radio"
  import { Button } from "#lib/components/button"

  const installCode = `import { RadioGroup, Radio, RadioIndicator } from "#lib/components/radio"`

  const usageCode = `<script lang="ts">
  import { RadioGroup, Radio, RadioIndicator } from "#lib/components/radio"
<\/script>

<RadioGroup defaultValue="standard" aria-label="Shipping speed">
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio value="standard"><RadioIndicator /></Radio>
    Standard
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio value="express"><RadioIndicator /></Radio>
    Express
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio value="overnight"><RadioIndicator /></Radio>
    Overnight
  </label>
</RadioGroup>`

  const controlledCode = `<script lang="ts">
  import { RadioGroup, Radio, RadioIndicator } from "#lib/components/radio"
  import { Button } from "#lib/components/button"

  let value = $state<string | null>("pro")
<\/script>

<Button size="sm" tone="outline" onclick={() => (value = "team")}>Choose Team</Button>
<RadioGroup bind:value aria-label="Plan">
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio value="starter"><RadioIndicator /></Radio>
    Starter
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio value="pro"><RadioIndicator /></Radio>
    Pro
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio value="team"><RadioIndicator /></Radio>
    Team
  </label>
</RadioGroup>
<p class="text-sm text-muted">Selected: {value ?? "none"}</p>`

  const sizesCode = `<RadioGroup defaultValue="md" aria-label="Size" class="flex-row gap-6">
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio size="sm" value="sm"><RadioIndicator /></Radio>
    Small
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio size="md" value="md"><RadioIndicator /></Radio>
    Medium
  </label>
  <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
    <Radio size="lg" value="lg"><RadioIndicator /></Radio>
    Large
  </label>
</RadioGroup>`

  const disabledCode = `<div class="flex flex-col gap-6">
  <RadioGroup defaultValue="light" disabled aria-label="Theme">
    <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <Radio value="light"><RadioIndicator /></Radio>
      Light
    </label>
    <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <Radio value="dark"><RadioIndicator /></Radio>
      Dark
    </label>
  </RadioGroup>
  <RadioGroup defaultValue="daily" aria-label="Backups">
    <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <Radio value="hourly" disabled><RadioIndicator /></Radio>
      Hourly (needs Pro)
    </label>
    <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <Radio value="daily"><RadioIndicator /></Radio>
      Daily
    </label>
    <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <Radio value="weekly"><RadioIndicator /></Radio>
      Weekly
    </label>
  </RadioGroup>
</div>`

  const cardsCode = `<script lang="ts">
  import { RadioGroup, Radio, RadioIndicator } from "#lib/components/radio"

  const plans = [
    { value: "hobby", label: "Hobby", description: "Free for personal projects." },
    { value: "pro", label: "Pro", description: "$20 per month for growing teams." },
    { value: "enterprise", label: "Enterprise", description: "Custom pricing and support." },
  ]
<\/script>

<RadioGroup defaultValue="hobby" aria-label="Plan">
  {#each plans as plan (plan.value)}
    <label class="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-line bg-surface p-4 transition-colors has-[[data-checked]]:border-accent hover:bg-elevated">
      <span class="flex flex-col gap-1">
        <span class="text-sm font-medium text-fg">{plan.label}</span>
        <span class="text-sm text-muted">{plan.description}</span>
      </span>
      <Radio value={plan.value}><RadioIndicator /></Radio>
    </label>
  {/each}
</RadioGroup>`

  const formCode = `<script lang="ts">
  import { RadioGroup, Radio, RadioIndicator } from "#lib/components/radio"
  import { Button } from "#lib/components/button"

  let submitted = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    submitted = String(new FormData(event.currentTarget).get("shipping") ?? "nothing")
  }
<\/script>

<form class="flex flex-col gap-3" onsubmit={onSubmit}>
  <RadioGroup name="shipping" required defaultValue="standard" aria-label="Shipping speed">
    <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <Radio value="standard"><RadioIndicator /></Radio>
      Standard — free, 5 to 7 days
    </label>
    <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
      <Radio value="express"><RadioIndicator /></Radio>
      Express — $9, 2 days
    </label>
  </RadioGroup>
  <div class="flex gap-2">
    <Button type="submit" size="sm">Continue</Button>
    <Button type="reset" size="sm" tone="outline">Reset</Button>
  </div>
</form>
<p class="text-sm text-muted">Submitted: {submitted || "not yet"}</p>`

  const plans = [
    { value: "hobby", label: "Hobby", description: "Free for personal projects." },
    { value: "pro", label: "Pro", description: "$20 per month for growing teams." },
    { value: "enterprise", label: "Enterprise", description: "Custom pricing and support." },
  ]

  let controlled = $state<string | null>("pro")
  let submitted = $state("")

  function onSubmit(event: SubmitEvent & { currentTarget: HTMLFormElement }) {
    event.preventDefault()
    submitted = String(new FormData(event.currentTarget).get("shipping") ?? "nothing")
  }
</script>

<svelte:head>
  <title>Radio — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Radio"
  description="Choose one option from a short list, with arrow keys and a single tab stop. Wraps the ui-sdk RadioGroup, which keeps one value and renders each radio as a button with the radio role plus a hidden native input."
  entry="@ui-sdk/svelte/radio"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Radio is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/radio</code>. Import the parts from the library:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      The behavior comes from <code class="font-mono text-accent">@ui-sdk/core</code>, installed alongside
      <code class="font-mono text-accent">@ui-sdk/svelte</code>.
      <code class="font-mono text-accent">createRadioGroupController</code> is re-exported for checking a radio
      from anywhere.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Give each radio a unique <code class="font-mono text-accent">value</code> and wrap it with its text in a
      <code class="font-mono text-accent">&lt;label&gt;</code>. The group's value is the checked radio's value.
      Name the group with <code class="font-mono text-accent">aria-label</code> or
      <code class="font-mono text-accent">aria-labelledby</code>. Without
      <code class="font-mono text-accent">defaultValue</code> nothing starts checked, and Tab enters on the
      first enabled radio.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Click an option, or focus one and use the arrow keys to move the selection." code={usageCode}>
      <div class="w-full max-w-xs">
        <RadioGroup defaultValue="standard" aria-label="Shipping speed">
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="standard"><RadioIndicator /></Radio>
            Standard
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="express"><RadioIndicator /></Radio>
            Express
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="overnight"><RadioIndicator /></Radio>
            Overnight
          </label>
        </RadioGroup>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:value owns the selection, so a button elsewhere can change it." code={controlledCode}>
      <div class="flex w-full max-w-xs flex-col gap-3">
        <Button size="sm" tone="outline" onclick={() => (controlled = "team")}>Choose Team</Button>
        <RadioGroup bind:value={controlled} aria-label="Plan">
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="starter"><RadioIndicator /></Radio>
            Starter
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="pro"><RadioIndicator /></Radio>
            Pro
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="team"><RadioIndicator /></Radio>
            Team
          </label>
        </RadioGroup>
        <p class="text-sm text-muted">Selected: {controlled ?? "none"}</p>
      </div>
    </Demo>

    <Demo title="Sizes" description="size='sm' | 'md' | 'lg' scales the circle and its dot together." code={sizesCode}>
      <RadioGroup defaultValue="md" aria-label="Size" class="flex-row gap-6">
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          <Radio size="sm" value="sm"><RadioIndicator /></Radio>
          Small
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          <Radio size="md" value="md"><RadioIndicator /></Radio>
          Medium
        </label>
        <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
          <Radio size="lg" value="lg"><RadioIndicator /></Radio>
          Large
        </label>
      </RadioGroup>
    </Demo>

    <Demo title="Disabled" description="Disable the whole group, or one radio. Arrow keys skip disabled radios." code={disabledCode}>
      <div class="flex flex-col gap-6">
        <RadioGroup defaultValue="light" disabled aria-label="Theme">
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="light"><RadioIndicator /></Radio>
            Light
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="dark"><RadioIndicator /></Radio>
            Dark
          </label>
        </RadioGroup>
        <RadioGroup defaultValue="daily" aria-label="Backups">
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="hourly" disabled><RadioIndicator /></Radio>
            Hourly (needs Pro)
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="daily"><RadioIndicator /></Radio>
            Daily
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="weekly"><RadioIndicator /></Radio>
            Weekly
          </label>
        </RadioGroup>
      </div>
    </Demo>

    <Demo title="Choice cards" description="Wrap an option's content in its label to make the whole card clickable." code={cardsCode}>
      <div class="w-full max-w-md">
        <RadioGroup defaultValue="hobby" aria-label="Plan">
          {#each plans as plan (plan.value)}
            <label class="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-line bg-surface p-4 transition-colors has-[[data-checked]]:border-accent hover:bg-elevated">
              <span class="flex flex-col gap-1">
                <span class="text-sm font-medium text-fg">{plan.label}</span>
                <span class="text-sm text-muted">{plan.description}</span>
              </span>
              <Radio value={plan.value}><RadioIndicator /></Radio>
            </label>
          {/each}
        </RadioGroup>
      </div>
    </Demo>

    <Demo title="Read-only" description="readOnly keeps the value and the tab stop: arrow keys move focus but check nothing." code={usageCode}>
      <div class="w-full max-w-xs">
        <RadioGroup defaultValue="pro" readOnly aria-label="Your plan">
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="free"><RadioIndicator /></Radio>
            Free
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="pro"><RadioIndicator /></Radio>
            Pro
          </label>
          <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
            <Radio value="team"><RadioIndicator /></Radio>
            Team
          </label>
        </RadioGroup>
      </div>
    </Demo>

    <Demo title="In a form" description="name submits the checked value; required blocks submission until there's a choice; Reset restores defaultValue." code={formCode}>
      <div class="w-full max-w-sm space-y-3">
        <form class="flex flex-col gap-3" onsubmit={onSubmit}>
          <RadioGroup name="shipping" required defaultValue="standard" aria-label="Shipping speed">
            <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
              <Radio value="standard"><RadioIndicator /></Radio>
              Standard — free, 5 to 7 days
            </label>
            <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
              <Radio value="express"><RadioIndicator /></Radio>
              Express — $9, 2 days
            </label>
          </RadioGroup>
          <div class="flex gap-2">
            <Button type="submit" size="sm">Continue</Button>
            <Button type="reset" size="sm" tone="outline">Reset</Button>
          </div>
        </form>
        <p class="text-sm text-muted">Submitted: {submitted || "not yet"}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Radio has one visual axis, <code class="font-mono text-accent">size</code>; the dot reads it through a
      named Tailwind group. The group stacks vertically by default — pass
      <code class="font-mono text-accent">class="flex-row"</code> for a horizontal row.
    </p>
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "size-3.5", description: "Compact, for dense lists." },
        { name: "md", type: "default", default: "size-4", description: "Default." },
        { name: "lg", type: "string", default: "size-5", description: "Prominent, for touch targets and cards." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-checked", type: "attribute", description: "On the checked radio and its indicator. The wrapper rings it with the accent." },
        { name: "data-unchecked", type: "attribute", description: "On radios that aren't checked." },
        { name: "data-disabled", type: "attribute", description: "On the group, a radio or its indicator when disabled by a prop, the group or a fieldset." },
        { name: "data-readonly", type: "attribute", description: "Present when the group is read-only." },
        { name: "data-required", type: "attribute", description: "Present when a form won't submit until a radio is checked." },
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
      caption="RadioGroup (root)"
      rows={[
        { name: "value", type: "string | null", description: "The checked radio's value. Bind with bind:value to control. null checks nothing." },
        { name: "defaultValue", type: "string | null", description: "Initial value when uncontrolled. A form reset returns to it." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when a radio or a reset wants to change the value. details.cancel() stops it." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables every radio: they can't be focused or changed, and nothing submits." },
        { name: "readOnly", type: "boolean", default: "false", description: "Radios stay focusable and the value submits, but nothing changes it." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until a radio is checked." },
        { name: "name", type: "string", description: "The name the value submits under. Without one the group submits nothing." },
        { name: "form", type: "string", description: "The id of a form to join from elsewhere on the page." },
        { name: "loop", type: "boolean", default: "true", description: "Arrow keys wrap from the last radio to the first." },
        { name: "controller", type: "RadioGroupController", description: "Check radios from anywhere via createRadioGroupController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
        { name: "class", type: "string", description: "Extra classes merged onto the group element (user wins)." },
      ]}
    />
    <PropsTable
      caption="Radio — Negentropy props"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Circle and dot size." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="Radio — ui-sdk options"
      rows={[
        { name: "value", type: "string", description: "What the group's value becomes when this radio is checked. Required." },
        { name: "disabled", type: "boolean", default: "false", description: "Arrow keys pass it, and it can't be focused or checked." },
      ]}
    />
    <PropsTable
      caption="RadioIndicator"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "Stay in the page while unchecked, with data-unchecked, to preview the dot on hover." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "value", type: "string | null", description: "RadioGroup only: the checked value." },
        { name: "checked", type: "boolean", description: "Radio and indicator: whether this radio is checked." },
        { name: "disabled", type: "boolean", description: "Disabled by itself, its group or a fieldset." },
        { name: "readOnly", type: "boolean", description: "The group is read-only." },
        { name: "required", type: "boolean", description: "A form won't submit until a radio is checked." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA radio group pattern: <code class="font-mono text-accent">role="radiogroup"</code> with <code class="font-mono text-accent">role="radio"</code> items and <code class="font-mono text-accent">aria-checked</code>, behaving like native radios that share a name.</li>
      <li><span class="text-fg">Tab</span> enters the group once, onto the checked radio or the first enabled one, and leaves after one stop.</li>
      <li><span class="text-fg">Arrow keys</span> move to the next or previous radio and check it, skipping disabled ones; they wrap at both ends unless <code class="font-mono text-accent">loop={false}</code>.</li>
      <li><span class="text-fg">Space</span> checks the focused radio. <span class="text-fg">Enter</span> submits its form and never checks a radio.</li>
      <li>In right-to-left pages <span class="text-fg">ArrowLeft</span> moves to the next radio and <span class="text-fg">ArrowRight</span> to the previous; Up and Down keep their direction.</li>
      <li>Name the group with <code class="font-mono text-accent">aria-label</code> or <code class="font-mono text-accent">aria-labelledby</code>; each radio's label is its own accessible name.</li>
      <li>A read-only group moves focus with arrow keys but checks nothing. A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables the group too.</li>
    </ul>
  </Section>
</div>