<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Toolbar,
    ToolbarButton,
    ToolbarGroup,
    ToolbarInput,
    ToolbarLink,
    ToolbarSeparator,
    createToolbarController,
  } from "$lib/components/toolbar"
  import { Button } from "$lib/components/button"
  import {
    Bold,
    Italic,
    Underline,
    Link,
    Scissors,
    Copy,
    Clipboard,
    Undo2,
    Redo2,
    MousePointer2,
    Pencil,
    Square,
    Type,
    Trash2,
    Search,
  } from "@lucide/svelte"

  const formats = [
    { label: "Bold", icon: Bold },
    { label: "Italic", icon: Italic },
    { label: "Underline", icon: Underline },
  ]

  const tools = [
    { value: "select", label: "Select", icon: MousePointer2 },
    { value: "draw", label: "Draw", icon: Pencil },
    { value: "shape", label: "Shape", icon: Square },
    { value: "text", label: "Text", icon: Type },
  ]

  const editor = createToolbarController()

  const installCode = `import {
  Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator,
} from "$lib/components/toolbar"`

  const usageCode = `<script lang="ts">
  import { Bold, Italic, Underline, Link } from "@lucide/svelte"
  import {
    Toolbar, ToolbarButton, ToolbarSeparator,
  } from "$lib/components/toolbar"

  const formats = [
    { label: "Bold", icon: Bold },
    { label: "Italic", icon: Italic },
    { label: "Underline", icon: Underline },
  ]

  let pressed = $state<Record<string, boolean>>({})
  let log = $state("Nothing pressed yet")

  function toggleFormat(label: string) {
    pressed[label] = !pressed[label]
    log = label + (pressed[label] ? " on" : " off")
  }
<\/script>

<Toolbar aria-label="Formatting">
  {#each formats as { label, icon: Icon } (label)}
    <ToolbarButton
      aria-label={label}
      aria-pressed={!!pressed[label]}
      data-pressed={pressed[label] ? "" : undefined}
      onclick={() => toggleFormat(label)}
    >
      <Icon aria-hidden="true" />
    </ToolbarButton>
  {/each}
  <ToolbarSeparator />
  <ToolbarButton aria-label="Insert link" onclick={() => (log = "Insert link")}>
    <Link aria-hidden="true" />
  </ToolbarButton>
</Toolbar>
<p>{log}</p>`

  const groupsCode = `<script lang="ts">
  import { Scissors, Copy, Clipboard, Undo2, Redo2 } from "@lucide/svelte"
  import {
    Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator,
  } from "$lib/components/toolbar"

  let log = $state("Nothing pressed yet")
<\/script>

<Toolbar aria-label="Clipboard">
  <ToolbarGroup aria-label="Clipboard">
    <ToolbarButton aria-label="Cut" onclick={() => (log = "Cut")}>
      <Scissors aria-hidden="true" />
    </ToolbarButton>
    <ToolbarButton aria-label="Copy" onclick={() => (log = "Copy")}>
      <Copy aria-hidden="true" />
    </ToolbarButton>
    <ToolbarButton aria-label="Paste" onclick={() => (log = "Paste")}>
      <Clipboard aria-hidden="true" />
    </ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarGroup aria-label="History" disabled>
    <ToolbarButton aria-label="Undo"><Undo2 aria-hidden="true" /></ToolbarButton>
    <ToolbarButton aria-label="Redo"><Redo2 aria-hidden="true" /></ToolbarButton>
  </ToolbarGroup>
</Toolbar>
<p>{log}</p>`

  const fieldCode = `<script lang="ts">
  import { Search } from "@lucide/svelte"
  import {
    Toolbar, ToolbarButton, ToolbarInput, ToolbarSeparator,
  } from "$lib/components/toolbar"

  let query = $state("")

  function onInput(event: Event & { currentTarget: HTMLInputElement }) {
    query = event.currentTarget.value
  }
<\/script>

<Toolbar aria-label="Find">
  <ToolbarButton aria-label="Search" onclick={() => (query = "")}>
    <Search aria-hidden="true" />
  </ToolbarButton>
  <ToolbarSeparator />
  <ToolbarInput aria-label="Find in document" value={query} oninput={onInput} />
  <ToolbarButton disabled={!query} onclick={() => (query = "")}>Clear</ToolbarButton>
</Toolbar>
<p>{query || "nothing typed yet"}</p>`

  const linksCode = `<script lang="ts">
  import {
    Toolbar, ToolbarButton, ToolbarLink, ToolbarSeparator,
  } from "$lib/components/toolbar"

  let log = $state("Nothing pressed yet")
<\/script>

<Toolbar aria-label="Jump to">
  <ToolbarLink href="#api">API reference</ToolbarLink>
  <ToolbarLink href="#accessibility">Accessibility</ToolbarLink>
  <ToolbarSeparator />
  <ToolbarButton onclick={() => (log = "Shared")}>Share</ToolbarButton>
</Toolbar>
<p>{log}</p>`

  const verticalCode = `<script lang="ts">
  import { MousePointer2, Pencil, Square, Type, Trash2 } from "@lucide/svelte"
  import {
    Toolbar, ToolbarButton, ToolbarSeparator,
  } from "$lib/components/toolbar"

  const tools = [
    { value: "select", label: "Select", icon: MousePointer2 },
    { value: "draw", label: "Draw", icon: Pencil },
    { value: "shape", label: "Shape", icon: Square },
    { value: "text", label: "Text", icon: Type },
  ]

  let tool = $state("select")
<\/script>

<Toolbar aria-label="Canvas tools" orientation="vertical">
  {#each tools as { value, label, icon: Icon } (value)}
    <ToolbarButton
      aria-label={label}
      aria-pressed={tool === value}
      data-pressed={tool === value ? "" : undefined}
      onclick={() => (tool = value)}
    >
      <Icon aria-hidden="true" />
    </ToolbarButton>
  {/each}
  <ToolbarSeparator />
  <ToolbarButton aria-label="Delete" onclick={() => (tool = "select")}>
    <Trash2 aria-hidden="true" />
  </ToolbarButton>
</Toolbar>`

  const disabledCode = `<Toolbar aria-label="Message">
  <ToolbarButton onclick={() => (log = "Reply")}>Reply</ToolbarButton>
  <ToolbarButton disabled>Archive</ToolbarButton>
  <ToolbarButton disabled focusableWhenDisabled={false}>Delete</ToolbarButton>
</Toolbar>
<Toolbar aria-label="Read only" disabled>
  <ToolbarButton>Bold</ToolbarButton>
  <ToolbarButton>Italic</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarLink href="#api">API reference</ToolbarLink>
</Toolbar>`

  const controllerCode = `<script lang="ts">
  import { Bold, Italic, Link } from "@lucide/svelte"
  import { createToolbarController, Toolbar, ToolbarButton } from "$lib/components/toolbar"
  import { Button } from "$lib/components/button"

  const editor = createToolbarController()
  let note = $state("")
<\/script>

<Button size="sm" tone="outline" onclick={() => editor.focus()}>Focus toolbar</Button>
<textarea aria-label="Note" bind:value={note} rows="3"></textarea>
<Toolbar aria-label="Note formatting" controller={editor}>
  <ToolbarButton aria-label="Bold"><Bold aria-hidden="true" /></ToolbarButton>
  <ToolbarButton aria-label="Italic"><Italic aria-hidden="true" /></ToolbarButton>
  <ToolbarButton aria-label="Insert link"><Link aria-hidden="true" /></ToolbarButton>
</Toolbar>`

  let pressed = $state<Record<string, boolean>>({})
  let log = $state("Nothing pressed yet")
  let groupLog = $state("Nothing pressed yet")
  let query = $state("")
  let tool = $state("select")
  let note = $state("")

  function toggleFormat(label: string) {
    pressed[label] = !pressed[label]
    log = label + (pressed[label] ? " on" : " off")
  }

  function onInput(event: Event & { currentTarget: HTMLInputElement }) {
    query = event.currentTarget.value
  }
