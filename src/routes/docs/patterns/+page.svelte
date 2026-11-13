<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock } from "#lib/docs"
  import { Button } from "#lib/components/button"
  import { Switch, SwitchThumb } from "#lib/components/switch"
  import { Tabs, TabsList, TabsTab, TabsPanel } from "#lib/components/tabs"
  import {
    Dialog,
    DialogBackdrop,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
  } from "#lib/components/dialog"
  import { Moon, Sun } from "@lucide/svelte"

  let tab = $state("account")
  let open = $state(false)
  let dark = $state(false)

  const partsCode = `<script lang="ts">
  import { Tabs, TabsList, TabsTab, TabsPanel } from "#lib/components/tabs"
<\/script>

<Tabs defaultValue="account">
  <TabsList aria-label="Settings">
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="password">Password</TabsTab>
  </TabsList>
  <TabsPanel value="account">Manage your profile.</TabsPanel>
  <TabsPanel value="password">Choose a new password.</TabsPanel>
</Tabs>`

  const classCode = `<Button tone="outline" class="rounded-full px-6">
  Custom shape
</Button>

<!-- cn() merges classes; the user's class wins on conflict. -->`

  const renderCode = `<Button tone="outline">
  {#snippet render({ props })}
    <a {...props} href="/docs/tabs">Go to Tabs</a>
  {/snippet}
</Button>`

  const childrenCode = `<script lang="ts">
  import { Switch, SwitchThumb } from "#lib/components/switch"
  import { Moon, Sun } from "@lucide/svelte"
<\/script>

<Switch size="lg">
  <SwitchThumb>
    {#snippet children(state)}
      {#if state.checked}<Moon aria-hidden="true" />{:else}<Sun aria-hidden="true" />{/if}
    {/snippet}
  </SwitchThumb>
</Switch>`

  const controlledTabsCode = `<script lang="ts">
  import { Tabs, TabsList, TabsTab, TabsPanel } from "#lib/components/tabs"
  let tab = $state("account")
<\/script>

<Tabs bind:value={tab}>
  <TabsList aria-label="Settings">
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="password">Password</TabsTab>
  </TabsList>
  <TabsPanel value="account">Manage your profile.</TabsPanel>
  <TabsPanel value="password">Choose a new password.</TabsPanel>
</Tabs>
<p>Selected: {tab}</p>`

  const controlledDialogCode = `<script lang="ts">
  import { Dialog, DialogBackdrop, DialogContent, DialogTitle, DialogDescription, DialogClose } from "#lib/components/dialog"
  import { Button } from "#lib/components/button"
  let open = $state(false)
<\/script>

<Button onclick={() => (open = true)}>Open dialog</Button>
<Dialog bind:open>
  <DialogBackdrop />
  <DialogContent>
    <DialogTitle>Controlled</DialogTitle>
    <DialogDescription>Open state lives in the parent.</DialogDescription>
    <div class="flex justify-end gap-2">
      <Button tone="ghost" onclick={() => (open = false)}>Cancel</Button>
      <DialogClose>Done</DialogClose>
    </div>
  </DialogContent>
</Dialog>`

  const stateCode = `<!-- ui-sdk exposes state as data attributes; style them in class. -->
<Switch class="data-[checked]:bg-accent data-[disabled]:opacity-50" />
<Button class="data-[pending]:cursor-wait">Save</Button>
<TabsTab class="data-[selected]:text-accent">Account</TabsTab>`

  const attributes = [
    { attr: "data-slot", meaning: "Which part this element is (e.g. root, trigger, content)." },
    { attr: "data-open / data-closed", meaning: "Popup or disclosure open state." },
    { attr: "data-checked", meaning: "Switch / checkbox / radio on state." },
    { attr: "data-selected", meaning: "The chosen tab, option or item." },
    { attr: "data-highlighted", meaning: "The item under keyboard / pointer focus in a list." },
    { attr: "data-disabled", meaning: "The part is disabled." },
    { attr: "data-orientation", meaning: "horizontal or vertical (tabs, slider, separator)." },
    { attr: "data-side / data-align", meaning: "Where an anchored popup landed relative to its trigger." },
  ]
</script>

<svelte:head>
  <title>Usage patterns — Negentropy UI</title>
</svelte:head>

