<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  import { Avatar, AvatarImage, AvatarFallback, type AvatarLoadingStatus } from "$lib/components/avatar"
  import { User } from "@lucide/svelte"

  const ada =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="seagreen"/><text x="48" y="62" text-anchor="middle" font-family="sans-serif" font-size="36" fill="white">AL</text></svg>',
    )

  // Intentionally undecodable, so the image errors and the fallback stays.
  const missing = "data:image/png;base64,broken"

  const installCode = `import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/avatar"`

  const usageCode = `<script lang="ts">
  import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/avatar"

  const ada =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="seagreen"/><text x="48" y="62" text-anchor="middle" font-family="sans-serif" font-size="36" fill="white">AL</text></svg>',
    )
<\/script>

<Avatar>
  <AvatarImage src={ada} alt="Ada Lovelace" />
  <AvatarFallback>AL</AvatarFallback>
</Avatar>`

  const sizesCode = `<Avatar size="sm"><AvatarFallback>AL</AvatarFallback></Avatar>
<Avatar size="md"><AvatarFallback>AL</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>AL</AvatarFallback></Avatar>
<Avatar size="xl"><AvatarFallback>AL</AvatarFallback></Avatar>`

  const statusCode = `<script lang="ts">
  import type { AvatarLoadingStatus } from "$lib/components/avatar"
  let status = $state<AvatarLoadingStatus>("idle")
  const missing = "data:image/png;base64,broken"
<\/script>

<Avatar onLoadingStatusChange={(next) => (status = next)}>
  <AvatarImage src={missing} alt="Ada Lovelace" />
  <AvatarFallback>
    {#snippet children(state)}
      {state.loadingStatus === "error" ? "?" : "AL"}
    {/snippet}
  </AvatarFallback>
</Avatar>
<p>loadingStatus: {status}</p>`

  const delayCode = `<Avatar>
  <AvatarImage src={ada} alt="Ada Lovelace" />
  <AvatarFallback delay={600}>AL</AvatarFallback>
</Avatar>`

  const interactiveCode = `<script lang="ts">
  let opened = $state("")
<\/script>

<Avatar class="cursor-pointer" onclick={() => (opened = "Ada Lovelace")}>
  {#snippet render({ props, state, children })}
    <button {...props} type="button" aria-label="Open Ada Lovelace's profile">
      {@render children?.(state)}
    </button>
  {/snippet}
  <AvatarImage src={ada} alt="" />
  <AvatarFallback aria-hidden="true">AL</AvatarFallback>
</Avatar>
<p>{opened ? "Opened " + opened : "No profile opened yet"}</p>`

  let status = $state<AvatarLoadingStatus>("idle")
  let opened = $state("")
</script>

