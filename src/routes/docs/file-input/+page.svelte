<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    FileInput,
    FileInputTrigger,
    FileInputDropzone,
    FileInputList,
    FileInputItem,
    FileInputItemRemove,
    createFileInputController,
    formatFileSize,
    relativePath,
    type FileRejection,
  } from "#lib/components/file-input"
  import { Button } from "#lib/components/button"
  import { File as FileIcon, FileImage, FolderOpen, Plus, Trash2, Upload, X } from "@lucide/svelte"

  const installCode = `import {
  FileInput, FileInputTrigger, FileInputDropzone,
  FileInputList, FileInputItem, FileInputItemRemove,
  formatFileSize,
} from "#lib/components/file-input"`

  const usageCode = `<script lang="ts">
  import { File as FileIcon, Upload, X } from "@lucide/svelte"
  import {
    FileInput, FileInputTrigger, FileInputDropzone,
    FileInputList, FileInputItem, FileInputItemRemove, formatFileSize,
  } from "#lib/components/file-input"
<\/script>

<FileInput name="attachments" multiple>
  <FileInputDropzone>
    <Upload aria-hidden="true" />
    <p>Drag and drop files here</p>
    <FileInputTrigger>Browse files</FileInputTrigger>
  </FileInputDropzone>
  <FileInputList aria-label="Files">
    <FileInputItem>
      {#snippet children({ file })}
        <FileIcon aria-hidden="true" />
        <span>{file.name}</span>
        <span data-slot="hint">{formatFileSize(file.size)}</span>
        <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
      {/snippet}
    </FileInputItem>
  </FileInputList>
</FileInput>`

  const buttonCode = `<FileInput name="resume">
  {#snippet children(state)}
    <FileInputTrigger tone="outline">Upload resume</FileInputTrigger>
    <span class="text-sm text-muted">{state.value[0]?.name ?? "No file chosen"}</span>
  {/snippet}
</FileInput>`

  const validationCode = `<script lang="ts">
  let rejected = $state<FileRejection[]>([])
<\/script>

<FileInput
  multiple
  accept={["image/*", ".pdf"]}
  maxFiles={3}
  maxSize={5_000_000}
  onReject={(next) => (rejected = next)}
>
  <FileInputDropzone>
    <Upload aria-hidden="true" />
    <p>Images or PDF, up to 3 files</p>
    <p data-slot="hint">5 MB each at most.</p>
    <FileInputTrigger size="sm">Browse files</FileInputTrigger>
  </FileInputDropzone>
  <FileInputList aria-label="Files">…</FileInputList>
</FileInput>
{#each rejected as { file, reasons } (file.name)}
  <p>{file.name}: {reasons.join(", ")}</p>
{/each}`

  const seedSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="16" fill="seagreen"/><circle cx="48" cy="48" r="20" fill="white"/></svg>'
  const seedImage = new File([seedSvg], "avatar.svg", { type: "image/svg+xml" })

  const preview = (file: File) => (img: HTMLImageElement) => {
    const url = URL.createObjectURL(file)
    img.src = url
    return () => URL.revokeObjectURL(url)
  }

  const previewCode = `<script lang="ts">
  const preview = (file: File) => (img: HTMLImageElement) => {
    const url = URL.createObjectURL(file)
    img.src = url
    return () => URL.revokeObjectURL(url)
  }
<\/script>

<FileInput multiple accept="image/*" defaultValue={[seedImage]}>
  <FileInputDropzone>
    <FileImage aria-hidden="true" />
    <p>Drop images here</p>
    <FileInputTrigger tone="outline" size="sm">Browse images</FileInputTrigger>
  </FileInputDropzone>
  <FileInputList aria-label="Images">
    <FileInputItem>
      {#snippet children({ file })}
        <img {@attach preview(file)} alt="" class="size-8 shrink-0 rounded-sm object-cover" />
        <span>{file.name}</span>
        <span data-slot="hint">{formatFileSize(file.size)}</span>
        <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
      {/snippet}
    </FileInputItem>
  </FileInputList>
</FileInput>`

  const attachments = createFileInputController()
  let files = $state<File[]>([])

  const controlledCode = `<script lang="ts">
  const attachments = createFileInputController()
  let files = $state<File[]>([])
<\/script>

<Button size="sm" tone="outline" onclick={() => attachments.open()}>Choose files</Button>
<Button size="sm" tone="ghost" onclick={() => attachments.clear()}>Clear</Button>
<FileInput multiple controller={attachments} bind:value={files}>
  <FileInputList aria-label="Attachments">
    <FileInputItem>
      {#snippet children({ file })}
        <FileIcon aria-hidden="true" />
        <span>{file.name}</span>
        <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
      {/snippet}
    </FileInputItem>
  </FileInputList>
</FileInput>
<p>{files.length} files held</p>`

  const pageCode = `<FileInput multiple>
  <div class="flex w-full items-center justify-between gap-3">
    <p class="text-sm text-muted">Drop files anywhere on the page.</p>
    <FileInputTrigger size="sm" tone="outline">Upload files</FileInputTrigger>
  </div>
  <FileInputDropzone target="document" variant="overlay">
    <div class="flex items-center gap-2 rounded-lg border border-line bg-elevated px-4 py-3 font-medium shadow-lg">
      <Upload aria-hidden="true" />
      Drop to attach
    </div>
  </FileInputDropzone>
  <FileInputList aria-label="Attachments">…</FileInputList>
</FileInput>`

  const folderCode = `<FileInput directory name="project">
  <FileInputTrigger tone="outline">
    <FolderOpen aria-hidden="true" /> Choose a folder
  </FileInputTrigger>
  <FileInputList aria-label="Files">
    <FileInputItem>
      {#snippet children({ file })}
        <FileIcon aria-hidden="true" />
        <span>{relativePath(file)}</span>
        <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
      {/snippet}
    </FileInputItem>
  </FileInputList>
</FileInput>`

  let rejected = $state<FileRejection[]>([])