<div class="space-y-10">
  <PageHeader
    title="Usage patterns"
    description="Every Negentropy component follows one shape: a Root and its Parts, thin wrappers over ui-sdk behaviors. Learn the composition, class merging, snippets, controlled state and the data attributes you style from."
  />

  <Section id="overview" title="The shape">
    <p class="text-sm leading-relaxed text-muted">
      A component is a <span class="text-fg">Root</span> plus its <span class="text-fg">Parts</span>,
      imported together from <code class="font-mono text-accent">#lib/components/&lt;name&gt;</code>.
      The wrapper forwards every prop to the ui-sdk part and adds classes and variant props — it
      never reimplements behavior. Anything the ui-sdk part accepts (HTML attributes, callbacks,
      snippets) passes straight through.
    </p>
  </Section>

  <Section id="parts" title="Root and parts">
    <p class="text-sm leading-relaxed text-muted">
      Compose the parts inside the root. Tabs is a typical multi-part component: a list of tabs
      and a panel per tab, matched by <code class="font-mono text-accent">value</code>.
    </p>
    <Demo title="Tabs" description="Root + TabsList + TabsTab + TabsPanel. Arrow keys move between tabs; the panel follows." code={partsCode}>
      <div class="w-full max-w-md">
        <Tabs defaultValue="account">
          <TabsList aria-label="Settings">
            <TabsTab value="account">Account</TabsTab>
            <TabsTab value="password">Password</TabsTab>
          </TabsList>
          <TabsPanel value="account">Manage your profile.</TabsPanel>
          <TabsPanel value="password">Choose a new password.</TabsPanel>
        </Tabs>
      </div>
    </Demo>
  </Section>

  <Section id="styling" title="Class merging and variants">
    <p class="text-sm leading-relaxed text-muted">
      Variant props like <code class="font-mono text-accent">tone</code> and
      <code class="font-mono text-accent">size</code> pick a preset. Your
      <code class="font-mono text-accent">class</code> is merged with
      <code class="font-mono text-accent">cn()</code> (clsx + tailwind-merge), and on a conflict
      your class wins — so you can override any preset without forking the component.
    </p>
    <Demo title="Override a preset" description="tone=outline gives the border; class rounds it fully and widens the padding." code={classCode}>
      <Button tone="outline" class="rounded-full px-6">Custom shape</Button>
    </Demo>
  </Section>

  <Section id="snippets" title="render and children snippets">
    <p class="text-sm leading-relaxed text-muted">
      Two snippets give you full control. <code class="font-mono text-accent">render</code> swaps
      the element a part renders — spread the provided <code class="font-mono text-accent">props</code>
      onto your own element to keep the behavior. <code class="font-mono text-accent">children</code>
      receives the part's <code class="font-mono text-accent">state</code> so you can render from it.
    </p>
    <Demo title="render: become a link" description="The render snippet swaps in an anchor and keeps link semantics — no as prop." code={renderCode}>
      <Button tone="outline">
        {#snippet render({ props })}
          <a {...props} href="/docs/tabs">Go to Tabs</a>
        {/snippet}
      </Button>
    </Demo>
    <Demo title="children: read state" description="The thumb's children snippet receives state, so it shows a sun or a moon as it toggles." code={childrenCode}>
      <label class="flex cursor-pointer items-center gap-2.5 text-sm text-fg">
        Dark mode
        <Switch size="lg" bind:checked={dark}>
          <SwitchThumb>
            {#snippet children(state)}
              {#if state.checked}<Moon aria-hidden="true" />{:else}<Sun aria-hidden="true" />{/if}
            {/snippet}
          </SwitchThumb>
        </Switch>
      </label>
    </Demo>
  </Section>

  <Section id="controlled" title="Controlled state">
    <p class="text-sm leading-relaxed text-muted">
      Start uncontrolled with <code class="font-mono text-accent">defaultValue</code> /
      <code class="font-mono text-accent">defaultOpen</code>, or take control with
      <code class="font-mono text-accent">bind:value</code>, <code class="font-mono text-accent">bind:open</code>
      or <code class="font-mono text-accent">bind:checked</code>. The binding chains through the wrapper
      to the ui-sdk part. Change callbacks like <code class="font-mono text-accent">onValueChange(value, details)</code>
      tell you why a change happened, and <code class="font-mono text-accent">details.cancel()</code> can stop it.
    </p>
    <Demo title="Controlled Tabs" description="bind:value keeps the selected tab in the parent; the readout stays in sync." code={controlledTabsCode}>
      <div class="w-full max-w-md space-y-3">
        <Tabs bind:value={tab}>
          <TabsList aria-label="Settings">
            <TabsTab value="account">Account</TabsTab>
            <TabsTab value="password">Password</TabsTab>
          </TabsList>
          <TabsPanel value="account">Manage your profile.</TabsPanel>
          <TabsPanel value="password">Choose a new password.</TabsPanel>
        </Tabs>
        <p class="text-sm text-muted">Selected: <span class="font-mono text-accent">{tab}</span></p>
      </div>
    </Demo>
    <Demo title="Controlled Dialog" description="bind:open lets an external button open the dialog; Cancel and Done both close it." code={controlledDialogCode}>
      <div class="flex flex-col items-center gap-3">
        <Button onclick={() => (open = true)}>Open dialog</Button>
        <Dialog bind:open>
          <DialogBackdrop />
          <DialogContent>
            <DialogTitle>Controlled</DialogTitle>
            <DialogDescription>Open state lives in the parent.</DialogDescription>
            <div class="flex justify-end gap-2">
              <Button tone="ghost" onclick={() => (open = false)}>Cancel</Button>
              <DialogClose>Done</DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        <p class="text-sm text-muted">open: <span class="font-mono text-accent">{open}</span></p>
      </div>
    </Demo>
  </Section>

  <Section id="state" title="Styling from data attributes">
    <p class="text-sm leading-relaxed text-muted">
      ui-sdk exposes state as data attributes, not JavaScript. Style them with attribute
      selectors in <code class="font-mono text-accent">class</code>. There is no
      <code class="font-mono text-accent">data-state</code> — the attributes are specific, like
      <code class="font-mono text-accent">data-open</code> and <code class="font-mono text-accent">data-checked</code>.
    </p>
    <CodeBlock code={stateCode} lang="svelte" />
    <div class="overflow-x-auto rounded-lg border border-line">
      <table class="w-full text-left text-sm">
        <thead class="border-b border-line bg-elevated text-xs uppercase tracking-wider text-faint">
          <tr>
            <th class="px-4 py-2.5 font-semibold">Attribute</th>
            <th class="px-4 py-2.5 font-semibold">Meaning</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-line">
          {#each attributes as a (a.attr)}
            <tr>
              <td class="px-4 py-2 font-mono text-xs text-accent">{a.attr}</td>
              <td class="px-4 py-2 text-muted">{a.meaning}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </Section>
</div>