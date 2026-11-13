<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Collapsible,
    CollapsibleTrigger,
    CollapsiblePanel,
    createCollapsibleController,
  } from "$lib/components/collapsible"
  import { Button } from "$lib/components/button"
  import { ChevronDown } from "@lucide/svelte"

  const collapsible = createCollapsibleController()

  const installCode = `import {
  Collapsible, CollapsibleTrigger, CollapsiblePanel,
} from "$lib/components/collapsible"`

  const usageCode = `<script lang="ts">
  import {
    Collapsible, CollapsibleTrigger, CollapsiblePanel,
  } from "$lib/components/collapsible"
  import { ChevronDown } from "@lucide/svelte"
<\/script>

<Collapsible>
  <CollapsibleTrigger>
    Order #4189
    <ChevronDown aria-hidden="true" />
  </CollapsibleTrigger>
  <CollapsiblePanel>
    <div class="pb-1">2 × Linen shirt, 1 × Canvas tote. Total $84.00.</div>
  </CollapsiblePanel>
</Collapsible>`

  const cardCode = `<Collapsible variant="card">
  <CollapsibleTrigger>
    Release notes
    <ChevronDown aria-hidden="true" />
  </CollapsibleTrigger>
  <CollapsiblePanel>
    <ul class="list-disc space-y-1 pb-1 pl-5">
      <li>Search now matches file contents, not only names.</li>
      <li>Shared links remember the folder they were opened from.</li>
      <li>Uploads resume after the connection drops.</li>
    </ul>
  </CollapsiblePanel>
</Collapsible>`

  const controlledCode = `<script lang="ts">
  import { createCollapsibleController } from "$lib/components/collapsible"

  const collapsible = createCollapsibleController()
  let open = $state(false)
<\/script>

<Button size="sm" tone="outline" onclick={() => collapsible.toggle()}>Toggle</Button>
<Collapsible variant="card" bind:open controller={collapsible}>
  <CollapsibleTrigger>
    Recovery codes
    <ChevronDown aria-hidden="true" />
  </CollapsibleTrigger>
  <CollapsiblePanel>
    <div class="space-y-2 pb-1">
      <p class="font-mono">7KQ2-M9XD · P4TR-8HZC · W3NB-6JUE</p>
      <Button size="sm" onclick={() => collapsible.close()}>Done</Button>
    </div>
  </CollapsiblePanel>
</Collapsible>`

  const disabledCode = `<Collapsible variant="card" disabled>
  <CollapsibleTrigger>
    Gift options
    <ChevronDown aria-hidden="true" />
  </CollapsibleTrigger>
  <CollapsiblePanel>
    <div class="pb-1">Add a gift message and wrapping.</div>
  </CollapsiblePanel>
</Collapsible>`

  const keepMountedCode = `<Collapsible variant="card">
  <CollapsibleTrigger>
    Add a delivery note
    <ChevronDown aria-hidden="true" />
  </CollapsibleTrigger>
  <CollapsiblePanel keepMounted>
    <div class="space-y-1 pb-1">
      <label for="delivery-note" class="text-xs font-medium text-muted">Delivery note</label>
      <textarea
        id="delivery-note"
        rows={3}
        class="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      ></textarea>
    </div>
  </CollapsiblePanel>
</Collapsible>`

  let open = $state(false)
</script>

