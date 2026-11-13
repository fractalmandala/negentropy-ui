<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionPanel,
  } from "#lib/components/accordion"
  import { Button } from "#lib/components/button"
  import { ChevronDown } from "@lucide/svelte"

  const installCode = `import {
  Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel,
} from "#lib/components/accordion"`

  const usageCode = `<script lang="ts">
  import {
    Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel,
  } from "#lib/components/accordion"
  import { ChevronDown } from "@lucide/svelte"
<\/script>

<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping">
    <AccordionHeader>
      <AccordionTrigger>
        What are your shipping options?
        <ChevronDown aria-hidden="true" />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>
      <div class="pb-3">Standard, express and overnight. Orders over $50 ship free.</div>
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionHeader>
      <AccordionTrigger>
        What is your return policy?
        <ChevronDown aria-hidden="true" />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>
      <div class="pb-3">Return any unused item within 30 days for a full refund.</div>
    </AccordionPanel>
  </AccordionItem>
</Accordion>`

  const multipleCode = `<Accordion multiple defaultValue={["notifications"]}>
  <AccordionItem value="notifications">
    <AccordionHeader>
      <AccordionTrigger>Notifications<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Choose what we email you about.</div></AccordionPanel>
  </AccordionItem>
  <AccordionItem value="privacy">
    <AccordionHeader>
      <AccordionTrigger>Privacy<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Two-factor authentication and signed-in devices.</div></AccordionPanel>
  </AccordionItem>
  <AccordionItem value="billing">
    <AccordionHeader>
      <AccordionTrigger>Billing<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Update your payment method and download invoices.</div></AccordionPanel>
  </AccordionItem>
</Accordion>`

  const controlledCode = `<script lang="ts">
  let value = $state(["account"])
<\/script>

<Button size="sm" tone="outline" onclick={() => (value = ["security"])}>
  Review security
</Button>
<Accordion bind:value multiple>
  <AccordionItem value="account">
    <AccordionHeader>
      <AccordionTrigger>Account<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Your name, email and profile photo.</div></AccordionPanel>
  </AccordionItem>
  <AccordionItem value="security">
    <AccordionHeader>
      <AccordionTrigger>Security<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Password, passkeys and two-factor authentication.</div></AccordionPanel>
  </AccordionItem>
</Accordion>`

  const cardsCode = `<Accordion variant="cards" defaultValue={["one"]}>
  <AccordionItem value="one">
    <AccordionHeader>
      <AccordionTrigger>Why animate the height?<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">So the content below slides instead of jumping.</div></AccordionPanel>
  </AccordionItem>
  <AccordionItem value="two">
    <AccordionHeader>
      <AccordionTrigger>Where does the height come from?<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">The panel measures itself into a CSS variable.</div></AccordionPanel>
  </AccordionItem>
</Accordion>`

  const disabledCode = `<Accordion>
  <AccordionItem value="access">
    <AccordionHeader>
      <AccordionTrigger>Can I see my order history?<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Every order from the last five years is in your account.</div></AccordionPanel>
  </AccordionItem>
  <AccordionItem value="premium" disabled>
    <AccordionHeader>
      <AccordionTrigger>Premium features<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Priority support and early access.</div></AccordionPanel>
  </AccordionItem>
</Accordion>`

  const alwaysOpenCode = `<Accordion collapsible={false} defaultValue={["overview"]}>
  <AccordionItem value="overview">
    <AccordionHeader>
      <AccordionTrigger>Overview<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">The project, its goals and its owners.</div></AccordionPanel>
  </AccordionItem>
  <AccordionItem value="timeline">
    <AccordionHeader>
      <AccordionTrigger>Timeline<ChevronDown aria-hidden="true" /></AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel><div class="pb-3">Kickoff in March, beta in June, launch in September.</div></AccordionPanel>
  </AccordionItem>
</Accordion>`

  let controlled = $state<string[]>(["account"])
</script>

