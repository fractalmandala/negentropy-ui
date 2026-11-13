<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    TokenInput,
    TokenInputEditor,
    TokenInputToken,
    TokenInputTokenRemove,
    createTokenInputController,
    toLabel,
    toText,
    type Token,
    type TokenDeletion,
    type TokenInputValue,
  } from "#lib/components/token-input"
  import { Field, FieldLabel } from "#lib/components/field"
  import { Button } from "#lib/components/button"
  import { FileText, X } from "@lucide/svelte"

  const installCode = `import {
  TokenInput, TokenInputEditor, TokenInputToken, TokenInputTokenRemove,
  createTokenInputController, toText, toLabel, fromText,
} from "#lib/components/token-input"`

  const usageCode = `<script lang="ts">
  import {
    TokenInput, TokenInputEditor, type TokenInputValue,
  } from "#lib/components/token-input"

  const draft: TokenInputValue = [
    "Explain ",
    { type: "file", value: "src/routes.ts", label: "routes.ts" },
  ]
<\/script>

<TokenInput defaultValue={draft}>
  <TokenInputEditor aria-label="Prompt" />
</TokenInput>`

  const tagDraft: TokenInputValue = [
    "Ship ",
    { type: "tag", value: "svelte", label: "svelte" },
    " and ",
    { type: "tag", value: "a11y", label: "a11y" },
  ]

  const fileDraft: TokenInputValue = [
    "Explain ",
    { type: "file", value: "src/routes.ts", label: "routes.ts" },
    " in two sentences.",
  ]

  const basicCode = `<script lang="ts">
  import { Field, FieldLabel } from "#lib/components/field"
  import {
    TokenInput, TokenInputEditor, TokenInputToken, TokenInputTokenRemove,
    type TokenInputValue,
  } from "#lib/components/token-input"
  import { X } from "@lucide/svelte"

  const draft: TokenInputValue = [
    "Ship ",
    { type: "tag", value: "svelte", label: "svelte" },
    " and ",
    { type: "tag", value: "a11y", label: "a11y" },
  ]
<\/script>

<Field>
  <FieldLabel>Tags</FieldLabel>
  <TokenInput defaultValue={draft}>
    {#snippet token(token)}
      <TokenInputToken>
        {token.label}
        <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
      </TokenInputToken>
    {/snippet}
    <TokenInputEditor />
  </TokenInput>
</Field>`

  const controlledCode = `<script lang="ts">
  import {
    TokenInput, TokenInputEditor, TokenInputToken, TokenInputTokenRemove,
    createTokenInputController, toText, type TokenInputValue,
  } from "#lib/components/token-input"
  import { Button } from "#lib/components/button"
  import { FileText, X } from "@lucide/svelte"

  let value = $state<TokenInputValue>([
    "Review ",
    { type: "file", value: "src/routes.ts", label: "routes.ts" },
  ])
  const prompt = createTokenInputController()
<\/script>

<div class="flex w-full flex-col gap-3">
  <TokenInput bind:value={value} controller={prompt}>
    {#snippet token(token)}
      <TokenInputToken>
        <FileText aria-hidden="true" />
        {token.label}
        <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
      </TokenInputToken>
    {/snippet}
    <TokenInputEditor aria-label="Prompt" />
  </TokenInput>
  <p class="font-mono text-xs text-muted">{toText(value)}</p>
  <div class="flex gap-2">
    <Button
      size="sm"
      tone="outline"
      onclick={() =>
        prompt.insert(
          { type: "file", value: "package.json", label: "package.json" },
          { at: "end" }
        )}
    >
      Attach package.json
    </Button>
    <Button size="sm" tone="outline" onclick={() => prompt.clear()}>Clear</Button>
  </div>
</div>`

  const deletionCode = `<script lang="ts">
  import {
    TokenInput, TokenInputEditor, TokenInputToken,
    type TokenDeletion, type TokenInputValue,
  } from "#lib/components/token-input"
  import { Button } from "#lib/components/button"
  import { FileText } from "@lucide/svelte"

  const draft: TokenInputValue = [
    "Explain ",
    { type: "file", value: "src/routes.ts", label: "routes.ts" },
    " in two sentences.",
  ]
  const modes: TokenDeletion[] = ["whole", "select", "revert"]
  let deletion = $state<TokenDeletion>("whole")
<\/script>

<div class="flex w-full flex-col gap-3">
  <div class="flex gap-2">
    {#each modes as mode (mode)}
      <Button
        size="sm"
        tone={deletion === mode ? "solid" : "outline"}
        onclick={() => (deletion = mode)}
      >
        {mode}
      </Button>
    {/each}
  </div>
  <TokenInput tokenDeletion={deletion} defaultValue={draft}>
    {#snippet token(token)}
      <TokenInputToken>
        <FileText aria-hidden="true" />
        {token.label}
      </TokenInputToken>
    {/snippet}
    <TokenInputEditor aria-label="Prompt" />
  </TokenInput>
</div>`

  const controllerCode = `<script lang="ts">
  import {
    TokenInput, TokenInputEditor, TokenInputToken, TokenInputTokenRemove,
    createTokenInputController, type Token, type TokenInputValue,
  } from "#lib/components/token-input"
  import { Button } from "#lib/components/button"
  import { FileText, X } from "@lucide/svelte"

  const draft: TokenInputValue = [
    "Explain ",
    { type: "file", value: "src/routes.ts", label: "routes.ts" },
    " in two sentences.",
  ]
  const files = createTokenInputController()
  const loadFile = () => new Promise<void>((resolve) => setTimeout(resolve, 800))
  const firstToken = () =>
    files.getValue().find((segment): segment is Token => typeof segment !== "string")
  const keepFocus = (event: MouseEvent) => event.preventDefault()
<\/script>

<div class="flex w-full flex-col gap-3">
  <div class="flex flex-wrap gap-2">
    <Button
      size="sm"
      tone="outline"
      onmousedown={keepFocus}
      onclick={() =>
        files.insert(
          { type: "file", value: "README.md", label: "README.md" },
          { at: "end", resolve: loadFile() }
        )}
    >
      Attach README
    </Button>
    <Button
      size="sm"
      tone="outline"
      onmousedown={keepFocus}
      onclick={() => {
        const token = firstToken()
        if (token) files.updateToken(token.id!, { label: token.value })
      }}
    >
      Show path
    </Button>
    <Button
      size="sm"
      tone="outline"
      onmousedown={keepFocus}
      onclick={() => {
        const token = firstToken()
        if (token) files.removeToken(token.id!)
      }}
    >
      Remove first
    </Button>
    <Button size="sm" tone="outline" onmousedown={keepFocus} onclick={() => files.undo()}>
      Undo
    </Button>
    <Button size="sm" tone="outline" onmousedown={keepFocus} onclick={() => files.clear()}>
      Clear
    </Button>
  </div>
  <TokenInput controller={files} defaultValue={draft}>
    {#snippet token(token)}
      <TokenInputToken>
        <FileText aria-hidden="true" />
        {token.label}
        <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
      </TokenInputToken>
    {/snippet}
    <TokenInputEditor aria-label="Prompt" />
  </TokenInput>
</div>`

  const submitCode = `<script lang="ts">
  import {
    TokenInput, TokenInputEditor, toLabel,
  } from "#lib/components/token-input"

  let sent = $state<string[]>([])
<\/script>

<div class="flex w-full flex-col gap-3">
  <TokenInput
    submitShortcut="mod+enter"
    onSubmit={(next) => (sent = [...sent, toLabel(next)])}
  >
    <TokenInputEditor aria-label="Message" />
  </TokenInput>
  {#each sent as message, index (index)}
    <p class="text-sm text-fg">{message}</p>
  {/each}
</div>`

  const statesCode = `<script lang="ts">
  import {
    TokenInput, TokenInputEditor, TokenInputToken, TokenInputTokenRemove,
    type TokenInputValue,
  } from "#lib/components/token-input"
  import { FileText, X } from "@lucide/svelte"

  const draft: TokenInputValue = [
    "Explain ",
    { type: "file", value: "src/routes.ts", label: "routes.ts" },
    " in two sentences.",
  ]
<\/script>

<div class="flex w-full flex-col gap-4">
  <TokenInput disabled defaultValue={draft}>
    {#snippet token(token)}
      <TokenInputToken>
        <FileText aria-hidden="true" />
        {token.label}
        <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
      </TokenInputToken>
    {/snippet}
    <TokenInputEditor aria-label="Disabled prompt" />
  </TokenInput>
  <TokenInput readOnly defaultValue={draft}>
    {#snippet token(token)}
      <TokenInputToken>
        <FileText aria-hidden="true" />
        {token.label}
        <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
      </TokenInputToken>
    {/snippet}
    <TokenInputEditor aria-label="Read-only prompt" />
  </TokenInput>
</div>`

  const modes: TokenDeletion[] = ["whole", "select", "revert"]
  let deletion = $state<TokenDeletion>("whole")
  let value = $state<TokenInputValue>([
    "Review ",
    { type: "file", value: "src/routes.ts", label: "routes.ts" },
  ])
  let sent = $state<string[]>([])
  const prompt = createTokenInputController()
  const files = createTokenInputController()
  const loadFile = () => new Promise<void>((resolve) => setTimeout(resolve, 800))
  const firstToken = () =>
    files.getValue().find((segment): segment is Token => typeof segment !== "string")
  const keepFocus = (event: MouseEvent) => event.preventDefault()