<svelte:head>
  <title>Avatar — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Avatar"
  description="An image with initials or an icon while it loads, and after it fails. Wraps the ui-sdk Avatar, which shares one loading status between the image and its fallback and renders a real img so the browser can fetch it before hydration."
  entry="@ui-sdk/svelte/avatar"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/avatar</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put the image and the fallback inside the root. The fallback shows until the image loads and
      stays if it fails. The demos use an inline SVG data URI as a local portrait, so nothing is
      fetched from the network.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="The image replaces the initials once it loads." code={usageCode}>
      <Avatar>
        <AvatarImage src={ada} alt="Ada Lovelace" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>GH</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback><User aria-hidden="true" /></AvatarFallback>
      </Avatar>
    </Demo>

    <Demo title="Sizes" description="size sets the box; the image and fallback fill it." code={sizesCode}>
      <Avatar size="sm"><AvatarFallback>AL</AvatarFallback></Avatar>
      <Avatar size="md"><AvatarFallback>AL</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>AL</AvatarFallback></Avatar>
      <Avatar size="xl"><AvatarFallback>AL</AvatarFallback></Avatar>
    </Demo>

    <Demo
      title="Loading status"
      description="A source that fails keeps the fallback. Every part receives loadingStatus, so the fallback can say something different on error."
      code={statusCode}
    >
      <div class="flex flex-col items-center gap-3">
        <Avatar onLoadingStatusChange={(next) => (status = next)}>
          <AvatarImage src={missing} alt="Ada Lovelace" />
          <AvatarFallback>
            {#snippet children(state)}
              {state.loadingStatus === "error" ? "?" : "AL"}
            {/snippet}
          </AvatarFallback>
        </Avatar>
        <p class="font-mono text-xs text-muted">loadingStatus: {status}</p>
      </div>
    </Demo>

    <Demo
      title="Fallback delay"
      description="delay waits before showing the fallback, so a fast image appears without initials flashing first."
      code={delayCode}
    >
      <Avatar>
        <AvatarImage src={ada} alt="Ada Lovelace" />
        <AvatarFallback delay={600}>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={missing} alt="Grace Hopper" />
        <AvatarFallback delay={600}>GH</AvatarFallback>
      </Avatar>
    </Demo>

    <Demo
      title="Interactive"
      description="The render snippet turns the root into a button. Its accessible name stays available while the image loads."
      code={interactiveCode}
    >
      <div class="flex flex-col items-center gap-3">
        <Avatar class="cursor-pointer" onclick={() => (opened = "Ada Lovelace")}>
          {#snippet render({ props, state, children })}
            <button {...props} type="button" aria-label="Open Ada Lovelace's profile">
              {@render children?.(state)}
            </button>
          {/snippet}
          <AvatarImage src={ada} alt="" />
          <AvatarFallback aria-hidden="true">AL</AvatarFallback>
        </Avatar>
        <p class="text-xs text-muted">{opened ? "Opened " + opened : "No profile opened yet"}</p>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Avatar size"
      rows={[
        { name: "sm", type: "string", default: "size-8", description: "Compact — comment threads and dense lists." },
        { name: "md", type: "default", default: "size-10", description: "Default — member lists and account menus." },
        { name: "lg", type: "string", default: "size-12", description: "Prominent — profile headers." },
        { name: "xl", type: "string", default: "size-16", description: "Large — a single account card." },
      ]}
    />
    <PropsTable
      caption="data-loading-status (every part)"
      rows={[
        { name: "idle", type: "string", description: "No image source yet." },
        { name: "loading", type: "string", description: "The image has a source and is fetching." },
        { name: "loaded", type: "string", description: "The image loaded and replaced the fallback." },
        { name: "error", type: "string", description: "The image failed or has no source; the fallback stays." },
      ]}
    />
    <p class="text-sm text-muted">
      The wrapper tints the root with <code class="font-mono text-accent">bg-accent-soft</code> on
      <code class="font-mono text-accent">data-[loading-status=error]</code>. Override any of it with
      <code class="font-mono text-accent">class</code>, which always wins.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Avatar (root)"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: "Negentropy prop: the box size. Image and fallback fill it." },
        { name: "onLoadingStatusChange", type: "(status, details) => void", description: 'Runs on "loading", "loaded", "error" and "idle". details.reason is image-load, image-error or src-change; details.event is the load/error event, or undefined when known at once.' },
        { name: "debug", type: "boolean", default: "false", description: "Logs every status change with its reason in development." },
        { name: "class", type: "string", description: "Extra classes merged onto the root (user wins)." },
        { name: "render", type: "Snippet<[{ props, state, children }]>", description: "Swap the root element, e.g. a button. Spread props onto it." },
      ]}
    />
    <PropsTable
      caption="AvatarImage"
      rows={[
        { name: "src", type: "string", description: "The image source. A real img, so fetching starts before hydration." },
        { name: "alt", type: "string", description: "Alternative text. Use an empty alt when a visible name already identifies the person." },
        { name: "srcset / sizes", type: "string", description: "Responsive sources, passed to the same img." },
        { name: "loading", type: '"eager" | "lazy"', description: 'Use "lazy" for avatars farther down the page.' },
        { name: "crossorigin / referrerpolicy", type: "string", description: "Fetch credentials and referrer policy, applied before the source." },
      ]}
    />
    <PropsTable
      caption="AvatarFallback"
      rows={[
        { name: "delay", type: "number", default: "0", description: "Milliseconds to wait before showing, so a fast image never flashes initials. Without it the fallback shows at once, server markup included." },
        { name: "children", type: "Snippet<[AvatarState]>", description: "Initials or an icon. Receives loadingStatus to vary the content on error." },
        { name: "class", type: "string", description: "Extra classes merged onto the fallback." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Give the image meaningful <code class="font-mono text-accent">alt</code> text. Include the person's name in the fallback too, with visually hidden text if you only show initials.</li>
      <li>When a visible name beside the avatar already identifies the person, use an empty <code class="font-mono text-accent">alt</code> and hide decorative fallback content with <code class="font-mono text-accent">aria-hidden="true"</code>.</li>
      <li>The fallback is not a live region: a screen reader reads the name in either state, because both the image and the fallback carry it.</li>
      <li>An interactive avatar renders a real <code class="font-mono text-accent">&lt;button&gt;</code> through <code class="font-mono text-accent">render</code>, with an <code class="font-mono text-accent">aria-label</code> that stays available while the image loads. It responds to <span class="text-fg">Enter</span> and <span class="text-fg">Space</span>.</li>
      <li>The root is a <code class="font-mono text-accent">span</code> by default and is not focusable; nothing traps focus or announces loading on its own.</li>
    </ul>
  </Section>
</div>