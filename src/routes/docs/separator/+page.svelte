<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { Separator } from "#lib/components/separator"
  import { Button } from "#lib/components/button"

  const installCode = `import { Separator } from "#lib/components/separator"`

  const usageCode = `<script lang="ts">
  import { Separator } from "#lib/components/separator"
<\/script>

<div class="space-y-3">
  <div>
    <h3 class="text-sm font-semibold text-fg">Hollis Grant</h3>
    <p class="text-sm text-muted">hollis@example.com</p>
  </div>
  <Separator />
  <p class="text-sm text-muted">
    Designs the billing and onboarding flows, and reviews every new pricing page.
  </p>
</div>`

  const verticalCode = `<nav aria-label="Legal" class="flex items-center gap-3 text-sm">
  <a class="text-muted hover:text-accent" href="/docs/separator">Privacy</a>
  <Separator orientation="vertical" />
  <a class="text-muted hover:text-accent" href="/docs/separator">Terms</a>
  <Separator orientation="vertical" />
  <a class="text-muted hover:text-accent" href="/docs/separator">Cookies</a>
</nav>`

  const statsCode = `<div class="flex items-center gap-4">
  <div class="text-center">
    <div class="text-lg font-semibold text-fg">24</div>
    <div class="text-xs text-muted">Projects</div>
  </div>
  <Separator orientation="vertical" />
  <div class="text-center">
    <div class="text-lg font-semibold text-fg">1,280</div>
    <div class="text-xs text-muted">Followers</div>
  </div>
  <Separator orientation="vertical" />
  <div class="text-center">
    <div class="text-lg font-semibold text-fg">312</div>
    <div class="text-xs text-muted">Following</div>
  </div>
</div>`

  const decorativeCode = `<div class="w-full max-w-xs space-y-3">
  <Button class="w-full">Sign in with passkey</Button>
  <div class="flex items-center gap-3">
    <Separator decorative />
    <span class="text-xs text-faint">or</span>
    <Separator decorative />
  </div>
  <Button tone="outline" class="w-full">Email me a link</Button>
</div>`

  const dashedCode = `<div class="w-full max-w-xs space-y-3 text-sm">
  <div class="flex justify-between"><span class="text-muted">Plan</span><span class="text-fg">Pro</span></div>
  <Separator variant="dashed" />
  <div class="flex justify-between"><span class="text-muted">Seats</span><span class="text-fg">8 of 10</span></div>
  <Separator variant="dashed" />
  <div class="flex justify-between"><span class="text-muted">Renews</span><span class="text-fg">December 1, 2026</span></div>
</div>`

  const rowsCode = `<div class="w-full max-w-xs text-sm">
  <div class="flex justify-between py-2"><span class="text-muted">Plan</span><span class="text-fg">Pro</span></div>
  <Separator />
  <div class="flex justify-between py-2"><span class="text-muted">Seats</span><span class="text-fg">8 of 10</span></div>
  <Separator />
  <div class="flex justify-between py-2"><span class="text-muted">Renews</span><span class="text-fg">December 1, 2026</span></div>
</div>`
</script>

