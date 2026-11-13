<script lang="ts">
  import { onDestroy } from "svelte"
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    ToastRegion,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
    createToaster,
  } from "#lib/components/toast"
  import { Button } from "#lib/components/button"
  import { X, Check, Info, TriangleAlert, CircleAlert, LoaderCircle, Undo2 } from "@lucide/svelte"

  const installCode = `import {
  ToastRegion,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toast,
  createToaster,
} from "#lib/components/toast"`

  const usageCode = `<script lang="ts">
  import { ToastRegion, Toast, ToastTitle, ToastDescription, ToastClose, toast } from "#lib/components/toast"
  import { X } from "@lucide/svelte"
<\/script>

<ToastRegion aria-label="Notifications">
  {#snippet children(t)}
    <Toast>
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastTitle />
        <ToastDescription />
      </div>
      <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
    </Toast>
  {/snippet}
</ToastRegion>

<button type="button" onclick={() => toast("Saved", { description: "Your changes are live." })}>
  Show toast
</button>`

  const typesCode = `<ToastRegion aria-label="Notifications">
  {#snippet children(t)}
    <Toast>
      {#if t.type === "success"}<Check class="size-4 shrink-0 text-success" aria-hidden="true" />
      {:else if t.type === "error"}<CircleAlert class="size-4 shrink-0 text-danger" aria-hidden="true" />
      {:else if t.type === "warning"}<TriangleAlert class="size-4 shrink-0 text-warning" aria-hidden="true" />
      {:else if t.type === "loading"}<LoaderCircle class="size-4 shrink-0 animate-spin text-muted" aria-hidden="true" />
      {:else}<Info class="size-4 shrink-0 text-accent" aria-hidden="true" />{/if}
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastTitle />
        <ToastDescription />
      </div>
      <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
    </Toast>
  {/snippet}
</ToastRegion>

<button type="button" onclick={() => toaster.success("Deployed", { description: "Build 421 is live." })}>Success</button>
<button type="button" onclick={() => toaster.error("Deploy failed", { description: "The build timed out." })}>Error</button>`

  const actionCode = `<ToastRegion aria-label="Notifications">
  {#snippet children(t)}
    <Toast>
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastTitle />
        <ToastDescription />
      </div>
      <ToastAction />
      <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
    </Toast>
  {/snippet}
</ToastRegion>

<button
  type="button"
  onclick={() =>
    toaster("Project deleted", {
      description: "Acme moved to the trash.",
      duration: 8000,
      action: { label: "Undo", onAction: () => toaster.success("Project restored") },
      cancel: { label: "Dismiss" },
    })}
>
  Delete project
</button>`

  const promiseCode = `<button
  type="button"
  onclick={() =>
    toaster.promise(save(), {
      loading: "Saving…",
      success: (value) => \`Saved \${value} files\`,
      error: "Could not save. Try again.",
    })}
>
  Save
</button>`

  const stackCode = `<ToastRegion {toaster} side={side} align={align} expanded={expanded} maxVisible={3} aria-label="Notifications">
  {#snippet children(t)}
    <Toast>
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <ToastTitle />
        <ToastDescription />
      </div>
      <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
    </Toast>
  {/snippet}
</ToastRegion>`

  const updateCode = `<script lang="ts">
  let id = $state<string | null>(null)
<\/script>

<button
  type="button"
  onclick={() => {
    id = toaster.loading("Uploading…", { id: id ?? undefined, description: "0 of 3 files" })
  }}
>
  Start upload
</button>
<button type="button" onclick={() => id && toaster.update(id, { type: "success", title: "Uploaded", description: "3 of 3 files" })}>
  Finish
</button>
<button type="button" onclick={() => toaster.dismiss()}>Dismiss all</button>`

  const basicToaster = createToaster()
  const typesToaster = createToaster()
  const actionToaster = createToaster()
  const promiseToaster = createToaster()
  const stackToaster = createToaster()
  const updateToaster = createToaster()

  let side = $state<"top" | "bottom">("bottom")
  let align = $state<"start" | "center" | "end">("end")
  let expanded = $state(false)
  let uploadId = $state<string | null>(null)
  let deleted = $state(0)

  function save() {
    return new Promise<number>((resolve) => setTimeout(() => resolve(3), 1600))
  }

  function fail() {
    return new Promise<number>((_, reject) => setTimeout(() => reject(new Error("offline")), 1600))
  }

  function addThree() {
    stackToaster.info("First", { description: "Newest sits in front." })
    stackToaster.info("Second", { description: "Hover the stack to expand it." })
    stackToaster.info("Third", { description: "Older ones wait for room." })
  }

  onDestroy(() => {
    basicToaster.dismiss()
    typesToaster.dismiss()
    actionToaster.dismiss()
    promiseToaster.dismiss()
    stackToaster.dismiss()
    updateToaster.dismiss()
  })
