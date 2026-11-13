<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandGroupLabel,
    CommandItem,
    CommandItemIcon,
    CommandItemText,
    CommandShortcut,
    CommandSeparator,
    CommandEmpty,
    CommandStatus,
    CommandPage,
    createCommandController,
  } from "#lib/components/command"
  import {
    Dialog,
    DialogTrigger,
    DialogBackdrop,
    DialogContent,
    DialogTitle,
  } from "#lib/components/dialog"
  import { Button } from "#lib/components/button"
  import {
    Search,
    Calendar,
    User,
    CreditCard,
    Settings,
    Calculator,
    Sun,
    Moon,
    Monitor,
    Palette,
    Printer,
    FileText,
    LoaderCircle,
  } from "@lucide/svelte"

  const installCode = `import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandGroupLabel,
  CommandItem,
  CommandItemIcon,
  CommandItemText,
  CommandShortcut,
  CommandSeparator,
  CommandEmpty,
  CommandStatus,
  CommandPage,
  createCommandController,
} from "#lib/components/command"`

  const usageCode = `<script lang="ts">
  import { Search } from "@lucide/svelte"

  let ran = $state("")
<\/script>

<Command onAction={(value) => (ran = value)}>
  <div class="flex items-center gap-2 border-b border-line px-3 text-muted">
    <Search class="size-4 shrink-0" aria-hidden="true" />
    <CommandInput aria-label="Search commands" class="border-b-0 px-0" />
  </div>
  <CommandEmpty>No results found.</CommandEmpty>
  <CommandList>
    <CommandGroup>
      <CommandGroupLabel>Suggestions</CommandGroupLabel>
      <CommandItem value="calendar">Calendar</CommandItem>
      <CommandItem value="profile">Profile</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

<p class="text-sm text-muted">Ran: {ran || "nothing yet"}</p>`

  const iconsCode = `<Command onAction={(value) => (ran = value)}>
  <CommandInput aria-label="Search commands" />
  <CommandEmpty>No results found.</CommandEmpty>
  <CommandList>
    <CommandGroup>
      <CommandGroupLabel>Suggestions</CommandGroupLabel>
      <CommandItem value="calendar">
        <CommandItemIcon><Calendar /></CommandItemIcon>
        <CommandItemText>Calendar</CommandItemText>
      </CommandItem>
      <CommandItem value="calculator" disabled>
        <CommandItemIcon><Calculator /></CommandItemIcon>
        <CommandItemText>Calculator</CommandItemText>
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup>
      <CommandGroupLabel>Settings</CommandGroupLabel>
      <CommandItem value="profile" keywords={["account", "avatar"]}>
        <CommandItemIcon><User /></CommandItemIcon>
        <CommandItemText>Profile</CommandItemText>
      </CommandItem>
      <CommandItem value="billing">
        <CommandItemIcon><CreditCard /></CommandItemIcon>
        <CommandItemText>Billing</CommandItemText>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`

  const shortcutsCode = `<Command onAction={(value) => (ran = value)}>
  <CommandInput aria-label="Search commands" />
  <CommandList>
    <CommandGroup>
      <CommandGroupLabel>Actions</CommandGroupLabel>
      <CommandItem value="print" shortcut="mod+p">
        <CommandItemIcon><Printer /></CommandItemIcon>
        <CommandItemText>Print</CommandItemText>
        <CommandShortcut />
      </CommandItem>
      <CommandItem value="new-file" shortcut="mod+n">
        <CommandItemIcon><FileText /></CommandItemIcon>
        <CommandItemText>New file</CommandItemText>
        <CommandShortcut />
      </CommandItem>
      <CommandItem value="settings" shortcut="mod+,">
        <CommandItemIcon><Settings /></CommandItemIcon>
        <CommandItemText>Settings</CommandItemText>
        <CommandShortcut />
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`

  const pagesCode = `<script lang="ts">
  let pages = $state<string[]>([])
<\/script>

<Command bind:pages onAction={(value) => (ran = value)}>
  <CommandInput aria-label="Search commands" />
  <CommandEmpty>No results found.</CommandEmpty>
  <CommandList>
    <CommandPage>
      <CommandGroup>
        <CommandGroupLabel>Preferences</CommandGroupLabel>
        <CommandItem value="theme" page="theme">
          <CommandItemIcon><Palette /></CommandItemIcon>
          <CommandItemText>Theme</CommandItemText>
        </CommandItem>
        <CommandItem value="profile">
          <CommandItemIcon><User /></CommandItemIcon>
          <CommandItemText>Profile</CommandItemText>
        </CommandItem>
      </CommandGroup>
    </CommandPage>
    <CommandPage value="theme">
      <CommandGroup>
        <CommandGroupLabel>Theme</CommandGroupLabel>
        <CommandItem value="light">
          <CommandItemIcon><Sun /></CommandItemIcon>
          <CommandItemText>Light</CommandItemText>
        </CommandItem>
        <CommandItem value="dark">
          <CommandItemIcon><Moon /></CommandItemIcon>
          <CommandItemText>Dark</CommandItemText>
        </CommandItem>
        <CommandItem value="system">
          <CommandItemIcon><Monitor /></CommandItemIcon>
          <CommandItemText>System</CommandItemText>
        </CommandItem>
      </CommandGroup>
    </CommandPage>
  </CommandList>
</Command>

<p class="text-sm text-muted">Page: {pages.at(-1) ?? "root"}</p>`

  const paletteCode = `<script lang="ts">
  import { Dialog, DialogBackdrop, DialogContent, DialogTitle, DialogTrigger } from "#lib/components/dialog"

  let open = $state(false)

  function run(value: string) {
    ran = value
    open = false
  }
<\/script>

<Dialog bind:open>
  <DialogTrigger shortcut="mod+k">Search commands</DialogTrigger>
  <DialogBackdrop />
  <DialogContent class="inset-[min(6rem,10dvh)_0_auto] m-0 mx-auto max-h-[80dvh] w-[min(28rem,calc(100%-2rem))] gap-0 overflow-hidden p-0">
    <DialogTitle class="sr-only">Command palette</DialogTitle>
    <Command variant="bare" onAction={run}>
      <div class="flex items-center gap-2 border-b border-line px-3 text-muted">
        <Search class="size-4 shrink-0" aria-hidden="true" />
        <CommandInput aria-label="Search commands" class="border-b-0 px-0" />
      </div>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          <CommandGroupLabel>Suggestions</CommandGroupLabel>
          <CommandItem value="calendar">
            <CommandItemIcon><Calendar /></CommandItemIcon>
            <CommandItemText>Calendar</CommandItemText>
          </CommandItem>
          <CommandItem value="settings">
            <CommandItemIcon><Settings /></CommandItemIcon>
            <CommandItemText>Settings</CommandItemText>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </DialogContent>
</Dialog>`

  const pendingCode = `<script lang="ts">
  let status = $state<"idle" | "loading">("idle")

  async function deploy() {
    status = "loading"
    await new Promise((resolve) => setTimeout(resolve, 1500))
    status = "idle"
    ran = "deploy"
  }
<\/script>

<Command {status} onAction={deploy}>
  <CommandInput aria-label="Search commands" />
  <CommandStatus>
    {#snippet children(state)}
      {state.loading ? "Working…" : \`\${state.count} commands\`}
    {/snippet}
  </CommandStatus>
  <CommandEmpty>Nothing is loading.</CommandEmpty>
  <CommandList>
    <CommandGroup>
      <CommandGroupLabel>Release</CommandGroupLabel>
      <CommandItem value="deploy">
        <CommandItemIcon>
          {#if status === "loading"}<LoaderCircle class="animate-spin" />{:else}<Settings />{/if}
        </CommandItemIcon>
        <CommandItemText>Deploy to production</CommandItemText>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`

  const controlledCode = `<script lang="ts">
  import { createCommandController } from "#lib/components/command"

  const controller = createCommandController()
  let query = $state("")
  let value = $state<string | null>(null)
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => controller.setQuery("bill")}>Search "bill"</Button>
  <Button size="sm" tone="outline" onclick={() => controller.setQuery("")}>Clear</Button>
  <Button size="sm" onclick={() => controller.run()}>Run highlighted</Button>
</div>

<Command {controller} bind:query bind:value onAction={(v) => (ran = v)}>
  <CommandInput aria-label="Search commands" />
  <CommandEmpty>No results found.</CommandEmpty>
  <CommandList>
    <CommandGroup>
      <CommandGroupLabel>Settings</CommandGroupLabel>
      <CommandItem value="profile">Profile</CommandItem>
      <CommandItem value="billing">Billing</CommandItem>
      <CommandItem value="settings">Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>

<p class="text-sm text-muted">Query: {query || "empty"} · Highlighted: {value ?? "none"}</p>`

  let ran = $state("")
  let paletteOpen = $state(false)
  let pages = $state<string[]>([])
  let pendingStatus = $state<"idle" | "loading">("idle")
  let controlledQuery = $state("")
  let controlledValue = $state<string | null>(null)
  const controller = createCommandController()

  function runPalette(value: string) {
    ran = value
    paletteOpen = false
  }

  async function deploy() {
    pendingStatus = "loading"
    await new Promise((resolve) => setTimeout(resolve, 1500))
    pendingStatus = "idle"
    ran = "deploy"
  }
