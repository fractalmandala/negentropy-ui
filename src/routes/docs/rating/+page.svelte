<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import { Rating, RatingItem } from "#lib/components/rating"
  import { Button } from "#lib/components/button"
  import { Star } from "@lucide/svelte"

  const installCode = `import { Rating, RatingItem } from "#lib/components/rating"`

  const usageCode = `<script lang="ts">
  import { Star } from "@lucide/svelte"
  import { Rating, RatingItem } from "#lib/components/rating"
<\/script>

<Rating aria-label="Rating" defaultValue={3}>
  <RatingItem>
    <Star aria-hidden="true" />
  </RatingItem>
</Rating>`

  const halfCode = `<script lang="ts">
  import { Star } from "@lucide/svelte"
  import { Rating, RatingItem } from "#lib/components/rating"
<\/script>

<Rating aria-label="Rating" step={0.5} defaultValue={3.5}>
  <RatingItem>
    <Star aria-hidden="true" />
  </RatingItem>
</Rating>`

  const controlledCode = `<script lang="ts">
  import { Star } from "@lucide/svelte"
  import { Rating, RatingItem } from "#lib/components/rating"
  import { Button } from "#lib/components/button"

  let value = $state<number | null>(4)
<\/script>

<div class="space-y-3">
  <div class="flex items-center gap-3">
    <Button size="sm" tone="outline" onclick={() => (value = null)}>Clear</Button>
    <span class="text-sm text-muted">Score: {value ?? "none"}</span>
  </div>
  <Rating aria-label="Rating" bind:value>
    <RatingItem>
      <Star aria-hidden="true" />
    </RatingItem>
  </Rating>
</div>`

  const readOnlyCode = `<script lang="ts">
  import { Star } from "@lucide/svelte"
  import { Rating, RatingItem } from "#lib/components/rating"
<\/script>

<Rating
  value={4.2}
  readOnly
  getValueLabel={(value, max) => \`Rated \${value} out of \${max}\`}
>
  <RatingItem>
    <Star aria-hidden="true" />
  </RatingItem>
</Rating>`

  const sizesCode = `<script lang="ts">
  import { Star } from "@lucide/svelte"
  import { Rating, RatingItem } from "#lib/components/rating"
<\/script>

<div class="flex flex-col items-start gap-3">
  <Rating aria-label="Small rating" defaultValue={3}>
    <RatingItem size="sm"><Star aria-hidden="true" /></RatingItem>
  </Rating>
  <Rating aria-label="Medium rating" defaultValue={3}>
    <RatingItem size="md"><Star aria-hidden="true" /></RatingItem>
  </Rating>
  <Rating aria-label="Large rating" defaultValue={3}>
    <RatingItem size="lg"><Star aria-hidden="true" /></RatingItem>
  </Rating>
</div>`

  let score = $state<number | null>(4)
</script>

