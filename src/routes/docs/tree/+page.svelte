<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Tree,
    TreeItems,
    TreeItem,
    TreeGroup,
    TreeItemLabel,
    TreeItemIndicator,
    TreeItemCheckbox,
    createTreeController,
    treeFromPaths,
    type TreeAnnouncement,
    type TreeItemData,
  } from "#lib/components/tree"
  import { Button } from "#lib/components/button"
  import {
    ChevronRight,
    File,
    Folder,
    LoaderCircle,
    RotateCw,
  } from "@lucide/svelte"

  const installCode = `import {
  Tree,
  TreeItem,
  TreeGroup,
  TreeItemLabel,
  TreeItemIndicator,
} from "#lib/components/tree"`

  const usageCode = `<script lang="ts">
  import { ChevronRight, File, Folder } from "@lucide/svelte"
  import {
    Tree,
    TreeItem,
    TreeGroup,
    TreeItemLabel,
    TreeItemIndicator,
    type TreeItemData,
  } from "#lib/components/tree"

  const files: TreeItemData[] = [
    { value: "app", label: "app", children: [
      { value: "app/layout.svelte", label: "layout.svelte" },
      { value: "app/page.svelte", label: "page.svelte" },
      { value: "app/settings", label: "settings", children: [
        { value: "app/settings/page.svelte", label: "page.svelte" },
      ] },
    ] },
    { value: "components", label: "components", children: [
      { value: "components/button.svelte", label: "button.svelte" },
      { value: "components/tree.svelte", label: "tree.svelte" },
    ] },
    { value: "package.json", label: "package.json" },
    { value: "README.md", label: "README.md" },
  ]
<\/script>

{#snippet rows(nodes: TreeItemData[])}
  {#each nodes as item (item.value)}
    <TreeItem value={item.value}>
      <TreeItemLabel>
        {#if item.children}
          <TreeItemIndicator><ChevronRight aria-hidden="true" /></TreeItemIndicator>
          <Folder aria-hidden="true" />
        {:else}
          <File aria-hidden="true" />
        {/if}
        <span>{item.label}</span>
      </TreeItemLabel>
      {#if item.children}
        <TreeGroup>{@render rows(item.children)}</TreeGroup>
      {/if}
    </TreeItem>
  {/each}
{/snippet}

<Tree aria-label="Files" items={files} defaultExpanded={["app"]} defaultValue="app/page.svelte">
  {@render rows(files)}
</Tree>`

  const dataCode = `<script lang="ts">
  import { Tree, type TreeItemData } from "#lib/components/tree"

  const groceries: TreeItemData[] = [
    { value: "fruit", label: "Fruit", children: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "pear", label: "Pear", disabled: true },
    ] },
    { value: "bakery", label: "Bakery", children: [
      { value: "bread", label: "Bread" },
      { value: "bagels", label: "Bagels" },
    ] },
    { value: "milk", label: "Milk" },
  ]
<\/script>

<Tree aria-label="Groceries" items={groceries} defaultExpanded={["fruit"]} />`

  const checkableCode = `<script lang="ts">
  import { Tree, TreeItems, type TreeItemData } from "#lib/components/tree"

  const stack: TreeItemData[] = [
    { value: "frontend", label: "Frontend", children: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ] },
    { value: "backend", label: "Backend", children: [
      { value: "node", label: "Node" },
      { value: "databases", label: "Databases", children: [
        { value: "postgres", label: "Postgres" },
        { value: "sqlite", label: "SQLite" },
      ] },
    ] },
  ]

  let checked = $state(["react", "postgres"])
<\/script>

<p class="font-mono text-xs text-muted">{checked.join(", ") || "nothing"}</p>
<Tree
  aria-label="Stack"
  items={stack}
  checkable
  mode="none"
  checkStrategy="trunk"
  bind:checked
  defaultExpanded={["frontend", "backend", "databases"]}
>
  <TreeItems items={stack} checkable />
</Tree>`

  const multipleCode = `<script lang="ts">
  import { Tree, TreeItems, type TreeItemData } from "#lib/components/tree"

  const folders: TreeItemData[] = [
    { value: "inbox", label: "Inbox", children: [
      { value: "updates", label: "Updates" },
      { value: "forums", label: "Forums" },
      { value: "promotions", label: "Promotions" },
    ] },
    { value: "projects", label: "Projects", children: [
      { value: "website", label: "Website" },
      { value: "mobile", label: "Mobile app" },
    ] },
    { value: "archive", label: "Archive" },
    { value: "trash", label: "Trash" },
  ]

  let selected = $state(["updates", "website"])
<\/script>

<p class="font-mono text-xs text-muted">{selected.length} selected: {selected.join(", ")}</p>
<Tree
  aria-label="Folders"
  items={folders}
  mode="multiple"
  bind:value={selected}
  expandOnPress={false}
  defaultExpanded={["inbox", "projects"]}
>
  <TreeItems items={folders} />
</Tree>`

  const pathsCode = `<script lang="ts">
  import { ChevronRight, LoaderCircle } from "@lucide/svelte"
  import {
    Tree,
    TreeItem,
    TreeGroup,
    TreeItemLabel,
    TreeItemIndicator,
    treeFromPaths,
    type TreeItemData,
  } from "#lib/components/tree"

  const paths = [
    "src/index.ts",
    "src/lib/format.ts",
    "src/lib/parse.ts",
    "src/routes/home.svelte",
    "src/routes/about.svelte",
    "tests/",
    "package.json",
    "tsconfig.json",
  ]
  const items = treeFromPaths(paths)
  const files = new Set(paths.filter((path) => !path.endsWith("/")))
  let opened = $state("Nothing opened yet")

  async function onAction(value: string) {
    if (!files.has(value)) return
    await new Promise((resolve) => setTimeout(resolve, 600))
    opened = "Opened " + value
  }
<\/script>

{#snippet rows(nodes: TreeItemData[])}
  {#each nodes as item (item.value)}
    <TreeItem value={item.value}>
      <TreeItemLabel>
        {#snippet children(state)}
          {#if item.children}
            <TreeItemIndicator><ChevronRight aria-hidden="true" /></TreeItemIndicator>
          {/if}
          <span>{item.label}</span>
          {#if state.pending}
            <LoaderCircle aria-hidden="true" class="ms-auto animate-spin" />
          {/if}
        {/snippet}
      </TreeItemLabel>
      {#if item.children}
        <TreeGroup>{@render rows(item.children)}</TreeGroup>
      {/if}
    </TreeItem>
  {/each}
{/snippet}

<p class="font-mono text-xs text-muted">{opened}</p>
<Tree
  aria-label="Project"
  {paths}
  {onAction}
  activation="automatic"
  defaultExpanded={["src"]}
  defaultValue="src/index.ts"
>
  {@render rows(items)}
</Tree>`

  const controllerCode = `<script lang="ts">
  import { Tree, TreeItems, createTreeController, type TreeItemData } from "#lib/components/tree"
  import { Button } from "#lib/components/button"

  const sections: TreeItemData[] = [
    { value: "account", label: "Account", children: [
      { value: "profile", label: "Profile" },
      { value: "security", label: "Security", children: [
        { value: "password", label: "Password" },
        { value: "two-factor", label: "Two-factor authentication" },
      ] },
    ] },
    { value: "workspace", label: "Workspace", children: [
      { value: "members", label: "Members" },
      { value: "billing", label: "Billing" },
    ] },
  ]

  const settings = createTreeController()
<\/script>

<div class="flex flex-wrap gap-2">
  <Button size="sm" tone="outline" onclick={() => settings.expandAll()}>Expand all</Button>
  <Button size="sm" tone="outline" onclick={() => settings.collapseAll()}>Collapse all</Button>
  <Button
    size="sm"
    tone="outline"
    onclick={() => {
      settings.setValue("two-factor")
      settings.reveal("two-factor")
    }}
  >
    Find two-factor
  </Button>
</div>
<Tree aria-label="Settings" items={sections} controller={settings}>
  <TreeItems items={sections} />
</Tree>`

  const lazyCode = `<script lang="ts">
  import { ChevronRight, LoaderCircle, RotateCw } from "@lucide/svelte"
  import {
    Tree,
    TreeItem,
    TreeGroup,
    TreeItemLabel,
    TreeItemIndicator,
    type TreeAnnouncement,
  } from "#lib/components/tree"

  type Node = { value: string; label: string; branch?: boolean }

  const top: Node[] = [
    { value: "users", label: "users", branch: true },
    { value: "orders", label: "orders", branch: true },
    { value: "archive", label: "archive", branch: true },
  ]

  let loaded = $state<Record<string, Node[]>>({})
  let archiveAsked = false

  async function loadChildren(value: string, { signal }: { signal: AbortSignal }) {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 800)
      signal.addEventListener("abort", () => {
        clearTimeout(timer)
        reject(signal.reason)
      })
    })
    if (value === "archive" && !archiveAsked) {
      archiveAsked = true
      throw new Error("Network error")
    }
    loaded[value] = Array.from({ length: 3 }, (_, index) => ({
      value: value + "/" + (index + 1),
      label: value.slice(0, -1) + "_" + (index + 1) + ".json",
    }))
  }

  const announcement = ({ type, label }: TreeAnnouncement) =>
    ({
      expanded: "Expanded",
      collapsed: "Collapsed",
      loading: "Loading " + label,
      "load-failed": label + " didn't load. Try again.",
    })[type]
<\/script>

{#snippet rows(nodes: Node[])}
  {#each nodes as item (item.value)}
    <TreeItem value={item.value} branch={item.branch}>
      <TreeItemLabel>
        {#if item.branch}
          <TreeItemIndicator>
            {#snippet children(state)}
              {#if state.loading}
                <LoaderCircle aria-hidden="true" class="animate-spin" />
              {:else if state.failed}
                <RotateCw aria-hidden="true" />
              {:else}
                <ChevronRight aria-hidden="true" />
              {/if}
            {/snippet}
          </TreeItemIndicator>
        {/if}
        <span>{item.label}</span>
      </TreeItemLabel>
      {#if loaded[item.value]}
        <TreeGroup>{@render rows(loaded[item.value])}</TreeGroup>
      {/if}
    </TreeItem>
  {/each}
{/snippet}

<Tree aria-label="Database" {loadChildren} {announcement}>
  {@render rows(top)}
</Tree>`

  const disabledCode = `<script lang="ts">
  import { Tree, type TreeItemData } from "#lib/components/tree"
  import { Button } from "#lib/components/button"

  const groceries: TreeItemData[] = [
    { value: "fruit", label: "Fruit", children: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "pear", label: "Pear", disabled: true },
    ] },
    { value: "bakery", label: "Bakery", children: [
      { value: "bread", label: "Bread" },
      { value: "bagels", label: "Bagels" },
    ] },
    { value: "milk", label: "Milk" },
  ]

  let locked = $state(false)
<\/script>

<Button size="sm" tone="outline" aria-pressed={locked} onclick={() => (locked = !locked)}>
  {locked ? "Enable tree" : "Disable tree"}
</Button>
<Tree aria-label="Groceries" items={groceries} disabled={locked} defaultExpanded={["fruit"]} />`

  const files: TreeItemData[] = [
    {
      value: "app",
      label: "app",
      children: [
        { value: "app/layout.svelte", label: "layout.svelte" },
        { value: "app/page.svelte", label: "page.svelte" },
        {
          value: "app/settings",
          label: "settings",
          children: [{ value: "app/settings/page.svelte", label: "page.svelte" }],
        },
      ],
    },
    {
      value: "components",
      label: "components",
      children: [
        { value: "components/button.svelte", label: "button.svelte" },
        { value: "components/tree.svelte", label: "tree.svelte" },
      ],
    },
    { value: "package.json", label: "package.json" },
    { value: "README.md", label: "README.md" },
  ]

  const groceries: TreeItemData[] = [
    {
      value: "fruit",
      label: "Fruit",
      children: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "pear", label: "Pear", disabled: true },
      ],
    },
    {
      value: "bakery",
      label: "Bakery",
      children: [
        { value: "bread", label: "Bread" },
        { value: "bagels", label: "Bagels" },
      ],
    },
    { value: "milk", label: "Milk" },
  ]

  const stack: TreeItemData[] = [
    {
      value: "frontend",
      label: "Frontend",
      children: [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
      ],
    },
    {
      value: "backend",
      label: "Backend",
      children: [
        { value: "node", label: "Node" },
        {
          value: "databases",
          label: "Databases",
          children: [
            { value: "postgres", label: "Postgres" },
            { value: "sqlite", label: "SQLite" },
          ],
        },
      ],
    },
  ]

  const folders: TreeItemData[] = [
    {
      value: "inbox",
      label: "Inbox",
      children: [
        { value: "updates", label: "Updates" },
        { value: "forums", label: "Forums" },
        { value: "promotions", label: "Promotions" },
      ],
    },
    {
      value: "projects",
      label: "Projects",
      children: [
        { value: "website", label: "Website" },
        { value: "mobile", label: "Mobile app" },
      ],
    },
    { value: "archive", label: "Archive" },
    { value: "trash", label: "Trash" },
  ]

  const sections: TreeItemData[] = [
    {
      value: "account",
      label: "Account",
      children: [
        { value: "profile", label: "Profile" },
        {
          value: "security",
          label: "Security",
          children: [
            { value: "password", label: "Password" },
            { value: "two-factor", label: "Two-factor authentication" },
          ],
        },
      ],
    },
    {
      value: "workspace",
      label: "Workspace",
      children: [
        { value: "members", label: "Members" },
        { value: "billing", label: "Billing" },
      ],
    },
  ]

  const paths = [
    "src/index.ts",
    "src/lib/format.ts",
    "src/lib/parse.ts",
    "src/routes/home.svelte",
    "src/routes/about.svelte",
    "tests/",
    "package.json",
    "tsconfig.json",
  ]
  const pathItems = treeFromPaths(paths)
  const pathFiles = new Set(paths.filter((path) => !path.endsWith("/")))

  let checked = $state(["react", "postgres"])
  let selected = $state(["updates", "website"])
  let opened = $state("Nothing opened yet")
  let locked = $state(false)

  const settings = createTreeController()

  async function onAction(value: string) {
    if (!pathFiles.has(value)) return
    await new Promise((resolve) => setTimeout(resolve, 600))
    opened = `Opened ${value}`
  }

  type LazyNode = { value: string; label: string; branch?: boolean }

  const lazyTop: LazyNode[] = [
    { value: "users", label: "users", branch: true },
    { value: "orders", label: "orders", branch: true },
    { value: "archive", label: "archive", branch: true },
  ]

  let loaded = $state<Record<string, LazyNode[]>>({})
  let archiveAsked = false

  async function loadChildren(value: string, { signal }: { signal: AbortSignal }) {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, 800)
      signal.addEventListener("abort", () => {
        clearTimeout(timer)
        reject(signal.reason)
      })
    })
    if (value === "archive" && !archiveAsked) {
      archiveAsked = true
      throw new Error("Network error")
    }
    loaded[value] = Array.from({ length: 3 }, (_, index) => ({
      value: `${value}/${index + 1}`,
      label: `${value.slice(0, -1)}_${index + 1}.json`,
    }))
  }

  const announcement = ({ type, label }: TreeAnnouncement) =>
    ({
      expanded: "Expanded",
      collapsed: "Collapsed",
      loading: `Loading ${label}`,
      "load-failed": `${label} didn't load. Try again.`,
    })[type]
