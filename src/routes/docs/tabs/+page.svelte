<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import { Tabs, TabsList, TabsTab, TabsPanel } from "$lib/components/tabs"
  import { Button } from "$lib/components/button"
  import { User, Lock, Bell } from "@lucide/svelte"

  const installCode = `import { Tabs, TabsList, TabsTab, TabsPanel } from "$lib/components/tabs"`

  const usageCode = `<script lang="ts">
  import { Tabs, TabsList, TabsTab, TabsPanel } from "$lib/components/tabs"
<\/script>

<Tabs defaultValue="account">
  <TabsList aria-label="Settings">
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="password">Password</TabsTab>
  </TabsList>
  <TabsPanel value="account">Manage your profile.</TabsPanel>
  <TabsPanel value="password">Choose a new password.</TabsPanel>
</Tabs>`

  const pillsCode = `<Tabs defaultValue="day">
  <TabsList variant="pills" aria-label="Range">
    <TabsTab value="day">Day</TabsTab>
    <TabsTab value="week">Week</TabsTab>
    <TabsTab value="month">Month</TabsTab>
  </TabsList>
  <TabsPanel value="day">128 visitors today.</TabsPanel>
  <TabsPanel value="week">1,024 visitors this week.</TabsPanel>
  <TabsPanel value="month">4,892 visitors this month.</TabsPanel>
</Tabs>`

  const verticalCode = `<Tabs defaultValue="general" orientation="vertical">
  <TabsList aria-label="Preferences">
    <TabsTab value="general">General</TabsTab>
    <TabsTab value="security">Security</TabsTab>
  </TabsList>
  <div>
    <TabsPanel value="general">Language, time zone and start page.</TabsPanel>
    <TabsPanel value="security">Passkeys, sessions and recovery codes.</TabsPanel>
  </div>
</Tabs>`

  const controlledCode = `<script lang="ts">
  let value = $state("account")
<\/script>

<Button size="sm" tone="outline" onclick={() => (value = "password")}>Select Password</Button>
<Tabs bind:value>
  <TabsList aria-label="Settings">
    <TabsTab value="account">Account</TabsTab>
    <TabsTab value="password">Password</TabsTab>
  </TabsList>
  <TabsPanel value="account">Account panel.</TabsPanel>
  <TabsPanel value="password">Password panel.</TabsPanel>
</Tabs>`

  let controlled = $state("account")
</script>

