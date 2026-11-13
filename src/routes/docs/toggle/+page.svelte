<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    Toggle,
    ToggleIcon,
    ToggleGroup,
    createToggleController,
    createToggleGroupController,
  } from "$lib/components/toggle"
  import { Button } from "$lib/components/button"
  import {
    Star,
    Bold,
    Italic,
    Underline,
    TextAlignStart,
    TextAlignCenter,
    TextAlignEnd,
    Pin,
    Heart,
  } from "@lucide/svelte"

  const installCode = `import { Toggle, ToggleIcon, ToggleGroup } from "$lib/components/toggle"`

  const usageCode = `<script lang="ts">
  import { Star } from "@lucide/svelte"
  import { Toggle, ToggleIcon } from "$lib/components/toggle"
<\/script>

<Toggle size="icon" aria-label="Star">
  <ToggleIcon><Star /></ToggleIcon>
</Toggle>`

  const labelCode = `<script lang="ts">
  import { Pin } from "@lucide/svelte"
  import { Toggle, ToggleIcon } from "$lib/components/toggle"
<\/script>

<Toggle defaultPressed>
  <ToggleIcon><Pin /></ToggleIcon>
  Pin
</Toggle>`

  const controlledCode = `<script lang="ts">
  import { Star } from "@lucide/svelte"
  import { Toggle, ToggleIcon, createToggleController } from "$lib/components/toggle"
  import { Button } from "$lib/components/button"

  let starred = $state(false)
  const star = createToggleController()
<\/script>

<div class="flex items-center gap-3">
  <Toggle size="icon" aria-label="Star" bind:pressed={starred} controller={star}>
    <ToggleIcon><Star fill={starred ? "currentColor" : "none"} /></ToggleIcon>
  </Toggle>
  <Button size="sm" tone="outline" onclick={() => star.toggle()}>Toggle star</Button>
  <span class="text-sm text-muted">{starred ? "Starred" : "Not starred"}</span>
</div>`

  const groupCode = `<script lang="ts">
  import { Bold, Italic, Underline } from "@lucide/svelte"
  import { Toggle, ToggleGroup, ToggleIcon, createToggleGroupController } from "$lib/components/toggle"
  import { Button } from "$lib/components/button"

  let formats = $state(["bold"])
  const editor = createToggleGroupController()
<\/script>

<div class="flex flex-col gap-3">
  <ToggleGroup multiple aria-label="Text formatting" bind:value={formats} controller={editor}>
    <Toggle value="bold" tone="ghost" size="icon" aria-label="Bold">
      <ToggleIcon><Bold /></ToggleIcon>
    </Toggle>
    <Toggle value="italic" tone="ghost" size="icon" aria-label="Italic">
      <ToggleIcon><Italic /></ToggleIcon>
    </Toggle>
    <Toggle value="underline" tone="ghost" size="icon" aria-label="Underline">
      <ToggleIcon><Underline /></ToggleIcon>
    </Toggle>
  </ToggleGroup>
  <div class="flex items-center gap-3">
    <Button size="sm" tone="outline" onclick={() => editor.setValue([])}>Clear formatting</Button>
    <span class="text-sm text-muted">{formats.join(", ") || "none"}</span>
  </div>
</div>`

  const singleCode = `<script lang="ts">
  import { TextAlignStart, TextAlignCenter, TextAlignEnd } from "@lucide/svelte"
  import { Toggle, ToggleGroup, ToggleIcon } from "$lib/components/toggle"

  const alignments = [
    { value: "start", label: "Align start", icon: TextAlignStart, mirror: true },
    { value: "center", label: "Align center", icon: TextAlignCenter, mirror: false },
    { value: "end", label: "Align end", icon: TextAlignEnd, mirror: true },
  ]
<\/script>

<ToggleGroup defaultValue={["start"]} deselectable={false} aria-label="Text alignment">
  {#each alignments as item (item.value)}
    <Toggle value={item.value} tone="ghost" size="icon" aria-label={item.label}>
      <ToggleIcon mirror={item.mirror}><item.icon /></ToggleIcon>
    </Toggle>
  {/each}
</ToggleGroup>`

  const variantsCode = `<script lang="ts">
  import { Pin } from "@lucide/svelte"
  import { Toggle, ToggleIcon } from "$lib/components/toggle"

  const tones = ["solid", "outline", "ghost"] as const
<\/script>

<div class="flex flex-col gap-3">
  {#each tones as tone (tone)}
    <div class="flex flex-wrap items-center gap-2">
      <span class="w-14 text-xs text-muted">{tone}</span>
      <Toggle {tone} size="sm" defaultPressed>Small</Toggle>
      <Toggle {tone} size="md">Medium</Toggle>
      <Toggle {tone} size="lg">Large</Toggle>
      <Toggle {tone} size="icon" aria-label="Pin">
        <ToggleIcon><Pin /></ToggleIcon>
      </Toggle>
    </div>
  {/each}
</div>`

  const disabledCode = `<script lang="ts">
  import { Bold, Italic, Underline, Pin } from "@lucide/svelte"
  import { Toggle, ToggleGroup, ToggleIcon } from "$lib/components/toggle"
<\/script>

<div class="flex flex-col gap-4">
  <ToggleGroup multiple disabled defaultValue={["bold"]} aria-label="Text formatting">
    <Toggle value="bold" tone="ghost" size="icon" aria-label="Bold">
      <ToggleIcon><Bold /></ToggleIcon>
    </Toggle>
    <Toggle value="italic" tone="ghost" size="icon" aria-label="Italic">
      <ToggleIcon><Italic /></ToggleIcon>
    </Toggle>
    <Toggle value="underline" tone="ghost" size="icon" aria-label="Underline">
      <ToggleIcon><Underline /></ToggleIcon>
    </Toggle>
  </ToggleGroup>
  <div class="flex flex-col gap-1.5">
    <Toggle disabled focusableWhenDisabled aria-describedby="pin-hint">
      <ToggleIcon><Pin /></ToggleIcon>
      Pin
    </Toggle>
    <p id="pin-hint" class="text-sm text-muted">Only owners can pin messages.</p>
  </div>
</div>`

  const verticalCode = `<ToggleGroup orientation="vertical" defaultValue={["layers"]} aria-label="Panel">
  <Toggle value="layers" tone="ghost">Layers</Toggle>
  <Toggle value="history" tone="ghost">History</Toggle>
  <Toggle value="comments" tone="ghost">Comments</Toggle>
</ToggleGroup>`

  const renderCode = `<script lang="ts">
  import { Heart } from "@lucide/svelte"
  import { Toggle, ToggleIcon } from "$lib/components/toggle"
<\/script>

<Toggle tone="ghost" size="icon" aria-label="Favorite">
  {#snippet render({ props, state })}
    <button {...props}>
      <ToggleIcon><Heart fill={state.pressed ? "currentColor" : "none"} /></ToggleIcon>
    </button>
  {/snippet}
</Toggle>`

  const alignments = [
    { value: "start", label: "Align start", icon: TextAlignStart, mirror: true },
    { value: "center", label: "Align center", icon: TextAlignCenter, mirror: false },
    { value: "end", label: "Align end", icon: TextAlignEnd, mirror: true },
  ]

  const tones = ["solid", "outline", "ghost"] as const

  let starred = $state(false)
  let formats = $state(["bold"])
  const star = createToggleController()
  const editor = createToggleGroupController()
