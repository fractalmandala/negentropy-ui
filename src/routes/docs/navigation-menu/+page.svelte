<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuLinkIcon,
    NavigationMenuViewport,
    NavigationMenuIndicator,
    createNavigationMenuController,
  } from "#lib/components/navigation-menu"
  import { Button } from "#lib/components/button"
  import { ArrowRight, ChevronDown, Circle, CircleCheck } from "@lucide/svelte"

  const installCode = `import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger,
  NavigationMenuContent, NavigationMenuLink, NavigationMenuLinkIcon,
  NavigationMenuViewport, NavigationMenuIndicator,
} from "#lib/components/navigation-menu"`

  const gettingStarted = [
    { title: "Button", href: "/docs/button", description: "Actions and commands, in five tones." },
    { title: "Input", href: "/docs/input", description: "Single-line text with a label and a message." },
    { title: "Label", href: "/docs/label", description: "Names a control, and focuses it when pressed." },
    { title: "Field", href: "/docs/field", description: "Label, control and message together." },
  ]

  const components = [
    { title: "Menu", href: "/docs/menu", description: "Actions from a button or a right-click." },
    { title: "Menubar", href: "/docs/menubar", description: "Application menus with one tab stop." },
    { title: "Dialog", href: "/docs/dialog", description: "A decision that interrupts the page." },
    { title: "Tabs", href: "/docs/tabs", description: "One panel at a time, picked from a list." },
    { title: "Select", href: "/docs/select", description: "One value from a list of options." },
    { title: "Accordion", href: "/docs/accordion", description: "Sections that open and close." },
  ]

  const basicCode = `<script lang="ts">
  import { ChevronDown } from "@lucide/svelte"
  import {
    NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger,
    NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport,
  } from "#lib/components/navigation-menu"

  const components = [
    { title: "Menu", href: "/docs/menu", description: "Actions from a button or a right-click." },
    { title: "Dialog", href: "/docs/dialog", description: "A decision that interrupts the page." },
    { title: "Tabs", href: "/docs/tabs", description: "One panel at a time, picked from a list." },
  ]
<\/script>

<NavigationMenu aria-label="Main">
  <NavigationMenuList>
    <NavigationMenuItem value="components">
      <NavigationMenuTrigger>Components <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul class="grid w-[24rem] grid-cols-2 gap-1">
          {#each components as page (page.title)}
            <li>
              <NavigationMenuLink href={page.href}>
                <span>{page.title}</span>
                <span data-slot="hint">{page.description}</span>
              </NavigationMenuLink>
            </li>
          {/each}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" current>Overview</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport sideOffset={8} />
</NavigationMenu>`

  const verticalCode = `<script lang="ts">
  import { ChevronDown } from "@lucide/svelte"
  import {
    NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger,
    NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport,
  } from "#lib/components/navigation-menu"
<\/script>

<NavigationMenu orientation="vertical" aria-label="Sections">
  <NavigationMenuList>
    <NavigationMenuItem value="guides">
      <NavigationMenuTrigger>Guides <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul class="grid w-56 gap-1">
          <li><NavigationMenuLink href="/docs/button">Button</NavigationMenuLink></li>
          <li><NavigationMenuLink href="/docs/input">Input</NavigationMenuLink></li>
          <li><NavigationMenuLink href="/docs/field">Field</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem value="overlays">
      <NavigationMenuTrigger>Overlays <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul class="grid w-56 gap-1">
          <li><NavigationMenuLink href="/docs/dialog">Dialog</NavigationMenuLink></li>
          <li><NavigationMenuLink href="/docs/drawer">Drawer</NavigationMenuLink></li>
          <li><NavigationMenuLink href="/docs/menu">Menu</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/docs/tabs">Tabs</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport side="right" sideOffset={8} />
</NavigationMenu>`

  const clickCode = `<script lang="ts">
  import {
    NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger,
    NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport,
  } from "#lib/components/navigation-menu"
  import { Button } from "#lib/components/button"
  let value = $state<string | null>(null)
<\/script>

<Button tone="outline" onclick={() => (value = "components")}>Open Components</Button>
<Button tone="ghost" onclick={() => (value = null)}>Close</Button>

<NavigationMenu bind:value openOnHover={false} aria-label="Main">
  <NavigationMenuList>
    <NavigationMenuItem value="components">
      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul class="grid w-56 gap-1">
          <li><NavigationMenuLink href="/docs/menu">Menu</NavigationMenuLink></li>
          <li><NavigationMenuLink href="/docs/tabs">Tabs</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem value="guides">
      <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul class="grid w-56 gap-1">
          <li><NavigationMenuLink href="/docs/button">Button</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuViewport />
</NavigationMenu>
<p class="text-sm text-muted">Open item: {value ?? "none"}</p>`

  const popupCode = `<script lang="ts">
  import { ArrowRight, ChevronDown } from "@lucide/svelte"
  import {
    NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger,
    NavigationMenuContent, NavigationMenuLink, NavigationMenuLinkIcon,
    NavigationMenuIndicator,
  } from "#lib/components/navigation-menu"
<\/script>

<NavigationMenu aria-label="Main">
  <NavigationMenuList>
    <NavigationMenuItem value="status">
      <NavigationMenuTrigger>Status <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
      <NavigationMenuContent side="bottom" align="start" sideOffset={8}>
        <ul class="grid w-52 gap-1">
          <li>
            <NavigationMenuLink href="/docs/progress">
              <NavigationMenuLinkIcon><Circle aria-hidden="true" /></NavigationMenuLinkIcon>
              Backlog
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/docs/checkbox">
              <NavigationMenuLinkIcon><CircleCheck aria-hidden="true" /></NavigationMenuLinkIcon>
              Done
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/docs/alert-dialog">
              <NavigationMenuLinkIcon mirror><ArrowRight aria-hidden="true" /></NavigationMenuLinkIcon>
              All issues
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" current>Overview</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
  <NavigationMenuIndicator />
</NavigationMenu>`

  const controllerCode = `<script lang="ts">
  import {
    NavigationMenu, createNavigationMenuController,
  } from "#lib/components/navigation-menu"
  const menu = createNavigationMenuController()
<\/script>

<button onclick={() => menu.setValue("components")}>Browse Components</button>
<button onclick={() => menu.focus()}>Focus the navigation</button>
<NavigationMenu aria-label="Main" controller={menu}>...</NavigationMenu>`

  let controlledValue = $state<string | null>(null)
  const nav = createNavigationMenuController()
