<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Autocomplete,
    AutocompleteLabel,
    AutocompleteInput,
    AutocompleteTrigger,
    AutocompleteClear,
    AutocompleteContent,
    AutocompleteList,
    AutocompleteItem,
    AutocompleteItemText,
    AutocompleteItemIcon,
    AutocompleteGroup,
    AutocompleteGroupLabel,
    AutocompleteSeparator,
    AutocompleteEmpty,
    AutocompleteStatus,
    AutocompleteArrow,
  } from "$lib/components/autocomplete"
  import { Button } from "$lib/components/button"
  import {
    Archive,
    ChevronDown,
    Clock,
    File,
    Pencil,
    Reply,
    Star,
    X,
  } from "@lucide/svelte"

  const fruits = [
    "Apple",
    "Apricot",
    "Avocado",
    "Banana",
    "Blackberry",
    "Blueberry",
    "Cherry",
    "Grape",
    "Lemon",
    "Mango",
    "Orange",
    "Peach",
    "Pear",
    "Pineapple",
    "Strawberry",
  ]

  const tags = [
    { value: "feature", keywords: ["enhancement", "request"] },
    { value: "fix", keywords: ["bug", "patch"] },
    { value: "docs", keywords: ["documentation", "readme"] },
    { value: "performance", keywords: ["speed", "slow"] },
    { value: "security", keywords: ["vulnerability"] },
  ]

  const recent = ["react hooks", "tailwind grid", "web components", "vue v-model"]
  const topics = [...recent, "react server components", "tailwind colors", "vue router"]
  const recentSearches = [{ type: "group" as const, label: "Recent searches", items: recent }]

  const cities = [
    "Amsterdam",
    "Athens",
    "Barcelona",
    "Berlin",
    "Boston",
    "Brussels",
    "Cairo",
    "Chicago",
    "Copenhagen",
    "Dublin",
    "Lisbon",
    "London",
    "Los Angeles",
    "Madrid",
    "Paris",
    "Prague",
    "Rome",
    "Seoul",
    "Tokyo",
  ]

  const mailSearches = [
    { value: "Starred", icon: Star, mirror: false },
    { value: "Drafts", icon: Pencil, mirror: false },
    { value: "Replies", icon: Reply, mirror: true },
    { value: "Attachments", icon: File, mirror: false },
    { value: "Archived", icon: Archive, mirror: false },
    { value: "Scheduled", icon: Clock, mirror: false },
  ]

  const installCode = `import {
  Autocomplete, AutocompleteLabel, AutocompleteInput,
  AutocompleteContent, AutocompleteList, AutocompleteItem, AutocompleteEmpty,
} from "$lib/components/autocomplete"`

  const usageCode = `<script lang="ts">
  import {
    Autocomplete, AutocompleteLabel, AutocompleteInput,
    AutocompleteContent, AutocompleteList, AutocompleteItem, AutocompleteEmpty,
  } from "$lib/components/autocomplete"

  const fruits = ["Apple", "Apricot", "Avocado", "Banana", "Blueberry", "Mango", "Peach"]
<\/script>

<div class="w-full max-w-72">
  <Autocomplete>
    <AutocompleteLabel>Favorite fruit</AutocompleteLabel>
    <AutocompleteInput />
    <AutocompleteContent>
      <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
      <AutocompleteList>
        {#each fruits as item (item)}
          <AutocompleteItem value={item}>{item}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
</div>`

  const controlledCode = `<script lang="ts">
  let fruitText = $state("")
  let fruitOpen = $state(false)

  function limitText(next: string, details: { reason: string; cancel: () => void }) {
    if (next.length > 12) details.cancel()
  }
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => (fruitText = "Mango")}>Fill in Mango</Button>
  <Button size="sm" tone="outline" onclick={() => (fruitOpen = !fruitOpen)}>Toggle suggestions</Button>
</div>
<div class="w-full max-w-72">
  <Autocomplete bind:value={fruitText} bind:open={fruitOpen} onValueChange={limitText}>
    <AutocompleteLabel>Fruit, 12 characters at most</AutocompleteLabel>
    <AutocompleteInput />
    <AutocompleteContent>
      <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
      <AutocompleteList>
        {#each fruits as item (item)}
          <AutocompleteItem value={item}>{item}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
</div>
<p class="text-sm text-muted">text: {fruitText || "empty"} · open: {fruitOpen}</p>`

  const inlineCode = `<Autocomplete inlineComplete autoHighlight>
  <AutocompleteLabel>Fruit</AutocompleteLabel>
  <AutocompleteInput />
  <AutocompleteContent>
    <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each fruits as item (item)}
        <AutocompleteItem value={item}>{item}</AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`

  const keywordsCode = `<Autocomplete filter="startsWith">
  <AutocompleteLabel>Tag</AutocompleteLabel>
  <AutocompleteInput />
  <AutocompleteContent>
    <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each tags as item (item.value)}
        <AutocompleteItem value={item.value} label={item.value} keywords={item.keywords}>
          <AutocompleteItemText />
          <span class="ms-auto text-xs text-faint">{item.keywords[0]}</span>
        </AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`

  const recentCode = `<script lang="ts">
  const recent = ["react hooks", "tailwind grid", "web components", "vue v-model"]
  const topics = [...recent, "react server components", "tailwind colors", "vue router"]
  const recentSearches = [{ type: "group" as const, label: "Recent searches", items: recent }]
<\/script>

<Autocomplete items={topics} emptyItems={recentSearches} openOnFocus>
  <AutocompleteInput type="search" aria-label="Search docs" />
  <AutocompleteContent>
    <AutocompleteEmpty>No topics found.</AutocompleteEmpty>
    <AutocompleteList />
  </AutocompleteContent>
</Autocomplete>`

  const asyncCode = `<script lang="ts">
  let cityQuery = $state("")
  let cityResults = $state<string[]>([])
  let cityStatus = $state<"idle" | "loading" | "error">("idle")

  $effect(() => {
    const text = cityQuery.trim().toLowerCase()
    if (!text) {
      cityResults = []
      cityStatus = "idle"
      return
    }
    cityStatus = "loading"
    const timer = setTimeout(() => {
      cityResults = cities.filter((city) => city.toLowerCase().startsWith(text))
      cityStatus = "idle"
    }, 350)
    return () => clearTimeout(timer)
  })
<\/script>

<Autocomplete
  items={cityResults}
  filter={false}
  status={cityStatus}
  onValueChange={(text) => (cityQuery = text)}
>
  <AutocompleteLabel>City</AutocompleteLabel>
  <AutocompleteInput />
  <AutocompleteContent>
    <AutocompleteStatus>
      {#snippet children(state)}
        {state.loading
          ? "Searching…"
          : state.count
            ? \`\${state.count} \${state.count === 1 ? "city" : "cities"}\`
            : ""}
      {/snippet}
    </AutocompleteStatus>
    <AutocompleteEmpty>
      {#snippet children(state)}
        {#if state.empty && !state.loading}No cities start with “{state.query}”.{/if}
      {/snippet}
    </AutocompleteEmpty>
    <AutocompleteList>
      {#snippet children(state)}
        {#each state.items as string[] as city (city)}
          <AutocompleteItem value={city}>{city}</AutocompleteItem>
        {/each}
      {/snippet}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`

  const clearCode = `<Autocomplete defaultValue="Mango">
  <AutocompleteLabel>Fruit</AutocompleteLabel>
  <div class="flex items-center gap-2">
    <AutocompleteInput />
    <AutocompleteClear aria-label="Clear fruit"><X aria-hidden="true" /></AutocompleteClear>
    <AutocompleteTrigger aria-label="Show fruits"><ChevronDown aria-hidden="true" /></AutocompleteTrigger>
  </div>
  <AutocompleteContent align="end" sideOffset={8}>
    <AutocompleteArrow />
    <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each fruits as item (item)}
        <AutocompleteItem value={item}>{item}</AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`

  const iconsCode = `<script lang="ts">
  import { Archive, Clock, File, Pencil, Reply, Star } from "@lucide/svelte"

  const mailSearches = [
    { value: "Starred", icon: Star, mirror: false },
    { value: "Drafts", icon: Pencil, mirror: false },
    { value: "Replies", icon: Reply, mirror: true },
    { value: "Attachments", icon: File, mirror: false },
    { value: "Archived", icon: Archive, mirror: false },
    { value: "Scheduled", icon: Clock, mirror: false },
  ]
<\/script>

<Autocomplete>
  <AutocompleteInput type="search" aria-label="Search mail" />
  <AutocompleteContent>
    <AutocompleteEmpty>No searches found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each mailSearches as item (item.value)}
        <AutocompleteItem value={item.value}>
          <AutocompleteItemIcon mirror={item.mirror}>
            <item.icon aria-hidden="true" />
          </AutocompleteItemIcon>
          {item.value}
        </AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`

  const searchCode = `<script lang="ts">
  let searched = $state("")
<\/script>

<form role="search" class="w-full max-w-72" onsubmit={(event) => event.preventDefault()}>
  <Autocomplete submitOnSelect name="q" onSubmit={(text) => (searched = text)}>
    <AutocompleteInput type="search" aria-label="Search" />
    <AutocompleteContent>
      <AutocompleteEmpty>No results.</AutocompleteEmpty>
      <AutocompleteList>
        {#each recent as item (item)}
          <AutocompleteItem value={item}>{item}</AutocompleteItem>
        {/each}
      </AutocompleteList>
    </AutocompleteContent>
  </Autocomplete>
</form>
<p class="text-sm text-muted">Last search: {searched || "none yet"}</p>`

  const statesCode = `<Autocomplete defaultValue="Mango" disabled>
  <AutocompleteLabel>Disabled</AutocompleteLabel>
  <AutocompleteInput />
  <AutocompleteContent>
    <AutocompleteList>
      <AutocompleteItem value="Mango">Mango</AutocompleteItem>
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>

<Autocomplete defaultValue="Mango" readOnly>
  <AutocompleteLabel>Read-only</AutocompleteLabel>
  <AutocompleteInput />
  <AutocompleteContent>
    <AutocompleteList>
      <AutocompleteItem value="Mango">Mango</AutocompleteItem>
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>

<Autocomplete required name="fruit">
  <AutocompleteLabel>Required</AutocompleteLabel>
  <AutocompleteInput />
  <AutocompleteContent>
    <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
    <AutocompleteList>
      {#each fruits as item (item)}
        <AutocompleteItem value={item}>{item}</AutocompleteItem>
      {/each}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`

  let fruitText = $state("")
  let fruitOpen = $state(false)
  let searched = $state("")
  let cityQuery = $state("")
  let cityResults = $state<string[]>([])
  let cityStatus = $state<"idle" | "loading" | "error">("idle")

  function limitText(next: string, details: { reason: string; cancel: () => void }) {
    if (next.length > 12) details.cancel()
  }

  $effect(() => {
    const text = cityQuery.trim().toLowerCase()
    if (!text) {
      cityResults = []
      cityStatus = "idle"
      return
    }
    cityStatus = "loading"
    const timer = setTimeout(() => {
      cityResults = cities.filter((city) => city.toLowerCase().startsWith(text))
      cityStatus = "idle"
    }, 350)
    return () => clearTimeout(timer)
  })
