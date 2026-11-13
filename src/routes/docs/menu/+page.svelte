<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Menu,
    MenuTrigger,
    MenuContextTrigger,
    MenuContent,
    MenuItem,
    MenuItemIcon,
    MenuItemIndicator,
    MenuCheckboxItem,
    MenuRadioGroup,
    MenuRadioItem,
    MenuGroupLabel,
    MenuSeparator,
    MenuSub,
    MenuSubTrigger,
    MenuSubContent,
  } from "$lib/components/menu"
  import { Button } from "$lib/components/button"
  import { Check, ChevronRight, Copy, Download, Link, Mail, Share } from "@lucide/svelte"

  const installCode = `import {
  Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator,
  MenuCheckboxItem, MenuRadioGroup, MenuRadioItem, MenuItemIndicator,
  MenuGroup, MenuGroupLabel, MenuItemIcon, MenuSub, MenuSubTrigger, MenuSubContent,
} from "$lib/components/menu"`

  const basicCode = `<script lang="ts">
  import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator } from "$lib/components/menu"
  let action = $state("none")
<\/script>

<Menu onAction={(value) => (action = value)}>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuContent>
    <MenuItem value="rename">Rename</MenuItem>
    <MenuItem value="duplicate">Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem value="delete" destructive>Delete</MenuItem>
  </MenuContent>
</Menu>
<p class="text-sm text-muted">Last action: {action}</p>`

  const iconsCode = `<script lang="ts">
  import { Menu, MenuTrigger, MenuContent, MenuItem, MenuItemIcon, MenuSeparator } from "$lib/components/menu"
  import { Copy, Download, Link, Mail, Share } from "@lucide/svelte"
  let action = $state("none")
<\/script>

<Menu onAction={(value) => (action = value)}>
  <MenuTrigger tone="ghost"><Share aria-hidden="true" /> Share</MenuTrigger>
  <MenuContent>
    <MenuItem value="copy-link" shortcut="mod+c">
      <MenuItemIcon><Link aria-hidden="true" /></MenuItemIcon>
      Copy link
    </MenuItem>
    <MenuItem value="email">
      <MenuItemIcon><Mail aria-hidden="true" /></MenuItemIcon>
      Email
    </MenuItem>
    <MenuItem value="copy">
      <MenuItemIcon><Copy aria-hidden="true" /></MenuItemIcon>
      Copy
    </MenuItem>
    <MenuSeparator />
    <MenuItem value="download" shortcut="mod+s">
      <MenuItemIcon><Download aria-hidden="true" /></MenuItemIcon>
      Download
    </MenuItem>
  </MenuContent>
</Menu>
<p class="text-sm text-muted">Last action: {action}</p>`

  const settingsCode = `<script lang="ts">
  import { Check } from "@lucide/svelte"
  import {
    Menu, MenuTrigger, MenuContent, MenuCheckboxItem, MenuItemIndicator,
    MenuRadioGroup, MenuRadioItem, MenuGroupLabel, MenuSeparator,
  } from "$lib/components/menu"
  let statusBar = $state(true)
  let position = $state<string | null>("bottom")
<\/script>

<Menu>
  <MenuTrigger>View</MenuTrigger>
  <MenuContent>
    <MenuCheckboxItem value="status-bar" bind:checked={statusBar}>
      <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
      Status bar
    </MenuCheckboxItem>
    <MenuCheckboxItem value="minimap" defaultChecked>
      <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
      Minimap
    </MenuCheckboxItem>
    <MenuSeparator />
    <MenuRadioGroup name="position" bind:value={position}>
      <MenuGroupLabel>Panel position</MenuGroupLabel>
      {#each ["top", "bottom", "right"] as option (option)}
        <MenuRadioItem value={option}>
          <MenuItemIndicator />
          {option}
        </MenuRadioItem>
      {/each}
    </MenuRadioGroup>
  </MenuContent>
</Menu>
<p class="text-sm text-muted">Status bar {statusBar ? "on" : "off"} · panel {position}</p>`

  const submenuCode = `<script lang="ts">
  import { ChevronRight } from "@lucide/svelte"
  import {
    Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator,
    MenuSub, MenuSubTrigger, MenuSubContent,
  } from "$lib/components/menu"
  let action = $state("none")
<\/script>

<Menu onAction={(value) => (action = value)}>
  <MenuTrigger>Edit</MenuTrigger>
  <MenuContent>
    <MenuItem value="undo" shortcut="mod+z">Undo</MenuItem>
    <MenuItem value="redo" shortcut="mod+shift+z">Redo</MenuItem>
    <MenuSeparator />
    <MenuSub>
      <MenuSubTrigger>Find <ChevronRight aria-hidden="true" /></MenuSubTrigger>
      <MenuSubContent>
        <MenuItem value="find" shortcut="mod+f">Find…</MenuItem>
        <MenuItem value="find-next" shortcut="mod+g">Find next</MenuItem>
        <MenuItem value="find-previous" shortcut="mod+shift+g">Find previous</MenuItem>
      </MenuSubContent>
    </MenuSub>
    <MenuSub>
      <MenuSubTrigger>Transform <ChevronRight aria-hidden="true" /></MenuSubTrigger>
      <MenuSubContent>
        <MenuItem value="uppercase">Uppercase</MenuItem>
        <MenuItem value="lowercase">Lowercase</MenuItem>
      </MenuSubContent>
    </MenuSub>
  </MenuContent>
</Menu>
<p class="text-sm text-muted">Last action: {action}</p>`

  const contextCode = `<script lang="ts">
  import { Menu, MenuContextTrigger, MenuContent, MenuItem, MenuSeparator } from "$lib/components/menu"
  let action = $state("none")
<\/script>

<Menu onAction={(value) => (action = value)}>
  <MenuContextTrigger tabindex={0}>Right-click or long-press here</MenuContextTrigger>
  <MenuContent>
    <MenuItem value="back">Back</MenuItem>
    <MenuItem value="forward" disabled>Forward</MenuItem>
    <MenuItem value="reload">Reload</MenuItem>
    <MenuSeparator />
    <MenuItem value="save">Save page as…</MenuItem>
  </MenuContent>
</Menu>
<p class="text-sm text-muted">Last action: {action}</p>`

  const controlledCode = `<script lang="ts">
  import { Menu, MenuTrigger, MenuContent, MenuItem } from "$lib/components/menu"
  import { Button } from "$lib/components/button"
  let open = $state(false)
<\/script>

<Button tone="outline" onclick={() => (open = true)}>Open from outside</Button>
<Menu bind:open>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuContent>
    <MenuItem value="rename">Rename</MenuItem>
    <MenuItem value="duplicate">Duplicate</MenuItem>
  </MenuContent>
</Menu>
<p class="text-sm text-muted">Open: {open}</p>`

  let basicAction = $state("none")
  let iconAction = $state("none")
  let statusBar = $state(true)
  let position = $state<string | null>("bottom")
  let submenuAction = $state("none")
  let contextAction = $state("none")
  let controlled = $state(false)