<svelte:head>
  <title>Tabs — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Tabs"
  description="Layered sections of content, one shown at a time. Wraps the ui-sdk Tabs with roving focus, arrow-key navigation and automatic or manual activation."
  entry="@ui-sdk/svelte/tabs"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/tabs</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Give each tab and its panel the same unique <code class="font-mono text-accent">value</code>,
      and give the list an accessible name. <code class="font-mono text-accent">defaultValue</code>
      chooses the initial tab; otherwise the first enabled tab is selected.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Choose a tab, or focus one and use the Left and Right arrow keys." code={usageCode}>
      <div class="w-full max-w-sm">
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

    <Demo title="Pills" description="variant='pills' gives a segmented look." code={pillsCode}>
      <div class="w-full max-w-sm">
        <Tabs defaultValue="day">
          <TabsList variant="pills" aria-label="Range">
            <TabsTab value="day">Day</TabsTab>
            <TabsTab value="week">Week</TabsTab>
            <TabsTab value="month">Month</TabsTab>
          </TabsList>
          <TabsPanel value="day">128 visitors today.</TabsPanel>
          <TabsPanel value="week">1,024 visitors this week.</TabsPanel>
          <TabsPanel value="month">4,892 visitors this month.</TabsPanel>
        </Tabs>
      </div>
    </Demo>

    <Demo title="Vertical" description="orientation='vertical' uses Up and Down arrow keys." code={verticalCode}>
      <div class="w-full max-w-md">
        <Tabs defaultValue="general" orientation="vertical">
          <TabsList aria-label="Preferences">
            <TabsTab value="general">General</TabsTab>
            <TabsTab value="security">Security</TabsTab>
          </TabsList>
          <div class="min-w-0 flex-1">
            <TabsPanel value="general">Language, time zone and start page.</TabsPanel>
            <TabsPanel value="security">Passkeys, sessions and recovery codes.</TabsPanel>
          </div>
        </Tabs>
      </div>
    </Demo>

    <Demo title="Controlled" description="bind:value controls the selection from outside." code={controlledCode}>
      <div class="w-full max-w-sm space-y-3">
        <Button size="sm" tone="outline" onclick={() => (controlled = "password")}>Select Password</Button>
        <Tabs bind:value={controlled}>
          <TabsList aria-label="Settings">
            <TabsTab value="account">Account</TabsTab>
            <TabsTab value="password">Password</TabsTab>
          </TabsList>
          <TabsPanel value="account">Account panel.</TabsPanel>
          <TabsPanel value="password">Password panel.</TabsPanel>
        </Tabs>
      </div>
    </Demo>

    <Demo title="With icons" description="Tabs accept icons alongside their label." code={usageCode}>
      <div class="w-full max-w-sm">
        <Tabs defaultValue="account">
          <TabsList variant="pills" aria-label="Settings">
            <TabsTab value="account"><User aria-hidden="true" /> Account</TabsTab>
            <TabsTab value="password"><Lock aria-hidden="true" /> Password</TabsTab>
            <TabsTab value="notifications"><Bell aria-hidden="true" /> Alerts</TabsTab>
          </TabsList>
          <TabsPanel value="account">Manage your profile.</TabsPanel>
          <TabsPanel value="password">Choose a new password.</TabsPanel>
          <TabsPanel value="notifications">Choose what you hear about.</TabsPanel>
        </Tabs>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="TabsList variant"
      rows={[
        { name: "underline", type: "default", description: "Tabs sit on a baseline; the selected tab is underlined with the accent." },
        { name: "pills", type: "string", description: "A tinted track; the selected tab is a raised pill." },
      ]}
    />
    <PropsTable
      caption="Tabs orientation"
      rows={[
        { name: "horizontal", type: "default", description: "Left/Right arrow keys move between tabs." },
        { name: "vertical", type: "string", description: "Up/Down arrow keys move between tabs; list stacks as a column." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes for styling: <code class="font-mono text-accent">data-selected</code>,
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-orientation</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Tabs (root)"
      rows={[
        { name: "value", type: "string | null", description: "Selected tab. Bind with bind:value to control." },
        { name: "defaultValue", type: "string | null", description: "Initial tab when uncontrolled. Defaults to the first enabled tab." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which arrow keys move between tabs." },
        { name: "activation", type: '"automatic" | "manual"', default: '"automatic"', description: "Automatic selects on focus; manual waits for Enter/Space." },
        { name: "loop", type: "boolean", default: "true", description: "Arrow keys wrap from last to first." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when selection wants to change. details.cancel() stops it." },
        { name: "controller", type: "TabsController", description: "Select tabs from anywhere via createTabsController()." },
      ]}
    />
    <PropsTable
      caption="TabsList"
      rows={[
        { name: "variant", type: '"underline" | "pills"', default: '"underline"', description: "Visual style of the list and its tabs." },
        { name: "aria-label", type: "string", description: "Accessible name for the tab list." },
      ]}
    />
    <PropsTable
      caption="TabsTab"
      rows={[
        { name: "value", type: "string", description: "Unique value matching its panel. Required." },
        { name: "disabled", type: "boolean", default: "false", description: "Focusable but not selectable." },
      ]}
    />
    <PropsTable
      caption="TabsPanel"
      rows={[
        { name: "value", type: "string", description: "Matches the tab that shows this panel. Required." },
        { name: "keepMounted", type: "boolean", default: "false", description: "Keep the panel in the page, hidden, while not selected." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Uses the WAI-ARIA tabs pattern: <code class="font-mono text-accent">role="tablist"</code>, <code class="font-mono text-accent">role="tab"</code> with <code class="font-mono text-accent">aria-selected</code>, and <code class="font-mono text-accent">role="tabpanel"</code> linked by <code class="font-mono text-accent">aria-labelledby</code>.</li>
      <li><span class="text-fg">Left/Right</span> (horizontal) or <span class="text-fg">Up/Down</span> (vertical) move focus between tabs; <span class="text-fg">Home/End</span> jump to the first/last.</li>
      <li>With <code class="font-mono text-accent">activation="automatic"</code> the focused tab is selected immediately; with <code class="font-mono text-accent">"manual"</code>, <span class="text-fg">Enter/Space</span> selects.</li>
      <li>Disabled tabs stay focusable so they can be discovered, but cannot be selected.</li>
      <li>Give the list an <code class="font-mono text-accent">aria-label</code>; each tab's text is its accessible name.</li>
    </ul>
  </Section>
</div>