</script>

<svelte:head>
  <title>Toggle — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Toggle"
  description="A button that stays pressed, alone or in a group with arrow-key navigation. Wraps the ui-sdk Toggle, a native button that reports its state with aria-pressed and never submits a form."
  entry="@ui-sdk/svelte/toggle"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Toggle is part of Negentropy UI and wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/toggle</code>. Import the parts from the library:
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      The behavior comes from <code class="font-mono text-accent">@ui-sdk/core</code>, installed alongside
      <code class="font-mono text-accent">@ui-sdk/svelte</code>.
      <code class="font-mono text-accent">createToggleController</code> and
      <code class="font-mono text-accent">createToggleGroupController</code> are re-exported for pressing
      toggles from anywhere, such as a keyboard shortcut.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      A toggle is a button that stays on until you press it again. Keep its label the same in both states —
      screen readers announce whether it's pressed — and give an icon-only toggle an
      <code class="font-mono text-accent">aria-label</code>.
      <code class="font-mono text-accent">ToggleIcon</code> is optional: it holds an icon and hides it from
      screen readers. Set <code class="font-mono text-accent">defaultPressed</code> to start pressed.
    </p>
    <CodeBlock code={usageCode} />
    <p class="text-sm text-muted">
      Put several toggles in a <code class="font-mono text-accent">ToggleGroup</code> to share one value and
      arrow-key navigation. Give the group an accessible name and each toggle a
      <code class="font-mono text-accent">value</code>; the group's value is always an array of the pressed
      values, in document order. Inside a group the group owns the state, so a toggle's own
      <code class="font-mono text-accent">pressed</code> and
      <code class="font-mono text-accent">defaultPressed</code> don't apply.
    </p>
    <CodeBlock code={groupCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Press the star, or focus it and press Enter or Space. It stays pressed until you press it again." code={usageCode}>
      <Toggle size="icon" aria-label="Star">
        <ToggleIcon><Star /></ToggleIcon>
      </Toggle>
    </Demo>

    <Demo title="Icon and label" description="The icon is hidden from screen readers, so the text alone names the button." code={labelCode}>
      <Toggle defaultPressed>
        <ToggleIcon><Pin /></ToggleIcon>
        Pin
      </Toggle>
    </Demo>

    <Demo title="Controlled" description="bind:pressed owns the state, and a controller presses the toggle from a button elsewhere." code={controlledCode}>
      <div class="flex flex-wrap items-center gap-3">
        <Toggle size="icon" aria-label="Star" bind:pressed={starred} controller={star}>
          <ToggleIcon><Star fill={starred ? "currentColor" : "none"} /></ToggleIcon>
        </Toggle>
        <Button size="sm" tone="outline" onclick={() => star.toggle()}>Toggle star</Button>
        <span class="text-sm text-muted">{starred ? "Starred" : "Not starred"}</span>
      </div>
    </Demo>

    <Demo title="Group, several pressed" description="multiple keeps every pressed toggle in the value. Arrow keys move focus without pressing anything." code={groupCode}>
      <div class="flex w-full max-w-sm flex-col gap-3">
        <ToggleGroup multiple aria-label="Text formatting" bind:value={formats} controller={editor}>
          <Toggle value="bold" tone="ghost" size="icon" aria-label="Bold">
            <ToggleIcon><Bold /></ToggleIcon>
          </Toggle>
          <Toggle value="italic" tone="ghost" size="icon" aria-label="Italic">
            <ToggleIcon><Italic /></ToggleIcon>
          </Toggle>
          <Toggle value="underline" tone="ghost" size="icon" aria-label="Underline">
            <ToggleIcon><Underline /></ToggleIcon>
          </Toggle>
        </ToggleGroup>
        <div class="flex flex-wrap items-center gap-3">
          <Button size="sm" tone="outline" onclick={() => editor.setValue([])}>Clear formatting</Button>
          <span class="text-sm text-muted">{formats.join(", ") || "none"}</span>
        </div>
      </div>
    </Demo>

    <Demo title="Single selection" description="Without multiple, pressing one toggle unpresses the others. deselectable={false} keeps one pressed; mirror flips the directional icons in RTL." code={singleCode}>
      <ToggleGroup defaultValue={["start"]} deselectable={false} aria-label="Text alignment">
        {#each alignments as item (item.value)}
          <Toggle value={item.value} tone="ghost" size="icon" aria-label={item.label}>
            <ToggleIcon mirror={item.mirror}><item.icon /></ToggleIcon>
          </Toggle>
        {/each}
      </ToggleGroup>
    </Demo>

    <Demo title="Tones and sizes" description="tone sets the pressed treatment; size sets height, padding and icon size. size='icon' is square, for icon-only toggles." code={variantsCode}>
      <div class="flex flex-col gap-3">
        {#each tones as tone (tone)}
          <div class="flex flex-wrap items-center gap-2">
            <span class="w-14 text-xs text-muted">{tone}</span>
            <Toggle {tone} size="sm" defaultPressed>Small</Toggle>
            <Toggle {tone} size="md">Medium</Toggle>
            <Toggle {tone} size="lg">Large</Toggle>
            <Toggle {tone} size="icon" aria-label="Pin">
              <ToggleIcon><Pin /></ToggleIcon>
            </Toggle>
          </div>
        {/each}
      </div>
    </Demo>

    <Demo title="Disabled" description="A disabled group keeps its tab stop and reports aria-disabled. focusableWhenDisabled keeps a lone toggle focusable so its hint can be read." code={disabledCode}>
      <div class="flex flex-col gap-4">
        <ToggleGroup multiple disabled defaultValue={["bold"]} aria-label="Text formatting">
          <Toggle value="bold" tone="ghost" size="icon" aria-label="Bold">
            <ToggleIcon><Bold /></ToggleIcon>
          </Toggle>
          <Toggle value="italic" tone="ghost" size="icon" aria-label="Italic">
            <ToggleIcon><Italic /></ToggleIcon>
          </Toggle>
          <Toggle value="underline" tone="ghost" size="icon" aria-label="Underline">
            <ToggleIcon><Underline /></ToggleIcon>
          </Toggle>
        </ToggleGroup>
        <div class="flex flex-col gap-1.5">
          <Toggle disabled focusableWhenDisabled aria-describedby="pin-hint">
            <ToggleIcon><Pin /></ToggleIcon>
            Pin
          </Toggle>
          <p id="pin-hint" class="text-sm text-muted">Only owners can pin messages.</p>
        </div>
      </div>
    </Demo>

    <Demo title="Vertical" description="orientation='vertical' stacks the group and moves focus with Up and Down instead of Left and Right." code={verticalCode}>
      <ToggleGroup orientation="vertical" defaultValue={["layers"]} aria-label="Panel">
        <Toggle value="layers" tone="ghost">Layers</Toggle>
        <Toggle value="history" tone="ghost">History</Toggle>
        <Toggle value="comments" tone="ghost">Comments</Toggle>
      </ToggleGroup>
    </Demo>

    <Demo title="Custom rendering" description="The render snippet receives the props to spread and the state, so the icon can fill from pressed." code={renderCode}>
      <Toggle tone="ghost" size="icon" aria-label="Favorite">
        {#snippet render({ props, state })}
          <button {...props}>
            <ToggleIcon><Heart fill={state.pressed ? "currentColor" : "none"} /></ToggleIcon>
          </button>
        {/snippet}
      </Toggle>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      Combine <code class="font-mono text-accent">tone</code> and
      <code class="font-mono text-accent">size</code> on a toggle. A group takes
      <code class="font-mono text-accent">variant</code>: <code class="font-mono text-accent">pills</code>
      wraps it in a tinted tray, <code class="font-mono text-accent">plain</code> leaves it bare. Ghost
      toggles inside a pills tray read as a toolbar.
    </p>
    <PropsTable
      caption="tone"
      rows={[
        { name: "solid", type: "string", default: "bg-elevated", description: "Filled neutral; pressed becomes the solid accent." },
        { name: "outline", type: "default", default: "border-line-strong", description: "Bordered; pressed tints the fill and border with the accent." },
        { name: "ghost", type: "string", default: "text-muted", description: "No fill or border; pressed tints the fill and text. Best inside a group." },
      ]}
    />
    <PropsTable
      caption="size"
      rows={[
        { name: "sm", type: "string", default: "h-8 px-3", description: "Compact, for dense toolbars." },
        { name: "md", type: "default", default: "h-9 px-4", description: "Default." },
        { name: "lg", type: "string", default: "h-11 px-6", description: "Prominent, for touch targets." },
        { name: "icon", type: "string", default: "h-9 w-9", description: "Square, for an icon-only toggle. Needs an aria-label." },
      ]}
    />
    <PropsTable
      caption="ToggleGroup variant"
      rows={[
        { name: "pills", type: "default", default: "rounded-lg bg-elevated p-1", description: "A tinted tray around the toggles." },
        { name: "plain", type: "string", default: "—", description: "No tray; the toggles carry their own treatment." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-pressed", type: "attribute", description: "On the toggle while pressed. Every tone styles from it." },
        { name: "data-disabled", type: "attribute", description: "On a toggle disabled by its own prop or its group, and on a disabled group." },
        { name: "data-orientation", type: "attribute", description: "horizontal or vertical, on the group and on each of its toggles. The wrapper stacks a vertical group." },
        { name: "data-has-icon", type: "attribute", description: "On a toggle that holds a ToggleIcon." },
        { name: "data-has-icons", type: "attribute", description: "On a group while any toggle inside holds an icon, so toggles without one can line up." },
        { name: "data-mirror", type: "attribute", description: "ToggleIcon only, with mirror. The wrapper flips it horizontally in RTL." },
        { name: "data-slot", type: "attribute", description: "toggle, toggle-icon or toggle-group, for targeting a part from CSS." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Every part forwards native HTML attributes plus its <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets, which receive the part's state. A toggle
      always renders <code class="font-mono text-accent">type="button"</code>, so pressing it never submits a
      form, and toggles submit no value — use Checkbox or Radio for form choices.
    </p>
    <PropsTable
      caption="Toggle — Negentropy props"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"outline"', description: "Fill, border and pressed treatment." },
        { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height, padding and icon size. icon is square." },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
      ]}
    />
    <PropsTable
      caption="Toggle — ui-sdk options"
      rows={[
        { name: "pressed", type: "boolean", description: "Whether it's pressed. Bind with bind:pressed to control. Inside a group the group's value decides." },
        { name: "defaultPressed", type: "boolean", default: "false", description: "Whether it starts pressed, when uncontrolled." },
        { name: "onPressedChange", type: "(pressed, details) => void", description: "Runs when a press wants to change the state. details.reason is 'press' or 'imperative'; details.cancel() stops it. In a group it runs first and can cancel the group's change." },
        { name: "value", type: "string", description: "Identifies the toggle inside a group. Defaults to a generated id." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops presses. Alone the button is natively disabled; in a group it stays focusable with aria-disabled." },
        { name: "focusableWhenDisabled", type: "boolean", default: "false", description: "Keeps a disabled toggle in the tab order with aria-disabled instead of the native attribute." },
        { name: "controller", type: "ToggleController", description: "Press it from anywhere via createToggleController(). One controller per mounted toggle." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="ToggleIcon"
      rows={[
        { name: "mirror", type: "boolean", default: "false", description: "Flip the icon horizontally in right-to-left text, for icons that point a way. Icons that picture a thing stay as they are." },
        { name: "class", type: "string", description: "Extra classes merged onto the span." },
      ]}
    />
    <PropsTable
      caption="ToggleGroup — Negentropy props"
      rows={[
        { name: "variant", type: '"pills" | "plain"', default: '"pills"', description: "Whether the group draws a tinted tray around its toggles." },
        { name: "class", type: "string", description: "Extra classes merged onto the group element (user wins)." },
      ]}
    />
    <PropsTable
      caption="ToggleGroup — ui-sdk options"
      rows={[
        { name: "value", type: "string[]", description: "The pressed toggles' values, in document order. Bind with bind:value to control." },
        { name: "defaultValue", type: "string[]", default: "[]", description: "The toggles pressed at first, when uncontrolled." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when a toggle wants to be pressed or unpressed. details.reason is 'item-press' or 'imperative'; details.cancel() stops it. Never runs on mount." },
        { name: "multiple", type: "boolean", default: "false", description: "Let several toggles stay pressed. Otherwise pressing one unpresses the others." },
        { name: "deselectable", type: "boolean", default: "true", description: "Whether the pressed toggle can be unpressed when only one may be pressed. false keeps one pressed; pair it with defaultValue. Ignored with multiple." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops every toggle from being pressed. They stay focusable with aria-disabled, so the group keeps its tab stop." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which arrow keys move between toggles." },
        { name: "loop", type: "boolean", default: "true", description: "Arrow keys wrap from the last toggle to the first." },
        { name: "controller", type: "ToggleGroupController", description: "Change the value from anywhere via createToggleGroupController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "pressed", type: "boolean", description: "Toggle: whether it's pressed. Inside a group it follows the group's value." },
        { name: "disabled", type: "boolean", description: "Toggle and group: disabled by itself, its group or a fieldset around it." },
        { name: "value", type: "string[]", description: "ToggleGroup only: the pressed toggles' values." },
        { name: "multiple", type: "boolean", description: "ToggleGroup only: whether several toggles can be pressed at once." },
        { name: "orientation", type: '"horizontal" | "vertical"', description: "ToggleGroup only: the orientation option, or horizontal when unset." },
        { name: "mirror", type: "boolean", description: "ToggleIcon only: whether it flips in right-to-left text." },
      ]}
    />
    <PropsTable
      caption="Controllers"
      rows={[
        { name: "isPressed()", type: "() => boolean", description: "Toggle: whether it's pressed. Group: isPressed(value) asks about one toggle." },
        { name: "setPressed(pressed, options?)", type: "(boolean, options?) => boolean", description: "Toggle: press or unpress as a user would. Returns false when canceled; a disabled toggle ignores it." },
        { name: "toggle(options?)", type: "(options?) => boolean", description: "Toggle: flip the state. Group: toggle(value, options?) flips one toggle." },
        { name: "getValue() / setValue(value, options?)", type: "() => string[] / (string[], options?) => boolean", description: "Group: read the pressed values, or set them. Only the first counts unless multiple. setValue([]) clears." },
        { name: "focus(value?)", type: "(value?) => void", description: "Move focus to the toggle, or to a given one. Group without a value focuses the toggle holding its tab stop." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the toggle button in the WAI-ARIA button pattern: a native button with <code class="font-mono text-accent">aria-pressed</code>. Its accessible name stays the same in both states.</li>
      <li>A group follows the keyboard of the WAI-ARIA toolbar pattern but carries <code class="font-mono text-accent">role="group"</code> — not <code class="font-mono text-accent">toolbar</code>, so it can sit inside a Toolbar, and not <code class="font-mono text-accent">radiogroup</code>, since its toggles are buttons.</li>
      <li><span class="text-fg">Enter</span> and <span class="text-fg">Space</span> press or unpress the focused toggle.</li>
      <li>A group is one tab stop. <span class="text-fg">Tab</span> first enters on its first enabled pressed toggle, or its first enabled one, and later returns to the last focused toggle. The group itself is never a tab stop.</li>
      <li><span class="text-fg">Left</span> and <span class="text-fg">Right</span> move focus in a horizontal group, swapped in right-to-left pages; <span class="text-fg">Up</span> and <span class="text-fg">Down</span> move focus in a vertical one. Moving focus never presses anything.</li>
      <li><span class="text-fg">Home</span> and <span class="text-fg">End</span> move focus to the first or last toggle. Focus wraps at both ends unless <code class="font-mono text-accent">loop={false}</code>.</li>
      <li>Name the group with <code class="font-mono text-accent">aria-label</code> or <code class="font-mono text-accent">aria-labelledby</code>, and give every icon-only toggle an <code class="font-mono text-accent">aria-label</code>. <code class="font-mono text-accent">ToggleIcon</code> is hidden from screen readers.</li>
      <li>A disabled toggle on its own leaves the tab order unless <code class="font-mono text-accent">focusableWhenDisabled</code> is set; in a group, disabled toggles stay reachable with arrow keys and report <code class="font-mono text-accent">aria-disabled</code>. Explain why with <code class="font-mono text-accent">aria-describedby</code>.</li>
      <li>Use Radio instead when arrow keys should select an option as they move: a toggle group moves focus first and waits for a press.</li>
    </ul>
  </Section>
</div>