</script>

<svelte:head>
  <title>Tree — Negentropy UI</title>
</svelte:head>

{#snippet fileRows(nodes: TreeItemData[])}
  {#each nodes as item (item.value)}
    <TreeItem value={item.value}>
      <TreeItemLabel>
        {#if item.children}
          <TreeItemIndicator><ChevronRight aria-hidden="true" /></TreeItemIndicator>
          <Folder aria-hidden="true" />
        {:else}
          <File aria-hidden="true" />
        {/if}
        <span>{item.label}</span>
      </TreeItemLabel>
      {#if item.children}
        <TreeGroup>{@render fileRows(item.children)}</TreeGroup>
      {/if}
    </TreeItem>
  {/each}
{/snippet}

{#snippet pathRows(nodes: TreeItemData[])}
  {#each nodes as item (item.value)}
    <TreeItem value={item.value}>
      <TreeItemLabel>
        {#snippet children(state)}
          {#if item.children}
            <TreeItemIndicator><ChevronRight aria-hidden="true" /></TreeItemIndicator>
          {/if}
          <span>{item.label}</span>
          {#if state.pending}
            <LoaderCircle aria-hidden="true" class="ms-auto animate-spin" />
          {/if}
        {/snippet}
      </TreeItemLabel>
      {#if item.children}
        <TreeGroup>{@render pathRows(item.children)}</TreeGroup>
      {/if}
    </TreeItem>
  {/each}
{/snippet}

{#snippet lazyRows(nodes: LazyNode[])}
  {#each nodes as item (item.value)}
    <TreeItem value={item.value} branch={item.branch}>
      <TreeItemLabel>
        {#if item.branch}
          <TreeItemIndicator>
            {#snippet children(state)}
              {#if state.loading}
                <LoaderCircle aria-hidden="true" class="animate-spin" />
              {:else if state.failed}
                <RotateCw aria-hidden="true" />
              {:else}
                <ChevronRight aria-hidden="true" />
              {/if}
            {/snippet}
          </TreeItemIndicator>
        {/if}
        <span>{item.label}</span>
      </TreeItemLabel>
      {#if loaded[item.value]}
        <TreeGroup>{@render lazyRows(loaded[item.value])}</TreeGroup>
      {/if}
    </TreeItem>
  {/each}
{/snippet}

<PageHeader
  title="Tree"
  description="A hierarchy of items that expand, collapse, select and check. Wraps the ui-sdk Tree with the WAI-ARIA tree view pattern, one tab stop, typeahead, tri-state checkboxes, lazy branches and file-path data."
  entry="@ui-sdk/svelte/tree"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/tree</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      An item's text goes in <code class="font-mono text-accent">TreeItemLabel</code> and its children
      in <code class="font-mono text-accent">TreeGroup</code>, which makes it a branch. Pass
      <code class="font-mono text-accent">items</code> as well, so keyboard navigation, item counts and
      controllers know the whole hierarchy even where rows aren't rendered. With no children of its
      own, the tree renders the rows from the data for you.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="File tree"
      description="Click a branch or its chevron to open it. Focus the tree and use the arrow keys; Right expands, Left collapses, and typing jumps to a label."
      code={usageCode}
    >
      <Tree
        aria-label="Files"
        items={files}
        defaultExpanded={["app"]}
        defaultValue="app/page.svelte"
      >
        {@render fileRows(files)}
      </Tree>
    </Demo>

    <Demo
      title="Items as data"
      description="With no children of its own, the tree renders rows from items: chevrons on branches, indentation from each item's depth, and a disabled leaf."
      code={dataCode}
    >
      <Tree aria-label="Groceries" items={groceries} defaultExpanded={["fruit"]} />
    </Demo>

    <Demo
      title="Checkable"
      description="checkable gives every item a tri-state checkbox, kept apart from the selection. Checking a branch checks everything in it; a branch shows mixed while only some of it is checked. checkStrategy='trunk' reports the outermost fully checked items."
      code={checkableCode}
    >
      <div class="w-80 max-w-full space-y-3">
        <p class="font-mono text-xs text-muted">{checked.join(", ") || "nothing"}</p>
        <Tree
          aria-label="Stack"
          items={stack}
          checkable
          mode="none"
          checkStrategy="trunk"
          bind:checked
          defaultExpanded={["frontend", "backend", "databases"]}
        >
          <TreeItems items={stack} checkable />
        </Tree>
      </div>
    </Demo>

    <Demo
      title="Multiple selection"
      description="mode='multiple' selects a list. Shift with Up/Down extends it, Cmd/Ctrl+A selects the visible items, and expandOnPress={false} keeps a press from toggling the branch."
      code={multipleCode}
    >
      <div class="w-80 max-w-full space-y-3">
        <p class="font-mono text-xs text-muted">{selected.length} selected: {selected.join(", ")}</p>
        <Tree
          aria-label="Folders"
          items={folders}
          mode="multiple"
          bind:value={selected}
          expandOnPress={false}
          defaultExpanded={["inbox", "projects"]}
        >
          <TreeItems items={folders} />
        </Tree>
      </div>
    </Demo>

    <Demo
      title="File paths and actions"
      description="paths turns file paths into a tree, folders first. activation='automatic' selects as the arrows move, and onAction returns a promise so the row shows a spinner until it settles."
      code={pathsCode}
    >
      <div class="w-80 max-w-full space-y-3">
        <p class="font-mono text-xs text-muted">{opened}</p>
        <Tree
          aria-label="Project"
          {paths}
          {onAction}
          activation="automatic"
          defaultExpanded={["src"]}
          defaultValue="src/index.ts"
        >
          {@render pathRows(pathItems)}
        </Tree>
      </div>
    </Demo>

    <Demo
      title="Controller"
      description="createTreeController() drives the tree from anywhere: expand or collapse everything, or select an item and reveal it, which opens its ancestors and focuses it."
      code={controllerCode}
    >
      <div class="w-80 max-w-full space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => settings.expandAll()}>Expand all</Button>
          <Button size="sm" tone="outline" onclick={() => settings.collapseAll()}>Collapse all</Button>
          <Button
            size="sm"
            tone="outline"
            onclick={() => {
              settings.setValue("two-factor")
              settings.reveal("two-factor")
            }}
          >
            Find two-factor
          </Button>
        </div>
        <Tree aria-label="Settings" items={sections} controller={settings}>
          <TreeItems items={sections} />
        </Tree>
      </div>
    </Demo>

    <Demo
      title="Loading children"
      description="loadChildren fills a branch the first time it opens. The indicator spins while it loads and turns to a retry mark when it fails; archive fails once, then loads. Expanding again while loading cancels through the signal."
      code={lazyCode}
    >
      <Tree aria-label="Database" {loadChildren} {announcement}>
        {@render lazyRows(lazyTop)}
      </Tree>
    </Demo>

    <Demo
      title="Disabled"
      description="disabled stops every item from being selected, checked, expanded or run. Items stay focusable so a screen reader still finds them, unless focusableWhenDisabled is false."
      code={disabledCode}
    >
      <div class="w-80 max-w-full space-y-3">
        <Button size="sm" tone="outline" aria-pressed={locked} onclick={() => (locked = !locked)}>
          {locked ? "Enable tree" : "Disable tree"}
        </Button>
        <Tree
          aria-label="Groceries"
          items={groceries}
          disabled={locked}
          defaultExpanded={["fruit"]}
        />
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Tree has no visual variants — its shapes come from selection mode, check strategy and item
      state. Rows are painted through <code class="font-mono text-accent">TreeItemLabel</code>, which
      carries its item's state attributes; focus stays on the item, so the wrapper rings the label
      inside a focused item. Indentation comes from <code class="font-mono text-accent">--tree-level</code>.
    </p>
    <PropsTable
      caption="Selection mode"
      rows={[
        { name: "single", type: "default", description: "One item is selected; value is a string or null. A tree of links usually wants mode='none' instead." },
        { name: "multiple", type: '"multiple"', description: "value is a string[]. Shift+Up/Down extends the selection and Cmd/Ctrl+A selects the visible items." },
        { name: "none", type: '"none"', description: "Nothing is selected; items are pressed for their action or link. aria-selected is left off." },
      ]}
    />
    <PropsTable
      caption="Check strategy"
      rows={[
        { name: "leaf", type: "default", description: "checked lists the checked leaves." },
        { name: "trunk", type: '"trunk"', description: "checked lists the outermost fully checked items, so a whole branch is one value." },
        { name: "branch", type: '"branch"', description: "checked lists every fully checked item, branches included." },
        { name: "independent", type: '"independent"', description: "Each item on its own, with no cascading to children or parents." },
      ]}
    />
    <PropsTable
      caption="Activation"
      rows={[
        { name: "manual", type: "default", description: "Moving focus does not select; Enter, Space or a press does." },
        { name: "automatic", type: '"automatic"', description: "The focused item is selected as the arrow keys move, with one item selectable." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-level", type: "item, label, indicator", description: "The item's depth, from 1 at the top level. Also in --tree-level." },
        { name: "data-branch", type: "item, label, indicator", description: "The item has children, or branch is set." },
        { name: "data-expanded", type: "item, label, indicator", description: "A branch is expanded. The wrapper turns the indicator a quarter turn." },
        { name: "data-selected", type: "item, label", description: "The item's value is in the tree's value. Separate from checked." },
        { name: "data-current", type: "item, label", description: "The item for the current page, from current. Gets aria-current='page' and the tab stop first." },
        { name: "data-checked / data-unchecked / data-indeterminate", type: "item, checkbox", description: "The item's tri-state checkbox, with checkable." },
        { name: "data-disabled", type: "root, item, label, indicator, checkbox", description: "The item, or the whole tree, is disabled." },
        { name: "data-loading / data-failed", type: "item, label, indicator", description: "loadChildren is running, or its last run rejected." },
        { name: "data-pending", type: "item, label, indicator", description: "The item's onAction promise hasn't settled." },
        { name: "data-open / data-closed", type: "group", description: "The group's branch is expanded, or collapsed (including while it animates out)." },
        { name: "--tree-level", type: "item", description: "The item's depth, for indenting a flat tree." },
        { name: "--tree-group-height", type: "group", description: "The group's content height in pixels while it animates, auto once expanded and 0px while collapsed." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Tree (root)"
      rows={[
        { name: "items", type: "TreeItemData[]", description: "The hierarchy as data. Renders the rows when the tree has no children of its own, and gives the tree its whole shape even where rows aren't rendered." },
        { name: "paths", type: "readonly string[]", description: "Items from file paths. Each folder becomes a branch, folders first; a path ending in '/' is an empty folder." },
        { name: "mode", type: '"none" | "single" | "multiple"', default: '"single"', description: "How many items can be selected. Checkboxes are separate, with checkable." },
        { name: "value", type: "TreeValue<Mode>", description: "The selection: a string or null, or a string[] with mode='multiple'. Bind with bind:value." },
        { name: "defaultValue", type: "TreeValue<Mode>", description: "The value selected at first, when uncontrolled." },
        { name: "activation", type: '"automatic" | "manual"', default: '"manual"', description: "Whether moving focus selects, with one item selectable." },
        { name: "expanded", type: "string[]", description: "The expanded branches' values. Bind with bind:expanded." },
        { name: "defaultExpanded", type: "string[]", description: "The branches expanded at first. The ancestors of current are added." },
        { name: "expandOnPress", type: "boolean", default: "true", description: "Whether pressing a branch's row expands or collapses it. Its indicator always does." },
        { name: "checkable", type: "boolean", default: "false", description: "Gives every item a tri-state checkbox, kept apart from the selection. Space checks the focused item." },
        { name: "checked", type: "string[]", description: "The checked items, as checkStrategy reports them. Bind with bind:checked." },
        { name: "defaultChecked", type: "string[]", description: "The items checked at first. A branch stands for everything in it." },
        { name: "checkStrategy", type: '"leaf" | "trunk" | "branch" | "independent"', default: '"leaf"', description: "Which items the checked value lists." },
        { name: "onAction", type: "(value, details) => unknown", description: "Runs when an item is pressed or Enter is pressed on it, apart from selecting it. Return a promise to mark the item pending until it settles." },
        { name: "pendingAnnouncement", type: "string", default: '"Loading"', description: "What screen readers hear once an action has been pending for a second. An empty string says nothing." },
        { name: "loadChildren", type: "(value, { signal }) => void | Promise<unknown>", description: "Loads a branch's children the first time it expands while it has none. A rejection marks it data-failed and the next expand tries again." },
        { name: "current", type: "string | null", description: "The item for the current page. It gets aria-current='page', takes the tab stop first, and its ancestors expand." },
        { name: "onHighlight", type: "(value, details) => void", description: "Runs when the keyboard moves focus to an item, with its row among the items that show, from 0." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables every item. A disabled fieldset around the tree does the same." },
        { name: "focusableWhenDisabled", type: "boolean", default: "true", description: "Whether disabled items take focus, so a screen reader still finds them." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Whether collapsed branches keep their groups in the page, hidden." },
        { name: "hiddenUntilFound", type: "boolean", default: "false", description: "Keeps collapsed groups as hidden='until-found', so find in page can match their text and expand them." },
        { name: "announcement", type: "(change: TreeAnnouncement) => string | null | undefined", description: "What screen readers hear when a branch expands, collapses, starts loading or fails to load. Return null for nothing." },
        { name: "controller", type: "TreeController", description: "Drives the tree from anywhere. Create one with createTreeController()." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when the selection wants to change. details.cancel() stops it, and a bound value stays as it was." },
        { name: "onExpandedChange", type: "(expanded, details) => void", description: "Runs when branches want to expand or collapse. details.cancel() stops it." },
        { name: "onCheckedChange", type: "(checked, details) => void", description: "Runs when checkboxes want to change. details.cancel() stops it." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason." },
        { name: "class", type: "string", description: "Merged onto the tree; your classes win over the wrapper's." },
      ]}
    />
    <PropsTable
      caption="TreeItem"
      rows={[
        { name: "value", type: "string", description: "Identifies the item, unique in the tree. Required. Passed to onAction and listed by value, expanded and checked." },
        { name: "branch", type: "boolean", description: "Whether it's a branch. Set automatically when it has a TreeGroup; set it yourself for a branch whose children load later." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops it from being selected, checked, expanded or run. It stays focusable unless focusableWhenDisabled is false." },
        { name: "label", type: "string", description: "The text typeahead matches, when its label isn't plain text." },
      ]}
    />
    <PropsTable
      caption="TreeGroup"
      rows={[
        { name: "keepMounted", type: "boolean", description: "Whether the group stays in the page, hidden, while collapsed. Overrides the tree's." },
        { name: "hiddenUntilFound", type: "boolean", description: "Whether the group stays findable with hidden='until-found' while collapsed. Overrides the tree's." },
      ]}
    />
    <PropsTable
      caption="TreeItemLabel, TreeItemIndicator, TreeItemCheckbox"
      rows={[
        { name: "children", type: "Snippet<[TreeItemState]>", description: "The label's text, the indicator's icon, or nothing for the checkbox, which draws its own mark. The snippet receives the item's state." },
        { name: "render", type: "Snippet", description: "Swaps the element. Render the label as an <a> to make the item a link; a link inside an item leaves the tab order to the item." },
        { name: "class", type: "string", description: "Merged onto the part. The label carries the row's indentation, height and state colours." },
      ]}
    />
    <PropsTable
      caption="TreeItems"
      rows={[
        { name: "items", type: "TreeItemData[]", description: "The rows to render, recursively. Required." },
        { name: "checkable", type: "boolean", default: "false", description: "Negentropy addition: render a checkbox in every row. The tree passes its own checkable when it renders the data itself." },
      ]}
    />
    <PropsTable
      caption="TreeItemData"
      rows={[
        { name: "value", type: "string", description: "Identifies the item. Unique in the tree." },
        { name: "label", type: "string", description: "What it shows, and what typeahead matches." },
        { name: "children", type: "TreeItemData[]", description: "Its children. Leave it out for a leaf. An empty array is a branch with no children, or one whose children load when it opens." },
        { name: "disabled", type: "boolean", description: "Whether it can't be selected, checked or activated. It can still take focus." },
        { name: "href", type: "string", description: "Makes the item a link to this address." },
      ]}
    />
    <PropsTable
      caption="TreeController"
      rows={[
        { name: "getExpanded() / setExpanded(values, options?)", type: "() => string[] / (string[], options?) => boolean", description: "Read or replace the expanded branches." },
        { name: "isExpanded(value) / expand(value) / collapse(value) / toggle(value)", type: "(string) => boolean", description: "Inspect or change one branch. expand loads its children first with loadChildren when it has none." },
        { name: "expandAll() / collapseAll()", type: "(options?) => boolean", description: "Open or close every branch, including ones that render inside another later." },
        { name: "getValue() / setValue(value, options?)", type: "() => string | string[] | null", description: "Read or replace the selection." },
        { name: "getChecked() / setChecked(values, options?)", type: "() => string[]", description: "Read or replace the checked value, as checkStrategy reports it." },
        { name: "checkedState(value)", type: "(string) => TreeCheckedState", description: "true, false or 'indeterminate' for one item's checkbox." },
        { name: "reveal(value)", type: "(string) => void", description: "Expands an item's ancestors, scrolls it into view and focuses it." },
        { name: "focus(value?)", type: "(string?) => void", description: "Focuses an item, or the item with the tab stop." },
      ]}
    />
    <PropsTable
      caption="Re-exports from #lib/components/tree"
      rows={[
        { name: "createTreeController", type: "() => TreeController", description: "Creates the controller you pass as the controller prop." },
        { name: "treeFromPaths", type: "(paths: readonly string[]) => TreeItemData[]", description: "The same data the paths prop builds, for rendering the rows yourself." },
        { name: "visibleTreeRows", type: "(items, expanded) => TreeRow[]", description: "The rows that show, with item, parent, level and index, for a flat or virtualized list." },
        { name: "treeCheckedStates", type: "(tree, value, strategy?) => (key) => TreeCheckedState", description: "Every node's checkbox state from one pass over the tree." },
        { name: "toggleTreeChecked", type: "(tree, value, key, options?) => string[]", description: "The checked value after one node's checkbox is pressed." },
        { name: "TreeMode / TreeValue / TreeCheckStrategy / TreeCheckedState", type: "type", description: "The selection mode, its value type, the check strategy and a checkbox's state." },
        { name: "TreeOptions / TreeState / TreeItemProps / TreeItemState / TreeGroupProps / TreeGroupState / TreeItemPartProps", type: "type", description: "Props and state for the root and each part." },
        { name: "TreeItemData / TreeRow / TreeCollection / TreeCollectionNode", type: "type", description: "The data shapes and the collection the tree builds from them." },
        { name: "TreeActionDetails / TreeAnnouncement / ListHighlightDetails / TreeChangeOptions", type: "type", description: "Callback payloads and controller write options." },
        { name: "TreeValueChangeReason / TreeExpandedChangeReason / TreeCheckedChangeReason", type: "type", description: "Why a value, expansion or check changed: item-press, trigger-press, list-navigation, find-in-page or imperative." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA tree view pattern: <code class="font-mono text-accent">role="tree"</code> with <code class="font-mono text-accent">role="treeitem"</code> rows and <code class="font-mono text-accent">role="group"</code> for a branch's children.</li>
      <li>Each item reports <code class="font-mono text-accent">aria-level</code>, <code class="font-mono text-accent">aria-posinset</code> and <code class="font-mono text-accent">aria-setsize</code>; branches add <code class="font-mono text-accent">aria-expanded</code>, and a checkable tree adds <code class="font-mono text-accent">aria-checked</code> with <code class="font-mono text-accent">"mixed"</code> for a partly checked branch.</li>
      <li>The tree has one tab stop. Tab enters at the current page's item, the selected item, or the first item, then returns to the item focused last. A link inside a label leaves the tab order to its item.</li>
      <li><span class="text-fg">Down/Up</span> focus the next or previous visible item; <span class="text-fg">Home/End</span> the first or last.</li>
      <li><span class="text-fg">Right</span> expands a branch, or enters its first child; <span class="text-fg">Left</span> collapses a branch, or focuses its parent. In right-to-left text the two swap.</li>
      <li><span class="text-fg">Alt+Right</span> and <span class="text-fg">Alt+Left</span> expand or collapse a branch and all its descendants. <span class="text-fg">*</span> expands the sibling branches.</li>
      <li><span class="text-fg">Enter</span> selects and runs the item's action, or follows its link. <span class="text-fg">Space</span> checks the item when checkable, otherwise selects it.</li>
      <li><span class="text-fg">Shift+Down/Up</span> extend a multiple selection; <span class="text-fg">Cmd/Ctrl+A</span> selects the visible items.</li>
      <li>Typing focuses the next item whose label starts with that text. Set <code class="font-mono text-accent">label</code> on an item whose visible text isn't plain.</li>
      <li>The indicator and the checkbox are <code class="font-mono text-accent">aria-hidden</code>: screen readers hear the item's own expanded and checked state instead. Give the tree an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>A loading or pending item reports <code class="font-mono text-accent">aria-busy</code>. <code class="font-mono text-accent">announcement</code> and <code class="font-mono text-accent">pendingAnnouncement</code> put expanding, collapsing, loading and failure into words; expanding and collapsing are announced on Apple platforms only, where VoiceOver doesn't read the change.</li>
      <li>Disabled items stay focusable by default so they can be discovered, but cannot be selected, checked, expanded or run.</li>
      <li><code class="font-mono text-accent">hiddenUntilFound</code> keeps collapsed groups findable, so the browser's find in page can match their text and expand them.</li>
    </ul>
  </Section>
</div>