<svelte:head>
  <title>Separator — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Separator"
  description="Divide groups of content with a horizontal or vertical line. Wraps the ui-sdk Separator, which carries the separator role and its orientation, or hides itself from assistive technology when decorative."
  entry="@ui-sdk/svelte/separator"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the separator from Negentropy UI. It wraps
      <code class="font-mono text-accent">@ui-sdk/svelte/separator</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put a separator between two groups of content a reader should take as separate. A horizontal
      separator takes the full width of its container; a vertical one stretches to its row's height.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo
      title="Basic"
      description="A horizontal line between a profile's header and its bio. A screen reader announces it."
      code={usageCode}
    >
      <div class="w-full max-w-sm space-y-3">
        <div>
          <h3 class="text-sm font-semibold text-fg">Hollis Grant</h3>
          <p class="text-sm text-muted">hollis@example.com</p>
        </div>
        <Separator />
        <p class="text-sm text-muted">
          Designs the billing and onboarding flows, and reviews every new pricing page.
        </p>
      </div>
    </Demo>

    <Demo
      title="Vertical"
      description="orientation='vertical' divides items in a row and takes the row's height."
      code={verticalCode}
    >
      <nav aria-label="Legal" class="flex items-center gap-3 text-sm">
        <a class="text-muted hover:text-accent" href="/docs/separator">Privacy</a>
        <Separator orientation="vertical" />
        <a class="text-muted hover:text-accent" href="/docs/separator">Terms</a>
        <Separator orientation="vertical" />
        <a class="text-muted hover:text-accent" href="/docs/separator">Cookies</a>
      </nav>
    </Demo>

    <Demo
      title="Stacked content"
      description="A vertical separator stretches to the tallest item, so it spans a number and its label."
      code={statsCode}
    >
      <div class="flex items-center gap-4">
        <div class="text-center">
          <div class="text-lg font-semibold text-fg">24</div>
          <div class="text-xs text-muted">Projects</div>
        </div>
        <Separator orientation="vertical" />
        <div class="text-center">
          <div class="text-lg font-semibold text-fg">1,280</div>
          <div class="text-xs text-muted">Followers</div>
        </div>
        <Separator orientation="vertical" />
        <div class="text-center">
          <div class="text-lg font-semibold text-fg">312</div>
          <div class="text-xs text-muted">Following</div>
        </div>
      </div>
    </Demo>

    <Demo
      title="Decorative"
      description="decorative hides the lines from assistive technology: the word 'or' already says the two ways are separate."
      code={decorativeCode}
    >
      <div class="w-full max-w-xs space-y-3">
        <Button class="w-full">Sign in with passkey</Button>
        <div class="flex items-center gap-3">
          <Separator decorative />
          <span class="text-xs text-faint">or</span>
          <Separator decorative />
        </div>
        <Button tone="outline" class="w-full">Email me a link</Button>
      </div>
    </Demo>

    <Demo
      title="Dashed"
      description="variant='dashed' draws a dashed rule instead of a filled one, in either orientation."
      code={dashedCode}
    >
      <div class="w-full max-w-xs space-y-3 text-sm">
        <div class="flex justify-between"><span class="text-muted">Plan</span><span class="text-fg">Pro</span></div>
        <Separator variant="dashed" />
        <div class="flex justify-between"><span class="text-muted">Seats</span><span class="text-fg">8 of 10</span></div>
        <Separator variant="dashed" />
        <div class="flex justify-between"><span class="text-muted">Renews</span><span class="text-fg">December 1, 2026</span></div>
      </div>
    </Demo>

    <Demo title="Rows" description="A separator between each pair of rows divides a list of details." code={rowsCode}>
      <div class="w-full max-w-xs text-sm">
        <div class="flex justify-between py-2"><span class="text-muted">Plan</span><span class="text-fg">Pro</span></div>
        <Separator />
        <div class="flex justify-between py-2"><span class="text-muted">Seats</span><span class="text-fg">8 of 10</span></div>
        <Separator />
        <div class="flex justify-between py-2"><span class="text-muted">Renews</span><span class="text-fg">December 1, 2026</span></div>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="Separator variant"
      rows={[
        { name: "solid", type: "default", description: "A filled 1px line in the border token." },
        { name: "dashed", type: "string", description: "A dashed 1px rule in the border token." },
      ]}
    />
    <PropsTable
      caption="orientation"
      rows={[
        { name: "horizontal", type: "default", description: "Full width, 1px tall. Divides stacked groups." },
        { name: "vertical", type: "string", description: "1px wide, stretched to the row's height. Divides items in a row." },
      ]}
    />
    <PropsTable
      caption="Semantics"
      rows={[
        { name: "default", type: 'role="separator"', description: "Announced with aria-orientation. Use when the division carries meaning." },
        { name: "decorative", type: 'role="none"', description: "Skipped by screen readers. Use only when surrounding content already conveys the division." },
      ]}
    />
    <p class="text-sm text-muted">
      The only state attribute is <code class="font-mono text-accent">data-orientation</code>
      (<code class="font-mono text-accent">horizontal</code> or <code class="font-mono text-accent">vertical</code>),
      which the wrapper styles from. A decorative separator keeps it for styling but drops
      <code class="font-mono text-accent">aria-orientation</code>.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Separator"
      rows={[
        { name: "variant", type: '"solid" | "dashed"', default: '"solid"', description: "Negentropy visual style." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which way the line runs." },
        { name: "decorative", type: "boolean", default: "false", description: 'Hides it from assistive technology with role="none", for a line that is only visual.' },
        { name: "class", type: "string", description: "Extra classes merged onto the element (user wins)." },
        { name: "render", type: "Snippet", description: "Swap the element, e.g. an hr, spreading the supplied props." },
        { name: "debug", type: "boolean", default: "false", description: "Logs state changes with their reason in development." },
      ]}
    />
    <PropsTable
      caption="State (snippets)"
      rows={[
        { name: "orientation", type: '"horizontal" | "vertical"', description: "Which way the line runs." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA separator role: a meaningful divider is announced as <code class="font-mono text-accent">role="separator"</code> with its <code class="font-mono text-accent">aria-orientation</code>.</li>
      <li>A separator never takes focus, so <span class="text-fg">Tab</span> moves past it. There are no keyboard interactions.</li>
      <li>Set <code class="font-mono text-accent">decorative</code> only when the surrounding content already conveys the division, such as an "or" between two sign-in options. It then gets <code class="font-mono text-accent">role="none"</code> and no <code class="font-mono text-accent">aria-orientation</code>.</li>
      <li>Leave <code class="font-mono text-accent">decorative</code> off when the separator divides content a screen reader should hear as separate, like groups of menu items or rows of details.</li>
      <li>A vertical separator needs a row with a height to stretch into; give its container <code class="font-mono text-accent">flex items-center</code> or a fixed height.</li>
    </ul>
  </Section>
</div>