<svelte:head>
  <title>Collapsible — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Collapsible"
  description="Show and hide one panel of content. Wraps the ui-sdk Collapsible, which follows the WAI-ARIA disclosure pattern, animates the panel's measured height and can keep its contents mounted."
  entry="@ui-sdk/svelte/collapsible"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/collapsible</code>. For a set of panels, use
      <a class="text-accent underline" href="/docs/accordion">Accordion</a> instead.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The root and panel render divs and the trigger renders a native button. Put other content around
      them, like a heading or a summary that always shows.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Press the trigger, or focus it and press Enter or Space. The panel animates its height."
      code={usageCode}
    >
      <div class="w-full max-w-sm">
        <Collapsible>
          <CollapsibleTrigger>
            Order #4189
            <ChevronDown aria-hidden="true" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="pb-1">2 × Linen shirt, 1 × Canvas tote. Total $84.00.</div>
          </CollapsiblePanel>
        </Collapsible>
      </div>
    </Demo>

    <Demo
      title="Card"
      description="variant='card' wraps the disclosure in a bordered surface and stretches the trigger."
      code={cardCode}
    >
      <div class="w-full max-w-sm">
        <Collapsible variant="card">
          <CollapsibleTrigger>
            Release notes
            <ChevronDown aria-hidden="true" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <ul class="list-disc space-y-1 pb-1 pl-5">
              <li>Search now matches file contents, not only names.</li>
              <li>Shared links remember the folder they were opened from.</li>
              <li>Uploads resume after the connection drops.</li>
            </ul>
          </CollapsiblePanel>
        </Collapsible>
      </div>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:open owns the state; a controller toggles it from a button outside, and Done closes it."
      code={controlledCode}
    >
      <div class="w-full max-w-sm space-y-3">
        <Button size="sm" tone="outline" onclick={() => collapsible.toggle()}>Toggle</Button>
        <Collapsible variant="card" bind:open={open} controller={collapsible}>
          <CollapsibleTrigger>
            Recovery codes
            <ChevronDown aria-hidden="true" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="space-y-2 pb-1">
              <p class="font-mono">7KQ2-M9XD · P4TR-8HZC · W3NB-6JUE</p>
              <Button size="sm" onclick={() => collapsible.close()}>Done</Button>
            </div>
          </CollapsiblePanel>
        </Collapsible>
        <p class="text-xs text-faint">{open ? "Open" : "Closed"}</p>
      </div>
    </Demo>

    <Demo
      title="Disabled"
      description="The trigger stays in the tab order and reports aria-disabled, but never opens."
      code={disabledCode}
    >
      <div class="w-full max-w-sm">
        <Collapsible variant="card" disabled>
          <CollapsibleTrigger>
            Gift options
            <ChevronDown aria-hidden="true" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="pb-1">Add a gift message and wrapping.</div>
          </CollapsiblePanel>
        </Collapsible>
      </div>
    </Demo>

    <Demo
      title="Keep mounted"
      description="keepMounted keeps the closed panel in the page, hidden, so a draft survives closing. Type, close, reopen."
      code={keepMountedCode}
    >
      <div class="w-full max-w-sm">
        <Collapsible variant="card">
          <CollapsibleTrigger>
            Add a delivery note
            <ChevronDown aria-hidden="true" />
          </CollapsibleTrigger>
          <CollapsiblePanel keepMounted>
            <div class="space-y-1 pb-1">
              <label for="delivery-note" class="text-xs font-medium text-muted">Delivery note</label>
              <textarea
                id="delivery-note"
                rows={3}
                class="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              ></textarea>
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Collapsible variant"
      rows={[
        { name: "plain", type: "default", description: "A bare disclosure: the trigger sizes to its content." },
        { name: "card", type: "string", description: "A bordered, rounded surface with padding; the trigger stretches to its width." },
      ]}
    />
    <PropsTable
      caption="Panel mounting"
      rows={[
        { name: "default", type: "unmounts", description: "A closed panel leaves the page, so Tab skips its contents." },
        { name: "keepMounted", type: "boolean prop", description: "The closed panel stays in the page, hidden, preserving field state." },
        { name: "hiddenUntilFound", type: "boolean prop", description: 'The closed panel stays as hidden="until-found", so browser Find and deep links can open it.' },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-disabled</code>, and on the panel
      <code class="font-mono text-accent">data-starting-style</code> /
      <code class="font-mono text-accent">data-ending-style</code>. The wrapper animates
      <code class="font-mono text-accent">--collapsible-panel-height</code> and turns the chevron from
      <code class="font-mono text-accent">data-open</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Collapsible (root)"
      rows={[
        { name: "variant", type: '"plain" | "card"', default: '"plain"', description: "Negentropy visual style." },
        { name: "open", type: "boolean", description: "Whether the panel is open. Bind with bind:open to control." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Whether the panel is open at first, when uncontrolled." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops the trigger from opening or closing. The trigger stays focusable." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when the panel wants to open or close. details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs once the panel finishes opening or closing, after any animation." },
        { name: "controller", type: "CollapsibleController", description: "Open, close, toggle and focus from anywhere via createCollapsibleController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="CollapsibleTrigger"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
        { name: "render", type: "Snippet", description: "Swap the element, e.g. a button inside an h3." },
        { name: "children", type: "Snippet<[state]>", description: "Content. Receives open and disabled." },
      ]}
    />
    <PropsTable
      caption="CollapsiblePanel"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "Keeps the panel in the page, hidden, while closed." },
        { name: "hiddenUntilFound", type: "boolean", default: "false", description: 'Keeps the closed panel findable as hidden="until-found".' },
        { name: "class", type: "string", description: "Extra classes merged onto the panel." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "open", type: "boolean", description: "Whether the panel is open. All three parts receive it." },
        { name: "disabled", type: "boolean", description: "Whether the trigger ignores presses. The open option and controller can still change it." },
      ]}
    />
    <PropsTable
      caption="CollapsibleController"
      rows={[
        { name: "isOpen()", type: "() => boolean", description: "Whether the panel is open." },
        { name: "setOpen(open)", type: "(open, options?) => boolean", description: "Opens or closes. False when canceled or unchanged." },
        { name: "open() / close() / toggle()", type: "(options?) => boolean", description: "Write the state from anywhere." },
        { name: "focus()", type: "() => void", description: "Moves focus to the trigger." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA disclosure pattern: the trigger is a native button with <code class="font-mono text-accent">aria-expanded</code>, and <code class="font-mono text-accent">aria-controls</code> pointing at the panel while it is mounted.</li>
      <li><span class="text-fg">Enter</span> and <span class="text-fg">Space</span> open or close the panel; focus stays on the trigger.</li>
      <li><span class="text-fg">Tab</span> moves from the trigger into an open panel, and skips a closed one.</li>
      <li>Closing a panel while focus is inside it moves focus back to the trigger.</li>
      <li>A disabled trigger stays focusable and reports <code class="font-mono text-accent">aria-disabled="true"</code>. A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> around the collapsible disables it too.</li>
      <li>Give the trigger a clear text label. If it is icon-only, add <code class="font-mono text-accent">aria-label</code>.</li>
      <li>With <code class="font-mono text-accent">hiddenUntilFound</code>, Svelte writes <code class="font-mono text-accent">hidden="until-found"</code> on the server, so the closed panel is findable before hydration.</li>
    </ul>
  </Section>
</div>