<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Resizable,
    ResizablePanel,
    ResizableHandle,
    createResizableController,
  } from "$lib/components/resizable"
  import { Button } from "$lib/components/button"
  import { Folder, Search, Settings } from "@lucide/svelte"

  const installCode = `import { Resizable, ResizablePanel, ResizableHandle } from "$lib/components/resizable"`

  const usageCode = `<script lang="ts">
  import { Resizable, ResizablePanel, ResizableHandle } from "$lib/components/resizable"
<\/script>

<Resizable>
  <ResizablePanel defaultSize={35} minSize={20}>
    <h3 class="text-sm font-medium text-fg">Files</h3>
    <ul class="mt-1 space-y-1 text-sm text-muted">
      <li>page.svelte</li>
      <li>layout.svelte</li>
      <li>app.css</li>
    </ul>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize files" />
  <ResizablePanel defaultSize={65} minSize={40}>
    <Resizable orientation="vertical">
      <ResizablePanel defaultSize={60} minSize={30}>
        <h3 class="text-sm font-medium text-fg">page.svelte</h3>
        <span class="text-xs text-muted">Saved just now</span>
      </ResizablePanel>
      <ResizableHandle aria-label="Resize editor" />
      <ResizablePanel defaultSize={40} minSize={30}>
        <h3 class="text-sm font-medium text-fg">Terminal</h3>
        <span class="text-xs text-muted">Ready on port 5173</span>
      </ResizablePanel>
    </Resizable>
  </ResizablePanel>
</Resizable>`

  const verticalCode = `<Resizable orientation="vertical">
  <ResizablePanel defaultSize={45} minSize={25}>
    <h3 class="text-sm font-medium text-fg">Inbox</h3>
    <span class="text-xs text-muted">3 unread messages</span>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize inbox">
    <div></div>
  </ResizableHandle>
  <ResizablePanel defaultSize={55} minSize={25}>
    <h3 class="text-sm font-medium text-fg">Quarterly report</h3>
    <span class="text-xs text-muted">From Hollis Grant</span>
  </ResizablePanel>
</Resizable>`

  const collapsibleCode = `<script lang="ts">
  import { Folder, Search, Settings } from "@lucide/svelte"
  import { Resizable, ResizablePanel, ResizableHandle } from "$lib/components/resizable"
<\/script>

<Resizable>
  <ResizablePanel
    class="group/panel gap-2 p-3"
    defaultSize={30}
    minSize={25}
    collapsible
    collapsedSize="48px"
  >
    <ul class="space-y-1">
      <li class="flex h-9 items-center gap-2 text-sm text-fg [&>svg]:size-4 [&>svg]:shrink-0">
        <Folder aria-hidden="true" />
        <span class="truncate group-data-[collapsed]/panel:hidden">Files</span>
      </li>
      <li class="flex h-9 items-center gap-2 text-sm text-fg [&>svg]:size-4 [&>svg]:shrink-0">
        <Search aria-hidden="true" />
        <span class="truncate group-data-[collapsed]/panel:hidden">Search</span>
      </li>
      <li class="flex h-9 items-center gap-2 text-sm text-fg [&>svg]:size-4 [&>svg]:shrink-0">
        <Settings aria-hidden="true" />
        <span class="truncate group-data-[collapsed]/panel:hidden">Settings</span>
      </li>
    </ul>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize sidebar">
    <div></div>
  </ResizableHandle>
  <ResizablePanel minSize={40}>
    <h3 class="text-sm font-medium text-fg">README.md</h3>
    <span class="text-xs text-muted">Edited by Ines Moreau</span>
  </ResizablePanel>
</Resizable>`

  const pixelsCode = `<Resizable>
  <ResizablePanel defaultSize="200px" minSize="160px" maxSize="320px">
    <h3 class="text-sm font-medium text-fg">Docs</h3>
    <ul class="mt-1 space-y-1 text-sm text-muted">
      <li>Getting Started</li>
      <li>Components</li>
      <li>Guides</li>
    </ul>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize navigation">
    <div></div>
  </ResizableHandle>
  <ResizablePanel minSize={30}>
    <h3 class="text-sm font-medium text-fg">Getting Started</h3>
    <span class="text-xs text-muted">Install the packages</span>
  </ResizablePanel>
</Resizable>`

  const controlledCode = `<script lang="ts">
  import { Resizable, ResizablePanel, ResizableHandle } from "$lib/components/resizable"
  import { Button } from "$lib/components/button"

  let layout = $state([30, 70])
  let reason = $state("idle")
  const format = (sizes: number[]) => sizes.map(Math.round).join(" / ")
<\/script>

<div class="flex flex-wrap items-center gap-2">
  <Button size="sm" tone="outline" onclick={() => (layout = [50, 50])}>Split evenly</Button>
  <Button size="sm" tone="outline" onclick={() => (layout = [30, 70])}>Reset</Button>
  <span class="font-mono text-xs text-muted">{format(layout)} — {reason}</span>
</div>
<Resizable
  bind:layout
  onLayoutChange={(next, details) => (reason = details.reason)}
>
  <ResizablePanel minSize={20}>
    <h3 class="text-sm font-medium text-fg">Files</h3>
    <span class="text-xs text-muted">3 items</span>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize files" />
  <ResizablePanel minSize={20}>
    <h3 class="text-sm font-medium text-fg">page.svelte</h3>
    <span class="text-xs text-muted">Saved just now</span>
  </ResizablePanel>
</Resizable>`

  const controllerCode = `<script lang="ts">
  import {
    Resizable,
    ResizablePanel,
    ResizableHandle,
    createResizableController,
  } from "$lib/components/resizable"
  import { Button } from "$lib/components/button"

  const editor = createResizableController()
  let readout = $state("Press Read to inspect the layout")

  function read() {
    const sizes = editor.getLayout().map(Math.round).join(" / ")
    readout = editor.isCollapsed("sidebar") ? sizes + " (collapsed)" : sizes
  }
<\/script>

<div class="flex flex-wrap items-center gap-2">
  <Button size="sm" tone="outline" onclick={() => editor.collapse("sidebar")}>Collapse</Button>
  <Button size="sm" tone="outline" onclick={() => editor.expand("sidebar")}>Expand</Button>
  <Button size="sm" tone="outline" onclick={() => editor.resize("sidebar", "240px")}>240px</Button>
  <Button size="sm" tone="ghost" onclick={read}>Read</Button>
</div>
<p class="font-mono text-xs text-muted">{readout}</p>
<Resizable controller={editor}>
  <ResizablePanel id="sidebar" defaultSize={30} minSize={20} collapsible>
    <h3 class="text-sm font-medium text-fg">Files</h3>
    <span class="text-xs text-muted">3 items</span>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize files" />
  <ResizablePanel minSize={30}>
    <h3 class="text-sm font-medium text-fg">page.svelte</h3>
    <span class="text-xs text-muted">Saved just now</span>
  </ResizablePanel>
</Resizable>`

  const persistenceCode = `<Resizable autoSaveId="docs-outline">
  <ResizablePanel id="outline" defaultSize={30} minSize={20}>
    <h3 class="text-sm font-medium text-fg">Outline</h3>
    <ul class="mt-1 space-y-1 text-sm text-muted">
      <li>Introduction</li>
      <li>Installation</li>
      <li>Usage</li>
    </ul>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize outline">
    <div></div>
  </ResizableHandle>
  <ResizablePanel id="content" minSize={30}>
    <h3 class="text-sm font-medium text-fg">Introduction</h3>
    <span class="text-xs text-muted">Reload the page: the split is restored</span>
  </ResizablePanel>
</Resizable>`

  const disabledCode = `<script lang="ts">
  import { Resizable, ResizablePanel, ResizableHandle } from "$lib/components/resizable"
  import { Button } from "$lib/components/button"

  let locked = $state(false)
<\/script>

<Button size="sm" tone="outline" aria-pressed={locked} onclick={() => (locked = !locked)}>
  {locked ? "Unlock layout" : "Lock layout"}
</Button>
<Resizable disabled={locked}>
  <ResizablePanel minSize={15}>
    <h3 class="text-sm font-medium text-fg">Pinned</h3>
    <span class="text-xs text-muted">2 notes</span>
  </ResizablePanel>
  <ResizableHandle disabled aria-label="Resize pinned" />
  <ResizablePanel minSize={15}>
    <h3 class="text-sm font-medium text-fg">Inbox</h3>
    <span class="text-xs text-muted">3 unread</span>
  </ResizablePanel>
  <ResizableHandle aria-label="Resize inbox" />
  <ResizablePanel minSize={15}>
    <h3 class="text-sm font-medium text-fg">Message</h3>
    <span class="text-xs text-muted">From Kofi Mensah</span>
  </ResizablePanel>
</Resizable>`

  let layout = $state([30, 70])
  let reason = $state("idle")
  const format = (sizes: number[]) => sizes.map(Math.round).join(" / ")

  const editor = createResizableController()
  let readout = $state("Press Read to inspect the layout")

  function read() {
    const sizes = editor.getLayout().map(Math.round).join(" / ")
    readout = editor.isCollapsed("sidebar") ? `${sizes} (collapsed)` : sizes
  }

  let locked = $state(false)
