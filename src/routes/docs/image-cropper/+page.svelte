<script lang="ts">
  import { onDestroy } from "svelte"
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import {
    ImageCropper,
    ImageCropperFlip,
    ImageCropperGrid,
    ImageCropperHandle,
    ImageCropperImage,
    ImageCropperRotate,
    ImageCropperSelection,
    ImageCropperViewport,
    ImageCropperZoom,
    createImageCropperController,
    cropImage,
    type ImageCrop,
  } from "$lib/components/image-cropper"
  import { Button } from "$lib/components/button"
  import { FlipHorizontal, FlipVertical, RotateCw } from "@lucide/svelte"

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420"><rect width="640" height="420" fill="#e5e5e5"/><circle cx="460" cy="150" r="56" fill="#fafafa"/><path d="M0 280 120 170l110 100 120-130 130 125 90-60 70 40v175H0z" fill="#a3a3a3"/><path d="M0 330l160-80 120 70 150-80 210 85v95H0z" fill="#525252"/><path d="M0 380q160-35 320-10t320-5v55H0z" fill="#262626"/></svg>`
  const photo = `data:image/svg+xml,${encodeURIComponent(svg)}`

  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const

  const ratios = [
    { label: "Free", value: undefined },
    { label: "Square", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 },
  ]

  const installCode = `import {
  ImageCropper, ImageCropperViewport, ImageCropperImage,
  ImageCropperSelection, ImageCropperHandle,
} from "$lib/components/image-cropper"`

  const usageCode = `<script lang="ts">
  import {
    ImageCropper, ImageCropperViewport, ImageCropperImage,
    ImageCropperSelection, ImageCropperHandle,
  } from "$lib/components/image-cropper"

  const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420"><rect width="640" height="420" fill="#e5e5e5"/><circle cx="460" cy="150" r="56" fill="#fafafa"/><path d="M0 280 120 170l110 100 120-130 130 125 90-60 70 40v175H0z" fill="#a3a3a3"/><path d="M0 330l160-80 120 70 150-80 210 85v95H0z" fill="#525252"/><path d="M0 380q160-35 320-10t320-5v55H0z" fill="#262626"/></svg>\`
  const photo = \`data:image/svg+xml,\${encodeURIComponent(svg)}\`
<\/script>

<ImageCropper aria-label="Cover photo" src={photo} aspectRatio={3}>
  <ImageCropperViewport>
    <ImageCropperImage alt="Mountains at sunset" />
    <ImageCropperSelection>
      <ImageCropperHandle position="nw" />
      <ImageCropperHandle position="se" />
    </ImageCropperSelection>
  </ImageCropperViewport>
</ImageCropper>`

  const basicCode = `<script lang="ts">
  import { cropImage, type ImageCrop } from "$lib/components/image-cropper"

  const photo = \`data:image/svg+xml,\${encodeURIComponent(svg)}\`
  const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const

  let crop = $state<ImageCrop>()
  let result = $state<string>()

  async function save() {
    if (!crop) return
    const file = await cropImage(photo, crop)
    if (result) URL.revokeObjectURL(result)
    result = URL.createObjectURL(file)
  }
<\/script>

<Button size="sm" onclick={save}>Crop</Button>
<ImageCropper bind:crop aria-label="Photo" src={photo} minWidth={64} minHeight={64}>
  <ImageCropperViewport>
    <ImageCropperImage alt="Mountains at sunset" />
    <ImageCropperSelection>
      <ImageCropperGrid />
      {#each handles as position (position)}
        <ImageCropperHandle {position} />
      {/each}
    </ImageCropperSelection>
  </ImageCropperViewport>
</ImageCropper>
{#if result}<img src={result} alt="Your crop" class="max-h-28 rounded-md" />{/if}`

  const ratioCode = `<script lang="ts">
  const ratios = [
    { label: "Free", value: undefined },
    { label: "Square", value: 1 },
    { label: "16:9", value: 16 / 9 },
  ]
  let aspectRatio = $state<number>()
<\/script>

{#each ratios as ratio (ratio.label)}
  <Button size="sm" tone="outline" aria-pressed={aspectRatio === ratio.value} onclick={() => (aspectRatio = ratio.value)}>
    {ratio.label}
  </Button>
{/each}
<ImageCropper aria-label="Photo" src={photo} {aspectRatio} minWidth={64} minHeight={64}>
  <ImageCropperViewport>
    <ImageCropperImage alt="Mountains at sunset" />
    <ImageCropperSelection>
      <ImageCropperGrid />
      {#each handles as position (position)}
        <ImageCropperHandle {position} />
      {/each}
    </ImageCropperSelection>
  </ImageCropperViewport>
  <div class="flex gap-2">
    <ImageCropperFlip>Flip</ImageCropperFlip>
    <ImageCropperFlip direction="vertical">Flip Vertically</ImageCropperFlip>
  </div>
</ImageCropper>`

  const avatarCode = `<script lang="ts">
  import { cropImage, type ImageCrop } from "$lib/components/image-cropper"

  let crop = $state<ImageCrop>()
  let avatar = $state<string>()

  async function save() {
    if (!crop) return
    const file = await cropImage(photo, crop, { width: 128, shape: "circle" })
    if (avatar) URL.revokeObjectURL(avatar)
    avatar = URL.createObjectURL(file)
  }
<\/script>

<ImageCropper bind:crop aria-label="Profile photo" src={photo} mode="frame" aspectRatio={1} shape="circle" maxZoom={4}>
  <ImageCropperViewport>
    <ImageCropperImage alt="Mountains at sunset" />
    <ImageCropperSelection />
  </ImageCropperViewport>
  <div class="flex items-center gap-2">
    <ImageCropperZoom aria-label="Zoom" />
    <ImageCropperRotate>Rotate</ImageCropperRotate>
  </div>
  <div class="flex items-center gap-3">
    <Button size="sm" onclick={save}>Save Avatar</Button>
    {#if avatar}<img src={avatar} alt="Your new avatar" class="size-12 rounded-full" />{/if}
  </div>
</ImageCropper>`

  const controlledCode = `<script lang="ts">
  import { createImageCropperController, type ImageCrop } from "$lib/components/image-cropper"

  const controller = createImageCropperController()
  let crop = $state<ImageCrop>()
<\/script>

<Button size="sm" tone="outline" onclick={() => controller.setZoom(2)}>Zoom In</Button>
<Button size="sm" tone="outline" onclick={() => controller.rotate()}>Rotate</Button>
<ImageCropper bind:crop aria-label="Photo" src={photo} {controller} maxZoom={4}>
  <ImageCropperViewport>
    <ImageCropperImage alt="Mountains at sunset" />
    <ImageCropperSelection>
      <ImageCropperGrid />
      <ImageCropperHandle position="se" />
    </ImageCropperSelection>
  </ImageCropperViewport>
</ImageCropper>
<p>{crop ? Math.round(crop.width) + " × " + Math.round(crop.height) + " at " + Math.round(crop.x) + ", " + Math.round(crop.y) : "loading"}</p>`

  const disabledCode = `<ImageCropper aria-label="Photo" src={photo} disabled>
  <ImageCropperViewport>
    <ImageCropperImage alt="Mountains at sunset" />
    <ImageCropperSelection>
      <ImageCropperHandle position="se" />
    </ImageCropperSelection>
  </ImageCropperViewport>
  <div class="flex items-center gap-2">
    <ImageCropperZoom aria-label="Zoom" />
    <ImageCropperRotate>Rotate</ImageCropperRotate>
  </div>
</ImageCropper>`

  let basicCrop = $state<ImageCrop>()
  let basicResult = $state<string>()
  let aspectRatio = $state<number>()
  let avatarCrop = $state<ImageCrop>()
  let avatar = $state<string>()
  let controlledCrop = $state<ImageCrop>()
  const controller = createImageCropperController()

  async function saveBasic() {
    if (!basicCrop) return
    const file = await cropImage(photo, basicCrop)
    if (basicResult) URL.revokeObjectURL(basicResult)
    basicResult = URL.createObjectURL(file)
  }

  async function saveAvatar() {
    if (!avatarCrop) return
    const file = await cropImage(photo, avatarCrop, { width: 128, shape: "circle" })
    if (avatar) URL.revokeObjectURL(avatar)
    avatar = URL.createObjectURL(file)
  }

  onDestroy(() => {
    if (basicResult) URL.revokeObjectURL(basicResult)
    if (avatar) URL.revokeObjectURL(avatar)
  })