</script>

<svelte:head>
  <title>Navigation Menu — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Navigation Menu"
  description="Site links grouped into panels that open from a row of triggers. Wraps the ui-sdk Navigation Menu, which handles hover, focus, keyboard movement and the shared viewport."
  entry="@ui-sdk/svelte/navigation-menu"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/navigation-menu</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Each item holds a trigger and its panel, or a plain link. Give the navigation an
      <code class="font-mono text-accent">aria-label</code>. The viewport holds the open panel and follows
      its size and position, so every section shares one dropdown. This is the disclosure navigation
      pattern — buttons that show groups of ordinary links. For a list of actions, use a
      <a class="text-accent underline" href="/docs/menu">Menu</a> instead.
    </p>
    <CodeBlock code={basicCode} />
    <p class="text-sm text-muted">
      A link with a <code class="font-mono text-accent">&lt;span data-slot="hint"&gt;</code> inside it
      stacks its description under its title. Set
      <code class="font-mono text-accent">current</code> on the link for the page being viewed: it gets
      <code class="font-mono text-accent">aria-current="page"</code> and
      <code class="font-mono text-accent">data-current</code>.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Site navigation" description="Rest the pointer on a trigger to open its panel, or press it. Moving to another trigger switches at once. Tab from an open trigger moves into the panel." code={basicCode}>
      <div class="flex min-h-64 w-full flex-col items-start gap-3">
        <NavigationMenu aria-label="Main">
          <NavigationMenuList>
            <NavigationMenuItem value="getting-started">
              <NavigationMenuTrigger>Getting started <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[24rem] grid-cols-2 gap-1">
                  {#each gettingStarted as page (page.title)}
                    <li>
                      <NavigationMenuLink href={page.href}>
                        <span>{page.title}</span>
                        <span data-slot="hint">{page.description}</span>
                      </NavigationMenuLink>
                    </li>
                  {/each}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="components">
              <NavigationMenuTrigger>Components <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-[26rem] grid-cols-2 gap-1">
                  {#each components as page (page.title)}
                    <li>
                      <NavigationMenuLink href={page.href}>
                        <span>{page.title}</span>
                        <span data-slot="hint">{page.description}</span>
                      </NavigationMenuLink>
                    </li>
                  {/each}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/" current>Overview</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport sideOffset={8} />
        </NavigationMenu>
        <p class="text-sm text-muted">The viewport resizes and moves to follow whichever panel is open.</p>
      </div>
    </Demo>

    <Demo title="Vertical" description="orientation=vertical moves between items with Up and Down and opens panels beside the bar. The chevron stays put instead of rotating." code={verticalCode}>
      <div class="flex min-h-64 w-full flex-col items-start gap-3">
        <NavigationMenu orientation="vertical" aria-label="Sections">
          <NavigationMenuList>
            <NavigationMenuItem value="guides">
              <NavigationMenuTrigger>Guides <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-56 gap-1">
                  <li><NavigationMenuLink href="/docs/button">Button</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/docs/input">Input</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/docs/field">Field</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="overlays">
              <NavigationMenuTrigger>Overlays <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-56 gap-1">
                  <li><NavigationMenuLink href="/docs/dialog">Dialog</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/docs/drawer">Drawer</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/docs/menu">Menu</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/docs/tabs">Tabs</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport side="right" sideOffset={8} />
        </NavigationMenu>
      </div>
    </Demo>

    <Demo title="Click only and controlled" description="openOnHover=false makes it a click-only menu, which suits touch. bind:value owns which panel is open, so a button elsewhere can open one." code={clickCode}>
      <div class="flex min-h-64 w-full flex-col items-start gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <Button tone="outline" onclick={() => (controlledValue = "components")}>Open Components</Button>
          <Button tone="ghost" onclick={() => (controlledValue = null)}>Close</Button>
        </div>
        <NavigationMenu bind:value={controlledValue} openOnHover={false} aria-label="Main">
          <NavigationMenuList>
            <NavigationMenuItem value="components">
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-56 gap-1">
                  <li><NavigationMenuLink href="/docs/menu">Menu</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/docs/tabs">Tabs</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="guides">
              <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-56 gap-1">
                  <li><NavigationMenuLink href="/docs/button">Button</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
        <p class="text-sm text-muted">Open item: {controlledValue ?? "none"}</p>
      </div>
    </Demo>

    <Demo title="Without a viewport" description="Leave the viewport out and each panel is its own popup, placed against its trigger. The indicator sits under the open trigger, or under the current page's link while every panel is closed." code={popupCode}>
      <div class="flex min-h-56 w-full flex-col items-start gap-3">
        <NavigationMenu aria-label="Main">
          <NavigationMenuList>
            <NavigationMenuItem value="status">
              <NavigationMenuTrigger>Status <ChevronDown aria-hidden="true" /></NavigationMenuTrigger>
              <NavigationMenuContent side="bottom" align="start" sideOffset={8}>
                <ul class="grid w-52 gap-1">
                  <li>
                    <NavigationMenuLink href="/docs/progress">
                      <NavigationMenuLinkIcon><Circle aria-hidden="true" /></NavigationMenuLinkIcon>
                      Backlog
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/docs/checkbox">
                      <NavigationMenuLinkIcon><CircleCheck aria-hidden="true" /></NavigationMenuLinkIcon>
                      Done
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/docs/alert-dialog">
                      <NavigationMenuLinkIcon mirror><ArrowRight aria-hidden="true" /></NavigationMenuLinkIcon>
                      All issues
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/" current>Overview</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator />
        </NavigationMenu>
      </div>
    </Demo>

    <Demo title="Opening from anywhere" description="A controller opens, closes and focuses the navigation without controlling its value. Wire it to a command palette or a shortcut." code={controllerCode}>
      <div class="flex min-h-48 w-full flex-col items-start gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <Button tone="outline" onclick={() => nav.setValue("components")}>Browse Components</Button>
          <Button tone="ghost" onclick={() => nav.focus()}>Focus the navigation</Button>
          <Button tone="ghost" onclick={() => nav.close()}>Close</Button>
        </div>
        <NavigationMenu aria-label="Main" controller={nav}>
          <NavigationMenuList>
            <NavigationMenuItem value="components">
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-56 gap-1">
                  <li><NavigationMenuLink href="/docs/menu">Menu</NavigationMenuLink></li>
                  <li><NavigationMenuLink href="/docs/menubar">Menubar</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="guides">
              <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="grid w-56 gap-1">
                  <li><NavigationMenuLink href="/docs/field">Field</NavigationMenuLink></li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="NavigationMenu orientation"
      rows={[
        { name: "horizontal", type: "default", description: "A row. Left and Right move between items; panels open below." },
        { name: "vertical", type: "string", description: "A column. Up and Down move between items; panels open at the inline end. Triggers stretch to the bar's width." },
      ]}
    />
    <PropsTable
      caption="Placement — viewport, or content without one"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the trigger it opens on. Flips when there isn't room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How it lines up with the trigger along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between trigger and panel, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the trigger, in pixels." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space to keep from the viewport edges." },
        { name: "anchor", type: "string | Anchor | null", description: "Position against another element, selector or point. Anchoring to the whole bar gives one dropdown that stays put while its contents change." },
      ]}
    />
    <p class="text-sm text-muted">
      With a viewport, a panel renders inside it and the wrapper drops its own border, background and
      shadow, so the viewport supplies them. Without one, each panel keeps its popup styling.
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-orientation</code>,
      <code class="font-mono text-accent">data-nested</code>,
      <code class="font-mono text-accent">data-side</code>,
      <code class="font-mono text-accent">data-align</code>,
      <code class="font-mono text-accent">data-current</code>,
      <code class="font-mono text-accent">data-visible</code>,
      <code class="font-mono text-accent">data-motion</code>
      (<code class="font-mono text-accent">from-start</code>,
      <code class="font-mono text-accent">from-end</code>,
      <code class="font-mono text-accent">to-start</code>,
      <code class="font-mono text-accent">to-end</code>),
      <code class="font-mono text-accent">data-starting-style</code>,
      <code class="font-mono text-accent">data-ending-style</code>,
      <code class="font-mono text-accent">data-has-icon</code>,
      <code class="font-mono text-accent">data-has-icons</code>.
    </p>
    <p class="text-sm text-muted">
      CSS variables: <code class="font-mono text-accent">--viewport-width</code> and
      <code class="font-mono text-accent">--viewport-height</code> size the viewport;
      <code class="font-mono text-accent">--transform-origin</code> is where it opens from;
      <code class="font-mono text-accent">--available-height</code> caps a panel's height. The indicator
      reads <code class="font-mono text-accent">--active-item-left</code>,
      <code class="font-mono text-accent">--active-item-width</code>,
      <code class="font-mono text-accent">--active-item-top</code> and
      <code class="font-mono text-accent">--active-item-height</code>, relative to its positioned
      ancestor — the wrapper makes the navigation that ancestor.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="NavigationMenu (root)"
      rows={[
        { name: "value", type: "string | null", description: "The open item's value. Bind with bind:value to control; null closes every panel." },
        { name: "defaultValue", type: "string | null", description: "The item open at first, when uncontrolled." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when an item wants to open or the open one to close. details.reason says why; details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the menu finishes opening or closing. Switching items doesn't count." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which arrow keys move between items, and the side panels open on." },
        { name: "openOnHover", type: "boolean", default: "true", description: "Whether resting the pointer on a trigger opens its panel. Pressing always does, so false makes a click-only menu." },
        { name: "delay", type: "number", default: "0", description: "Milliseconds the pointer rests on a trigger before its panel opens. Switching while one is open is immediate." },
        { name: "closeDelay", type: "number", description: "Milliseconds before the open panel closes once the pointer leaves its trigger and the panel." },
        { name: "closeOnSelect", type: "boolean", default: "true", description: "Whether pressing a link closes the menu, like after a route change. A link's own closeOnSelect wins; a press with a modifier key never closes it." },
        { name: "controller", type: "NavigationMenuController", description: "Open, close and focus from anywhere via createNavigationMenuController()." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason to the console in development builds." },
      ]}
    />
    <PropsTable
      caption="NavigationMenuList / NavigationMenuItem"
      rows={[
        { name: "value (item)", type: "string", description: "Identifies the item for value and onValueChange. Generated when left out." },
        { name: "class", type: "string", description: "Extra classes merged onto the element. The list takes no props of its own." },
        { name: "children", type: "Snippet<[state]>", description: "The list receives open and orientation; the item receives open." },
      ]}
    />
    <PropsTable
      caption="NavigationMenuTrigger"
      rows={[
        { name: "disabled", type: "boolean", default: "false", description: "Stops it opening its panel. A native disabled button can't be focused or pressed." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
        { name: "children", type: "Snippet<[NavigationMenuTriggerState]>", description: "Receives open and disabled. Put a chevron after the label; the wrapper rotates it while open." },
      ]}
    />
    <PropsTable
      caption="NavigationMenuContent"
      rows={[
        { name: "side / align / offsets", type: "placement props", description: "Position the panel when there is no viewport. With one, the viewport's placement wins." },
        { name: "anchor", type: "string | Anchor | null", description: "Position against another element, selector or point instead of the trigger." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Stays in the page, hidden, while closed, so crawlers and the server's HTML have every link. Closed content stays in its item and moves into the viewport when it opens." },
        { name: "hiddenUntilFound", type: "boolean", default: "false", description: 'Closed content stays findable with hidden="until-found", so find in page opens its item. Implies keepMounted.' },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element." },
        { name: "children", type: "Snippet<[NavigationMenuContentState]>", description: "Receives open, motion and orientation." },
      ]}
    />
    <PropsTable
      caption="NavigationMenuLink / NavigationMenuLinkIcon"
      rows={[
        { name: "href", type: "string", description: "Where the link goes. Render your router's link through the render snippet for client-side navigation." },
        { name: "current", type: "boolean", default: "false", description: 'Marks the current page with aria-current="page" and data-current.' },
        { name: "closeOnSelect", type: "boolean", description: "Whether pressing it closes the menu. Overrides the menu's closeOnSelect." },
        { name: "mirror (icon)", type: "boolean", default: "false", description: "Flips the icon horizontally in right-to-left text, for arrows and chevrons." },
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Renders another element or component, like a router link." },
      ]}
    />
    <PropsTable
      caption="NavigationMenuViewport / NavigationMenuIndicator"
      rows={[
        { name: "side / align / offsets", type: "placement props", description: "Position the shared viewport. The indicator takes no props of its own." },
        { name: "anchor", type: "string | Anchor | null", description: "Position the viewport against another element, selector or point." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the viewport into this element." },
        { name: "children (viewport)", type: "Snippet<[NavigationMenuViewportState]>", description: "Receives open and orientation. The open panel renders inside it." },
      ]}
    />
    <PropsTable
      caption="NavigationMenuController"
      rows={[
        { name: "getValue()", type: "() => string | null", description: "The open item's value, or null when every panel is closed." },
        { name: "setValue(value, options?)", type: "(value, options?) => boolean", description: "Opens an item's panel, or closes the open one with null. Returns false when canceled." },
        { name: "isOpen()", type: "() => boolean", description: "Whether a panel is open." },
        { name: "close(options?)", type: "(options?) => boolean", description: "Closes the open panel. Returns false when canceled or already closed." },
        { name: "focus(value?)", type: "(value?) => void", description: "Moves focus to an item's trigger: the open one, or the first without a value." },
      ]}
    />
    <p class="text-sm text-muted">
      Every controller write takes an optional <code class="font-mono text-accent">{`{ reason, event }`}</code>
      passed to <code class="font-mono text-accent">onValueChange</code>. Reasons include
      <code class="font-mono text-accent">trigger-hover</code>,
      <code class="font-mono text-accent">trigger-press</code>,
      <code class="font-mono text-accent">link-press</code>,
      <code class="font-mono text-accent">escape-key</code>,
      <code class="font-mono text-accent">outside-press</code>,
      <code class="font-mono text-accent">focus-out</code>,
      <code class="font-mono text-accent">find-in-page</code> and
      <code class="font-mono text-accent">imperative</code>.
    </p>
  </Section>

  <Section id="accessibility" title="Accessibility">
    <p class="text-sm text-muted">
      Follows the WAI-ARIA disclosure navigation pattern: a
      <code class="font-mono text-accent">navigation</code> landmark with a list of buttons that show and
      hide groups of ordinary links. Triggers advertise their panel with
      <code class="font-mono text-accent">aria-expanded</code> and
      <code class="font-mono text-accent">aria-controls</code>. Name the landmark with
      <code class="font-mono text-accent">aria-label</code>.
    </p>
    <PropsTable
      caption="Keyboard"
      rows={[
        { name: "Tab / Shift+Tab", type: "closed", description: "Moves through the triggers and top-level links in order, like any links on a page." },
        { name: "Enter / Space", type: "trigger", description: "Opens its panel and leaves focus on the trigger. Space toggles." },
        { name: "Tab", type: "open trigger", description: "Moves into the panel, wherever it renders. Shift+Tab from its first link returns to the trigger." },
        { name: "Tab", type: "last link", description: "Moves on to the next item. Focus leaving the navigation closes it." },
        { name: "ArrowLeft / ArrowRight", type: "top level", description: "Previous or next item in a horizontal menu. Up and Down in a vertical one. Nothing wraps." },
        { name: "ArrowDown", type: "trigger", description: "Opens the panel and moves into it. The inline end in a vertical menu." },
        { name: "ArrowUp / ArrowDown", type: "in panel", description: "Move between the links. Left and Right also work in a horizontal menu." },
        { name: "Home / End", type: "both", description: "First or last item, or first or last link in a panel." },
        { name: "Escape", type: "open", description: "Closes the panel and returns focus to its trigger." },
      ]}
    />
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Keys pressed with a modifier, like Alt+Left for Back, are left to the browser.</li>
      <li>Touch screens have no hover: a tap on a trigger opens its panel and another tap closes it. Set <code class="font-mono text-accent">openOnHover</code> false for a click-only menu everywhere.</li>
      <li>Opening on hover leaves focus where it was, so a keyboard user's place is never stolen.</li>
      <li>Links are ordinary anchors: they keep their href, work with a modifier key to open a new tab, and are reachable by find in page with <code class="font-mono text-accent">hiddenUntilFound</code>.</li>
      <li>Put decorative icons in <code class="font-mono text-accent">NavigationMenuLinkIcon</code> so they stay out of the link's name. An icon-only link still needs an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>The indicator is hidden from screen readers; it only marks the open trigger or the current page's link.</li>
      <li>Use a <a class="text-accent underline" href="/docs/menu">Menu</a> for actions. A navigation menu is for links, and its panels are not focus traps.</li>
    </ul>
  </Section>
</div>