<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    ColorPicker,
    ColorPickerArea,
    ColorPickerAreaCanvas,
    ColorPickerAreaThumb,
    ColorPickerChannelInput,
    ColorPickerEyeDropper,
    ColorPickerInput,
    ColorPickerSlider,
    ColorPickerSliderThumb,
    ColorPickerSwatch,
    ColorPickerSwatches,
    ColorPickerSwatchItem,
    createColorPickerController,
    formatColor,
    parseColor,
    type ColorFormat,
  } from "#lib/components/color-picker"
  import { Button } from "#lib/components/button"
  import { Pipette } from "@lucide/svelte"

  const presets = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#0ea5e9",
    "#6366f1",
    "#a855f7",
    "#ec4899",
  ]

  const formats: { label: string; value: ColorFormat }[] = [
    { label: "Hex", value: "hex" },
    { label: "RGB", value: "srgb" },
    { label: "HSL", value: "hsl" },
    { label: "OKLCH", value: "oklch" },
  ]

  const installCode = `import {
  ColorPicker, ColorPickerArea, ColorPickerAreaThumb,
  ColorPickerSlider, ColorPickerSliderThumb, ColorPickerInput,
} from "#lib/components/color-picker"`

  const usageCode = `<script lang="ts">
  import {
    ColorPicker, ColorPickerArea, ColorPickerAreaThumb,
    ColorPickerSlider, ColorPickerSliderThumb, ColorPickerInput,
  } from "#lib/components/color-picker"
<\/script>

<ColorPicker aria-label="Brand color" defaultValue="#0ea5e9">
  <ColorPickerArea>
    <ColorPickerAreaThumb />
  </ColorPickerArea>
  <ColorPickerSlider channel="hue">
    <ColorPickerSliderThumb />
  </ColorPickerSlider>
  <ColorPickerInput aria-label="Hex" />
</ColorPicker>`

  const basicCode = `<ColorPicker aria-label="Brand color" defaultValue="#0ea5e9">
  <ColorPickerArea>
    <ColorPickerAreaThumb />
  </ColorPickerArea>
  <div class="flex items-center gap-2">
    <ColorPickerEyeDropper aria-label="Pick from screen">
      <Pipette aria-hidden="true" />
    </ColorPickerEyeDropper>
    <div class="flex min-w-0 flex-1 flex-col gap-3">
      <ColorPickerSlider channel="hue">
        <ColorPickerSliderThumb />
      </ColorPickerSlider>
      <ColorPickerSlider channel="alpha">
        <ColorPickerSliderThumb />
      </ColorPickerSlider>
    </div>
    <ColorPickerSwatch />
  </div>
  <ColorPickerInput aria-label="Color" />
  <ColorPickerSwatches aria-label="Presets">
    {#each presets as preset (preset)}
      <ColorPickerSwatchItem value={preset} />
    {/each}
  </ColorPickerSwatches>
</ColorPicker>`

  const controlledCode = `<script lang="ts">
  import { createColorPickerController } from "#lib/components/color-picker"

  const picker = createColorPickerController()
  let value = $state("#0ea5e9")
  let committed = $state("")
<\/script>

<Button size="sm" tone="outline" onclick={() => picker.setValue("#663399")}>Use Purple</Button>
<ColorPicker
  aria-label="Theme color"
  bind:value
  controller={picker}
  onValueCommit={(next, details) => (committed = next + " (" + details.reason + ")")}
>
  <ColorPickerArea>
    <ColorPickerAreaThumb />
  </ColorPickerArea>
  <ColorPickerSlider channel="hue">
    <ColorPickerSliderThumb />
  </ColorPickerSlider>
  <ColorPickerInput aria-label="Hex" />
</ColorPicker>
<p>{value}</p>
<p>{committed}</p>`

  const channelsCode = `<ColorPicker aria-label="Label color" space="srgb" format="hex" defaultValue="#0ea5e9">
  <ColorPickerSwatches aria-label="Presets">
    {#each presets as preset (preset)}
      <ColorPickerSwatchItem value={preset} />
    {/each}
  </ColorPickerSwatches>
  <div class="flex items-center gap-2">
    <ColorPickerChannelInput channel="red" aria-label="Red" />
    <ColorPickerChannelInput channel="green" aria-label="Green" />
    <ColorPickerChannelInput channel="blue" aria-label="Blue" />
    <ColorPickerEyeDropper aria-label="Pick from screen">
      <Pipette aria-hidden="true" />
    </ColorPickerEyeDropper>
  </div>
</ColorPicker>`

  const oklchCode = `<ColorPicker aria-label="Accent" space="oklch" defaultValue="oklch(0.62 0.19 259)">
  <ColorPickerArea>
    <ColorPickerAreaCanvas />
    <ColorPickerAreaThumb />
  </ColorPickerArea>
  <ColorPickerSlider channel="hue">
    <ColorPickerSliderThumb />
  </ColorPickerSlider>
  <ColorPickerSlider channel="alpha">
    <ColorPickerSliderThumb />
  </ColorPickerSlider>
  <div class="flex items-center gap-2">
    <ColorPickerSwatch />
    <ColorPickerInput aria-label="OKLCH" />
  </div>
</ColorPicker>`

  const formatCode = `<script lang="ts">
  import { formatColor, parseColor, type ColorFormat } from "#lib/components/color-picker"

  let format = $state<ColorFormat>("hex")
  let value = $state("#0ea5e9")

  function changeFormat(next: ColorFormat) {
    format = next
    value = formatColor(parseColor(value)!, next)
  }
<\/script>

<ColorPicker bind:value aria-label="Brand color" {format}>
  <ColorPickerArea>
    <ColorPickerAreaThumb />
  </ColorPickerArea>
  <ColorPickerSlider channel="hue">
    <ColorPickerSliderThumb />
  </ColorPickerSlider>
  <div class="flex items-center gap-2">
    <select
      aria-label="Format"
      class="rounded-md border border-line bg-surface px-2 py-1.5 text-sm text-fg"
      value={format}
      onchange={(event) => changeFormat(event.currentTarget.value as ColorFormat)}
    >
      {#each formats as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
    <ColorPickerInput aria-label="Color" />
  </div>
</ColorPicker>`

  const disabledCode = `<ColorPicker aria-label="Brand color" defaultValue="#0ea5e9" disabled>
  <ColorPickerArea>
    <ColorPickerAreaThumb />
  </ColorPickerArea>
  <ColorPickerSlider channel="hue">
    <ColorPickerSliderThumb />
  </ColorPickerSlider>
  <ColorPickerInput aria-label="Hex" />
</ColorPicker>`

  const readOnlyCode = `<ColorPicker aria-label="Theme color" defaultValue="#0ea5e9" readOnly>
  <div class="flex items-center gap-2">
    <ColorPickerSwatch />
    <ColorPickerInput aria-label="Hex" />
  </div>
</ColorPicker>`

  let controlled = $state("#0ea5e9")
  let committed = $state("")
  const picker = createColorPickerController()

  let format = $state<ColorFormat>("hex")
  let formatValue = $state("#0ea5e9")

  function changeFormat(next: ColorFormat) {
    format = next
    formatValue = formatColor(parseColor(formatValue)!, next)
  }