<svelte:head>
  <title>Rating — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Rating"
  description="Pick a score from a row of stars, whole or half, with a preview as the pointer moves over them. Wraps the ui-sdk Rating, a radio group with one tab stop."
  entry="@ui-sdk/svelte/rating"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/rating</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Put one <code class="font-mono text-accent">RatingItem</code> inside the root with your icon in
      it — the root renders its content once per star. The item paints the icon up to
      <code class="font-mono text-accent">--rating-fill</code> with a gradient behind a star-shaped
      mask, so half stars and averages fill partially. Name the rating with
      <code class="font-mono text-accent">aria-label</code> or a Field label.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Choose a star, then use the arrow keys to change the score." code={usageCode}>
      <Rating aria-label="Rating" defaultValue={3}>
        <RatingItem>
          <Star aria-hidden="true" />
        </RatingItem>
      </Rating>
    </Demo>

    <Demo title="Half stars" description="step={0.5} splits each star in two; each half is its own radio." code={halfCode}>
      <Rating aria-label="Rating" step={0.5} defaultValue={3.5}>
        <RatingItem>
          <Star aria-hidden="true" />
        </RatingItem>
      </Rating>
    </Demo>

    <Demo title="Controlled" description="bind:value controls the score; Clear writes null from outside." code={controlledCode}>
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <Button size="sm" tone="outline" onclick={() => (score = null)}>Clear</Button>
          <span class="text-sm text-muted">Score: {score ?? "none"}</span>
        </div>
        <Rating aria-label="Rating" bind:value={score}>
          <RatingItem>
            <Star aria-hidden="true" />
          </RatingItem>
        </Rating>
      </div>
    </Demo>

    <Demo title="Read-only" description="Any score shows, like an average of 4.2; the rating becomes one image for screen readers." code={readOnlyCode}>
      <Rating
        value={4.2}
        readOnly
        getValueLabel={(value, max) => `Rated ${value} out of ${max}`}
      >
        <RatingItem>
          <Star aria-hidden="true" />
        </RatingItem>
      </Rating>
    </Demo>

    <Demo title="Sizes" description="size on RatingItem scales the icon; the fill mask follows." code={sizesCode}>
      <div class="flex flex-col items-start gap-3">
        <Rating aria-label="Small rating" defaultValue={3}>
          <RatingItem size="sm"><Star aria-hidden="true" /></RatingItem>
        </Rating>
        <Rating aria-label="Medium rating" defaultValue={3}>
          <RatingItem size="md"><Star aria-hidden="true" /></RatingItem>
        </Rating>
        <Rating aria-label="Large rating" defaultValue={3}>
          <RatingItem size="lg"><Star aria-hidden="true" /></RatingItem>
        </Rating>
      </div>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="RatingItem size"
      rows={[
        { name: "sm", type: "string", description: "16px stars for dense rows." },
        { name: "md", type: "default", description: "24px stars." },
        { name: "lg", type: "string", description: "32px stars for emphasis." },
      ]}
    />
    <p class="text-sm text-muted">
      State attributes on each star: <code class="font-mono text-accent">data-filled</code> (whole),
      <code class="font-mono text-accent">data-partial</code> (the score ends partway through),
      <code class="font-mono text-accent">data-checked</code> (the score ends in this star),
      <code class="font-mono text-accent">data-highlighted</code> (pointer preview),
      <code class="font-mono text-accent">data-disabled</code> and
      <code class="font-mono text-accent">data-readonly</code>. The root carries
      <code class="font-mono text-accent">data-disabled</code>,
      <code class="font-mono text-accent">data-readonly</code> and
      <code class="font-mono text-accent">data-required</code>.
    </p>
    <p class="text-sm text-muted">
      <code class="font-mono text-accent">--rating-fill</code> on each item goes from 0 to 1: how much
      of the star the shown score covers. The wrapper paints it with a gradient masked by the star
      shape; the preview recolors the fill via <code class="font-mono text-accent">data-highlighted</code>.
      In right-to-left the gradient fills from the right.
    </p>
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Rating (root)"
      rows={[
        { name: "value", type: "number | null", description: "The score; null means no score yet. Bind with bind:value to control." },
        { name: "defaultValue", type: "number | null", description: "Initial score when uncontrolled. A form reset returns to it." },
        { name: "max", type: "number", default: "5", description: "How many stars there are." },
        { name: "step", type: "number", default: "1", description: "The smallest change as a fraction of a star; 0.5 makes half stars." },
        { name: "deselectable", type: "boolean", default: "false", description: "A press on the checked star, or Space on it, clears the score to null." },
        { name: "disabled", type: "boolean", default: "false", description: "No star can be focused or changed, and nothing is submitted." },
        { name: "readOnly", type: "boolean", default: "false", description: "Shows the score as an image named by getValueLabel; any score shows, like 4.2." },
        { name: "required", type: "boolean", default: "false", description: "Blocks form submission until there's a score." },
        { name: "name", type: "string", description: "The name the score submits under. Without one, nothing submits." },
        { name: "form", type: "string", description: "Id of a form to belong to, when outside it." },
        { name: "loop", type: "boolean", default: "false", description: "Arrow keys wrap from the last star to the first." },
        { name: "getValueLabel", type: "(value, max) => string", description: "Names a score for each radio and for a read-only rating. Defaults to \"N stars\"." },
        { name: "onValueChange", type: "(value, details) => void", description: "Runs when the score wants to change. details.reason says why; details.cancel() stops it." },
        { name: "controller", type: "RatingController", description: "Set the score from anywhere via createRatingController()." },
        { name: "aria-label", type: "string", description: "Names the radio group when no Field label names it." },
      ]}
    />
    <PropsTable
      caption="RatingItem"
      rows={[
        { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Icon size; the fill mask scales with it." },
        { name: "children", type: "Snippet<[RatingItemState]>", description: "The icon. State carries index (from 1), fill, checked, highlighted, disabled and readOnly." },
        { name: "render", type: "Snippet", description: "Replace the star element; receives props, state and children. The radios that pick the score sit over it." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>A rating is a radio group following the WAI-ARIA radio group pattern: each star holds a <code class="font-mono text-accent">role="radio"</code> button per score it can pick, plus a hidden native radio for forms. One tab stop for the whole group.</li>
      <li><span class="text-fg">Tab</span> enters on the checked star, or the first one; <span class="text-fg">arrow keys</span> move and check the next or previous score, stopping at the ends unless <code class="font-mono text-accent">loop</code> is set.</li>
      <li><span class="text-fg">Space</span> checks the focused star, or clears it when checked and <code class="font-mono text-accent">deselectable</code>; <span class="text-fg">Enter</span> submits its form.</li>
      <li>Hide icons with <code class="font-mono text-accent">aria-hidden</code> — each radio is already named by <code class="font-mono text-accent">getValueLabel</code>, like "2.5 stars".</li>
      <li>A read-only rating has the <code class="font-mono text-accent">img</code> role instead; name it with <code class="font-mono text-accent">getValueLabel</code> so the name includes the score. An <code class="font-mono text-accent">aria-label</code> would replace it.</li>
      <li>Touch has no hover preview: a tap picks the score at once. Pointer preview recolors stars with <code class="font-mono text-accent">data-highlighted</code> and restores the score on leave.</li>
    </ul>
  </Section>
</div>