</script>

<svelte:head>
  <title>Image Cropper — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Image Cropper"
  description="Choose the part of an image to keep by moving and resizing a selection, or by panning and zooming the image under a still one. Wraps the ui-sdk Image Cropper; the crop is a box in the image's own pixels, ready for cropImage."
  entry="@ui-sdk/svelte/image-cropper"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/image-cropper</code>.
      The viewport, image and selection are needed; the grid, handles, zoom, rotate and flip are optional.
      <code class="font-mono text-accent">cropImage</code> is re-exported here so a crop can be turned into a file.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Give the cropper its image with <code class="font-mono text-accent">src</code> — an object URL for a
      picked file, or a data URI — and name it with <code class="font-mono text-accent">aria-label</code>.
      Until the image loads the root has <code class="font-mono text-accent">data-loading</code> and
      <code class="font-mono text-accent">aria-busy</code>, and the selection is hidden. The crop then starts
      in the middle at <code class="font-mono text-accent">aspectRatio</code>, four fifths as large as the
      image allows, unless you pass <code class="font-mono text-accent">defaultCrop</code>.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="Drag the selection or one of its eight handles, then press Crop. Tab to the selection and use the arrow keys, with Shift to move further."
      code={basicCode}
    >
      <div class="flex w-full max-w-md flex-col items-center gap-3">
        <Button size="sm" onclick={saveBasic}>Crop</Button>
        <ImageCropper bind:crop={basicCrop} aria-label="Photo" src={photo} minWidth={64} minHeight={64}>
          <ImageCropperViewport>
            <ImageCropperImage alt="Mountains at sunset" />
            <ImageCropperSelection>
              <ImageCropperGrid />
              {#each handles as position (position)}
                <ImageCropperHandle {position} />
              {/each}
            </ImageCropperSelection>
          </ImageCropperViewport>
        </ImageCropper>
        <div class="flex h-28 w-full items-center justify-center rounded-lg border border-line bg-elevated p-2">
          {#if basicResult}
            <img src={basicResult} alt="Your crop" class="max-h-full max-w-full rounded-md" />
          {:else}
            <span class="text-sm text-faint">Your crop appears here</span>
          {/if}
        </div>
      </div>
    </Demo>

    <Demo
      title="Aspect ratio and flip"
      description="Changing the ratio fits the crop about its middle. Without one the crop is free, and Shift while dragging a handle keeps its current ratio."
      code={ratioCode}
    >
      <div class="flex w-full max-w-md flex-col items-center gap-3">
        <div class="flex flex-wrap justify-center gap-2">
          {#each ratios as ratio (ratio.label)}
            <Button
              size="sm"
              tone="outline"
              aria-pressed={aspectRatio === ratio.value}
              onclick={() => (aspectRatio = ratio.value)}
            >
              {ratio.label}
            </Button>
          {/each}
        </div>
        <ImageCropper aria-label="Photo" src={photo} {aspectRatio} minWidth={64} minHeight={64}>
          <ImageCropperViewport>
            <ImageCropperImage alt="Mountains at sunset" />
            <ImageCropperSelection>
              <ImageCropperGrid />
              {#each handles as position (position)}
                <ImageCropperHandle {position} />
              {/each}
            </ImageCropperSelection>
          </ImageCropperViewport>
          <div class="flex gap-2">
            <ImageCropperFlip><FlipHorizontal aria-hidden="true" /> Flip</ImageCropperFlip>
            <ImageCropperFlip direction="vertical"><FlipVertical aria-hidden="true" /> Flip Vertically</ImageCropperFlip>
          </div>
        </ImageCropper>
      </div>
    </Demo>

    <Demo
      title="Avatar editor"
      description="mode='frame' keeps the selection still: drag to pan the image, scroll or pinch to zoom. shape='circle' rounds it, and cropImage takes the same shape."
      code={avatarCode}
    >
      <ImageCropper
        bind:crop={avatarCrop}
        aria-label="Profile photo"
        src={photo}
        mode="frame"
        aspectRatio={1}
        shape="circle"
        maxZoom={4}
      >
        <ImageCropperViewport>
          <ImageCropperImage alt="Mountains at sunset" />
          <ImageCropperSelection />
        </ImageCropperViewport>
        <div class="flex items-center gap-2">
          <ImageCropperZoom aria-label="Zoom" />
          <ImageCropperRotate><RotateCw aria-hidden="true" /> Rotate</ImageCropperRotate>
        </div>
        <div class="flex items-center gap-3">
          <Button size="sm" onclick={saveAvatar}>Save Avatar</Button>
          {#if avatar}
            <img src={avatar} alt="Your new avatar" class="size-12 rounded-full shadow-[0_0_0_1px_var(--color-line)]" />
          {/if}
        </div>
      </ImageCropper>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:crop holds the crop in image pixels, and a controller zooms or rotates from anywhere."
      code={controlledCode}
    >
      <div class="flex w-full max-w-md flex-col items-center gap-3">
        <div class="flex flex-wrap justify-center gap-2">
          <Button size="sm" tone="outline" onclick={() => controller.setZoom(2)}>Zoom In</Button>
          <Button size="sm" tone="outline" onclick={() => controller.setZoom(1)}>Reset Zoom</Button>
          <Button size="sm" tone="outline" onclick={() => controller.rotate()}>Rotate</Button>
        </div>
        <ImageCropper bind:crop={controlledCrop} aria-label="Photo" src={photo} controller={controller} maxZoom={4}>
          <ImageCropperViewport>
            <ImageCropperImage alt="Mountains at sunset" />
            <ImageCropperSelection>
              <ImageCropperGrid />
              <ImageCropperHandle position="se" />
            </ImageCropperSelection>
          </ImageCropperViewport>
        </ImageCropper>
        <p class="font-mono text-xs text-muted">
          {controlledCrop
            ? `${Math.round(controlledCrop.width)} × ${Math.round(controlledCrop.height)} at ${Math.round(controlledCrop.x)}, ${Math.round(controlledCrop.y)} · ${controlledCrop.rotation}°`
            : "loading"}
        </p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <Demo title="Disabled" description="The selection and handles can't be focused or dragged, and the zoom and buttons are disabled." code={disabledCode}>
      <ImageCropper aria-label="Photo" src={photo} disabled>
        <ImageCropperViewport>
          <ImageCropperImage alt="Mountains at sunset" />
          <ImageCropperSelection>
            <ImageCropperHandle position="se" />
          </ImageCropperSelection>
        </ImageCropperViewport>
        <div class="flex items-center gap-2">
          <ImageCropperZoom aria-label="Zoom" />
          <ImageCropperRotate>Rotate</ImageCropperRotate>
        </div>
      </ImageCropper>
    </Demo>

    <PropsTable
      caption="mode"
      rows={[
        { name: "box", type: "default", description: "The whole image shows; a selection moves and resizes over it. Handles resize it." },
        { name: "frame", type: "string", description: "The selection stays still and as large as it fits; a drag pans the image and the wheel zooms it. Handles don't show." },
      ]}
    />
    <PropsTable
      caption="shape"
      rows={[
        { name: "rectangle", type: "default", description: "A square-cornered selection." },
        { name: "circle", type: "string", description: "A round selection. The crop is still its box, so pass shape: \"circle\" to cropImage too." },
      ]}
    />
    <PropsTable
      caption="State attributes for styling"
      rows={[
        { name: "data-mode", type: '"box" | "frame"', description: "How the crop changes." },
        { name: "data-shape", type: '"rectangle" | "circle"', description: "The selection's shape." },
        { name: "data-loading", type: "attribute", description: "Until the image loads, while nothing can change." },
        { name: "data-error", type: "attribute", description: "The image failed to load." },
        { name: "data-dragging", type: "attribute", description: "A pointer drags the selection, the image or a handle. The grid shows with it." },
        { name: "data-disabled", type: "attribute", description: "The cropper is disabled." },
        { name: "data-position", type: "n | e | s | w | ne | nw | se | sw", description: "On a handle: the edge or corner it resizes." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="ImageCropper (root)"
      rows={[
        { name: "src", type: "string", description: "The image's URL, like an object URL for a picked file or a data URI." },
        { name: "crop", type: "ImageCrop", description: "The crop in the image's own pixels. Bind with bind:crop to control." },
        { name: "defaultCrop", type: "ImageCrop", description: "The crop at first, when uncontrolled. Otherwise four fifths of the largest at aspectRatio in a box, the largest in a frame." },
        { name: "mode", type: '"box" | "frame"', default: '"box"', description: "Whether the selection moves over the image, or the image pans under a still selection." },
        { name: "aspectRatio", type: "number", description: "Keeps the crop's width over its height, like 1 or 16 / 9. Changing it fits the crop to the new ratio." },
        { name: "shape", type: '"rectangle" | "circle"', default: '"rectangle"', description: "The selection's shape, as data-shape." },
        { name: "minWidth", type: "number", description: "The narrowest the crop gets, in image pixels." },
        { name: "minHeight", type: "number", description: "The shortest the crop gets, in image pixels." },
        { name: "maxZoom", type: "number", description: "How far the crop magnifies the image, where 1 is the largest crop." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops every change: no focus on the selection, and the buttons and zoom are disabled." },
        { name: "onCropChange", type: "(crop, details) => void", description: "Runs on every step of a drag, key or wheel, and once the image loads. details.cancel() keeps the crop." },
        { name: "onCropCommit", type: "(crop, details) => void", description: "Runs once an interaction ends. For saving." },
        { name: "controller", type: "ImageCropperController", description: "getCrop, setCrop, rotate, flip, getZoom, setZoom and focus from anywhere." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every crop change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="ImageCrop"
      rows={[
        { name: "x", type: "number", description: "Pixels from the left edge of the turned image." },
        { name: "y", type: "number", description: "Pixels from the top edge of the turned image." },
        { name: "width", type: "number", description: "The region's width, in the image's own pixels." },
        { name: "height", type: "number", description: "The region's height, in the image's own pixels." },
        { name: "rotation", type: "0 | 90 | 180 | 270", default: "0", description: "Turns the image clockwise before the region is taken." },
        { name: "flipX", type: "boolean", default: "false", description: "Mirrors the turned image left to right." },
        { name: "flipY", type: "boolean", default: "false", description: "Mirrors the turned image top to bottom." },
      ]}
    />
    <PropsTable
      caption="ImageCropperViewport / ImageCropperImage / ImageCropperSelection / ImageCropperGrid"
      rows={[
        { name: "alt", type: "string", description: "Image only: the image's text alternative. Required for a meaningful photo." },
        { name: "class", type: "string", description: "Extra classes. The viewport fits the image with aspect-ratio: var(--image-cropper-aspect-ratio); the selection dims everything outside it." },
        { name: "children", type: "Snippet<[state]>", description: "Receives crop, zoom, loading, error, dragging, mode, shape and disabled." },
        { name: "render", type: "Snippet", description: "Renders your own element with the part's props and state." },
      ]}
    />
    <PropsTable
      caption="ImageCropperHandle"
      rows={[
        { name: "position", type: '"n" | "e" | "s" | "w" | "ne" | "nw" | "se" | "sw"', description: "Required: the edge or corner it resizes, like \"se\" for the bottom right." },
      ]}
    />
    <PropsTable
      caption="ImageCropperZoom / ImageCropperRotate / ImageCropperFlip"
      rows={[
        { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Flip only: which way it mirrors the image." },
        { name: "aria-label", type: "string", description: "The zoom is a native range input from 1 to maxZoom, named in English by default." },
        { name: "children", type: "Snippet", description: "The rotate and flip buttons' content, like an icon and a label." },
      ]}
    />
    <PropsTable
      caption="Re-exports"
      rows={[
        { name: "createImageCropperController", type: "() => ImageCropperController", description: "Each write method takes { reason, event } and returns false when nothing changed or the change was canceled." },
        { name: "cropImage", type: "(src, crop, options?) => Promise<File>", description: "Cuts the crop out of the image. options takes width, height and shape, so a circle stays round." },
        { name: "ImageCropperCropChangeReason", type: "type", description: "image-load, drag, pinch, wheel, step-key, zoom-key, zoom-input, rotate-key, rotate-press, flip-press, aspect-ratio-change, imperative." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>No WAI-ARIA pattern covers an image cropper, so it's built from ones that do: the cropper is a <code class="font-mono text-accent">group</code>, and the selection and each handle follow the slider pattern, saying the crop in words like "300 by 300 pixels, at 50, 0".</li>
      <li>The zoom is a native range input that says its level, like "125%". The selection, handles and zoom are named in English by default; pass <code class="font-mono text-accent">aria-label</code> to name them in another language.</li>
      <li><span class="text-fg">Arrow keys</span> move the selection, or on a handle move its edges. <span class="text-fg">Shift</span> with an arrow moves ten times as far.</li>
      <li><span class="text-fg">Plus/Minus</span> zoom in or out about the crop's middle; <span class="text-fg">R</span> turns the image a quarter clockwise, or back with Shift.</li>
      <li><span class="text-fg">Escape</span> during a drag puts the crop back where the drag started.</li>
      <li>Each key press commits, like the end of a drag. While the image loads the root is <code class="font-mono text-accent">aria-busy</code> and nothing can change.</li>
      <li>Give the cropper an <code class="font-mono text-accent">aria-label</code> and the image an <code class="font-mono text-accent">alt</code>.</li>
    </ul>
  </Section>
</div>