</script>

<svelte:head>
  <title>Autocomplete — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Autocomplete"
  description="A text field that suggests as you type, where the text itself is the value. Wraps the ui-sdk Autocomplete, which handles filtering, inline completion, highlighting, submission and async suggestions."
  entry="@ui-sdk/svelte/autocomplete"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/autocomplete</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The field is the form control: whatever it holds submits under the root's
      <code class="font-mono text-accent">name</code>, whether it was typed or chosen.
      <code class="font-mono text-accent">AutocompleteLabel</code> names the field, and
      <code class="font-mono text-accent">AutocompleteItem</code>'s
      <code class="font-mono text-accent">value</code> is the text that fills it in.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Reach for <span class="text-fg">Autocomplete</span> when the text is the answer — a search box, a
      city, a tag. Reach for <code class="font-mono text-accent">Combobox</code> when the answer is one
      of a fixed set of values and the text is only a way to find it.
    </p>
    <p class="text-sm text-muted">
      Pass <code class="font-mono text-accent">items</code> to let the root render and filter the list
      itself, and <code class="font-mono text-accent">emptyItems</code> with
      <code class="font-mono text-accent">openOnFocus</code> to show recent searches before anything is
      typed. The native <code class="font-mono text-accent">placeholder</code> attribute still works
      on <code class="font-mono text-accent">AutocompleteInput</code> as a hint inside the empty field;
      it never names the field, so keep a label or an <code class="font-mono text-accent">aria-label</code>.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Type to filter, arrow keys to move, Enter to fill in. The text stays what was typed when nothing matches." code={usageCode}>
      <div class="w-full max-w-72">
        <Autocomplete>
          <AutocompleteLabel>Favorite fruit</AutocompleteLabel>
          <AutocompleteInput />
          <AutocompleteContent>
            <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
            <AutocompleteList>
              {#each fruits as item (item)}
                <AutocompleteItem value={item}>{item}</AutocompleteItem>
              {/each}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>

    <Demo title="Controlled text and open state" description="bind:value and bind:open drive the field from outside. details.cancel() in onValueChange refuses a change — here, text longer than 12 characters." code={controlledCode}>
      <div class="flex w-full flex-col items-center gap-4">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => (fruitText = "Mango")}>Fill in Mango</Button>
          <Button size="sm" tone="outline" onclick={() => (fruitOpen = !fruitOpen)}>Toggle suggestions</Button>
        </div>
        <div class="w-full max-w-72">
          <Autocomplete bind:value={fruitText} bind:open={fruitOpen} onValueChange={limitText}>
            <AutocompleteLabel>Fruit, 12 characters at most</AutocompleteLabel>
            <AutocompleteInput />
            <AutocompleteContent>
              <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
              <AutocompleteList>
                {#each fruits as item (item)}
                  <AutocompleteItem value={item}>{item}</AutocompleteItem>
                {/each}
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
        </div>
        <p class="text-sm text-muted">text: {fruitText || "empty"} · open: {fruitOpen}</p>
      </div>
    </Demo>

    <Demo title="Inline completion" description="Type bl: the first match completes the text with the rest selected after the caret. ArrowRight or End accepts it, Backspace and Escape take it back out." code={inlineCode}>
      <div class="w-full max-w-72">
        <Autocomplete inlineComplete autoHighlight>
          <AutocompleteLabel>Fruit</AutocompleteLabel>
          <AutocompleteInput />
          <AutocompleteContent>
            <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
            <AutocompleteList>
              {#each fruits as item (item)}
                <AutocompleteItem value={item}>{item}</AutocompleteItem>
              {/each}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>

    <Demo title="Keywords and marked matches" description="keywords add words filtering matches, so bug finds fix. AutocompleteItemText marks the part that matched." code={keywordsCode}>
      <div class="w-full max-w-72">
        <Autocomplete filter="startsWith">
          <AutocompleteLabel>Tag</AutocompleteLabel>
          <AutocompleteInput />
          <AutocompleteContent>
            <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
            <AutocompleteList>
              {#each tags as item (item.value)}
                <AutocompleteItem value={item.value} label={item.value} keywords={item.keywords}>
                  <AutocompleteItemText />
                  <span class="ms-auto text-xs text-faint">{item.keywords[0]}</span>
                </AutocompleteItem>
              {/each}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>

    <Demo title="Recent searches on focus" description="items as data renders the list for you. emptyItems shows a group while the field is empty, and openOnFocus opens it on focus." code={recentCode}>
      <div class="w-full max-w-72">
        <Autocomplete items={topics} emptyItems={recentSearches} openOnFocus>
          <AutocompleteInput type="search" aria-label="Search docs" />
          <AutocompleteContent>
            <AutocompleteEmpty>No topics found.</AutocompleteEmpty>
            <AutocompleteList />
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>

    <Demo title="Async suggestions" description="filter=false keeps what the server returned. status drives the loading message and aria-busy; onLoadMore asks for the next page." code={asyncCode}>
      <div class="w-full max-w-72">
        <Autocomplete
          items={cityResults}
          filter={false}
          status={cityStatus}
          onValueChange={(text) => (cityQuery = text)}
        >
          <AutocompleteLabel>City</AutocompleteLabel>
          <AutocompleteInput />
          <AutocompleteContent>
            <AutocompleteStatus>
              {#snippet children(state)}
                {state.loading
                  ? "Searching…"
                  : state.count
                    ? `${state.count} ${state.count === 1 ? "city" : "cities"}`
                    : ""}
              {/snippet}
            </AutocompleteStatus>
            <AutocompleteEmpty>
              {#snippet children(state)}
                {#if state.empty && !state.loading}No cities start with “{state.query}”.{/if}
              {/snippet}
            </AutocompleteEmpty>
            <AutocompleteList>
              {#snippet children(state)}
                {#each state.items as string[] as city (city)}
                  <AutocompleteItem value={city}>{city}</AutocompleteItem>
                {/each}
              {/snippet}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      The popup is anchored to the field: it matches its width through
      <code class="font-mono text-accent">--anchor-width</code>, never grows past
      <code class="font-mono text-accent">--available-height</code>, and scales from
      <code class="font-mono text-accent">--transform-origin</code>. With
      <code class="font-mono text-accent">presentation="auto"</code> it becomes a sheet on small touch
      screens, and the field moves into the sheet's header.
    </p>

    <Demo title="Clear, trigger and arrow" description="AutocompleteClear empties the field and keeps focus in it. The trigger opens the whole list; the arrow follows the side chosen after collision handling." code={clearCode}>
      <div class="w-full max-w-72">
        <Autocomplete defaultValue="Mango">
          <AutocompleteLabel>Fruit</AutocompleteLabel>
          <div class="flex items-center gap-2">
            <AutocompleteInput />
            <AutocompleteClear aria-label="Clear fruit"><X aria-hidden="true" /></AutocompleteClear>
            <AutocompleteTrigger aria-label="Show fruits"><ChevronDown aria-hidden="true" /></AutocompleteTrigger>
          </div>
          <AutocompleteContent align="end" sideOffset={8}>
            <AutocompleteArrow />
            <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
            <AutocompleteList>
              {#each fruits as item (item)}
                <AutocompleteItem value={item}>{item}</AutocompleteItem>
              {/each}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>

    <Demo title="Icons" description="AutocompleteItemIcon is skipped by screen readers, typeahead and filtering. mirror flips an icon that points a way in right-to-left text." code={iconsCode}>
      <div class="w-full max-w-72">
        <Autocomplete>
          <AutocompleteInput type="search" aria-label="Search mail" />
          <AutocompleteContent>
            <AutocompleteEmpty>No searches found.</AutocompleteEmpty>
            <AutocompleteList>
              {#each mailSearches as item (item.value)}
                <AutocompleteItem value={item.value}>
                  <AutocompleteItemIcon mirror={item.mirror}>
                    <item.icon aria-hidden="true" />
                  </AutocompleteItemIcon>
                  {item.value}
                </AutocompleteItem>
              {/each}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>

    <Demo title="Search box that submits" description="Enter with nothing highlighted runs onSubmit with the text as typed. submitOnSelect also submits when a suggestion is chosen." code={searchCode}>
      <div class="flex w-full flex-col items-center gap-3">
        <form role="search" class="w-full max-w-72" onsubmit={(event) => event.preventDefault()}>
          <Autocomplete submitOnSelect name="q" onSubmit={(text) => (searched = text)}>
            <AutocompleteInput type="search" aria-label="Search" />
            <AutocompleteContent>
              <AutocompleteEmpty>No results.</AutocompleteEmpty>
              <AutocompleteList>
                {#each recent as item (item)}
                  <AutocompleteItem value={item}>{item}</AutocompleteItem>
                {/each}
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
        </form>
        <p class="text-sm text-muted">Last search: {searched || "none yet"}</p>
      </div>
    </Demo>

    <Demo title="Disabled, read-only and required" description="A disabled field can't be focused and submits nothing; a read-only one keeps its text and stays focusable. Required blocks an empty submission." code={statesCode}>
      <div class="flex w-full max-w-72 flex-col gap-3">
        <Autocomplete defaultValue="Mango" disabled>
          <AutocompleteLabel>Disabled</AutocompleteLabel>
          <AutocompleteInput />
          <AutocompleteContent>
            <AutocompleteList>
              <AutocompleteItem value="Mango">Mango</AutocompleteItem>
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>

        <Autocomplete defaultValue="Mango" readOnly>
          <AutocompleteLabel>Read-only</AutocompleteLabel>
          <AutocompleteInput />
          <AutocompleteContent>
            <AutocompleteList>
              <AutocompleteItem value="Mango">Mango</AutocompleteItem>
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>

        <Autocomplete required name="fruit">
          <AutocompleteLabel>Required</AutocompleteLabel>
          <AutocompleteInput />
          <AutocompleteContent>
            <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
            <AutocompleteList>
              {#each fruits as item (item)}
                <AutocompleteItem value={item}>{item}</AutocompleteItem>
              {/each}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </Demo>

    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-highlighted</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code>,
      <code class="font-mono text-accent">data-presentation</code>,
      <code class="font-mono text-accent">data-modality</code>,
      <code class="font-mono text-accent">data-matched</code>,
      <code class="font-mono text-accent">data-loading</code>,
      <code class="font-mono text-accent">data-empty</code>,
      <code class="font-mono text-accent">data-has-icons</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Autocomplete (root)"
      rows={[
        { name: "value", type: "string", description: "The text. Bind with bind:value to control it; the text itself is the value, chosen or typed." },
        { name: "defaultValue", type: "string", description: "The text at first, when uncontrolled. A form reset returns to it." },
        { name: "open", type: "boolean", description: "Whether the suggestions are open. Bind with bind:open to control them." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Whether the suggestions start open, when uncontrolled." },
        { name: "items", type: "ListData<string>", description: "The suggestions as data. Renders the list for you and filters it without rendering every one. Groups are { type: \"group\", label, items }." },
        { name: "emptyItems", type: "ListData<string>", description: "Suggestions shown instead of items while the field is empty, like recent searches. Needs items, and openOnFocus to show them on focus." },
        { name: "filter", type: "SearchFilter<string>", default: '"contains"', description: 'How typing narrows the suggestions: "contains", "startsWith", "fuzzy", a function of the item and text, or false for results a server already filtered.' },
        { name: "inlineComplete", type: "boolean", default: "false", description: "Whether typing completes the text with the first suggestion that starts with it, the rest selected after the caret. ArrowRight or End accepts it; Backspace and Escape take it back out." },
        { name: "autoHighlight", type: "boolean", default: "false", description: "Whether the first suggestion is highlighted while typing, so Enter chooses it." },
        { name: "openOnFocus", type: "boolean", default: "false", description: "Whether the suggestions open when the field gets focus, even before anything is typed." },
        { name: "submitOnSelect", type: "boolean", default: "false", description: "Whether choosing a suggestion submits, like a search box: onSubmit runs, then the form submits." },
        { name: "status", type: "AsyncOptionsStatus", default: '"idle"', description: "Whether results are loading or failed, for the empty and status parts. Sets aria-busy on the list while loading." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last suggestion to the first." },
        { name: "modal", type: 'boolean | "pointer"', default: "false", description: '"pointer" shields the page from presses; true also locks scroll and makes it inert; false lets outside presses through. Defaults to true while it presents as a sheet.' },
        { name: "presentation", type: '"auto" | "popover" | "sheet"', default: '"popover"', description: "How the suggestions present. sheet slides up from the bottom with the field in its header and can be swiped away; auto does that on small touch screens." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the field like a native input: it can't be focused or changed, and its text isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Keeps the field focusable and its text submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission while the field is empty, with the browser's own message." },
        { name: "name", type: "string", description: "The name the text submits under." },
        { name: "form", type: "string", description: "The id of a form to belong to, when the field isn't inside that form." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, an outside press, focus or the window leaving, back, the screen reader's escape and a sheet's swipe can close the suggestions." },
        { name: "controller", type: "AutocompleteController", description: "Opens, closes, reads and sets the autocomplete from anywhere. Create one with createAutocompleteController()." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the suggestions into this element instead of in place." },
        { name: "announcement", type: "(change: ListAnnouncement) => string | null", description: "What screen readers hear after typing pauses, when no AutocompleteStatus is rendered. Return null for silence." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when the text wants to change: typing, choosing a suggestion, a Clear part, a form reset or a controller. details.cancel() keeps it as it was." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when the suggestions want to open or close. details.reason says why; details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs once the suggestions have finished opening or closing, after any animation." },
        { name: "onSubmit", type: "(value, { event }) => void", description: "Runs with the text when Enter is pressed with nothing highlighted, or after choosing one with submitOnSelect. The form submits next unless event.preventDefault() is called." },
        { name: "onHighlight", type: "(value, { index, event }) => void", description: "Runs when the highlight moves, with the suggestion's index among the visible ones." },
        { name: "onLoadMore", type: "() => void", description: "Runs when the highlight or scrolling reaches the last suggestion, so the next page can load." },
        { name: "onDismissAttempt", type: "({ reason, event }) => void", description: "Runs when dismissible refused a dismissal made on purpose: Escape, an outside press, back, the screen reader's escape or a swipe." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason to the console, in development builds." },
      ]}
    />
    <PropsTable
      caption="AutocompleteInput / AutocompleteTrigger / AutocompleteLabel"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
        { name: "children", type: "Snippet<[AutocompleteInputState]>", description: "AutocompleteInput and AutocompleteTrigger receive open, disabled, readOnly and required. AutocompleteLabel takes plain content." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
        { name: "type", type: "string", description: 'AutocompleteInput only: the native input type, like "search". The wrapper hides the browser\'s own search cancel button.' },
        { name: "aria-label", type: "string", description: "Names the field when no AutocompleteLabel is visible." },
        { name: "placeholder", type: "string", description: "AutocompleteInput only: the native hint shown while the field is empty. It is not the accessible name." },
        { name: "disabled", type: "boolean", description: "AutocompleteTrigger only: stops the button from opening the suggestions." },
      ]}
    />
    <PropsTable
      caption="AutocompleteClear"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "Whether the button stays in the page while the field is empty." },
        { name: "aria-label", type: "string", description: "Required in practice: name the button, as in Clear fruit." },
        { name: "class", type: "string", description: "Extra classes merged onto the button." },
        { name: "children", type: "Snippet<[AutocompleteClearState]>", description: "Content. Receives disabled, which is true while the field is disabled or read-only." },
      ]}
    />
    <PropsTable
      caption="AutocompleteContent / AutocompleteArrow"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the field the suggestions open on. Flips when there isn't room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How the suggestions line up with the field along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between the field and the suggestions, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the field, in pixels." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space to keep from the viewport edges, in pixels." },
        { name: "arrowPadding", type: "number", description: "Space to keep between the arrow and the popup's corners, in pixels." },
        { name: "anchor", type: "string | Anchor | null", description: "Positions the popup against this instead of the field: an element, a selector, or a point like { x, y }." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Whether the suggestions stay in the page, hidden, while closed." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
      ]}
    />
    <PropsTable
      caption="AutocompleteItem"
      rows={[
        { name: "value", type: "string", description: "Required. Identifies the suggestion; choosing it fills the field with its label, or with this when there's none." },
        { name: "label", type: "string", description: "The text the field gets and filtering matches, when the content isn't plain text. Not the accessible name: use aria-label for that." },
        { name: "keywords", type: "string[]", description: 'More words filtering matches, like ["bug", "patch"] for fix.' },
        { name: "disabled", type: "boolean", default: "false", description: "Keeps the suggestion from being chosen. Arrow keys skip it." },
        { name: "index", type: "number", description: "The suggestion's position among all visible ones, for virtualized lists. Sets aria-posinset and aria-setsize." },
      ]}
    />
    <PropsTable
      caption="AutocompleteItemText / AutocompleteItemIcon"
      rows={[
        { name: "mirror", type: "boolean", default: "false", description: "AutocompleteItemIcon: flips the icon horizontally in right-to-left text, for icons that point a way." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
        { name: "children", type: "Snippet<[AutocompleteItemTextState]>", description: "AutocompleteItemText: without content it shows the suggestion's label with the matched part in a mark; with text content it marks that instead." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="AutocompleteList / AutocompleteGroup / AutocompleteGroupLabel / AutocompleteSeparator / AutocompleteEmpty / AutocompleteStatus"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
        { name: "children", type: "Snippet", description: "Content. AutocompleteList falls back to rendering the root's items data; AutocompleteEmpty and AutocompleteStatus receive their state." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="Snippet state"
      rows={[
        { name: "AutocompleteInput / AutocompleteTrigger", type: "{ open, disabled, readOnly, required }", description: "Whether the suggestions are open and what the field refuses." },
        { name: "AutocompleteContent / AutocompleteList", type: "{ open, presentation, items, status }", description: "items holds the visible suggestions, for rendering a virtualized list yourself." },
        { name: "AutocompleteItem", type: "{ highlighted, disabled }", description: "Whether the suggestion is highlighted, and whether it can't be chosen. There is no selected state: the text is the value." },
        { name: "AutocompleteItemText", type: "{ segments, matched }", description: "The text in pieces, each marked when it matched." },
        { name: "AutocompleteItemIcon", type: "{ mirror }", description: "Whether it flips in right-to-left text." },
        { name: "AutocompleteEmpty", type: "{ loading, empty, query }", description: "Whether results load, nothing matches, and the text filtering the list." },
        { name: "AutocompleteStatus", type: "{ status, loading, count }", description: "Whether results load or failed, and how many suggestions are visible." },
        { name: "AutocompleteClear / AutocompleteArrow", type: "{ disabled } / { open }", description: "Whether the field refuses changes, and whether the suggestions are open." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA combobox pattern with list autocomplete, and list-and-inline with <code class="font-mono text-accent">inlineComplete</code>. The field has <code class="font-mono text-accent">role="combobox"</code>, points at the <code class="font-mono text-accent">listbox</code> it controls, and names the highlighted suggestion through <code class="font-mono text-accent">aria-activedescendant</code> while focus stays in the field.</li>
      <li>The list is named by the field's label. Use <code class="font-mono text-accent">AutocompleteLabel</code>, or an <code class="font-mono text-accent">aria-label</code> when no label is visible.</li>
      <li>Typing opens the suggestions that match and leaves the text as typed, keeping the caret where it was. Text that matches nothing stays, with the empty message.</li>
      <li>Arrow keys move the highlight and skip disabled suggestions; <span class="text-fg">Enter</span> fills in the highlighted text and closes without submitting. Clicking a suggestion fills it in and keeps focus in the field. <code class="font-mono text-accent">loop=false</code> stops at either end.</li>
      <li><span class="text-fg">Enter</span> with nothing highlighted submits the text as typed, through <code class="font-mono text-accent">onSubmit</code> and then the surrounding form. <code class="font-mono text-accent">required</code> blocks an empty submission with the browser's own message.</li>
      <li><span class="text-fg">Escape</span> closes the suggestions and keeps the text; with inline completion it first takes the completion back out. <span class="text-fg">ArrowRight</span> and <span class="text-fg">End</span> accept a completion, and <span class="text-fg">Backspace</span> takes it out without completing again.</li>
      <li>The clear button empties the field and keeps focus in it. Groups are named by their <code class="font-mono text-accent">AutocompleteGroupLabel</code>; separators are hidden from screen readers, and <code class="font-mono text-accent">AutocompleteItemIcon</code> is skipped by screen readers, typeahead and filtering.</li>
      <li>Result counts are announced after typing pauses, through <code class="font-mono text-accent">AutocompleteStatus</code> or the page's shared live region. While results load, the list is <code class="font-mono text-accent">aria-busy</code>.</li>
      <li>The popup follows the field's inherited text direction, so right-to-left works without a provider. Icons marked <code class="font-mono text-accent">mirror</code> flip with it.</li>
      <li>A disabled field can't be focused or changed and submits nothing; a read-only one stays focusable and submits its text. A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables every autocomplete inside it, and a form reset puts the default text back.</li>
    </ul>
  </Section>
</div>