<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { Button } from "#lib/components/button"
  import { ArrowRight, LoaderCircle, Save } from "@lucide/svelte"

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const installCode = `import { Button } from "#lib/components/button"`

  const usageCode = `<script lang="ts">
  import { Button } from "#lib/components/button"
<\/script>

<Button onclick={() => save()}>Save</Button>`

  const tonesCode = `<Button tone="solid">Solid</Button>
<Button tone="outline">Outline</Button>
<Button tone="ghost">Ghost</Button>
<Button tone="soft">Soft</Button>
<Button tone="danger">Danger</Button>`

  const sizesCode = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Continue"><ArrowRight /></Button>`

  const pendingCode = `<Button onclick={() => wait(1500)} pendingAnnouncement="Saving">
  <Save data-show="idle" aria-hidden="true" />
  <LoaderCircle data-show="pending" class="animate-spin" aria-hidden="true" />
  Save
</Button>`

  const disabledCode = `<Button disabled>Disabled</Button>
<Button disabled focusableWhenDisabled>Focusable when disabled</Button>`

  const linkCode = `<Button tone="outline">
  {#snippet render({ props })}
    <a {...props} href="/docs/tabs">Go to Tabs</a>
  {/snippet}
</Button>`

  let presses = $state(0)
</script>

<svelte:head>
  <title>Button — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Button"
  description="Run an action, show that it's working, and keep it reachable when disabled. Wraps the ui-sdk Button, which adds async pending state, slow-action announcements and link rendering on top of a native button."
  entry="@ui-sdk/svelte/button"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Button is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/button</code>. Import it from the library:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      The underlying behavior comes from <code class="font-mono text-accent">@ui-sdk/core</code>,
      installed alongside <code class="font-mono text-accent">@ui-sdk/svelte</code>.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Use <code class="font-mono text-accent">onclick</code> to run an action. Button renders a native
      <code class="font-mono text-accent">&lt;button&gt;</code> with <code class="font-mono text-accent">type="button"</code> by default.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Click, or focus and press Enter or Space." code={usageCode}>
      <Button onclick={() => presses++}>Pressed {presses} times</Button>
    </Demo>

    <Demo title="Tones" description="Five visual tones for different emphasis." code={tonesCode}>
      <Button tone="solid">Solid</Button>
      <Button tone="outline">Outline</Button>
      <Button tone="ghost">Ghost</Button>
      <Button tone="soft">Soft</Button>
      <Button tone="danger">Danger</Button>
    </Demo>

    <Demo title="Sizes" description="Three sizes plus a square icon button." code={sizesCode}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Continue"><ArrowRight /></Button>
    </Demo>

    <Demo
      title="Pending"
      description="Return a Promise from onclick. The button stays busy, keeps focus and ignores presses until it settles."
      code={pendingCode}
    >
      <Button onclick={() => wait(1500)} pendingAnnouncement="Saving">
        <Save data-show="idle" aria-hidden="true" />
        <LoaderCircle data-show="pending" class="animate-spin" aria-hidden="true" />
        Save
      </Button>
    </Demo>

    <Demo title="Disabled" description="Native disabled, or focusable-when-disabled with aria-disabled." code={disabledCode}>
      <Button disabled>Disabled</Button>
      <Button disabled focusableWhenDisabled>Focusable when disabled</Button>
    </Demo>

    <Demo title="As a link" description="The render snippet swaps in an anchor and keeps link semantics." code={linkCode}>
      <Button tone="outline">
        {#snippet render({ props })}
          <a {...props} href="/docs/tabs">Go to Tabs</a>
        {/snippet}
      </Button>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Combine <code class="font-mono text-accent">tone</code> and <code class="font-mono text-accent">size</code>.
      State is exposed as <code class="font-mono text-accent">data-pending</code> and
      <code class="font-mono text-accent">data-disabled</code> for styling.
    </p>
    <PropsTable
      caption="tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent — the primary action." },
        { name: "outline", type: "string", description: "Bordered, transparent fill — secondary." },
        { name: "ghost", type: "string", description: "No fill or border — tertiary / toolbar." },
        { name: "soft", type: "string", description: "Tinted accent fill — low emphasis." },
        { name: "danger", type: "string", description: "Destructive action." },
      ]}
    />
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "h-8", description: "Compact." },
        { name: "md", type: "default", default: "h-9", description: "Default." },
        { name: "lg", type: "string", default: "h-11", description: "Prominent." },
        { name: "icon", type: "string", default: "h-9 w-9", description: "Square, for a single icon. Add aria-label." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Button forwards every native button attribute and the ui-sdk options below. Its
      <code class="font-mono text-accent">render</code> and <code class="font-mono text-accent">children</code>
      snippets receive the button state.
    </p>
    <PropsTable
      caption="Button — Negentropy props"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost" | "soft" | "danger"', default: '"solid"', description: "Visual style." },
        { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height and padding." },
        { name: "class", type: "string", description: "Extra classes merged onto the element (user wins)." },
      ]}
    />
    <PropsTable
      caption="Button — ui-sdk options"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Stops presses and leaves the tab order, unless focusableWhenDisabled." },
        { name: "focusableWhenDisabled", type: "boolean", default: "false", description: "Keeps a disabled button focusable with aria-disabled." },
        { name: "type", type: '"button" | "reset" | "submit"', default: '"button"', description: "Native form behavior." },
        { name: "pendingAnnouncement", type: "string", default: '"Loading"', description: "Announced after a second of pending. Empty string silences it." },
        { name: "onclick", type: "(event, { source }) => unknown", description: "Press handler. Return a Promise to stay pending until it settles." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="Button — state (snippets)"
      rows={[
        { name: "disabled", type: "boolean", description: "Disabled by option or a disabled fieldset." },
        { name: "pending", type: "boolean", description: "The last press's Promise is still running." },
        { name: "error", type: "unknown", description: "Why the last press failed. Cleared by the next press." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Give the button a clear text label. For an icon-only button, add <code class="font-mono text-accent">aria-label</code>.</li>
      <li>Native buttons respond to <span class="text-fg">Enter</span> and <span class="text-fg">Space</span>; a button rendered as a link responds to <span class="text-fg">Enter</span>.</li>
      <li>While pending it sets <code class="font-mono text-accent">aria-busy</code> and <code class="font-mono text-accent">aria-disabled</code>, keeps focus, and after a second announces <code class="font-mono text-accent">pendingAnnouncement</code> through a polite live region.</li>
      <li>Keep the label and change only the visual while pending (use <code class="font-mono text-accent">data-show="idle|pending"</code>); renaming a focused button is not reliably announced.</li>
      <li>A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> around the button disables it too.</li>
    </ul>
  </Section>
</div>