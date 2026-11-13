<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { Menubar, createMenubarController } from "#lib/components/menubar"
  import {
    Menu,
    MenuTrigger,
    MenuContent,
    MenuItem,
    MenuSeparator,
    MenuSub,
    MenuSubTrigger,
    MenuSubContent,
    MenuCheckboxItem,
    MenuItemIndicator,
    MenuRadioGroup,
    MenuRadioItem,
    MenuGroupLabel,
  } from "#lib/components/menu"
  import { Button } from "#lib/components/button"
  import { Check, ChevronRight } from "@lucide/svelte"

  const installCode = `import { Menubar } from "#lib/components/menubar"
import { Menu, MenuTrigger, MenuContent, MenuItem } from "#lib/components/menu"`

  const basicCode = `<script lang="ts">
  import { Check, ChevronRight } from "@lucide/svelte"
  import { Menubar } from "#lib/components/menubar"
  import {
    Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator,
    MenuSub, MenuSubTrigger, MenuSubContent, MenuCheckboxItem,
    MenuItemIndicator, MenuRadioGroup, MenuRadioItem, MenuGroupLabel,
  } from "#lib/components/menu"
  let chosen = $state("none")
  let ruler = $state(false)
  let appearance = $state<string | null>("System")
<\/script>

<Menubar aria-label="Application">
  <Menu onAction={(value) => (chosen = value)}>
    <MenuTrigger>File</MenuTrigger>
    <MenuContent>
      <MenuItem value="new" shortcut="mod+n">New document</MenuItem>
      <MenuItem value="open" shortcut="mod+o">Open…</MenuItem>
      <MenuSub>
        <MenuSubTrigger>Open recent <ChevronRight aria-hidden="true" /></MenuSubTrigger>
        <MenuSubContent>
          <MenuItem value="roadmap">Q3 roadmap</MenuItem>
          <MenuItem value="checklist">Launch checklist</MenuItem>
        </MenuSubContent>
      </MenuSub>
      <MenuSeparator />
      <MenuItem value="print" shortcut="mod+p">Print…</MenuItem>
    </MenuContent>
  </Menu>

  <Menu onAction={(value) => (chosen = value)}>
    <MenuTrigger>Edit</MenuTrigger>
    <MenuContent>
      <MenuItem value="undo" shortcut="mod+z" disabled>Undo</MenuItem>
      <MenuItem value="redo" shortcut="mod+shift+z">Redo</MenuItem>
      <MenuSeparator />
      <MenuItem value="cut" shortcut="mod+x">Cut</MenuItem>
      <MenuItem value="copy" shortcut="mod+c">Copy</MenuItem>
      <MenuItem value="paste" shortcut="mod+v">Paste</MenuItem>
    </MenuContent>
  </Menu>

  <Menu>
    <MenuTrigger>View</MenuTrigger>
    <MenuContent>
      <MenuCheckboxItem value="ruler" bind:checked={ruler}>
        <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
        Show ruler
      </MenuCheckboxItem>
      <MenuCheckboxItem value="word-count" defaultChecked>
        <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
        Show word count
      </MenuCheckboxItem>
      <MenuSeparator />
      <MenuRadioGroup name="appearance" bind:value={appearance}>
        <MenuGroupLabel>Appearance</MenuGroupLabel>
        {#each ["Light", "Dark", "System"] as option (option)}
          <MenuRadioItem value={option}>
            <MenuItemIndicator />
            {option}
          </MenuRadioItem>
        {/each}
      </MenuRadioGroup>
    </MenuContent>
  </Menu>
</Menubar>
<p class="text-sm text-muted">
  Chose {chosen} · ruler {ruler ? "on" : "off"} · {appearance}
</p>`

  const verticalCode = `<script lang="ts">
  import { Menubar } from "#lib/components/menubar"
  import { Menu, MenuTrigger, MenuContent, MenuItem } from "#lib/components/menu"
  let chosen = $state("none")
<\/script>

<Menubar orientation="vertical" aria-label="Mailboxes">
  {#each ["Inbox", "Drafts", "Archive"] as label (label)}
    <Menu onAction={(value) => (chosen = value)}>
      <MenuTrigger>{label}</MenuTrigger>
      <MenuContent side="right">
        <MenuItem value={"open-" + label}>Open {label}</MenuItem>
        <MenuItem value={"read-" + label}>Mark all as read</MenuItem>
      </MenuContent>
    </Menu>
  {/each}
</Menubar>
<p class="text-sm text-muted">Chose {chosen}</p>`

  const controllerCode = `<script lang="ts">
  import { Menubar, createMenubarController } from "#lib/components/menubar"
  import { Menu, MenuTrigger, MenuContent, MenuItem } from "#lib/components/menu"
  import { Button } from "#lib/components/button"
  const bar = createMenubarController()
<\/script>

<Button tone="outline" onclick={() => bar.focus()}>Focus the bar (Alt+M)</Button>
<Button tone="ghost" onclick={() => bar.close()}>Close its menu</Button>

<Menubar controller={bar} aria-label="Document">
  <Menu>
    <MenuTrigger>File</MenuTrigger>
    <MenuContent>
      <MenuItem value="new">New</MenuItem>
      <MenuItem value="save">Save</MenuItem>
    </MenuContent>
  </Menu>
  <Menu>
    <MenuTrigger disabled>Share</MenuTrigger>
    <MenuContent>
      <MenuItem value="email">Email link</MenuItem>
    </MenuContent>
  </Menu>
  <Menu>
    <MenuTrigger>Help</MenuTrigger>
    <MenuContent>
      <MenuItem value="docs">Documentation</MenuItem>
    </MenuContent>
  </Menu>
</Menubar>`

  const loopCode = `<script lang="ts">
  import { Menubar } from "#lib/components/menubar"
  import { Menu, MenuTrigger, MenuContent, MenuItem } from "#lib/components/menu"
<\/script>

<Menubar loop={false} aria-label="Stops at the ends">
  {#each ["One", "Two", "Three"] as label (label)}
    <Menu>
      <MenuTrigger>{label}</MenuTrigger>
      <MenuContent>
        <MenuItem value={label + "-a"}>{label} action A</MenuItem>
        <MenuItem value={label + "-b"}>{label} action B</MenuItem>
      </MenuContent>
    </Menu>
  {/each}
</Menubar>`

  let chosen = $state("none")
  let ruler = $state(false)
  let appearance = $state<string | null>("System")
  let verticalAction = $state("none")
  const bar = createMenubarController()
