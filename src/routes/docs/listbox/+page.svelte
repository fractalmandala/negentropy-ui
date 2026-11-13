<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Listbox,
    ListboxItem,
    ListboxItemIndicator,
    ListboxItemIcon,
    ListboxGroup,
    ListboxGroupLabel,
    ListboxSeparator,
    createListboxController,
    type ListData,
  } from "#lib/components/listbox"
  import { Field, FieldLabel, FieldDescription } from "#lib/components/field"
  import { Button } from "#lib/components/button"
  import { Archive, ArrowRight, Check, File, Mail, Pencil, Star } from "@lucide/svelte"

  type Plan = { id: string; price: number }

  const topics = [
    { value: "comments", label: "Comments" },
    { value: "mentions", label: "Mentions" },
    { value: "reactions", label: "Reactions" },
    { value: "sign-ins", label: "New sign-ins" },
    { value: "billing", label: "Billing" },
  ]

  const toppings = [
    { value: "basil", label: "Basil" },
    { value: "cheese", label: "Extra cheese" },
    { value: "mushroom", label: "Mushroom" },
    { value: "olive", label: "Olive" },
    { value: "onion", label: "Onion" },
    { value: "pepper", label: "Pepper" },
  ]

  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "nuxt", label: "Nuxt" },
    { value: "sveltekit", label: "SvelteKit" },
  ]

  const produce = [
    {
      label: "Fruits",
      items: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "orange", label: "Orange" },
      ],
    },
    {
      label: "Vegetables",
      items: [
        { value: "carrot", label: "Carrot" },
        { value: "broccoli", label: "Broccoli" },
        { value: "spinach", label: "Spinach" },
      ],
    },
  ]

  const files = [
    { value: "readme", label: "README.md" },
    { value: "package", label: "package.json" },
    { value: "tsconfig", label: "tsconfig.json" },
    { value: "index", label: "index.ts" },
    { value: "styles", label: "styles.css" },
    { value: "logo", label: "logo.svg" },
  ]

  const sizes = [
    { value: "xs", label: "XS", disabled: false },
    { value: "s", label: "S", disabled: false },
    { value: "m", label: "M", disabled: false },
    { value: "l", label: "L", disabled: false },
    { value: "xl", label: "XL", disabled: true },
  ]

  const views = [
    { value: "inbox", label: "Inbox", icon: Mail, mirror: false },
    { value: "starred", label: "Starred", icon: Star, mirror: false },
    { value: "drafts", label: "Drafts", icon: Pencil, mirror: false },
    { value: "archive", label: "Archive", icon: Archive, mirror: false },
    { value: "next", label: "Next page", icon: ArrowRight, mirror: true },
  ]

  const timezones = Array.from({ length: 27 }, (_, index) => {
    const offset = index - 12
    const label = `UTC${offset < 0 ? "−" : "+"}${String(Math.abs(offset)).padStart(2, "0")}:00`
    return { value: `utc${offset}`, label }
  })

  const plans = [
    { value: { id: "hobby", price: 0 }, label: "Hobby", disabled: false },
    { value: { id: "pro", price: 20 }, label: "Pro", disabled: false },
    { value: { id: "team", price: 50 }, label: "Team", disabled: false },
    { value: { id: "enterprise", price: 200 }, label: "Enterprise", disabled: true },
  ] satisfies ListData<Plan>

  const installCode = `import {
  Listbox, ListboxItem, ListboxItemIndicator,
  ListboxItemIcon, ListboxGroup, ListboxGroupLabel, ListboxSeparator,
  createListboxController,
} from "#lib/components/listbox"`

  const usageCode = `<script lang="ts">
  import { Listbox, ListboxItem, ListboxItemIndicator } from "#lib/components/listbox"
  import { Field, FieldLabel, FieldDescription } from "#lib/components/field"
  import { Check } from "@lucide/svelte"

  const topics = [
    { value: "comments", label: "Comments" },
    { value: "mentions", label: "Mentions" },
    { value: "reactions", label: "Reactions" },
    { value: "sign-ins", label: "New sign-ins" },
    { value: "billing", label: "Billing" },
  ]
<\/script>

<div class="w-full max-w-64">
  <Field>
    <FieldLabel>Email me about</FieldLabel>
    <Listbox defaultValue="mentions">
      {#each topics as item (item.value)}
        <ListboxItem value={item.value}>
          {item.label}
          <ListboxItemIndicator>
            <Check aria-hidden="true" />
          </ListboxItemIndicator>
        </ListboxItem>
      {/each}
    </Listbox>
    <FieldDescription>Arrow keys choose as they move. The list stays in view.</FieldDescription>
  </Field>
</div>`

  const controlledCode = `<script lang="ts">
  let topic = $state<string | null>("mentions")
  let topicReason = $state("none yet")
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => (topic = "billing")}>Billing</Button>
  <Button size="sm" tone="outline" onclick={() => (topic = null)}>Clear</Button>
</div>
<div class="w-full max-w-64">
  <Listbox
    bind:value={topic}
    onValueChange={(value, details) => (topicReason = \`\${value ?? "null"} (\${details.reason})\`)}
    aria-label="Email topic"
  >
    {#each topics as item (item.value)}
      <ListboxItem value={item.value}>
        {item.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
</div>
<p class="text-sm text-muted">value: {topic ?? "null"} · last change: {topicReason}</p>`

  const multipleCode = `<script lang="ts">
  let picked = $state<string[]>(["cheese", "onion"])
<\/script>

<div class="w-full max-w-64">
  <Listbox multiple bind:value={picked} aria-label="Toppings">
    {#each toppings as item (item.value)}
      <ListboxItem value={item.value}>
        {item.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
</div>
<p class="text-sm text-muted">{picked.length} selected: {picked.join(", ") || "none"}</p>`

  const groupsCode = `<div class="w-full max-w-64">
  <Listbox multiple defaultValue={["banana"]} aria-label="Produce">
    {#each produce as group, index (group.label)}
      {#if index > 0}
        <ListboxSeparator />
      {/if}
      <ListboxGroup>
        <ListboxGroupLabel>{group.label}</ListboxGroupLabel>
        {#each group.items as item (item.value)}
          <ListboxItem value={item.value}>
            {item.label}
            <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
          </ListboxItem>
        {/each}
      </ListboxGroup>
    {/each}
  </Listbox>
</div>`

  const activationCode = `<div class="w-full max-w-64">
  <Listbox multiple activation="automatic" defaultValue={["readme"]} aria-label="Files">
    {#each files as file (file.value)}
      <ListboxItem value={file.value}>
        <ListboxItemIcon><File aria-hidden="true" /></ListboxItemIcon>
        {file.label}
      </ListboxItem>
    {/each}
  </Listbox>
</div>`

  const objectCode = `<script lang="ts">
  type Plan = { id: string; price: number }

  const plans = [
    { value: { id: "hobby", price: 0 }, label: "Hobby", disabled: false },
    { value: { id: "pro", price: 20 }, label: "Pro", disabled: false },
    { value: { id: "team", price: 50 }, label: "Team", disabled: false },
    { value: { id: "enterprise", price: 200 }, label: "Enterprise", disabled: true },
  ] satisfies ListData<Plan>

  let planNote = $state("Pro, $20 a month")
<\/script>

<div class="w-full max-w-64">
  <Listbox
    items={plans}
    defaultValue={plans[1].value}
    itemToValue={(plan: Plan) => plan.id}
    isItemEqualToValue={(plan: Plan, selected: Plan) => plan.id === selected.id}
    onValueChange={(plan: Plan | null) =>
      (planNote = plan ? \`\${plan.id}, $\${plan.price} a month\` : "No plan")}
    aria-label="Plan"
  >
    {#each plans as plan (plan.value.id)}
      <ListboxItem value={plan.value} disabled={plan.disabled}>
        {plan.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
</div>
<p class="text-sm text-muted">{planNote}</p>`

  const horizontalCode = `<div class="w-full">
  <Listbox orientation="horizontal" loop={false} defaultValue="m" aria-label="Size">
    {#each sizes as size (size.value)}
      <ListboxItem value={size.value} disabled={size.disabled}>{size.label}</ListboxItem>
    {/each}
  </Listbox>
</div>`

  const manualCode = `<div class="flex w-full flex-col gap-4 sm:flex-row">
  <div class="w-full max-w-56">
    <Listbox activation="manual" aria-label="Framework">
      {#each frameworks as item (item.value)}
        <ListboxItem value={item.value}>
          {item.label}
          <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
        </ListboxItem>
      {/each}
    </Listbox>
  </div>
  <div class="w-full max-w-56">
    <Listbox deselectable defaultValue="astro" aria-label="Optional framework">
      {#each frameworks as item (item.value)}
        <ListboxItem value={item.value}>
          {item.label}
          <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
        </ListboxItem>
      {/each}
    </Listbox>
  </div>
</div>`

  const scrollableCode = `<script lang="ts">
  let zoneFocus = $state("UTC+09:00")
<\/script>

<div class="w-full max-w-64">
  <Listbox
    defaultValue="utc9"
    onHighlight={(value, details) => {
      if (value) {
        zoneFocus = \`\${timezones[details.index].label} (\${details.index + 1} of \${timezones.length})\`
      }
    }}
    aria-label="Time zone"
  >
    {#each timezones as zone, index (zone.value)}
      <ListboxItem value={zone.value} {index}>
        {zone.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
</div>
<p class="text-sm text-muted">focused: {zoneFocus}</p>`

  const iconsCode = `<script lang="ts">
  import { Archive, ArrowRight, Mail, Pencil, Star } from "@lucide/svelte"

  const views = [
    { value: "inbox", label: "Inbox", icon: Mail, mirror: false },
    { value: "starred", label: "Starred", icon: Star, mirror: false },
    { value: "drafts", label: "Drafts", icon: Pencil, mirror: false },
    { value: "archive", label: "Archive", icon: Archive, mirror: false },
    { value: "next", label: "Next page", icon: ArrowRight, mirror: true },
  ]
<\/script>

<div class="w-full max-w-64">
  <Listbox defaultValue="inbox" aria-label="Mailbox">
    {#each views as view (view.value)}
      <ListboxItem value={view.value}>
        <ListboxItemIcon mirror={view.mirror}><view.icon aria-hidden="true" /></ListboxItemIcon>
        {view.label}
      </ListboxItem>
    {/each}
  </Listbox>
</div>`

  const controllerCode = `<script lang="ts">
  import { createListboxController } from "#lib/components/listbox"

  const toppingController = createListboxController<string, true>()
  let controllerCount = $state(0)
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => toppingController.selectAll()}>Select all</Button>
  <Button size="sm" tone="outline" onclick={() => toppingController.clear()}>Clear</Button>
  <Button size="sm" tone="outline" onclick={() => toppingController.focus()}>Focus</Button>
</div>
<div class="w-full max-w-64">
  <Listbox
    multiple
    controller={toppingController}
    onValueChange={(value: string[]) => (controllerCount = value.length)}
    aria-label="Toppings"
  >
    {#each toppings as item (item.value)}
      <ListboxItem value={item.value}>
        {item.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
</div>
<p class="text-sm text-muted">{controllerCount} selected</p>`

  const statesCode = `<div class="flex w-full max-w-64 flex-col gap-3">
  <Listbox defaultValue="astro" disabled aria-label="Framework, disabled">
    {#each frameworks as item (item.value)}
      <ListboxItem value={item.value}>
        {item.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
  <Listbox defaultValue="astro" readOnly aria-label="Framework, read-only">
    {#each frameworks as item (item.value)}
      <ListboxItem value={item.value}>
        {item.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
</div>`

  const formCode = `<script lang="ts">
  let orderLog = $state("Nothing ordered yet.")
<\/script>

<form
  class="flex w-full max-w-64 flex-col gap-3"
  onsubmit={(event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    orderLog = \`Ordered \${data.getAll("toppings").join(", ") || "nothing"}\`
  }}
>
  <Listbox multiple name="toppings" required defaultValue={["cheese"]} aria-label="Toppings">
    {#each toppings as item (item.value)}
      <ListboxItem value={item.value}>
        {item.label}
        <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
      </ListboxItem>
    {/each}
  </Listbox>
  <div class="flex gap-2">
    <Button size="sm" tone="outline" type="reset">Reset</Button>
    <Button size="sm" type="submit">Order</Button>
  </div>
  <p class="text-sm text-muted">{orderLog}</p>
</form>`

  let topic = $state<string | null>("mentions")
  let topicReason = $state("none yet")
  let picked = $state<string[]>(["cheese", "onion"])
  let planNote = $state("Pro, $20 a month")
  let zoneFocus = $state("UTC+09:00")
  let controllerCount = $state(0)
  let orderLog = $state("Nothing ordered yet.")
  const toppingController = createListboxController<string, true>()