</script>

<svelte:head>
  <title>Color Picker — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Color Picker"
  description="Choose a color by dragging across an area and along sliders, typing any CSS color, or picking a preset. Wraps the ui-sdk Color Picker, whose value is a CSS color string every part edits."
  entry="@ui-sdk/svelte/color-picker"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/color-picker</code>.
      Every part is optional, so use the ones your picker needs.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Name the picker with <code class="font-mono text-accent">aria-label</code>, or put it in a
      Field whose label names it. Without <code class="font-mono text-accent">defaultValue</code>
      it starts at black. The area edits two channels at once; each slider edits one
      <code class="font-mono text-accent">channel</code>.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Drag the area or a slider, pick a preset, or type a color like rebeccapurple and press Enter."
      code={basicCode}
    >
      <ColorPicker aria-label="Brand color" defaultValue="#0ea5e9">
        <ColorPickerArea>
          <ColorPickerAreaThumb />
        </ColorPickerArea>
        <div class="flex items-center gap-2">
          <ColorPickerEyeDropper aria-label="Pick from screen">
            <Pipette aria-hidden="true" />
          </ColorPickerEyeDropper>
          <div class="flex min-w-0 flex-1 flex-col gap-3">
            <ColorPickerSlider channel="hue">
              <ColorPickerSliderThumb />
            </ColorPickerSlider>
            <ColorPickerSlider channel="alpha">
              <ColorPickerSliderThumb />
            </ColorPickerSlider>
          </div>
          <ColorPickerSwatch />
        </div>
        <ColorPickerInput aria-label="Color" />
        <ColorPickerSwatches aria-label="Presets">
          {#each presets as preset (preset)}
            <ColorPickerSwatchItem value={preset} />
          {/each}
        </ColorPickerSwatches>
      </ColorPicker>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:value holds the color, a controller sets it from anywhere, and onValueCommit fires once per interaction."
      code={controlledCode}
    >
      <div class="w-full max-w-sm space-y-3">
        <Button size="sm" tone="outline" onclick={() => picker.setValue("#663399")}>Use Purple</Button>
        <ColorPicker
          aria-label="Theme color"
          bind:value={controlled}
          controller={picker}
          onValueCommit={(next, details) => (committed = `${next} (${details.reason})`)}
        >
          <ColorPickerArea>
            <ColorPickerAreaThumb />
          </ColorPickerArea>
          <ColorPickerSlider channel="hue">
            <ColorPickerSliderThumb />
          </ColorPickerSlider>
          <ColorPickerInput aria-label="Hex" />
        </ColorPicker>
        <p class="font-mono text-xs text-muted">value: {controlled}</p>
        <p class="font-mono text-xs text-faint">committed: {committed || "drag, then let go"}</p>
      </div>
    </Demo>

    <Demo
      title="Presets and channel inputs"
      description="space='srgb' edits red, green and blue as numbers in their own units, 0 to 255."
      code={channelsCode}
    >
      <ColorPicker aria-label="Label color" space="srgb" format="hex" defaultValue="#0ea5e9">
        <ColorPickerSwatches aria-label="Presets">
          {#each presets as preset (preset)}
            <ColorPickerSwatchItem value={preset} />
          {/each}
        </ColorPickerSwatches>
        <div class="flex items-center gap-2">
          <ColorPickerChannelInput channel="red" aria-label="Red" />
          <ColorPickerChannelInput channel="green" aria-label="Green" />
          <ColorPickerChannelInput channel="blue" aria-label="Blue" />
          <ColorPickerEyeDropper aria-label="Pick from screen">
            <Pipette aria-hidden="true" />
          </ColorPickerEyeDropper>
        </div>
      </ColorPicker>
    </Demo>

    <Demo
      title="OKLCH"
      description="The canvas paints chroma by lightness, leaving colors outside the gamut clear. Drag past the edge and let go."
      code={oklchCode}
    >
      <ColorPicker aria-label="Accent" space="oklch" defaultValue="oklch(0.62 0.19 259)">
        <ColorPickerArea>
          <ColorPickerAreaCanvas />
          <ColorPickerAreaThumb />
        </ColorPickerArea>
        <ColorPickerSlider channel="hue">
          <ColorPickerSliderThumb />
        </ColorPickerSlider>
        <ColorPickerSlider channel="alpha">
          <ColorPickerSliderThumb />
        </ColorPickerSlider>
        <div class="flex items-center gap-2">
          <ColorPickerSwatch />
          <ColorPickerInput aria-label="OKLCH" />
        </div>
      </ColorPicker>
    </Demo>

    <Demo
      title="Formats"
      description="format writes the value another way in any space. Switching reformats the same color."
      code={formatCode}
    >
      <ColorPicker bind:value={formatValue} aria-label="Brand color" {format}>
        <ColorPickerArea>
          <ColorPickerAreaThumb />
        </ColorPickerArea>
        <ColorPickerSlider channel="hue">
          <ColorPickerSliderThumb />
        </ColorPickerSlider>
        <div class="flex items-center gap-2">
          <select
            aria-label="Format"
            class="rounded-md border border-line bg-surface px-2 py-1.5 text-sm text-fg"
            value={format}
            onchange={(event) => changeFormat(event.currentTarget.value as ColorFormat)}
          >
            {#each formats as option (option.value)}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
          <ColorPickerInput aria-label="Color" />
        </div>
      </ColorPicker>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      A picker has no visual variants of its own; its states and its color space are what change.
      A disabled picker can't be focused or changed and submits nothing. A read-only one stays
      focusable and submitted, but drags, keys and typing leave the color alone.
    </p>

    <Demo title="Disabled" description="Every part is inert and the value isn't submitted." code={disabledCode}>
      <ColorPicker aria-label="Brand color" defaultValue="#0ea5e9" disabled>
        <ColorPickerArea>
          <ColorPickerAreaThumb />
        </ColorPickerArea>
        <ColorPickerSlider channel="hue">
          <ColorPickerSliderThumb />
        </ColorPickerSlider>
        <ColorPickerInput aria-label="Hex" />
      </ColorPicker>
    </Demo>

    <Demo title="Read only" description="Focusable and submitted, but the color can't change." code={readOnlyCode}>
      <ColorPicker aria-label="Theme color" defaultValue="#0ea5e9" readOnly>
        <div class="flex items-center gap-2">
          <ColorPickerSwatch />
          <ColorPickerInput aria-label="Hex" />
        </div>
      </ColorPicker>
    </Demo>

    <PropsTable
      caption="space — which channels the parts edit"
      rows={[
        { name: "hsv", type: "default", description: "Area: saturation across, brightness up. Slider: hue. Value written as hex." },
        { name: "hsl", type: "string", description: "Area: saturation across, lightness up. Slider: hue. Value written as hsl()." },
        { name: "srgb", type: "string", description: "Area: red across, green up. Slider: blue. Value written as rgb()." },
        { name: "oklch", type: "string", description: "Area: chroma across, lightness up. Slider: hue. Needs ColorPickerAreaCanvas; value written as oklch()." },
      ]}
    />
    <PropsTable
      caption="State attributes for styling"
      rows={[
        { name: "data-disabled", type: "attribute", description: "The picker is disabled, by its own prop or a fieldset." },
        { name: "data-readonly", type: "attribute", description: "The color shows but can't change." },
        { name: "data-required", type: "attribute", description: "Marked required. A picker always has a value, so it never blocks a form." },
        { name: "data-out-of-gamut", type: "attribute", description: "A drag or key holds a color outside the gamut; the value is the closest one inside." },
        { name: "data-selected", type: "attribute", description: "On a swatch item whose color is the value, however either is written." },
        { name: "data-unsupported", type: "attribute", description: "On the eye dropper, when the browser can't pick from the screen." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="ColorPicker (root)"
      rows={[
        { name: "value", type: "string", description: "The value as a CSS color, like \"#0ea5e9\". Bind with bind:value to control." },
        { name: "defaultValue", type: "string", default: '"#000000"', description: "The value at first, when uncontrolled. A form reset returns to it." },
        { name: "space", type: '"hsv" | "hsl" | "srgb" | "oklch"', default: '"hsv"', description: "The space the parts edit in, which decides their channels." },
        { name: "format", type: '"hex" | ColorPickerSpace', description: "How the value is written. Defaults to hex for hsv, and the space otherwise." },
        { name: "gamut", type: '"srgb" | "p3" | false', default: '"srgb"', description: "The colors the value can hold. false allows any color." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables every part: no focus, no changes, nothing submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Parts stay focusable and the value submits, but nothing changes it." },
        { name: "required", type: "boolean", default: "false", description: "Adds data-required. Never blocks a form." },
        { name: "name", type: "string", description: "The name the hidden input submits the value under. Without one, nothing submits." },
        { name: "form", type: "string", description: "The id of a form to belong to, when it isn't inside that form." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs on every step of a drag or key. details.color is the color; details.cancel() stops it." },
        { name: "onValueCommit", type: "(value, details) => void", description: "Runs once an interaction ends. For saving." },
        { name: "controller", type: "ColorPickerController", description: "getValue(), setValue(color, options?) and focus() from anywhere." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="ColorPickerArea / ColorPickerAreaThumb / ColorPickerAreaCanvas"
      rows={[
        { name: "x", type: "ColorChannel", description: "The channel across, left to right. Defaults to saturation, red or chroma, by space." },
        { name: "y", type: "ColorChannel", description: "The channel up, bottom to top. Defaults to brightness, lightness or green, by space." },
        { name: "class", type: "string", description: "Extra classes. The area is 10rem tall; the canvas fills it and paints the gamut." },
      ]}
    />
    <PropsTable
      caption="ColorPickerSlider / ColorPickerSliderThumb"
      rows={[
        { name: "channel", type: "ColorChannel", description: "The channel it edits: hue, saturation, brightness, lightness, chroma, red, green, blue or alpha." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "The slider's axis. Vertical sliders grow upward." },
      ]}
    />
    <PropsTable
      caption="ColorPickerInput / ColorPickerChannelInput"
      rows={[
        { name: "channel", type: "ColorChannel", description: "ChannelInput only: the channel it edits as a number, in the units people read it in." },
        { name: "aria-label", type: "string", description: "Accessible name. Both are named in English by default." },
        { name: "class", type: "string", description: "Extra classes merged onto the input." },
      ]}
    />
    <PropsTable
      caption="ColorPickerSwatch / ColorPickerSwatches / ColorPickerSwatchItem / ColorPickerEyeDropper"
      rows={[
        { name: "value", type: "string", description: "SwatchItem only, required: the color it picks, as any CSS color." },
        { name: "aria-label", type: "string", description: "Swatches names the preset list; the eye dropper names its button." },
        { name: "children", type: "Snippet<[state]>", description: "Receives the part's state: color, space, disabled, readOnly, required, outOfGamut. A preset adds selected; a slider adds channel, channelValue and orientation." },
        { name: "render", type: "Snippet", description: "Renders your own element with the part's props and state." },
      ]}
    />
    <PropsTable
      caption="Re-exports"
      rows={[
        { name: "createColorPickerController", type: "() => ColorPickerController", description: "Sets the color from anywhere. setValue returns false for text that isn't a color, or a canceled change." },
        { name: "parseColor / formatColor", type: "from @ui-sdk/svelte/color", description: "Read a CSS color into a Color, and write it back in another format." },
        { name: "ColorPickerValueChangeReason", type: "type", description: "track-press, drag, step-key, input-commit, item-press, eye-dropper-pick, reset, restore, imperative." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>No WAI-ARIA pattern covers a color picker, so it's built from ones that do: the picker is a <code class="font-mono text-accent">group</code>, the area's thumb and each slider's thumb follow the slider pattern, and the presets follow the listbox pattern.</li>
      <li>The area's thumb names both of its channels, like "Saturation and brightness", and each preset and the swatch are named by their color, like "vivid blue". Pass <code class="font-mono text-accent">aria-label</code> to name them in another language.</li>
      <li><span class="text-fg">Arrow keys</span> move a thumb one step; on the area, Left/Right move across and Up/Down move up. <span class="text-fg">Shift</span> with an arrow moves ten steps.</li>
      <li><span class="text-fg">Page Up/Page Down</span> move a tenth of the range; <span class="text-fg">Home/End</span> move to the start or end.</li>
      <li><span class="text-fg">Enter</span> reads the text in the input or picks the focused preset; <span class="text-fg">Escape</span> puts the input's text back to the value.</li>
      <li>The presets are one tab stop, and the arrow keys move between them. Each key press commits, like the end of a drag.</li>
      <li>Give the picker an <code class="font-mono text-accent">aria-label</code>, or a Field label, and name the inputs and the eye dropper.</li>
    </ul>
  </Section>
</div>