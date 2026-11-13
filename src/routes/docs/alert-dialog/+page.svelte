<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
    AlertDialogClose,
    AlertDialogShortcut,
    createConfirm,
  } from "$lib/components/alert-dialog"
  import { Button } from "$lib/components/button"
  import { Trash2 } from "@lucide/svelte"

  const installCode = `import {
  AlertDialog, AlertDialogTrigger, AlertDialogBackdrop, AlertDialogContent,
  AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction,
  AlertDialogClose, AlertDialogShortcut,
} from "$lib/components/alert-dialog"`

  const usageCode = `<script lang="ts">
  import {
    AlertDialog, AlertDialogTrigger, AlertDialogBackdrop, AlertDialogContent,
    AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction,
  } from "$lib/components/alert-dialog"
<\/script>

<AlertDialog>
  <AlertDialogTrigger tone="danger">Delete project</AlertDialogTrigger>
  <AlertDialogBackdrop />
  <AlertDialogContent>
    <div class="flex flex-col gap-1.5">
      <AlertDialogTitle>Delete this project?</AlertDialogTitle>
      <AlertDialogDescription>
        This permanently deletes the project, its files and its deployment history
        for everyone on your team.
      </AlertDialogDescription>
    </div>
    <div class="flex justify-end gap-2">
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction tone="danger">Delete</AlertDialogAction>
    </div>
  </AlertDialogContent>
</AlertDialog>`

  const controlledCode = `<script lang="ts">
  let open = $state(false)
  let answer = $state("no answer yet")
<\/script>

<div class="flex flex-col items-center gap-3">
  <Button tone="outline" onclick={() => (open = true)}>Review changes</Button>
  <p class="text-sm text-muted">Last answer: <span class="text-fg">{answer}</span></p>
</div>

<AlertDialog
  bind:open
  onOpenChange={(next, details) => {
    if (!next) answer = details.returnValue ?? details.reason
  }}
>
  <AlertDialogBackdrop />
  <AlertDialogContent>
    <div class="flex flex-col gap-1.5">
      <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
      <AlertDialogDescription>Your edits are lost if you leave without saving.</AlertDialogDescription>
    </div>
    <div class="flex justify-end gap-2">
      <AlertDialogCancel value="keep">Keep editing</AlertDialogCancel>
      <AlertDialogAction>Discard</AlertDialogAction>
    </div>
  </AlertDialogContent>
</AlertDialog>`

  const asyncCode = `<script lang="ts">
  let attempts = 0

  async function deleteProject() {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    if (attempts++ === 0) throw new Error("Couldn't delete the project.")
  }
<\/script>

<AlertDialog pendingAnnouncement="Deleting project">
  <AlertDialogTrigger tone="danger">Delete project</AlertDialogTrigger>
  <AlertDialogBackdrop />
  <AlertDialogContent>
    <div class="flex flex-col gap-1.5">
      <AlertDialogTitle>Delete project?</AlertDialogTitle>
      <AlertDialogDescription>The first attempt fails so you can try again.</AlertDialogDescription>
    </div>
    <AlertDialogAction tone="danger" action={deleteProject}>
      {#snippet render({ props, state })}
        <div class="flex flex-col gap-3">
          {#if state.error}
            <p role="alert" class="text-sm text-danger">
              {state.error instanceof Error ? state.error.message : "Something went wrong."}
            </p>
          {/if}
          <div class="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <button {...props}>
              {state.pending ? "Deleting…" : state.error ? "Try again" : "Delete"}
            </button>
          </div>
        </div>
      {/snippet}
    </AlertDialogAction>
  </AlertDialogContent>
</AlertDialog>`

  const shortcutCode = `<AlertDialog>
  <AlertDialogTrigger tone="outline" shortcut="mod+shift+h">
    Clear history
    <AlertDialogShortcut />
  </AlertDialogTrigger>
  <AlertDialogBackdrop />
  <AlertDialogContent>
    <div class="flex flex-col gap-1.5">
      <AlertDialogTitle>Clear your history?</AlertDialogTitle>
      <AlertDialogDescription>Recent searches and visited pages are removed from this device.</AlertDialogDescription>
    </div>
    <div class="flex justify-end gap-2">
      <AlertDialogClose tone="outline">Cancel</AlertDialogClose>
      <AlertDialogClose value="confirm">Clear</AlertDialogClose>
    </div>
  </AlertDialogContent>
</AlertDialog>`

  const confirmCode = `<script lang="ts">
  import { createConfirm } from "$lib/components/alert-dialog"

  const confirmDelete = createConfirm<{ name: string }>()
  let projects = $state(["Acme", "Globex", "Initech"])

  async function remove(name: string) {
    if (await confirmDelete({ name })) {
      projects = projects.filter((project) => project !== name)
    }
  }
<\/script>

<ul class="flex w-full max-w-xs flex-col gap-2" aria-label="Projects">
  {#each projects as name (name)}
    <li class="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-sm text-fg">
      {name}
      <Button tone="ghost" size="sm" aria-label="Delete {name}" onclick={() => remove(name)}>
        <Trash2 aria-hidden="true" />
      </Button>
    </li>
  {:else}
    <li class="text-sm text-muted">All projects deleted.</li>
  {/each}
</ul>

<AlertDialog controller={confirmDelete.controller}>
  <AlertDialogBackdrop />
  <AlertDialogContent>
    {#snippet children(state)}
      <div class="flex flex-col gap-1.5">
        <AlertDialogTitle>Delete {(state.payload as { name: string } | undefined)?.name}?</AlertDialogTitle>
        <AlertDialogDescription>The project and its files are deleted for everyone.</AlertDialogDescription>
      </div>
      <div class="flex justify-end gap-2">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction tone="danger">Delete</AlertDialogAction>
      </div>
    {/snippet}
  </AlertDialogContent>
</AlertDialog>`

  let controlled = $state(false)
  let answer = $state("no answer yet")
  let attempts = 0
  let projects = $state(["Acme", "Globex", "Initech"])
  const confirmDelete = createConfirm<{ name: string }>()

  async function deleteProject() {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    if (attempts++ === 0) throw new Error("Couldn't delete the project.")
  }

  async function remove(name: string) {
    if (await confirmDelete({ name })) {
      projects = projects.filter((project) => project !== name)
    }
  }
