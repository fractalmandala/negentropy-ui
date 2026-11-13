<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Select,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectList,
    SelectItem,
    SelectItemText,
    SelectItemIndicator,
    SelectGroup,
    SelectGroupLabel,
    SelectSeparator,
    SelectInput,
    SelectEmpty,
    SelectSelectAll,
  } from "#lib/components/select"
  import { Button } from "#lib/components/button"
  import { Check, ChevronDown, Minus } from "@lucide/svelte"

  const roles = [
    { value: "viewer", label: "Viewer" },
    { value: "commenter", label: "Commenter" },
    { value: "editor", label: "Editor" },
    { value: "admin", label: "Admin" },
  ]

  const languages = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
    { value: "pt", label: "Portuguese" },
    { value: "es", label: "Spanish" },
  ]

  const regions = [
    {
      label: "Americas",
      items: [
        { value: "br", label: "Brazil" },
        { value: "ca", label: "Canada" },
        { value: "mx", label: "Mexico" },
      ],
    },
    {
      label: "Europe",
      items: [
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
        { value: "es", label: "Spain" },
      ],
    },
    {
      label: "Asia Pacific",
      items: [
        { value: "au", label: "Australia" },
        { value: "jp", label: "Japan" },
        { value: "sg", label: "Singapore" },
      ],
    },
  ]

  const sizes = ["sm", "md", "lg"] as const

  const installCode = `import {
  Select, SelectLabel, SelectTrigger, SelectValue,
  SelectContent, SelectItem, SelectItemIndicator,
} from "#lib/components/select"`

  const usageCode = `<script lang="ts">
  import {
    Select, SelectLabel, SelectTrigger, SelectValue,
    SelectContent, SelectItem, SelectItemIndicator,
  } from "#lib/components/select"
  import { Check, ChevronDown } from "@lucide/svelte"

  const roles = [
    { value: "viewer", label: "Viewer" },
    { value: "commenter", label: "Commenter" },
    { value: "editor", label: "Editor" },
    { value: "admin", label: "Admin" },
  ]
<\/script>

<div class="w-full max-w-64">
  <Select defaultValue="editor">
    <SelectLabel>Role</SelectLabel>
    <SelectTrigger>
      <SelectValue />
      <ChevronDown aria-hidden="true" />
    </SelectTrigger>
    <SelectContent>
      {#each roles as item (item.value)}
        <SelectItem value={item.value}>
          {item.label}
          <SelectItemIndicator>
            <Check aria-hidden="true" />
          </SelectItemIndicator>
        </SelectItem>
      {/each}
    </SelectContent>
  </Select>
</div>`

  const controlledCode = `<script lang="ts">
  let role = $state<string | null>("viewer")
  let open = $state(false)
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => (role = "editor")}>Make editor</Button>
  <Button size="sm" tone="outline" onclick={() => (open = !open)}>Toggle list</Button>
</div>
<div class="w-full max-w-64">
  <Select bind:value={role} bind:open>
    <SelectLabel>Role</SelectLabel>
    <SelectTrigger>
      <SelectValue>
        {#snippet children(state)}
          {state.label || "Select a role"}
        {/snippet}
      </SelectValue>
      <ChevronDown aria-hidden="true" />
    </SelectTrigger>
    <SelectContent>
      {#each roles as item (item.value)}
        <SelectItem value={item.value}>
          {item.label}
          <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
        </SelectItem>
      {/each}
    </SelectContent>
  </Select>
</div>
<p class="text-sm text-muted">value: {role ?? "null"} · open: {open}</p>`

  const multipleCode = `<script lang="ts">
  let langs = $state<string[]>(["en", "ja"])
<\/script>

<div class="w-full max-w-72">
  <Select multiple bind:value={langs}>
    <SelectLabel>Languages</SelectLabel>
    <SelectTrigger>
      <SelectValue maxLabels={2} />
      <ChevronDown aria-hidden="true" />
    </SelectTrigger>
    <SelectContent>
      <SelectSelectAll>
        {#snippet children(state)}
          Select all
          {#if state.checked}<Check aria-hidden="true" />{/if}
          {#if state.indeterminate}<Minus aria-hidden="true" />{/if}
        {/snippet}
      </SelectSelectAll>
      <SelectSeparator />
      {#each languages as language (language.value)}
        <SelectItem value={language.value}>
          {language.label}
          <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
        </SelectItem>
      {/each}
    </SelectContent>
  </Select>
</div>`

  const searchCode = `<div class="w-full max-w-72">
  <Select>
    <SelectLabel>Country</SelectLabel>
    <SelectTrigger>
      <SelectValue>
        {#snippet children(state)}
          {state.label || "Select a country"}
        {/snippet}
      </SelectValue>
      <ChevronDown aria-hidden="true" />
    </SelectTrigger>
    <SelectContent>
      <SelectInput aria-label="Search countries" />
      <SelectEmpty>No countries found.</SelectEmpty>
      <SelectList>
        {#each regions as group (group.label)}
          <SelectGroup>
            <SelectGroupLabel>{group.label}</SelectGroupLabel>
            {#each group.items as country (country.value)}
              <SelectItem value={country.value} label={country.label}>
                <SelectItemText />
                <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
              </SelectItem>
            {/each}
          </SelectGroup>
        {/each}
      </SelectList>
    </SelectContent>
  </Select>
</div>`

  const sizesCode = `<script lang="ts">
  const sizes = ["sm", "md", "lg"] as const
<\/script>

{#each sizes as size (size)}
  <Select defaultValue="editor">
    <SelectTrigger {size}>
      <SelectValue />
      <ChevronDown aria-hidden="true" />
    </SelectTrigger>
    <SelectContent>
      {#each roles as item (item.value)}
        <SelectItem value={item.value}>
          {item.label}
          <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
        </SelectItem>
      {/each}
    </SelectContent>
  </Select>
{/each}`

  const statesCode = `<Select defaultValue="fr" disabled>
  <SelectLabel>Billing country</SelectLabel>
  <SelectTrigger>
    <SelectValue />
    <ChevronDown aria-hidden="true" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="fr">France</SelectItem>
  </SelectContent>
</Select>

<Select defaultValue="fr" readOnly>
  <SelectLabel>Shipping from</SelectLabel>
  <SelectTrigger>
    <SelectValue />
    <ChevronDown aria-hidden="true" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="fr">France</SelectItem>
  </SelectContent>
</Select>

<Select>
  <SelectLabel>Shipping to</SelectLabel>
  <SelectTrigger>
    <SelectValue>
      {#snippet children(state)}
        {state.label || "Select a country"}
      {/snippet}
    </SelectValue>
    <ChevronDown aria-hidden="true" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="ca">Canada</SelectItem>
    <SelectItem value="dk" disabled>Denmark</SelectItem>
    <SelectItem value="fr">France</SelectItem>
  </SelectContent>
</Select>`

  let role = $state<string | null>("viewer")
  let open = $state(false)
  let langs = $state<string[]>(["en", "ja"])