<svelte:head>
  <title>Accordion — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Accordion"
  description="Show and hide sections of content from their headings. Wraps the ui-sdk Accordion, which follows the WAI-ARIA accordion pattern with heading-wrapped triggers, animated panels and single or multiple expansion."
  entry="@ui-sdk/svelte/accordion"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/accordion</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Give every item a unique <code class="font-mono text-accent">value</code>, put its trigger inside
      a heading, then add the panel it opens. The accordion's value is always an array of open item
      values, even when only one can be open.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="One item open at a time. Press a heading, or focus it and press Enter or Space."
      code={usageCode}
    >
      <div class="w-full max-w-md">
        <Accordion defaultValue={["shipping"]}>
          <AccordionItem value="shipping">
            <AccordionHeader>
              <AccordionTrigger>
                What are your shipping options?
                <ChevronDown aria-hidden="true" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="pb-3">Standard, express and overnight. Orders over $50 ship free.</div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionHeader>
              <AccordionTrigger>
                What is your return policy?
                <ChevronDown aria-hidden="true" />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="pb-3">Return any unused item within 30 days for a full refund.</div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </Demo>

    <Demo
      title="Multiple"
      description="multiple lets several items stay open at once; each closes independently."
      code={multipleCode}
    >
      <div class="w-full max-w-md">
        <Accordion multiple defaultValue={["notifications"]}>
          <AccordionItem value="notifications">
            <AccordionHeader>
              <AccordionTrigger>Notifications<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Choose what we email you about.</div></AccordionPanel>
          </AccordionItem>
          <AccordionItem value="privacy">
            <AccordionHeader>
              <AccordionTrigger>Privacy<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Two-factor authentication and signed-in devices.</div></AccordionPanel>
          </AccordionItem>
          <AccordionItem value="billing">
            <AccordionHeader>
              <AccordionTrigger>Billing<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Update your payment method and download invoices.</div></AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:value owns the open items, so a button elsewhere can open one."
      code={controlledCode}
    >
      <div class="w-full max-w-md space-y-3">
        <Button size="sm" tone="outline" onclick={() => (controlled = ["security"])}>
          Review security
        </Button>
        <Accordion bind:value={controlled} multiple>
          <AccordionItem value="account">
            <AccordionHeader>
              <AccordionTrigger>Account<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Your name, email and profile photo.</div></AccordionPanel>
          </AccordionItem>
          <AccordionItem value="security">
            <AccordionHeader>
              <AccordionTrigger>Security<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Password, passkeys and two-factor authentication.</div></AccordionPanel>
          </AccordionItem>
        </Accordion>
        <p class="text-xs text-faint">Open: {controlled.join(", ") || "none"}</p>
      </div>
    </Demo>

    <Demo
      title="Cards"
      description="variant='cards' gives each item its own bordered surface."
      code={cardsCode}
    >
      <div class="w-full max-w-md">
        <Accordion variant="cards" defaultValue={["one"]}>
          <AccordionItem value="one">
            <AccordionHeader>
              <AccordionTrigger>Why animate the height?<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">So the content below slides instead of jumping.</div></AccordionPanel>
          </AccordionItem>
          <AccordionItem value="two">
            <AccordionHeader>
              <AccordionTrigger>Where does the height come from?<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">The panel measures itself into a CSS variable.</div></AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </Demo>

    <Demo
      title="Disabled"
      description="A disabled item stays focusable so people can discover it, but never opens."
      code={disabledCode}
    >
      <div class="w-full max-w-md">
        <Accordion>
          <AccordionItem value="access">
            <AccordionHeader>
              <AccordionTrigger>Can I see my order history?<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Every order from the last five years is in your account.</div></AccordionPanel>
          </AccordionItem>
          <AccordionItem value="premium" disabled>
            <AccordionHeader>
              <AccordionTrigger>Premium features<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Priority support and early access.</div></AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </Demo>

    <Demo
      title="Always one open"
      description="collapsible={false} keeps one panel open; pressing it again does nothing."
      code={alwaysOpenCode}
    >
      <div class="w-full max-w-md">
        <Accordion collapsible={false} defaultValue={["overview"]}>
          <AccordionItem value="overview">
            <AccordionHeader>
              <AccordionTrigger>Overview<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">The project, its goals and its owners.</div></AccordionPanel>
          </AccordionItem>
          <AccordionItem value="timeline">
            <AccordionHeader>
              <AccordionTrigger>Timeline<ChevronDown aria-hidden="true" /></AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel><div class="pb-3">Kickoff in March, beta in June, launch in September.</div></AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Accordion variant"
      rows={[
        { name: "bordered", type: "default", description: "Divided rows: a rule above the list and below each item." },
        { name: "cards", type: "string", description: "Each item is its own bordered, rounded surface with a gap between." },
      ]}
    />
    <PropsTable
      caption="Expansion mode"
      rows={[
        { name: "single", type: "default", description: "Opening an item closes the others. The open one can close." },
        { name: "multiple", type: "boolean prop", description: "Items open and close independently; several can be open." },
        { name: "collapsible={false}", type: "boolean prop", description: "One item always stays open; its trigger reports aria-disabled." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-disabled</code>, and on the panel
      <code class="font-mono text-accent">data-starting-style</code> /
      <code class="font-mono text-accent">data-ending-style</code>. The wrapper turns the trigger's
      chevron from <code class="font-mono text-accent">data-open</code> and animates the panel's
      <code class="font-mono text-accent">--accordion-panel-height</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Accordion (root)"
      rows={[
        { name: "variant", type: '"bordered" | "cards"', default: '"bordered"', description: "Negentropy visual style, shared with its items." },
        { name: "value", type: "string[]", description: "The open items' values. Bind with bind:value to control." },
        { name: "defaultValue", type: "string[]", description: "The items open at first, when uncontrolled." },
        { name: "multiple", type: "boolean", default: "false", description: "Whether several items can be open at once." },
        { name: "collapsible", type: "boolean", default: "true", description: "Whether the open item can close when only one may be open." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops every item from opening or closing. Triggers stay focusable." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Closed panels stay in the page, hidden." },
        { name: "hiddenUntilFound", type: "boolean", default: "false", description: 'Closed panels stay findable as hidden="until-found".' },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when items want to open or close. details.cancel() stops it." },
        { name: "controller", type: "AccordionController", description: "Open, close and focus items from anywhere via createAccordionController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="AccordionItem"
      rows={[
        { name: "value", type: "string", description: "Identifies the item. Defaults to a generated id." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops this item from opening or closing. Its trigger stays focusable." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs before the accordion's onValueChange. details.cancel() cancels the whole change." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the panel finishes opening or closing, including its animation." },
      ]}
    />
    <PropsTable
      caption="AccordionHeader"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the heading." },
        { name: "render", type: "Snippet", description: "Swap the element, e.g. an h4 for a nested accordion." },
      ]}
    />
    <PropsTable
      caption="AccordionTrigger"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Stops this trigger from opening or closing its item. It stays focusable." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="AccordionPanel"
      rows={[
        { name: "keepMounted", type: "boolean", description: "Keeps this panel in the page, hidden, while closed. Overrides the accordion's." },
        { name: "hiddenUntilFound", type: "boolean", description: "Keeps this panel findable while closed. Overrides the accordion's." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "value", type: "string[]", description: "Root only: the open items' values." },
        { name: "multiple", type: "boolean", description: "Root only: whether several items can be open." },
        { name: "open", type: "boolean", description: "Item, header, trigger and panel: whether this item is open." },
        { name: "disabled", type: "boolean", description: "Whether the item can't open or close." },
        { name: "index", type: "number", description: "The item's position from 0, or -1 until it is in the page." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA accordion pattern: each trigger is a <code class="font-mono text-accent">&lt;button&gt;</code> inside a heading, with <code class="font-mono text-accent">aria-expanded</code> and <code class="font-mono text-accent">aria-controls</code> pointing at its panel.</li>
      <li>Each panel is a <code class="font-mono text-accent">role="region"</code> labelled by its trigger via <code class="font-mono text-accent">aria-labelledby</code>, so open panels are listed as landmarks. Keep the number of items modest with <code class="font-mono text-accent">multiple</code>.</li>
      <li><span class="text-fg">Tab</span> moves through every trigger in order, disabled ones included, then into an open panel.</li>
      <li><span class="text-fg">Enter</span> and <span class="text-fg">Space</span> toggle the focused trigger's panel.</li>
      <li>Arrow keys, Home and End do nothing: the APG removed them from this pattern, and a screen reader's heading navigation already reaches each trigger.</li>
      <li>Use a heading level that fits the document. <code class="font-mono text-accent">AccordionHeader</code> renders an <code class="font-mono text-accent">h3</code>; swap it with a <code class="font-mono text-accent">render</code> snippet for nested accordions.</li>
      <li>Disabled triggers stay focusable and report <code class="font-mono text-accent">aria-disabled</code>. With <code class="font-mono text-accent">collapsible={false}</code> the open trigger reports it too.</li>
      <li>Closing a panel that holds focus moves focus back to its trigger.</li>
    </ul>
  </Section>
</div>