</script>

<svelte:head>
  <title>Toast — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Toast"
  description="Brief messages that stack in a corner of the viewport, announce themselves once, and can be swiped, acted on or dismissed. Wraps the ui-sdk Toast region and its toaster queue."
  entry="@ui-sdk/svelte/toast"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/toast</code>. There is no
      <code class="font-mono text-accent">createToastController</code>: the manager is the shared
      <code class="font-mono text-accent">toast</code> function, and
      <code class="font-mono text-accent">createToaster()</code> makes a second queue for a second region.
      Both are re-exported from the barrel.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Place <code class="font-mono text-accent">ToastRegion</code> once, near the root of your app. Its
      <code class="font-mono text-accent">children</code> snippet renders each toast, receiving the
      toast's data and its place in the stack. Without a snippet, each toast renders its title,
      description, action and cancel button for you.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Call <code class="font-mono text-accent">toast(message, options)</code> from anywhere — an event
      handler, a loader, a store. It returns the toast's id.
      <code class="font-mono text-accent">ToastTitle</code> and
      <code class="font-mono text-accent">ToastDescription</code> fall back to the toast's own
      <code class="font-mono text-accent">title</code> and <code class="font-mono text-accent">description</code>,
      and render nothing when there is neither.
    </p>
    <p class="text-sm text-muted">
      The region is portalled to the top layer and positioned by the ui-sdk, so it appears at the
      viewport edge rather than inside the demo frame below. Each demo on this page owns a separate
      <code class="font-mono text-accent">createToaster()</code> queue so they never mix.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="A title, a description and a close button. The toast closes after five seconds." code={usageCode}>
      <div class="w-full max-w-sm space-y-3">
        <Button
          onclick={() => basicToaster("Saved", { description: "Your changes are live." })}
        >
          Show toast
        </Button>
        <ToastRegion toaster={basicToaster} aria-label="Basic notifications">
          {#snippet children(t)}
            <Toast>
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastTitle />
                <ToastDescription />
              </div>
              <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
            </Toast>
          {/snippet}
        </ToastRegion>
      </div>
    </Demo>

    <Demo title="Types" description="success, error, info, warning and loading set data-type, which the wrapper tints the border with. Errors are announced assertively." code={typesCode}>
      <div class="w-full max-w-sm space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" onclick={() => typesToaster.success("Deployed", { description: "Build 421 is live." })}>Success</Button>
          <Button size="sm" tone="danger" onclick={() => typesToaster.error("Deploy failed", { description: "The build timed out." })}>Error</Button>
          <Button size="sm" tone="outline" onclick={() => typesToaster.info("New version", { description: "2.4 is available." })}>Info</Button>
          <Button size="sm" tone="outline" onclick={() => typesToaster.warning("Quota nearly full", { description: "92% of storage used." })}>Warning</Button>
          <Button size="sm" tone="ghost" onclick={() => typesToaster.loading("Working…")}>Loading</Button>
        </div>
        <ToastRegion toaster={typesToaster} aria-label="Typed notifications">
          {#snippet children(t)}
            <Toast>
              {#if t.type === "success"}
                <Check class="size-4 shrink-0 text-success" aria-hidden="true" />
              {:else if t.type === "error"}
                <CircleAlert class="size-4 shrink-0 text-danger" aria-hidden="true" />
              {:else if t.type === "warning"}
                <TriangleAlert class="size-4 shrink-0 text-warning" aria-hidden="true" />
              {:else if t.type === "loading"}
                <LoaderCircle class="size-4 shrink-0 animate-spin text-muted" aria-hidden="true" />
              {:else}
                <Info class="size-4 shrink-0 text-accent" aria-hidden="true" />
              {/if}
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastTitle />
                <ToastDescription />
              </div>
              <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
            </Toast>
          {/snippet}
        </ToastRegion>
      </div>
    </Demo>

    <Demo title="Action and cancel" description="ToastAction renders the toast's action label, or a link when the action has an href. A Promise from its handler keeps the toast open and the button pending." code={actionCode}>
      <div class="w-full max-w-sm space-y-3">
        <Button
          tone="danger"
          onclick={() => {
            deleted++
            actionToaster("Project deleted", {
              description: `Acme moved to the trash (${deleted} so far).`,
              duration: 8000,
              action: {
                label: "Undo",
                onAction: async () => {
                  await new Promise((resolve) => setTimeout(resolve, 1200))
                  deleted--
                  actionToaster.success("Project restored")
                },
              },
              cancel: { label: "Dismiss" },
            })
          }}
        >
          Delete project
        </Button>
        <ToastRegion toaster={actionToaster} aria-label="Action notifications">
          {#snippet children(t)}
            <Toast>
              <Undo2 class="size-4 shrink-0 text-muted" aria-hidden="true" />
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastTitle />
                <ToastDescription />
              </div>
              <ToastAction />
              <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
            </Toast>
          {/snippet}
        </ToastRegion>
      </div>
    </Demo>

    <Demo title="Promise" description="toast.promise shows a loading toast, then turns it into success or error when the Promise settles. A toast dismissed while loading stays closed." code={promiseCode}>
      <div class="w-full max-w-sm space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button
            onclick={() =>
              promiseToaster.promise(save(), {
                loading: "Saving…",
                success: (value) => `Saved ${value} files`,
                error: "Could not save. Try again.",
              })}
          >
            Save
          </Button>
          <Button
            tone="outline"
            onclick={() =>
              promiseToaster.promise(fail(), {
                loading: "Retrying…",
                success: "Saved",
                error: "Still offline. Nothing was saved.",
              })}
          >
            Fail
          </Button>
        </div>
        <ToastRegion toaster={promiseToaster} aria-label="Promise notifications">
          {#snippet children(t)}
            <Toast>
              {#if t.type === "loading"}
                <LoaderCircle class="size-4 shrink-0 animate-spin text-muted" aria-hidden="true" />
              {:else if t.type === "error"}
                <CircleAlert class="size-4 shrink-0 text-danger" aria-hidden="true" />
              {:else}
                <Check class="size-4 shrink-0 text-success" aria-hidden="true" />
              {/if}
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastTitle />
                <ToastDescription />
              </div>
              <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
            </Toast>
          {/snippet}
        </ToastRegion>
      </div>
    </Demo>

    <Demo title="Stacking and position" description="side and align move the region; maxVisible caps the stack; expanded keeps it open. Hover or focus expands it otherwise." code={stackCode}>
      <div class="w-full max-w-sm space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => (side = side === "bottom" ? "top" : "bottom")}>
            Side: {side}
          </Button>
          <Button size="sm" tone="outline" onclick={() => (align = align === "end" ? "start" : align === "start" ? "center" : "end")}>
            Align: {align}
          </Button>
          <Button size="sm" tone="outline" onclick={() => (expanded = !expanded)}>
            Expanded: {expanded}
          </Button>
          <Button size="sm" onclick={addThree}>Add three</Button>
        </div>
        <ToastRegion
          toaster={stackToaster}
          {side}
          {align}
          {expanded}
          maxVisible={3}
          aria-label="Stacked notifications"
        >
          {#snippet children(t)}
            <Toast>
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastTitle />
                <ToastDescription />
              </div>
              <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
            </Toast>
          {/snippet}
        </ToastRegion>
      </div>
    </Demo>

    <Demo title="Update and dismiss" description="Reusing an id updates the toast in place and restarts its timer. update returns whether it was still there; dismiss closes one or all." code={updateCode}>
      <div class="w-full max-w-sm space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button
            size="sm"
            onclick={() => {
              uploadId = updateToaster.loading("Uploading…", {
                id: uploadId ?? undefined,
                description: "0 of 3 files",
              })
            }}
          >
            Start upload
          </Button>
          <Button
            size="sm"
            tone="outline"
            onclick={() =>
              uploadId &&
              updateToaster.update(uploadId, {
                type: "success",
                title: "Uploaded",
                description: "3 of 3 files",
              })}
          >
            Finish
          </Button>
          <Button size="sm" tone="ghost" onclick={() => updateToaster.dismiss()}>Dismiss all</Button>
        </div>
        <ToastRegion toaster={updateToaster} aria-label="Upload notifications">
          {#snippet children(t)}
            <Toast>
              {#if t.type === "loading"}
                <LoaderCircle class="size-4 shrink-0 animate-spin text-muted" aria-hidden="true" />
              {:else}
                <Check class="size-4 shrink-0 text-success" aria-hidden="true" />
              {/if}
              <div class="flex min-w-0 flex-1 flex-col gap-0.5">
                <ToastTitle />
                <ToastDescription />
              </div>
              <ToastClose aria-label="Dismiss notification"><X /></ToastClose>
            </Toast>
          {/snippet}
        </ToastRegion>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="ToastRegion side"
      rows={[
        { name: "bottom", type: "default", description: "Sits on the bottom edge. Toasts swipe down to dismiss." },
        { name: "top", type: "string", description: "Sits on the top edge. Toasts swipe up to dismiss, and the stack grows downward." },
      ]}
    />
    <PropsTable
      caption="ToastRegion align"
      rows={[
        { name: "end", type: "default", description: "The trailing edge, following the writing direction. Swiping toward it dismisses too." },
        { name: "start", type: "string", description: "The leading edge, following the writing direction." },
        { name: "center", type: "string", description: "Centred on the edge. The wrapper drops the inline margin so the centring translate stays true." },
      ]}
    />
    <PropsTable
      caption="toast type"
      rows={[
        { name: "default", type: "default", description: "A neutral message, announced politely." },
        { name: "success", type: "string", description: "Something worked. The wrapper tints the border with the success token." },
        { name: "error", type: "string", description: "Something failed. Announced assertively, and tinted with the danger token." },
        { name: "info", type: "string", description: "News the user may want. Tinted with the accent token." },
        { name: "warning", type: "string", description: "Something needs attention. Tinted with the warning token." },
        { name: "loading", type: "string", description: "Work in progress. Its duration is Infinity, so it stays until updated or dismissed." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling:
      <code class="font-mono text-accent">data-side</code>,
      <code class="font-mono text-accent">data-align</code>,
      <code class="font-mono text-accent">data-expanded</code> and
      <code class="font-mono text-accent">data-keyboard</code> on the region;
      <code class="font-mono text-accent">data-type</code>,
      <code class="font-mono text-accent">data-front</code>,
      <code class="font-mono text-accent">data-expanded</code>,
      <code class="font-mono text-accent">data-starting-style</code>,
      <code class="font-mono text-accent">data-ending-style</code>,
      <code class="font-mono text-accent">data-swiping</code> and
      <code class="font-mono text-accent">data-swipe-direction</code> on each toast;
      <code class="font-mono text-accent">data-pending</code> on the action and close buttons.
    </p>
    <p class="text-sm text-muted">
      The stack geometry comes from CSS variables the ui-sdk measures and writes:
      <code class="font-mono text-accent">--toast-front-height</code>,
      <code class="font-mono text-accent">--toast-stack-height</code> and
      <code class="font-mono text-accent">--toast-count</code> on the region, and
      <code class="font-mono text-accent">--toast-index</code>,
      <code class="font-mono text-accent">--toast-offset</code>,
      <code class="font-mono text-accent">--toast-height</code>,
      <code class="font-mono text-accent">--toast-swipe-x</code> and
      <code class="font-mono text-accent">--toast-swipe-y</code> on each toast. The wrappers turn those
      into the collapsed peek, the expanded fan, the scale falloff and the swipe translate, so a toast
      animates correctly whatever height its content measures.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="toast / createToaster()"
      rows={[
        { name: "toast(message, options?)", type: "(Content | ToastOptions, ToastOptions?) => string", description: "Shows a toast on the shared queue and returns its id. Content is a string or a Svelte snippet." },
        { name: ".success / .error / .info / .warning / .loading", type: "(message, options?) => string", description: "Show a toast of that type. error is announced assertively; loading stays until updated or dismissed." },
        { name: ".promise(promise, messages, options?)", type: "(Promise | () => Promise, { loading, success?, error? }) => string", description: "Shows a loading toast, then success or error when it settles. success and error may be a function of the settled value. Without them the toast closes." },
        { name: ".update(id, options)", type: "(string, Content | ToastOptions) => boolean", description: "Updates a showing toast in place, announces it again and restarts its timer. Returns false once it has closed." },
        { name: ".dismiss(id?)", type: "(string?) => void", description: "Closes one toast by id, or every toast without one." },
        { name: ".toasts() / .subscribe(listener)", type: "() => readonly Toast[] / (listener) => () => void", description: "Read the queue newest first, or hear about every add, update and close." },
        { name: "createToaster(options?)", type: "({ duration?, overlays? }) => Toaster", description: "A second queue with its own toasts, for a second region. duration defaults to 5000ms. Pass it to that region as toaster." },
      ]}
    />
    <PropsTable
      caption="ToastOptions"
      rows={[
        { name: "id", type: "string", description: "Reuses a toast: one with this id that is still showing is updated instead of added again." },
        { name: "title", type: "string | Snippet", description: "The main message." },
        { name: "description", type: "string | Snippet", description: "More detail, under the title." },
        { name: "type", type: "ToastType", default: '"default"', description: "What it is about, for data-type styling and for how it is announced." },
        { name: "duration", type: "number", default: "5000", description: "How long it shows in ms while nothing pauses it. Infinity keeps it until dismissed. loading defaults to Infinity." },
        { name: "priority", type: '"polite" | "assertive"', default: '"assertive" for errors', description: "How screen readers announce it." },
        { name: "action", type: "{ label, onAction?, href?, dismiss? }", description: "A button that does something, like Undo. href makes it a link. A returned Promise marks it pending, then dismisses on resolve; a rejection keeps the toast." },
        { name: "cancel", type: "{ label, onCancel? }", description: "A button that dismisses it, like Cancel." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether swiping, Escape and Close parts dismiss it. Timers and dismiss() still close it." },
        { name: "data", type: "unknown", description: "Anything else, for your own rendering, like an avatar." },
        { name: "onDismiss", type: "(details) => void", description: "Runs when it closes, with the reason. details.cancel() keeps it, like a swipe that snaps back." },
      ]}
    />
    <PropsTable
      caption="ToastRegion"
      rows={[
        { name: "toaster", type: "Toaster", default: "the shared toast", description: "The queue it shows. A second toaster gives a second region its own toasts." },
        { name: "side", type: '"top" | "bottom"', default: '"bottom"', description: "The viewport edge it sits on. Swiping toward it dismisses a toast." },
        { name: "align", type: '"start" | "center" | "end"', default: '"end"', description: "Where along that edge. start and end follow the writing direction." },
        { name: "maxVisible", type: "number", default: "3", description: "How many toasts show at once. Older ones wait, with their timers stopped, until there is room." },
        { name: "expanded", type: "boolean", default: "false", description: "Keep the stack always expanded. Otherwise it expands while the pointer or focus is in it." },
        { name: "shortcut", type: "string | null", default: '"F6"', description: "The key that moves focus into the region and back. null turns it off." },
        { name: "pendingAnnouncement", type: "string", default: '"Loading"', description: "What screen readers hear once an action or close button has been pending for a second. Set it in the page's language." },
        { name: "aria-label", type: "string", default: '"Notifications"', description: "Names the landmark while it has toasts." },
        { name: "container", type: "PopupContainer", description: "Where the region renders. Without top layer support, the body." },
        { name: "children", type: "Snippet<[ToastData, ToastItem]>", description: "Renders each toast. Without it, each toast renders its title, description, action and cancel button." },
      ]}
    />
    <PropsTable
      caption="Toast"
      rows={[
        { name: "children", type: "Snippet<[ToastState]>", description: "The toast's content. state carries type, index, front, expanded and leaving." },
        { name: "class", type: "string", description: "Merged with the wrapper classes, which own the stack positioning, scale, swipe translate and enter/exit transitions." },
      ]}
    />
    <PropsTable
      caption="ToastTitle and ToastDescription"
      rows={[
        { name: "children", type: "Snippet", description: "Replaces the toast's own title or description. With neither children nor data, the part renders nothing." },
      ]}
    />
    <PropsTable
      caption="ToastAction"
      rows={[
        { name: "onAction", type: "(event, details) => unknown", description: "Runs instead of the toast's own action.onAction. A returned Promise marks it pending. details.source says how it was pressed." },
        { name: "dismiss", type: "boolean", default: "the action's dismiss, else true", description: "Whether pressing it dismisses the toast." },
        { name: "children", type: "Snippet", description: "Replaces the action's label. Renders only when the toast has an action or this part has onAction." },
      ]}
    />
    <PropsTable
      caption="ToastClose"
      rows={[
        { name: "action", type: "(event, details) => unknown", description: "Runs before the toast closes. A returned Promise keeps it open and the button pending until it settles." },
        { name: "aria-label", type: "string", description: "Names an icon-only close button, like Dismiss notification." },
      ]}
    />
    <PropsTable
      caption="State"
      rows={[
        { name: "ToastRegionState", type: "{ side, align, expanded, toasts }", description: "toasts is newest first, including ones animating out." },
        { name: "ToastState", type: "{ type, index, front, expanded, leaving }", description: "index is 0 for the newest. A closing toast keeps front while it animates out." },
        { name: "ToastButtonState", type: "{ pending, error? }", description: "Whether a handler's Promise is running, and why it failed until pressed again." },
        { name: "ToastItem", type: "{ toast, index, leaving }", description: "The second snippet argument: the toast's data and its place in the stack." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Toasts are announced through shared live regions, once each, without making the visible region live: politely by default and assertively for errors. Nothing is read twice.</li>
      <li>While it has toasts, the region is a landmark named <span class="text-fg">Notifications</span>. Set <code class="font-mono text-accent">aria-label</code> to name it in the page's language. There is no empty landmark.</li>
      <li><span class="text-fg">F6</span>, or the region's <code class="font-mono text-accent">shortcut</code>, moves focus to the newest toast and pressing it again returns focus to where it came from. It works from a text field and types nothing. With no toasts it does nothing, so the browser keeps the key.</li>
      <li><span class="text-fg">Tab</span> moves through the toasts and their buttons; Tab past the last one goes back too. <span class="text-fg">Escape</span> dismisses the focused toast, and focus moves to the next one, or back where it came from after the last.</li>
      <li>The region stays reachable while a modal dialog is open, sits above it, and Escape on a toast closes the toast rather than the dialog beneath.</li>
      <li>Timers pause while the pointer or focus is in the region, while the page is hidden, and while the window loses focus. Pause reasons hold separately, so getting the window back does not resume while focus is still inside.</li>
      <li>Swiping toward the region's side, or toward the edge it is aligned to, dismisses; a short swipe snaps back and swiping away never dismisses. Dragging across a toast's text with a mouse selects it instead.</li>
      <li>A toast with <code class="font-mono text-accent">dismissible: false</code> ignores Escape, swiping and Close parts. Timers and <code class="font-mono text-accent">dismiss()</code> still close it.</li>
      <li>Keep messages short. Use <code class="font-mono text-accent">duration: Infinity</code> for one that has to stay available, and give it an action or a close button so it can be reached and dismissed.</li>
      <li>Name icon-only close buttons with <code class="font-mono text-accent">aria-label</code>, and mark decorative icons <code class="font-mono text-accent">aria-hidden="true"</code>. A pending action is announced after a second via <code class="font-mono text-accent">pendingAnnouncement</code>.</li>
      <li>Under <code class="font-mono text-accent">prefers-reduced-motion</code> the wrappers transition opacity only, so toasts fade rather than slide and scale.</li>
    </ul>
  </Section>
</div>