</script>

<svelte:head>
  <title>Toolbar — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Toolbar"
  description="Group the controls of an editor, a canvas or a table behind one tab stop. Wraps the ui-sdk Toolbar: buttons, links and fields share a roving focus, so Tab enters once and the arrow keys move between items."
  entry="@ui-sdk/svelte/toolbar"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/toolbar</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put buttons, links and fields straight inside
      <code class="font-mono text-accent">Toolbar</code>. Name the toolbar with
      <code class="font-mono text-accent">aria-label</code>, and give every icon-only control its own.
      <code class="font-mono text-accent">ToolbarGroup</code> names a set of related items and
      <code class="font-mono text-accent">ToolbarSeparator</code> draws a line between sets. Toggles and
      toggle groups join the navigation on their own; menu and select triggers join through
      <code class="font-mono text-accent">ToolbarButton</code>, and other fields through
      <code class="font-mono text-accent">ToolbarInput</code>, using a
      <code class="font-mono text-accent">render</code> snippet that spreads its
      <code class="font-mono text-accent">props</code> onto the inner component.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Tab into the toolbar, then use Left and Right. Space presses the focused style; moving focus never presses anything." code={usageCode}>
      <div class="flex flex-col items-center gap-3">
        <Toolbar aria-label="Formatting">
          {#each formats as { label, icon: Icon } (label)}
            <ToolbarButton
              aria-label={label}
              aria-pressed={!!pressed[label]}
              data-pressed={pressed[label] ? "" : undefined}
              onclick={() => toggleFormat(label)}
            >
              <Icon aria-hidden="true" />
            </ToolbarButton>
          {/each}
          <ToolbarSeparator />
          <ToolbarButton aria-label="Insert link" onclick={() => (log = "Insert link")}>
            <Link aria-hidden="true" />
          </ToolbarButton>
        </Toolbar>
        <p class="font-mono text-xs text-muted">{log}</p>
      </div>
    </Demo>

    <Demo title="Groups" description="A group names a set of items. A disabled group disables everything in it, but the items stay reachable so a tooltip can say why." code={groupsCode}>
      <div class="flex flex-col items-center gap-3">
        <Toolbar aria-label="Clipboard">
          <ToolbarGroup aria-label="Clipboard">
            <ToolbarButton aria-label="Cut" onclick={() => (groupLog = "Cut")}>
              <Scissors aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton aria-label="Copy" onclick={() => (groupLog = "Copy")}>
              <Copy aria-hidden="true" />
            </ToolbarButton>
            <ToolbarButton aria-label="Paste" onclick={() => (groupLog = "Paste")}>
              <Clipboard aria-hidden="true" />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup aria-label="History" disabled>
            <ToolbarButton aria-label="Undo"><Undo2 aria-hidden="true" /></ToolbarButton>
            <ToolbarButton aria-label="Redo"><Redo2 aria-hidden="true" /></ToolbarButton>
          </ToolbarGroup>
        </Toolbar>
        <p class="font-mono text-xs text-muted">{groupLog}</p>
      </div>
    </Demo>

    <Demo title="Field" description="A field keeps Home, End and the arrows for its caret. An arrow leaves it only from the end it points at, with nothing selected." code={fieldCode}>
      <div class="flex flex-col items-center gap-3">
        <Toolbar aria-label="Find">
          <ToolbarButton aria-label="Search" onclick={() => (query = "")}>
            <Search aria-hidden="true" />
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarInput aria-label="Find in document" value={query} oninput={onInput} />
          <ToolbarButton disabled={!query} onclick={() => (query = "")}>Clear</ToolbarButton>
        </Toolbar>
        <p class="font-mono text-xs text-muted">{query || "nothing typed yet"}</p>
      </div>
    </Demo>

    <Demo title="Links" description="A link joins the same focus order and keeps its link behavior: Enter follows the href, and a modified click is left to the browser." code={linksCode}>
      <Toolbar aria-label="Jump to">
        <ToolbarLink href="#api">API reference</ToolbarLink>
        <ToolbarLink href="#accessibility">Accessibility</ToolbarLink>
        <ToolbarSeparator />
        <ToolbarButton onclick={() => (log = "Shared")}>Share</ToolbarButton>
      </Toolbar>
    </Demo>

    <Demo title="Vertical" description="orientation='vertical' moves with Up and Down, like a canvas palette. Separators turn to run across the toolbar." code={verticalCode}>
      <div class="flex items-start gap-4">
        <Toolbar aria-label="Canvas tools" orientation="vertical">
          {#each tools as { value, label, icon: Icon } (value)}
            <ToolbarButton
              aria-label={label}
              aria-pressed={tool === value}
              data-pressed={tool === value ? "" : undefined}
              onclick={() => (tool = value)}
            >
              <Icon aria-hidden="true" />
            </ToolbarButton>
          {/each}
          <ToolbarSeparator />
          <ToolbarButton aria-label="Delete" onclick={() => (tool = "select")}>
            <Trash2 aria-hidden="true" />
          </ToolbarButton>
        </Toolbar>
        <p class="font-mono text-xs text-muted">tool: {tool}</p>
      </div>
    </Demo>

    <Demo title="Disabled" description="A disabled item stays focusable with aria-disabled by default. focusableWhenDisabled={false} makes it natively disabled and skips it. A disabled toolbar keeps its one tab stop." code={disabledCode}>
      <div class="flex flex-col items-center gap-3">
        <Toolbar aria-label="Message">
          <ToolbarButton onclick={() => (log = "Reply")}>Reply</ToolbarButton>
          <ToolbarButton disabled>Archive</ToolbarButton>
          <ToolbarButton disabled focusableWhenDisabled={false}>Delete</ToolbarButton>
        </Toolbar>
        <Toolbar aria-label="Read only" disabled>
          <ToolbarButton>Bold</ToolbarButton>
          <ToolbarButton>Italic</ToolbarButton>
          <ToolbarSeparator />
          <ToolbarLink href="#api">API reference</ToolbarLink>
        </Toolbar>
      </div>
    </Demo>

    <Demo title="Controller" description="A controller focuses the toolbar from anywhere — the item focused last, or the first. Editors bind it to Alt+F10." code={controllerCode}>
      <div class="flex w-full max-w-sm flex-col items-stretch gap-3">
        <div class="flex justify-center">
          <Button size="sm" tone="outline" onclick={() => editor.focus()}>Focus toolbar</Button>
        </div>
        <textarea
          class="w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label="Note"
          bind:value={note}
          rows="3"
        ></textarea>
        <div class="flex justify-center">
          <Toolbar aria-label="Note formatting" controller={editor}>
            <ToolbarButton aria-label="Bold" onclick={() => (log = "Bold")}><Bold aria-hidden="true" /></ToolbarButton>
            <ToolbarButton aria-label="Italic" onclick={() => (log = "Italic")}><Italic aria-hidden="true" /></ToolbarButton>
            <ToolbarButton aria-label="Insert link" onclick={() => (log = "Insert link")}><Link aria-hidden="true" /></ToolbarButton>
          </Toolbar>
        </div>
        <p class="text-center font-mono text-xs text-muted">{note ? "note: " + note.length + " characters" : "type a note, then focus the toolbar"}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Toolbar orientation"
      rows={[
        { name: "horizontal", type: "default", description: "A row. ArrowRight and ArrowLeft move between items." },
        { name: "vertical", type: "string", description: "A column. ArrowDown and ArrowUp move between items; separators run across it." },
      ]}
    />
    <PropsTable
      caption="ToolbarButton appearance"
      rows={[
        { name: "icon only", type: "default", description: "A single svg child makes the button square (w-8, no padding). Give it an aria-label." },
        { name: "labelled", type: "class", description: "Text, or an icon plus text, keeps h-8 with px-2.5 and gap-1.5." },
        { name: "pressed", type: "data-pressed", description: "The wrapper paints accent-soft with accent text. Set data-pressed and aria-pressed yourself, or let a Toggle inside own them." },
        { name: "disabled", type: "data-disabled", description: "Faint text and no pointer events. Still reachable with the arrow keys unless focusableWhenDisabled is false." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling: <code class="font-mono text-accent">data-orientation</code> and
      <code class="font-mono text-accent">data-disabled</code> on the root, groups, buttons, links and
      fields. On a separator <code class="font-mono text-accent">data-orientation</code> is the way the
      line runs — across the toolbar, so <code class="font-mono text-accent">vertical</code> in a
      horizontal toolbar. Each part also carries a
      <code class="font-mono text-accent">data-slot</code>, such as
      <code class="font-mono text-accent">toolbar-button</code>. Toggles inside keep their own
      <code class="font-mono text-accent">data-pressed</code>.
    </p>
    <PropsTable
      caption="Composing other controls"
      rows={[
        { name: "Toggle / ToggleGroup", type: "direct child", description: "Joins the toolbar's navigation on its own, with no extra tab stop." },
        { name: "Menu / Select trigger", type: "render on ToolbarButton", description: "Spread the snippet's props onto the trigger. ArrowDown opens it, and choosing returns focus to the trigger." },
        { name: "NumberInput / other field", type: "render on ToolbarInput", description: "Spread the snippet's props onto the field's control. Up and Down keep stepping the value." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Toolbar (root)"
      rows={[
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which arrow keys move between items: left and right, or up and down." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last item to the first. With it off, arrows stop at the ends and Home still works." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops every item from being used. Items stay focusable with aria-disabled, so the toolbar keeps its tab stop." },
        { name: "controller", type: "ToolbarController", description: "Focuses the toolbar from anywhere via createToolbarController(). One per mounted toolbar." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
        { name: "aria-label", type: "string", description: "Names the toolbar for screen readers. Required in practice — the root has role='toolbar'." },
        { name: "class", type: "string", description: "Extra classes merged onto the root (user wins)." },
      ]}
    />
    <PropsTable
      caption="ToolbarButton"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Stops the item from being used. It stays focusable with aria-disabled, so arrow keys still reach it." },
        { name: "focusableWhenDisabled", type: "boolean", default: "true", description: "Whether a disabled item stays reachable. Turn it off to skip it, natively disabled." },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
        { name: "children", type: "Snippet<[ToolbarButtonState]>", description: "The label. Receives disabled and orientation." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Renders another component with the button's behavior. Spread props onto it — this is how menu and select triggers join." },
      ]}
    />
    <PropsTable
      caption="ToolbarInput"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Stops the field from being used. It stays focusable with aria-disabled." },
        { name: "focusableWhenDisabled", type: "boolean", default: "true", description: "Whether a disabled field stays reachable with the arrow keys." },
        { name: "value / type / name", type: "native input attributes", description: "Any input attribute passes through. The wrapper is one-way: read the value from oninput, or render a bound field through the render snippet." },
        { name: "class", type: "string", description: "Extra classes merged onto the input (user wins). The default width is w-36." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Renders another field's control with the toolbar's focus handling. Spread props onto it." },
      ]}
    />
    <PropsTable
      caption="ToolbarGroup"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Disables every item in the group. They stay focusable with aria-disabled, and enabling the group enables them again." },
        { name: "aria-label", type: "string", description: "Names the set of items. The group renders role='group'." },
        { name: "class", type: "string", description: "Extra classes merged onto the group (user wins)." },
      ]}
    />
    <PropsTable
      caption="ToolbarLink"
      rows={[
        { name: "href", type: "string", description: "Where the link goes. Enter follows it; modified clicks are left to the browser." },
        { name: "class", type: "string", description: "Extra classes merged onto the anchor (user wins)." },
        { name: "children", type: "Snippet<[ToolbarLinkState]>", description: "The label. Receives disabled (from its group or the toolbar) and orientation." },
      ]}
    />
    <PropsTable
      caption="ToolbarSeparator"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the separator (user wins). It takes no props of its own." },
        { name: "children", type: "Snippet<[ToolbarSeparatorState]>", description: "Receives orientation — the way the line runs, across the toolbar." },
      ]}
    />
    <PropsTable
      caption="ToolbarController"
      rows={[
        { name: "focus()", type: "() => void", description: "Moves focus to the item holding the toolbar's tab stop: the one focused last, or the first." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA toolbar pattern: the root has <code class="font-mono text-accent">role="toolbar"</code> and <code class="font-mono text-accent">aria-orientation</code>, groups have <code class="font-mono text-accent">role="group"</code>, and separators have <code class="font-mono text-accent">role="separator"</code> running across the toolbar.</li>
      <li><span class="text-fg">One tab stop, a roving focus.</span> Tab enters on the first enabled item, then returns to the item focused last. The next Tab leaves the toolbar, and Shift+Tab from after it lands back on that tab stop.</li>
      <li><span class="text-fg">ArrowRight / ArrowLeft</span> move focus in a horizontal toolbar; <span class="text-fg">ArrowDown / ArrowUp</span> in a vertical one. They wrap unless <code class="font-mono text-accent">loop={false}</code>, and in right-to-left text Left and Right swap.</li>
      <li><span class="text-fg">Home / End</span> focus the first or last item, except inside a field, where they move the caret.</li>
      <li><span class="text-fg">Enter / Space</span> activate a button or toggle, or open its popup. Moving focus never presses a toggle.</li>
      <li>Controls keep the keys they use: Down opens a menu, and Up and Down step a number field. Entering a field with an arrow puts the caret at the far end in that direction — press the same arrow again to leave, or the other arrow to edit.</li>
      <li>A disabled item stays reachable and says it's disabled, so a tooltip can explain why; <code class="font-mono text-accent">focusableWhenDisabled={false}</code> makes it natively disabled and skipped instead. A disabled toolbar keeps one tab stop and every item reports disabled.</li>
      <li>Name the toolbar with <code class="font-mono text-accent">aria-label</code>, name each group the same way, and give every icon-only control its own label — the icon itself is <code class="font-mono text-accent">aria-hidden</code>.</li>
    </ul>
  </Section>
</div>