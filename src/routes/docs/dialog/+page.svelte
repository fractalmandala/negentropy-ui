<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Dialog,
    DialogTrigger,
    DialogBackdrop,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
  } from "#lib/components/dialog"
  import { Button } from "#lib/components/button"
  import { X } from "@lucide/svelte"

  const installCode = `import {
  Dialog, DialogTrigger, DialogBackdrop, DialogContent,
  DialogTitle, DialogDescription, DialogClose,
} from "#lib/components/dialog"`

  const usageCode = `<script lang="ts">
  import {
    Dialog, DialogTrigger, DialogBackdrop, DialogContent,
    DialogTitle, DialogDescription, DialogClose,
  } from "#lib/components/dialog"
<\/script>

<Dialog>
  <DialogTrigger>Share</DialogTrigger>
  <DialogBackdrop />
  <DialogContent>
    <DialogTitle>Share link</DialogTitle>
    <DialogDescription>Anyone with this link can view this.</DialogDescription>
    <div class="flex justify-end">
      <DialogClose>Done</DialogClose>
    </div>
    <DialogClose tone="ghost" aria-label="Close" class="absolute right-3 top-3 h-7 w-7 p-0">
      <X aria-hidden="true" />
    </DialogClose>
  </DialogContent>
</Dialog>`

  const controlledCode = `<script lang="ts">
  let open = $state(false)
<\/script>

<Button tone="outline" onclick={() => (open = true)}>Open from outside</Button>
<Dialog bind:open>
  <DialogBackdrop />
  <DialogContent>
    <DialogTitle>Controlled</DialogTitle>
    <DialogDescription>Open state lives in the parent.</DialogDescription>
    <div class="flex justify-end"><DialogClose>Close</DialogClose></div>
  </DialogContent>
</Dialog>`

  const sheetCode = `<Dialog presentation="sheet">
  <DialogTrigger>Open sheet</DialogTrigger>
  <DialogBackdrop />
  <DialogContent>
    <DialogTitle>Bottom sheet</DialogTitle>
    <DialogDescription>On a phone this slides up from the bottom and can be swiped away.</DialogDescription>
    <div class="flex justify-end"><DialogClose>Done</DialogClose></div>
  </DialogContent>
</Dialog>`

  let controlled = $state(false)
</script>

<svelte:head>
  <title>Dialog — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Dialog"
  description="A window over the page that asks for the user's attention. Wraps the ui-sdk Dialog, which manages focus trapping, Escape, outside presses, scroll locking and focus return."
  entry="@ui-sdk/svelte/dialog"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/dialog</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the trigger, backdrop and content inside the root. The title names the dialog;
      the description gives it context. A dialog can have several Close parts.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Open it, then close with Done, the X, Escape, or a press outside. Focus returns to the trigger." code={usageCode}>
      <Dialog>
        <DialogTrigger>Share</DialogTrigger>
        <DialogBackdrop />
        <DialogContent>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>Anyone with this link can view this.</DialogDescription>
          <div class="flex justify-end">
            <DialogClose>Done</DialogClose>
          </div>
          <DialogClose tone="ghost" aria-label="Close" class="absolute right-3 top-3 h-7 w-7 p-0">
            <X aria-hidden="true" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Demo>

    <Demo title="Controlled" description="bind:open lets a parent open and close the dialog." code={controlledCode}>
      <Button tone="outline" onclick={() => (controlled = true)}>Open from outside</Button>
      <Dialog bind:open={controlled}>
        <DialogBackdrop />
        <DialogContent>
          <DialogTitle>Controlled</DialogTitle>
          <DialogDescription>Open state lives in the parent.</DialogDescription>
          <div class="flex justify-end"><DialogClose>Close</DialogClose></div>
        </DialogContent>
      </Dialog>
    </Demo>

    <Demo title="Sheet presentation" description="presentation='sheet' slides up from the bottom on small touch screens." code={sheetCode}>
      <Dialog presentation="sheet">
        <DialogTrigger>Open sheet</DialogTrigger>
        <DialogBackdrop />
        <DialogContent>
          <DialogTitle>Bottom sheet</DialogTitle>
          <DialogDescription>On a phone this slides up from the bottom and can be swiped away.</DialogDescription>
          <div class="flex justify-end"><DialogClose>Done</DialogClose></div>
        </DialogContent>
      </Dialog>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="DialogClose tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent — the primary action." },
        { name: "outline", type: "string", description: "Bordered — a secondary action." },
        { name: "ghost", type: "string", description: "Quiet — used for the icon-only close button." },
      ]}
    />
    <PropsTable
      caption="Dialog presentation"
      rows={[
        { name: "dialog", type: "string", description: "A centered window over the page." },
        { name: "sheet", type: "string", description: "Slides up from the bottom; swipe to dismiss." },
        { name: "auto", type: "default", description: "A sheet on small touch screens, a dialog otherwise." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-presentation</code>,
      <code class="font-mono text-accent">data-nested-open</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Dialog (root)"
      rows={[
        { name: "open", type: "boolean", description: "Whether it's open. Bind with bind:open to control." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Starts open when uncontrolled." },
        { name: "modal", type: 'boolean | "trap-focus"', default: "true", description: "true makes the page inert and traps focus; trap-focus traps focus only; false leaves the page usable." },
        { name: "presentation", type: '"auto" | "dialog" | "sheet"', default: '"auto"', description: "How the dialog presents." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape and outside presses can close it." },
        { name: "closeOnOutsidePress", type: "boolean", default: "true", description: "Whether a press outside closes it." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when it wants to open/close. details.cancel() stops it." },
        { name: "controller", type: "DialogController", description: "Open/close from anywhere via createDialogController()." },
      ]}
    />
    <PropsTable
      caption="DialogContent / DialogTitle / DialogDescription"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
        { name: "children", type: "Snippet", description: "Content. Title and description name the dialog for assistive technology." },
      ]}
    />
    <PropsTable
      caption="DialogClose"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"solid"', description: "Visual style." },
        { name: "onclick", type: "(event, details) => unknown", description: "Return a Promise to stay pending until it settles." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Uses <code class="font-mono text-accent">role="dialog"</code> with <code class="font-mono text-accent">aria-modal</code>, named by <code class="font-mono text-accent">DialogTitle</code> and described by <code class="font-mono text-accent">DialogDescription</code> via <code class="font-mono text-accent">aria-labelledby</code>/<code class="font-mono text-accent">aria-describedby</code>.</li>
      <li>Focus moves into the dialog on open and is trapped while modal; <span class="text-fg">Tab</span> cycles within it.</li>
      <li><span class="text-fg">Escape</span> closes it (when dismissible) and focus returns to the trigger.</li>
      <li>A modal dialog makes the rest of the page inert and locks scroll; live regions stay live.</li>
      <li>Give an icon-only Close button an <code class="font-mono text-accent">aria-label</code>.</li>
    </ul>
  </Section>
</div>