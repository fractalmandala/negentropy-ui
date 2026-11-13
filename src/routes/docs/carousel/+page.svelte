<script lang="ts">
  import { PageHeader, Section, Demo, CodeBlock, PropsTable } from "#lib/docs"
  import {
    Carousel,
    CarouselViewport,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    CarouselIndicatorGroup,
    CarouselIndicator,
    CarouselPlayToggle,
  } from "#lib/components/carousel"
  import { Button } from "#lib/components/button"
  import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Play, Pause } from "@lucide/svelte"

  const slides = [
    { name: "Dunes", tone: "bg-accent-soft text-accent" },
    { name: "Forest", tone: "bg-elevated text-fg" },
    { name: "Glacier", tone: "bg-accent-soft text-accent" },
    { name: "Canyon", tone: "bg-elevated text-fg" },
    { name: "Meadow", tone: "bg-accent-soft text-accent" },
    { name: "Harbor", tone: "bg-elevated text-fg" },
  ]

  const installCode = `import {
  Carousel, CarouselViewport, CarouselContent, CarouselItem,
  CarouselPrevious, CarouselNext, CarouselIndicatorGroup,
  CarouselIndicator, CarouselPlayToggle,
} from "#lib/components/carousel"`

  const usageCode = `<script lang="ts">
  import { ChevronLeft, ChevronRight } from "@lucide/svelte"
  import {
    Carousel, CarouselViewport, CarouselContent, CarouselItem,
    CarouselPrevious, CarouselNext,
  } from "#lib/components/carousel"

  const slides = [
    { name: "Dunes", tone: "bg-accent-soft text-accent" },
    { name: "Forest", tone: "bg-elevated text-fg" },
    { name: "Glacier", tone: "bg-accent-soft text-accent" },
    { name: "Canyon", tone: "bg-elevated text-fg" },
    { name: "Meadow", tone: "bg-accent-soft text-accent" },
    { name: "Harbor", tone: "bg-elevated text-fg" },
  ]
<\/script>

<Carousel aria-label="Featured" class="max-w-md">
  <div class="flex items-center gap-2">
    <CarouselPrevious aria-label="Previous slide"><ChevronLeft /></CarouselPrevious>
    <CarouselViewport class="flex-1">
      <CarouselContent>
        {#each slides as slide (slide.name)}
          <CarouselItem>
            <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
          </CarouselItem>
        {/each}
      </CarouselContent>
    </CarouselViewport>
    <CarouselNext aria-label="Next slide"><ChevronRight /></CarouselNext>
  </div>
</Carousel>`

  const indicatorsCode = `<Carousel aria-label="Photos" class="max-w-md">
  <CarouselViewport>
    <CarouselContent>
      {#each slides as slide (slide.name)}
        <CarouselItem>
          <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
        </CarouselItem>
      {/each}
    </CarouselContent>
  </CarouselViewport>
  <CarouselIndicatorGroup aria-label="Choose a photo">
    {#each slides as slide, index (slide.name)}
      <CarouselIndicator page={index + 1} aria-label={slide.name} />
    {/each}
  </CarouselIndicatorGroup>
</Carousel>`

  const controlledCode = `<script lang="ts">
  let page = $state(1)
  let reason = $state("")
<\/script>

<div class="flex items-center gap-2">
  <Button size="sm" tone="outline" onclick={() => (page = 1)}>First</Button>
  <Button size="sm" tone="outline" onclick={() => (page = 3)}>Third</Button>
  <Button size="sm" tone="outline" onclick={() => (page = slides.length)}>Last</Button>
</div>
<Carousel
  bind:page
  aria-label="Featured"
  class="max-w-md"
  onPageChange={(next, details) => (reason = details.reason)}
>
  <div class="flex items-center gap-2">
    <CarouselPrevious aria-label="Previous slide"><ChevronLeft /></CarouselPrevious>
    <CarouselViewport class="flex-1">
      <CarouselContent>
        {#each slides as slide (slide.name)}
          <CarouselItem>
            <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
          </CarouselItem>
        {/each}
      </CarouselContent>
    </CarouselViewport>
    <CarouselNext aria-label="Next slide"><ChevronRight /></CarouselNext>
  </div>
</Carousel>
<p>page {page} · {reason || "no change yet"}</p>`

  const pagesCode = `<Carousel aria-label="Products" slidesPerPage={3} class="max-w-lg">
  <div class="flex items-center gap-2">
    <CarouselPrevious aria-label="Previous page"><ChevronLeft /></CarouselPrevious>
    <CarouselViewport class="flex-1">
      <CarouselContent>
        {#each slides as slide (slide.name)}
          <CarouselItem class="basis-[calc((100%_-_2rem)/3)]">
            <div class="flex aspect-square items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
          </CarouselItem>
        {/each}
      </CarouselContent>
    </CarouselViewport>
    <CarouselNext aria-label="Next page"><ChevronRight /></CarouselNext>
  </div>
  <CarouselIndicatorGroup aria-label="Choose a page">
    {#snippet children(state)}
      {#each { length: state.pageCount ?? 2 }, index (index)}
        <CarouselIndicator page={index + 1} aria-label={"Page " + (index + 1)} />
      {/each}
    {/snippet}
  </CarouselIndicatorGroup>
</Carousel>`

  const verticalCode = `<Carousel aria-label="Featured" orientation="vertical" class="max-w-xs">
  <CarouselViewport>
    <CarouselContent>
      {#each slides as slide (slide.name)}
        <CarouselItem>
          <div class="flex h-full items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
        </CarouselItem>
      {/each}
    </CarouselContent>
  </CarouselViewport>
  <div class="flex items-center justify-center gap-2">
    <CarouselPrevious aria-label="Previous slide"><ChevronUp /></CarouselPrevious>
    <CarouselNext aria-label="Next slide"><ChevronDown /></CarouselNext>
  </div>
</Carousel>`

  const autoplayCode = `<Carousel aria-label="Featured" loop defaultPlaying interval={3000} class="max-w-md">
  <div class="flex justify-center">
    <CarouselPlayToggle>
      {#snippet children(state)}
        {#if state.playing}<Pause aria-hidden="true" /> Pause{:else}<Play aria-hidden="true" /> Play{/if}
      {/snippet}
    </CarouselPlayToggle>
  </div>
  <div class="flex items-center gap-2">
    <CarouselPrevious aria-label="Previous slide"><ChevronLeft /></CarouselPrevious>
    <CarouselViewport class="flex-1">
      <CarouselContent>
        {#each slides as slide (slide.name)}
          <CarouselItem>
            <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
          </CarouselItem>
        {/each}
      </CarouselContent>
    </CarouselViewport>
    <CarouselNext aria-label="Next slide"><ChevronRight /></CarouselNext>
  </div>
  <div class="h-1 overflow-hidden rounded-full bg-line">
    <div class="h-full w-full origin-left scale-x-[var(--carousel-progress)] bg-accent"></div>
  </div>
</Carousel>`

  let page = $state(1)
  let reason = $state("")
