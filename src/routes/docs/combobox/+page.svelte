<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Combobox,
    ComboboxLabel,
    ComboboxInput,
    ComboboxTrigger,
    ComboboxClear,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipRemove,
    ComboboxChipsOverflow,
    ComboboxValue,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxItemText,
    ComboboxItemIndicator,
    ComboboxGroup,
    ComboboxGroupLabel,
    ComboboxSeparator,
    ComboboxEmpty,
    ComboboxSelectAll,
    ComboboxCreate,
    ComboboxArrow,
  } from "#lib/components/combobox"
  import { Button } from "#lib/components/button"
  import { Check, ChevronDown, Minus, Plus, LoaderCircle, X } from "@lucide/svelte"

  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt", label: "Nuxt" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "solidstart", label: "SolidStart" },
    { value: "qwik", label: "Qwik City" },
  ]

  const countries = [
    { value: "ar", label: "Argentina" },
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "jp", label: "Japan" },
  ]

  const timezones = [
    {
      label: "Americas",
      items: [
        { value: "America/New_York", label: "New York" },
        { value: "America/Chicago", label: "Chicago" },
        { value: "America/Los_Angeles", label: "Los Angeles" },
      ],
    },
    {
      label: "Europe",
      items: [
        { value: "Europe/London", label: "London" },
        { value: "Europe/Paris", label: "Paris" },
        { value: "Europe/Berlin", label: "Berlin" },
      ],
    },
    {
      label: "Asia Pacific",
      items: [
        { value: "Asia/Tokyo", label: "Tokyo" },
        { value: "Asia/Singapore", label: "Singapore" },
        { value: "Australia/Sydney", label: "Sydney" },
      ],
    },
  ]

  const frameworkLabel = (value: string) =>
    frameworks.find((item) => item.value === value)?.label ?? value

  const countryLabel = (value: string) =>
    countries.find((item) => item.value === value)?.label ?? value

  const installCode = `import {
  Combobox, ComboboxLabel, ComboboxInput, ComboboxTrigger,
  ComboboxContent, ComboboxList, ComboboxItem, ComboboxItemIndicator,
} from "#lib/components/combobox"`

  const usageCode = `<script lang="ts">
  import {
    Combobox, ComboboxLabel, ComboboxInput, ComboboxTrigger,
    ComboboxContent, ComboboxList, ComboboxItem, ComboboxItemIndicator,
    ComboboxEmpty,
  } from "#lib/components/combobox"
  import { Check, ChevronDown } from "@lucide/svelte"

  const frameworks = [
    { value: "next", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt", label: "Nuxt" },
    { value: "astro", label: "Astro" },
  ]
<\/script>

<div class="w-full max-w-72">
  <Combobox>
    <ComboboxLabel>Framework</ComboboxLabel>
    <div class="flex items-center gap-2">
      <ComboboxInput aria-label="Search frameworks" />
      <ComboboxTrigger aria-label="Show frameworks">
        <ChevronDown aria-hidden="true" />
      </ComboboxTrigger>
    </div>
    <ComboboxContent>
      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      <ComboboxList>
        {#each frameworks as item (item.value)}
          <ComboboxItem value={item.value} label={item.label}>
            {item.label}
            <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`

  const controlledCode = `<script lang="ts">
  let country = $state<string | null>("fr")
  let query = $state("France")
  let open = $state(false)

  const countryLabel = (value: string) =>
    countries.find((item) => item.value === value)?.label ?? value
<\/script>

<div class="flex gap-2">
  <Button size="sm" tone="outline" onclick={() => (country = "jp")}>Choose Japan</Button>
  <Button size="sm" tone="outline" onclick={() => (open = !open)}>Toggle list</Button>
</div>
<div class="w-full max-w-72">
  <Combobox bind:value={country} bind:query bind:open itemToLabel={countryLabel}>
    <ComboboxLabel>Country</ComboboxLabel>
    <div class="flex items-center gap-2">
      <ComboboxInput aria-label="Search countries" />
      <ComboboxTrigger aria-label="Show countries">
        <ChevronDown aria-hidden="true" />
      </ComboboxTrigger>
    </div>
    <ComboboxContent>
      <ComboboxEmpty>No countries found.</ComboboxEmpty>
      <ComboboxList>
        {#each countries as item (item.value)}
          <ComboboxItem value={item.value} label={item.label}>
            {item.label}
            <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>
<p class="text-sm text-muted">value: {country ?? "null"} · query: {query} · open: {open}</p>`

  const chipsCode = `<script lang="ts">
  let picks = $state<string[]>(["next", "astro"])
<\/script>

<div class="w-full max-w-80">
  <Combobox multiple bind:value={picks} itemToLabel={frameworkLabel}>
    <ComboboxLabel>Frameworks</ComboboxLabel>
    <div class="flex items-start gap-2">
      <ComboboxChips>
        <ComboboxValue>
          {#snippet children(state)}
            {#each state.value as string[] as value, index (value)}
              <ComboboxChip {value}>
                {state.labels[index]}
                <ComboboxChipRemove aria-label={\`Remove \${state.labels[index]}\`}>
                  <X aria-hidden="true" />
                </ComboboxChipRemove>
              </ComboboxChip>
            {/each}
          {/snippet}
        </ComboboxValue>
        <ComboboxInput aria-label="Add a framework" />
      </ComboboxChips>
      <ComboboxTrigger aria-label="Show frameworks">
        <ChevronDown aria-hidden="true" />
      </ComboboxTrigger>
    </div>
    <ComboboxContent>
      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      <ComboboxList>
        {#each frameworks as item (item.value)}
          <ComboboxItem value={item.value} label={item.label}>
            {item.label}
            <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
          </ComboboxItem>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</div>`

  const groupsCode = `<Combobox multiple bind:value={zones}>
  <ComboboxLabel>Timezones</ComboboxLabel>
  <ComboboxChips>
    <ComboboxValue>
      {#snippet children(state)}
        {#each state.value as string[] as value, index (value)}
          <ComboboxChip {value}>
            {state.labels[index]}
            <ComboboxChipRemove aria-label={\`Remove \${state.labels[index]}\`}>
              <X aria-hidden="true" />
            </ComboboxChipRemove>
          </ComboboxChip>
        {/each}
      {/snippet}
    </ComboboxValue>
    <ComboboxInput aria-label="Add timezones" />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxEmpty>No cities found.</ComboboxEmpty>
    <ComboboxList>
      <ComboboxSelectAll>
        {#snippet children(state)}
          Select all
          {#if state.checked}<Check aria-hidden="true" />{/if}
          {#if state.indeterminate}<Minus aria-hidden="true" />{/if}
        {/snippet}
      </ComboboxSelectAll>
      <ComboboxSeparator />
      {#each timezones as group (group.label)}
        <ComboboxGroup>
          <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
          {#each group.items as item (item.value)}
            <ComboboxItem value={item.value} label={item.label}>
              <ComboboxItemText />
              <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
            </ComboboxItem>
          {/each}
        </ComboboxGroup>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

  const createCode = `<script lang="ts">
  let tagOptions = $state(["Bug", "Feature", "Documentation", "Design"])
  let tags = $state<string[]>(["Bug"])

  function createTag(query: string) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (query.length > 20) {
          reject(new Error("Labels are 20 characters at most."))
          return
        }
        tagOptions = [...tagOptions, query]
        tags = [...tags, query]
        resolve()
      }, 600)
    })
  }