</script>

<svelte:head>
  <title>File Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="File Input"
  description="Choose, drop or paste files, validate them, and submit them with a form. Wraps the ui-sdk File Input: it holds the files, checks them against your rules and announces changes. Uploading to a server is up to your app."
  entry="@ui-sdk/svelte/file-input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/file-input</code>, which also ships
      <code class="font-mono text-accent">formatFileSize</code>,
      <code class="font-mono text-accent">relativePath</code> and
      <code class="font-mono text-accent">createFileInputController</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      The trigger opens the system file picker. The drop zone takes files dropped on it or pasted while
      focus is inside it — keep a trigger beside it for people using a keyboard. The list renders its
      item once per file, and an item's state has its <code class="font-mono text-accent">file</code>
      and <code class="font-mono text-accent">index</code>. With
      <code class="font-mono text-accent">name</code>, the files submit through a native file input,
      even before hydration.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Dropzone and list"
      description="Browse or drop a few files, then remove one. Tab to the list to move between files with the arrow keys; Delete or Backspace removes the focused one."
      code={usageCode}
    >
      <FileInput name="attachments" multiple>
        <FileInputDropzone>
          <Upload aria-hidden="true" />
          <p class="font-medium">Drag and drop files here</p>
          <p data-slot="hint" class="text-xs text-muted">Or paste them from your clipboard.</p>
          <FileInputTrigger>Browse files</FileInputTrigger>
        </FileInputDropzone>
        <FileInputList aria-label="Files">
          <FileInputItem>
            {#snippet children({ file })}
              <FileIcon aria-hidden="true" />
              <span>{file.name}</span>
              <span data-slot="hint">{formatFileSize(file.size)}</span>
              <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
            {/snippet}
          </FileInputItem>
        </FileInputList>
      </FileInput>
    </Demo>

    <Demo
      title="Upload button"
      description="A trigger alone is enough when you only need the picker. The root's children snippet receives its state, so you can show the chosen file's name."
      code={buttonCode}
    >
      <FileInput name="resume">
        {#snippet children(state)}
          <FileInputTrigger tone="outline">Upload resume</FileInputTrigger>
          <span class="text-sm text-muted">{state.value[0]?.name ?? "No file chosen"}</span>
        {/snippet}
      </FileInput>
    </Demo>

    <Demo
      title="Accepted types and limits"
      description="accept checks the picker, drops and pastes. maxFiles and maxSize reject the rest with a reason. A rejected file never joins the value, and onReject reports every reason."
      code={validationCode}
    >
      <div class="w-full max-w-80 space-y-3">
        <FileInput
          multiple
          accept={["image/*", ".pdf"]}
          maxFiles={3}
          maxSize={5_000_000}
          onReject={(next) => (rejected = next)}
        >
          <FileInputDropzone>
            <Upload aria-hidden="true" />
            <p class="font-medium">Images or PDF, up to 3 files</p>
            <p data-slot="hint" class="text-xs text-muted">5 MB each at most.</p>
            <FileInputTrigger size="sm">Browse files</FileInputTrigger>
          </FileInputDropzone>
          <FileInputList aria-label="Files">
            <FileInputItem>
              {#snippet children({ file })}
                <FileIcon aria-hidden="true" />
                <span>{file.name}</span>
                <span data-slot="hint">{formatFileSize(file.size)}</span>
                <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
              {/snippet}
            </FileInputItem>
          </FileInputList>
        </FileInput>
        {#if rejected.length}
          <ul class="space-y-1 text-sm text-danger">
            {#each rejected as { file, reasons } (file.name)}
              <li><span class="font-mono">{file.name}</span>: {reasons.join(", ")}</li>
            {/each}
          </ul>
        {:else}
          <p class="text-sm text-muted">Nothing rejected yet.</p>
        {/if}
      </div>
    </Demo>

    <Demo
      title="Image previews"
      description="Create an object URL for the file and revoke it when the item goes away, using a Svelte attachment. The seeded preview is a local SVG file, so nothing is fetched."
      code={previewCode}
    >
      <FileInput multiple accept="image/*" defaultValue={[seedImage]}>
        <FileInputDropzone>
          <FileImage aria-hidden="true" />
          <p class="font-medium">Drop images here</p>
          <FileInputTrigger tone="outline" size="sm">Browse images</FileInputTrigger>
        </FileInputDropzone>
        <FileInputList aria-label="Images">
          <FileInputItem>
            {#snippet children({ file })}
              <img {@attach preview(file)} alt="" class="size-8 shrink-0 rounded-sm object-cover" />
              <span>{file.name}</span>
              <span data-slot="hint">{formatFileSize(file.size)}</span>
              <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
            {/snippet}
          </FileInputItem>
        </FileInputList>
      </FileInput>
    </Demo>

    <Demo
      title="Controlled, with a controller"
      description="bind:value holds the files in the parent. A controller opens the picker from a button outside the file input, and clears the value. Open it from a user action so the browser allows it."
      code={controlledCode}
    >
      <div class="w-full max-w-80 space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button size="sm" tone="outline" onclick={() => attachments.open()}>Choose files</Button>
          <Button size="sm" tone="ghost" onclick={() => attachments.clear()}>
            <Trash2 aria-hidden="true" /> Clear
          </Button>
        </div>
        <FileInput multiple controller={attachments} bind:value={files}>
          <FileInputList aria-label="Attachments">
            <FileInputItem>
              {#snippet children({ file })}
                <FileIcon aria-hidden="true" />
                <span>{file.name}</span>
                <span data-slot="hint">{formatFileSize(file.size)}</span>
                <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
              {/snippet}
            </FileInputItem>
          </FileInputList>
        </FileInput>
        <p class="text-sm text-muted">
          <span class="font-mono text-fg">{files.length}</span> files held
        </p>
      </div>
    </Demo>

    <Demo
      title="Page-wide drop"
      description="target='document' takes files dropped anywhere on the page. variant='overlay' shows the zone only while files are over the window. Drag a file over this page to see it."
      code={pageCode}
    >
      <FileInput multiple>
        <div class="flex w-full items-center justify-between gap-3">
          <p class="text-sm text-muted">Drop files anywhere on the page.</p>
          <FileInputTrigger size="sm" tone="outline">Upload files</FileInputTrigger>
        </div>
        <FileInputDropzone target="document" variant="overlay">
          <div class="flex items-center gap-2 rounded-lg border border-line bg-elevated px-4 py-3 font-medium shadow-lg">
            <Upload aria-hidden="true" />
            Drop to attach
          </div>
        </FileInputDropzone>
        <FileInputList aria-label="Attachments">
          <FileInputItem>
            {#snippet children({ file })}
              <FileIcon aria-hidden="true" />
              <span>{file.name}</span>
              <span data-slot="hint">{formatFileSize(file.size)}</span>
              <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
            {/snippet}
          </FileInputItem>
        </FileInputList>
      </FileInput>
    </Demo>

    <Demo
      title="Pick a folder"
      description="directory turns on multiple and reads the folder recursively, up to 1,000 files, skipping system files such as .DS_Store. relativePath shows where each file sat inside the folder."
      code={folderCode}
    >
      <FileInput directory name="project">
        <FileInputTrigger tone="outline">
          <FolderOpen aria-hidden="true" /> Choose a folder
        </FileInputTrigger>
        <FileInputList aria-label="Files">
          <FileInputItem>
            {#snippet children({ file })}
              <FileIcon aria-hidden="true" />
              <span>{relativePath(file)}</span>
              <FileInputItemRemove><X aria-hidden="true" /></FileInputItemRemove>
            {/snippet}
          </FileInputItem>
        </FileInputList>
      </FileInput>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <p class="text-sm text-muted">
      The trigger takes <code class="font-mono text-accent">tone</code> and
      <code class="font-mono text-accent">size</code>; the drop zone takes
      <code class="font-mono text-accent">variant</code>. Everything else is state, exposed as data
      attributes.
    </p>
    <PropsTable
      caption="FileInputTrigger tone"
      rows={[
        { name: "solid", type: "default", description: "Filled accent — the primary upload action." },
        { name: "outline", type: "string", description: "Bordered — a secondary action beside a drop zone." },
        { name: "ghost", type: "string", description: "Quiet — for a toolbar or an icon-only attach button." },
      ]}
    />
    <PropsTable
      caption="FileInputTrigger size"
      rows={[
        { name: "sm", type: "string", default: "h-8", description: "Compact, inside a drop zone." },
        { name: "md", type: "default", default: "h-9", description: "Default." },
        { name: "lg", type: "string", default: "h-11", description: "Prominent." },
        { name: "icon", type: "string", default: "h-9 w-9", description: "Square, for a single icon. Add aria-label." },
      ]}
    />
    <PropsTable
      caption="FileInputDropzone variant"
      rows={[
        { name: "inline", type: "default", description: "A bordered zone in the flow, with room for a trigger." },
        { name: "overlay", type: "string", description: "Fixed over the page, shown only while dragging. Pair with target='document'." },
      ]}
    />
    <PropsTable
      caption="State attributes"
      rows={[
        { name: "data-dragging", type: "dropzone", description: "Files are over the zone (or the window, for a page-wide zone)." },
        { name: "data-drag-accept", type: "dropzone", description: "The dragged files look acceptable, from their types and count." },
        { name: "data-drag-reject", type: "dropzone", description: "A dragged file's type is ruled out, or there are too many." },
        { name: "data-disabled", type: "all parts", description: "Disabled by its own prop or a <fieldset>." },
        { name: "data-required", type: "root / trigger / list", description: "A form won't submit while it holds no files." },
      ]}
    />
    <Demo
      title="Disabled and required"
      description="disabled stops picks, drops and pastes and leaves the value out of the submission. required blocks submission until it holds a file."
      code={`<FileInput disabled multiple>
  <FileInputDropzone>
    <Upload aria-hidden="true" />
    <p>Disabled</p>
    <FileInputTrigger tone="outline" size="sm">Browse files</FileInputTrigger>
  </FileInputDropzone>
</FileInput>

<FileInput name="proof" required accept={["image/*", ".pdf"]}>
  <FileInputTrigger>Choose a file</FileInputTrigger>
</FileInput>`}
    >
      <div class="flex w-full flex-wrap items-start justify-center gap-6">
        <FileInput disabled multiple class="max-w-60">
          <FileInputDropzone>
            <Upload aria-hidden="true" />
            <p class="font-medium">Disabled</p>
            <FileInputTrigger tone="outline" size="sm">Browse files</FileInputTrigger>
          </FileInputDropzone>
        </FileInput>
        <FileInput name="proof" required accept={["image/*", ".pdf"]} class="max-w-60">
          <FileInputDropzone>
            <Plus aria-hidden="true" />
            <p class="font-medium">Required</p>
            <FileInputTrigger size="sm">Choose a file</FileInputTrigger>
          </FileInputDropzone>
        </FileInput>
      </div>
    </Demo>
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      Every part forwards all HTML attributes plus the ui-sdk
      <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets. The root's, the drop zone's and an
      item's <code class="font-mono text-accent">children</code> receive that part's state.
    </p>
    <PropsTable
      caption="FileInput (root)"
      rows={[
        { name: "value", type: "File[]", description: "The files. Bind with bind:value to control." },
        { name: "defaultValue", type: "File[]", default: "[]", description: "The files at first, when uncontrolled. A form reset returns to them." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when files are added or removed. details has reason, added, removed, rejected; details.cancel() stops it." },
        { name: "onReject", type: "(rejected, details) => void", description: "Runs after onValueChange when files fail the checks, with every reason each failed." },
        { name: "accept", type: "string | readonly string[]", description: "MIME types, wildcards and extensions, e.g. 'image/*' and '.pdf'. Checks picker, drops and pastes." },
        { name: "multiple", type: "boolean", default: "false", description: "Hold more than one file. Without it, a new file replaces the current one." },
        { name: "maxFiles", type: "number", description: "The most files accepted in all. The rest are rejected with too-many-files." },
        { name: "maxSize", type: "number", description: "The largest size accepted, in bytes." },
        { name: "minSize", type: "number", description: "The smallest size accepted, in bytes." },
        { name: "validate", type: "(file) => string | null | undefined | void", description: "Your own check, after the built-in ones. Return a reason to reject, e.g. 'duplicate'." },
        { name: "directory", type: "boolean", default: "false", description: "Pick a whole folder, read recursively up to 1,000 files. Turns on multiple." },
        { name: "capture", type: '"user" | "environment" | boolean', description: "Open the camera on phones instead of the picker." },
        { name: "name", type: "string", description: "The name the files submit under. Without one, nothing is submitted." },
        { name: "form", type: "string", description: "The id of a form to belong to, when it isn't inside that form." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until it holds a file." },
        { name: "disabled", type: "boolean", default: "false", description: "Stops picks, drops and pastes, and leaves the value out of the submission." },
        { name: "announcement", type: "(change) => string | null | undefined", description: "What screen readers hear after a change. Return null for nothing." },
        { name: "controller", type: "FileInputController", description: "Add/remove files and open the picker from anywhere via createFileInputController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="FileInputTrigger — Negentropy props"
      rows={[
        { name: "tone", type: '"solid" | "outline" | "ghost"', default: '"solid"', description: "Visual style." },
        { name: "size", type: '"sm" | "md" | "lg" | "icon"', default: '"md"', description: "Height and padding. icon is square for a single icon." },
        { name: "controller", type: "FileInputController", description: "Connects a trigger outside the file input to it." },
        { name: "class", type: "string", description: "Extra classes merged onto the button (user wins)." },
      ]}
    />
    <PropsTable
      caption="FileInputDropzone"
      rows={[
        { name: "variant", type: '"inline" | "overlay"', default: '"inline"', description: "Negentropy prop: in the flow, or fixed over the page while dragging." },
        { name: "target", type: '"element" | "document"', default: '"element"', description: "Where it takes drops. 'document' takes files dropped anywhere on the page." },
        { name: "pasteTarget", type: '"document" | string | Element | (() => Element | null)', description: "Somewhere else to take pasted files from, like a message textarea. Text pastes are left alone." },
        { name: "class", type: "string", description: "Extra classes merged onto the zone." },
      ]}
    />
    <PropsTable
      caption="FileInputList / FileInputItem / FileInputItemRemove"
      rows={[
        { name: "aria-label", type: "string", description: "List: the accessible name for the files, e.g. 'Attachments'." },
        { name: "file", type: "File", description: "Item and remove: the file it shows or removes. The list passes it to the items it renders." },
        { name: "children", type: "Snippet<[state]>", description: "Item state has file, index and disabled. Remove is named 'Remove <file name>' unless you name it." },
        { name: "class", type: "string", description: "Extra classes merged onto the element." },
      ]}
    />
    <PropsTable
      caption="Helpers and controller"
      rows={[
        { name: "formatFileSize(bytes)", type: "(number) => string", description: "A readable size, e.g. '1.2 MB'." },
        { name: "relativePath(file)", type: "(File) => string", description: "The path inside a picked or dropped folder." },
        { name: "getValue() / setValue(files)", type: "() => readonly File[] / (files) => boolean", description: "Read the files, or replace them without checking." },
        { name: "addFiles(files) / removeFile(file) / clear()", type: "(files) => boolean", description: "Run files through the checks and add them, remove one, or remove all." },
        { name: "open() / focus() / isDragging()", type: "() => boolean / () => void", description: "Open the picker (during a user action), focus the trigger, or read the drag state." },
      ]}
    />
    <PropsTable
      caption="Rejection reasons"
      rows={[
        { name: "file-type", type: "string", description: "It matches nothing in accept." },
        { name: "file-too-large", type: "string", description: "It's bigger than maxSize." },
        { name: "file-too-small", type: "string", description: "It's smaller than minSize." },
        { name: "too-many-files", type: "string", description: "More files came than maxFiles allows, or more than one without multiple." },
        { name: "your own", type: "string", description: "Whatever validate returned, e.g. 'duplicate'." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Keep a trigger available alongside a drop zone: the zone isn't a control, so the trigger inside it is the one tab stop. The hidden native input stays out of the tab order and the accessibility tree.</li>
      <li>Accepted, removed and rejected files are announced through a polite live region. Change the message with <code class="font-mono text-accent">announcement</code>, or return <code class="font-mono text-accent">null</code> to skip it.</li>
      <li>The file list is one tab stop. <span class="text-fg">Arrow keys</span>, <span class="text-fg">Home</span> and <span class="text-fg">End</span> move between files; <span class="text-fg">Delete</span> or <span class="text-fg">Backspace</span> removes the focused one and focuses the next.</li>
      <li>Remove buttons are named "Remove &lt;file name&gt;" and stay out of the tab order, so the list's arrow keys reach every file.</li>
      <li>While files are over a zone it sets <code class="font-mono text-accent">data-dragging</code> and <code class="font-mono text-accent">data-drag-accept</code>, or <code class="font-mono text-accent">data-drag-reject</code> when their types or count won't be accepted. Text drags and drags that started in the page are ignored.</li>
      <li>Pasting files while focus is inside the zone adds them; pasting text keeps its normal behavior. <code class="font-mono text-accent">pasteTarget</code> extends this to a textarea.</li>
      <li>With <code class="font-mono text-accent">name</code> the files submit with the form, and a form reset returns to <code class="font-mono text-accent">defaultValue</code>. Rejected files never submit; <code class="font-mono text-accent">required</code> blocks submission with no file.</li>
      <li>Inside a Field, the field's label names the trigger and pressing the label opens the picker. A disabled file input disables its trigger, and a disabled <code class="font-mono text-accent">&lt;fieldset&gt;</code> disables it too.</li>
      <li>Give an icon-only trigger an <code class="font-mono text-accent">aria-label</code>, and give the list an <code class="font-mono text-accent">aria-label</code>. Validate uploads on your server as well.</li>
    </ul>
  </Section>
</div>