</script>

<svelte:head>
  <title>Listbox — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Listbox"
  description="Choose one option, or several with multiple, from a list that stays in view. Wraps the ui-sdk Listbox, which handles focus, keyboard navigation, typeahead, ranges and the value submitted with a form."
  entry="@ui-sdk/svelte/listbox"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/listbox</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The root is the list itself: it renders a bordered, scrollable column, so there is no trigger or
      popup to compose. Give it an accessible name with a <code class="font-mono text-accent">FieldLabel</code>,
      <code class="font-mono text-accent">aria-label</code> or <code class="font-mono text-accent">aria-labelledby</code>,
      and give every option a unique <code class="font-mono text-accent">value</code>.
      <code class="font-mono text-accent">ListboxItemIndicator</code> renders only while its option is selected.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Keep buttons, search fields and empty messages outside the root: its children should be options,
      groups and separators. The list is capped at <code class="font-mono text-accent">max-h-72</code> and
      scrolls on its own; pass <code class="font-mono text-accent">class</code> to change its height or width.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="One option at a time. Arrow keys, Home, End and typing select as they move, and a Field label names the list." code={usageCode}>
      <div class="w-full max-w-64">
        <Field>
          <FieldLabel>Email me about</FieldLabel>
          <Listbox defaultValue="mentions">
            {#each topics as item (item.value)}
              <ListboxItem value={item.value}>
                {item.label}
                <ListboxItemIndicator>
                  <Check aria-hidden="true" />
                </ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
          <FieldDescription>Arrow keys choose as they move. The list stays in view.</FieldDescription>
        </Field>
      </div>
    </Demo>

    <Demo title="Controlled value" description="bind:value owns the selection, so buttons elsewhere can change it. onValueChange reports why it changed." code={controlledCode}>
      <div class="flex w-full flex-col items-center gap-4">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => (topic = "billing")}>Billing</Button>
          <Button size="sm" tone="outline" onclick={() => (topic = null)}>Clear</Button>
        </div>
        <div class="w-full max-w-64">
          <Listbox
            bind:value={topic}
            onValueChange={(value: unknown, details: { reason: string }) => (topicReason = `${String(value ?? "null")} (${details.reason})`)}
            aria-label="Email topic"
          >
            {#each topics as item (item.value)}
              <ListboxItem value={item.value}>
                {item.label}
                <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
        </div>
        <p class="text-sm text-muted">value: {topic ?? "null"} · last change: {topicReason}</p>
      </div>
    </Demo>

    <Demo title="Multiple with ranges" description="A press or Space toggles an option. Shift selects a range from the last one chosen, and Ctrl or ⌘ with A selects everything, then clears." code={multipleCode}>
      <div class="flex w-full flex-col items-center gap-3">
        <div class="w-full max-w-64">
          <Listbox multiple bind:value={picked} aria-label="Toppings">
            {#each toppings as item (item.value)}
              <ListboxItem value={item.value}>
                {item.label}
                <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
        </div>
        <p class="text-sm text-muted">{picked.length} selected: {picked.join(", ") || "none"}</p>
      </div>
    </Demo>

    <Demo title="Groups" description="ListboxGroup and ListboxGroupLabel name a set of options; arrows move across groups and skip their labels. A range crosses them too." code={groupsCode}>
      <div class="w-full max-w-64">
        <Listbox multiple defaultValue={["banana"]} aria-label="Produce">
          {#each produce as group, index (group.label)}
            {#if index > 0}
              <ListboxSeparator />
            {/if}
            <ListboxGroup>
              <ListboxGroupLabel>{group.label}</ListboxGroupLabel>
              {#each group.items as item (item.value)}
                <ListboxItem value={item.value}>
                  {item.label}
                  <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
                </ListboxItem>
              {/each}
            </ListboxGroup>
          {/each}
        </Listbox>
      </div>
    </Demo>

    <Demo title="Selection that follows focus" description="With multiple and activation=&quot;automatic&quot;, a press or an arrow replaces the selection and Ctrl or ⌘ adds to it, like a file list. The tinted row is the selection." code={activationCode}>
      <div class="w-full max-w-64">
        <Listbox multiple activation="automatic" defaultValue={["readme"]} aria-label="Files">
          {#each files as file (file.value)}
            <ListboxItem value={file.value}>
              <ListboxItemIcon><File aria-hidden="true" /></ListboxItemIcon>
              {file.label}
            </ListboxItem>
          {/each}
        </Listbox>
      </div>
    </Demo>

    <Demo title="Object values" description="items carries the collection as data. itemToValue gives each object a string identity, and isItemEqualToValue matches two objects that mean the same option." code={objectCode}>
      <div class="flex w-full flex-col items-center gap-3">
        <div class="w-full max-w-64">
          <Listbox
            items={plans}
            defaultValue={plans[1].value}
            itemToValue={(plan: Plan) => plan.id}
            isItemEqualToValue={(plan: Plan, selected: Plan) => plan.id === selected.id}
            onValueChange={(plan: Plan | null) =>
              (planNote = plan ? `${plan.id}, $${plan.price} a month` : "No plan")}
            aria-label="Plan"
          >
            {#each plans as plan (plan.value.id)}
              <ListboxItem value={plan.value} disabled={plan.disabled}>
                {plan.label}
                <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
        </div>
        <p class="text-sm text-muted">{planNote}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      The root styles itself from its own state: <code class="font-mono text-accent">data-orientation</code>
      turns the column into a row of pills, <code class="font-mono text-accent">data-disabled</code> dims it and
      <code class="font-mono text-accent">data-readonly</code> gives it a filled background. Options carry
      <code class="font-mono text-accent">data-selected</code> and <code class="font-mono text-accent">data-highlighted</code>,
      which describe different rows when selection does not follow focus.
    </p>

    <Demo title="Horizontal" description="orientation=&quot;horizontal&quot; lays the options out in a row and switches to Left and Right. loop=false stops at either end; XL can't be chosen." code={horizontalCode}>
      <div class="w-full">
        <Listbox orientation="horizontal" loop={false} defaultValue="m" aria-label="Size">
          {#each sizes as size (size.value)}
            <ListboxItem value={size.value} disabled={size.disabled}>{size.label}</ListboxItem>
          {/each}
        </Listbox>
      </div>
    </Demo>

    <Demo title="Manual activation and deselectable" description="Left: arrows only browse, and Space, Enter or a press chooses. Right: pressing the chosen option again leaves nothing selected." code={manualCode}>
      <div class="flex w-full flex-col gap-4 sm:flex-row">
        <div class="w-full max-w-56">
          <Listbox activation="manual" aria-label="Framework">
            {#each frameworks as item (item.value)}
              <ListboxItem value={item.value}>
                {item.label}
                <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
        </div>
        <div class="w-full max-w-56">
          <Listbox deselectable defaultValue="astro" aria-label="Optional framework">
            {#each frameworks as item (item.value)}
              <ListboxItem value={item.value}>
                {item.label}
                <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
        </div>
      </div>
    </Demo>

    <Demo title="Scrollable" description="27 options in a capped list. It opens scrolled to the chosen one without taking focus, and keys keep the focused row clear of the scroll padding. index places each row in the whole collection." code={scrollableCode}>
      <div class="flex w-full flex-col items-center gap-3">
        <div class="w-full max-w-64">
          <Listbox
            defaultValue="utc9"
            onHighlight={(value, details) => {
              if (value) {
                zoneFocus = `${timezones[details.index].label} (${details.index + 1} of ${timezones.length})`
              }
            }}
            aria-label="Time zone"
          >
            {#each timezones as zone, index (zone.value)}
              <ListboxItem value={zone.value} {index}>
                {zone.label}
                <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
        </div>
        <p class="text-sm text-muted">focused: {zoneFocus}</p>
      </div>
    </Demo>

    <Demo title="Icons" description="ListboxItemIcon holds a leading icon and sets data-has-icons on the list. mirror flips the arrow in right-to-left text; the other icons picture a thing and stay as they are." code={iconsCode}>
      <div class="w-full max-w-64">
        <Listbox defaultValue="inbox" aria-label="Mailbox">
          {#each views as view (view.value)}
            <ListboxItem value={view.value}>
              <ListboxItemIcon mirror={view.mirror}><view.icon aria-hidden="true" /></ListboxItemIcon>
              {view.label}
            </ListboxItem>
          {/each}
        </Listbox>
      </div>
    </Demo>

    <Demo title="Controller" description="createListboxController drives the list from buttons outside it: select every enabled option, clear, or move focus onto the row that holds the tab stop." code={controllerCode}>
      <div class="flex w-full flex-col items-center gap-3">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => toppingController.selectAll()}>Select all</Button>
          <Button size="sm" tone="outline" onclick={() => toppingController.clear()}>Clear</Button>
          <Button size="sm" tone="outline" onclick={() => toppingController.focus()}>Focus</Button>
        </div>
        <div class="w-full max-w-64">
          <Listbox
            multiple
            controller={toppingController}
            onValueChange={(value: string[]) => (controllerCount = value.length)}
            aria-label="Toppings"
          >
            {#each toppings as item (item.value)}
              <ListboxItem value={item.value}>
                {item.label}
                <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
              </ListboxItem>
            {/each}
          </Listbox>
        </div>
        <p class="text-sm text-muted">{controllerCount} selected</p>
      </div>
    </Demo>

    <Demo title="Disabled and read-only" description="A disabled list can't be focused or changed and submits nothing. A read-only one stays focusable, can be browsed, and still submits its value." code={statesCode}>
      <div class="flex w-full max-w-64 flex-col gap-3">
        <Listbox defaultValue="astro" disabled aria-label="Framework, disabled">
          {#each frameworks as item (item.value)}
            <ListboxItem value={item.value}>
              {item.label}
              <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
            </ListboxItem>
          {/each}
        </Listbox>
        <Listbox defaultValue="astro" readOnly aria-label="Framework, read-only">
          {#each frameworks as item (item.value)}
            <ListboxItem value={item.value}>
              {item.label}
              <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
            </ListboxItem>
          {/each}
        </Listbox>
      </div>
    </Demo>

    <Demo title="In a form" description="name submits one entry per selected option. required blocks the order until something is chosen, and Reset returns to defaultValue." code={formCode}>
      <form
        class="flex w-full max-w-64 flex-col gap-3"
        onsubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          orderLog = `Ordered ${data.getAll("toppings").join(", ") || "nothing"}`
        }}
      >
        <Listbox multiple name="toppings" required defaultValue={["cheese"]} aria-label="Toppings">
          {#each toppings as item (item.value)}
            <ListboxItem value={item.value}>
              {item.label}
              <ListboxItemIndicator><Check aria-hidden="true" /></ListboxItemIndicator>
            </ListboxItem>
          {/each}
        </Listbox>
        <div class="flex gap-2">
          <Button size="sm" tone="outline" type="reset">Reset</Button>
          <Button size="sm" type="submit">Order</Button>
        </div>
        <p class="text-sm text-muted">{orderLog}</p>
      </form>
    </Demo>

    <PropsTable
      caption="Root orientation"
      rows={[
        { name: "vertical", type: "default", description: "A bordered, scrollable column up to 18rem tall. Up and Down move between options." },
        { name: "horizontal", type: "string", description: "An unbordered row of pills that scrolls sideways. Left and Right move between options, swapped in right-to-left text." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: root <code class="font-mono text-accent">data-orientation</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code>,
      <code class="font-mono text-accent">data-has-icons</code>; item
      <code class="font-mono text-accent">data-selected</code>,
      <code class="font-mono text-accent">data-highlighted</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-has-icon</code>; indicator
      <code class="font-mono text-accent">data-selected</code>; icon
      <code class="font-mono text-accent">data-mirror</code>. Every part also has a
      <code class="font-mono text-accent">data-slot</code>, such as
      <code class="font-mono text-accent">listbox-item</code>. Groups, group labels and separators have no state attributes.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Listbox (root)"
      rows={[
        { name: "value", type: "T | T[] | null", description: "The selected value, or values with multiple. Bind with bind:value to control. null selects nothing." },
        { name: "defaultValue", type: "T | T[] | null", description: "The value selected at first, when uncontrolled. A form reset returns to it." },
        { name: "multiple", type: "boolean", default: "false", description: "Whether several options can be selected. The value is then a list, Shift selects ranges and Ctrl or ⌘ with A selects every option." },
        { name: "activation", type: '"automatic" | "manual"', default: '"automatic" for single, "manual" for multiple', description: "Whether selection follows focus. automatic: arrows, Home, End and typing select as they move, and with multiple a press replaces while Ctrl or ⌘ adds. manual: keys only move focus, and Space, Enter or a press chooses." },
        { name: "deselectable", type: "boolean", default: "false", description: "Whether pressing the selected option of a single list unselects it, so nothing is selected." },
        { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Which arrow keys move between options, and how the wrapper lays them out." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last option to the first. Shift with an arrow never wraps." },
        { name: "keepInView", type: "boolean", default: "true", description: "Whether the list scrolls the option keys move to into view, and the selected option when it first shows. Turn it off when something else scrolls the list." },
        { name: "items", type: "ListData<T>", description: "The options as data. Renders them for you, and lets typing find options a virtualized list hasn't rendered." },
        { name: "itemToValue", type: "(value: T) => string", description: "The string an option's value submits as and is identified by, for object values. Strings pass through; objects use their value or id." },
        { name: "isItemEqualToValue", type: "(itemValue: T, value: T) => boolean", description: "Whether an option's value is the selected value, for object values that aren't the same object." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the list like a native control: its options can't be focused or chosen, and the value isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Keeps the list focusable and its value submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until a value is selected, with the browser's own message." },
        { name: "name", type: "string", description: "The name the value submits under. Without one, the list submits nothing." },
        { name: "form", type: "string", description: "The id of a form to belong to, when the list isn't inside that form." },
        { name: "controller", type: "ListboxController<T, Multiple>", description: "Reads and sets the list from anywhere. Create one with createListboxController<T, Multiple>()." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when a user, a form reset or a controller wants to change the value. details.reason says why; details.cancel() stops it, and a bound value only updates when it wasn't canceled." },
        { name: "onHighlight", type: "(value: T | null, details: ListHighlightDetails) => void", description: "Runs when focus moves to another option, with its index among the options, so a virtualized list can scroll to it." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason to the console, in development builds." },
        { name: "class", type: "string", description: "Extra classes merged onto the list, for height, width or a different surface." },
        { name: "children", type: "Snippet<[ListboxState]>", description: "The options, groups and separators. Receives the list's state." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="ListboxItem"
      rows={[
        { name: "value", type: "T", description: "Required. What the value becomes when the option is chosen. A string, or any value with itemToValue." },
        { name: "label", type: "string", description: "The text typing finds, when the content isn't plain text. Not the accessible name: use aria-label for that." },
        { name: "disabled", type: "boolean", default: "false", description: "Keeps the option from being chosen. Arrows, typing and ranges skip it, but it can still be focused." },
        { name: "index", type: "number", description: "The option's position among all options, for virtualized lists that render only some. Sets aria-posinset and aria-setsize." },
        { name: "class", type: "string", description: "Extra classes merged onto the option." },
        { name: "children", type: "Snippet<[ListboxItemState]>", description: "Content. Receives highlighted, selected and disabled." },
        { name: "render", type: "Snippet", description: "Renders your own element, such as a link, with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="ListboxItemIndicator"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "Stays in the page while its option isn't selected, so both states can be styled or animated." },
        { name: "class", type: "string", description: "Extra classes merged onto the indicator, which sits at the row's end." },
        { name: "children", type: "Snippet<[ListboxItemIndicatorState]>", description: "Content, usually a check icon. Receives selected." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="ListboxItemIcon"
      rows={[
        { name: "mirror", type: "boolean", default: "false", description: "Flips the icon horizontally in right-to-left text, for icons that point a way, like arrows and chevrons." },
        { name: "class", type: "string", description: "Extra classes merged onto the icon holder." },
        { name: "children", type: "Snippet<[ListboxItemIconState]>", description: "The icon. Receives mirror." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="ListboxGroup / ListboxGroupLabel / ListboxSeparator"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
        { name: "children", type: "Snippet", description: "Content. A group holds a label and options; a separator holds nothing." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="createListboxController<T, Multiple>()"
      rows={[
        { name: "getValue()", type: "() => ListboxValue<T, Multiple>", description: "The selected value: one value or null, or a list with multiple." },
        { name: "setValue(value, options?)", type: "(value, options?: ListboxChangeOptions) => boolean", description: "Selects a value as a user would. A disabled or read-only list ignores it. Returns false when canceled or unchanged." },
        { name: "clear(options?)", type: "(options?: ListboxChangeOptions) => boolean", description: "Selects nothing: null, or an empty list with multiple." },
        { name: "selectAll(options?)", type: "(options?: ListboxChangeOptions) => boolean", description: "Selects every enabled option, with multiple." },
        { name: "focus()", type: "() => void", description: "Moves focus into the list, onto the option that holds its tab stop." },
      ]}
    />
    <PropsTable
      caption="Change reasons"
      rows={[
        { name: "item-press", type: "MouseEvent | KeyboardEvent", description: "A press, Space or Enter chose an option." },
        { name: "list-navigation", type: "KeyboardEvent", description: "Arrows, Home or End moved the selection, typing picked an option, a Shift range extended it, or Ctrl or ⌘ with A selected every option." },
        { name: "reset", type: "none", description: "A form reset returned to defaultValue." },
        { name: "restore", type: "none", description: "The browser restored state, like after going back." },
        { name: "imperative", type: "none", description: "A controller call set the value." },
      ]}
    />
    <PropsTable
      caption="Snippet state"
      rows={[
        { name: "Listbox", type: "{ multiple, orientation, disabled, readOnly, required, items }", description: "items holds the data options, for rendering a virtualized list yourself. Empty without items." },
        { name: "ListboxItem", type: "{ highlighted, selected, disabled }", description: "Whether the option has focus, is chosen, or can't be chosen. Focus and selection differ when activation is manual." },
        { name: "ListboxItemIndicator", type: "{ selected }", description: "Whether its option is selected. While false the indicator isn't shown unless keepMounted is set." },
        { name: "ListboxItemIcon", type: "{ mirror }", description: "Whether the icon flips in right-to-left text." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA listbox pattern, with both of its keyboard models for several options. Every option says whether it is selected, and the list needs an accessible name: a <code class="font-mono text-accent">FieldLabel</code>, <code class="font-mono text-accent">aria-label</code> or <code class="font-mono text-accent">aria-labelledby</code>.</li>
      <li>The list is one tab stop with a roving focus. <span class="text-fg">Tab</span> lands on the last focused option, or the first selected or enabled one; <span class="text-fg">Shift+Tab</span> back into the list returns to the option focused last. Options take real DOM focus, so <code class="font-mono text-accent">focus-visible</code> works directly.</li>
      <li>The root forwards focus into the options, including when you press a Field label or the list's own padding. <span class="text-fg">Escape</span> leaves the selection alone and stays available to a dialog around the list.</li>
      <li><span class="text-fg">ArrowUp</span>/<span class="text-fg">ArrowDown</span> move between options and skip disabled ones; <span class="text-fg">Home</span> and <span class="text-fg">End</span> reach the first and last. <code class="font-mono text-accent">loop=false</code> stops at either end. A horizontal list uses <span class="text-fg">Left</span> and <span class="text-fg">Right</span>, swapped in right-to-left text.</li>
      <li>Choosing one option: arrows, Home, End and typing select as they move, and a press selects. Typing several letters finds the option that starts with them. With <code class="font-mono text-accent">activation="manual"</code> keys only browse and <span class="text-fg">Space</span>, <span class="text-fg">Enter</span> or a press chooses. With <code class="font-mono text-accent">deselectable</code>, pressing the chosen option unselects it.</li>
      <li>Choosing several options: a press or <span class="text-fg">Space</span> toggles, and arrows move focus without changing the selection. <span class="text-fg">Shift</span> with a press, an arrow or Space selects a range from the last option chosen, keeping what was selected before the range began. <span class="text-fg">Ctrl/⌘+Shift+Home</span> or <span class="text-fg">End</span> extends the range to the first or last option, and <span class="text-fg">Ctrl/⌘+A</span> selects every enabled option, then clears.</li>
      <li>With <code class="font-mono text-accent">multiple</code> and <code class="font-mono text-accent">activation="automatic"</code>, a press or arrow replaces the selection, <span class="text-fg">Ctrl/⌘</span> adds one, and <span class="text-fg">Ctrl/⌘</span> with an arrow moves focus only. Taps and screen-reader presses toggle instead, since they have no modifier keys.</li>
      <li>Groups are named by their <code class="font-mono text-accent">ListboxGroupLabel</code>, which arrows skip; separators are hidden from screen readers. A disabled option sets <code class="font-mono text-accent">aria-disabled</code> and can still be focused, so it can be read.</li>
      <li>A long list scrolls the selected option into view without taking focus, and keeps the focused option clear of the list's scroll padding. Each rendered option's <code class="font-mono text-accent">index</code> sets <code class="font-mono text-accent">aria-posinset</code> and <code class="font-mono text-accent">aria-setsize</code> for a virtualized list.</li>
      <li>A disabled list can't be focused and submits nothing; a read-only one can be browsed, keeps its value and submits it. <code class="font-mono text-accent">required</code> blocks submission until a value is selected, a form reset returns to <code class="font-mono text-accent">defaultValue</code>, and a disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables the list inside it.</li>
      <li>The list follows the inherited text direction, so right-to-left works without a provider: the indicator sits at the row's end and icons marked <code class="font-mono text-accent">mirror</code> flip with it.</li>
    </ul>
  </Section>
</div>