</script>

<svelte:head>
  <title>Command — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Command"
  description="A search field over an always-open list of commands. Wraps the ui-sdk Command with combobox keyboard navigation, ranked filtering, nested pages, shortcuts and pending actions."
  entry="@ui-sdk/svelte/command"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/command</code>. The controller creator is
      re-exported so you can drive the list from anywhere.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The root is a combobox: <code class="font-mono text-accent">CommandInput</code> keeps focus while
      arrow keys move the highlight through <code class="font-mono text-accent">CommandList</code>.
      Give the field an <code class="font-mono text-accent">aria-label</code>. Put
      <code class="font-mono text-accent">CommandEmpty</code> outside the list, and group commands with
      <code class="font-mono text-accent">CommandGroup</code> and
      <code class="font-mono text-accent">CommandGroupLabel</code>.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">onAction(value, details)</code> runs on Enter, a click or an
      item's shortcut. Return a Promise to mark the command pending until it settles.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Type to filter, arrow keys to move, Enter to run. Focus never leaves the field." code={usageCode}>
      <div class="w-full max-w-md space-y-3">
        <Command onAction={(value) => (ran = value)}>
          <div class="flex items-center gap-2 border-b border-line px-3 text-muted">
            <Search class="size-4 shrink-0" aria-hidden="true" />
            <CommandInput aria-label="Search commands" class="border-b-0 px-0" />
          </div>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Suggestions</CommandGroupLabel>
              <CommandItem value="calendar">Calendar</CommandItem>
              <CommandItem value="profile">Profile</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <p class="text-sm text-muted">Ran: {ran || "nothing yet"}</p>
      </div>
    </Demo>

    <Demo title="Icons, keywords and matches" description="CommandItemText marks the matched letters. keywords adds words the search matches without showing them." code={iconsCode}>
      <div class="w-full max-w-md space-y-3">
        <Command onAction={(value) => (ran = value)}>
          <CommandInput aria-label="Search commands" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Suggestions</CommandGroupLabel>
              <CommandItem value="calendar">
                <CommandItemIcon><Calendar /></CommandItemIcon>
                <CommandItemText>Calendar</CommandItemText>
              </CommandItem>
              <CommandItem value="calculator" disabled>
                <CommandItemIcon><Calculator /></CommandItemIcon>
                <CommandItemText>Calculator</CommandItemText>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandGroupLabel>Settings</CommandGroupLabel>
              <CommandItem value="profile" keywords={["account", "avatar"]}>
                <CommandItemIcon><User /></CommandItemIcon>
                <CommandItemText>Profile</CommandItemText>
              </CommandItem>
              <CommandItem value="billing">
                <CommandItemIcon><CreditCard /></CommandItemIcon>
                <CommandItemText>Billing</CommandItemText>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <p class="text-sm text-muted">Ran: {ran || "nothing yet"} — try typing "avatar".</p>
      </div>
    </Demo>

    <Demo title="Shortcuts" description="An item's shortcut runs it while the list is mounted, even when the search hides it. CommandShortcut prints the keys for the platform." code={shortcutsCode}>
      <div class="w-full max-w-md space-y-3">
        <Command onAction={(value) => (ran = value)}>
          <CommandInput aria-label="Search commands" />
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Actions</CommandGroupLabel>
              <CommandItem value="print" shortcut="mod+p">
                <CommandItemIcon><Printer /></CommandItemIcon>
                <CommandItemText>Print</CommandItemText>
                <CommandShortcut />
              </CommandItem>
              <CommandItem value="new-file" shortcut="mod+n">
                <CommandItemIcon><FileText /></CommandItemIcon>
                <CommandItemText>New file</CommandItemText>
                <CommandShortcut />
              </CommandItem>
              <CommandItem value="settings" shortcut="mod+,">
                <CommandItemIcon><Settings /></CommandItemIcon>
                <CommandItemText>Settings</CommandItemText>
                <CommandShortcut />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <p class="text-sm text-muted">Ran: {ran || "nothing yet"}</p>
      </div>
    </Demo>

    <Demo title="Pages" description="An item with page opens a CommandPage. Backspace in an empty field goes back and restores the query typed there." code={pagesCode}>
      <div class="w-full max-w-md space-y-3">
        <Command bind:pages onAction={(value) => (ran = value)}>
          <CommandInput aria-label="Search commands" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandPage>
              <CommandGroup>
                <CommandGroupLabel>Preferences</CommandGroupLabel>
                <CommandItem value="theme" page="theme">
                  <CommandItemIcon><Palette /></CommandItemIcon>
                  <CommandItemText>Theme</CommandItemText>
                </CommandItem>
                <CommandItem value="profile">
                  <CommandItemIcon><User /></CommandItemIcon>
                  <CommandItemText>Profile</CommandItemText>
                </CommandItem>
              </CommandGroup>
            </CommandPage>
            <CommandPage value="theme">
              <CommandGroup>
                <CommandGroupLabel>Theme</CommandGroupLabel>
                <CommandItem value="light">
                  <CommandItemIcon><Sun /></CommandItemIcon>
                  <CommandItemText>Light</CommandItemText>
                </CommandItem>
                <CommandItem value="dark">
                  <CommandItemIcon><Moon /></CommandItemIcon>
                  <CommandItemText>Dark</CommandItemText>
                </CommandItem>
                <CommandItem value="system">
                  <CommandItemIcon><Monitor /></CommandItemIcon>
                  <CommandItemText>System</CommandItemText>
                </CommandItem>
              </CommandGroup>
            </CommandPage>
          </CommandList>
        </Command>
        <p class="text-sm text-muted">
          Page: {pages.at(-1) ?? "root"} · Ran: {ran || "nothing yet"}
        </p>
      </div>
    </Demo>

    <Demo title="Command palette in a dialog" description="variant='bare' drops the frame so the dialog owns it. The trigger's shortcut opens the palette; running a command closes it." code={paletteCode}>
      <div class="w-full max-w-md space-y-3">
        <Dialog bind:open={paletteOpen}>
          <DialogTrigger shortcut="mod+k">Search commands</DialogTrigger>
          <DialogBackdrop />
          <DialogContent class="inset-[min(6rem,10dvh)_0_auto] m-0 mx-auto max-h-[80dvh] w-[min(28rem,calc(100%-2rem))] gap-0 overflow-hidden p-0">
            <DialogTitle class="sr-only">Command palette</DialogTitle>
            <Command variant="bare" onAction={runPalette}>
              <div class="flex items-center gap-2 border-b border-line px-3 text-muted">
                <Search class="size-4 shrink-0" aria-hidden="true" />
                <CommandInput aria-label="Search commands" class="border-b-0 px-0" />
              </div>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandGroupLabel>Suggestions</CommandGroupLabel>
                  <CommandItem value="calendar">
                    <CommandItemIcon><Calendar /></CommandItemIcon>
                    <CommandItemText>Calendar</CommandItemText>
                  </CommandItem>
                  <CommandItem value="profile">
                    <CommandItemIcon><User /></CommandItemIcon>
                    <CommandItemText>Profile</CommandItemText>
                  </CommandItem>
                  <CommandItem value="settings">
                    <CommandItemIcon><Settings /></CommandItemIcon>
                    <CommandItemText>Settings</CommandItemText>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
        <p class="text-sm text-muted">Ran: {ran || "nothing yet"}</p>
      </div>
    </Demo>

    <Demo title="Pending actions and status" description="Returning a Promise marks the command data-pending and aria-busy. CommandStatus is a polite live region for counts and loading." code={pendingCode}>
      <div class="w-full max-w-md space-y-3">
        <Command status={pendingStatus} onAction={deploy}>
          <CommandInput aria-label="Search commands" />
          <CommandStatus>
            {#snippet children(state)}
              {state.loading ? "Working…" : `${state.count} commands`}
            {/snippet}
          </CommandStatus>
          <CommandEmpty>Nothing is loading.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Release</CommandGroupLabel>
              <CommandItem value="deploy">
                <CommandItemIcon>
                  {#if pendingStatus === "loading"}
                    <LoaderCircle class="animate-spin" />
                  {:else}
                    <Settings />
                  {/if}
                </CommandItemIcon>
                <CommandItemText>Deploy to production</CommandItemText>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <p class="text-sm text-muted">Ran: {ran || "nothing yet"}</p>
      </div>
    </Demo>

    <Demo title="Controlled and driven" description="bind:query and bind:value control the search and highlight; a controller reads and drives them from outside." code={controlledCode}>
      <div class="w-full max-w-md space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => controller.setQuery("bill")}>Search "bill"</Button>
          <Button size="sm" tone="outline" onclick={() => controller.setQuery("")}>Clear</Button>
          <Button size="sm" onclick={() => controller.run()}>Run highlighted</Button>
        </div>
        <Command
          {controller}
          bind:query={controlledQuery}
          bind:value={controlledValue}
          onAction={(value) => (ran = value)}
        >
          <CommandInput aria-label="Search commands" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandGroupLabel>Settings</CommandGroupLabel>
              <CommandItem value="profile">Profile</CommandItem>
              <CommandItem value="billing">Billing</CommandItem>
              <CommandItem value="settings">Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
        <p class="text-sm text-muted">
          Query: {controlledQuery || "empty"} · Highlighted: {controlledValue ?? "none"} · Ran: {ran || "nothing yet"}
        </p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Command variant"
      rows={[
        { name: "panel", type: "default", description: "A standalone palette: max-w-md, rounded-xl, border-line, bg-surface and a shadow." },
        { name: "bare", type: "string", description: "No frame, background or shadow, for embedding in a dialog that already provides them." },
      ]}
    />
    <p class="text-sm text-muted">
      Both variants keep the focus ring: the root outlines itself with
      <code class="font-mono text-accent">outline-ring</code> while the field inside has
      <code class="font-mono text-accent">:focus-visible</code>, so the whole palette reads as one control.
    </p>
    <PropsTable
      caption="filter"
      rows={[
        { name: '"fuzzy"', type: "default", description: "Matches the letters in order, across words, and ranks the best match first." },
        { name: '"contains"', type: "string", description: "Keeps commands whose text contains the query." },
        { name: '"startsWith"', type: "string", description: "Keeps commands whose text starts with the query." },
        { name: "false", type: "boolean", description: "Keeps every command; filter them yourself." },
        { name: "(item, query) => number", type: "function", description: "Your own scoring function. Higher scores rank first." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling:
      <code class="font-mono text-accent">data-highlighted</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-pending</code> and
      <code class="font-mono text-accent">data-has-icon</code> on items;
      <code class="font-mono text-accent">data-has-icons</code> on the list, which the wrapper uses to
      line up items without an icon;
      <code class="font-mono text-accent">data-matched</code> on item text;
      <code class="font-mono text-accent">data-mirror</code> on icons;
      <code class="font-mono text-accent">data-loading</code> on the root, empty and status parts;
      <code class="font-mono text-accent">data-empty</code> on the empty part.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Command (root)"
      rows={[
        { name: "value", type: "string | null", description: "The highlighted command. Bind with bind:value. null highlights nothing." },
        { name: "defaultValue", type: "string | null", description: "Initial highlight when uncontrolled. Without it the first command is highlighted, with autoHighlight." },
        { name: "query", type: "string", description: "The search text, which filters the commands. Bind with bind:query." },
        { name: "defaultQuery", type: "string", description: "Initial search text when uncontrolled." },
        { name: "pages", type: "string[]", description: "The stack of open pages, first opened to current. Bind with bind:pages." },
        { name: "defaultPages", type: "string[]", default: "[]", description: "Pages open at first, when uncontrolled." },
        { name: "variant", type: '"panel" | "bare"', default: '"panel"', description: "Negentropy framing. bare drops it for dialog embedding." },
        { name: "onAction", type: "(value, details) => unknown", description: "Runs on Enter, a click or a shortcut. details.event is the click or key press. Return a Promise to mark the command pending." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when the highlight moves. details.index locates it for virtualized lists; details.cancel() stops the change." },
        { name: "onQueryChange", type: "(query, details) => void", description: "Runs when the search text wants to change. details.cancel() stops it." },
        { name: "onPagesChange", type: "(pages, details) => void", description: "Runs when a page opens or Backspace/Escape goes back. details.cancel() stops it." },
        { name: "onLoadMore", type: "() => void", description: "Runs when the highlight or scrolling reaches the last command, so the next page can load." },
        { name: "items", type: "CommandData", description: "Commands as data, rendered and ranked for you, with pages for entries that have items. Renders ui-sdk's own item parts, so compose explicit parts for full Negentropy styling." },
        { name: "emptyItems", type: "CommandData", description: "Shown instead of items on the first page while the search is empty, like recent commands. Needs items." },
        { name: "filter", type: "SearchFilter<string>", default: '"fuzzy"', description: "How typing narrows the list." },
        { name: "autoHighlight", type: "boolean", default: "true", description: "Highlight the first command, and the best match as the user types." },
        { name: "loop", type: "boolean", default: "true", description: "Arrow keys wrap from the last command to the first." },
        { name: "status", type: '"idle" | "loading" | "error"', description: "Whether results are loading or failed, for the empty and status parts." },
        { name: "announcement", type: "(change) => string | null", description: "What screen readers hear after typing pauses, when no CommandStatus is rendered. Return null for nothing." },
        { name: "pendingAnnouncement", type: "string", default: '"Loading"', description: "What screen readers hear once a command has been pending for a second. An empty string says nothing." },
        { name: "controller", type: "CommandController", description: "Read and drive the list from anywhere. Create one with createCommandController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason." },
      ]}
    />
    <PropsTable
      caption="CommandInput"
      rows={[
        { name: "aria-label", type: "string", description: "Names the search field. Required for an accessible combobox." },
        { name: "class", type: "string", description: "Merged with the wrapper classes. The field is borderless apart from a bottom rule, so a surrounding row can own the divider." },
      ]}
    />
    <PropsTable
      caption="CommandList"
      rows={[
        { name: "class", type: "string", description: "Merged with the wrapper classes: max-h-72, overflow-y-auto and overscroll-contain. The list hides itself while it holds no items." },
        { name: "children", type: "Snippet<[CommandListState]>", description: "Your commands. Without children, a data command renders its items here." },
      ]}
    />
    <PropsTable
      caption="CommandItem"
      rows={[
        { name: "value", type: "string", description: "Identifies the command and is passed to onAction. Generated when omitted." },
        { name: "label", type: "string", description: "The text the search matches when the content isn't plain text. Not the accessible name — use aria-label for that." },
        { name: "keywords", type: "string[]", description: "More words the search matches." },
        { name: "disabled", type: "boolean", default: "false", description: "Keeps the command from running. Arrow keys and the pointer skip it." },
        { name: "shortcut", type: "string", description: 'A keyboard shortcut that runs the command while it is mounted, like "mod+p". Sets aria-keyshortcuts.' },
        { name: "page", type: "string", description: "The CommandPage value choosing this command opens." },
        { name: "index", type: "number", description: "Position among all visible commands, for virtualized lists. Sets aria-posinset and aria-setsize." },
        { name: "onSelect", type: "(event) => unknown", description: "Runs before onAction. event.preventDefault() skips onAction and the page. Return a Promise to mark it pending." },
      ]}
    />
    <PropsTable
      caption="CommandItemIcon, CommandItemText, CommandShortcut"
      rows={[
        { name: "mirror", type: "boolean", default: "false", description: "CommandItemIcon only. Flips the icon in right-to-left text, for arrows and chevrons." },
        { name: "shortcut", type: "string", description: "CommandShortcut only. The keys to show. Inside a command it inherits the item's shortcut." },
        { name: "children", type: "Snippet<[State]>", description: "CommandItemText marks the matched pieces in <mark>; without text content it shows the command's label. CommandShortcut prints state.text." },
      ]}
    />
    <PropsTable
      caption="CommandGroup, CommandGroupLabel, CommandSeparator"
      rows={[
        { name: "children", type: "Snippet", description: "A group hides while none of its commands matches. Its label names it for screen readers and must sit inside a group." },
        { name: "class", type: "string", description: "Merged with the wrapper classes. Separators hide while the list is filtered." },
      ]}
    />
    <PropsTable
      caption="CommandEmpty and CommandStatus"
      rows={[
        { name: "children", type: "Snippet<[State]>", description: "CommandEmpty renders only while state.empty, and its message is announced when it appears. CommandStatus is always rendered; its content is yours, from state.status, state.loading and state.count." },
        { name: "placement", type: "—", description: "Put CommandEmpty outside CommandList. CommandStatus sits above the list as a polite live region." },
      ]}
    />
    <PropsTable
      caption="CommandPage"
      rows={[
        { name: "value", type: "string", description: "The page's name, which an item's page opens. Leave it out for the first page. Renders no element." },
        { name: "children", type: "Snippet", description: "The commands shown while this page is on top." },
      ]}
    />
    <PropsTable
      caption="createCommandController()"
      rows={[
        { name: "getValue / setValue", type: "() => string | null / (value, options?) => boolean", description: "Read or move the highlight, scrolling it into view. Returns false when canceled or unchanged." },
        { name: "getQuery / setQuery", type: "() => string / (query, options?) => boolean", description: "Read or change the search text, which filters the commands." },
        { name: "getPages / setPages", type: "() => string[] / (pages, options?) => boolean", description: "Read or replace the stack of open pages." },
        { name: "push / pop", type: "(page, options?) => boolean / (options?) => boolean", description: "Open a page on top, or go back and restore the query typed there." },
        { name: "run", type: "(value?) => void", description: "Run a command as Enter would: the highlighted one, or the one with this value." },
        { name: "focus", type: "() => void", description: "Focus the search field." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA combobox pattern with an always-expanded listbox. Focus stays in the field, which points at the highlighted command with <code class="font-mono text-accent">aria-activedescendant</code>.</li>
      <li>Name the field with <code class="font-mono text-accent">aria-label</code>. A command's text is its accessible name; when the content isn't plain text, set <code class="font-mono text-accent">label</code> for matching and <code class="font-mono text-accent">aria-label</code> for the name.</li>
      <li><span class="text-fg">Typing</span> filters and highlights the best match. <span class="text-fg">ArrowDown/ArrowUp</span> move the highlight and wrap unless <code class="font-mono text-accent">loop=false</code>. <span class="text-fg">Home/End</span> stay in the field for the caret.</li>
      <li><span class="text-fg">Enter</span> runs the highlighted command. <span class="text-fg">Escape</span> clears the search, then goes back a page. <span class="text-fg">Backspace</span> in an empty search goes back and restores that page's query.</li>
      <li>An item's <code class="font-mono text-accent">shortcut</code> runs it while the list is mounted, even when the search hides it, and sets <code class="font-mono text-accent">aria-keyshortcuts</code>. Inside a dialog, shortcuts run while it is open.</li>
      <li>Disabled commands are skipped by arrow keys and the pointer and carry <code class="font-mono text-accent">aria-disabled</code>.</li>
      <li>A pending command carries <code class="font-mono text-accent">data-pending</code>, <code class="font-mono text-accent">aria-busy</code> and <code class="font-mono text-accent">aria-disabled</code>, runs only once, and is announced after a second via <code class="font-mono text-accent">pendingAnnouncement</code>. Set that string in the page's language.</li>
      <li>Groups without a match hide; the rest keep their labels, which name the group for screen readers. <code class="font-mono text-accent">CommandGroupLabel</code> must sit inside a <code class="font-mono text-accent">CommandGroup</code>.</li>
      <li>The empty message is announced when it appears. <code class="font-mono text-accent">CommandStatus</code> is a polite live region for loading and result counts; without one, <code class="font-mono text-accent">announcement</code> speaks after typing pauses.</li>
      <li>Icons are skipped by screen readers, typeahead and filtering. Mark decorative icons <code class="font-mono text-accent">aria-hidden="true"</code>.</li>
      <li>In a dialog, give the dialog a title — visually hidden with <code class="font-mono text-accent">sr-only</code> is fine — so the palette is named. The dialog handles dismissal and returns focus to the trigger.</li>
    </ul>
  </Section>
</div>