</script>

<svelte:head>
  <title>Select — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Select"
  description="Choose one value or several from a popup list. Wraps the ui-sdk Select, which handles opening, keyboard navigation, typeahead, selection and the value submitted with a form."
  entry="@ui-sdk/svelte/select"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/select</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the label, trigger and content inside the root. <code class="font-mono text-accent">SelectValue</code>
      shows the chosen item's label in the trigger, and <code class="font-mono text-accent">SelectItemIndicator</code>
      renders only while its item is selected. The trigger is a field, so it fills its container.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Nothing selected yet? Pass the root's <code class="font-mono text-accent">placeholder</code> string,
      or render <code class="font-mono text-accent">SelectValue</code>'s children snippet and fall back on
      <code class="font-mono text-accent">state.label</code>, which is empty for no selection.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Open Role and choose another option. Typing on the closed trigger jumps to a match." code={usageCode}>
      <div class="w-full max-w-64">
        <Select defaultValue="editor">
          <SelectLabel>Role</SelectLabel>
          <SelectTrigger>
            <SelectValue />
            <ChevronDown aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            {#each roles as item (item.value)}
              <SelectItem value={item.value}>
                {item.label}
                <SelectItemIndicator>
                  <Check aria-hidden="true" />
                </SelectItemIndicator>
              </SelectItem>
            {/each}
          </SelectContent>
        </Select>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:value and bind:open let a parent drive the select from outside." code={controlledCode}>
      <div class="flex w-full flex-col items-center gap-4">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => (role = "editor")}>Make editor</Button>
          <Button size="sm" tone="outline" onclick={() => (open = !open)}>Toggle list</Button>
        </div>
        <div class="w-full max-w-64">
          <Select bind:value={role} bind:open>
            <SelectLabel>Role</SelectLabel>
            <SelectTrigger>
              <SelectValue>
                {#snippet children(state)}
                  {state.label || "Select a role"}
                {/snippet}
              </SelectValue>
              <ChevronDown aria-hidden="true" />
            </SelectTrigger>
            <SelectContent>
              {#each roles as item (item.value)}
                <SelectItem value={item.value}>
                  {item.label}
                  <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
                </SelectItem>
              {/each}
            </SelectContent>
          </Select>
        </div>
        <p class="text-sm text-muted">value: {role ?? "null"} · open: {open}</p>
      </div>
    </Demo>

    <Demo title="Multiple with select all" description="Choosing toggles an item and keeps the list open. maxLabels summarizes a long selection." code={multipleCode}>
      <div class="w-full max-w-72">
        <Select multiple bind:value={langs}>
          <SelectLabel>Languages</SelectLabel>
          <SelectTrigger>
            <SelectValue maxLabels={2} />
            <ChevronDown aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            <SelectSelectAll>
              {#snippet children(state)}
                Select all
                {#if state.checked}<Check aria-hidden="true" />{/if}
                {#if state.indeterminate}<Minus aria-hidden="true" />{/if}
              {/snippet}
            </SelectSelectAll>
            <SelectSeparator />
            {#each languages as language (language.value)}
              <SelectItem value={language.value}>
                {language.label}
                <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
              </SelectItem>
            {/each}
          </SelectContent>
        </Select>
      </div>
    </Demo>

    <Demo title="Searchable groups" description="SelectInput filters the list while focus stays in the field. SelectItemText bolds what matched; groups with no match hide." code={searchCode}>
      <div class="w-full max-w-72">
        <Select>
          <SelectLabel>Country</SelectLabel>
          <SelectTrigger>
            <SelectValue>
              {#snippet children(state)}
                {state.label || "Select a country"}
              {/snippet}
            </SelectValue>
            <ChevronDown aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            <SelectInput aria-label="Search countries" />
            <SelectEmpty>No countries found.</SelectEmpty>
            <SelectList>
              {#each regions as group (group.label)}
                <SelectGroup>
                  <SelectGroupLabel>{group.label}</SelectGroupLabel>
                  {#each group.items as country (country.value)}
                    <SelectItem value={country.value} label={country.label}>
                      <SelectItemText />
                      <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
                    </SelectItem>
                  {/each}
                </SelectGroup>
              {/each}
            </SelectList>
          </SelectContent>
        </Select>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">SelectTrigger</code> takes a
      <code class="font-mono text-accent">size</code>. The popup matches the trigger's width through
      <code class="font-mono text-accent">--anchor-width</code> and never grows past the room left on screen.
    </p>
    <Demo title="Trigger sizes" description="sm, md and lg. The list inherits the trigger's text size." code={sizesCode}>
      <div class="flex w-full max-w-64 flex-col gap-3">
        {#each sizes as size (size)}
          <Select defaultValue="editor">
            <SelectTrigger {size}>
              <SelectValue />
              <ChevronDown aria-hidden="true" />
            </SelectTrigger>
            <SelectContent>
              {#each roles as item (item.value)}
                <SelectItem value={item.value}>
                  {item.label}
                  <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
                </SelectItem>
              {/each}
            </SelectContent>
          </Select>
        {/each}
      </div>
    </Demo>

    <Demo title="Disabled, read-only and disabled items" description="A disabled select can't be focused; a read-only one keeps its value and stays focusable. Denmark can't be chosen." code={statesCode}>
      <div class="flex w-full max-w-64 flex-col gap-3">
        <Select defaultValue="fr" disabled>
          <SelectLabel>Billing country</SelectLabel>
          <SelectTrigger>
            <SelectValue />
            <ChevronDown aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">France</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="fr" readOnly>
          <SelectLabel>Shipping from</SelectLabel>
          <SelectTrigger>
            <SelectValue />
            <ChevronDown aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">France</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectLabel>Shipping to</SelectLabel>
          <SelectTrigger>
            <SelectValue>
              {#snippet children(state)}
                {state.label || "Select a country"}
              {/snippet}
            </SelectValue>
            <ChevronDown aria-hidden="true" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="dk" disabled>Denmark</SelectItem>
            <SelectItem value="fr">France</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Demo>

    <PropsTable
      caption="SelectTrigger size"
      rows={[
        { name: "sm", type: "string", description: "32px tall, 13px text — dense forms and toolbars." },
        { name: "md", type: "default", description: "36px tall, 14px text — the standard field." },
        { name: "lg", type: "string", description: "44px tall, 16px text — touch targets and prominent forms." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-placeholder</code>,
      <code class="font-mono text-accent">data-highlighted</code>,
      <code class="font-mono text-accent">data-selected</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code>,
      <code class="font-mono text-accent">data-presentation</code>,
      <code class="font-mono text-accent">data-modality</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Select (root)"
      rows={[
        { name: "value", type: "T | T[] | null", description: "The selected value, or values with multiple. Bind with bind:value to control. null selects nothing." },
        { name: "defaultValue", type: "T | T[] | null", description: "The value selected at first, when uncontrolled. A form reset returns to it." },
        { name: "multiple", type: "boolean", default: "false", description: "Whether several items can be selected. The value is then a list and the list stays open as items toggle." },
        { name: "placeholder", type: "string", description: "What the value shows while nothing is selected." },
        { name: "open", type: "boolean", description: "Whether the list is open. Bind with bind:open to control." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Whether the list starts open, when uncontrolled." },
        { name: "query", type: "string", description: "The search field's text, which filters the list. Bind with bind:query. Closing the list empties it." },
        { name: "defaultQuery", type: "string", description: "The search text at first, when uncontrolled." },
        { name: "items", type: "ListData<T>", description: "The items as data. Renders the list for you and lets the trigger show labels and find items by typing before the list has opened." },
        { name: "emptyItems", type: "ListData<T>", description: "Items shown instead of items while the search is empty, like recent choices. Needs items and a SelectInput." },
        { name: "filter", type: "ListFilter<T>", default: '"contains"', description: 'How SelectInput narrows the list: "contains", "startsWith", a function of the item and text, or false for results a server already filtered.' },
        { name: "status", type: "AsyncOptionsStatus", default: '"idle"', description: "Whether results are loading or failed. Sets aria-busy on the list while loading." },
        { name: "itemToValue", type: "(value: T) => string", description: "The string an item's value submits as and is identified by, for object values." },
        { name: "itemToLabel", type: "(value: T) => string", description: "The text a value shows in the trigger, for values whose item isn't rendered, like async results." },
        { name: "isItemEqualToValue", type: "(itemValue: T, value: T) => boolean", description: "Whether an item's value is the selected value, for object values that aren't the same object." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last item to the first." },
        { name: "modal", type: 'boolean | "pointer"', default: '"pointer"', description: '"pointer" shields the page from presses; true also locks scroll and makes it inert; false lets outside presses through.' },
        { name: "presentation", type: '"auto" | "popover" | "sheet"', default: '"popover"', description: "How the list presents. sheet slides up from the bottom and can be swiped away; auto does that on small touch screens." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the select like a native one: it can't be focused or changed, and the value isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Keeps the select focusable and its value submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until a value is selected, with the browser's own message." },
        { name: "name", type: "string", description: "The name the value submits under. Without one, the select submits nothing." },
        { name: "form", type: "string", description: "The id of a form to belong to, when the select isn't inside that form." },
        { name: "autoComplete", type: "string", description: 'A hint for the browser\'s autofill, like "country".' },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, an outside press, focus leaving, back and a sheet's swipe can close the list." },
        { name: "controller", type: "SelectController", description: "Opens, closes, reads and sets the select from anywhere. Create one with createSelectController()." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
        { name: "announcement", type: "(change: ListAnnouncement) => string | null", description: "What screen readers hear after typing pauses, when no SelectStatus is rendered. Return null for silence." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when a user, a form reset or a controller wants to change the value. details.reason says why; details.cancel() stops it." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when the list wants to open or close. details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs once the list has finished opening or closing, after any animation." },
        { name: "onQueryChange", type: "(query, details) => void", description: "Runs when the search text wants to change: typing, or closing the list, which empties it." },
        { name: "onHighlight", type: "(value, { index, event }) => void", description: "Runs when the highlight moves, with the item's index among the visible items." },
        { name: "onLoadMore", type: "() => void", description: "Runs when the highlight or scrolling reaches the last item, so the next page can load." },
        { name: "onDismissAttempt", type: "({ reason, event }) => void", description: "Runs when dismissible refused a dismissal made on purpose: Escape, an outside press, back or a swipe." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason to the console, in development builds." },
      ]}
    />
    <PropsTable
      caption="SelectTrigger"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Negentropy wrapper prop: height, padding and text size." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops the trigger from opening the list. A native button can't be focused or pressed." },
        { name: "controller", type: "SelectController", description: "Connects a trigger outside the select to the select with this controller." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
        { name: "children", type: "Snippet<[SelectTriggerState]>", description: "Content. Receives open, disabled, readOnly, required and whether the value is empty." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="SelectValue"
      rows={[
        { name: "placeholder", type: "string", description: "What shows while nothing is selected. Overrides the select's own text." },
        { name: "maxLabels", type: "number", description: 'With multiple, how many labels show before the rest are counted, as in "Apple, Banana and 2 more".' },
        { name: "getMoreLabel", type: "(count: number) => string", default: "(count) => `${count} more`", description: "The words for the labels past maxLabels." },
        { name: "children", type: "Snippet<[SelectValueState]>", description: "Renders the value yourself from value, label, labels and whether it is empty." },
      ]}
    />
    <PropsTable
      caption="SelectContent"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the trigger the list opens on. Flips when there isn't room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How the list lines up with the trigger along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between the trigger and the list, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the trigger, in pixels." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space to keep from the viewport edges, in pixels." },
        { name: "arrowPadding", type: "number", description: "Space to keep between the arrow and the popup's corners, in pixels." },
        { name: "anchor", type: "string | Anchor | null", description: "Positions the popup against this instead of its trigger: an element, a selector, or a point like { x, y }." },
        { name: "alignItemWithTrigger", type: "boolean", default: "false", description: "Overlaps the trigger so the selected item sits on it, like a native select on macOS. Falls back below when there isn't room, and for touch." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Whether the list stays in the page, hidden, while closed." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
      ]}
    />
    <PropsTable
      caption="SelectItem"
      rows={[
        { name: "value", type: "T", description: "Required. What the value becomes when the item is chosen. A string, or any value with itemToValue." },
        { name: "label", type: "string", description: "The text the trigger shows and typing finds, when the content isn't plain text. Not the accessible name: use aria-label for that." },
        { name: "disabled", type: "boolean", default: "false", description: "Keeps the item from being chosen. The keyboard and the pointer skip it." },
        { name: "index", type: "number", description: "The item's position among all items, for virtualized lists. Sets aria-posinset and aria-setsize." },
      ]}
    />
    <PropsTable
      caption="SelectItemIndicator / SelectItemIcon / SelectClear"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "SelectItemIndicator and SelectClear: stay in the page while not selected, so both states can be styled or animated." },
        { name: "mirror", type: "boolean", default: "false", description: "SelectItemIcon: flips the icon horizontally in right-to-left text, for icons that point a way." },
      ]}
    />
    <PropsTable
      caption="SelectLabel / SelectList / SelectGroup / SelectGroupLabel / SelectSeparator / SelectInput / SelectEmpty / SelectStatus / SelectItemText / SelectSelectAll / SelectValueIcon / SelectArrow"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
        { name: "children", type: "Snippet", description: "Content. SelectEmpty, SelectStatus, SelectItemText and SelectSelectAll receive their state." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
        { name: "aria-label", type: "string", description: "SelectInput needs one: it is a combobox that controls the listbox in the list." },
      ]}
    />
    <PropsTable
      caption="Snippet state"
      rows={[
        { name: "SelectValue", type: "{ value, label, labels, … }", description: "label joins several labels and is empty for no selection; labels holds each one in selection order." },
        { name: "SelectItem", type: "{ highlighted, selected, disabled }", description: "Whether the item is active, chosen, or unchoosable." },
        { name: "SelectContent / SelectList", type: "{ open, presentation, multiple, items, status }", description: "items holds the data items that match the search, for rendering a virtualized list yourself." },
        { name: "SelectItemText", type: "{ segments, matched }", description: "The text in pieces, each marked when it matched." },
        { name: "SelectSelectAll", type: "{ checked, indeterminate, highlighted, disabled }", description: "Whether every item it covers is selected, or only some." },
        { name: "SelectEmpty", type: "{ loading, empty, query }", description: "Whether results load, nothing matches, and the text filtering the list." },
        { name: "SelectStatus", type: "{ status, loading, count }", description: "Whether results load or failed, and how many items are visible." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA select-only combobox pattern: the trigger has <code class="font-mono text-accent">role="combobox"</code> and points at the popup, which is a <code class="font-mono text-accent">listbox</code>. <code class="font-mono text-accent">SelectLabel</code> names it; without a visible label give the trigger an <code class="font-mono text-accent">aria-label</code>.</li>
      <li><span class="text-fg">Enter</span>, <span class="text-fg">Space</span> and <span class="text-fg">ArrowDown</span> open the list and focus the first item, or the selected one. Clicking the open trigger closes it.</li>
      <li><span class="text-fg">ArrowUp</span>/<span class="text-fg">ArrowDown</span> move through the items and skip disabled ones; <span class="text-fg">Home</span> and <span class="text-fg">End</span> reach the first and last. <code class="font-mono text-accent">loop=false</code> stops at either end.</li>
      <li><span class="text-fg">Enter</span> chooses the focused item, closes the list and returns focus to the trigger. <span class="text-fg">Space</span> chooses it. <span class="text-fg">Alt+ArrowUp</span> chooses and closes, as the APG asks. <span class="text-fg">Escape</span> closes without choosing.</li>
      <li>Typing on the closed trigger selects the next item that starts with the text, like a native select, and skips disabled items. With the list open, typing moves the highlight.</li>
      <li>With <code class="font-mono text-accent">multiple</code>, choosing toggles an item and keeps the list open. <code class="font-mono text-accent">SelectSelectAll</code> reports a mixed state when only some items are selected.</li>
      <li>With a <code class="font-mono text-accent">SelectInput</code>, opening focuses the search field, which is itself a combobox controlling the listbox. Arrow keys move the highlight while focus stays in the field; Home and End belong to the field. Enter chooses, Escape closes, and the search empties once the list closes.</li>
      <li>Groups are named by their <code class="font-mono text-accent">SelectGroupLabel</code>; separators are hidden from screen readers. Result counts are announced after typing pauses, through <code class="font-mono text-accent">SelectStatus</code> or the page's shared live region.</li>
      <li>The popup follows the trigger's inherited text direction, so right-to-left works without a provider. Icons marked <code class="font-mono text-accent">mirror</code> flip with it.</li>
      <li>A disabled select can't be focused and submits nothing; a read-only one stays focusable and submits its value. A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables every select inside it.</li>
    </ul>
  </Section>
</div>