</script>

<svelte:head>
  <title>Carousel — Negentropy UI</title>
</svelte:head>

<PageHeader
  title="Carousel"
  description="Page through slides with native scrolling, arrow keys and optional rotation. Wraps the ui-sdk Carousel: touch, trackpads and wheels scroll the viewport natively with CSS scroll snap, so paging works before JavaScript loads."
  entry="@ui-sdk/svelte/carousel"
/>

<div class="mt-8 space-y-12">
  <Section id="installation" title="Installation">
    <p class="text-sm text-muted">
      Import the parts from Negentropy UI. They wrap
      <code class="font-mono text-accent">@ui-sdk/svelte/carousel</code>.
    </p>
    <CodeBlock code={installCode} lang="ts" />
  </Section>

  <Section id="usage" title="Usage">
    <p class="text-sm text-muted">
      Slides go in <code class="font-mono text-accent">CarouselContent</code>, inside
      <code class="font-mono text-accent">CarouselViewport</code>. Name the carousel with
      <code class="font-mono text-accent">aria-label</code>, and give icon-only controls one too.
      The wrappers carry the layout: the viewport scrolls and snaps, the content is a flex row with a
      gap, and each slide is <code class="font-mono text-accent">basis-full</code> — one slide to a view.
    </p>
    <CodeBlock code={usageCode} />
  </Section>

  <Section id="demos" title="Demos">
    <Demo title="Basic" description="Use Previous and Next, swipe the slides, or focus the viewport and press the arrow keys." code={usageCode}>
      <Carousel aria-label="Featured" class="max-w-md">
        <div class="flex items-center gap-2">
          <CarouselPrevious aria-label="Previous slide"><ChevronLeft /></CarouselPrevious>
          <CarouselViewport class="flex-1">
            <CarouselContent>
              {#each slides as slide (slide.name)}
                <CarouselItem>
                  <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
                </CarouselItem>
              {/each}
            </CarouselContent>
          </CarouselViewport>
          <CarouselNext aria-label="Next slide"><ChevronRight /></CarouselNext>
        </div>
      </Carousel>
    </Demo>

    <Demo title="Indicators" description="One indicator per slide. They are a tablist: arrows move between them and show their page." code={indicatorsCode}>
      <Carousel aria-label="Photos" class="max-w-md">
        <CarouselViewport>
          <CarouselContent>
            {#each slides as slide (slide.name)}
              <CarouselItem>
                <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
              </CarouselItem>
            {/each}
          </CarouselContent>
        </CarouselViewport>
        <CarouselIndicatorGroup aria-label="Choose a photo">
          {#each slides as slide, index (slide.name)}
            <CarouselIndicator page={index + 1} aria-label={slide.name} />
          {/each}
        </CarouselIndicatorGroup>
      </Carousel>
    </Demo>

    <Demo title="Controlled" description="bind:page controls the page from outside, from 1. Every change carries a reason." code={controlledCode}>
      <div class="w-full max-w-md space-y-3">
        <div class="flex items-center justify-center gap-2">
          <Button size="sm" tone="outline" onclick={() => (page = 1)}>First</Button>
          <Button size="sm" tone="outline" onclick={() => (page = 3)}>Third</Button>
          <Button size="sm" tone="outline" onclick={() => (page = slides.length)}>Last</Button>
        </div>
        <Carousel
          bind:page
          aria-label="Featured"
          onPageChange={(next, details) => (reason = details.reason)}
        >
          <div class="flex items-center gap-2">
            <CarouselPrevious aria-label="Previous slide"><ChevronLeft /></CarouselPrevious>
            <CarouselViewport class="flex-1">
              <CarouselContent>
                {#each slides as slide (slide.name)}
                  <CarouselItem>
                    <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
                  </CarouselItem>
                {/each}
              </CarouselContent>
            </CarouselViewport>
            <CarouselNext aria-label="Next slide"><ChevronRight /></CarouselNext>
          </div>
        </Carousel>
        <p class="text-center font-mono text-xs text-muted">page {page} · {reason || "no change yet"}</p>
      </div>
    </Demo>

    <Demo title="Three slides to a page" description="slidesPerPage moves three at a time. Take the content's gaps out of each slide's basis." code={pagesCode}>
      <Carousel aria-label="Products" slidesPerPage={3} class="max-w-lg">
        <div class="flex items-center gap-2">
          <CarouselPrevious aria-label="Previous page"><ChevronLeft /></CarouselPrevious>
          <CarouselViewport class="flex-1">
            <CarouselContent>
              {#each slides as slide (slide.name)}
                <CarouselItem class="basis-[calc((100%_-_2rem)/3)]">
                  <div class="flex aspect-square items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
                </CarouselItem>
              {/each}
            </CarouselContent>
          </CarouselViewport>
          <CarouselNext aria-label="Next page"><ChevronRight /></CarouselNext>
        </div>
        <CarouselIndicatorGroup aria-label="Choose a page">
          {#snippet children(state)}
            {#each { length: state.pageCount ?? 2 }, index (index)}
              <CarouselIndicator page={index + 1} aria-label={"Page " + (index + 1)} />
            {/each}
          {/snippet}
        </CarouselIndicatorGroup>
      </Carousel>
    </Demo>

    <Demo title="Vertical" description="orientation='vertical' scrolls up and down; the viewport gets a height and Up/Down page it." code={verticalCode}>
      <Carousel aria-label="Featured" orientation="vertical" class="max-w-xs">
        <CarouselViewport>
          <CarouselContent>
            {#each slides as slide (slide.name)}
              <CarouselItem>
                <div class="flex h-full items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
              </CarouselItem>
            {/each}
          </CarouselContent>
        </CarouselViewport>
        <div class="flex items-center justify-center gap-2">
          <CarouselPrevious aria-label="Previous slide"><ChevronUp /></CarouselPrevious>
          <CarouselNext aria-label="Next slide"><ChevronDown /></CarouselNext>
        </div>
      </Carousel>
    </Demo>

    <Demo
      title="Autoplay and loop"
      description="defaultPlaying rotates every interval ms and loop wraps past the last slide. Hover pauses it; keyboard focus inside stops it. The bar follows --carousel-progress."
      code={autoplayCode}
    >
      <Carousel aria-label="Featured" loop defaultPlaying interval={3000} class="max-w-md">
        <div class="flex justify-center">
          <CarouselPlayToggle>
            {#snippet children(state)}
              {#if state.playing}<Pause aria-hidden="true" /> Pause{:else}<Play aria-hidden="true" /> Play{/if}
            {/snippet}
          </CarouselPlayToggle>
        </div>
        <div class="flex items-center gap-2">
          <CarouselPrevious aria-label="Previous slide"><ChevronLeft /></CarouselPrevious>
          <CarouselViewport class="flex-1">
            <CarouselContent>
              {#each slides as slide (slide.name)}
                <CarouselItem>
                  <div class="flex aspect-[4/3] items-center justify-center rounded-lg border border-line text-sm font-medium {slide.tone}">{slide.name}</div>
                </CarouselItem>
              {/each}
            </CarouselContent>
          </CarouselViewport>
          <CarouselNext aria-label="Next slide"><ChevronRight /></CarouselNext>
        </div>
        <div class="h-1 overflow-hidden rounded-full bg-line">
          <div class="h-full w-full origin-left scale-x-[var(--carousel-progress)] bg-accent"></div>
        </div>
      </Carousel>
    </Demo>
  </Section>

  <Section id="variants" title="Variants">
    <PropsTable
      caption="CarouselPrevious / CarouselNext variant"
      rows={[
        { name: "outline", type: "default", description: "Bordered surface button, for controls beside the slides." },
        { name: "ghost", type: "string", description: "No fill or border, for controls over the slides." },
        { name: "solid", type: "string", description: "Filled accent, for a prominent next action." },
      ]}
    />
    <PropsTable
      caption="Carousel orientation and align"
      rows={[
        { name: "horizontal", type: "default", description: "Left/Right page the slides; the content is a row." },
        { name: "vertical", type: "string", description: "Up/Down page the slides; the content is a column and the viewport is h-48." },
        { name: 'align="start"', type: "default", description: "Pages line up at the viewport's start." },
        { name: 'align="center"', type: "string", description: "Centered slides narrower than the viewport let their neighbors peek in." },
        { name: 'align="end"', type: "string", description: "Pages line up at the viewport's end." },
      ]}
    />
    <p class="text-sm text-muted">
      Slide sizing lives on <code class="font-mono text-accent">CarouselItem</code>: it is
      <code class="font-mono text-accent">basis-full</code> by default, so override it for more than one
      to a view — <code class="font-mono text-accent">basis-[calc((100%_-_2rem)/3)]</code> for three with
      the content's <code class="font-mono text-accent">gap-4</code>. State attributes:
      <code class="font-mono text-accent">data-active</code> and
      <code class="font-mono text-accent">data-in-view</code> on slides,
      <code class="font-mono text-accent">data-disabled</code> on Previous and Next,
      <code class="font-mono text-accent">data-selected</code> on the current indicator,
      <code class="font-mono text-accent">data-dragging</code> on the viewport, and
      <code class="font-mono text-accent">data-playing</code> /
      <code class="font-mono text-accent">data-paused</code> on the root and play toggle.
    </p>
    <PropsTable
      caption="CSS variables on the root"
      rows={[
        { name: "--carousel-progress", type: "number", description: "How far the slides have scrolled, 0 at the first page to 1 at the last, on every frame. Drives a progress bar in CSS." },
        { name: "--carousel-interval", type: "duration", description: "How long each page shows while rotating, for timing a CSS animation." },
      ]}
    />
  </Section>

  <Section id="api" title="API reference">
    <PropsTable
      caption="Carousel (root)"
      rows={[
        { name: "page", type: "number", description: "The current page, from 1. Bind with bind:page to control." },
        { name: "defaultPage", type: "number", default: "1", description: "The page it starts on when uncontrolled." },
        { name: "onPageChange", type: "(page, details) => void", description: "Runs when the page wants to change. details.reason says why; details.cancel() stays put and a drag springs back." },
        { name: "onPageChangeComplete", type: "(page) => void", description: "Runs once the slides come to rest, after a spring, drag or scroll. Start stutter-prone work here." },
        { name: "playing", type: "boolean", description: "Whether it rotates on its own. Bind with bind:playing to control." },
        { name: "defaultPlaying", type: "boolean", default: "false", description: "Starts rotating when uncontrolled. Never starts under prefers-reduced-motion." },
        { name: "onPlayingChange", type: "(playing, details) => void", description: "Runs when rotation wants to start or stop." },
        { name: "interval", type: "number", default: "5000", description: "Milliseconds each page shows while rotating." },
        { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which way the slides scroll and which arrow keys page." },
        { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Where a page lines up in the viewport." },
        { name: "slidesPerPage", type: 'number | "auto"', default: "1", description: "How many slides a page holds. auto fits as many as the viewport shows." },
        { name: "loop", type: "boolean", default: "false", description: "Next on the last page goes to the first, which comes in after the last." },
        { name: "skipSnaps", type: "boolean", default: "false", description: "Lets a fast swipe pass over pages. Without it one swipe moves one page." },
        { name: "dragFree", type: "boolean", default: "false", description: "Swipes coast to wherever they stop; the nearest page becomes current." },
        { name: "drag", type: "boolean", default: "true", description: "Whether swiping, dragging and scrolling move the slides." },
        { name: "controller", type: "CarouselController", description: "Pages it from anywhere via createCarouselController(), and connects parts placed outside it." },
        { name: "debug", type: "boolean", default: "false", description: "Logs every state change with its reason in development." },
      ]}
    />
    <PropsTable
      caption="CarouselViewport / CarouselContent / CarouselItem"
      rows={[
        { name: "class", type: "string", description: "Extra classes merged onto the element. The viewport writes overflow, scroll-snap-type and overscroll-behavior inline; slides get flex-shrink and snap alignment inline." },
        { name: "children", type: "Snippet<[state]>", description: "Viewport state: orientation, dragging. Content state: orientation. Item state: index, active, inView." },
        { name: "aria-label (item)", type: "string", description: 'Overrides the slide\'s position name, like "2 of 6". Also how you translate it.' },
      ]}
    />
    <PropsTable
      caption="CarouselPrevious / CarouselNext"
      rows={[
        { name: "variant", type: '"outline" | "ghost" | "solid"', default: '"outline"', description: "Negentropy prop: the button's visual style." },
        { name: "controller", type: "CarouselController", description: "The carousel this part drives when it sits outside one, like buttons in a page header." },
        { name: "aria-label", type: "string", description: "Names an icon-only control, e.g. Previous slide." },
        { name: "children", type: "Snippet<[CarouselStepState]>", description: "Receives disabled: true at the end without loop, where the button stays focusable." },
      ]}
    />
    <PropsTable
      caption="CarouselIndicatorGroup / CarouselIndicator"
      rows={[
        { name: "controller (group)", type: "CarouselController", description: "Connects a group placed outside its carousel." },
        { name: "aria-label (group)", type: "string", description: "Names the tablist, e.g. Choose a photo." },
        { name: "children (group)", type: "Snippet<[CarouselIndicatorGroupState]>", description: "Receives page and pageCount, null until the slides are measured." },
        { name: "page (indicator)", type: "number", description: "The page it shows and selects, from 1. Inferred from order when left out; pass it to render the selected one on the server." },
      ]}
    />
    <PropsTable
      caption="CarouselPlayToggle"
      rows={[
        { name: "controller", type: "CarouselController", description: "Connects a toggle placed outside its carousel." },
        { name: "children", type: "Snippet<[CarouselPlayToggleState]>", description: "Receives playing and paused. Label the control from playing, as the carousel pattern asks." },
      ]}
    />
  </Section>

  <Section id="accessibility" title="Accessibility">
    <ul class="list-disc space-y-2 pl-5 text-sm text-muted">
      <li>Follows the WAI-ARIA carousel pattern: a named region described as a carousel, slides as groups labelled by position ("2 of 6"), Previous and Next that control the slides, a rotation control, and indicators as a tablist.</li>
      <li><span class="text-fg">Tab</span> reaches the play toggle, controls in slides that are in view, Previous, Next and the current indicator. Slides less than half in view are <code class="font-mono text-accent">inert</code> and hidden from screen readers.</li>
      <li>In the viewport, <span class="text-fg">ArrowRight/ArrowLeft</span> page next and previous (<span class="text-fg">ArrowDown/ArrowUp</span> when vertical), and <span class="text-fg">Home/End</span> jump to the first and last page. Left and right swap in right-to-left text.</li>
      <li>In the indicators, the arrow keys move to the next or previous indicator and show its page; the group is one tab stop, on the current page.</li>
      <li><span class="text-fg">Enter</span> and <span class="text-fg">Space</span> press Previous, Next, an indicator or the play toggle. Fields inside slides keep their own arrow keys for the caret.</li>
      <li>When arrow keys page away from a slide that holds focus, focus moves to the slide that comes in. Previous and Next stay focusable at the ends with <code class="font-mono text-accent">aria-disabled</code>, so focus never drops to the page.</li>
      <li>Rotation stops when keyboard focus moves in and does not restart until the user asks; it pauses while hovered, while the tab is hidden, while scrolled out of view and while a finger is down. Paging yourself stops it.</li>
      <li>The slides are a polite live region only while not rotating, so screen readers are not interrupted every few seconds. Rotation never starts on its own under <code class="font-mono text-accent">prefers-reduced-motion</code>, and reduced motion pages without animating.</li>
    </ul>
  </Section>
</div>