</script>

<svelte:head>
  <title>Menu — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Menu"
  description="Choose actions and settings from a button or a right-click. Wraps the ui-sdk Menu, which handles focus, arrow keys, typeahead, submenus and dismissal."
  entry="@ui-sdk/svelte/menu"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/menu</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the trigger and the content inside the root. Give each item a
      <code class="font-mono text-accent">value</code> and handle
      <code class="font-mono text-accent">onAction</code> on the menu to run the chosen command.
      A separator divides items without becoming a focus stop.
    </p>
    <CodeBlock code={basicCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Open it and choose an item with the pointer, or the arrow keys and Enter. Delete is destructive." code={basicCode}>
      <div class="flex min-h-52 w-full flex-col items-start gap-3">
        <Menu onAction={(value) => (basicAction = value)}>
          <MenuTrigger>Actions</MenuTrigger>
          <MenuContent>
            <MenuItem value="rename">Rename</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem value="delete" destructive>Delete</MenuItem>
          </MenuContent>
        </Menu>
        <p class="text-sm text-muted">Last action: {basicAction}</p>
      </div>
    </Demo>

    <Demo title="Icons and shortcuts" description="Icons live in MenuItemIcon so screen readers and typeahead skip them. shortcut shows a platform hint and sets aria-keyshortcuts." code={iconsCode}>
      <div class="flex min-h-52 w-full flex-col items-start gap-3">
        <Menu onAction={(value) => (iconAction = value)}>
          <MenuTrigger tone="ghost"><Share aria-hidden="true" /> Share</MenuTrigger>
          <MenuContent>
            <MenuItem value="copy-link" shortcut="mod+c">
              <MenuItemIcon><Link aria-hidden="true" /></MenuItemIcon>
              Copy link
            </MenuItem>
            <MenuItem value="email">
              <MenuItemIcon><Mail aria-hidden="true" /></MenuItemIcon>
              Email
            </MenuItem>
            <MenuItem value="copy">
              <MenuItemIcon><Copy aria-hidden="true" /></MenuItemIcon>
              Copy
            </MenuItem>
            <MenuSeparator />
            <MenuItem value="download" shortcut="mod+s">
              <MenuItemIcon><Download aria-hidden="true" /></MenuItemIcon>
              Download
            </MenuItem>
          </MenuContent>
        </Menu>
        <p class="text-sm text-muted">Last action: {iconAction}</p>
      </div>
    </Demo>

    <Demo title="Checkboxes and radio items" description="Checkbox and radio items keep the menu open so several settings can change in one visit. Both bind two-way." code={settingsCode}>
      <div class="flex min-h-64 w-full flex-col items-start gap-3">
        <Menu>
          <MenuTrigger>View</MenuTrigger>
          <MenuContent>
            <MenuCheckboxItem value="status-bar" bind:checked={statusBar}>
              <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
              Status bar
            </MenuCheckboxItem>
            <MenuCheckboxItem value="minimap" defaultChecked>
              <MenuItemIndicator keepMounted><Check aria-hidden="true" /></MenuItemIndicator>
              Minimap
            </MenuCheckboxItem>
            <MenuSeparator />
            <MenuRadioGroup name="position" bind:value={position}>
              <MenuGroupLabel>Panel position</MenuGroupLabel>
              {#each ["top", "bottom", "right"] as option (option)}
                <MenuRadioItem value={option}>
                  <MenuItemIndicator />
                  {option}
                </MenuRadioItem>
              {/each}
            </MenuRadioGroup>
          </MenuContent>
        </Menu>
        <p class="text-sm text-muted">Status bar {statusBar ? "on" : "off"} · panel {position}</p>
      </div>
    </Demo>

    <Demo title="Submenus" description="Hover or press the arrow toward a submenu to open it. Escape closes only that level and returns focus to its trigger." code={submenuCode}>
      <div class="flex min-h-56 w-full flex-col items-start gap-3">
        <Menu onAction={(value) => (submenuAction = value)}>
          <MenuTrigger>Edit</MenuTrigger>
          <MenuContent>
            <MenuItem value="undo" shortcut="mod+z">Undo</MenuItem>
            <MenuItem value="redo" shortcut="mod+shift+z">Redo</MenuItem>
            <MenuSeparator />
            <MenuSub>
              <MenuSubTrigger>Find <ChevronRight aria-hidden="true" /></MenuSubTrigger>
              <MenuSubContent>
                <MenuItem value="find" shortcut="mod+f">Find…</MenuItem>
                <MenuItem value="find-next" shortcut="mod+g">Find next</MenuItem>
                <MenuItem value="find-previous" shortcut="mod+shift+g">Find previous</MenuItem>
              </MenuSubContent>
            </MenuSub>
            <MenuSub>
              <MenuSubTrigger>Transform <ChevronRight aria-hidden="true" /></MenuSubTrigger>
              <MenuSubContent>
                <MenuItem value="uppercase">Uppercase</MenuItem>
                <MenuItem value="lowercase">Lowercase</MenuItem>
              </MenuSubContent>
            </MenuSub>
          </MenuContent>
        </Menu>
        <p class="text-sm text-muted">Last action: {submenuAction}</p>
      </div>
    </Demo>

    <Demo title="Context menu" description="MenuContextTrigger opens at the pointer on a right-click or long press, and on Shift+F10 when focused." code={contextCode}>
      <div class="flex min-h-52 w-full flex-col items-start gap-3">
        <Menu onAction={(value) => (contextAction = value)}>
          <MenuContextTrigger tabindex={0}>Right-click or long-press here</MenuContextTrigger>
          <MenuContent>
            <MenuItem value="back">Back</MenuItem>
            <MenuItem value="forward" disabled>Forward</MenuItem>
            <MenuItem value="reload">Reload</MenuItem>
            <MenuSeparator />
            <MenuItem value="save">Save page as…</MenuItem>
          </MenuContent>
        </Menu>
        <p class="text-sm text-muted">Last action: {contextAction}</p>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:open lets a parent open and close the menu. onOpenChange carries a reason and can cancel the change." code={controlledCode}>
      <div class="flex min-h-48 w-full flex-col items-start gap-3">
        <div class="flex flex-wrap items-center gap-3">
          <Button tone="outline" onclick={() => (controlled = true)}>Open from outside</Button>
          <Menu bind:open={controlled}>
            <MenuTrigger>Actions</MenuTrigger>
            <MenuContent>
              <MenuItem value="rename">Rename</MenuItem>
              <MenuItem value="duplicate">Duplicate</MenuItem>
            </MenuContent>
          </Menu>
        </div>
        <p class="text-sm text-muted">Open: {controlled}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="MenuTrigger tone"
      rows={[
        { name: "outline", type: "default", description: "Bordered surface — the standard menu button." },
        { name: "solid", type: "string", description: "Filled accent — a primary action that opens a menu." },
        { name: "ghost", type: "string", description: "Quiet — for toolbars and icon-led triggers." },
      ]}
    />
    <PropsTable
      caption="MenuTrigger size"
      rows={[
        { name: "md", type: "default", description: "36px tall, 14px text." },
        { name: "sm", type: "string", description: "32px tall, 13px text. Menubar triggers use this height automatically." },
      ]}
    />
    <PropsTable
      caption="MenuContent placement"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the trigger it opens on. Flips when there isn't room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How it lines up along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between trigger and menu, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the trigger, in pixels." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space to keep from the viewport edges." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-highlighted</code>,
      <code class="font-mono text-accent">data-checked</code>,
      <code class="font-mono text-accent">data-unchecked</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-destructive</code>,
      <code class="font-mono text-accent">data-pending</code>,
      <code class="font-mono text-accent">data-side</code>,
      <code class="font-mono text-accent">data-align</code>,
      <code class="font-mono text-accent">data-presentation</code>.
      CSS variables: <code class="font-mono text-accent">--anchor-width</code>,
      <code class="font-mono text-accent">--available-height</code>,
      <code class="font-mono text-accent">--transform-origin</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Menu (root)"
      rows={[
        { name: "open", type: "boolean", description: "Whether it's open. Bind with bind:open to control." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Starts open when uncontrolled." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when it wants to open or close. details.reason says why; details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the open or close animation finishes." },
        { name: "onAction", type: "(value, details) => unknown", description: "Runs for every plain item, including submenu items. Return a Promise to keep the item pending and the menu open until it settles." },
        { name: "onCheckedChange", type: "(checked, details) => void", description: "Runs when any checkbox item toggles; details.value names it." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when any radio group changes; details.group names it." },
        { name: "onPayloadChange", type: "(payload, details) => void", description: "Runs when the content's payload changes. details.cancel() keeps the previous one." },
        { name: "items", type: "MenuData", description: "The menu as data. Renders the content unless you place a MenuContent of your own, and registers item shortcuts." },
        { name: "itemShortcuts", type: "boolean", default: "true", description: "Whether a data menu runs its items' shortcuts while closed." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last item to the first." },
        { name: "delay", type: "number", default: "100", description: "Milliseconds the pointer rests on a submenu trigger before it opens." },
        { name: "presentation", type: '"auto" | "popover" | "sheet"', default: '"popover"', description: "sheet slides up from the bottom and can be swiped away; auto does that on small touch screens." },
        { name: "modal", type: 'boolean | "pointer"', default: '"pointer"', description: "pointer consumes an outside press while closing; true also locks scroll and makes the page inert; false lets the press through." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, outside presses, focus leaving and back can close it." },
        { name: "onDismissAttempt", type: "(details) => void", description: "Runs when dismissible refused a deliberate dismissal. Ask to discard changes here." },
        { name: "pendingAnnouncement", type: "string", default: '"Loading"', description: "What screen readers hear once an item has been pending for a second." },
        { name: "controller", type: "MenuController", description: "Open, close and inspect from anywhere via createMenuController()." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
      ]}
    />
    <PropsTable
      caption="MenuTrigger"
      rows={[
        { name: "tone", type: '"outline" | "solid" | "ghost"', default: '"outline"', description: "Visual style added by the wrapper." },
        { name: "size", type: '"sm" | "md"', default: '"md"', description: "Height and padding added by the wrapper." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops it opening the menu. A native disabled button cannot be focused." },
        { name: "focusableWhenDisabled", type: "boolean", default: "false", description: "Keeps a disabled trigger in the tab order with aria-disabled, so it can host a tooltip." },
        { name: "payload", type: "unknown", description: "Data for the content to render when this trigger opens the menu." },
        { name: "shortcut", type: "string", description: 'A shortcut that opens the menu from anywhere, like "mod+j". Sets aria-keyshortcuts.' },
        { name: "controller", type: "MenuController", description: "Connects a trigger outside the menu, like one per table row." },
      ]}
    />
    <PropsTable
      caption="MenuContextTrigger"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Leaves the browser's own context menu available in this area." },
        { name: "payload", type: "unknown", description: "Data for the content to render when this area opens the menu." },
        { name: "controller", type: "MenuController", description: "Connects an area outside the menu." },
        { name: "tabindex", type: "number", description: "Give the area a tab stop so Shift+F10 and the context-menu key can open it." },
      ]}
    />
    <PropsTable
      caption="MenuContent / MenuSubContent"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the anchor it opens on. Submenus open to the side, mirrored in right-to-left." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How it lines up with the anchor along that side." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between anchor and popup, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the anchor. Submenus line their first item up with the trigger." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space to keep from the viewport edges." },
        { name: "arrowPadding", type: "number", description: "Space between the arrow and the popup's corners." },
        { name: "anchor", type: "string | Anchor | null", description: "Position against this instead of the trigger: an element, selector, or point." },
        { name: "finalFocus", type: "PopupFocusTarget", default: '"trigger"', description: 'Where focus goes on close. "none" leaves it where the action put it.' },
        { name: "keepMounted", type: "boolean", default: "false", description: "Stays in the page, hidden, while closed, for animation libraries." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element. Submenus stay inside their parent's popup." },
        { name: "children", type: "Snippet<[MenuContentState]>", description: "Receives state, including payload typed by the controller." },
      ]}
    />
    <PropsTable
      caption="MenuItem"
      rows={[
        { name: "value", type: "string", description: "Passed to onAction when the item runs." },
        { name: "label", type: "string", description: "The text typeahead matches when the content isn't plain text. Not the accessible name." },
        { name: "disabled", type: "boolean", default: "false", description: "Keeps it focusable but stops it running, as the menu pattern asks." },
        { name: "destructive", type: "boolean", default: "false", description: "Styles it as dangerous. Sets data-destructive." },
        { name: "shortcut", type: "string", description: 'Shows ⌘N on Apple platforms and Ctrl+N elsewhere, and sets aria-keyshortcuts.' },
        { name: "closeOnSelect", type: "boolean", default: "true", description: "Whether running it closes the menu." },
        { name: "onSelect", type: "(event) => unknown", description: "Runs before onAction. event.preventDefault() keeps the menu open and skips onAction. Return a Promise to stay pending." },
      ]}
    />
    <PropsTable
      caption="MenuCheckboxItem"
      rows={[
        { name: "value", type: "string", description: "Required. Identifies the item in onCheckedChange." },
        { name: "checked", type: "boolean", description: "Whether it's checked. Bind with bind:checked to control." },
        { name: "defaultChecked", type: "boolean", default: "false", description: "Starts checked when uncontrolled." },
        { name: "onCheckedChange", type: "(checked, details) => void", description: "Runs when it wants to toggle. details.cancel() stops it." },
        { name: "closeOnSelect", type: "boolean", default: "false", description: "Whether toggling closes the menu." },
        { name: "label", type: "string", description: "The text typeahead matches." },
        { name: "disabled", type: "boolean", default: "false", description: "Focusable but cannot toggle." },
      ]}
    />
    <PropsTable
      caption="MenuRadioGroup / MenuRadioItem"
      rows={[
        { name: "value (group)", type: "string | null", description: "The selected value. Bind with bind:value. null selects nothing." },
        { name: "defaultValue", type: "string | null", description: "Selected at first, when uncontrolled." },
        { name: "name", type: "string", description: "Identifies the group in the menu's onValueChange. Defaults to a generated id." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when the selection wants to change. details.cancel() stops it." },
        { name: "value (item)", type: "string", description: "Required. Selected in the group when the item is chosen." },
        { name: "closeOnSelect", type: "boolean", default: "false", description: "Whether choosing the item closes the menu." },
        { name: "disabled", type: "boolean", default: "false", description: "Focusable but cannot be chosen." },
      ]}
    />
    <PropsTable
      caption="MenuItemIndicator / MenuItemIcon"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "Indicator stays in the page while unchecked, so its space is preserved and both states can be styled." },
        { name: "mirror", type: "boolean", default: "false", description: "Icon flips horizontally in right-to-left text, for arrows and chevrons." },
        { name: "children", type: "Snippet", description: "The check or dot for an indicator; the SVG for an icon. An empty indicator renders a dot." },
      ]}
    />
    <PropsTable
      caption="MenuSub / MenuSubTrigger"
      rows={[
        { name: "open", type: "boolean", description: "Whether the submenu is open. Bind with bind:open." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Starts open when uncontrolled." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when it wants to open or close. details.cancel() stops it." },
        { name: "delay", type: "number", default: "100", description: "Hover wait for submenus directly inside this one." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap within the submenu." },
        { name: "controller", type: "MenuController", description: "Opens and inspects the submenu. Outside triggers cannot connect to it." },
        { name: "disabled (trigger)", type: "boolean", default: "false", description: "Focusable but cannot open its submenu." },
      ]}
    />
    <PropsTable
      caption="MenuGroup / MenuGroupLabel / MenuSeparator / MenuShortcut / MenuItems"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element. These parts take no props of their own." },
        { name: "children", type: "Snippet", description: "Group holds items; GroupLabel names the group and must sit in a Group or RadioGroup." },
        { name: "items (MenuItems)", type: "MenuData", description: "Renders a data menu's items as bare parts, for custom layouts." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <p class="text-sm text-muted">
      Follows the WAI-ARIA menu button pattern. The trigger advertises its menu with
      <code class="font-mono text-accent">aria-haspopup</code> and
      <code class="font-mono text-accent">aria-expanded</code>; the content is a
      <code class="font-mono text-accent">menu</code> of
      <code class="font-mono text-accent">menuitem</code>,
      <code class="font-mono text-accent">menuitemcheckbox</code> and
      <code class="font-mono text-accent">menuitemradio</code> elements.
    </p>
    <PropsTable
      caption="Keyboard"
      rows={[
        { name: "Enter / Space", type: "trigger", description: "Opens the menu and focuses the first item." },
        { name: "ArrowDown", type: "trigger", description: "Opens the menu and focuses the first item." },
        { name: "ArrowUp", type: "trigger", description: "Opens the menu and focuses the last item." },
        { name: "ArrowDown / ArrowUp", type: "in menu", description: "Move between items, skipping separators and labels. Wrap at both ends unless loop is false." },
        { name: "Home / End", type: "in menu", description: "First or last item." },
        { name: "A letter", type: "in menu", description: "Typeahead: moves to the next item starting with it. Several characters quickly match the whole prefix." },
        { name: "Enter / Space", type: "on item", description: "Runs the item, closes the menu and returns focus to the trigger." },
        { name: "ArrowRight", type: "submenu trigger", description: "Opens the submenu and focuses its first item. Mirrored in right-to-left text." },
        { name: "ArrowLeft / Escape", type: "in submenu", description: "Closes that level only and returns focus to its trigger." },
        { name: "Escape", type: "in menu", description: "Closes the menu and returns focus to the trigger. Leaves it open while an input method is composing." },
        { name: "Tab", type: "in menu", description: "Closes the menu and moves focus on." },
      ]}
    />
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Disabled items stay focusable so people can discover them, but cannot run or open a submenu. A disabled trigger is a native disabled button unless <code class="font-mono text-accent">focusableWhenDisabled</code> is set.</li>
      <li>Checkbox and radio items keep the menu open by default; <code class="font-mono text-accent">closeOnSelect</code> changes either default.</li>
      <li>Put decorative icons in <code class="font-mono text-accent">MenuItemIcon</code> so they stay out of the accessible name and out of typeahead. An icon-only item still needs an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>When an item's content isn't plain text, set <code class="font-mono text-accent">label</code> for typeahead and <code class="font-mono text-accent">aria-label</code> for the accessible name — they are different things.</li>
      <li>A pending item gets <code class="font-mono text-accent">aria-busy</code> and <code class="font-mono text-accent">aria-disabled</code>, and after a second screen readers hear <code class="font-mono text-accent">pendingAnnouncement</code>.</li>
      <li>Give a context area a tab stop so Shift+F10 and the context-menu key open it from the keyboard.</li>
    </ul>
  </Section>
</div>