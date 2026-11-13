<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "$lib/docs"
  // import { __NAME__ } from "$lib/components/__SLUG__"

  const installCode = `import { __NAME__ } from "$lib/components/__SLUG__"`
  const usageCode = `<!-- basic usage -->`
</script>

<PageHeader
  title="__NAME__"
  description="__NAME__ component."
  entry="@ui-sdk/svelte/__SLUG__"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      __NAME__ wraps <code class="font-mono text-accent">@ui-sdk/svelte/__SLUG__</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" code={usageCode}>
      <!-- live demo 1 -->
    </Demo>
    <Demo title="Second" code={usageCode}>
      <!-- live demo 2 -->
    </Demo>
    <Demo title="Third" code={usageCode}>
      <!-- live demo 3 -->
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <!-- variant / size / state matrix -->
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="__NAME__"
      rows={[{ name: "class", type: "string", description: "Extra classes merged onto the element." }]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <!-- keyboard + ARIA from the ui-sdk docs -->
  </Section>
</div>