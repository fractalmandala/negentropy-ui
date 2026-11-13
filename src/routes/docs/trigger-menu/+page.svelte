<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    TriggerMenu,
    TriggerMenuInput,
    TriggerMenuContent,
    TriggerMenuList,
    TriggerMenuItem,
    TriggerMenuItemIcon,
    TriggerMenuGroup,
    TriggerMenuGroupLabel,
    TriggerMenuSeparator,
    TriggerMenuEmpty,
    TriggerMenuStatus,
    TriggerMenuHint,
    type TriggerDefinition,
  } from "$lib/components/trigger-menu"
  import { Users } from "@lucide/svelte"

  const installCode = `import {
  TriggerMenu, TriggerMenuInput, TriggerMenuContent, TriggerMenuList,
  TriggerMenuItem, TriggerMenuItemIcon, TriggerMenuGroup, TriggerMenuGroupLabel,
  TriggerMenuSeparator, TriggerMenuEmpty, TriggerMenuStatus, TriggerMenuHint,
} from "$lib/components/trigger-menu"`

  const people = [
    { value: "hollis", label: "Hollis Grant" },
    { value: "ines", label: "Inès Moreau" },
    { value: "kofi", label: "Kofi Mensah" },
    { value: "wren", label: "Wren Takahashi" },
    { value: "tomasz", label: "Tomasz Wójcik" },
  ]

  const channels = [
    "announcements",
    "design",
    "design-reviews",
    "engineering",
    "general",
    "launches",
    "support",
  ]

  function searchChannels(query: string, { signal }: { signal: AbortSignal }) {
    return new Promise<string[]>((resolve, reject) => {
      const timer = setTimeout(
        () => resolve(channels.filter((channel) => channel.includes(query.toLowerCase()))),
        400,
      )
      signal.addEventListener("abort", () => {
        clearTimeout(timer)
        reject(signal.reason)
      })
    })
  }

  const multiTriggers: TriggerDefinition[] = [
    { char: "@", items: people },
    { char: "/", boundary: "start", items: ["away", "remind", "search", "status"] },
    { char: "#", type: "channel", items: searchChannels },
  ]

  const composedPeople = [
    { value: "hollis", label: "Hollis Grant" },
    { value: "ines", label: "Inès Moreau" },
    { value: "kofi", label: "Kofi Mensah" },
    { value: "tomasz", label: "Tomasz Wójcik", disabled: true },
  ]

  const statusCommands = [
    {
      value: "status",
      label: "status",
      arguments: [
        { name: "status", hint: "<status>", required: true, items: ["available", "busy", "away"] },
        { name: "until", hint: "[until]", items: ["30m", "1h", "4h", "today"] },
      ],
    },
    { value: "search", label: "search", arguments: [{ name: "query", hint: "<query>", required: true }] },
    { value: "away", label: "away", after: "submit" as const },
    { value: "clear", label: "clear" },
  ]

  const mentionsCode = `<script lang="ts">
  import {
    TriggerMenu, TriggerMenuInput, TriggerMenuStatus,
  } from "$lib/components/trigger-menu"
  const people = [
    { value: "hollis", label: "Hollis Grant" },
    { value: "ines", label: "Inès Moreau" },
    { value: "kofi", label: "Kofi Mensah" },
  ]
  let chosen = $state("none")
<\/script>

<TriggerMenu
  triggers={[{ char: "@", type: "mention", items: people }]}
  onSelect={(value) => (chosen = value)}
>
  <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
    Message
    <TriggerMenuInput />
  </label>
  <div class="sr-only"><TriggerMenuStatus /></div>
</TriggerMenu>
<p class="text-sm text-muted">Inserted {chosen}</p>`

  const triggersCode = `<script lang="ts">
  import {
    type TriggerDefinition, TriggerMenu, TriggerMenuInput, TriggerMenuStatus,
  } from "$lib/components/trigger-menu"

  const people = [{ value: "hollis", label: "Hollis Grant" }]
  const channels = ["design", "engineering", "general", "launches"]

  function searchChannels(query: string, { signal }: { signal: AbortSignal }) {
    return new Promise<string[]>((resolve, reject) => {
      const timer = setTimeout(
        () => resolve(channels.filter((c) => c.includes(query.toLowerCase()))),
        400,
      )
      signal.addEventListener("abort", () => {
        clearTimeout(timer)
        reject(signal.reason)
      })
    })
  }

  const triggers: TriggerDefinition[] = [
    { char: "@", items: people },
    { char: "/", boundary: "start", items: ["away", "remind", "search", "status"] },
    { char: "#", type: "channel", items: searchChannels },
  ]
<\/script>

<TriggerMenu {triggers}>
  <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
    Message
    <TriggerMenuInput />
  </label>
  <div class="sr-only"><TriggerMenuStatus /></div>
</TriggerMenu>`

  const composedCode = `<script lang="ts">
  import { Users } from "@lucide/svelte"
  import {
    TriggerMenu, TriggerMenuInput, TriggerMenuContent, TriggerMenuList,
    TriggerMenuItem, TriggerMenuItemIcon, TriggerMenuGroup, TriggerMenuGroupLabel,
    TriggerMenuSeparator, TriggerMenuEmpty, TriggerMenuStatus,
  } from "$lib/components/trigger-menu"

  const people = [
    { value: "hollis", label: "Hollis Grant" },
    { value: "ines", label: "Inès Moreau" },
    { value: "tomasz", label: "Tomasz Wójcik", disabled: true },
  ]
<\/script>

<TriggerMenu
  triggers={[{
    char: "@",
    spaces: 2,
    maxLength: 30,
    filter: "startsWith",
    insert: (item) => "@" + item.label.split(" ")[0] + " ",
  }]}
>
  <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
    Message
    <TriggerMenuInput />
  </label>
  <div class="sr-only"><TriggerMenuStatus /></div>
  <TriggerMenuContent>
    <TriggerMenuEmpty>No one found</TriggerMenuEmpty>
    <TriggerMenuList>
      <TriggerMenuGroup>
        <TriggerMenuGroupLabel>People</TriggerMenuGroupLabel>
        {#each people as person (person.value)}
          <TriggerMenuItem value={person.value} label={person.label} disabled={person.disabled}>
            {person.label}
            <span class="ml-auto text-xs text-faint">
              {person.disabled ? "Deactivated" : "@" + person.value}
            </span>
          </TriggerMenuItem>
        {/each}
      </TriggerMenuGroup>
      <TriggerMenuSeparator />
      <TriggerMenuItem
        value="here"
        label="here"
        keywords={["everyone", "channel"]}
        onSelect={(value, details) => details.insert("@here ")}
      >
        <TriggerMenuItemIcon><Users aria-hidden="true" /></TriggerMenuItemIcon>
        Notify everyone here
      </TriggerMenuItem>
    </TriggerMenuList>
  </TriggerMenuContent>
</TriggerMenu>`

  const argumentsCode = `<script lang="ts">
  import {
    TriggerMenu, TriggerMenuInput, TriggerMenuHint, TriggerMenuStatus,
  } from "$lib/components/trigger-menu"

  const commands = [
    {
      value: "status",
      label: "status",
      arguments: [
        { name: "status", hint: "<status>", required: true, items: ["available", "busy", "away"] },
        { name: "until", hint: "[until]", items: ["30m", "1h", "4h", "today"] },
      ],
    },
    { value: "away", label: "away", after: "submit" as const },
  ]
  let sent = $state("none")
<\/script>

<form
  class="flex w-full max-w-md flex-col gap-3"
  onsubmit={(event) => {
    event.preventDefault()
    sent = String(new FormData(event.currentTarget).get("message"))
  }}
>
  <TriggerMenu
    triggers={[{ char: "/", boundary: "start", type: "command", items: commands }]}
    onSelect={(value, details) =>
      (sent = ["/" + value, ...Object.values(details.arguments)].join(" "))}
  >
    <label class="flex flex-col gap-1.5 text-sm font-medium text-fg">
      Command
      <TriggerMenuInput name="message" />
    </label>
    <TriggerMenuHint />
    <div class="sr-only"><TriggerMenuStatus /></div>
  </TriggerMenu>
</form>
<p class="text-sm text-muted">Sent {sent}</p>`

  const controlledCode = `<script lang="ts">
  import { TriggerMenu, TriggerMenuInput, TriggerMenuStatus } from "$lib/components/trigger-menu"
  const people = [{ value: "hollis", label: "Hollis Grant" }]
  let open = $state(false)
  let reason = $state("none")
<\/script>

<TriggerMenu
  triggers={[{ char: "@", items: people }]}
  bind:open
  shortcut="ctrl+j"
  onOpenChange={(next, details) => (reason = details.reason)}
>
  <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
    Message
    <TriggerMenuInput />
  </label>
  <div class="sr-only"><TriggerMenuStatus /></div>
</TriggerMenu>
<p class="text-sm text-muted">Open: {open} · last reason: {reason}</p>`

  let mentionChoice = $state("none")
  let composedChoice = $state("none")
  let commandSent = $state("none")
  let controlledOpen = $state(false)
  let controlledReason = $state("none")