</script>

<svelte:head>
  <title>Menubar — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Menubar"
  description="A row of application menus with one tab stop. Wraps the ui-sdk Menubar, which connects the triggers of the Menus inside it."
  entry="@ui-sdk/svelte/menubar"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      The bar is one part. Its menus come from the Menu component, which wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/menu</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put ordinary Menus inside the bar. Each one joins automatically — there is no separate
      menubar trigger or item. Name the bar with
      <code class="font-mono text-accent">aria-label</code> when more than one is on the page.
      Tab enters the bar once, then arrow keys move between menus.
    </p>
    <CodeBlock code={basicCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Application bar" description="File has submenus, Edit has shortcuts and a disabled item, View has checkboxes and an appearance choice. Once one menu is open, pointing at another trigger switches to it." code={basicCode}>
      <div class="flex min-h-64 w-full flex-col items-start gap-3">
        <Menubar aria-label="Application">
          <Menu onAction={(value) => (chosen = value)}>
            <MenuTrigger>File</MenuTrigger>
            <MenuContent>
              <MenuItem value="new" shortcut="mod+n">New document</MenuItem>
              <MenuItem value="open" shortcut="mod+o">Open…</MenuItem>
              <MenuSub>
                <MenuSubTrigger>Open recent <ChevronRight aria-hidden="true" /></MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem value="roadmap">Q3 roadmap</MenuItem>
                  <MenuItem value="checklist">Launch checklist</MenuItem>
                </MenuSubContent>
              </MenuSub>
              <MenuSeparator />
              <MenuItem value="print" shortcut="mod+p">Print…</MenuItem>
            </MenuContent>
          </Menu>

          <Menu onAction={(value) => (chosen = value)}>
            <MenuTrigger>Edit</MenuTrigger>
            <MenuContent>
              <MenuItem value="undo" shortcut="mod+z" disabled>Undo</MenuItem>
              <MenuItem value="redo" shortcut="mod+shift+z">Redo</MenuItem>
              <MenuSeparator />
              <MenuItem value="cut" shortcut="mod+x">Cut</MenuItem>
              <MenuItem value="copy" shortcut="mod+c">Copy</MenuItem>
              <MenuItem value="paste" shortcut="mod+v">Paste</MenuItem>
            </MenuContent>
          </Menu>

          <Menu>
            <MenuTrigger>View</MenuTrigger>
            <MenuContent>
              <MenuCheckboxItem value="ruler" bind:checked={ruler}>
                <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
                Show ruler
              </MenuCheckboxItem>
              <MenuCheckboxItem value="word-count" defaultChecked>
                <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
                Show word count
              </MenuCheckboxItem>
              <MenuSeparator />
              <MenuRadioGroup name="appearance" bind:value={appearance}>
                <MenuGroupLabel>Appearance</MenuGroupLabel>
                {#each ["Light", "Dark", "System"] as option (option)}
                  <MenuRadioItem value={option}>
                    <MenuItemIndicator />
                    {option}
                  </MenuRadioItem>
                {/each}
              </MenuRadioGroup>
            </MenuContent>
          </Menu>
        </Menubar>
        <p class="text-sm text-muted">
          Chose {chosen} · ruler {ruler ? "on" : "off"} · {appearance}
        </p>
      </div>
    </Demo>

    <Demo title="Vertical" description="orientation=vertical moves between triggers with Up and Down, and opens each menu to the side. The arrow back closes it and returns to the trigger." code={verticalCode}>
      <div class="flex min-h-56 w-full flex-col items-start gap-3">
        <Menubar orientation="vertical" aria-label="Mailboxes">
          {#each ["Inbox", "Drafts", "Archive"] as label (label)}
            <Menu onAction={(value) => (verticalAction = value)}>
              <MenuTrigger>{label}</MenuTrigger>
              <MenuContent side="right">
                <MenuItem value={"open-" + label}>Open {label}</MenuItem>
                <MenuItem value={"read-" + label}>Mark all as read</MenuItem>
              </MenuContent>
            </Menu>
          {/each}
        </Menubar>
        <p class="text-sm text-muted">Chose {verticalAction}</p>
      </div>
    </Demo>

    <Demo title="Controller and disabled" description="createMenubarController() moves focus into the bar or closes its open menu from anywhere — wire it to a shortcut like Alt+M. A disabled trigger stays focusable so people can still find it." code={controllerCode}>
      <div class="flex min-h-52 w-full flex-col items-start gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <Button tone="outline" onclick={() => bar.focus()}>Focus the bar</Button>
          <Button tone="ghost" onclick={() => bar.close()}>Close its menu</Button>
        </div>
        <Menubar controller={bar} aria-label="Document">
          <Menu>
            <MenuTrigger>File</MenuTrigger>
            <MenuContent>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="save">Save</MenuItem>
            </MenuContent>
          </Menu>
          <Menu>
            <MenuTrigger disabled>Share</MenuTrigger>
            <MenuContent>
              <MenuItem value="email">Email link</MenuItem>
            </MenuContent>
          </Menu>
          <Menu>
            <MenuTrigger>Help</MenuTrigger>
            <MenuContent>
              <MenuItem value="docs">Documentation</MenuItem>
            </MenuContent>
          </Menu>
        </Menubar>
      </div>
    </Demo>

    <Demo title="No wrapping" description="loop=false stops the arrow keys at the first and last menu instead of wrapping around." code={loopCode}>
      <div class="flex min-h-48 w-full flex-col items-start gap-3">
        <Menubar loop={false} aria-label="Stops at the ends">
          {#each ["One", "Two", "Three"] as label (label)}
            <Menu>
              <MenuTrigger>{label}</MenuTrigger>
              <MenuContent>
                <MenuItem value={label + "-a"}>{label} action A</MenuItem>
                <MenuItem value={label + "-b"}>{label} action B</MenuItem>
              </MenuContent>
            </Menu>
          {/each}
        </Menubar>
        <p class="text-sm text-muted">Arrow past Three and focus stays there.</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Menubar orientation"
      rows={[
        { name: "horizontal", type: "default", description: "A row. Left and Right move between menus; menus open below their trigger." },
        { name: "vertical", type: "string", description: "A column. Up and Down move between menus; menus open to the side. The bar stretches its triggers to a common width." },
      ]}
    />
    <PropsTable
      caption="Menubar modal"
      rows={[
        { name: '"pointer"', type: "default", description: "An outside press only closes the open menu, and does not reach what it hit." },
        { name: "true", type: "boolean", description: "Also locks scrolling, traps focus and makes the rest of the page inert. The bar itself stays usable so menus can be switched." },
        { name: "false", type: "boolean", description: "Outside presses close the menu and reach what they hit." },
      ]}
    />
    <p class="text-sm text-muted">
      Triggers inside the bar pick up the compact menubar look automatically: 32px tall, no border,
      transparent until hovered or open. Pass <code class="font-mono text-accent">class</code> to a
      <code class="font-mono text-accent">MenuTrigger</code> to override it. Menus in a bar always use the
      popover presentation, never the sheet.
    </p>
    <p class="text-sm text-muted">
      State attributes on the bar:
      <code class="font-mono text-accent">data-orientation</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-open</code> while any of its menus is open.
      A trigger carries <code class="font-mono text-accent">data-open</code> only for its own menu.
      Popups and items use the attributes and CSS variables on the Menu page.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Menubar"
      rows={[
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which arrow keys move between menus. A vertical bar opens its menus to the side." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last menu to the first, both between triggers and inside open menus." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops every menu opening. Triggers stay focusable with aria-disabled, so the bar keeps its tab stop." },
        { name: "modal", type: 'boolean | "pointer"', default: '"pointer"', description: "The modal setting given to every menu that doesn't set its own." },
        { name: "controller", type: "MenubarController", description: "Focus, inspect and close the bar from anywhere. Create one with createMenubarController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason to the console in development builds." },
        { name: "class", type: "string", description: "Extra classes merged onto the bar element." },
        { name: "children", type: "Snippet<[MenubarState]>", description: "Receives orientation, disabled, open and modal." },
      ]}
    />
    <PropsTable
      caption="MenubarController"
      rows={[
        { name: "focus()", type: "() => void", description: "Moves focus to the trigger holding the bar's tab stop: the one used last, or the first." },
        { name: "isOpen()", type: "() => boolean", description: "Whether one of its menus is open." },
        { name: "close(options?)", type: "(options?) => boolean", description: "Closes the open menu and its submenus. Returns false when the close was canceled or nothing was open." },
      ]}
    />
    <PropsTable
      caption="MenubarState"
      rows={[
        { name: "orientation", type: "MenubarOrientation", description: "Which arrow keys move between menus." },
        { name: "disabled", type: "boolean", description: "Whether the whole bar is disabled." },
        { name: "open", type: "boolean", description: "Whether one of its menus is open." },
        { name: "modal", type: 'boolean | "pointer"', description: "The modal setting its menus inherit." },
      ]}
    />
    <p class="text-sm text-muted">
      Menus, items, indicators and icons take exactly the props documented on the
      <a class="text-accent underline" href="/docs/menu">Menu</a> page. Each menu keeps its own
      <code class="font-mono text-accent">open</code> state and controller; the bar only connects them.
      A menu taken over by another one in the bar closes with the reason
      <code class="font-mono text-accent">submenu-switch</code>.
    </p>
  </Section>

  <Section id="accessibility" title="Accessibility">
    <p class="text-sm text-muted">
      Follows the WAI-ARIA menubar pattern. The bar is a
      <code class="font-mono text-accent">menubar</code> and its triggers are
      <code class="font-mono text-accent">menuitem</code> elements that open menus. It is a single tab
      stop: Tab lands on the first trigger, and comes back to the one used last.
    </p>
    <PropsTable
      caption="Keyboard — on a trigger"
      rows={[
        { name: "ArrowLeft / ArrowRight", type: "horizontal", description: "Previous or next trigger. Reversed in right-to-left text." },
        { name: "ArrowUp / ArrowDown", type: "vertical", description: "Previous or next trigger in a vertical bar." },
        { name: "ArrowDown", type: "horizontal", description: "Opens the menu and focuses its first item." },
        { name: "ArrowUp", type: "horizontal", description: "Opens the menu and focuses its last item." },
        { name: "Enter / Space", type: "both", description: "Opens the menu and focuses its first item. Pressing an open trigger closes it." },
        { name: "Home / End", type: "both", description: "First or last trigger." },
        { name: "A letter", type: "both", description: "Typeahead: moves to the next trigger whose name starts with it." },
        { name: "Tab / Shift+Tab", type: "both", description: "Leaves the bar." },
      ]}
    />
    <PropsTable
      caption="Keyboard — in an open menu"
      rows={[
        { name: "ArrowLeft / ArrowRight", type: "horizontal", description: "Previous or next menu, or enter and leave a submenu." },
        { name: "ArrowUp / ArrowDown", type: "items", description: "Previous or next item, skipping separators and labels." },
        { name: "Enter / Space", type: "item", description: "Runs the focused item, closes the menu and returns focus to its trigger." },
        { name: "Home / End", type: "items", description: "First or last item." },
        { name: "Escape", type: "menu", description: "Closes that level and returns focus to its trigger." },
        { name: "Tab", type: "menu", description: "Closes the menu and moves past the bar." },
      ]}
    />
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>While a menu is open, pointing at another enabled trigger opens its menu instead. Crossing a trigger on the way into the open menu keeps the current one; resting on it switches.</li>
      <li>Pointing at a disabled trigger closes the open menu and opens nothing.</li>
      <li>Pointing at a trigger while every menu is closed opens nothing — a press or a key is still needed.</li>
      <li>A disabled trigger keeps <code class="font-mono text-accent">aria-disabled</code> and its place in the arrow-key order, so people can discover it. Set <code class="font-mono text-accent">disabled</code> on the bar to disable all of them at once.</li>
      <li>Name the bar with <code class="font-mono text-accent">aria-label</code> when the page has more than one, or when its purpose isn't obvious from the surrounding heading.</li>
      <li>Wire <code class="font-mono text-accent">controller.focus()</code> to an application shortcut so keyboard users can reach the menus without tabbing through the page.</li>
    </ul>
  </Section>
</div>