<\/script>

<Combobox multiple bind:value={tags}>
  <ComboboxLabel>Labels</ComboboxLabel>
  <ComboboxChips>
    <ComboboxValue>
      {#snippet children(state)}
        {#each state.value as string[] as value, index (value)}
          <ComboboxChip {value}>
            {state.labels[index]}
            <ComboboxChipRemove aria-label={\`Remove \${state.labels[index]}\`}>
              <X aria-hidden="true" />
            </ComboboxChipRemove>
          </ComboboxChip>
        {/each}
      {/snippet}
    </ComboboxValue>
    <ComboboxInput aria-label="Add or create a label" />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxList>
      {#each tagOptions as label (label)}
        <ComboboxItem value={label}>
          {label}
          <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
        </ComboboxItem>
      {/each}
      <ComboboxCreate minLength={2} onCreate={createTag}>
        {#snippet children(state)}
          {#if state.pending}
            <LoaderCircle aria-hidden="true" class="animate-spin" />
            Creating “{state.query}”…
          {:else}
            <Plus aria-hidden="true" />
            Create “{state.query}”
            {#if state.error}<span class="text-danger">{(state.error as Error).message}</span>{/if}
          {/if}
        {/snippet}
      </ComboboxCreate>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

  const overflowCode = `<Combobox
  multiple
  defaultValue={["ar", "au", "br", "fr", "de"]}
  itemToLabel={countryLabel}
>
  <ComboboxLabel>Countries</ComboboxLabel>
  <ComboboxChips>
    <ComboboxValue>
      {#snippet children(state)}
        {#each state.value as string[] as value, index (value)}
          <ComboboxChip {value}>
            {state.labels[index]}
            <ComboboxChipRemove aria-label={\`Remove \${state.labels[index]}\`}>
              <X aria-hidden="true" />
            </ComboboxChipRemove>
          </ComboboxChip>
        {/each}
      {/snippet}
    </ComboboxValue>
    <ComboboxChipsOverflow />
    <ComboboxInput aria-label="Add countries" />
  </ComboboxChips>
  <p class="text-xs text-muted">
    <ComboboxValue maxLabels={2} getMoreLabel={(count: number) => \`\${count} more\`} />
  </p>
  <ComboboxContent>
    <ComboboxEmpty>No countries found.</ComboboxEmpty>
    <ComboboxList>
      {#each countries as item (item.value)}
        <ComboboxItem value={item.value} label={item.label}>
          {item.label}
          <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
        </ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

  const placementCode = `<Combobox defaultValue="fr" itemToLabel={countryLabel}>
  <ComboboxLabel>Country</ComboboxLabel>
  <div class="flex items-center gap-2">
    <ComboboxInput aria-label="Search countries" />
    <ComboboxTrigger aria-label="Show countries">
      <ChevronDown aria-hidden="true" />
    </ComboboxTrigger>
  </div>
  <ComboboxContent side="top" align="end" sideOffset={8}>
    <ComboboxArrow />
    <ComboboxList>
      {#each countries as item (item.value)}
        <ComboboxItem value={item.value} label={item.label}>
          {item.label}
          <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
        </ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

  const statesCode = `<Combobox defaultValue="fr" itemToLabel={countryLabel} disabled>
  <ComboboxLabel>Billing country</ComboboxLabel>
  <ComboboxInput aria-label="Billing country" />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="fr" label="France">France</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>

<Combobox defaultValue="fr" itemToLabel={countryLabel} readOnly>
  <ComboboxLabel>Shipping from</ComboboxLabel>
  <ComboboxInput aria-label="Shipping from" />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="fr" label="France">France</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>

<Combobox defaultValue="fr" itemToLabel={countryLabel}>
  <ComboboxLabel>Shipping to</ComboboxLabel>
  <div class="flex items-center gap-2">
    <ComboboxInput aria-label="Search countries" />
    <ComboboxClear aria-label="Clear country"><X aria-hidden="true" /></ComboboxClear>
  </div>
  <ComboboxContent>
    <ComboboxEmpty>No countries found.</ComboboxEmpty>
    <ComboboxList>
      {#each countries as item (item.value)}
        <ComboboxItem value={item.value} label={item.label}>
          {item.label}
          <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
        </ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>

<Combobox multiple maxSelected={2} itemToLabel={frameworkLabel}>
  <ComboboxLabel>Up to two frameworks</ComboboxLabel>
  <ComboboxInput aria-label="Add frameworks" />
  <ComboboxContent>
    <ComboboxList>
      {#each frameworks as item (item.value)}
        <ComboboxItem value={item.value} label={item.label}>
          {item.label}
          <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
        </ComboboxItem>
      {/each}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`

  let country = $state<string | null>("fr")
  let query = $state("France")
  let open = $state(false)
  let picks = $state<string[]>(["next", "astro"])
  let zones = $state<string[]>(["Europe/Paris"])
  let tags = $state<string[]>(["Bug"])
  let tagOptions = $state(["Bug", "Feature", "Documentation", "Design", "Performance"])

  function createTag(text: string) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (text.length > 20) {
          reject(new Error("Labels are 20 characters at most."))
          return
        }
        tagOptions = [...tagOptions, text]
        tags = [...tags, text]
        resolve()
      }, 600)
    })
  }
</script>

<svelte:head>
  <title>Combobox — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Combobox"
  description="A text field that filters a popup list as you type, with chips for several values. Wraps the ui-sdk Combobox, which handles filtering, highlighting, selection, creation and the value submitted with a form."
  entry="@ui-sdk/svelte/combobox"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/combobox</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The input and the trigger sit side by side; the content holds the list.
      <code class="font-mono text-accent">ComboboxItem</code>'s
      <code class="font-mono text-accent">label</code> is what the field shows once chosen and what
      filtering matches, so pass it whenever the item's content isn't plain text.
      <code class="font-mono text-accent">ComboboxItemIndicator</code> renders only while its item is selected.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Focus stays in the input while the highlight moves, so the field needs a name: use
      <code class="font-mono text-accent">ComboboxLabel</code>, or an
      <code class="font-mono text-accent">aria-label</code> when no label is visible. The native
      <code class="font-mono text-accent">placeholder</code> attribute still works on
      <code class="font-mono text-accent">ComboboxInput</code> for a hint inside the empty field, but it
      never names the field.
    </p>
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Type to filter, arrow keys to move, Enter to choose. Matching ignores case and accents." code={usageCode}>
      <div class="w-full max-w-72">
        <Combobox>
          <ComboboxLabel>Framework</ComboboxLabel>
          <div class="flex items-center gap-2">
            <ComboboxInput aria-label="Search frameworks" />
            <ComboboxTrigger aria-label="Show frameworks">
              <ChevronDown aria-hidden="true" />
            </ComboboxTrigger>
          </div>
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxList>
              {#each frameworks as item (item.value)}
                <ComboboxItem value={item.value} label={item.label}>
                  {item.label}
                  <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                </ComboboxItem>
              {/each}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Demo>

    <Demo title="Controlled value, text and open state" description="bind:value, bind:query and bind:open let a parent drive the combobox. itemToLabel names a value whose item isn't rendered." code={controlledCode}>
      <div class="flex w-full flex-col items-center gap-4">
        <div class="flex gap-2">
          <Button size="sm" tone="outline" onclick={() => (country = "jp")}>Choose Japan</Button>
          <Button size="sm" tone="outline" onclick={() => (open = !open)}>Toggle list</Button>
        </div>
        <div class="w-full max-w-72">
          <Combobox bind:value={country} bind:query bind:open itemToLabel={countryLabel}>
            <ComboboxLabel>Country</ComboboxLabel>
            <div class="flex items-center gap-2">
              <ComboboxInput aria-label="Search countries" />
              <ComboboxTrigger aria-label="Show countries">
                <ChevronDown aria-hidden="true" />
              </ComboboxTrigger>
            </div>
            <ComboboxContent>
              <ComboboxEmpty>No countries found.</ComboboxEmpty>
              <ComboboxList>
                {#each countries as item (item.value)}
                  <ComboboxItem value={item.value} label={item.label}>
                    {item.label}
                    <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                  </ComboboxItem>
                {/each}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <p class="text-sm text-muted">value: {country ?? "null"} · query: {query} · open: {open}</p>
      </div>
    </Demo>

    <Demo title="Multiple with chips" description="Each chosen value becomes a chip. Backspace in an empty field removes the last one; arrow keys move between chips." code={chipsCode}>
      <div class="w-full max-w-80">
        <Combobox multiple bind:value={picks} itemToLabel={frameworkLabel}>
          <ComboboxLabel>Frameworks</ComboboxLabel>
          <div class="flex items-start gap-2">
            <ComboboxChips>
              <ComboboxValue>
                {#snippet children(state)}
                  {#each state.value as string[] as value, index (value)}
                    <ComboboxChip {value}>
                      {state.labels[index]}
                      <ComboboxChipRemove aria-label={`Remove ${state.labels[index]}`}>
                        <X aria-hidden="true" />
                      </ComboboxChipRemove>
                    </ComboboxChip>
                  {/each}
                {/snippet}
              </ComboboxValue>
              <ComboboxInput aria-label="Add a framework" />
            </ComboboxChips>
            <ComboboxTrigger aria-label="Show frameworks">
              <ChevronDown aria-hidden="true" />
            </ComboboxTrigger>
          </div>
          <ComboboxContent>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            <ComboboxList>
              {#each frameworks as item (item.value)}
                <ComboboxItem value={item.value} label={item.label}>
                  {item.label}
                  <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                </ComboboxItem>
              {/each}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Demo>

    <Demo title="Grouped search with select all" description="ComboboxItemText bolds what matched. Groups with no match hide, and select all covers the whole list or one group." code={groupsCode}>
      <div class="w-full max-w-80">
        <Combobox multiple bind:value={zones}>
          <ComboboxLabel>Timezones</ComboboxLabel>
          <ComboboxChips>
            <ComboboxValue>
              {#snippet children(state)}
                {#each state.value as string[] as value, index (value)}
                  <ComboboxChip {value}>
                    {state.labels[index]}
                    <ComboboxChipRemove aria-label={`Remove ${state.labels[index]}`}>
                      <X aria-hidden="true" />
                    </ComboboxChipRemove>
                  </ComboboxChip>
                {/each}
              {/snippet}
            </ComboboxValue>
            <ComboboxInput aria-label="Add timezones" />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>No cities found.</ComboboxEmpty>
            <ComboboxList>
              <ComboboxSelectAll>
                {#snippet children(state)}
                  Select all
                  {#if state.checked}<Check aria-hidden="true" />{/if}
                  {#if state.indeterminate}<Minus aria-hidden="true" />{/if}
                {/snippet}
              </ComboboxSelectAll>
              <ComboboxSeparator />
              {#each timezones as group (group.label)}
                <ComboboxGroup>
                  <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                  {#each group.items as item (item.value)}
                    <ComboboxItem value={item.value} label={item.label}>
                      <ComboboxItemText />
                      <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                    </ComboboxItem>
                  {/each}
                </ComboboxGroup>
              {/each}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Demo>

    <Demo title="Create a value" description="ComboboxCreate appears while the text matches no label exactly. A Promise from onCreate marks it pending; a rejection shows its message." code={createCode}>
      <div class="w-full max-w-80">
        <Combobox multiple bind:value={tags}>
          <ComboboxLabel>Labels</ComboboxLabel>
          <ComboboxChips>
            <ComboboxValue>
              {#snippet children(state)}
                {#each state.value as string[] as value, index (value)}
                  <ComboboxChip {value}>
                    {state.labels[index]}
                    <ComboboxChipRemove aria-label={`Remove ${state.labels[index]}`}>
                      <X aria-hidden="true" />
                    </ComboboxChipRemove>
                  </ComboboxChip>
                {/each}
              {/snippet}
            </ComboboxValue>
            <ComboboxInput aria-label="Add or create a label" />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxList>
              {#each tagOptions as label (label)}
                <ComboboxItem value={label}>
                  {label}
                  <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                </ComboboxItem>
              {/each}
              <ComboboxCreate minLength={2} onCreate={createTag}>
                {#snippet children(state)}
                  {#if state.pending}
                    <LoaderCircle aria-hidden="true" class="animate-spin" />
                    Creating “{state.query}”…
                  {:else}
                    <Plus aria-hidden="true" />
                    Create “{state.query}”
                    {#if state.error}<span class="text-danger">{(state.error as Error).message}</span>{/if}
                  {/if}
                {/snippet}
              </ComboboxCreate>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      The popup is anchored to the input: it matches its width through
      <code class="font-mono text-accent">--anchor-width</code>, never grows past
      <code class="font-mono text-accent">--available-height</code>, and scales from
      <code class="font-mono text-accent">--transform-origin</code>. On small touch screens
      <code class="font-mono text-accent">presentation="auto"</code> turns it into a sheet with the input in its header.
    </p>

    <Demo title="Chips that collapse" description="ComboboxChipsOverflow hides the chips that don't fit and counts them. A second ComboboxValue summarizes the selection in words." code={overflowCode}>
      <div class="w-full max-w-72">
        <Combobox
          multiple
          defaultValue={["ar", "au", "br", "fr", "de"]}
          itemToLabel={countryLabel}
        >
          <ComboboxLabel>Countries</ComboboxLabel>
          <ComboboxChips>
            <ComboboxValue>
              {#snippet children(state)}
                {#each state.value as string[] as value, index (value)}
                  <ComboboxChip {value}>
                    {state.labels[index]}
                    <ComboboxChipRemove aria-label={`Remove ${state.labels[index]}`}>
                      <X aria-hidden="true" />
                    </ComboboxChipRemove>
                  </ComboboxChip>
                {/each}
              {/snippet}
            </ComboboxValue>
            <ComboboxChipsOverflow />
            <ComboboxInput aria-label="Add countries" />
          </ComboboxChips>
          <p class="text-xs text-muted">
            <ComboboxValue maxLabels={2} getMoreLabel={(count: number) => `${count} more`} />
          </p>
          <ComboboxContent>
            <ComboboxEmpty>No countries found.</ComboboxEmpty>
            <ComboboxList>
              {#each countries as item (item.value)}
                <ComboboxItem value={item.value} label={item.label}>
                  {item.label}
                  <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                </ComboboxItem>
              {/each}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Demo>

    <Demo title="Placement and arrow" description="side, align and sideOffset move the popup; ComboboxArrow points back at the field and follows the side chosen after collision handling." code={placementCode}>
      <div class="w-full max-w-72">
        <Combobox defaultValue="fr" itemToLabel={countryLabel}>
          <ComboboxLabel>Country</ComboboxLabel>
          <div class="flex items-center gap-2">
            <ComboboxInput aria-label="Search countries" />
            <ComboboxTrigger aria-label="Show countries">
              <ChevronDown aria-hidden="true" />
            </ComboboxTrigger>
          </div>
          <ComboboxContent side="top" align="end" sideOffset={8}>
            <ComboboxArrow />
            <ComboboxList>
              {#each countries as item (item.value)}
                <ComboboxItem value={item.value} label={item.label}>
                  {item.label}
                  <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                </ComboboxItem>
              {/each}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Demo>

    <Demo title="Disabled, read-only, clear and a selection limit" description="A disabled combobox can't be focused; a read-only one keeps its value and stays focusable. maxSelected disables the rest once the limit is reached." code={statesCode}>
      <div class="flex w-full max-w-72 flex-col gap-3">
        <Combobox defaultValue="fr" itemToLabel={countryLabel} disabled>
          <ComboboxLabel>Billing country</ComboboxLabel>
          <ComboboxInput aria-label="Billing country" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem value="fr" label="France">France</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Combobox defaultValue="fr" itemToLabel={countryLabel} readOnly>
          <ComboboxLabel>Shipping from</ComboboxLabel>
          <ComboboxInput aria-label="Shipping from" />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem value="fr" label="France">France</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Combobox defaultValue="fr" itemToLabel={countryLabel}>
          <ComboboxLabel>Shipping to</ComboboxLabel>
          <div class="flex items-center gap-2">
            <ComboboxInput aria-label="Search countries" />
            <ComboboxClear aria-label="Clear country"><X aria-hidden="true" /></ComboboxClear>
          </div>
          <ComboboxContent>
            <ComboboxEmpty>No countries found.</ComboboxEmpty>
            <ComboboxList>
              {#each countries as item (item.value)}
                <ComboboxItem value={item.value} label={item.label}>
                  {item.label}
                  <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                </ComboboxItem>
              {/each}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        <Combobox multiple maxSelected={2} itemToLabel={frameworkLabel}>
          <ComboboxLabel>Up to two frameworks</ComboboxLabel>
          <ComboboxInput aria-label="Add frameworks" />
          <ComboboxContent>
            <ComboboxList>
              {#each frameworks as item (item.value)}
                <ComboboxItem value={item.value} label={item.label}>
                  {item.label}
                  <ComboboxItemIndicator><Check aria-hidden="true" /></ComboboxItemIndicator>
                </ComboboxItem>
              {/each}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </Demo>

    <p class="text-sm text-muted">
      State attributes: <code class="font-mono text-accent">data-open</code>,
      <code class="font-mono text-accent">data-closed</code>,
      <code class="font-mono text-accent">data-highlighted</code>,
      <code class="font-mono text-accent">data-selected</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code>,
      <code class="font-mono text-accent">data-required</code>,
      <code class="font-mono text-accent">data-presentation</code>,
      <code class="font-mono text-accent">data-modality</code>,
      <code class="font-mono text-accent">data-matched</code>,
      <code class="font-mono text-accent">data-pending</code>,
      <code class="font-mono text-accent">data-has-icons</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Combobox (root)"
      rows={[
        { name: "value", type: "T | T[] | null", description: "The selected value, or values with multiple. Bind with bind:value to control. null selects nothing." },
        { name: "defaultValue", type: "T | T[] | null", description: "The value selected at first, when uncontrolled. A form reset returns to it." },
        { name: "multiple", type: "boolean", default: "false", description: "Whether several items can be selected. The value is then a list, the list stays open as items toggle, and the input empties after each choice." },
        { name: "query", type: "string", description: "The input's text, which filters the list. Bind with bind:query. Choosing an item sets it to the item's label, or empties it with multiple." },
        { name: "defaultQuery", type: "string", description: "The input's text at first, when uncontrolled. Defaults to the selected item's label." },
        { name: "open", type: "boolean", description: "Whether the list is open. Bind with bind:open to control." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Whether the list starts open, when uncontrolled." },
        { name: "items", type: "ListData<T>", description: "The items as data. Renders the list for you and filters it without rendering every item." },
        { name: "emptyItems", type: "ListData<T>", description: "Items shown instead of items while the input is empty, like recent choices. Needs items." },
        { name: "filter", type: "ListFilter<T>", default: '"contains"', description: 'How typing narrows the list: "contains", "startsWith", a function of the item and text whose numeric result also sorts data items, or false for results a server already filtered.' },
        { name: "autoHighlight", type: 'boolean | "always"', description: "Whether the first match is highlighted while typing, so Enter chooses it. \"always\" also highlights the selected item, or the first, when the list opens." },
        { name: "maxSelected", type: "number", description: "With multiple, how many items can be selected. Once reached, the other items are disabled." },
        { name: "keepQuery", type: "boolean", description: "With multiple, whether the input keeps its text after an item is chosen." },
        { name: "allowCustomValue", type: "boolean", description: "Whether text that matches no item becomes the value: on Enter with nothing highlighted, or, without multiple, when the list closes." },
        { name: "status", type: "AsyncOptionsStatus", default: '"idle"', description: "Whether results are loading or failed. Sets aria-busy on the list while loading." },
        { name: "itemToValue", type: "(value: T) => string", description: "The string an item's value submits as and is identified by, for object values." },
        { name: "itemToLabel", type: "(value: T) => string", description: "The text a value shows, for values whose item isn't rendered, like async results." },
        { name: "isItemEqualToValue", type: "(itemValue: T, value: T) => boolean", description: "Whether an item's value is the selected value, for object values that aren't the same object." },
        { name: "loop", type: "boolean", default: "true", description: "Whether arrow keys wrap from the last item to the first." },
        { name: "modal", type: 'boolean | "pointer"', default: '"pointer"', description: '"pointer" shields the page from presses; true also locks scroll and makes it inert; false lets outside presses through.' },
        { name: "presentation", type: '"auto" | "popover" | "sheet"', default: '"popover"', description: "How the list presents. sheet slides up from the bottom with the input in its header and can be swiped away; auto does that on small touch screens." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the combobox like a native input: it can't be focused or changed, and the value isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Keeps the combobox focusable and its value submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until a value is selected, with the browser's own message." },
        { name: "name", type: "string", description: "The name the value submits under. Without one, the combobox submits nothing." },
        { name: "form", type: "string", description: "The id of a form to belong to, when the combobox isn't inside that form." },
        { name: "dismissible", type: "boolean", default: "true", description: "Whether Escape, an outside press, focus or the window leaving, back and a sheet's swipe can close the list." },
        { name: "controller", type: "ComboboxController", description: "Opens, closes, reads and sets the combobox from anywhere. Create one with createComboboxController()." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
        { name: "announcement", type: "(change: ListAnnouncement) => string | null", description: 'What screen readers hear after typing pauses, when no ComboboxStatus is rendered, and when a chip is removed. Receives { type: "results", count, query, loading } or { type: "removed", label }.' },
        { name: "pendingAnnouncement", type: "string", description: "What screen readers hear once ComboboxCreate's onCreate has been pending for a second. Set it in the page's language; an empty string says nothing." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when a user, a form reset or a controller wants to change the value. details.reason says why; details.cancel() stops it." },
        { name: "onQueryChange", type: "(query, details) => void", description: "Runs when the input's text wants to change: typing, choosing an item, or closing with text that wasn't chosen." },
        { name: "onOpenChange", type: "(open, details) => void", description: "Runs when the list wants to open or close. details.cancel() stops it." },
        { name: "onOpenChangeComplete", type: "(open) => void", description: "Runs once the list has finished opening or closing, after any animation." },
        { name: "onHighlight", type: "(value, { index, event }) => void", description: "Runs when the highlight moves, with the item's index among the visible items." },
        { name: "onLoadMore", type: "() => void", description: "Runs when the highlight or scrolling reaches the last item, so the next page can load." },
        { name: "onDismissAttempt", type: "({ reason, event }) => void", description: "Runs when dismissible refused a dismissal made on purpose: Escape, an outside press, back or a swipe." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason to the console, in development builds." },
      ]}
    />
    <PropsTable
      caption="ComboboxInput / ComboboxTrigger / ComboboxLabel"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
        { name: "children", type: "Snippet<[ComboboxInputState]>", description: "ComboboxInput and ComboboxTrigger receive open, disabled, readOnly and required. ComboboxLabel takes plain content." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
        { name: "aria-label", type: "string", description: "Names the field when no ComboboxLabel is visible. The trigger is kept out of the tab order while the input sits beside it." },
        { name: "placeholder", type: "string", description: "ComboboxInput only: the native hint shown while the field is empty. It is not the accessible name." },
        { name: "disabled", type: "boolean", description: "ComboboxTrigger only: stops the button from opening the list." },
      ]}
    />
    <PropsTable
      caption="ComboboxChips / ComboboxChip / ComboboxChipRemove / ComboboxChipsOverflow"
      rows={[
        { name: "value", type: "T", description: "Required on ComboboxChip and ComboboxChipRemove: the selected value the chip stands for." },
        { name: "class", type: "string", description: "Extra classes merged onto the element. ComboboxChips also styles the input inside it." },
        { name: "children", type: "Snippet<[ComboboxChipState]>", description: "ComboboxChip receives value, label and disabled; ComboboxChipsOverflow receives count and the hidden labels." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
        { name: "aria-label", type: "string", description: "Name each remove button after its chip, as in Remove France." },
      ]}
    />
    <PropsTable
      caption="ComboboxValue / ComboboxValueIcon / ComboboxClear"
      rows={[
        { name: "maxLabels", type: "number", description: 'ComboboxValue: with multiple, how many labels its state.label joins before the rest are counted, as in "France, Chile and 2 more".' },
        { name: "getMoreLabel", type: "(count: number) => string", default: "(count) => `${count} more`", description: "ComboboxValue: the words for the labels past maxLabels." },
        { name: "children", type: "Snippet<[ComboboxValueState]>", description: "ComboboxValue renders no element of its own: without children it writes state.label, with children it renders them from value, labels and label." },
        { name: "keepMounted", type: "boolean", default: "false", description: "ComboboxClear: stays in the page while there's nothing to clear." },
        { name: "class", type: "string", description: "ComboboxValueIcon and ComboboxClear: extra classes. ComboboxValueIcon takes no children and shows the selected item's icon." },
      ]}
    />
    <PropsTable
      caption="ComboboxContent / ComboboxArrow"
      rows={[
        { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Which side of the input the list opens on. Flips when there isn't room." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "How the list lines up with the input along that side. start and end follow the reading direction." },
        { name: "sideOffset", type: "number", default: "4", description: "Gap between the input and the list, in pixels." },
        { name: "alignOffset", type: "number", default: "0", description: "Shift along the input, in pixels." },
        { name: "collisionPadding", type: "number", default: "0", description: "Space to keep from the viewport edges, in pixels." },
        { name: "arrowPadding", type: "number", description: "Space to keep between the arrow and the popup's corners, in pixels." },
        { name: "anchor", type: "string | Anchor | null", description: "Positions the popup against this instead of the input: an element, a selector, or a point like { x, y }." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Whether the list stays in the page, hidden, while closed." },
        { name: "container", type: "Element | DocumentFragment | null", description: "Renders the popup into this element instead of in place." },
      ]}
    />
    <PropsTable
      caption="ComboboxItem"
      rows={[
        { name: "value", type: "T", description: "Required. What the value becomes when the item is chosen. A string, or any value with itemToValue." },
        { name: "label", type: "string", description: "The text the input shows once chosen and filtering matches, when the content isn't plain text. Not the accessible name: use aria-label for that." },
        { name: "keywords", type: "string[]", description: 'More words filtering matches, like ["deutschland"] for Germany.' },
        { name: "disabled", type: "boolean", default: "false", description: "Keeps the item from being chosen. The keyboard and the pointer skip it." },
        { name: "index", type: "number", description: "The item's position among all visible items, for virtualized lists. Sets aria-posinset and aria-setsize." },
      ]}
    />
    <PropsTable
      caption="ComboboxItemIndicator / ComboboxItemIcon / ComboboxCreate"
      rows={[
        { name: "keepMounted", type: "boolean", default: "false", description: "ComboboxItemIndicator: stays in the page while its item isn't selected, so both states can be styled or animated." },
        { name: "mirror", type: "boolean", default: "false", description: "ComboboxItemIcon: flips the icon horizontally in right-to-left text, for icons that point a way." },
        { name: "onCreate", type: "(query: string) => unknown", description: "ComboboxCreate: runs with the input's text when the option is chosen. It doesn't change the value by itself. Return a Promise to mark the option pending until it settles." },
        { name: "minLength", type: "number", description: "ComboboxCreate: how many characters the text needs before the option shows." },
        { name: "children", type: "Snippet<[ComboboxCreateState]>", description: 'ComboboxCreate: without content it writes Create “text”. Its state carries query, highlighted, pending and error.' },
      ]}
    />
    <PropsTable
      caption="ComboboxList / ComboboxGroup / ComboboxGroupLabel / ComboboxSeparator / ComboboxEmpty / ComboboxStatus / ComboboxSelectAll / ComboboxItemText"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
        { name: "children", type: "Snippet", description: "Content. ComboboxEmpty, ComboboxStatus, ComboboxSelectAll and ComboboxItemText receive their state; ComboboxList falls back to rendering the root's items data." },
        { name: "render", type: "Snippet", description: "Renders your own element with the props to spread on it." },
      ]}
    />
    <PropsTable
      caption="Snippet state"
      rows={[
        { name: "ComboboxInput / ComboboxTrigger", type: "{ open, disabled, readOnly, required }", description: "Whether the list is open and what the field refuses." },
        { name: "ComboboxValue", type: "{ value, labels, label }", description: "value is one value, null, or a list with multiple; labels holds each label in selection order; label joins them." },
        { name: "ComboboxChip", type: "{ value, label, disabled }", description: "The chip's value, its text from itemToLabel or its item, and whether it can't be removed." },
        { name: "ComboboxChipsOverflow", type: "{ count, labels }", description: "How many chips don't fit, and their labels." },
        { name: "ComboboxItem", type: "{ highlighted, selected, disabled, maxReached }", description: "maxReached says the item is disabled because maxSelected is reached." },
        { name: "ComboboxContent / ComboboxList", type: "{ open, presentation, multiple, items, status }", description: "items holds the visible data items, for rendering a virtualized list yourself." },
        { name: "ComboboxItemText", type: "{ segments, matched }", description: "The text in pieces, each marked when it matched." },
        { name: "ComboboxSelectAll", type: "{ checked, indeterminate, highlighted, disabled }", description: "Whether every item it covers is selected, or only some." },
        { name: "ComboboxCreate", type: "{ query, highlighted, pending, error }", description: "The text it would create, whether onCreate is running, and why the last try failed." },
        { name: "ComboboxEmpty", type: "{ loading, empty, query }", description: "Whether results load, nothing matches, and the text filtering the list." },
        { name: "ComboboxStatus", type: "{ status, loading, count }", description: "Whether results load or failed, and how many items are visible." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA combobox pattern with list autocomplete: the input has <code class="font-mono text-accent">role="combobox"</code>, points at the <code class="font-mono text-accent">listbox</code> it controls, and names the highlighted option through <code class="font-mono text-accent">aria-activedescendant</code> while focus stays in the field.</li>
      <li>Typing filters the options and opens the list; matching ignores case and accents. <span class="text-fg">ArrowDown</span> opens the list, then arrow keys move the highlight and skip disabled items. <code class="font-mono text-accent">loop=false</code> stops at either end.</li>
      <li><span class="text-fg">Enter</span> chooses the highlighted item, puts its label in the input and closes the list. Clicking an item chooses it and keeps focus in the input. With <code class="font-mono text-accent">autoHighlight</code>, the first match is highlighted from the first keystroke.</li>
      <li><span class="text-fg">Escape</span> closes the list and restores the selection's label; after deleting the text it brings the value back. Leaving the field with the text deleted keeps the value empty. <span class="text-fg">Tab</span> closes the list and moves on.</li>
      <li>With <code class="font-mono text-accent">multiple</code>, choosing toggles an item and keeps the list open. <span class="text-fg">Backspace</span> in an empty input removes the last chip, and <span class="text-fg">ArrowLeft</span>/<span class="text-fg">ArrowRight</span> move between chips, reversed in right-to-left text. Each remove button is named after its chip.</li>
      <li><code class="font-mono text-accent">ComboboxSelectAll</code> reports a mixed state when only some of its items are selected, and is disabled when choosing them all would pass <code class="font-mono text-accent">maxSelected</code>.</li>
      <li>Groups are named by their <code class="font-mono text-accent">ComboboxGroupLabel</code>; separators are hidden from screen readers. <code class="font-mono text-accent">ComboboxItemIcon</code> is skipped by screen readers, typeahead and filtering.</li>
      <li>Result counts are announced after typing pauses, through <code class="font-mono text-accent">ComboboxStatus</code> or the page's shared live region; removing a chip is announced too. A slow <code class="font-mono text-accent">onCreate</code> says <code class="font-mono text-accent">pendingAnnouncement</code> after a second rather than passing in silence.</li>
      <li>The popup follows the input's inherited text direction, so right-to-left works without a provider. Icons marked <code class="font-mono text-accent">mirror</code> flip with it.</li>
      <li>A disabled combobox can't be focused and submits nothing; a read-only one stays focusable and submits its value, and its chips can't be removed. A disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables every combobox inside it.</li>
    </ul>
  </Section>
</div>