</script>

<svelte:head>
  <title>Resizable — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Resizable"
  description="Panel layouts you can drag, key or collapse to resize. Wraps the ui-sdk Resizable with the WAI-ARIA window splitter pattern, percentage or pixel bounds, collapsible panels and saved layouts."
  entry="@ui-sdk/svelte/resizable"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/resizable</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put a <code class="font-mono text-accent">ResizableHandle</code> between every pair of panels you
      want to resize, and name it with <code class="font-mono text-accent">aria-label</code>. The group
      lays its panels out in a row, so it needs a size — the wrapper gives it one. Each panel's size is
      a percentage of the space the panels share, and a group can sit inside a panel.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Drag the handle beside Files, then the one between page.svelte and Terminal. A vertical group nests inside a panel."
      code={usageCode}
    >
      <div class="w-full max-w-md">
        <Resizable>
          <ResizablePanel defaultSize={35} minSize={20}>
            <h3 class="text-sm font-medium text-fg">Files</h3>
            <ul class="mt-1 space-y-1 text-sm text-muted">
              <li>page.svelte</li>
              <li>layout.svelte</li>
              <li>app.css</li>
            </ul>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize files" />
          <ResizablePanel defaultSize={65} minSize={40}>
            <Resizable orientation="vertical">
              <ResizablePanel defaultSize={60} minSize={30}>
                <h3 class="text-sm font-medium text-fg">page.svelte</h3>
                <span class="text-xs text-muted">Saved just now</span>
              </ResizablePanel>
              <ResizableHandle aria-label="Resize editor" />
              <ResizablePanel defaultSize={40} minSize={30}>
                <h3 class="text-sm font-medium text-fg">Terminal</h3>
                <span class="text-xs text-muted">Ready on port 5173</span>
              </ResizablePanel>
            </Resizable>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>

    <Demo
      title="Vertical"
      description="orientation='vertical' stacks the panels; the handle runs across them and Up/Down move it."
      code={verticalCode}
    >
      <div class="w-full max-w-md">
        <Resizable orientation="vertical">
          <ResizablePanel defaultSize={45} minSize={25}>
            <h3 class="text-sm font-medium text-fg">Inbox</h3>
            <span class="text-xs text-muted">3 unread messages</span>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize inbox">
            <div></div>
          </ResizableHandle>
          <ResizablePanel defaultSize={55} minSize={25}>
            <h3 class="text-sm font-medium text-fg">Quarterly report</h3>
            <span class="text-xs text-muted">From Hollis Grant</span>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>

    <Demo
      title="Collapsible rail"
      description="Drag the sidebar past the midpoint, double-click its handle, or focus it and press Enter. It collapses to a 48px icon rail."
      code={collapsibleCode}
    >
      <div class="w-full max-w-md">
        <Resizable>
          <ResizablePanel
            class="group/panel gap-2 p-3"
            defaultSize={30}
            minSize={25}
            collapsible
            collapsedSize="48px"
          >
            <ul class="space-y-1">
              <li class="flex h-9 items-center gap-2 text-sm text-fg [&>svg]:size-4 [&>svg]:shrink-0">
                <Folder aria-hidden="true" />
                <span class="truncate group-data-[collapsed]/panel:hidden">Files</span>
              </li>
              <li class="flex h-9 items-center gap-2 text-sm text-fg [&>svg]:size-4 [&>svg]:shrink-0">
                <Search aria-hidden="true" />
                <span class="truncate group-data-[collapsed]/panel:hidden">Search</span>
              </li>
              <li class="flex h-9 items-center gap-2 text-sm text-fg [&>svg]:size-4 [&>svg]:shrink-0">
                <Settings aria-hidden="true" />
                <span class="truncate group-data-[collapsed]/panel:hidden">Settings</span>
              </li>
            </ul>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize sidebar">
            <div></div>
          </ResizableHandle>
          <ResizablePanel minSize={40}>
            <h3 class="text-sm font-medium text-fg">README.md</h3>
            <span class="text-xs text-muted">Edited by Ines Moreau</span>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>

    <Demo
      title="Sizes in pixels"
      description="Pixel and rem bounds hold as the group resizes: Docs never gets narrower than 160px or wider than 320px."
      code={pixelsCode}
    >
      <div class="w-full max-w-md">
        <Resizable>
          <ResizablePanel defaultSize="200px" minSize="160px" maxSize="320px">
            <h3 class="text-sm font-medium text-fg">Docs</h3>
            <ul class="mt-1 space-y-1 text-sm text-muted">
              <li>Getting Started</li>
              <li>Components</li>
              <li>Guides</li>
            </ul>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize navigation">
            <div></div>
          </ResizableHandle>
          <ResizablePanel minSize={30}>
            <h3 class="text-sm font-medium text-fg">Getting Started</h3>
            <span class="text-xs text-muted">Install the packages</span>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:layout owns the split. The readout shows the live percentages and the reason for the last change."
      code={controlledCode}
    >
      <div class="w-full max-w-md space-y-3">
        <div class="flex flex-wrap items-center gap-2">
          <Button size="sm" tone="outline" onclick={() => (layout = [50, 50])}>Split evenly</Button>
          <Button size="sm" tone="outline" onclick={() => (layout = [30, 70])}>Reset</Button>
          <span class="font-mono text-xs text-muted">{format(layout)} — {reason}</span>
        </div>
        <Resizable
          bind:layout
          onLayoutChange={(next, details) => (reason = details.reason)}
        >
          <ResizablePanel minSize={20}>
            <h3 class="text-sm font-medium text-fg">Files</h3>
            <span class="text-xs text-muted">3 items</span>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize files" />
          <ResizablePanel minSize={20}>
            <h3 class="text-sm font-medium text-fg">page.svelte</h3>
            <span class="text-xs text-muted">Saved just now</span>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>

    <Demo
      title="Controller"
      description="createResizableController() resizes the group from anywhere: collapse, expand, or set one panel to an exact size."
      code={controllerCode}
    >
      <div class="w-full max-w-md space-y-3">
        <div class="flex flex-wrap items-center gap-2">
          <Button size="sm" tone="outline" onclick={() => editor.collapse("sidebar")}>Collapse</Button>
          <Button size="sm" tone="outline" onclick={() => editor.expand("sidebar")}>Expand</Button>
          <Button size="sm" tone="outline" onclick={() => editor.resize("sidebar", "240px")}>240px</Button>
          <Button size="sm" tone="ghost" onclick={read}>Read</Button>
        </div>
        <p class="font-mono text-xs text-muted">{readout}</p>
        <Resizable controller={editor}>
          <ResizablePanel id="sidebar" defaultSize={30} minSize={20} collapsible>
            <h3 class="text-sm font-medium text-fg">Files</h3>
            <span class="text-xs text-muted">3 items</span>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize files" />
          <ResizablePanel minSize={30}>
            <h3 class="text-sm font-medium text-fg">page.svelte</h3>
            <span class="text-xs text-muted">Saved just now</span>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>

    <Demo
      title="Saved layout"
      description="autoSaveId writes the layout when an interaction completes and restores it on the next visit. Give panels an id so the saved sizes survive changes elsewhere on the page."
      code={persistenceCode}
    >
      <div class="w-full max-w-md">
        <Resizable autoSaveId="negentropy-docs-outline">
          <ResizablePanel id="outline" defaultSize={30} minSize={20}>
            <h3 class="text-sm font-medium text-fg">Outline</h3>
            <ul class="mt-1 space-y-1 text-sm text-muted">
              <li>Introduction</li>
              <li>Installation</li>
              <li>Usage</li>
            </ul>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize outline">
            <div></div>
          </ResizableHandle>
          <ResizablePanel id="content" minSize={30}>
            <h3 class="text-sm font-medium text-fg">Introduction</h3>
            <span class="text-xs text-muted">Reload the page: the split is restored</span>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>

    <Demo
      title="Disabled"
      description="disabled on the group stops every handle and takes them out of the tab order; disabled on one handle stops only that separator, so the panels past it keep their sizes."
      code={disabledCode}
    >
      <div class="w-full max-w-md space-y-3">
        <Button size="sm" tone="outline" aria-pressed={locked} onclick={() => (locked = !locked)}>
          {locked ? "Unlock layout" : "Lock layout"}
        </Button>
        <Resizable disabled={locked}>
          <ResizablePanel minSize={15}>
            <h3 class="text-sm font-medium text-fg">Pinned</h3>
            <span class="text-xs text-muted">2 notes</span>
          </ResizablePanel>
          <ResizableHandle disabled aria-label="Resize pinned" />
          <ResizablePanel minSize={15}>
            <h3 class="text-sm font-medium text-fg">Inbox</h3>
            <span class="text-xs text-muted">3 unread</span>
          </ResizablePanel>
          <ResizableHandle aria-label="Resize inbox" />
          <ResizablePanel minSize={15}>
            <h3 class="text-sm font-medium text-fg">Message</h3>
            <span class="text-xs text-muted">From Kofi Mensah</span>
          </ResizablePanel>
        </Resizable>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Resizable has no visual variants — its shapes come from orientation, sizing and state. The
      wrapper paints the group as a bordered surface, the panels as padded columns, and the handle as
      a hairline that darkens on hover, drag and focus. Put a <code class="font-mono text-accent">&lt;div /&gt;</code>
      inside a handle to show the grip.
    </p>
    <PropsTable
      caption="Orientation"
      rows={[
        { name: "horizontal", type: "default", description: "Panels sit side by side. The handle is a 1px vertical line with a col-resize cursor; Left/Right move it." },
        { name: "vertical", type: '"vertical"', description: "Panels stack. The handle is a 1px horizontal line with a row-resize cursor; Up/Down move it." },
      ]}
    />
    <PropsTable
      caption="Size values (ResizableSize)"
      rows={[
        { name: "30", type: "number", description: "A percentage of the space the panels share." },
        { name: '"30%"', type: "string", description: "The same percentage, written with a unit." },
        { name: '"240px"', type: "string", description: "An absolute width or height. Holds as the group resizes and reports the resize reason." },
        { name: '"15rem"', type: "string", description: "An absolute size in rem, resolved against the root font size." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-orientation", type: "horizontal | vertical", description: "The group's direction, present on the root, every panel and every handle. A handle's own aria-orientation is the other axis." },
        { name: "data-disabled", type: "root, handle", description: "The group or this handle is disabled." },
        { name: "data-dragging", type: "root, handle", description: "On the root while any handle is dragged; on the handle being dragged." },
        { name: "data-hovering", type: "handle", description: "The pointer is over the handle or inside its hit area, which reaches past the line itself." },
        { name: "data-collapsed", type: "panel", description: "A collapsible panel is down at its collapsedSize." },
        { name: "--resizable-panel-size", type: "panel", description: "The panel's share as a percentage, written on every frame of a drag without a render." },
      ]}
    />
    <p class="text-sm text-muted">
      A collapsed panel at size 0 also gets <code class="font-mono text-accent">inert</code>, so its
      content leaves the tab order and the accessibility tree. Use a non-zero
      <code class="font-mono text-accent">collapsedSize</code> for an icon rail that stays readable.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Resizable (root)"
      rows={[
        { name: "layout", type: "number[]", description: "Each panel's size in percent, in panel order, like [25, 75]. Bind with bind:layout to control the group." },
        { name: "defaultLayout", type: "number[]", description: "The layout at first, when uncontrolled. Panels' own defaultSize is what a server renders, so prefer that with server rendering." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The direction panels are laid out in." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops every handle: no drags, no keys, and handles leave the tab order." },
        { name: "step", type: "number", default: "1", description: "How far an arrow key moves a handle, in percent." },
        { name: "largeStep", type: "number", default: "10", description: "How far Shift with an arrow key moves a handle, in percent." },
        { name: "autoSaveId", type: "string", description: "Saves the layout when an interaction completes and restores it on the next visit, under this key." },
        { name: "storage", type: "ResizableStorage", default: "localStorage", description: "Where autoSaveId saves: anything with getItem and setItem, like a cookie store a server can read." },
        { name: "controller", type: "ResizableController", description: "Resizes the group from anywhere. Create one with createResizableController()." },
        { name: "onLayoutChange", type: "(layout, details) => void", description: "Runs on every frame of a drag and every key. details.cancel() keeps the layout, and a bound layout stays as it was." },
        { name: "onLayoutCommit", type: "(layout, details) => void", description: "Runs once an interaction that changed the layout ends: the pointer lifts, the key comes up, or a panel collapses. For saving." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every layout change with its reason." },
        { name: "class", type: "string", description: "Merged onto the group; your classes win over the wrapper's." },
      ]}
    />
    <PropsTable
      caption="ResizablePanel"
      rows={[
        { name: "id", type: "string", description: "Identifies the panel for the controller, aria-controls and saved layouts. It's the element's id. Generated when left out." },
        { name: "defaultSize", type: "ResizableSize", description: "Where the panel starts. Without one, panels share what's left evenly. A server renders this size." },
        { name: "minSize", type: "ResizableSize", default: "0", description: "The smallest the panel gets while open." },
        { name: "maxSize", type: "ResizableSize", default: "100", description: "The largest the panel gets." },
        { name: "collapsible", type: "boolean", default: "false", description: "Lets the panel collapse below its minimum to collapsedSize: by dragging past half way there, with Enter or a double-click on its handle, or through the controller." },
        { name: "collapsedSize", type: "ResizableSize", default: "0", description: "The size a collapsible panel collapses to. At 0, its content leaves the tab order and the accessibility tree." },
        { name: "class", type: "string", description: "Merged onto the panel. The wrapper already sets flex column, padding and clipping." },
      ]}
    />
    <PropsTable
      caption="ResizableHandle"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Stops this handle: no drags and no keys, and it leaves the tab order. Panels past it keep their sizes." },
        { name: "aria-label", type: "string", description: "Required accessible name, like 'Resize files'. The handle has no text of its own." },
        { name: "children", type: "snippet", description: "Anything inside the handle, such as a <div /> grip. The wrapper styles a direct div child as the grip." },
        { name: "class", type: "string", description: "Merged onto the separator." },
      ]}
    />
    <PropsTable
      caption="ResizableController"
      rows={[
        { name: "getLayout()", type: "() => number[]", description: "Each panel's size in percent, in order." },
        { name: "setLayout(layout, options?)", type: "(number[], ResizableChangeOptions?) => boolean", description: "Sets every panel at once. Fitted to the panels' bounds and adds up to 100. Returns whether anything changed." },
        { name: "collapse(panel, options?)", type: "(string | number, ResizableChangeOptions?) => boolean", description: "Collapses a collapsible panel, by its id or its index." },
        { name: "expand(panel, options?)", type: "(string | number, ResizableChangeOptions?) => boolean", description: "Expands a collapsed panel to the size it had before, or its minimum." },
        { name: "resize(panel, size, options?)", type: "(string | number, ResizableSize, ResizableChangeOptions?) => boolean", description: "Resizes one panel, like resize('sidebar', '240px'). Its neighbours give or take the difference." },
        { name: "isCollapsed(panel)", type: "(string | number) => boolean", description: "Whether a panel is collapsed." },
      ]}
    />
    <PropsTable
      caption="Change reasons and details"
      rows={[
        { name: "drag", type: "PointerEvent", description: "A handle was dragged." },
        { name: "step-key", type: "KeyboardEvent", description: "An arrow, Home or End key stepped a handle." },
        { name: "collapse", type: "MouseEvent | KeyboardEvent", description: "Enter or a double-click collapsed a panel beside the handle, or restored it." },
        { name: "resize", type: "none", description: "The group changed size, so panels with sizes in pixels moved to stay within their bounds." },
        { name: "imperative", type: "none", description: "A controller call, or a property set on a web component." },
        { name: "details.cancel()", type: "() => void", description: "On onLayoutChange only: keeps the current layout." },
      ]}
    />
    <PropsTable
      caption="Re-exports from $lib/components/resizable"
      rows={[
        { name: "createResizableController", type: "() => ResizableController", description: "Creates the controller you pass as the controller prop." },
        { name: "resizableStorageKey", type: "(autoSaveId: string) => string", description: "The key a group saves under, for reading or clearing a saved layout yourself." },
        { name: "ResizableSize", type: "type", description: "number | `${number}%` | `${number}px` | `${number}rem`." },
        { name: "ResizableStorage", type: "type", description: "{ getItem(key): string | null; setItem(key, value): void }." },
        { name: "ResizableOptions / ResizableState", type: "type", description: "The root's props and the state render snippets receive." },
        { name: "ResizablePanelProps / ResizablePanelState", type: "type", description: "The panel's props and state (orientation, size, collapsed, collapsible)." },
        { name: "ResizableHandleProps / ResizableHandleState", type: "type", description: "The handle's props and state (orientation, disabled, dragging, hovering)." },
        { name: "ResizableLayoutChangeDetails / ResizableLayoutCommitDetails / ResizableLayoutChangeReason / ResizableChangeOptions", type: "type", description: "Callback details, reasons and controller write options." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Handles follow the WAI-ARIA window splitter pattern: each is a focusable <code class="font-mono text-accent">role="separator"</code> whose <code class="font-mono text-accent">aria-valuenow</code> is the size of the panel before it, with <code class="font-mono text-accent">aria-valuemin</code> and <code class="font-mono text-accent">aria-valuemax</code> as far as the panels allow.</li>
      <li><code class="font-mono text-accent">aria-controls</code> points at the panel the handle resizes, and <code class="font-mono text-accent">aria-orientation</code> runs across the group — a horizontal group's separator is vertical.</li>
      <li>Name every handle with <code class="font-mono text-accent">aria-label</code>, like "Resize files". A handle has no text content of its own.</li>
      <li><span class="text-fg">Left/Right</span> (horizontal group) or <span class="text-fg">Up/Down</span> (vertical group) move the handle by <code class="font-mono text-accent">step</code>; with <span class="text-fg">Shift</span> by <code class="font-mono text-accent">largeStep</code>. Arrows across the group's axis do nothing.</li>
      <li><span class="text-fg">Home</span> and <span class="text-fg">End</span> move the handle as far as the panels allow. Home collapses a collapsible panel; End grows it to its maximum.</li>
      <li><span class="text-fg">Enter</span> collapses or restores a collapsible panel beside the handle. A double-click does the same.</li>
      <li>A panel at its minimum passes the rest of a move on to the next one, so a drag never stalls at a bound.</li>
      <li>Disabled handles leave the tab order, report <code class="font-mono text-accent">aria-disabled</code>, and stop a move from reaching the panels past them.</li>
      <li>A handle only joins the tab order once the group has laid its panels out, so server-rendered HTML never exposes a separator without a value.</li>
      <li>A panel collapsed to size 0 is <code class="font-mono text-accent">inert</code>: its content is neither focusable nor read by assistive technology.</li>
      <li>The hit area reaches at least 10px across the line, and 24px for touch, so a thin separator is still easy to grab.</li>
    </ul>
  </Section>
</div>