</script>

<svelte:head>
  <title>Token Input — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Token Input"
  description="Mix editable text with tokens for files, people, tags, and other references. Wraps the ui-sdk Token Input: each token moves, deletes and copies as one piece, and the editor keeps its own selection and undo history."
  entry="@ui-sdk/svelte/token-input"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/token-input</code>, which also re-exports
      the codec helpers <code class="font-mono text-accent">toText</code>,
      <code class="font-mono text-accent">toLabel</code>, <code class="font-mono text-accent">fromText</code>
      and <code class="font-mono text-accent">defaultCodec</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
    <p class="text-sm text-muted">
      A value is an array of text and tokens. Each token has a
      <code class="font-mono text-accent">type</code>, a <code class="font-mono text-accent">value</code>
      for your app and a <code class="font-mono text-accent">label</code> for the reader. The editor
      manages its own content, so let it render that content and use the
      <code class="font-mono text-accent">token</code> snippet for custom token markup.
    </p>
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">TokenInput</code> holds the value and
      <code class="font-mono text-accent">TokenInputEditor</code> is the text people edit. Without a
      <code class="font-mono text-accent">token</code> snippet each token shows its label. Add a
      Trigger Menu inside it when you want suggestions as someone types
      <code class="font-mono text-accent">@</code> or <code class="font-mono text-accent">/</code>;
      on its own, your code supplies the tokens.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Tags with remove buttons"
      description="Type to edit the text. Press a token's remove button, or put the caret after it and press Backspace. The Field label names the editor."
      code={basicCode}
    >
      <div class="w-full max-w-md">
        <Field>
          <FieldLabel>Tags</FieldLabel>
          <TokenInput defaultValue={tagDraft}>
            {#snippet token(token)}
              <TokenInputToken>
                {token.label}
                <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
              </TokenInputToken>
            {/snippet}
            <TokenInputEditor />
          </TokenInput>
        </Field>
      </div>
    </Demo>

    <Demo
      title="Controlled"
      description="bind:value holds text and tokens. toText serializes it for display; the controller inserts at the end and clears, each as one undoable step."
      code={controlledCode}
    >
      <div class="flex w-full max-w-md flex-col gap-3">
        <TokenInput bind:value={value} controller={prompt}>
          {#snippet token(token)}
            <TokenInputToken>
              <FileText aria-hidden="true" />
              {token.label}
              <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
            </TokenInputToken>
          {/snippet}
          <TokenInputEditor aria-label="Prompt" />
        </TokenInput>
        <p class="font-mono text-xs text-muted">{toText(value)}</p>
        <div class="flex gap-2">
          <Button
            size="sm"
            tone="outline"
            onclick={() =>
              prompt.insert(
                { type: "file", value: "package.json", label: "package.json" },
                { at: "end" }
              )}
          >
            Attach package.json
          </Button>
          <Button size="sm" tone="outline" onclick={() => prompt.clear()}>Clear</Button>
        </div>
      </div>
    </Demo>

    <Demo
      title="What Backspace does"
      description="Click just after routes.ts and press Backspace. whole removes it in one press, select selects it first, revert turns it back into editable text. Undo to try another mode."
      code={deletionCode}
    >
      <div class="flex w-full max-w-md flex-col gap-3">
        <div class="flex gap-2">
          {#each modes as mode (mode)}
            <Button
              size="sm"
              tone={deletion === mode ? "solid" : "outline"}
              onclick={() => (deletion = mode)}
            >
              {mode}
            </Button>
          {/each}
        </div>
        <TokenInput tokenDeletion={deletion} defaultValue={fileDraft}>
          {#snippet token(token)}
            <TokenInputToken>
              <FileText aria-hidden="true" />
              {token.label}
            </TokenInputToken>
          {/snippet}
          <TokenInputEditor aria-label="Prompt" />
        </TokenInput>
      </div>
    </Demo>

    <Demo
      title="Controller and pending tokens"
      description="Attach README and watch it load: resolve keeps the token pending until it settles. Show path relabels it without an undo step; Remove first, Undo and Clear are each one step."
      code={controllerCode}
    >
      <div class="flex w-full max-w-md flex-col gap-3">
        <div class="flex flex-wrap gap-2">
          <Button
            size="sm"
            tone="outline"
            onmousedown={keepFocus}
            onclick={() =>
              files.insert(
                { type: "file", value: "README.md", label: "README.md" },
                { at: "end", resolve: loadFile() }
              )}
          >
            Attach README
          </Button>
          <Button
            size="sm"
            tone="outline"
            onmousedown={keepFocus}
            onclick={() => {
              const token = firstToken()
              if (token) files.updateToken(token.id!, { label: token.value })
            }}
          >
            Show path
          </Button>
          <Button
            size="sm"
            tone="outline"
            onmousedown={keepFocus}
            onclick={() => {
              const token = firstToken()
              if (token) files.removeToken(token.id!)
            }}
          >
            Remove first
          </Button>
          <Button size="sm" tone="outline" onmousedown={keepFocus} onclick={() => files.undo()}>
            Undo
          </Button>
          <Button size="sm" tone="outline" onmousedown={keepFocus} onclick={() => files.clear()}>
            Clear
          </Button>
        </div>
        <TokenInput controller={files} defaultValue={fileDraft}>
          {#snippet token(token)}
            <TokenInputToken>
              <FileText aria-hidden="true" />
              {token.label}
              <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
            </TokenInputToken>
          {/snippet}
          <TokenInputEditor aria-label="Prompt" />
        </TokenInput>
      </div>
    </Demo>

    <Demo
      title="Submit shortcut"
      description="With mod+enter, Enter starts a new line and Command or Control+Enter sends. An open suggestion menu or an active input method takes precedence over sending."
      code={submitCode}
    >
      <div class="flex w-full max-w-md flex-col gap-3">
        <TokenInput
          submitShortcut="mod+enter"
          onSubmit={(next) => (sent = [...sent, toLabel(next)])}
        >
          <TokenInputEditor aria-label="Message" />
        </TokenInput>
        {#each sent as message, index (index)}
          <p class="text-sm text-fg">{message}</p>
        {/each}
      </div>
    </Demo>

    <Demo
      title="Disabled and read-only"
      description="A disabled input can't be focused or changed and isn't submitted. A read-only one stays focusable and submitted, and its remove buttons hide."
      code={statesCode}
    >
      <div class="flex w-full max-w-md flex-col gap-4">
        <TokenInput disabled defaultValue={fileDraft}>
          {#snippet token(token)}
            <TokenInputToken>
              <FileText aria-hidden="true" />
              {token.label}
              <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
            </TokenInputToken>
          {/snippet}
          <TokenInputEditor aria-label="Disabled prompt" />
        </TokenInput>
        <TokenInput readOnly defaultValue={fileDraft}>
          {#snippet token(token)}
            <TokenInputToken>
              <FileText aria-hidden="true" />
              {token.label}
              <TokenInputTokenRemove><X aria-hidden="true" /></TokenInputTokenRemove>
            </TokenInputToken>
          {/snippet}
          <TokenInputEditor aria-label="Read-only prompt" />
        </TokenInput>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="tokenDeletion"
      rows={[
        { name: "whole", type: "default", description: "Backspace removes the token in one press." },
        { name: "select", type: "string", description: "The first press selects the token, the second removes it." },
        { name: "revert", type: "string", description: "Turns the token back into editable text, so a trigger menu opens on it again." },
      ]}
    />
    <PropsTable
      caption="submitShortcut"
      rows={[
        { name: "enter", type: "default", description: "Enter submits; Shift+Enter starts a new line." },
        { name: "mod+enter", type: "string", description: "Command or Control+Enter submits; Enter starts a new line." },
      ]}
    />
    <PropsTable
      caption="copy"
      rows={[
        { name: "codec", type: "default", description: "Copying writes [@label](type:value), so pasting into another app and back restores the tokens." },
        { name: "label", type: "string", description: "Copying writes what people read; pasting back into a token input still restores the tokens." },
      ]}
    />
    <PropsTable
      caption="State attributes for styling"
      rows={[
        { name: "data-empty", type: "editor", description: "The input holds nothing. The wrapper shows its hint text through this attribute." },
        { name: "data-disabled", type: "editor, token, remove", description: "Disabled by its own prop, a field or a fieldset." },
        { name: "data-readonly", type: "editor, token, remove", description: "Read-only. The remove button hides." },
        { name: "data-token-type", type: "token", description: "The token's type, like file or mention. Also on its host." },
        { name: "data-selected", type: "token", description: "In the selection, or selected for removal." },
        { name: "data-pending", type: "token", description: "The token is loading." },
        { name: "data-unresolved", type: "token", description: "The token needs the user, like an ambiguous mention." },
      ]}
    />
    <p class="text-sm text-muted">
      Without a <code class="font-mono text-accent">token</code> snippet, the element that holds each
      token (<code class="font-mono text-accent">data-slot="token-input-host"</code>) carries the same
      attributes, so you can style tokens without one.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <p class="text-sm text-muted">
      The root renders no element of its own: it holds the value, renders its children and adds a
      hidden textarea when it has a <code class="font-mono text-accent">name</code>. Every other part
      forwards all native attributes and the <code class="font-mono text-accent">render</code> and
      <code class="font-mono text-accent">children</code> snippets.
    </p>
    <PropsTable
      caption="TokenInput (root)"
      rows={[
        { name: "value", type: "TokenInputValue", description: "The value: text and tokens. Bind with bind:value to control." },
        { name: "defaultValue", type: "TokenInputValue", description: "The value at first, when uncontrolled. A form reset returns to it." },
        { name: "token", type: "Snippet<[Token]>", description: "Renders each token's content, usually a TokenInputToken. Without it, tokens show their label." },
        { name: "onValueChange", type: "(value, details) => void", description: "details.reason says why, details.inputType is the browser's input type, details.removed lists removed tokens, and details.cancel() stops the change." },
        { name: "onSubmit", type: "(value, details) => void", description: "Runs on the submit shortcut. Without it, the shortcut submits the form the input is in." },
        { name: "submitShortcut", type: '"enter" | "mod+enter"', default: '"enter"', description: "Which keys submit." },
        { name: "tokenDeletion", type: "TokenDeletion", default: '"whole"', description: "How Backspace and Delete treat a token next to the caret." },
        { name: "copy", type: '"codec" | "label"', default: '"codec"', description: "What copying writes as plain text." },
        { name: "codec", type: "TokenCodec", default: "[@label](type:value)", description: "How tokens become text and back, for the clipboard and forms." },
        { name: "getTokenDescription", type: "(token: Token) => string", description: "What a token says to screen readers besides its label. Defaults to the type, and loading while pending." },
        { name: "history", type: "UndoStackOptions", description: "How many undo steps it keeps, and how long a typing pause starts a new step." },
        { name: "disabled", type: "boolean", default: "false", description: "Can't be focused or changed, and isn't submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Focusable and submitted, but stops changes." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission while the input is empty." },
        { name: "name", type: "string", description: "The name the codec text submits under. Without one, the input submits nothing. Falls back to the field's name." },
        { name: "form", type: "string", description: "The id of a form to belong to, when the input isn't inside it." },
        { name: "controller", type: "TokenInputController", description: "Read, edit and focus from anywhere via createTokenInputController()." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="TokenInputEditor"
      rows={[
        { name: "aria-label", type: "string", description: "Names the editor when it isn't inside a Field with a FieldLabel." },
        { name: "class", type: "string", description: "Extra classes merged onto the editor (user wins)." },
        { name: "render", type: "Snippet", description: "Render your own element and spread props onto it." },
        { name: "children", type: "ignored", description: "The core owns the editor's content, so it takes no children." },
      ]}
    />
    <p class="text-sm text-muted">
      The editor also forwards ui-sdk's empty-state hint prop unchanged, and the wrapper already
      renders it through <code class="font-mono text-accent">data-empty</code>. Its name and the
      matching attribute selector are listed in the ui-sdk
      <code class="font-mono text-accent">token-input</code> reference under TokenInputEditor.
    </p>
    <PropsTable
      caption="TokenInputToken"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the chip." },
        { name: "children", type: "Snippet<[TokenInputTokenState]>", description: "The chip's content: an icon, the label and a remove part." },
        { name: "render", type: "Snippet", description: "Render your own element. Must stay inside the token snippet." },
      ]}
    />
    <PropsTable
      caption="TokenInputTokenRemove"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the remove part." },
        { name: "children", type: "Snippet", description: "Usually an X icon. Renders a span, hidden from assistive technology, since keyboard users remove tokens with Backspace." },
      ]}
    />
    <PropsTable
      caption="Token"
      rows={[
        { name: "type", type: "string", description: "Kind, like mention, file or skill." },
        { name: "value", type: "string", description: "The id it stands for." },
        { name: "label", type: "string", description: "The text it shows, reads as and falls back to." },
        { name: "id", type: "string", description: "Stable identity, generated when missing." },
        { name: "status", type: '"pending" | "unresolved"', description: "pending while it loads, unresolved when it needs the user." },
        { name: "data", type: "Record<string, unknown>", description: "What the chip renders from, like an icon or a run state. Never serialized." },
      ]}
    />
    <PropsTable
      caption="Controller"
      rows={[
        { name: "getValue()", type: "() => TokenInputValue", description: "The value: text and tokens." },
        { name: "setValue(value, options?)", type: "=> boolean", description: "Replaces the value as one undoable step." },
        { name: "getText(codec?)", type: "(TokenCodec?) => string", description: "The value as codec text." },
        { name: "getLabel()", type: "() => string", description: "The value as people read it." },
        { name: "insert(content, options?)", type: "=> boolean", description: "Inserts text, a token or a value at the caret, the end or a range. With resolve, a token stays pending until it settles and is removed if it rejects." },
        { name: "updateToken(id, patch)", type: "=> boolean", description: "Changes a token's status, data or label without an undo step or a caret move." },
        { name: "removeToken(id, options?)", type: "=> boolean", description: "Removes a token as one undoable step." },
        { name: "undo() / redo()", type: "() => boolean", description: "Steps through the editing history." },
        { name: "canUndo() / canRedo()", type: "() => boolean", description: "Whether there is a step to take." },
        { name: "clear(options?)", type: "=> boolean", description: "Empties the input as one undoable step." },
        { name: "focus(options?)", type: '({ at?: "start" | "end" }) => void', description: "Focuses the editor with the caret at its start or end." },
        { name: "editor", type: "TextEditorAdapter", description: "The editor a Trigger Menu outside the token input reads and writes." },
      ]}
    />
    <PropsTable
      caption="TokenCodec"
      rows={[
        { name: "format", type: "(token: Token) => string", description: "The text a token is written as." },
        { name: "parse", type: "(text: string) => TokenInputValue", description: "Text back into a value, with tokens wherever their text appears." },
        { name: "escape", type: "(text, next) => string", description: "How plain text is written so parse reads it back as text. Defaults to the text as is." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>The editor is a multiline text box: it has the <code class="font-mono text-accent">textbox</code> role with <code class="font-mono text-accent">aria-multiline</code>. A Trigger Menu inside it adds <code class="font-mono text-accent">aria-autocomplete</code> and <code class="font-mono text-accent">aria-haspopup</code>.</li>
      <li>Give it a visible label through a <a href="/docs/field" class="text-accent underline">Field</a>, or an <code class="font-mono text-accent">aria-label</code>.</li>
      <li>Each token reads as its label and its kind, like "routes.ts file", and inserting or removing one is announced. <code class="font-mono text-accent">getTokenDescription</code> changes what it says besides the label.</li>
      <li><span class="text-fg">Backspace</span> and <span class="text-fg">Delete</span> remove the token before or after the caret, as <code class="font-mono text-accent">tokenDeletion</code> says.</li>
      <li><span class="text-fg">ArrowLeft</span> and <span class="text-fg">ArrowRight</span> move the caret past a token in one press; the caret never stops inside one.</li>
      <li><span class="text-fg">Enter</span> submits, or chooses the highlighted suggestion while a trigger menu is open. <span class="text-fg">Shift+Enter</span> starts a new line. With <code class="font-mono text-accent">submitShortcut="mod+enter"</code>, <span class="text-fg">Command/Control+Enter</span> submits and Enter starts a new line.</li>
      <li><span class="text-fg">Command/Control+Z</span> undoes; <span class="text-fg">Shift+Command+Z</span> or <span class="text-fg">Control+Y</span> redoes. Typing is grouped; pastes and token changes are steps.</li>
      <li>The remove part is hidden from assistive technology on purpose: the keyboard's way to remove a token is Backspace, and pressing it keeps focus in the editor.</li>
      <li>Typing keeps the browser's spelling, autocorrect and input method support. Enter while an input method composes doesn't submit.</li>
    </ul>
  </Section>
</div>