</script>

<svelte:head>
  <title>Trigger Menu — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Trigger Menu"
  description="Suggestions at the caret when someone types @, / or #. Wraps the ui-sdk Trigger Menu, which matches the trigger, filters, loads and inserts the choice."
  entry="@ui-sdk/svelte/trigger-menu"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/trigger-menu</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Give the root its <code class="font-mono text-accent">triggers</code> and a
      <code class="font-mono text-accent">TriggerMenuInput</code> to type in. With no
      <code class="font-mono text-accent">TriggerMenuContent</code> among its direct children, the menu
      renders the current trigger's items for you. Always render a
      <code class="font-mono text-accent">TriggerMenuStatus</code>, visually hidden, so counts and loading
      are announced without moving focus out of the field.
    </p>
    <CodeBlock code={mentionsCode} />
    <p class="text-sm text-muted">
      Choosing an item replaces the trigger and the query with the item's
      <code class="font-mono text-accent">label</code> and a space, so
      <code class="font-mono text-accent">@ho</code> becomes
      <code class="font-mono text-accent">@Hollis Grant </code>.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Mentions" description="Type @ and a name. The list opens at the caret, narrows as you type, and Enter inserts the highlighted person. Focus never leaves the field." code={mentionsCode}>
      <div class="flex min-h-56 w-full flex-col items-start gap-3">
        <TriggerMenu
          triggers={[{ char: "@", type: "mention", items: people }]}
          onSelect={(value) => { mentionChoice = value }}
        >
          <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
            Message
            <TriggerMenuInput />
          </label>
          <div class="sr-only"><TriggerMenuStatus /></div>
        </TriggerMenu>
        <p class="text-sm text-muted">Inserted {mentionChoice}</p>
      </div>
    </Demo>

    <Demo title="Several triggers" description="@ lists people, / lists commands only at the start of the text, and # loads channels from a function. A newer query aborts the older load." code={triggersCode}>
      <div class="flex min-h-56 w-full flex-col items-start gap-3">
        <TriggerMenu triggers={multiTriggers}>
          <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
            Message
            <TriggerMenuInput />
          </label>
          <div class="sr-only"><TriggerMenuStatus /></div>
        </TriggerMenu>
        <p class="text-sm text-muted">Type @, / at the start, or # and a channel name.</p>
      </div>
    </Demo>

    <Demo title="Composed items" description="Compose the list yourself for icons, groups, hints and disabled items. keywords adds words to match, and an item's own onSelect can insert something else." code={composedCode}>
      <div class="flex min-h-64 w-full flex-col items-start gap-3">
        <TriggerMenu
          triggers={[{
            char: "@",
            spaces: 2,
            maxLength: 30,
            filter: "startsWith",
            insert: (item) => "@" + item.label.split(" ")[0] + " ",
          }]}
          onSelect={(value) => { composedChoice = value }}
        >
          <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
            Message
            <TriggerMenuInput />
          </label>
          <div class="sr-only"><TriggerMenuStatus /></div>
          <TriggerMenuContent>
            <TriggerMenuEmpty>No one found</TriggerMenuEmpty>
            <TriggerMenuList>
              <TriggerMenuGroup>
                <TriggerMenuGroupLabel>People</TriggerMenuGroupLabel>
                {#each composedPeople as person (person.value)}
                  <TriggerMenuItem value={person.value} label={person.label} disabled={person.disabled}>
                    {person.label}
                    <span class="ml-auto text-xs text-faint">
                      {person.disabled ? "Deactivated" : "@" + person.value}
                    </span>
                  </TriggerMenuItem>
                {/each}
              </TriggerMenuGroup>
              <TriggerMenuSeparator />
              <TriggerMenuItem
                value="here"
                label="here"
                keywords={["everyone", "channel"]}
                onSelect={(value, details) => details.insert("@here ")}
              >
                <TriggerMenuItemIcon><Users aria-hidden="true" /></TriggerMenuItemIcon>
                Notify everyone here
              </TriggerMenuItem>
            </TriggerMenuList>
          </TriggerMenuContent>
        </TriggerMenu>
        <p class="text-sm text-muted">Inserted {composedChoice}</p>
      </div>
    </Demo>

    <Demo title="Commands with arguments" description="TriggerMenuHint shows what is left to type at the caret. Tab accepts a suggestion and moves to the next argument; Enter finishes once only optional ones remain." code={argumentsCode}>
      <div class="flex min-h-56 w-full flex-col items-start gap-3">
        <form
          class="flex w-full max-w-md flex-col gap-3"
          onsubmit={(event) => {
            event.preventDefault()
            commandSent = String(new FormData(event.currentTarget).get("message"))
          }}
        >
          <TriggerMenu
            triggers={[{ char: "/", boundary: "start", type: "command", items: statusCommands }]}
            onSelect={(value, details) => {
              commandSent = ["/" + value, ...Object.values(details.arguments)].join(" ")
            }}
          >
            <label class="flex flex-col gap-1.5 text-sm font-medium text-fg">
              Command
              <TriggerMenuInput name="message" />
            </label>
            <TriggerMenuHint />
            <div class="sr-only"><TriggerMenuStatus /></div>
          </TriggerMenu>
        </form>
        <p class="text-sm text-muted">Sent {commandSent}</p>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:open owns the popup state, and onOpenChange says why it changed. Escape dismisses the match; Control+J reopens it with the caret still inside." code={controlledCode}>
      <div class="flex min-h-52 w-full flex-col items-start gap-3">
        <TriggerMenu
          triggers={[{ char: "@", items: people }]}
          bind:open={controlledOpen}
          shortcut="ctrl+j"
          onOpenChange={(next, details) => (controlledReason = details.reason)}
        >
          <label class="flex w-full max-w-md flex-col gap-1.5 text-sm font-medium text-fg">
            Message
            <TriggerMenuInput />
          </label>
          <div class="sr-only"><TriggerMenuStatus /></div>
        </TriggerMenu>
        <p class="text-sm text-muted">Open: {controlledOpen} · last reason: {controlledReason}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Trigger rule"
      rows={[
        { name: "char", type: "string", description: 'The text that starts a match: "@", "/", "#", or several characters like "[[".' },
        { name: "boundary", type: '"start" | "word" | "any"', default: '"word"', description: "Where a match may start. start matches only at the beginning of the text, so a leading space escapes a command." },
        { name: "spaces", type: "number | boolean", default: "false", description: "Whether the query may contain spaces, or up to how many words, like @next Wednesday." },
        { name: "pattern", type: "RegExp", description: "Characters a query may contain, tested one at a time." },
        { name: "maxLength", type: "number", description: "The longest query before the match ends." },
        { name: "filter", type: "ListFilter", default: '"contains"', description: "How typing narrows data items. Loaded items are not filtered again." },
        { name: "type", type: "string", default: '"mention"', description: "The kind of token a choice inserts, where the editor takes tokens." },
        { name: "insert", type: "(item, details) => string | TokenInsert", description: "What replaces the trigger and query. Defaults to the trigger, the label and a space." },
      ]}
    />
    <PropsTable
      caption="TriggerMenuContent placement"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the caret it opens on. Flips when there isn't room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How it lines up along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", description: "Gap between the line of text and the list, in pixels." },
        { name: "alignOffset", type: "number", description: "Shift along the text, in pixels." },
        { name: "collisionPadding", type: "number", description: "Space to keep from the viewport edges." },
        { name: "anchor", type: "string | Anchor | null", description: "Position against another element, selector or point instead of the caret." },
      ]}
    />
    <p class="text-sm text-muted">
      The popup carries <code class="font-mono text-accent">data-trigger</code>, so each trigger's list can
      look different — commands in a monospace font, for example. Items show
      <code class="font-mono text-accent">data-highlighted</code> and
      <code class="font-mono text-accent">data-disabled</code>, and
      <code class="font-mono text-accent">data-has-icon</code> when they hold an icon; the list shows
      <code class="font-mono text-accent">data-has-icons</code> while any item has one. A loading list is
      marked <code class="font-mono text-accent">aria-busy</code>.
      CSS variables: <code class="font-mono text-accent">--anchor-width</code>,
      <code class="font-mono text-accent">--available-height</code>,
      <code class="font-mono text-accent">--transform-origin</code>,
      <code class="font-mono text-accent">--arrow-offset</code>. The wrapper copies
      <code class="font-mono text-accent">--available-height</code> into
      <code class="font-mono text-accent">--list-height</code> on the popup, because it does not inherit,
      and the list reads it for its maximum height.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="TriggerMenu (root)"
      rows={[
        { name: "triggers", type: "TriggerDefinition[]", description: "Required. The texts that open the menu and what each one lists." },
        { name: "open", type: "boolean", description: "Whether it's open. Bind with bind:open. It shows only while there is a match." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when it wants to open or close. details.reason says why, details.trigger which trigger, details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs after the open or close animation finishes." },
        { name: "onQueryChange", type: "(query, details) => void", description: "Runs when the text after the trigger changes. Read-only. details.argument names the argument being typed." },
        { name: "onSelect", type: "(value, details) => void | Promise", description: "Runs when an item with every required argument is chosen. details.preventDefault() skips the default insertion; details.insert() writes something else." },
        { name: "autoHighlight", type: "boolean", default: "true", description: "Whether the first match is highlighted so Enter and Tab choose it. Set false in a single-line input where Enter submits." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last item to the first." },
        { name: "shortcut", type: "string", default: '"ctrl+space"', description: "Reopens a match dismissed with Escape, with the caret in it." },
        { name: "status", type: "AsyncOptionsStatus", description: "Whether items from outside are loading or failed, for the status and empty parts. Loaders report their own." },
        { name: "pendingAnnouncement", type: "string", description: "What screen readers hear once an onSelect Promise has been pending for a second." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, an outside press, focus leaving and back can close it." },
        { name: "onDismissAttempt", type: "(details) => void", description: "Runs when dismissible refused a deliberate dismissal. Ask to discard changes here." },
        { name: "editor", type: "TextEditorAdapter", description: "The editor to read and write, for one without a part of its own. TriggerMenuInput and a surrounding TokenInput set it." },
        { name: "controller", type: "TriggerMenuController", description: "Open, close, insert and read the match from anywhere via createTriggerMenuController()." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason to the console in development builds." },
      ]}
    />
    <PropsTable
      caption="Items as data"
      rows={[
        { name: "value", type: "string", description: "Identifies the item and is what onSelect reports." },
        { name: "label", type: "string", description: "The text shown, matched and inserted." },
        { name: "keywords", type: "string[]", description: 'More words filtering matches, like ["team"] for a plan called Pro.' },
        { name: "disabled", type: "boolean", default: "false", description: "Keeps it from being chosen. The keyboard skips it in a data list." },
        { name: "after", type: '"compose" | "continue" | "submit"', default: '"compose"', description: "compose closes the menu, continue keeps it open for the text typed after it, submit asks the editor to send. Tab never submits." },
        { name: "arguments", type: "TriggerArgument[]", description: "Typed arguments asked for in order once it's chosen, like /model <name>." },
      ]}
    />
    <PropsTable
      caption="TriggerArgument"
      rows={[
        { name: "name", type: "string", description: "The name it's reported under in details.arguments." },
        { name: "hint", type: "string", description: "Ghost text at the caret until it's typed. Defaults to <name>." },
        { name: "required", type: "boolean", default: "false", description: "Whether Enter can finish the command without it." },
        { name: "items", type: "TriggerMenuData<string> | loader", description: "Suggestions for it. Without them it's free text and no list shows." },
        { name: "allowCustomValue", type: "boolean", default: "true", description: "Whether text matching no suggestion is accepted." },
      ]}
    />
    <PropsTable
      caption="TriggerMenuInput"
      rows={[
        { name: "render", type: "Snippet<[{ props, state }]>", description: "Renders another element, like an input for a single line. The default is a textarea." },
        { name: "name", type: "string", description: "Names the field in a form submission." },
        { name: "class", type: "string", description: "Extra classes merged onto the field." },
        { name: "children", type: "Snippet<[TriggerMenuInputState]>", description: "Receives open and trigger." },
      ]}
    />
    <PropsTable
      caption="TriggerMenuContent / TriggerMenuList"
      rows={[
        { name: "side / align / offsets", type: "placement props", description: "Position the popup. The list itself takes only class and children." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Content stays in the page, hidden, while closed." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element." },
        { name: "children (list)", type: "Snippet<[TriggerMenuContentState]>", description: "Without children the list renders the current trigger's items. With them, state.items holds the visible data items." },
      ]}
    />
    <PropsTable
      caption="TriggerMenuItem"
      rows={[
        { name: "value", type: "string", description: "What onSelect receives when it's chosen." },
        { name: "label", type: "string", description: "The text inserted and matched, when the content isn't plain text." },
        { name: "keywords", type: "string[]", description: "More words filtering matches." },
        { name: "disabled", type: "boolean", default: "false", description: "Cannot be chosen, but can still be highlighted, as the listbox pattern asks." },
        { name: "onSelect", type: "(value, details) => void | Promise", description: "Runs before the menu's onSelect. details.preventDefault() skips the default insertion." },
      ]}
    />
    <PropsTable
      caption="TriggerMenuItemIcon / TriggerMenuHint / TriggerMenuStatus / TriggerMenuEmpty"
      rows={[
        { name: "mirror (icon)", type: "boolean", default: "false", description: "Flips the icon horizontally in right-to-left text, for arrows and chevrons." },
        { name: "children (hint)", type: "Snippet<[TriggerMenuHintState]>", description: "Ghost text at the caret for the arguments still to type. Hidden from screen readers." },
        { name: "children (status)", type: "Snippet<[TriggerMenuStatusState]>", description: "A polite status. By default it says the count and the keys once typing pauses; state gives open, status, loading, count and argument." },
        { name: "children (empty)", type: "Snippet<[TriggerMenuEmptyState]>", description: "Shown while nothing matches. Rendering it keeps the menu open with no matches; state gives loading, empty and query." },
      ]}
    />
    <PropsTable
      caption="TriggerMenuGroup / TriggerMenuGroupLabel / TriggerMenuSeparator / TriggerMenuItems"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element. These parts take no props of their own." },
        { name: "children", type: "Snippet", description: "A group holds items; its label names the group. A separator is hidden from screen readers." },
        { name: "items (TriggerMenuItems)", type: "TriggerMenuData", description: "Renders data items as bare parts, for custom layouts." },
      ]}
    />
    <PropsTable
      caption="TriggerMenuController"
      rows={[
        { name: "open(options?)", type: "(options?) => Promise", description: "Types the trigger at the caret unless a match is already there, and resolves once the menu closes. Never rejects." },
        { name: "setOpen(open, options?)", type: "(open, options?) => boolean", description: "Opens or closes. Opening needs an existing match. Returns false when canceled or already in that state." },
        { name: "close(options?)", type: "(options?) => boolean", description: "Closes without dismissing the match, so typing in it opens it again." },
        { name: "isOpen()", type: "() => boolean", description: "Whether the menu is open." },
        { name: "getQuery()", type: "() => string", description: "The text after the trigger, or after the current argument's start. Empty while closed." },
        { name: "getMatch()", type: "() => TriggerMatch | null", description: "The current match, or null." },
        { name: "insert(content)", type: "(string | Token) => void", description: "Replaces the current match, or inserts at the caret without one." },
        { name: "focus()", type: "() => void", description: "Moves focus to the editor." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <p class="text-sm text-muted">
      Focus stays in the field while the arrow keys move the highlight. A
      <code class="font-mono text-accent">textarea</code> stays a textbox — the only role ARIA allows it —
      and points at the list with <code class="font-mono text-accent">aria-controls</code> and, after an
      arrow key, <code class="font-mono text-accent">aria-activedescendant</code>. An
      <code class="font-mono text-accent">input</code> is a combobox with
      <code class="font-mono text-accent">aria-expanded</code>.
    </p>
    <PropsTable
      caption="Keyboard"
      rows={[
        { name: "ArrowDown / ArrowUp", type: "in field", description: "Move the highlight while the list is open. The caret stays where it was." },
        { name: "Enter", type: "in field", description: "Chooses the highlighted item. In a command's arguments, finishes once only optional ones are left." },
        { name: "Tab", type: "in field", description: "Chooses the highlighted item, or accepts an argument and moves to the next. Never submits." },
        { name: "Escape", type: "in field", description: "Closes the list and dismisses the match, so typing on doesn't reopen it." },
        { name: "Control+Space", type: "in field", description: "Reopens a dismissed match with the caret in it. shortcut changes the key." },
        { name: "Backspace", type: "in arguments", description: "Past an argument's start, goes back to the previous argument." },
        { name: "Command+Z / Control+Z", type: "in field", description: "Undoes the insertion and brings back the query." },
      ]}
    />
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Render a <code class="font-mono text-accent">TriggerMenuStatus</code>: visually hidden beside the field, or at the top of the list. Counts and loading are announced through it, never through the field.</li>
      <li>Give the field a visible label or an <code class="font-mono text-accent">aria-label</code>. A wrapping <code class="font-mono text-accent">label</code> element names it without any extra wiring.</li>
      <li>Put icons in <code class="font-mono text-accent">TriggerMenuItemIcon</code> so they stay out of the item's name, out of filtering and out of the inserted text. An icon-only item still needs an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>A composed disabled item can be highlighted but not chosen; a disabled data item is skipped by the keyboard, as in a native select.</li>
      <li><code class="font-mono text-accent">autoHighlight</code> is visual only: screen readers hear about the highlight once an arrow key moves it, so typed characters keep being echoed.</li>
      <li>Queries match Unicode letters and ignore accents, so typing <code class="font-mono text-accent">Ines</code> finds Inès.</li>
      <li>Inside a Token Input, leave out <code class="font-mono text-accent">TriggerMenuInput</code>: the menu suggests into the token input instead.</li>
    </ul>
  </Section>
</div>