</script>

<svelte:head>
  <title>Alert Dialog — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Alert Dialog"
  description="A modal question that waits for an answer before an action continues. Wraps the ui-sdk AlertDialog: always modal, never dismissed by an outside press, and focused on the least destructive answer."
  entry="@ui-sdk/svelte/alert-dialog"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/alert-dialog</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the question in <code class="font-mono text-accent">AlertDialogTitle</code>, explain what
      happens in <code class="font-mono text-accent">AlertDialogDescription</code>, and give one Close
      part per answer. <code class="font-mono text-accent">AlertDialogCancel</code> and
      <code class="font-mono text-accent">AlertDialogAction</code> are presets over the same Close
      primitive: Cancel is outlined and comes first, Action is filled and reports
      <code class="font-mono text-accent">value="confirm"</code>.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Enter opens it with focus on Cancel. Tab stays inside, a press outside leaves it open, and Escape closes it and returns focus to the trigger."
      code={usageCode}
    >
      <AlertDialog>
        <AlertDialogTrigger tone="danger">Delete project</AlertDialogTrigger>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <div class="flex flex-col gap-1.5">
            <AlertDialogTitle>Delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the project, its files and its deployment history
              for everyone on your team.
            </AlertDialogDescription>
          </div>
          <div class="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction tone="danger">Delete</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:open keeps the state in the parent. onOpenChange reports details.returnValue — the value of the Close part that answered — or the reason when Escape closed it."
      code={controlledCode}
    >
      <div class="flex flex-col items-center gap-3">
        <Button tone="outline" onclick={() => (controlled = true)}>Review changes</Button>
        <p class="text-sm text-muted">Last answer: <span class="text-fg">{answer}</span></p>
      </div>
      <AlertDialog
        bind:open={controlled}
        onOpenChange={(next, details) => {
          if (!next) answer = details.returnValue ?? details.reason
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <div class="flex flex-col gap-1.5">
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
            <AlertDialogDescription>Your edits are lost if you leave without saving.</AlertDialogDescription>
          </div>
          <div class="flex justify-end gap-2">
            <AlertDialogCancel value="keep">Keep editing</AlertDialogCancel>
            <AlertDialogAction>Discard</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Demo>

    <Demo
      title="Async action"
      description="An action that returns a Promise keeps the dialog open until it settles. The first attempt rejects, so the error shows and the button offers a retry. While pending, Cancel and Escape cannot close it."
      code={asyncCode}
    >
      <AlertDialog pendingAnnouncement="Deleting project">
        <AlertDialogTrigger tone="danger">Delete project</AlertDialogTrigger>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <div class="flex flex-col gap-1.5">
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>The first attempt fails so you can try again.</AlertDialogDescription>
          </div>
          <AlertDialogAction tone="danger" action={deleteProject}>
            {#snippet render({ props, state })}
              <div class="flex flex-col gap-3">
                {#if state.error}
                  <p role="alert" class="text-sm text-danger">
                    {state.error instanceof Error ? state.error.message : "Something went wrong."}
                  </p>
                {/if}
                <div class="flex justify-end gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <button {...props}>
                    {state.pending ? "Deleting…" : state.error ? "Try again" : "Delete"}
                  </button>
                </div>
              </div>
            {/snippet}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </Demo>

    <Demo
      title="Keyboard shortcut"
      description="shortcut presses the trigger from anywhere on the page, and AlertDialogShortcut renders the keys for this platform. Cancel and Action are presets of AlertDialogClose, which is used here directly. Press Cmd+Shift+H (Ctrl+Shift+H elsewhere)."
      code={shortcutCode}
    >
      <AlertDialog>
        <AlertDialogTrigger tone="outline" shortcut="mod+shift+h">
          Clear history
          <AlertDialogShortcut />
        </AlertDialogTrigger>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <div class="flex flex-col gap-1.5">
            <AlertDialogTitle>Clear your history?</AlertDialogTitle>
            <AlertDialogDescription>Recent searches and visited pages are removed from this device.</AlertDialogDescription>
          </div>
          <div class="flex justify-end gap-2">
            <AlertDialogClose tone="outline">Cancel</AlertDialogClose>
            <AlertDialogClose value="confirm">Clear</AlertDialogClose>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </Demo>

    <Demo
      title="One dialog, many rows"
      description="createConfirm asks from an event handler and resolves true only for value='confirm'. The content reads the row from state.payload. Calls queue, so two questions never overlap."
      code={confirmCode}
    >
      <ul class="flex w-full max-w-xs flex-col gap-2" aria-label="Projects">
        {#each projects as name (name)}
          <li class="flex items-center justify-between gap-3 rounded-md border border-line px-3 py-2 text-sm text-fg">
            {name}
            <Button tone="ghost" size="sm" aria-label="Delete {name}" onclick={() => remove(name)}>
              <Trash2 aria-hidden="true" />
            </Button>
          </li>
        {:else}
          <li class="text-sm text-muted">All projects deleted.</li>
        {/each}
      </ul>
      <AlertDialog controller={confirmDelete.controller}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          {#snippet children(state)}
            <div class="flex flex-col gap-1.5">
              <AlertDialogTitle>Delete {(state.payload as { name: string } | undefined)?.name}?</AlertDialogTitle>
              <AlertDialogDescription>The project and its files are deleted for everyone.</AlertDialogDescription>
            </div>
            <div class="flex justify-end gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction tone="danger">Delete</AlertDialogAction>
            </div>
          {/snippet}
        </AlertDialogContent>
      </AlertDialog>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="AlertDialogTrigger tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent — the ordinary way to open a question." },
        { name: "outline", type: "string", description: "Bordered — a quieter trigger." },
        { name: "ghost", type: "string", description: "No border or fill — for triggers inside a row or toolbar." },
        { name: "danger", type: "string", description: "Filled danger — the action behind the question is destructive." },
      ]}
    />
    <PropsTable
      caption="AlertDialogCancel tone"
      rows={[
        { name: "outline", type: "default", description: "Bordered — the safe answer, focused first." },
        { name: "solid", type: "string", description: "Filled accent — when keeping things is the primary action." },
        { name: "ghost", type: "string", description: "Quiet — for a tertiary answer." },
      ]}
    />
    <PropsTable
      caption="AlertDialogAction tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent — agreeing continues the action." },
        { name: "danger", type: "string", description: "Filled danger — agreeing deletes or destroys." },
        { name: "outline", type: "string", description: "Bordered — agreeing is the secondary choice." },
      ]}
    />
    <PropsTable
      caption="AlertDialogClose tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent." },
        { name: "outline", type: "string", description: "Bordered." },
        { name: "ghost", type: "string", description: "Quiet." },
        { name: "danger", type: "string", description: "Filled danger." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-starting-style</code>,
      <code class="font-mono text-accent">data-ending-style</code>,
      <code class="font-mono text-accent">data-nested-open</code>,
      <code class="font-mono text-accent">data-pending</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-keyboard</code>.
      The content already animates from <code class="font-mono text-accent">data-starting-style</code>
      and <code class="font-mono text-accent">data-ending-style</code>, and steps back when a nested
      dialog opens over it.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="AlertDialog (root)"
      rows={[
        { name: "open", type: "boolean", description: "Whether it's open. Bind with bind:open to control it." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Starts open when uncontrolled." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape and the back gesture can close it. Close parts, triggers and the controller always can. An outside press never closes an alert dialog." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when it wants to open or close. details.reason says why, details.cancel() stops it, details.returnValue is the answering Close part's value." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the open or close animation finishes." },
        { name: "onDismissAttempt", type: "(details) => void", description: "Runs when a dismissal was refused — dismissible is false, or an action is still running." },
        { name: "onPayloadChange", type: "(payload, details) => void", description: "Runs before onOpenChange when another payload opens it. details.cancel() keeps the previous payload." },
        { name: "pendingAnnouncement", type: "string", description: "What screen readers hear once an action has run for a second. Set it in the page's language." },
        { name: "persistentElements", type: "(string | Element)[] | (() => Element[])", description: "Elements that stay usable while the page is inert." },
        { name: "controller", type: "AlertDialogController", description: "Open, close and inspect from anywhere. Create with createAlertDialogController() or createConfirm()." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the popup into this element instead of in place." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="AlertDialogTrigger"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost" | "danger"', default: '"solid"', description: "Visual style." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops it from opening the dialog." },
        { name: "focusableWhenDisabled", type: "boolean", default: "false", description: "Keeps a disabled trigger in the tab order with aria-disabled, so a tooltip can say why." },
        { name: "payload", type: "unknown", description: "Data the content renders when this trigger opens it, like the row it belongs to." },
        { name: "shortcut", type: "string", description: 'A keyboard shortcut that presses it, like "mod+shift+h". Sets aria-keyshortcuts.' },
        { name: "controller", type: "AlertDialogController", description: "Connects a trigger outside the root to the same dialog." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="AlertDialogBackdrop"
      rows={[
        { name: "class", type: "string", description: "Extra classes. Defaults to a fixed full-screen dim with a backdrop blur." },
        { name: "children", type: "Snippet<[state]>", description: "Optional content. The state carries open and the animation flags." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Replaces the div with your own element." },
      ]}
    />
    <PropsTable
      caption="AlertDialogContent"
      rows={[
        { name: "initialFocus", type: "DialogInitialFocus", description: "Where focus goes on open. Defaults to the first Close part; a touch open focuses the content so no keyboard appears." },
        { name: "finalFocus", type: "PopupFocusTarget", description: "Where focus goes when it closes while focus is inside." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Keeps it in the page, hidden, while closed." },
        { name: "container", type: "DocumentFragment | Element | null", description: "Renders the popup into this element instead of in place." },
        { name: "children", type: "Snippet<[state]>", description: "The dialog body. state.payload carries the data from the trigger or controller." },
        { name: "class", type: "string", description: "Extra classes merged onto the centered panel." },
      ]}
    />
    <PropsTable
      caption="AlertDialogTitle / AlertDialogDescription"
      rows={[
        { name: "children", type: "Snippet", description: "Title renders an h2 and names the dialog; description renders a p and describes it." },
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
      ]}
    />
    <PropsTable
      caption="AlertDialogCancel / AlertDialogAction / AlertDialogClose"
      rows={[
        { name: "tone", type: "string", description: "Visual style. Cancel defaults to outline, Action and Close to solid. See Variants." },
        { name: "value", type: "string", default: '"confirm" on Action', description: 'Reported as returnValue in onOpenChange and by the controller. createConfirm() resolves true for "confirm".' },
        { name: "action", type: "(event, details) => unknown", description: "Runs before it closes. A returned Promise keeps the dialog open: the part gets data-pending, aria-busy and aria-disabled. A rejection keeps it open and sets state.error." },
        { name: "children", type: "Snippet<[state]>", description: "Button content. state.pending and state.error describe the running action." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Replaces the button with your own markup, spreading props onto it." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
      ]}
    />
    <PropsTable
      caption="AlertDialogShortcut"
      rows={[
        { name: "shortcut", type: "string", description: "The keys to show. Inside a trigger it defaults to the trigger's shortcut." },
        { name: "children", type: "Snippet<[state]>", description: "state.text is the shortcut formatted for this platform: ⌘K on Apple, Ctrl+K elsewhere." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
      ]}
    />
    <PropsTable
      caption="ConfirmOptions (the shared confirm())"
      rows={[
        { name: "title", type: "string", description: 'The question, like "Delete this project?".' },
        { name: "description", type: "string", description: "What agreeing does." },
        { name: "confirmLabel", type: "string", description: "The agreeing button's text." },
        { name: "cancelLabel", type: "string", description: "The other button's text." },
      ]}
    />
    <p class="text-sm text-muted">
      The shared <code class="font-mono text-accent">confirm()</code> needs an
      <code class="font-mono text-accent">OverlayHost</code> from
      <code class="font-mono text-accent">@ui-sdk/svelte/overlays</code> rendered once near the app
      root. <code class="font-mono text-accent">createConfirm&lt;Payload&gt;()</code> instead drives
      your own markup, as in the last demo.
    </p>
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA alert dialog pattern: <code class="font-mono text-accent">role="alertdialog"</code> with <code class="font-mono text-accent">aria-modal</code>, named by <code class="font-mono text-accent">AlertDialogTitle</code> and described by <code class="font-mono text-accent">AlertDialogDescription</code>.</li>
      <li>The rest of the page is inert while it's open, and focus is trapped inside. <span class="text-fg">Tab</span> cycles between the answers.</li>
      <li>Opening with the keyboard focuses the first Close part, so put the least destructive answer first — that is <code class="font-mono text-accent">AlertDialogCancel</code>. A touch open focuses the content instead, so no on-screen keyboard appears.</li>
      <li><span class="text-fg">Escape</span> closes it and returns focus to the trigger. A press outside never closes an alert dialog.</li>
      <li>While an action runs the button stays focusable with <code class="font-mono text-accent">aria-busy</code> and <code class="font-mono text-accent">aria-disabled</code>, and <code class="font-mono text-accent">pendingAnnouncement</code> is announced after a second so a slow action doesn't pass in silence.</li>
      <li>Render an action's error with <code class="font-mono text-accent">role="alert"</code> so it's heard as soon as it appears.</li>
      <li>A trigger's <code class="font-mono text-accent">shortcut</code> sets <code class="font-mono text-accent">aria-keyshortcuts</code>; a modal dialog pauses the page's other shortcuts while it's open.</li>
      <li>When the action removes the button that opened the dialog, move focus somewhere useful with <code class="font-mono text-accent">finalFocus</code> or by focusing a neighbor after the await.</li>
    </ul>
  </Section>
</div>